import React from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import artworkMusic from './artworkMusic.json';
import {getMusicPairing} from './music.js';

export default function ArtworkMusic({artworkId}) {
  const reduceMotion = useReducedMotion();
  const entry = artworkMusic[artworkId];
  const pairing = getMusicPairing(entry);
  const note = typeof entry?.curatorNote === 'string' ? entry.curatorNote.trim() : '';
  if (!pairing && !note) return null;
  return <motion.section key={artworkId} className="artwork-music" aria-label="Music curation"
    initial={reduceMotion ? false : {opacity:0,y:6}} animate={{opacity:1,y:0}}
    transition={{duration:reduceMotion ? 0 : .3}}>
    {pairing && <><p className="eyebrow">A PERSONAL SOUNDTRACK</p>
    <div className="music-annotation">
      <h3>{pairing.songTitle}</h3>
      <p className="music-artist">{pairing.artist}</p>
      <a className="text-link music-link" href={pairing.musicUrl} target="_blank" rel="noopener noreferrer">
        <span>Listen on {pairing.platform}<small>Opens in a new tab</small></span>
        <ArrowUpRight size={15} aria-hidden="true"/>
      </a>
    </div></>}
    {note && <div className="curator-note"><p className="eyebrow">CURATOR’S NOTE</p><p>{note}</p></div>}
  </motion.section>;
}
