import test from 'node:test';
import assert from 'node:assert/strict';
import { makeSpark,loadDraft,saveDraft,contribute,sourceLink,sourceSummary } from '../../app/room-input.mjs';

test('R01 one unfinished observation is enough', () => {
  const s = makeSpark({observation:'  People hesitate before asking for help.  '}, 'test');
  assert.equal(s.observation, 'People hesitate before asking for help.');
  assert.equal(s.author, 'You'); assert.match(s.uncertainty, /unfinished/);
});
test('R01 reject blank, wrong type and oversized observations', () => {
  for (const observation of [' ', 'a'.repeat(901), {}]) assert.throws(()=>makeSpark({observation}, 'test'));
});
test('R01 retain attribution and optional detail', () => {
  const s=makeSpark({author:'Mina',observation:'A question',mayMatter:'Connection',uncertainty:'Maybe'}, 'test');
  assert.equal(s.credit,'Mina'); assert.equal(s.uncertainty,'Maybe');
});
test('R02 recover a small draft and discard unknown fields',()=>{
 const storage={getItem:()=>JSON.stringify({observation:'Half a thought',injected:'no'})};
 assert.deepEqual(loadDraft(storage),{observation:'Half a thought'});
});
test('R02 corrupt or unavailable storage does not crash contribution',()=>{
 assert.deepEqual(loadDraft({getItem:()=>'{bad'}),{});
 assert.equal(saveDraft({setItem(){throw Error('denied')}},{}),false);
});
test('R03 real human contribution retains previous state and attribution',()=>{
 const room={embers:[],spark:{author:'A'},experiment:null};
 const next=contribute(room,'ember',{author:'B',text:'I saw it differently'},'e');
 assert.equal(next.embers[0].author,'B'); assert.equal(next.spark.author,'A'); assert.equal(room.embers.length,0);
});
test('R03 no fabricated return before a real test is shaped',()=>{
 assert.throws(()=>contribute({embers:[],experiment:null},'returned',{},'r'),/test/);
 assert.throws(()=>contribute({embers:[]},'experiment',{},'t'),/perspective/);
});
test('R04 repeat citations are not independent support',()=>{
 const s=sourceSummary([{source:'https://example.org/study#one'},{source:'https://example.org/study#two'},{source:'https://example.org/study'},{}]);
 assert.equal(s.references,3);assert.equal(s.unique,1);assert.equal(s.uncited,1);
});
test('R04 source URLs reject script and credential payloads',()=>{
 for(const url of ['javascript:alert(1)','https://user:password@example.org','not a url'])assert.throws(()=>sourceLink(url));
});
