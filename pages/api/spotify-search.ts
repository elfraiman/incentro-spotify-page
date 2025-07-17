import { NextApiRequest, NextApiResponse } from 'next';
import { searchSpotify } from '../../lib/spotify';
import { MaxInt } from '@spotify/web-api-ts-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q, offset, limit } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const offsetNum = offset ? parseInt(offset as string, 10) : 0;
    const limitNum = limit ? Math.min(parseInt(limit as string, 10), 50) : 20;
    
    const results = await searchSpotify(q as string, offsetNum, limitNum as MaxInt<50>);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ 
      message: 'Search failed', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}