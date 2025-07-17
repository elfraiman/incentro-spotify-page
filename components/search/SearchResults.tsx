import { SpotifySearchResults } from '@/pages';
import { ResultSection } from './ResultSection';


interface SearchResultsProps {
  results: SpotifySearchResults;
  loading?: boolean;
  hasSearched?: boolean;
  onLoadMore?: (type: 'tracks' | 'albums') => void;
  loadingMore?: { tracks: boolean; albums: boolean };
}

export function SearchResults({ results, loading, hasSearched = false, onLoadMore, loadingMore }: SearchResultsProps) {
  const hasResults = results.tracks?.items?.length || results.albums?.items?.length;
  const showNoResults = !hasResults && hasSearched && !loading;

  return (
    <div className="space-y-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {showNoResults && (
        <div className="flex flex-col items-center justify-center py-24">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No results found</h3>
          <p className="text-[var(--text-muted)] text-center">Try a different search</p>
        </div>
      )}
          <ResultSection
            items={results.tracks?.items || []}
            type="track"
            title="Tracks"
            icon={
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.789zm7.617 1.924A7 7 0 0119 12a7 7 0 01-2 4.898 1 1 0 01-1.414-1.414A5 5 0 0017 12a5 5 0 00-1.414-3.484 1 1 0 011.414-1.414zm-2.828 2.828A3 3 0 0116 12a3 3 0 01-.828 2.071 1 1 0 01-1.414-1.414 1 1 0 000-1.414 1 1 0 011.414-1.414z" clipRule="evenodd" />
              </svg>
            }
            gradientFrom="[var(--primary-mars)]"
            gradientTo="[var(--primary-starburst)]"
            hasMore={results.tracks ? results.tracks.items.length < results.tracks.total : false}
            onLoadMore={onLoadMore ? () => onLoadMore('tracks') : undefined}
            loadingMore={loadingMore?.tracks}
            loading={loading && !loadingMore?.albums}
          />

          <ResultSection
            items={results.albums?.items || []}
            type="album"
            title="Albums"
            icon={
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            }
            gradientFrom="[var(--primary-mars)]"
            gradientTo="[var(--primary-starburst)]"
            hasMore={results.albums ? results.albums.items.length < results.albums.total : false}
            onLoadMore={onLoadMore ? () => onLoadMore('albums') : undefined}
            loadingMore={loadingMore?.albums}
            loading={loading && !loadingMore?.tracks}
          />
      
      
    </div>
  );
}