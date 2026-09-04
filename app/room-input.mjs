/** Shared input rules for human and agent contributions. No network or identity claims. */
export function textField(value, label, max, fallback = '') {
  if (typeof value !== 'string' && value != null) throw new Error(`${label} must be text.`);
  const text = (value ?? '').trim();
  if (text.length > max) throw new Error(`${label} must be ${max} characters or fewer.`);
  if (!text && !fallback) throw new Error(`${label} is required.`);
  return text || fallback;
}
export function makeSpark(input, id) {
  const author = textField(input.author, 'Name', 120, 'You');
  return { id, author,
    observation: textField(input.observation, 'Observation', 900),
    mayMatter: textField(input.mayMatter, 'Why it matters', 700, 'Still discovering why this matters.'),
    uncertainty: textField(input.uncertainty, 'Uncertainty', 700, 'This is unfinished. Questions and different perspectives are welcome.'),
    consent: 'Keep context and ask before taking it elsewhere.', credit: author };
}
export function loadDraft(storage) {
  try {
    const value=JSON.parse(storage.getItem('spark-draft-v1') || '{}');
    if(!value || typeof value!=='object' || Array.isArray(value)) return {};
    return Object.fromEntries(['author','observation','mayMatter','uncertainty'].filter(k=>typeof value[k]==='string').map(k=>[k,value[k].slice(0,k==='author'?120:k==='observation'?900:700)]));
  } catch { return {}; }
}
export function saveDraft(storage,draft) {
  try { storage.setItem('spark-draft-v1',JSON.stringify(draft)); return true; } catch { return false; }
}
export const contributionFields = {
 ember: [['author','Your name',120],['text','What caught your attention?',700]],
 experiment: [['question','What are we curious about?',700],['test','One small thing to try',900],['contact','Who or what can give a real response?',500],['change','What result would change your mind?',700],['boundary','What must we respect?',700],['steward','Who will take the next step?',300]],
 returned: [['learned','What actually happened?',900],['changed','What changed in your understanding?',900],['nextSpark','What question remains?',700],['credit','Who helped, and who should hear back?',600]]
};
export function contribute(room,action,input,id) {
 if(room.withdrawn)throw Error('This spark is withdrawn. Start a new spark to contribute.');
 if(!Object.hasOwn(contributionFields,action)) throw Error('Unknown contribution.');
 if(action==='experiment' && !room.embers.length) throw Error('Add a perspective before shaping a test.');
 if(action==='returned' && !room.experiment) throw Error('Shape and try a test before returning learning.');
 const fields=Object.fromEntries(contributionFields[action].map(([key,label,max])=>[key,textField(input[key],label,max)]));
 if(action==='ember')return {...room,embers:[...room.embers,{id,kind:'caught',...fields,source:sourceLink(input.source)}]};
 return {...room,[action]:fields};
}
export function sourceLink(value) {
 if(value==null || value==='')return '';
 const raw=textField(value,'Source URL',1000);
 let url;try{url=new URL(raw);}catch{throw Error('Use a complete http or https source URL.');}
 if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error('Use a public http or https source URL without credentials.');
 url.hash='';return url.href;
}
export function sourceSummary(embers) {
 const groups=new Map();let uncited=0;
 for(const ember of embers){if(!ember.source){uncited++;continue;}const key=sourceLink(ember.source);groups.set(key,(groups.get(key)||0)+1);}
 return {references:embers.length-uncited,unique:groups.size,uncited,repeated:[...groups].filter(([,n])=>n>1)};
}
export function withdrawSpark(room) {
 return {...room,withdrawn:true,spark:{id:room.spark.id,author:'Contributor withdrawn',observation:'This spark has been withdrawn on this device.',mayMatter:'',uncertainty:'',consent:'Withdrawn. Do not carry forward.',credit:'Withdrawn'},embers:[],experiment:null,returned:null,secondProduct:'',activity:[{tool:'human_withdrawal',result:'CONTENT REMOVED LOCALLY'}]};
}
export function reviseConsent(room,consent,credit) {
 if(room.withdrawn)throw Error('A withdrawn spark cannot be reactivated. Start a new one.');
 return {...room,spark:{...room.spark,consent:textField(consent,'Sharing boundary',500),credit:textField(credit,'Credit',400)}};
}
