import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SearchResults } from '@spotify/web-api-ts-sdk';

interface SpotifySearchParams {
  query: string;
}

// Spotify search function
const searchSpotify = async ({ query }: SpotifySearchParams): Promise<SearchResults> => {
  if (!query.trim()) {
    return {
      tracks: { items: [] },
      artists: { items: [] },
      albums: { items: [] }
    };
  }

  const searchUrl = `/api/spotify-search?q=${encodeURIComponent(query)}`;
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

  const search = (query: string) => {
    return mutation.mutateAsync({ query });
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

// Hook to get cached search results
export function useSpotifySearchResults(query: string) {
  return useQuery({
    queryKey: ['spotify-search', query],
    queryFn: () => searchSpotify({ query }),
    enabled: !!query.trim(),
    staleTime: 10 * 60 * 1000, // 10 minutes for search results
  });
}

// Hook to prefetch search results
export function usePrefetchSpotifySearch() {
  const queryClient = useQueryClient();

  const prefetch = (query: string) => {
    queryClient.prefetchQuery({
      queryKey: ['spotify-search', query],
      queryFn: () => searchSpotify({ query }),
      staleTime: 10 * 60 * 1000,
    });
  };

  return { prefetch };
}