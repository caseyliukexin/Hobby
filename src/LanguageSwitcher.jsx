import React from 'react';
import {useLocale} from './i18n.jsx';
export default function LanguageSwitcher(){
  const {locale,setLocale,t}=useLocale();
  return <div className="language-switch" role="group" aria-label={t('language')}>
    <button type="button" lang="zh-CN" aria-label={t('switchZh')} aria-pressed={locale==='zh-CN'} onClick={()=>setLocale('zh-CN')}>中文</button>
    <span aria-hidden="true">|</span>
    <button type="button" lang="en" aria-label={t('switchEn')} aria-pressed={locale==='en'} onClick={()=>setLocale('en')}>EN</button>
  </div>;
}
