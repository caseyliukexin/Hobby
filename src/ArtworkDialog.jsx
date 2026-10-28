import React,{useEffect,useRef,useState} from 'react';
import {X,Plus,Minus,ChevronLeft,ChevronRight,ArrowUpRight,ArrowRight} from 'lucide-react';
import ArtworkMusic from './ArtworkMusic.jsx';
import ChapterSelect from './ChapterSelect.jsx';
export default function ArtworkDialog({artwork,chapter,chapters,position,total,onClose,onMove,onJump,onNavigate,onFinish}) {
  const dialog=useRef(null),imagePane=useRef(null),[zoom,setZoom]=useState(false);
  useEffect(()=>{
    const previousFocus=document.activeElement;
    dialog.current?.showModal();
    const priorOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=priorOverflow;previousFocus?.focus?.({preventScroll:true});};
  },[]);
  useEffect(()=>{setZoom(false);dialog.current?.scrollTo({top:0});imagePane.current?.scrollTo({top:0,left:0});},[artwork.id]);
  const handleKey=e=>{
    if(e.target.closest('select,input,textarea,[role=combobox]') || zoom) return;
    if(e.key==='ArrowRight' && position<total-1){e.preventDefault();onMove(1);}
    if(e.key==='ArrowLeft' && position>0){e.preventDefault();onMove(-1);}
  };
  return <dialog ref={dialog} className="art-dialog" aria-labelledby="artwork-title" onCancel={onClose}
    onClick={e=>{if(e.target===dialog.current)onClose();}} onKeyDown={handleKey}>
    <div className="modal-toolbar"><ChapterSelect chapter={chapter} chapters={chapters} onJump={onJump}/><button className="icon-button" onClick={onClose} aria-label="Close artwork"><X/></button></div>
    <nav className="modal-return" aria-label="Exhibition navigation"><a href="#exhibition" onClick={()=>onNavigate('exhibition')}>All Artworks</a><a href="#entrance" onClick={()=>onNavigate('entrance')}>Exhibition Entrance</a><span>ACT {chapter.number} · <span lang="zh-Hans">{chapter.chineseTitle}</span></span></nav>
    <div className="modal-layout"><div ref={imagePane} className={'modal-image '+(zoom?'zoomed':'')}><button className="zoom-image" onClick={()=>setZoom(!zoom)} aria-label={zoom?'Zoom out':'Zoom in'}><img src={artwork.image} alt={artwork.title}/></button><button className="zoom-control" onClick={()=>setZoom(!zoom)}>{zoom?<Minus size={16}/>:<Plus size={16}/>} {zoom?'Zoom out':'Zoom in'}</button></div>
      <div className="modal-info"><p className="eyebrow">{artwork.year} · VINCENT VAN GOGH</p><h2 id="artwork-title" aria-live="polite">{artwork.title}</h2><p className="description">{artwork.description}</p><p className="collection">{artwork.collection}</p><p className="source-credit">{artwork.credit}<br/>{artwork.license}</p><a href={artwork.source} target="_blank" rel="noopener noreferrer" className="text-link">View original source <ArrowUpRight size={16}/></a>
        <ArtworkMusic key={artwork.id} artworkId={artwork.id}/>
        <div className="modal-pagination"><button disabled={position===0} onClick={()=>onMove(-1)} aria-label="Previous artwork"><ChevronLeft/> Previous</button><span>{String(position+1).padStart(2,'0')} / {total}</span>{position===total-1?<button onClick={onFinish}>Continue <ArrowRight size={16}/></button>:<button onClick={()=>onMove(1)} aria-label="Next artwork">Next <ChevronRight/></button>}</div>
      </div>
    </div>
  </dialog>;
}
