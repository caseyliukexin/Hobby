// Only complete, safe pairings are presented. Never infer a song from artwork data.
export function getMusicPairing(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const text = value => typeof value === 'string' ? value.trim() : '';
  const songTitle = text(entry.songTitle);
  const artist = text(entry.artist);
  const rawUrl = text(entry.musicUrl);
  if (!songTitle || !artist || !/^https?:\/\//i.test(rawUrl)) return null;
  try {
    const url = new URL(rawUrl);
    if (!['https:', 'http:'].includes(url.protocol) || !url.hostname || url.username || url.password) return null;
    const host = url.hostname.toLowerCase();
    const domain = name => host === name || host.endsWith('.' + name);
    const platform = host === '163cn.tv' || host === 'music.163.com' || host.endsWith('.music.163.com') ? 'NetEase Cloud Music'
      : domain('spotify.com') || domain('spotify.link') ? 'Spotify'
      : domain('youtube.com') || host === 'youtu.be' ? 'YouTube'
      : host === 'music.apple.com' ? 'Apple Music' : url.hostname;
    return { songTitle, artist, musicUrl: entry.musicUrl, curatorNote: text(entry.curatorNote), platform };
  } catch {
    return null;
  }
}
