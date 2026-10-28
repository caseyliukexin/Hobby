// Launch validation: validate the completed curation without rewriting any data.
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {getMusicPairing} from '../src/music.js';
const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url)));
const music=read('../src/artworkMusic.json'),artworks=read('../src/artworks.json'),chapters=read('../src/chapters.json');
assert.equal(artworks.length,20);assert.equal(chapters.length,5);
assert.deepEqual(Object.keys(music).sort(),artworks.map(a=>a.id).sort());
for(const art of artworks){
  assert.ok(getMusicPairing(music[art.id]),`${art.id}: complete song and safe external URL required`);
  assert.equal(typeof music[art.id].curatorNote,'string');
  assert.ok(existsSync(new URL('../public'+art.image,import.meta.url)),`${art.id}: missing image`);
  assert.ok(art.credit&&art.license&&art.source,`${art.id}: missing attribution`);
  if(music[art.id].musicUrl!==music[art.id].musicUrl.trim())console.warn(`NOTE: ${art.id} URL has surrounding whitespace; original value preserved.`);
}
console.log('PASS: all 20 artworks have images, attribution, complete music selections and valid external URLs.');
