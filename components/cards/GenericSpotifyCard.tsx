import type { Album, Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { Button } from '../ui/Button';

type SpotifyItem = Album | Track;

interface GenericSpotifyCardProps {
  item: SpotifyItem;
  type: 'album' | 'track';
}

export function GenericSpotifyCard({ item, type }: GenericSpotifyCardProps) {
  const getImageUrl = () => {
    if (type === 'track') {
      return (item as Track).album.images[0]?.url;
    }
    return (item as Album).images[0]?.url;
  };

  const getImageAlt = () => {
    if (type === 'track') {
      return (item as Track).album.name;
    }
    return item.name;
  };

  const getSubtitle = () => {
    if (type === 'album') {
      return (item as Album).artists.map(a => a.name).join(', ');
    }
    if (type === 'track') {
      return (item as Track).artists.map(a => a.name).join(', ');
    }
    return null;
  };

  const getThirdLine = () => {
    if (type === 'track') {
      return (item as Track).album.name;
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleSpotifyOpen = () => {
    if (item.external_urls?.spotify) {
      window.open(item.external_urls.spotify, '_blank');
    }
  };

  const getHoverColor = () => {
    switch (type) {
      case 'album': return 'var(--primary-starburst)';
      case 'track': return 'var(--primary-mars)';
      default: return 'var(--primary-mars)';
    }
  };

  const imageUrl = getImageUrl();
  const subtitle = getSubtitle();

  return (
    <div
      className="group bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-start space-x-4">
        {imageUrl && (
          <div className={`relative flex-shrink-0 w-16 h-16 overflow-hidden`}>
            <Image
              src={imageUrl}
              alt={getImageAlt()}
              width={64}
              height={64}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 mt-1"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-[var(--text-primary)] text-lg mb-1 truncate transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => {
              if (e.currentTarget.closest('.group:hover')) {
                e.currentTarget.style.color = getHoverColor();
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            {item.name}
          </h3>
          {subtitle && (
            <p className="text-[var(--text-secondary)] text-sm mb-1 truncate">
              {subtitle}
            </p>
          )}

          <p className="text-[var(--text-muted)] text-xs mb-4">{getThirdLine()}</p>


          <div className='flex justify-end'>
            <Button variant='primary' size='sm' className='flex space-x-2' onClick={handleSpotifyOpen}>
              <Image
                src="/spotify-icon.svg"
                alt="Spotify"
                width={18}
                height={18}
              />
              <span>Play</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}