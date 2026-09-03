const defaults={enabled:true,purpose:'Help people learn without replacing their judgment.',protect:'Consent, credit, human choice.',triggers:['send','publish','buy','delete']};

async function load(){
  const saved=await chrome.storage.local.get(defaults);
  document.querySelector('#purpose').value=saved.purpose;
  document.querySelector('#protect').value=saved.protect;
  document.querySelector('#enabled').checked=saved.enabled;
  document.querySelectorAll('fieldset input').forEach(input=>{input.checked=saved.triggers.includes(input.value)});
}

document.querySelector('#save').addEventListener('click',async()=>{
  const triggers=[...document.querySelectorAll('fieldset input:checked')].map(input=>input.value);
  await chrome.storage.local.set({enabled:document.querySelector('#enabled').checked,purpose:document.querySelector('#purpose').value.trim(),protect:document.querySelector('#protect').value.trim(),triggers});
  const status=document.querySelector('#status');status.textContent='Saved. Your intent stays local.';setTimeout(()=>status.textContent='Stored locally in this browser.',1800);
});

load();
