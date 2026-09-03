const defaults={enabled:true,purpose:'Help people learn without replacing their judgment.',protect:'Consent, credit, human choice.',triggers:['send','publish','buy','delete']};
let bypass=false;

function actionFor(target){
  const control=target.closest('button,input[type="submit"],input[type="button"],[role="button"],a');
  if(!control)return null;
  const words=`${control.innerText||''} ${control.value||''} ${control.getAttribute('aria-label')||''}`.toLowerCase();
  const match={send:/\b(send|submit|share)\b/,publish:/\b(publish|post|go live)\b/,buy:/\b(buy|purchase|pay|checkout|place order)\b/,delete:/\b(delete|remove|erase|discard)\b/};
  return Object.entries(match).find(([,pattern])=>pattern.test(words))?.[0]||null;
}

function ask(control,action,settings){
  const veil=document.createElement('div');veil.id='spark-companion-veil';veil.innerHTML=`<div role="dialog" aria-modal="true" aria-label="SPARK intent check"><div class="spark-line"></div><small>SPARK COMPANION · ${action.toUpperCase()}</small><h2>Does this still serve<br><em>what you meant?</em></h2><p><b>YOUR PURPOSE</b>${escapeHtml(settings.purpose)}</p><p><b>PROTECT</b>${escapeHtml(settings.protect)}</p><div><button data-choice="back">Revise or stop</button><button data-choice="continue">Continue intentionally</button></div></div>`;
  const style=document.createElement('style');style.textContent=`#spark-companion-veil{position:fixed;inset:0;z-index:2147483647;background:#142d43db;display:grid;place-items:center;padding:20px;font-family:Arial,sans-serif;color:#142d43}#spark-companion-veil>div{width:min(520px,100%);background:#f5f0e7;padding:34px;box-shadow:0 30px 100px #0008;position:relative}.spark-line{position:absolute;inset:0 0 auto;height:8px;background:linear-gradient(90deg,#cf3846,#ec773d,#e8bd41,#54a66b,#32a8b8,#3379ad)}#spark-companion-veil small{font:800 10px Arial;letter-spacing:.16em;color:#cf3846}#spark-companion-veil h2{font:500 38px/1.02 Georgia,serif;margin:25px 0}#spark-companion-veil h2 em{color:#cf3846;font-weight:400}#spark-companion-veil p{font:17px/1.4 Georgia,serif;border-top:1px solid #c9c1b5;padding-top:14px}#spark-companion-veil p b{display:block;font:800 9px Arial;letter-spacing:.13em;color:#3379ad;margin-bottom:6px}#spark-companion-veil>div>div:last-child{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:25px}#spark-companion-veil button{border:0;padding:14px;font-weight:800;cursor:pointer;background:#e4ddd2;color:#142d43}#spark-companion-veil button:last-child{background:#142d43;color:white}`;
  document.documentElement.append(style,veil);
  veil.querySelector('[data-choice="back"]').focus();
  veil.addEventListener('click',event=>{const choice=event.target.dataset.choice;if(!choice)return;style.remove();veil.remove();if(choice==='continue'){bypass=true;control.click();queueMicrotask(()=>bypass=false)}});
}

function escapeHtml(value){const node=document.createElement('div');node.textContent=value||'Not yet named.';return node.innerHTML}

document.addEventListener('click',async event=>{
  if(bypass||event.button!==0)return;
  const action=actionFor(event.target);if(!action)return;
  const settings=await chrome.storage.local.get(defaults);if(!settings.enabled||!settings.triggers.includes(action))return;
  event.preventDefault();event.stopImmediatePropagation();ask(event.target.closest('button,input,[role="button"],a'),action,settings);
},true);
