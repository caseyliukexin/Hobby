import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getMusicPairing} from './music.js';
const fixture={songTitle:'Test title',artist:'Test artist',musicUrl:'https://example.com/track'};
test('missing, partial and malformed entries remain hidden',()=>{
  for(const entry of [null,undefined,{},[],42,{...fixture,songTitle:' '},{...fixture,artist:null},{...fixture,musicUrl:42}]) assert.equal(getMusicPairing(entry),null);
});
test('unsafe and non-absolute URLs cannot become music links',()=>{
  for(const musicUrl of ['javascript:alert(1)','data:text/html,test','file:///tmp/audio','//example.com/a','/track','https://','https://user:password@example.com/a']) assert.equal(getMusicPairing({...fixture,musicUrl}),null);
});
test('valid links are preserved exactly and optional notes handled independently',()=>{
  const pairing=getMusicPairing({...fixture,songTitle:' Test title ',curatorNote:'  My note\nSecond line  '});
  assert.equal(pairing.songTitle,'Test title');assert.equal(pairing.curatorNote,'My note\nSecond line');
  assert.equal(pairing.musicUrl,fixture.musicUrl);assert.equal(getMusicPairing({...fixture,curatorNote:{}}).curatorNote,'');
});
test('platform labels match domains rather than deceptive substrings',()=>{
  for(const [musicUrl,platform] of [['https://open.spotify.com/track/test','Spotify'],['https://youtu.be/test','YouTube'],['https://music.apple.com/us/album/test','Apple Music'],['https://spotify.com.example.com/test','spotify.com.example.com']]) assert.equal(getMusicPairing({...fixture,musicUrl}).platform,platform);
});
test('music data uses stable artwork IDs and editable text fields',()=>{
  const data=JSON.parse(readFileSync(new URL('./artworkMusic.json',import.meta.url)));
  const artworks=JSON.parse(readFileSync(new URL('./artworks.json',import.meta.url)));
  assert.deepEqual(Object.keys(data).sort(),artworks.map(a=>a.id).sort());
  for(const entry of Object.values(data)){for(const key of ['songTitle','artist','musicUrl','curatorNote']) assert.equal(typeof entry[key],'string');}
});
