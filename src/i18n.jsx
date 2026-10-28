import React,{createContext,useContext,useLayoutEffect,useMemo,useState} from 'react';
import en from './locales/en.json';
import zh from './locales/zh-CN.json';
import {getInitialLocale,formatMessage,STORAGE_KEY} from './locale.js';
const dictionaries={en,'zh-CN':zh};
const LocaleContext=createContext(null);
export function LocaleProvider({children}) {
  const [locale,setLocale]=useState(getInitialLocale);
  const copy=dictionaries[locale];
  useLayoutEffect(()=>{
    document.documentElement.lang=locale;
    document.title=copy.ui.title;
    for(const selector of ['meta[property="og:title"]','meta[property="og:site_name"]','meta[name="twitter:title"]'])document.querySelector(selector)?.setAttribute('content',copy.ui.title);
    for(const selector of ['meta[name="description"]','meta[property="og:description"]','meta[name="twitter:description"]'])document.querySelector(selector)?.setAttribute('content',copy.ui.description);
    for(const selector of ['meta[property="og:image:alt"]','meta[name="twitter:image:alt"]'])document.querySelector(selector)?.setAttribute('content',copy.ui.shareImageAlt);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content',locale==='en'?'en_US':'zh_CN');
    try{localStorage.setItem(STORAGE_KEY,locale);}catch{/* Language switching also works with storage blocked. */}
  },[locale,copy]);
  const value=useMemo(()=>({locale,copy,setLocale,t:(key,values)=>formatMessage(copy.ui[key],values)}),[locale,copy]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale(){return useContext(LocaleContext);}
