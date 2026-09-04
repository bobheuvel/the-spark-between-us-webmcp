import test from 'node:test';
import assert from 'node:assert/strict';
import { makeSpark } from '../../app/room-input.mjs';

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
