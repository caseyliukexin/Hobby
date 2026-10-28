import React from 'react';
import {useLocale} from './i18n.jsx';
import {motion} from 'framer-motion';
import {ArrowUpRight,Plus} from 'lucide-react';
export default function ArtworkCard({artwork,number,index,onOpen}) {
  const {t}=useLocale();
  return <motion.article className={'art-card art-card-'+index} data-artwork-id={artwork.id}
    initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}}
    transition={{duration:.7,delay:index*.04}}>
    <button className="art-button" onClick={()=>onOpen(artwork.id)} aria-label={t('viewArtwork',{title:artwork.title})}>
      <img loading="lazy" src={artwork.image} alt={t('imageAlt',{title:artwork.title})}/>
      <span className="view-art">{t('exploreArtwork')} <ArrowUpRight size={18}/></span>
      <span className="art-plus"><Plus size={20}/></span>
    </button>
    <div className="art-caption"><div><h3><button onClick={()=>onOpen(artwork.id)}>{artwork.title}</button></h3><p>{t('painter')} · {artwork.year}</p></div><span>{String(number).padStart(2,'0')}</span></div>
  </motion.article>;
}
