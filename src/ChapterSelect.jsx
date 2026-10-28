import React,{useEffect,useId,useRef,useState} from 'react';
import {useLocale} from './i18n.jsx';
import {ChevronDown} from 'lucide-react';

// Keep focus on the combobox while its active option is announced.
export default function ChapterSelect({chapter,chapters,onJump}) {
  const {t}=useLocale();
  const [open,setOpen]=useState(false),[active,setActive]=useState(0);
  const root=useRef(null),trigger=useRef(null),id=useId();
  const selected=chapters.findIndex(c=>c.id===chapter.id);
  const show=()=>{setActive(selected);setOpen(true);};
  const choose=index=>{setOpen(false);onJump(chapters[index].id);trigger.current?.focus();};
  useEffect(()=>{
    if(!open)return;
    const dismiss=e=>{if(!root.current?.contains(e.target))setOpen(false);};
    document.addEventListener('pointerdown',dismiss);
    return()=>document.removeEventListener('pointerdown',dismiss);
  },[open]);
  useEffect(()=>{if(open)document.getElementById(`${id}-${active}`)?.scrollIntoView({block:'nearest'});},[open,active,id]);
  const keyDown=e=>{
    if(e.key==='Escape'&&open){e.preventDefault();e.stopPropagation();setOpen(false);return;}
    if(e.key==='Tab'){setOpen(false);return;}
    if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
      e.preventDefault();
      if(!open){show();return;}
      setActive(i=>e.key==='Home'?0:e.key==='End'?chapters.length-1:Math.max(0,Math.min(chapters.length-1,i+(e.key==='ArrowDown'?1:-1))));
    } else if(e.key==='Enter'||e.key===' '){e.preventDefault();open?choose(active):show();}
    else if(open&&e.key.length===1){const match=chapters.findIndex(c=>c.title.toLowerCase().startsWith(e.key.toLowerCase()));if(match>=0)setActive(match);}
  };
  const label=c=><><span className="chapter-number">{c.number}</span><span className="chapter-name">{c.title}</span></>;
  return <div className="chapter-select" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
    <span id={`${id}-label`}>{t('jumpAct')}</span>
    <div className="chapter-picker">
      <button ref={trigger} className="chapter-trigger" role="combobox" aria-label={t('jumpAct')} aria-expanded={open} aria-haspopup="listbox" aria-controls={`${id}-options`} aria-activedescendant={open?`${id}-${active}`:undefined} onKeyDown={keyDown} onClick={()=>open?setOpen(false):show()}>
        {label(chapter)}<ChevronDown size={13} aria-hidden="true"/>
      </button>
      {open&&<div id={`${id}-options`} className="chapter-options" role="listbox" aria-label={t('chapters')}>{chapters.map((c,i)=><div id={`${id}-${i}`} key={c.id} role="option" aria-selected={c.id===chapter.id} className={'chapter-option'+(active===i?' is-active':'')} onPointerMove={()=>setActive(i)} onMouseDown={e=>e.preventDefault()} onClick={()=>choose(i)}>{label(c)}</div>)}</div>}
    </div>
  </div>;
}
