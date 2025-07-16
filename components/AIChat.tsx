import { useState, useRef, useEffect } from 'react';
import { useGroqAI } from '../hooks/useGroqQuery';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  searchQuery?: string;
}

interface AIChatProps {
  onSearch: (query: string) => void;
}

export function AIChat({ onSearch }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI music assistant. Tell me what kind of music you're in the mood for, and I'll help you discover the perfect tracks! 🎵",
      timestamp: new Date(),
      suggestions: [
        "I want energetic workout music",
        "Find me some chill study music",
        "I'm feeling nostalgic for 90s hits",
        "Something romantic for a date night"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { askAI, loading: isLoading } = useGroqAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message?: string) => {
    const messageToSend = message || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const data = await askAI(messageToSend);

      /* Normalize AI response format to handle both structured objects and plain strings
       * Structured responses: { message: string, suggestions?: string[], search_query?: string }
       */
      const isStructured = data && typeof data === 'object' && data.message;
      const message = isStructured ? data.message : (typeof data === 'string' ? data : 'Sorry, I got an unexpected response format.');
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: message,
        timestamp: new Date(),
        suggestions: isStructured ? (data.suggestions || []) : [],
        searchQuery: isStructured ? data.search_query : undefined
      };

      setMessages(prev => [...prev, aiMessage]);

      // Automatically search if we have a search query
      if (isStructured && data.search_query) {
        setTimeout(() => {
          onSearch(data.search_query);
        }, 500);
      }

    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Sorry, I'm having trouble connecting right now. Please try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">AI Music Assistant</h3>
                <p className="text-sm text-white/80">Powered by Groq</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${message.type === 'user'
                  ? 'bg-[var(--primary-mars)] text-white'
                  : 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                  }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-[var(--text-muted)] font-medium mb-2">💡 Try asking:</p>
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSend(suggestion)}
                          className="block w-full text-left p-2 text-xs bg-[var(--surface)] hover:bg-[var(--primary-mars)]/10 hover:border-[var(--primary-mars)]/30 border border-[var(--border)] rounded-lg transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--primary-mars)]"
                        >
                          <span className="text-[var(--text-muted)]">→</span> {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface-elevated)] p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[var(--border)]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about music..."
                className="flex-1 px-3 py-2 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-mars)]/20 focus:border-[var(--primary-mars)] text-[var(--text-primary)] text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-[var(--primary-mars)] hover:bg-[var(--primary-starburst)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}