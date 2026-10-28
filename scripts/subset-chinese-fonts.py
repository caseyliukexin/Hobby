from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib.instancer import instantiateVariableFont
import tempfile, urllib.request
p=Path(__file__).resolve().parents[1]
cache=Path(tempfile.mkdtemp(prefix='exhibition-fonts-'))
for family in ['NotoSerifSC','NotoSansSC']:
 base='https://raw.githubusercontent.com/google/fonts/main/ofl/'+family.lower()+'/'
 urllib.request.urlretrieve(base+family+'%5Bwght%5D.ttf',cache/(family+'.ttf'))
 urllib.request.urlretrieve(base+'OFL.txt',p/'public/fonts'/(family+'-OFL.txt'))
texts=[]
def collect(v):
 if isinstance(v,str): texts.append(v)
 elif isinstance(v,dict):
  for x in v.values():collect(x)
 elif isinstance(v,list):
  for x in v:collect(x)
for f in [* (p/'src/locales').glob('*.json'),p/'src/artworkMusic.json']:
 collect(json.loads(f.read_text()))
chars=sorted({ord(c) for c in ''.join(texts)+'中文' if 0x2e80<=ord(c)<=0x9fff or 0xf900<=ord(c)<=0xfaff or 0xff00<=ord(c)<=0xffef})
# Restrict to Chinese characters/punctuation: existing Latin and Korean typography is untouched.
for family,label in [('NotoSerifSC','Exhibition Chinese Serif'),('NotoSansSC','Exhibition Chinese Sans')]:
 font=TTFont(cache/(family+'.ttf'));assert not(set(chars)-set(font.getBestCmap()))
 options=subset.Options();options.flavor='woff2';sub=subset.Subsetter(options=options);sub.populate(unicodes=chars);sub.subset(font)
 font=instantiateVariableFont(font,{'wght':(400,600)},inplace=True)
 # Distinct name for modified font, retaining upstream copyrights and license records.
 for rec in font['name'].names:
  if rec.nameID in (1,4,6,16): rec.string=(label.replace(' ','') if rec.nameID==6 else label).encode(rec.getEncoding())
 font.flavor='woff2';target=p/'public/fonts'/(family+'-exhibition.woff2');font.save(target)
 print(f'{target.name}: {target.stat().st_size} bytes; {len(chars)} codepoints')
(p/'public/fonts/coverage.json').write_text(json.dumps(chars)+'\n')
ranges=','.join('U+%X'%c for c in chars)
css='/* Self-hosted OFL Chinese subsets; Latin fonts and existing typography remain unchanged. */\n'
for family,label in [('NotoSerifSC','Exhibition Chinese Serif'),('NotoSansSC','Exhibition Chinese Sans')]:
 css+=f'@font-face{{font-family:"{label}";src:url("/fonts/{family}-exhibition.woff2") format("woff2");font-style:normal;font-weight:400 600;font-display:swap;unicode-range:{ranges}}}\n'
(p/'src/chinese-fonts.css').write_text(css)
