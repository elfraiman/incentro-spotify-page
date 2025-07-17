import { Album, MaxInt, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';

export interface SpotifySearchResults {
  tracks?: {
    items: Track[];
    total: number;
    offset: number;
    limit: number;
  };
  albums?: {
    items: Album[];
    total: number;
    offset: number;
    limit: number;
  };
}


let spotifyClient: SpotifyApi | null = null;

export function getSpotifyClient(): SpotifyApi {
  if (spotifyClient) {
    return spotifyClient;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.');
  }

  spotifyClient = SpotifyApi.withClientCredentials(
    clientId,
    clientSecret
  );

  return spotifyClient;
}

export async function searchSpotify(query: string, offset: number = 0, limit: MaxInt<50> = 20) {
  const api = getSpotifyClient();
  
  if (!query.trim()) {
    return {
      tracks: { items: [], total: 0, offset: 0, limit: 20 },
      albums: { items: [], total: 0, offset: 0, limit: 20 }
    };
  }

  try {
    const results = await api.search(query, ['track', 'album'], 'NL', limit, offset);
    return results;
  } catch (error) {
    console.error('Spotify search error:', error);
    throw new Error('Failed to search Spotify');
  }
}

export { spotifyClient as spotify };