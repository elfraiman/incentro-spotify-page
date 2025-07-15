import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q, type = 'track,artist,album', access_token } = req.query;

  if (!q || !access_token) {
    return res.status(400).json({ message: 'Query and access token are required' });
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q as string)}&type=${type}&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Search failed');
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}