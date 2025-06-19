import { RADIO_STATIONS_DATA } from './stations-data';
import type { RadioStation } from '../../../shared/schema';

// Mock API service that works without backend
export class MockApiService {
  private stations: RadioStation[] = RADIO_STATIONS_DATA;

  async getAllStations(): Promise<RadioStation[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.stations];
  }

  async searchStations(query: string): Promise<RadioStation[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const searchLower = query.toLowerCase();
    return this.stations.filter(station => 
      station.name.toLowerCase().includes(searchLower) ||
      station.description.toLowerCase().includes(searchLower) ||
      station.genre.toLowerCase().includes(searchLower) ||
      (station.location && station.location.toLowerCase().includes(searchLower))
    );
  }

  async getStationsByGenre(genre: string): Promise<RadioStation[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (genre === 'all') return this.getAllStations();
    return this.stations.filter(station => 
      station.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  async getStationById(id: number): Promise<RadioStation | undefined> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.stations.find(station => station.id === id);
  }

  async getStationBySlug(slug: string): Promise<RadioStation | undefined> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.stations.find(station => station.slug === slug);
  }
}

export const mockApi = new MockApiService();