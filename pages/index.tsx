import { SearchForm } from '@/components/search/SearchForm';
import { SpotifySearchResults } from '@/lib/spotify';
import { useState } from 'react';
import { AIChat } from '../components/AIChat';
import { SearchResults } from '../components/search/SearchResults';
import { ThemeToggle } from '../components/ThemeToggle';
import { OrangeBackground } from '../components/ui/OrangeBackground';
import { useSpotifySearch } from '../hooks/useSpotifyQuery';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

export default function Home() {
  const [results, setResults] = useState<SpotifySearchResults>({});
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [voiceInput, setVoiceInput] = useState('');
  const [loadingMore, setLoadingMore] = useState<{ tracks: boolean; albums: boolean }>({
    tracks: false,
    albums: false
  });
  const { search, loading } = useSpotifySearch();

  const handleSearch = async (query: string) => {
    try {
      setHasSearched(true);
      setCurrentQuery(query); 
      const searchResults = await search(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults({});
    } finally {
      setLoadingMore({ tracks: false, albums: false });
    }
  };

  const handleLoadMore = async (type: 'tracks' | 'albums') => {
    if (!currentQuery || !results[type]) return;
    
    try {
      setLoadingMore(prev => ({ ...prev, [type]: true }));
      const currentItems = results[type]!.items;
      const offset = currentItems.length;
      const moreResults = await search(currentQuery, offset);
      
      setResults(prev => ({
        ...prev,
        [type]: {
          ...moreResults[type]!,
          items: [...currentItems, ...moreResults[type]!.items]
        }
      }));
    } catch (error) {
      console.error('Load more failed:', error);
    } finally {
      setLoadingMore(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleVoiceResult = (transcript: string) => {
    setVoiceInput('');
    handleSearch(transcript);
  };

  const handleVoiceInterim = (transcript: string) => {
    setVoiceInput(transcript);
  };

  const { startVoiceSearch, stopVoiceSearch, isListening } = useVoiceSearch(handleVoiceResult, handleVoiceInterim);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300">
      <ThemeToggle />
      <OrangeBackground />

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 py-12 relative">
        <div className="relative text-center overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Discover Music with
              <span className="block text-transparent pb-2 bg-clip-text bg-gradient-to-r from-blue-50 to-blue-300">
                Artificial Intelligence
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform the way you find music. Chat with our AI assistant, use voice search, or describe what you&apos;re looking for,
              and let our intelligent system find the perfect tracks and albums for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm">AI chat assistant</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-sm">Voice search enabled</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Millions of tracks</span>
              </div>
            </div>
          </div>
        </div>


        <div className="mb-24">
          <SearchForm
            onSearch={handleSearch}
            onVoiceSearch={startVoiceSearch}
            onVoiceStop={stopVoiceSearch}
            loading={loading}
            isListening={isListening}
            voiceInput={voiceInput}
          />
        </div>

        <SearchResults results={results} loading={loading} hasSearched={hasSearched} onLoadMore={handleLoadMore} loadingMore={loadingMore} />
      </main>

      <AIChat onSearch={handleSearch} />
    </div>
  );
}