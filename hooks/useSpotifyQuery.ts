import type { Album, Artist, Track } from '@spotify/web-api-ts-sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SpotifySearchResults {
  tracks?: {
    items: Track[];
    total: number;
    offset: number;
    limit: number;
  };
  artists?: {
    items: Artist[];
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

interface SpotifySearchParams {
  query: string;
  offset?: number;
  limit?: number;
}

// Spotify search function
const searchSpotify = async ({ query, offset = 0, limit = 20 }: SpotifySearchParams): Promise<SpotifySearchResults> => {
  if (!query.trim()) {
    return {
      tracks: { items: [], total: 0, offset: 0, limit: 20 },
      artists: { items: [], total: 0, offset: 0, limit: 20 },
      albums: { items: [], total: 0, offset: 0, limit: 20 }
    };
  }

  const searchUrl = `/api/spotify-search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`;
  const response = await fetch(searchUrl, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return response.json();
};

// React Query hook for Spotify search
export function useSpotifySearch() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: searchSpotify,
    onSuccess: (data, variables) => {
      // Cache the search result
      queryClient.setQueryData(['spotify-search', variables.query], data);
    },
  });

  const search = (query: string, offset?: number, limit?: number) => {
    return mutation.mutateAsync({ query, offset, limit });
  };

  return {
    search,
    loading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
