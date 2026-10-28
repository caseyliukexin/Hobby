export const STORAGE_KEY='exhibition-language';
export function getInitialLocale(){
  try{return localStorage.getItem(STORAGE_KEY)==='en'?'en':'zh-CN';}
  catch{return 'zh-CN';}
}
export function formatMessage(message,values={}){
  return message.replace(/\{(\w+)\}/g,(_,key)=>String(values[key]??`{${key}}`));
}
