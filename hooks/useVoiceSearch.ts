import { useState, useCallback } from 'react';

export function useVoiceSearch(onResult: (transcript: string) => void, onInterimResult?: (transcript: string) => void) {
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript;
      if (event.results[lastResultIndex].isFinal) {
        onResult(transcript);
      } else if (onInterimResult) {
        onInterimResult(transcript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'network') {
        alert('Speech service unavailable. This might be due to HTTPS requirement or service timeout. Try again in a moment.');
      } else if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access and try again.');
      } else if (event.error === 'aborted') {
        // User likely stopped it, no need to alert
      } else {
        alert(`Speech recognition error: ${event.error}`);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsListening(false);
      alert('Failed to start speech recognition. Please try again.');
    }
  }, [onResult, onInterimResult]);

  return {
    startVoiceSearch,
    isListening
  };
}