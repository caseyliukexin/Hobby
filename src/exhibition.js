// Narrative order lives in chapters.json, independently of artwork and music data.
export const getExhibitionOrder = chapters => chapters.flatMap(chapter => chapter.artworkIds);
export function getAdjacentArtwork(order, artworkId, direction) {
  const index = order.indexOf(artworkId);
  if (index < 0) return null;
  return order[index + direction] ?? null;
}
