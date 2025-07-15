import Image from 'next/image';
import { Artist } from '../../types/spotify';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="group bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:shadow-xl hover:shadow-[var(--primary-incentronaut)]/10 transition-all duration-300 transform hover:scale-105 hover:border-[var(--primary-incentronaut)]/30">
      <div className="flex items-start space-x-4">
        {artist.images[0] && (
          <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={artist.images[0].url}
              alt={artist.name}
              width={64}
              height={64}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-1 truncate group-hover:text-[var(--primary-incentronaut)] transition-colors duration-300">
            {artist.name}
          </h3>
          <p className="text-[var(--text-muted)] text-sm mb-4">Artist</p>
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[var(--primary-incentronaut)] hover:bg-[var(--primary-mars)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>View</span>
          </a>
        </div>
      </div>
    </div>
  );
}