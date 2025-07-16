import { NextApiRequest, NextApiResponse } from 'next';
import { searchSpotify } from '../../lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const results = await searchSpotify(q as string);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ 
      message: 'Search failed', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}