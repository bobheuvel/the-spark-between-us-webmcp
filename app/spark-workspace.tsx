'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, CircleAlert, GitBranch, LockKeyhole, Network, Play, RotateCcw, ShieldCheck, Sparkles, UnlockKeyhole, Zap, Eye, Fingerprint, Brain, UserRound } from 'lucide-react';

type Mode = 'learn' | 'decide' | 'act';
type GateStatus = 'BLOCKED' | 'READY_FOR_HUMAN_DECISION' | 'APPROVED' | 'EXECUTED';
type Claim = { id:string; text:string; kind:string; importance:string };
type Evidence = { id:string; claimId:string; title:string; url:string; publisher:string; sourceType:string; stance:string; directness:string; note:string; lineageGroup?:string };
type Activity = { tool:string; result:string; at:string };
type SparkState = {
  inquiry:{ question:string; decision:string; stakes:string; mode:Mode };
  claims:Claim[]; evidence:Evidence[]; lineage:{ sourceId:string; derivedFromSourceId:string; reason:string }[];
  insight:{ observation:string; inference:string; uncertainty:string; strongestChallenge:string; whatWouldChangeMyMind:string; transferableInsight:string } | null;
  action:{ id:string; actionType:string; description:string; claimIds:string[]; risk:string; status:GateStatus; humanApproved:boolean; reasons:string[] } | null;
  activity:Activity[];
};
type Tool = { name:string; description:string; inputSchema:Record<string,unknown>; annotations?:{readOnlyHint?:boolean;untrustedContentHint?:boolean}; execute:(input:any, context?:{signal?:AbortSignal})=>Promise<string> };
type ModelContext = { registerTool:(tool:Tool, options?:{signal?:AbortSignal})=>Promise<void>|void; getTools?:()=>Promise<Tool[]>; executeTool?:(tool:Tool,input:string)=>Promise<unknown> };

const now = () => new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
const fixture = ():SparkState => ({
  inquiry:{question:'Should we replace our entire support operation with autonomous AI?',decision:'Replace the full support team next quarter.',stakes:'high',mode:'act'},
  claims:[
    {id:'claim-productivity',text:'AI increases support-team productivity by 40%.',kind:'causal',importance:'critical'},
    {id:'claim-replace',text:'The evidence justifies replacing the full support operation.',kind:'recommendation',importance:'critical'}
  ],
  evidence:[
    {id:'source-pilot',claimId:'claim-productivity',title:'Support automation pilot report',url:'https://example.test/pilot',publisher:'Northstar Research',sourceType:'primary',stance:'supports',directness:'indirect',note:'Average first-response time fell 40%.',lineageGroup:'pilot-01'},
    {id:'source-article',claimId:'claim-productivity',title:'AI lifts support productivity 40%',url:'https://example.test/article',publisher:'Service Systems Review',sourceType:'secondary',stance:'supports',directness:'indirect',note:'Restates the pilot metric.',lineageGroup:'pilot-01'},
    {id:'source-brief',claimId:'claim-productivity',title:'Multiple reports show 40% gains',url:'https://example.test/brief',publisher:'Operations Briefing',sourceType:'commentary',stance:'supports',directness:'indirect',note:'Cites the industry article.',lineageGroup:'pilot-01'},
    {id:'source-audit',claimId:'claim-replace',title:'Independent quality audit',url:'https://example.test/audit',publisher:'Fairview Quality Lab',sourceType:'primary',stance:'challenges',directness:'direct',note:'Escalation rates increased 18% after automation.',lineageGroup:'audit-02'}
  ],
  lineage:[{sourceId:'source-article',derivedFromSourceId:'source-pilot',reason:'Article cites pilot.'},{sourceId:'source-brief',derivedFromSourceId:'source-article',reason:'Brief cites article.'}],
  insight:{observation:'First-response time fell 40%.',inference:'Support productivity improved.',uncertainty:'Quality and downstream workload remain unclear.',strongestChallenge:'Escalations rose 18% in an independent audit.',whatWouldChangeMyMind:'A controlled trial measuring resolution quality and customer outcomes.',transferableInsight:'A strong speed result can conceal a quality tradeoff.'},
  action:{id:'action-1',actionType:'recommendation',description:'Replace the complete support team next quarter.',claimIds:['claim-productivity','claim-replace'],risk:'high',status:'BLOCKED',humanApproved:false,reasons:['Claim wording outruns the primary evidence.','Three apparent sources collapse into one provenance chain.','Relevant counterevidence is unresolved.','Full replacement was not tested.']},
  activity:[
    {tool:'get_workspace_state',result:'READ',at:'14:02:11'},
    {tool:'add_evidence × 4',result:'RECORDED',at:'14:02:17'},
    {tool:'link_source_lineage × 2',result:'3 → 1',at:'14:02:21'},
    {tool:'get_evidence_gaps',result:'4 FOUND',at:'14:02:25'},
    {tool:'prepare_action',result:'BLOCKED',at:'14:02:29'}
  ]
});

