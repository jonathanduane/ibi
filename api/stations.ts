import { VercelRequest, VercelResponse } from '@vercel/node';
import { MemStorage } from '../server/storage';

// Initialize storage instance
const storage = new MemStorage();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { search, genre } = req.query;
      
      let stations;
      if (search && typeof search === 'string') {
        stations = await storage.searchStations(search);
      } else if (genre && typeof genre === 'string' && genre !== 'all') {
        stations = await storage.getStationsByGenre(genre);
      } else {
        stations = await storage.getAllStations();
      }
      
      res.status(200).json(stations);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}