import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
test('self-hosted Chinese subsets cover all current localized and music text',()=>{
 const coverage=new Set(read('../public/fonts/coverage.json'));
 const text=JSON.stringify([read('../src/locales/en.json'),read('../src/locales/zh-CN.json'),read('../src/artworkMusic.json')]);
 const required=[...new Set([...text].map(c=>c.codePointAt(0)).filter(c=>(c>=0x2e80&&c<=0x9fff)||(c>=0xf900&&c<=0xfaff)||(c>=0xff00&&c<=0xffef)))];
 assert.deepEqual(required.filter(c=>!coverage.has(c)),[],'Run scripts/subset-chinese-fonts.py after adding Chinese characters');
});
