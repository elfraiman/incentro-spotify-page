import { useState } from 'react';
import { Button } from '../ui/Button';

interface SearchFormProps {
  onSearch: (query: string) => void;
  onVoiceSearch: () => void;
  loading: boolean;
  isListening: boolean;
}

export function SearchForm({ onSearch, onVoiceSearch, loading, isListening }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="relative bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl p-4 shadow-lg group-focus-within:shadow-xl group-focus-within:border-[var(--primary-mars)]/30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe the music you're looking for..."
                  className="w-full pl-12 pr-4 py-4 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-mars)]/20 focus:border-[var(--primary-mars)] transition-all duration-300 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-lg"
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !query.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] hover:from-[var(--primary-mars)]/90 hover:to-[var(--primary-starburst)]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Search</span>
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={onVoiceSearch}
                  disabled={loading}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse'
                    : 'bg-[var(--surface-elevated)] hover:bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:shadow-lg'
                    }`}
                >
                  {isListening ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span>Listening...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                      <span>Voice</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-white">
          Try: &quot;upbeat workout music&quot; or &quot;chill jazz for studying&quot; or &quot;90s rock hits&quot;
        </p>
      </div>
    </div>
  );
}