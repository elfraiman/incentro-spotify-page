import { Album, Track, SimplifiedAlbum } from "@spotify/web-api-ts-sdk";

export const deduplicateTracks = (tracks: Track[]): Track[] => {
  const seen = new Set<string>();
  const result: Track[] = [];

  for (const track of tracks) {
    const name = track.name.trim().toLowerCase();
    const artist = track.artists[0]?.name.trim().toLowerCase() || '';
    const key = `${name}-${artist}`;

    if (!seen.has(key)) {
      seen.add(key);
      result.push(track);
    }
  }
    return result;
  }
  

export const deduplicateAlbums = (albums: SimplifiedAlbum[]): SimplifiedAlbum[] => {
  const seen = new Set<string>();
  const result: SimplifiedAlbum[] = [];

  for (const album of albums) {
    const name = album.name.trim().toLowerCase();
    const artist = album.artists[0]?.name.trim().toLowerCase() || '';
    const key = `${name}-${artist}`;

    if (!seen.has(key)) {
      seen.add(key);
      result.push(album);
    }
  }

  return result;
}