import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
import {readFileSync} from 'node:fs';
const localeTitles=Object.fromEntries(['en','zh-CN'].map(locale=>[locale,JSON.parse(readFileSync(new URL(`./src/locales/${locale}.json`,import.meta.url),'utf8')).ui.title]));

// Vercel supplies the public production hostname at build time. SITE_URL can
// override it for a custom domain or another host; no secrets are needed.
export default defineConfig({plugins:[tailwindcss(),{
  name:'exhibition-sharing-metadata',
  transformIndexHtml(html){
    const configured=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
    let origin='';
    if(configured){
      const url=new URL(configured);
      if(url.protocol!=='https:' || url.username || url.password || url.search || url.hash)throw new Error('SITE_URL must be a public HTTPS URL without credentials.');
      origin=url.origin;
    }
    const bootstrap=`(()=>{let lang='zh-CN';try{if(localStorage.getItem('exhibition-language')==='en')lang='en';}catch{}document.documentElement.lang=lang;document.title=(${JSON.stringify(localeTitles)})[lang];})();`;
    const result=html.replaceAll('__SHARE_IMAGE__',`${origin}/art/almond.jpg`).replace('__LOCALE_BOOTSTRAP__',bootstrap);
    if(!origin)return result;
    return {html:result,tags:[{tag:'link',attrs:{rel:'canonical',href:`${origin}/`},injectTo:'head'},{tag:'meta',attrs:{property:'og:url',content:`${origin}/`},injectTo:'head'}]};
  }
}]});
