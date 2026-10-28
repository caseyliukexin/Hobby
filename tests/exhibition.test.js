import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {getExhibitionOrder,getAdjacentArtwork} from '../src/exhibition.js';
import {getMusicPairing} from '../src/music.js';
const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url)));
const artworks=read('../src/artworks.json'),chapters=read('../src/chapters.json'),music=read('../src/artworkMusic.json');
const originalArtworks=read('./fixtures/original-artworks.json'),originalMusic=read('./fixtures/original-music.json');
const expectedOrder=['almond','courting-couples','yellow-house','first-steps','sower','red-vineyard','sunflowers','mulberry-tree','sea-saintes-maries','rhone','starry-night','cypress-star','irises','bedroom','cafe','self-portrait','olive-trees','wheatfield','thunderclouds','tree-roots'];
const order=getExhibitionOrder(chapters);
test('exactly 20 unique paintings in five distinct four-work acts, in the requested order',()=>{
  assert.equal(artworks.length,20);assert.equal(new Set(artworks.map(a=>a.id)).size,20);
  assert.equal(chapters.length,5);assert.equal(new Set(chapters.map(c=>c.id)).size,5);
  for(const chapter of chapters) assert.equal(chapter.artworkIds.length,4);
  assert.deepEqual(order,expectedOrder);assert.deepEqual([...order].sort(),artworks.map(a=>a.id).sort());
});
test('all original metadata and artwork IDs are reused without edits',()=>{
  for(const original of originalArtworks) assert.deepEqual(artworks.find(a=>a.id===original.id),original);
});
test('all nine supplied music records, exact URLs, and associations are preserved',()=>{
  for(const [id,original] of Object.entries(originalMusic)){
    for(const [key,value] of Object.entries(original)) assert.deepEqual(music[id][key],value);
    assert.equal(getMusicPairing(music[id]).musicUrl,original.musicUrl);
  }
});
test('navigation crosses chapter boundaries and ends at Tree Roots rather than wrapping',()=>{
  assert.equal(getAdjacentArtwork(order,'first-steps',1),'sower');
  assert.equal(getAdjacentArtwork(order,'sower',-1),'first-steps');
  assert.equal(getAdjacentArtwork(order,'almond',-1),null);
  assert.equal(getAdjacentArtwork(order,'tree-roots',1),null);
  for(let i=0;i<19;i++) assert.equal(getAdjacentArtwork(order,order[i],1),order[i+1]);
});
test('every artwork has local image, attribution, and a separate music entry',()=>{
  for(const a of artworks){
    assert.ok(existsSync(new URL('../public'+a.image,import.meta.url)),a.image);
    assert.ok(a.title && a.year && a.collection && a.credit && a.license && a.source);
    assert.ok(music[a.id]);
  }
});
