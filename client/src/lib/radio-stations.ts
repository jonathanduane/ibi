import type { RadioStation } from "@shared/schema";

export const RADIO_STATIONS: Omit<RadioStation, 'id'>[] = [
  {
    name: "Newstalk",
    slug: "newstalk",
    frequency: "106-108 FM",
    description: "News & Talk Radio",
    streamUrl: "https://www.newstalk.com/player/live",
    logoUrl: null,
    website: "https://www.newstalk.com",
    genre: "News & Talk",
    location: "Dublin",
    isActive: true,
    gradientFrom: "hsl(347, 77%, 50%)",
    gradientTo: "hsl(328, 85%, 60%)"
  },
  {
    name: "Today FM",
    slug: "today-fm",
    frequency: "100-102 FM", 
    description: "Contemporary Hits",
    streamUrl: "https://www.todayfm.com/player/live",
    logoUrl: null,
    website: "https://www.todayfm.com",
    genre: "Music",
    location: "Dublin",
    isActive: true,
    gradientFrom: "hsl(45, 93%, 47%)",
    gradientTo: "hsl(36, 100%, 60%)"
  },
  {
    name: "Beat 102 103",
    slug: "beat-102-103",
    frequency: "102-103 FM",
    description: "South East's Hit Music",
    streamUrl: "https://www.beat102103.com/player/live",
    logoUrl: null,
    website: "https://www.beat102103.com",
    genre: "Music", 
    location: "Waterford",
    isActive: true,
    gradientFrom: "hsl(348, 83%, 47%)",
    gradientTo: "hsl(348, 83%, 35%)"
  },
  {
    name: "iRadio",
    slug: "iradio",
    frequency: "105-107 FM",
    description: "Northwest's Choice",
    streamUrl: "https://www.iradio.ie/player/live",
    logoUrl: null,
    website: "https://www.iradio.ie",
    genre: "Music",
    location: "Athlone", 
    isActive: true,
    gradientFrom: "hsl(187, 85%, 53%)",
    gradientTo: "hsl(217, 91%, 60%)"
  },
  {
    name: "SPIN South West",
    slug: "spin-south-west", 
    frequency: "103 FM",
    description: "Hit Music Now",
    streamUrl: "https://www.spinsouthwest.com/player/live",
    logoUrl: null,
    website: "https://www.spinsouthwest.com",
    genre: "Music",
    location: "Kerry/Cork",
    isActive: true,
    gradientFrom: "hsl(316, 73%, 52%)",
    gradientTo: "hsl(266, 85%, 58%)"
  }
];

export const getStationBySlug = (slug: string): Omit<RadioStation, 'id'> | undefined => {
  return RADIO_STATIONS.find(station => station.slug === slug);
};

export const getStationsByGenre = (genre: string): Omit<RadioStation, 'id'>[] => {
  return RADIO_STATIONS.filter(station => 
    station.genre?.toLowerCase() === genre.toLowerCase()
  );
};

export const searchStations = (query: string): Omit<RadioStation, 'id'>[] => {
  const lowerQuery = query.toLowerCase();
  return RADIO_STATIONS.filter(station =>
    station.name.toLowerCase().includes(lowerQuery) ||
    station.description?.toLowerCase().includes(lowerQuery) ||
    station.location?.toLowerCase().includes(lowerQuery) ||
    station.genre?.toLowerCase().includes(lowerQuery)
  );
};
