import { useState, useEffect } from 'react';

export function useSpotify() {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);

  const getAccessToken = async () => {
    try {
      const response = await fetch('/api/spotify-auth', {
        method: 'POST',
      });
      const data = await response.json();
      setAccessToken(data.access_token);
    } catch (error) {
      console.error('Failed to get access token:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return {
    accessToken: !!accessToken,
    loading,
    refreshToken: getAccessToken
  };
}