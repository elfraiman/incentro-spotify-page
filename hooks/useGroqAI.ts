// This hook is deprecated - use useGroqQuery instead
// Keeping for backward compatibility during transition
import { useGroqAI as useGroqQuery } from './useGroqQuery';

export function useGroqAI() {
  const { askAI, getMusicRecommendations, loading, error } = useGroqQuery();

  return {
    askAI,
    getMusicRecommendations,
    isLoading: loading,
    error,
    clearError: () => { }
  };
}