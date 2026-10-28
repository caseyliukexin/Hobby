import React,{useState,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,MotionConfig} from 'framer-motion';
import {ArrowUpRight,ArrowRight,ArrowDown,X,Menu} from 'lucide-react';
import artworks from './artworks.json';
import chapters from './chapters.json';
import {getExhibitionOrder,getAdjacentArtwork} from './exhibition.js';
import ArtworkCard from './ArtworkCard.jsx';
import ArtworkDialog from './ArtworkDialog.jsx';
import './style.css';
const order=getExhibitionOrder(chapters);
const artworkById=Object.fromEntries(artworks.map(a=>[a.id,a]));
const reveal={initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.12},transition:{duration:.8}};
function App(){
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
    <a className="skip" href="#exhibition">Skip to artworks</a>
    <header><a href="#entrance" className="brand" aria-label="Exhibition Entrance">Vincent<span>ART × MUSIC</span></a>
      <nav aria-label="Main navigation"><a href="#exhibition">All Artworks</a><a href="#chapters">The five acts</a><a href="#about">The exhibition</a></nav>
      <button className="header-enter" onClick={()=>open(order[0])}>Step inside <ArrowUpRight size={15}/></button>
      <button className="mobile-menu icon-button" aria-label="Toggle navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      {menu&&<nav className="mobile-nav" aria-label="Mobile navigation"><a href="#exhibition" onClick={()=>setMenu(false)}>All Artworks</a>{chapters.map(c=><a key={c.id} href={'#'+c.id} onClick={()=>setMenu(false)}>Act {c.number} · {c.dimension}</a>)}<a href="#entrance" onClick={()=>setMenu(false)}>Exhibition Entrance</a></nav>}
    </header>
    <section id="entrance" tabIndex={-1} className="hero" aria-labelledby="title"><img className="hero-art" src={hero.image} alt=""/><div className="hero-shade"/>
      <motion.div className="hero-content" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:1.2}}>
        <p className="eyebrow"><span/> VINCENT VAN GOGH, REIMAGINED THROUGH MUSIC</p>
        <h1 id="title">A World Through<br/><em>Two Souls</em></h1><p className="hero-chinese" lang="zh-Hans">两个灵魂眼中的世界</p>
        <p className="hero-copy">Vincent painted what he saw.<br/>I listen to what he felt.</p>
        <div className="hero-actions"><button className="gold-button" onClick={()=>open(order[0])}>Enter Exhibition <ArrowRight size={18}/></button><a className="hero-secondary" href="#exhibition">Explore All Artworks <ArrowUpRight size={16}/></a></div>
      </motion.div>
      <div className="hero-bottom"><span>20 PAINTINGS <i>FIVE ACTS · TWO SOULS</i></span><a href="#exhibition" aria-label="Scroll to explore">SCROLL TO DISCOVER <ArrowDown size={15}/></a><span>{hero.title}, {hero.year}</span></div><div className="vertical-note">ONE PAINTING. ONE SONG. ONE PERSONAL INTERPRETATION.</div>
    </section>
    <main>
      <section id="exhibition" tabIndex={-1} className="intro section-pad"><motion.div {...reveal}><p className="eyebrow">THE COMPLETE EXHIBITION · 20 WORKS</p><h2>Five acts.<br/><em>One unfolding world.</em></h2></motion.div><motion.div {...reveal} className="intro-copy"><p>A dialogue between Vincent’s paintings<br/>and music chosen by one listener.</p><p>Beginning. Burning. Wonder. Introspection. Becoming.<br/>Follow the journey, or find your own way through.</p><button className="text-link" onClick={()=>open(order[0])}>Begin with Almond Blossom <ArrowRight size={17}/></button></motion.div></section>
      <nav id="chapters" className="chapter-nav" aria-label="Five acts">{chapters.map(c=><a href={'#'+c.id} key={c.id}><span>ACT {c.number}</span><strong>{c.dimension}</strong><small lang="zh-Hans">{c.chineseTitle}</small><ArrowUpRight size={15}/></a>)}</nav>
      {chapters.map((c,chapterIndex)=><section key={c.id} id={c.id} className={'gallery chapter section-pad '+c.palette} aria-labelledby={c.id+'-title'}>
        <motion.div {...reveal} className="gallery-heading"><div><p className="eyebrow">ACT {c.number}<span className="rule"/>{c.dimension.toUpperCase()}</p><h2 id={c.id+'-title'}>{c.title}<span>.</span></h2><p className="chapter-chinese" lang="zh-Hans">{c.chineseTitle}</p></div><p className="gallery-description">{c.introduction}</p></motion.div>
        <div className="art-grid">{c.artworkIds.map((id,index)=>artworkById[id]&&<ArtworkCard key={id} artwork={artworkById[id]} number={chapterIndex*4+index+1} index={index} onOpen={open}/>)}</div>
        <div className="chapter-end"><a href="#chapters">Choose an act ↑</a>{chapterIndex<chapters.length-1?<a href={'#'+chapters[chapterIndex+1].id}>Next · Act {chapters[chapterIndex+1].number} <ArrowRight size={15}/></a>:<a href="#conclusion">Continue <ArrowRight size={15}/></a>}</div>
      </section>)}
      <section id="conclusion" tabIndex={-1} className="conclusion section-pad" aria-labelledby="conclusion-title"><motion.div {...reveal}><p className="eyebrow">AN OPEN ENDING</p><h2 id="conclusion-title">Everything Is<br/><em>Still Becoming</em></h2><p className="conclusion-quote">The world does not end where a painting ends.</p><div className="conclusion-actions"><a href="#entrance" className="text-link">Return to the Beginning <ArrowUpRight size={16}/></a><a href="#exhibition" className="text-link">Explore All Artworks <ArrowRight size={16}/></a></div></motion.div></section>
      <section id="about" className="about section-pad"><motion.div {...reveal}><p className="eyebrow">A WORLD THROUGH TWO SOULS</p><h2>A painting.<br/>A song.<br/><em>A personal interpretation.</em></h2></motion.div><motion.div {...reveal}><p className="about-large">Vincent van Gogh<br/><span>1853 — 1890</span></p><p>This exhibition creates a dialogue between Vincent van Gogh’s paintings and contemporary music personally selected by the curator.</p><p>The five acts explore emotional and philosophical dimensions of human experience, rather than a chronological biography.</p><a href="#exhibition" className="text-link">Return to the artworks <ArrowUpRight size={17}/></a></motion.div></section>
    </main>
    <footer><div className="footer-top"><a className="brand" href="#entrance">Vincent<span>A WORLD THROUGH TWO SOULS</span></a><p>An independent art & music exhibition.<br/>One painting. One song. One personal interpretation.</p><a href="#entrance" className="text-link">Back to top ↑</a></div><div className="credits"><p>All artworks by Vincent van Gogh. Public-domain artworks; image sources and reuse details accompany each work.</p><button onClick={()=>credits.current.showModal()}>Image credits & sources ↗</button></div></footer>
    {selected&&<ArtworkDialog artwork={selected} chapter={chapter} chapters={chapters} position={order.indexOf(selectedId)} total={order.length} onClose={close} onMove={move} onJump={id=>open(chapters.find(c=>c.id===id).artworkIds[0])} onNavigate={navigate} onFinish={()=>navigate('conclusion')}/>}
    <dialog ref={credits} className="credits-dialog" aria-label="Image credits"><button className="icon-button" aria-label="Close credits" onClick={()=>credits.current.close()}><X/></button><p className="eyebrow">THE COLLECTION</p><h2>Image credits</h2><p>All paintings are by Vincent van Gogh. Artwork descriptions are visual summaries, separate from the curator’s personal notes. Dates and collection information are drawn from the linked sources.</p>{order.map(id=>artworkById[id]).filter(Boolean).map(a=><p key={a.id}><a href={a.source} target="_blank" rel="noopener noreferrer">{a.title} ({a.year}) ↗</a><small>{a.credit} · {a.license}</small>{a.museumSource&&<a className="museum-source" href={a.museumSource} target="_blank" rel="noopener noreferrer">Museum record ↗</a>}</p>)}</dialog>
  </MotionConfig>;
}
createRoot(document.getElementById('root')).render(<App/>);
