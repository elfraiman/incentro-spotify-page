import type { Album, Track } from '@spotify/web-api-ts-sdk';
import React, { useEffect, useMemo, useRef } from 'react';
import { GenericSpotifyCard } from '../cards/GenericSpotifyCard';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { SectionHeader } from './SectionHeader';

interface ResultSectionProps {
  items: (Track | Album)[];
  type: 'track' | 'album';
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
}

export function ResultSection({ items, type, title, icon, gradientFrom, gradientTo, loading, hasMore, onLoadMore, loadingMore }: ResultSectionProps) {
  const memoizedItems = useMemo(() => items, [items]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevItemsLengthRef = useRef(items.length);

  useEffect(() => {
    if (loadingMore === false && items.length > prevItemsLengthRef.current) {
      // Scroll to bottom when new items are loaded
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
    prevItemsLengthRef.current = items.length;
  }, [ loadingMore]);

  if (!memoizedItems || memoizedItems.length === 0) return null;

  return (
    <section className="flex flex-col">
      {loading && !loadingMore ? (
        <section className="animate-fadeIn">
          <LoadingSkeleton />
        </section>
      ) : (
        <>
          <SectionHeader
            title={title}
            count={memoizedItems.length}
            icon={icon}
            gradientFrom={gradientFrom}
            gradientTo={gradientTo}
            loading={loading}
          />
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="max-h-[600px] border-orange-500 border-1 overflow-y-auto scroll-smooth rounded-lg bg-orange-500/5 backdrop-blur-sm shadow-inner"
        
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
                {memoizedItems.map((item) => (
                  <GenericSpotifyCard key={item.id} item={item} type={type} />
                ))}
              </div>

              {loadingMore && (
                <div className="flex justify-center items-center py-8">
                  <div className="flex items-center gap-3 text-[var(--text-muted)]">
                    <div className="w-5 h-5 border-2 border-[var(--primary-mars)] border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading more {title.toLowerCase()}...</span>
                  </div>
                </div>
              )}

              {hasMore && onLoadMore && !loadingMore && (
                <div className="flex justify-center mt-8 mb-4">
                  <button
                    onClick={onLoadMore}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Load More {title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}


    </section>
  );
} 