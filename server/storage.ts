import { radioStations, favorites, type RadioStation, type InsertRadioStation, type Favorite, type InsertFavorite } from "@shared/schema";

export interface IStorage {
  // Radio Stations
  getAllStations(): Promise<RadioStation[]>;
  getStationById(id: number): Promise<RadioStation | undefined>;
  getStationBySlug(slug: string): Promise<RadioStation | undefined>;
  createStation(station: InsertRadioStation): Promise<RadioStation>;
  searchStations(query: string): Promise<RadioStation[]>;
  getStationsByGenre(genre: string): Promise<RadioStation[]>;
  
  // Favorites
  getFavoritesByUser(userId: string): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(stationId: number, userId: string): Promise<boolean>;
  isFavorite(stationId: number, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private stations: Map<number, RadioStation>;
  private favorites: Map<number, Favorite>;
  private currentStationId: number;
  private currentFavoriteId: number;

  constructor() {
    this.stations = new Map();
    this.favorites = new Map();
    this.currentStationId = 1;
    this.currentFavoriteId = 1;
    this.initializeStations();
  }

  private initializeStations() {
    const stationsData: InsertRadioStation[] = [
      {
        name: "Newstalk",
        slug: "newstalk",
        frequency: "106-108 FM",
        description: "News & Talk Radio",
        streamUrl: "https://radio.rte.ie/ieradio1",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/Lockup_Raspberry-1.png",
        website: "https://www.newstalk.com",
        genre: "News & Talk",
        location: "Dublin",
        gradientFrom: "hsl(347, 77%, 50%)",
        gradientTo: "hsl(328, 85%, 60%)"
      },
      {
        name: "Today FM",
        slug: "today-fm",
        description: "Contemporary Hits",
        streamUrl: "https://stream.audioxi.com/TFM",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/TDFM-LOGO-MAIN.png",
        website: "https://www.todayfm.com",
        genre: "Music",
        gradientFrom: "hsl(45, 93%, 47%)",
        gradientTo: "hsl(36, 100%, 60%)"
      },
      {
        name: "Beat 102 103",
        slug: "beat-102-103",
        description: "South East's Hit Music",
        streamUrl: "https://stream.audioxi.com/BEAT",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Beat-1.png",
        website: "https://www.beat102103.com",
        genre: "Music",
        gradientFrom: "hsl(348, 83%, 47%)",
        gradientTo: "hsl(348, 83%, 35%)"
      },
      {
        name: "iRadio",
        slug: "iradio",
        description: "Northwest's Choice",
        streamUrl: "https://stream.audioxi.com/IRADIO",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/iRadio.png",
        website: "https://www.iradio.ie",
        genre: "Music",
        gradientFrom: "hsl(187, 85%, 53%)",
        gradientTo: "hsl(217, 91%, 60%)"
      },
      {
        name: "SPIN South West",
        slug: "spin-south-west",
        description: "Hit Music Now",
        streamUrl: "https://stream.audioxi.com/SPINSW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/08/SPINSW-LOCKUP_MAIN.png",
        website: "https://www.spinsouthwest.com",
        genre: "Music",
        gradientFrom: "hsl(316, 73%, 52%)",
        gradientTo: "hsl(266, 85%, 58%)"
      },
      {
        name: "Classic Hits Radio",
        slug: "classic-hits-radio",
        description: "Ireland's Classic Hits",
        streamUrl: "https://stream.audioxi.com/CHITS",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Classic-Hits-FM.png",
        website: "https://www.classichits.ie",
        genre: "Music",
        gradientFrom: "hsl(262, 83%, 58%)",
        gradientTo: "hsl(231, 84%, 59%)"
      },
      {
        name: "Spirit Radio",
        slug: "spirit-radio",
        description: "Christian Radio",
        streamUrl: "https://www.spiritradio.ie/player/live",
        logoUrl: "https://www.spiritradio.ie/wp-content/uploads/2019/01/sr_logo.png",
        website: "https://www.spiritradio.ie",
        genre: "Christian",
        gradientFrom: "hsl(340, 75%, 55%)",
        gradientTo: "hsl(350, 80%, 45%)"
      },
      {
        name: "98FM",
        slug: "98fm",
        description: "Dublin's Music Station",
        streamUrl: "https://stream.audioxi.com/98FM",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/98-FM.png",
        website: "https://www.98fm.com",
        genre: "Music",
        gradientFrom: "hsl(262, 83%, 58%)",
        gradientTo: "hsl(231, 84%, 59%)"
      },
      {
        name: "FM104",
        slug: "fm104",
        description: "Dublin's Alternative",
        streamUrl: "https://stream.audioxi.com/FM104",
        logoUrl: "https://mmo.aiircdn.com/301/63435a48d085e.png",
        website: "https://www.fm104.ie",
        genre: "Music",
        gradientFrom: "hsl(160, 84%, 39%)",
        gradientTo: "hsl(173, 58%, 39%)"
      },
      {
        name: "Q102",
        slug: "q102",
        description: "Dublin's Q102",
        streamUrl: "https://www.q102.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Dublins-Q102.png",
        website: "https://www.q102.ie",
        genre: "Music",
        gradientFrom: "hsl(240, 75%, 55%)",
        gradientTo: "hsl(250, 80%, 60%)"
      },
      {
        name: "Radio Nova",
        slug: "radio-nova",
        description: "Dublin's Rock Station",
        streamUrl: "https://www.nova.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Nova.png",
        website: "https://www.nova.ie",
        genre: "Rock",
        gradientFrom: "hsl(210, 85%, 35%)",
        gradientTo: "hsl(220, 90%, 25%)"
      },
      {
        name: "SPIN 1038",
        slug: "spin-1038",
        description: "Dublin's Hit Music",
        streamUrl: "https://stream.audioxi.com/SPIN",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/Spin-Logo-main.png",
        website: "https://www.spin1038.com",
        genre: "Music",
        gradientFrom: "hsl(316, 73%, 52%)",
        gradientTo: "hsl(266, 85%, 58%)"
      },
      {
        name: "Sunshine 106.8",
        slug: "sunshine-106-8",
        description: "Dublin's Feel Good Station",
        streamUrl: "https://www.sunshine.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Sunshine.png",
        website: "https://www.sunshine.ie",
        genre: "Music",
        gradientFrom: "hsl(45, 93%, 47%)",
        gradientTo: "hsl(36, 100%, 60%)"
      },
      {
        name: "C103",
        slug: "c103",
        description: "Cork's C103",
        streamUrl: "https://www.c103.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/C103.png",
        website: "https://www.c103.ie",
        genre: "Music",
        gradientFrom: "hsl(280, 75%, 55%)",
        gradientTo: "hsl(290, 80%, 45%)"
      },
      {
        name: "Cork's 96FM",
        slug: "corks-96fm",
        description: "Cork's Hit Music Station",
        streamUrl: "https://www.96fm.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Corks-96FM.png",
        website: "https://www.96fm.ie",
        genre: "Music",
        gradientFrom: "hsl(200, 85%, 45%)",
        gradientTo: "hsl(210, 90%, 55%)"
      },
      {
        name: "Red FM",
        slug: "red-fm",
        description: "Cork's Red FM",
        streamUrl: "https://www.redfm.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Corks-Red-FM.png",
        website: "https://www.redfm.ie",
        genre: "Music",
        gradientFrom: "hsl(348, 83%, 47%)",
        gradientTo: "hsl(348, 83%, 35%)"
      },
      {
        name: "Galway Bay FM",
        slug: "galway-bay-fm",
        description: "Galway's Local Radio",
        streamUrl: "https://www.galwaybayfm.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Galway-Bay.png",
        website: "https://www.galwaybayfm.ie",
        genre: "Local",
        gradientFrom: "hsl(45, 85%, 50%)",
        gradientTo: "hsl(50, 90%, 40%)"
      },
      {
        name: "MidWest Radio",
        slug: "midwest-radio",
        description: "Mayo's Local Radio",
        streamUrl: "https://www.midwestradio.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Midwest-Radio.png",
        website: "https://www.midwestradio.ie",
        genre: "Local",
        gradientFrom: "hsl(215, 75%, 45%)",
        gradientTo: "hsl(225, 80%, 35%)"
      },
      {
        name: "Ocean FM",
        slug: "ocean-fm",
        description: "Northwest Coast",
        streamUrl: "https://www.oceanfm.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Ocean-FM.png",
        website: "https://www.oceanfm.ie",
        genre: "Music",
        gradientFrom: "hsl(199, 89%, 48%)",
        gradientTo: "hsl(187, 85%, 53%)"
      },
      {
        name: "East Coast FM",
        slug: "east-coast-fm",
        description: "Wicklow's Local Radio",
        streamUrl: "https://www.eastcoast.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/East-Coast-FM.png",
        website: "https://www.eastcoast.ie",
        genre: "Local",
        gradientFrom: "hsl(195, 85%, 45%)",
        gradientTo: "hsl(205, 90%, 35%)"
      },
      {
        name: "KCLR 96FM",
        slug: "kclr-96fm",
        description: "Carlow/Kilkenny Radio",
        streamUrl: "https://www.kclr96fm.com/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/KCLR.png",
        website: "https://www.kclr96fm.com",
        genre: "Local",
        gradientFrom: "hsl(24, 95%, 53%)",
        gradientTo: "hsl(348, 83%, 47%)"
      },
      {
        name: "Live 95",
        slug: "live-95",
        description: "Limerick's Live Radio",
        streamUrl: "https://www.live95fm.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/08/Live-95-Logo-600-x-600.png",
        website: "https://www.live95fm.ie",
        genre: "Music",
        gradientFrom: "hsl(328, 85%, 60%)",
        gradientTo: "hsl(348, 83%, 35%)"
      },
      {
        name: "Clare FM",
        slug: "clare-fm",
        description: "Clare's Local Radio",
        streamUrl: "https://www.clarefm.ie/player/live",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/CLare-FM.png",
        website: "https://www.clarefm.ie",
        genre: "Local",
        gradientFrom: "hsl(142, 76%, 36%)",
        gradientTo: "hsl(142, 86%, 28%)"
      }
    ];

    stationsData.forEach(station => {
      const id = this.currentStationId++;
      const fullStation: RadioStation = {
        id,
        name: station.name,
        slug: station.slug,
        frequency: station.frequency || null,
        description: station.description || null,
        streamUrl: station.streamUrl,
        logoUrl: station.logoUrl || null,
        website: station.website || null,
        genre: station.genre || null,
        location: station.location || null,
        isActive: true,
        gradientFrom: station.gradientFrom,
        gradientTo: station.gradientTo
      };
      this.stations.set(id, fullStation);
    });
  }

  async getAllStations(): Promise<RadioStation[]> {
    return Array.from(this.stations.values()).filter(station => station.isActive);
  }

  async getStationById(id: number): Promise<RadioStation | undefined> {
    return this.stations.get(id);
  }

  async getStationBySlug(slug: string): Promise<RadioStation | undefined> {
    return Array.from(this.stations.values()).find(station => station.slug === slug);
  }

  async createStation(insertStation: InsertRadioStation): Promise<RadioStation> {
    const id = this.currentStationId++;
    const station: RadioStation = {
      id,
      name: insertStation.name,
      slug: insertStation.slug,
      frequency: insertStation.frequency || null,
      description: insertStation.description || null,
      streamUrl: insertStation.streamUrl,
      logoUrl: insertStation.logoUrl || null,
      website: insertStation.website || null,
      genre: insertStation.genre || null,
      location: insertStation.location || null,
      isActive: true,
      gradientFrom: insertStation.gradientFrom,
      gradientTo: insertStation.gradientTo
    };
    this.stations.set(id, station);
    return station;
  }

  async searchStations(query: string): Promise<RadioStation[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.stations.values()).filter(station => 
      station.isActive && (
        station.name.toLowerCase().includes(lowerQuery) ||
        station.description?.toLowerCase().includes(lowerQuery) ||
        station.location?.toLowerCase().includes(lowerQuery) ||
        station.genre?.toLowerCase().includes(lowerQuery)
      )
    );
  }

  async getStationsByGenre(genre: string): Promise<RadioStation[]> {
    return Array.from(this.stations.values()).filter(
      station => station.isActive && station.genre?.toLowerCase() === genre.toLowerCase()
    );
  }

  async getFavoritesByUser(userId: string): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(favorite => favorite.userId === userId);
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = this.currentFavoriteId++;
    const favorite: Favorite = {
      id,
      stationId: insertFavorite.stationId || null,
      userId: insertFavorite.userId,
      createdAt: new Date()
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFavorite(stationId: number, userId: string): Promise<boolean> {
    const favoriteToRemove = Array.from(this.favorites.entries()).find(
      ([_, favorite]) => favorite.stationId === stationId && favorite.userId === userId
    );
    
    if (favoriteToRemove) {
      this.favorites.delete(favoriteToRemove[0]);
      return true;
    }
    return false;
  }

  async isFavorite(stationId: number, userId: string): Promise<boolean> {
    return Array.from(this.favorites.values()).some(
      favorite => favorite.stationId === stationId && favorite.userId === userId
    );
  }
}

export const storage = new MemStorage();
