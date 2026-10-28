import React,{useState,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,MotionConfig} from 'framer-motion';
import {ArrowUpRight,ArrowRight,ArrowDown,X,Menu} from 'lucide-react';
import originalArtworks from './artworks.json';
import originalChapters from './chapters.json';
import {getExhibitionOrder,getAdjacentArtwork} from './exhibition.js';
import ArtworkCard from './ArtworkCard.jsx';
import ArtworkDialog from './ArtworkDialog.jsx';
import './style.css';
import {LocaleProvider,useLocale} from './i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
const order=getExhibitionOrder(originalChapters);

const reveal={initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.12},transition:{duration:.8}};
function App(){
  const {t,copy,locale,secondaryCopy}=useLocale();
  const artworks=originalArtworks.map(a=>({...a,...copy.artworks[a.id]}));
  const chapters=originalChapters.map(c=>({...c,...copy.chapters[c.id]}));
  const artworkById=Object.fromEntries(artworks.map(a=>[a.id,a]));
  const [selectedId,setSelectedId]=useState(null),[menu,setMenu]=useState(false);
  const credits=useRef(null);
  const hero=artworkById['starry-night'];
  const selected=artworkById[selectedId];
  const chapter=chapters.find(c=>c.artworkIds.includes(selectedId));
  const close=()=>setSelectedId(null);
  const open=id=>setSelectedId(id);
  const move=direction=>{const next=getAdjacentArtwork(order,selectedId,direction);if(next)open(next);};
  const navigate=id=>{
    close();setMenu(false);
    // Wait for dialog cleanup to restore scrolling before navigating to the section.
    requestAnimationFrame(()=>{const target=document.getElementById(id);target?.scrollIntoView({block:'start'});target?.focus({preventScroll:true});});
  };
  return <MotionConfig reducedMotion="user">
    <a className="skip" href="#exhibition">{t('skip')}</a>
    <header><LanguageSwitcher/><a href="#entrance" className="brand" aria-label={t('entrance')}>{t('vincent')}<span>{t('artMusic')}</span></a>
      <nav aria-label={t('mainNav')}><a href="#exhibition">{t('allArtworks')}</a><a href="#chapters">{t('fiveActs')}</a><a href="#about">{t('aboutNav')}</a></nav>
      <button className="header-enter" onClick={()=>open(order[0])}>{t('stepInside')}<ArrowUpRight size={15}/></button>
      <button className="mobile-menu icon-button" aria-label={t('toggleNav')} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      {menu&&<nav className="mobile-nav" aria-label={t('mobileNav')}><a href="#exhibition" onClick={()=>setMenu(false)}>{t('allArtworks')}</a>{chapters.map(c=><a key={c.id} href={'#'+c.id} onClick={()=>setMenu(false)}>{t('actLabel',{number:c.number})} · {c.dimension}</a>)}<a href="#entrance" onClick={()=>setMenu(false)}>{t('entrance')}</a></nav>}
    </header>
    <section id="entrance" tabIndex={-1} className="hero" aria-labelledby="title"><img className="hero-art" src={hero.image} alt=""/><div className="hero-shade"/>
      <motion.div className="hero-content" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:1.2}}>
        <p className="eyebrow"><span/>{t('subtitle')}</p>
        <h1 id="title">{t('titleFirst')}<br/><em>{t('titleSecond')}</em></h1><p className={locale==='zh-CN'?'hero-chinese hero-title-secondary':'hero-chinese'} lang={locale==='zh-CN'?'en':undefined} aria-hidden={locale==='en'?true:undefined}>{locale==='zh-CN'?secondaryCopy.ui.title:'\u00a0'}</p>
        <p className="hero-copy">{t('statementFirst')}<br/>{t('statementSecond')}</p>
        <div className="hero-actions"><button className="gold-button" onClick={()=>open(order[0])}>{t('enter')}<ArrowRight size={18}/></button><a className="hero-secondary" href="#exhibition">{t('exploreAll')}<ArrowUpRight size={16}/></a></div>
      </motion.div>
      <div className="hero-bottom"><span>{t('paintingsCount')}<i>{t('actsSenses')}</i></span><a href="#exhibition" aria-label={t('scrollLabel')}>{t('scroll')}<ArrowDown size={15}/></a><span>{hero.title}, {hero.year}</span></div><div className="vertical-note">{t('concept')}</div>
    </section>
    <main>
      <section id="exhibition" tabIndex={-1} className="intro section-pad"><motion.div {...reveal}><p className="eyebrow">{t('complete')}</p><h2>{t('introFirst')}<br/><em>{t('introSecond')}</em></h2></motion.div><motion.div {...reveal} className="intro-copy"><p>{t('dialogueFirst')}<br/>{t('dialogueSecond')}</p><p>{t('dimensions')}<br/>{t('journey')}</p><button className="text-link" onClick={()=>open(order[0])}>{t('beginAlmond')}<ArrowRight size={17}/></button></motion.div></section>
      <nav id="chapters" className="chapter-nav" aria-label={t('fiveActs')}>{chapters.map(c=><a href={'#'+c.id} key={c.id}><span className="directory-number">{c.number}</span><span className="directory-titles"><strong lang={locale}>{c.title}</strong><small lang={locale==='zh-CN'?'en':'zh-CN'}>{secondaryCopy.chapters[c.id].title}</small></span><ArrowUpRight size={15} aria-hidden="true"/></a>)}</nav>
      {chapters.map((c,chapterIndex)=><section key={c.id} id={c.id} className={'gallery chapter section-pad '+c.palette} aria-labelledby={c.id+'-title'}>
        <motion.div {...reveal} className="gallery-heading"><div><p className="eyebrow">{t('actLabel',{number:c.number})}<span className="rule"/>{c.dimension.toUpperCase()}</p><h2 id={c.id+'-title'}>{c.title}<span>{t('chapterPeriod')}</span></h2><p className="chapter-chinese act-title-secondary" lang={locale==='zh-CN'?'en':'zh-CN'}>{secondaryCopy.chapters[c.id].title}</p></div><p className="gallery-description">{c.introduction}</p></motion.div>
        <div className="art-grid">{c.artworkIds.map((id,index)=>artworkById[id]&&<ArtworkCard key={id} artwork={artworkById[id]} number={chapterIndex*4+index+1} index={index} onOpen={open}/>)}</div>
        <div className="chapter-end"><a href="#chapters">{t('chooseAct')} ↑</a>{chapterIndex<chapters.length-1?<a href={'#'+chapters[chapterIndex+1].id}>{t('nextAct',{number:chapters[chapterIndex+1].number})} <ArrowRight size={15}/></a>:<a href="#conclusion">{t('continue')}<ArrowRight size={15}/></a>}</div>
      </section>)}
      <section id="conclusion" tabIndex={-1} className="conclusion section-pad" aria-labelledby="conclusion-title"><motion.div {...reveal}><p className="eyebrow">{t('endingLabel')}</p><h2 id="conclusion-title">{t('endingFirst')}<br/><em>{t('endingSecond')}</em></h2><p className="conclusion-quote">{t('endingQuote')}</p><div className="conclusion-actions"><a href="#entrance" className="text-link">{t('returnBeginning')}<ArrowUpRight size={16}/></a><a href="#exhibition" className="text-link">{t('exploreAll')}<ArrowRight size={16}/></a></div></motion.div></section>
      <section id="about" className="about section-pad"><motion.div {...reveal}><p className="eyebrow">{t('title').toUpperCase()}</p><h2>{t('aboutFirst')}<br/>{t('aboutSecond')}<br/><em>{t('aboutThird')}</em></h2></motion.div><motion.div {...reveal}><p className="about-large">{t('painter')}<br/><span>1853 — 1890</span></p><p>{t('aboutDescription')}</p><p>{t('aboutStructure')}</p><a href="#exhibition" className="text-link">{t('returnArtworks')}<ArrowUpRight size={17}/></a></motion.div></section>
    </main>
    <footer><div className="footer-top"><a className="brand" href="#entrance">{t('vincent')}<span>{t('title').toUpperCase()}</span></a><p>{t('independent')}<br/>{t('conceptSentence')}</p><a href="#entrance" className="text-link">{t('backTop')} ↑</a></div><div className="credits"><p>{t('footerCredit')}</p><button onClick={()=>credits.current.showModal()}>{t('creditsSources')}<ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" focusable="false"/></button></div></footer>
    {selected&&<ArtworkDialog artwork={selected} chapter={chapter} chapters={chapters} position={order.indexOf(selectedId)} total={order.length} onClose={close} onMove={move} onJump={id=>open(chapters.find(c=>c.id===id).artworkIds[0])} onNavigate={navigate} onFinish={()=>navigate('conclusion')}/>}
    <dialog ref={credits} className="credits-dialog" aria-label={t('credits')}><LanguageSwitcher/><button className="icon-button" aria-label={t('closeCredits')} onClick={()=>credits.current.close()}><X/></button><p className="eyebrow">{t('collectionLabel')}</p><h2>{t('credits')}</h2><p>{t('creditsDescription')}</p>{order.map(id=>artworkById[id]).filter(Boolean).map(a=><p key={a.id}><a href={a.source} target="_blank" rel="noopener noreferrer">{a.title} ({a.year}) ↗</a><small>{a.credit} · {a.license}</small>{a.museumSource&&<a className="museum-source" href={a.museumSource} target="_blank" rel="noopener noreferrer">{t('museumRecord')} ↗</a>}</p>)}</dialog>
  </MotionConfig>;
}
createRoot(document.getElementById('root')).render(<LocaleProvider><App/></LocaleProvider>);