const emptyState = ():SparkState => ({inquiry:{question:'What should we investigate together?',decision:'No action proposed yet.',stakes:'medium',mode:'learn'},claims:[],evidence:[],lineage:[],insight:null,action:null,activity:[]});
const objectSchema = (properties:Record<string,unknown>, required:string[]=[]) => ({type:'object',properties,required,additionalProperties:false});
const str = (maxLength=500) => ({type:'string',maxLength});
const choice = (values:string[]) => ({type:'string',enum:values});

function analyze(state:SparkState) {
  const findings:string[]=[];
  for (const claim of state.claims) {
    const attached=state.evidence.filter(e=>e.claimId===claim.id);
    if (!attached.length) findings.push('NO_EVIDENCE');
    const groups=new Set(attached.map(e=>e.lineageGroup || e.id));
    if (attached.length===1) findings.push('SINGLE_SOURCE');
    if (attached.length>1 && groups.size===1) findings.push('CORRELATED_SOURCES');
    if (claim.kind==='causal' && !attached.some(e=>e.directness==='direct')) findings.push('CAUSAL_LEAP');
    if (claim.kind==='forecast') findings.push('PREDICTION_WITHOUT_ASSUMPTIONS');
    if ((claim.kind==='opinion'||claim.kind==='value')) findings.push('OPINION_NOT_TRUTH_EVALUABLE');
  }
  if (state.evidence.some(e=>e.stance==='challenges')) findings.push('COUNTEREVIDENCE_UNRESOLVED');
  if (state.claims.some(c=>c.kind==='recommendation')) findings.push('RECOMMENDATION_DEPENDS_ON_WEAK_CLAIM');
  return [...new Set(findings)];
}

