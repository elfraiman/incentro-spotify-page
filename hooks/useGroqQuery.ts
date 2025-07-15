import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AIResponse {
  message: string;
  search_query: string;
  suggestions: string[];
}

interface GroqAIParams {
  message: string;
}

// Groq AI function
const askGroqAI = async ({ message }: GroqAIParams): Promise<AIResponse> => {
  if (!message.trim()) {
    throw new Error('Message is required');
  }

  const response = await fetch('/api/groq-music', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`AI request failed: ${response.status}`);
  }

  return response.json();
};

// React Query hook for Groq AI
export function useGroqAI() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: askGroqAI,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['groq-ai', variables.message], data);
    },
    retry: (failureCount, error) => {
      if (error.message.includes('400') || error.message.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const askAI = (message: string) => {
    return mutation.mutateAsync({ message });
  };

  const getMusicRecommendations = async (prompt: string): Promise<string | null> => {
    try {
      const response = await askAI(prompt);
      return response?.search_query || null;
    } catch (error) {
      console.error('Failed to get music recommendations:', error);
      return null;
    }
  };

  return {
    askAI,
    getMusicRecommendations,
    loading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

// Hook for streaming AI conversations
export function useAIConversation() {
  const queryClient = useQueryClient();

  const addMessageToCache = (conversationId: string, message: any) => {
    const existing = queryClient.getQueryData<any[]>(['conversation', conversationId]) || [];
    const updated = [...existing, message];
    queryClient.setQueryData(['conversation', conversationId], updated);
  };

  const clearConversation = (conversationId: string) => {
    queryClient.removeQueries({ queryKey: ['conversation', conversationId] });
  };

  return {
    addMessageToCache,
    clearConversation,
  };
}