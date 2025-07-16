import React from 'react';
import type { Track, Album } from '@spotify/web-api-ts-sdk';
import { GenericSpotifyCard } from '../cards/GenericSpotifyCard';
import { SectionHeader } from './SectionHeader';

interface ResultSectionProps {
  items: (Track | Album)[];
  type: 'track' | 'album';
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  loading?: boolean;
}

export function ResultSection({ items, type, title, icon, gradientFrom, gradientTo, loading }: ResultSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section>
      <SectionHeader
        title={title}
        count={items.length}
        icon={icon}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        loading={loading}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <GenericSpotifyCard key={item.id} item={item} type={type} />
        ))}
      </div>
    </section>
  );
} 