import type { Track, Artist, Album } from '@spotify/web-api-ts-sdk';
import { TrackCard } from './cards/TrackCard';
import { ArtistCard } from './cards/ArtistCard';
import { AlbumCard } from './cards/AlbumCard';

interface SpotifySearchResults {
  tracks?: {
    items: Track[];
  };
  albums?: {
    items: Album[];
  };
}

interface SearchResultsProps {
  results: SpotifySearchResults;
  loading?: boolean;
}

export function SearchResults({ results, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-[var(--primary-mars)]/20 border-t-[var(--primary-mars)] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-[var(--primary-starburst)]/20 border-t-[var(--primary-starburst)] rounded-full animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Discovering your music...</h3>
        <p className="text-[var(--text-muted)] text-center">Using AI to find the perfect tracks for you</p>
      </div>
    );
  }

  const hasResults = results.tracks?.items?.length || results.artists?.items?.length || results.albums?.items?.length;

  if (!hasResults) {
    return null;
  }

  return (
    <div className="space-y-16">
      {results.tracks?.items && results.tracks.items.length > 0 && (
        <section className="animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.789zm7.617 1.924A7 7 0 0119 12a7 7 0 01-2 4.898 1 1 0 01-1.414-1.414A5 5 0 0017 12a5 5 0 00-1.414-3.484 1 1 0 011.414-1.414zm-2.828 2.828A3 3 0 0116 12a3 3 0 01-.828 2.071 1 1 0 01-1.414-1.414 1 1 0 000-1.414 1 1 0 011.414-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Tracks</h2>
                <p className="text-[var(--text-muted)] text-sm">{results.tracks.items.length} songs found</p>
              </div>
            </div>
            <div className="hidden sm:block w-24 h-px bg-gradient-to-r from-[var(--primary-mars)] to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.tracks.items.map((track: Track, index: number) => (
              <div
                key={track.id}
                className="animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TrackCard track={track} />
              </div>
            ))}
          </div>
        </section>
      )}

      {results.albums?.items && results.albums.items.length > 0 && (
        <section className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-starburst)] to-[var(--primary-mars)] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Albums</h2>
                <p className="text-[var(--text-muted)] text-sm">{results.albums.items.length} albums found</p>
              </div>
            </div>
            <div className="hidden sm:block w-24 h-px bg-gradient-to-r from-[var(--primary-starburst)] to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.albums.items.map((album: Album, index: number) => (
              <div
                key={album.id}
                className="animate-slideInUp"
                style={{ animationDelay: `${(index + 10) * 0.1}s` }}
              >
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}