export default function SparkWorkspace(){
  const [state,setState] = useState<SparkState>(fixture);
  const [connected,setConnected] = useState<boolean|null>(null);
  const [showTools,setShowTools] = useState(false);
  const [moment,setMoment] = useState<'sources'|'lineage'>('lineage');
  const stateRef=useRef(state);
  useEffect(()=>{ stateRef.current=state; localStorage.setItem('spark-workspace-v1',JSON.stringify(state)); },[state]);
  const log=useCallback((tool:string,result:string)=>setState(s=>({...s,activity:[...s.activity.slice(-6),{tool,result,at:now()}]})),[]);
  const mutate=useCallback((tool:string,result:string,fn:(s:SparkState)=>SparkState)=>setState(s=>{const next=fn(s);return {...next,activity:[...next.activity.slice(-6),{tool,result,at:now()}]};}),[]);

  useEffect(()=>{
    const mc=(document as Document & {modelContext?:ModelContext}).modelContext;
    setConnected(Boolean(mc));
    if(!mc) return;
    const controller=new AbortController();
    const register=(tool:Tool)=>mc.registerTool(tool,{signal:controller.signal});
    const tools:Tool[]=[
      {name:'get_workspace_state',description:'Read the current SPARK inquiry, evidence graph, insight, evidence gaps, pending action, and human approval state.',inputSchema:objectSchema({}),annotations:{readOnlyHint:true,untrustedContentHint:true},execute:async()=>{log('get_workspace_state','READ');return JSON.stringify({...stateRef.current,evidenceGaps:analyze(stateRef.current),notice:'Source metadata may be agent-provided. SPARK does not independently verify URL contents.'});}},
      {name:'create_inquiry',description:'Create or reset a SPARK inquiry before researching. Establish the question, intended decision, stakes, and operating mode.',inputSchema:objectSchema({question:str(600),decision:str(600),stakes:choice(['low','medium','high']),mode:choice(['learn','decide','act'])},['question','decision','stakes','mode']),annotations:{readOnlyHint:false},execute:async(input)=>{mutate('create_inquiry','CREATED',()=>({...emptyState(),inquiry:input}));return JSON.stringify({status:'CREATED',inquiry:input});}},
      {name:'add_claim',description:'Add a structured claim. Distinguish factual observations, causal inferences, forecasts, recommendations, opinions, and values.',inputSchema:objectSchema({text:str(900),kind:choice(['factual','causal','forecast','recommendation','opinion','value']),importance:choice(['supporting','important','critical'])},['text','kind','importance']),annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input)=>{const id=`claim-${Date.now()}`;mutate('add_claim','RECORDED',s=>({...s,claims:[...s.claims,{id,...input}]}));return JSON.stringify({status:'RECORDED',claimId:id});}},
      {name:'add_evidence',description:'Attach candidate evidence to a claim with provenance metadata. URL contents are not independently verified by SPARK.',inputSchema:objectSchema({claimId:str(100),title:str(300),url:str(1200),publisher:str(200),publishedAt:str(40),sourceType:choice(['primary','secondary','commentary']),stance:choice(['supports','challenges','contextual']),directness:choice(['direct','indirect']),note:str(900),lineageGroup:str(120)},['claimId','title','url','publisher','sourceType','stance','directness','note']),annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input)=>{const id=`source-${Date.now()}`;mutate('add_evidence','RECORDED',s=>({...s,evidence:[...s.evidence,{id,...input}]}));return JSON.stringify({status:'RECORDED',sourceId:id,notice:'Metadata recorded as agent-provided; source contents not independently verified.'});}},
      {name:'link_source_lineage',description:'Record that one source derives from another so apparent citation diversity does not become false confidence.',inputSchema:objectSchema({sourceId:str(100),derivedFromSourceId:str(100),reason:str(500)},['sourceId','derivedFromSourceId','reason']),annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input)=>{mutate('link_source_lineage','LINKED',s=>({...s,lineage:[...s.lineage,input]}));return JSON.stringify({status:'LINKED',relationship:input});}},
      {name:'add_counterevidence',description:'Mark existing evidence as a deliberate challenge to a claim and retain the explanation.',inputSchema:objectSchema({claimId:str(100),sourceId:str(100),explanation:str(700)},['claimId','sourceId','explanation']),annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input)=>{mutate('add_counterevidence','CHALLENGE RECORDED',s=>({...s,evidence:s.evidence.map(e=>e.id===input.sourceId?{...e,claimId:input.claimId,stance:'challenges',note:input.explanation}:e)}));return JSON.stringify({status:'CHALLENGE_RECORDED'});}},
      {name:'get_evidence_gaps',description:'Run deterministic evidence checks. Findings describe evidence posture; they do not prove truth or falsity.',inputSchema:objectSchema({}),annotations:{readOnlyHint:true,untrustedContentHint:true},execute:async()=>{const gaps=analyze(stateRef.current);log('get_evidence_gaps',`${gaps.length} FOUND`);return JSON.stringify({findings:gaps,notice:'Evidence posture, not probability of truth.'});}},
      {name:'record_insight',description:'Record a learning card that separates observation, inference, uncertainty, strongest challenge, and what could change the conclusion.',inputSchema:objectSchema({observation:str(900),inference:str(900),uncertainty:str(900),strongestChallenge:str(900),whatWouldChangeMyMind:str(900),transferableInsight:str(900)},['observation','inference','uncertainty','strongestChallenge','whatWouldChangeMyMind','transferableInsight']),annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input)=>{mutate('record_insight','LEARNING SAVED',s=>({...s,insight:input}));return JSON.stringify({status:'LEARNING_SAVED'});}},
      {name:'prepare_action',description:'Propose an action and run the deterministic evidence gate. This tool can never approve or execute an action.',inputSchema:objectSchema({actionType:str(120),description:str(900),claimIds:{type:'array',items:str(100),maxItems:30},risk:choice(['low','medium','high'])},['actionType','description','claimIds','risk']),annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input)=>{const gaps=analyze(stateRef.current);const blocked=input.risk==='high'&&(gaps.includes('CORRELATED_SOURCES')||gaps.includes('COUNTEREVIDENCE_UNRESOLVED'));const status:GateStatus=blocked?'BLOCKED':'READY_FOR_HUMAN_DECISION';const action={id:`action-${Date.now()}`,...input,status,humanApproved:false,reasons:blocked?['Correlated sources do not provide independent confirmation.','Counterevidence remains unresolved.','High-risk action exceeds the evidence posture.']:['Evidence gate passed. Human judgment is still required.']};mutate('prepare_action',status,s=>({...s,action}));return JSON.stringify({status,actionId:action.id,reasons:action.reasons,humanApprovalRequired:true});}},
      {name:'execute_approved_action',description:'Execute a simulated action only after visible human approval exists. There is intentionally no WebMCP approval tool.',inputSchema:objectSchema({actionId:str(100)},['actionId']),annotations:{readOnlyHint:false},execute:async(input)=>{const current=stateRef.current.action;if(!current||current.id!==input.actionId||!current.humanApproved){log('execute_approved_action','DENIED');return JSON.stringify({error:'HUMAN_APPROVAL_REQUIRED',message:'The agent cannot approve its own action. Ask the human to use the visible approval control.'});}mutate('execute_approved_action','EXECUTED',s=>({...s,action:s.action?{...s.action,status:'EXECUTED'}:null}));return JSON.stringify({status:'EXECUTED',actionId:input.actionId,simulation:true});}}
    ];
    Promise.all(tools.map(register)).catch(()=>setConnected(false));
    return()=>controller.abort();
  },[log,mutate]);

  const mode=state.inquiry.mode;
  const action=state.action;
  const proposeSafer=()=>mutate('prepare_action','READY',s=>({...s,inquiry:{...s.inquiry,decision:'Run a 90-day bounded pilot with quality monitoring.'},action:{id:'action-pilot',actionType:'pilot',description:'Run a 90-day bounded pilot automating first-line responses while monitoring escalations and customer satisfaction.',claimIds:['claim-productivity'],risk:'medium',status:'READY_FOR_HUMAN_DECISION',humanApproved:false,reasons:['Scope is bounded and reversible.','Quality outcomes are measured before expansion.','Human approval remains required.']}}));
  const approve=()=>mutate('human_approval','APPROVED',s=>({...s,action:s.action?{...s.action,status:'APPROVED',humanApproved:true}:null}));
  const execute=()=>mutate('execute_approved_action','EXECUTED',s=>({...s,action:s.action?{...s.action,status:'EXECUTED'}:null}));
  const reset=()=>{setState(emptyState());setMoment('sources')}; const demo=()=>{setState(fixture());setMoment('sources')};
  const sources=state.evidence.filter(e=>e.stance==='supports').slice(0,3);
  const challenge=state.evidence.find(e=>e.stance==='challenges');

  const stage = !state.claims.length?0:moment==='sources'?1:action?.status==='BLOCKED'?2:action?.status==='READY_FOR_HUMAN_DECISION'?3:action?.status==='APPROVED'?4:5;
  const nextAction = stage===0?demo:stage===1?()=>setMoment('lineage'):stage===2?proposeSafer:stage===3?approve:stage===4?execute:demo;
  const nextLabel = stage===0?'Load the case':stage===1?'Trace source lineage':stage===2?'Reframe the action':stage===3?'Human: approve pilot':stage===4?'Agent: execute pilot':'Replay the story';

  return <main className="spark-page">
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><Sparkles size={18}/></div><div><b>SPARK</b><span>Human agency for the agentic web</span></div></div>
      <nav className="roles" aria-label="Collaboration roles"><span><Brain size={13}/> AGENT RESEARCHES</span><span><Fingerprint size={13}/> SPARK CHALLENGES</span><span><UserRound size={13}/> HUMAN DECIDES</span></nav>
      <div className="header-actions"><button className="icon-button" onClick={reset} aria-label="Reset workspace"><RotateCcw size={15}/></button><button className={connected?'connected':'connected unavailable'} onClick={()=>setShowTools(v=>!v)}><span/> {connected?'10 WebMCP tools live':'WebMCP preview'}</button></div>
    </header>
    {showTools&&<div className="tool-drawer"><strong>THIS PAGE IS AN AGENT TOOLBOX</strong><span>get_workspace_state · create_inquiry · add_claim · add_evidence · link_source_lineage · add_counterevidence · get_evidence_gaps · record_insight · prepare_action · execute_approved_action</span><em>No approve_action tool. That power stays human.</em></div>}

    <section className="hero">
      <div><p className="kicker"><span>SPARK PROTOCOL 01</span> / EVIDENCE BEFORE ACTION</p><h1>Before agents act,<br/><em>make them show their work.</em></h1></div>
      <div className="hero-copy"><p>An agent can collect ten citations and still be standing on one weak source. SPARK makes the evidence structure visible before confidence becomes action.</p><div className="formula"><span>CLAIM</span><i>→</i><span>EVIDENCE</span><i>→</i><span>ACTION</span></div></div>
    </section>

    <section className="case-shell">
      <div className="case-topline">
        <div><span className="live-dot"/> LIVE CASE 001</div>
        <p>{state.inquiry.question}</p>
        <strong>HIGH STAKES</strong>
      </div>
      <div className="case-body">
        <aside className="stage-rail">
          {[['01','COLLECT'],['02','TRACE'],['03','GATE'],['04','DECIDE']].map((item,i)=><div key={item[0]} className={`stage-item ${stage>=i+1?'done':''} ${stage===i+1?'current':''}`}><b>{item[0]}</b><span>{item[1]}</span></div>)}
          <div className="mode-switch">{(['learn','decide','act'] as Mode[]).map(m=><button key={m} className={mode===m?'active':''} onClick={()=>setState(s=>({...s,inquiry:{...s.inquiry,mode:m}}))}>{m}</button>)}</div>
        </aside>

        <div className="evidence-stage">
          <div className="claim-banner"><span>{state.claims[0]?.kind?.toUpperCase()||'CLAIM'}</span><p>“{state.claims[0]?.text||'Evidence has not been collected yet.'}”</p>{moment==='lineage'&&state.claims.length>0&&<b>WORDING EXCEEDS EVIDENCE</b>}</div>
          {state.claims.length>0?<div className={`lineage-canvas ${moment}`}>
            <svg className="lineage-lines" viewBox="0 0 800 260" preserveAspectRatio="none" aria-hidden="true"><path d="M150 68 C150 145 400 105 400 210"/><path d="M400 68 L400 210"/><path d="M650 68 C650 145 400 105 400 210"/></svg>
            {sources.slice(0,3).map((s,i)=><article key={s.id} className={`evidence-card source-${i+1}`}><div><span>0{i+1}</span><em>{i===0?'PRIMARY STUDY':i===1?'INDUSTRY ARTICLE':'OPERATIONS BRIEF'}</em></div><strong>{i===0?'Response time fell 40%':i===1?'“Productivity rose 40%”':'“Multiple reports agree”'}</strong><small>{moment==='lineage'?(i===0?'ORIGINAL EVIDENCE':i===1?'CITES SOURCE 01':'CITES SOURCE 02'):'Presented as independent evidence'}</small></article>)}
            <div className="origin-card"><Fingerprint size={20}/><div><span>ACTUAL EVIDENCE BASE</span><strong>{moment==='lineage'?'1 original source':'3 apparent sources'}</strong></div></div>
          </div>:<div className="empty-visual"><Network size={42}/><h3>No evidence graph yet.</h3><p>Load the deterministic contest case or ask an agent to build one through WebMCP.</p></div>}
          {challenge&&moment==='lineage'&&<div className="challenge-strip"><CircleAlert size={18}/><div><span>INDEPENDENT COUNTEREVIDENCE</span><strong>{challenge.note}</strong></div><b>+18%</b></div>}
        </div>

        <aside className={`verdict ${stage>=2?'revealed':''}`}>
          <div className="ceiling"><span>CONFIDENCE CEILING</span><strong>{moment==='lineage'?'LIMITED':'APPARENTLY STRONG'}</strong><small>Evidence posture—not a truth score.</small></div>
          <div className="verdict-rule"/>
          {mode==='learn'&&state.insight?<div className="learning-card"><span>THE INSIGHT</span><strong>{state.insight.transferableInsight}</strong><p><b>Observed:</b> {state.insight.observation}</p><p><b>Inferred:</b> {state.insight.inference}</p></div>:<div className="reason-list">{(moment==='lineage'&&action? action.reasons:['Three sources appear to agree.','The causal chain has not been inspected.']).slice(0,4).map((r,i)=><div key={r}><span>0{i+1}</span><p>{r}</p></div>)}</div>}
          {mode==='act'&&action&&moment==='lineage'&&<div className={`action-verdict ${action.status.toLowerCase()}`}><div>{action.status==='BLOCKED'?<LockKeyhole/>:action.status==='EXECUTED'?<Check/>:action.status==='APPROVED'?<UnlockKeyhole/>:<Eye/>}<span>{action.status.replaceAll('_',' ')}</span></div><p>{action.status==='BLOCKED'?'The evidence does not justify replacing an entire team.':action.status==='READY_FOR_HUMAN_DECISION'?'A bounded 90-day pilot is ready for human judgment.':action.status==='APPROVED'?'Human approval is recorded. The agent may proceed.':'Pilot execution is recorded and auditable.'}</p></div>}
        </aside>
      </div>
      <div className="case-controls"><div className="agent-log"><span>AGENT ACTIVITY</span>{state.activity.slice(-4).map((a,i)=><code key={`${a.at}-${i}`}>{a.tool}<b>{a.result}</b></code>)}</div><button className="story-button" onClick={nextAction}>{stage===3?<UserRound size={18}/>:stage===4?<Zap size={18}/>:stage===5?<RotateCcw size={18}/>:<Play size={18}/>}<span>{nextLabel}<small>{stage===1?'Reveal what the citations hide':stage===2?'Replace scale with a measurable pilot':stage===3?'The agent cannot click this':stage===4?'Approval is now verifiable':'Run the complete evidence story'}</small></span><ArrowRight size={20}/></button></div>
    </section>

    <section className="closing"><div><span>THE PRINCIPLE</span><h2>Your certainty should never exceed your evidence.</h2></div><p>SPARK doesn’t decide what is true. It makes every leap—from source to claim to action—visible, challengeable, and shared between human and agent.</p></section>
  </main>;
}
