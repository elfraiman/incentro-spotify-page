import { useState } from 'react';
import { SearchResults as SearchResultsType } from '../types/spotify';
import { SearchForm } from '../components/SearchForm';
import { SearchResults } from '../components/SearchResults';
import { ThemeToggle } from '../components/ThemeToggle';
import { OrangeBackground } from '../components/ui/OrangeBackground';
import { AIChat } from '../components/AIChat';
import { useSpotifySearch } from '../hooks/useSpotifyQuery';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

export default function Home() {
  const [results, setResults] = useState<SearchResultsType>({});
  const { search, loading } = useSpotifySearch();

  const handleSearch = async (query: string) => {
    try {
      const searchResults = await search(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults({});
    }
  };

  const handleVoiceResult = (transcript: string) => {
    handleSearch(transcript);
  };

  const { startVoiceSearch, isListening } = useVoiceSearch(handleVoiceResult);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300">
      <ThemeToggle />
      <OrangeBackground />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
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
              and let our intelligent system find the perfect tracks, artists, and albums for you.
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


        <div className="mb-16">
          <SearchForm
            onSearch={handleSearch}
            onVoiceSearch={startVoiceSearch}
            loading={loading}
            isListening={isListening}
          />
        </div>

        <SearchResults results={results} loading={loading} />
      </main>

      <AIChat onSearch={handleSearch} />
    </div>
  );
}