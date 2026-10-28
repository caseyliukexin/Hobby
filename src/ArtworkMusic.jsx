import React from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import {useLocale} from './i18n.jsx';
import artworkMusic from './artworkMusic.json';
import {getMusicPairing} from './music.js';

export default function ArtworkMusic({artworkId}) {
  const {t,copy}=useLocale();
  const reduceMotion = useReducedMotion();
  const entry = artworkMusic[artworkId];
  const pairing = getMusicPairing(entry);
  const note = copy.curatorNotes[artworkId] || (typeof entry?.curatorNote === 'string' ? entry.curatorNote.trim() : '');
  if (!pairing && !note) return null;
  return <motion.section key={artworkId} className="artwork-music" aria-label={t('musicCuration')}
    initial={reduceMotion ? false : {opacity:0,y:6}} animate={{opacity:1,y:0}}
    transition={{duration:reduceMotion ? 0 : .3}}>
    {pairing && <><p className="eyebrow">{t('soundtrack')}</p>
    <div className="music-annotation">
      <h3>{pairing.songTitle}</h3>
      <p className="music-artist">{pairing.artist}</p>
      <a className="text-link music-link" href={pairing.musicUrl} target="_blank" rel="noopener noreferrer">
        <span>{t('listenOn',{platform:copy.platforms[pairing.platform]||pairing.platform})}<small>{t('newTab')}</small></span>
        <ArrowUpRight size={15} aria-hidden="true"/>
      </a>
    </div></>}
    {note && <div className="curator-note"><p className="eyebrow">{t('curatorNote')}</p><p>{note}</p></div>}
  </motion.section>;
}
