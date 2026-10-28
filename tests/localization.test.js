import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {getInitialLocale,formatMessage,STORAGE_KEY} from '../src/locale.js';
const read=name=>JSON.parse(readFileSync(new URL(name,import.meta.url),'utf8'));
const en=read('../src/locales/en.json'),zh=read('../src/locales/zh-CN.json');
const artworks=read('../src/artworks.json'),chapters=read('../src/chapters.json'),music=read('../src/artworkMusic.json');
const keys=(obj,prefix='')=>Object.entries(obj).flatMap(([k,v])=>typeof v==='object'?keys(v,prefix+k+'.'):[prefix+k]).sort();
test('locale dictionaries have identical keys and cover every artwork, chapter and UI reference',()=>{
 assert.deepEqual(keys(en),keys(zh));
 for(const locale of [en,zh]){
  assert.deepEqual(Object.keys(locale.artworks).sort(),artworks.map(a=>a.id).sort());
  assert.deepEqual(Object.keys(locale.chapters).sort(),chapters.map(c=>c.id).sort());
  for(const record of [...Object.values(locale.artworks),...Object.values(locale.chapters)])for(const value of Object.values(record))assert.ok(value.trim());
  for(const file of readdirSync(new URL('../src',import.meta.url)).filter(f=>f.endsWith('.jsx'))){
   const src=readFileSync(new URL('../src/'+file,import.meta.url),'utf8');
   for(const [,key] of src.matchAll(/\bt\('([^']+)'/g))assert.equal(typeof locale.ui[key],'string',`${file}: ${key}`);
  }
 }
});
test('English content and factual data are retained; music is not part of translated artwork records',()=>{
 for(const a of artworks){for(const [k,v] of Object.entries(en.artworks[a.id]))assert.equal(v,a[k]);assert.ok(!('image' in zh.artworks[a.id]));assert.ok(!('year' in zh.artworks[a.id]));}
 for(const c of chapters)for(const [k,v] of Object.entries(en.chapters[c.id]))assert.equal(v,c[k]);
 for(const id of Object.keys(music)){assert.equal(en.curatorNotes[id],music[id].curatorNote);assert.ok(!('songTitle' in en.artworks[id]));}
 assert.deepEqual(Object.values(zh.chapters).map(c=>c.title),['开始的勇气','艺术在燃烧','天空没有极限','心的距离','万物仍在生长']);
});
test('first visit defaults to Chinese; saved choices and unavailable storage are handled',()=>{
 const old=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 try{
  for(const [stored,expected] of [[null,'zh-CN'],['en','en'],['zh-CN','zh-CN'],['invalid','zh-CN']]){
   Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:key=>{assert.equal(key,STORAGE_KEY);return stored;}}});assert.equal(getInitialLocale(),expected);
  }
  Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw Error('blocked');}});assert.equal(getInitialLocale(),'zh-CN');
 }finally{if(old)Object.defineProperty(globalThis,'localStorage',old);else delete globalThis.localStorage;}
 assert.equal(formatMessage(zh.ui.actLabel,{number:'III'}),'第 III 幕');
});
