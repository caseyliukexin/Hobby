import React from 'react';
import {motion} from 'framer-motion';
import {ArrowUpRight,Plus} from 'lucide-react';
export default function ArtworkCard({artwork,number,index,onOpen}) {
  return <motion.article className={'art-card art-card-'+index} data-artwork-id={artwork.id}
    initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}}
    transition={{duration:.7,delay:index*.04}}>
    <button className="art-button" onClick={()=>onOpen(artwork.id)} aria-label={'View '+artwork.title}>
      <img loading="lazy" src={artwork.image} alt={artwork.title+' by Vincent van Gogh'}/>
      <span className="view-art">Explore artwork <ArrowUpRight size={18}/></span>
      <span className="art-plus"><Plus size={20}/></span>
    </button>
    <div className="art-caption"><div><h3><button onClick={()=>onOpen(artwork.id)}>{artwork.title}</button></h3><p>Vincent van Gogh · {artwork.year}</p></div><span>{String(number).padStart(2,'0')}</span></div>
  </motion.article>;
}
