import { SpotifyApi } from '@spotify/web-api-ts-sdk';

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

  // Create global Spotify API client with Client Credentials flow
  spotifyClient = SpotifyApi.withClientCredentials(
    clientId,
    clientSecret
  );

  return spotifyClient;
}

export async function searchSpotify(query: string, offset: number = 0, limit: number = 20) {
  const api = getSpotifyClient();
  
  if (!query.trim()) {
    return {
      tracks: { items: [], total: 0, offset: 0, limit: 20 },
      artists: { items: [], total: 0, offset: 0, limit: 20 },
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

// Export the client directly for use across the project
export { spotifyClient as spotify };