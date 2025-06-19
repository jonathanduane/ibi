import { VercelRequest, VercelResponse } from '@vercel/node';

// Define the radio stations data directly in the API function
const RADIO_STATIONS = [
  {
    id: 1,
    name: "Newstalk",
    slug: "newstalk",
    frequency: "106-108 FM",
    description: "News & Talk Radio",
    streamUrl: "https://radio.rte.ie/ieradio1",
    logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/Lockup_Raspberry-1.png",
    website: "https://www.newstalk.com",
    genre: "News & Talk",
    location: "Dublin",
    gradientFrom: "hsl(15, 86%, 50%)",
    gradientTo: "hsl(31, 95%, 60%)"
  },
  {
    id: 2,
    name: "Today FM",
    slug: "today-fm",
    description: "Contemporary Hits",
    streamUrl: "https://stream.audioxi.com/TFM",
    logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/TDFM-LOGO-MAIN.png",
    website: "https://www.todayfm.com",
    genre: "Music",
    gradientFrom: "hsl(45, 93%, 47%)",
    gradientTo: "hsl(60, 100%, 50%)"
  },
  {
    id: 3,
    name: "Beat 102 103",
    slug: "beat-102-103",
    description: "South East's Hit Music",
    streamUrl: "https://stream.audioxi.com/BEAT",
    logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Beat-1.png",
    website: "https://www.beat102103.com",
    genre: "Music",
    gradientFrom: "hsl(348, 83%, 47%)",
    gradientTo: "hsl(0, 84%, 60%)"
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    name: "Spirit Radio",
    slug: "spirit-radio",
    description: "Christian Radio",
    streamUrl: "https://www.spiritradio.ie/player/live",
    logoUrl: "https://www.spiritradio.ie/wp-content/uploads/2019/01/sr_logo.png",
    website: "https://www.spiritradio.ie",
    genre: "Christian",
    gradientFrom: "hsl(210, 79%, 46%)",
    gradientTo: "hsl(227, 100%, 50%)"
  },
  {
    id: 8,
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
    id: 9,
    name: "FM104",
    slug: "fm104",
    description: "Dublin's Alternative",
    streamUrl: "https://stream.audioxi.com/FM104",
    logoUrl: "https://mmo.aiircdn.com/301/63435a48d085e.png",
    website: "https://www.fm104.ie",
    genre: "Music",
    gradientFrom: "hsl(160, 84%, 39%)",
    gradientTo: "hsl(158, 64%, 52%)"
  },
  {
    id: 10,
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
    id: 11,
    name: "RTÉ Radio 1",
    slug: "rte-radio-1",
    description: "National Public Radio",
    streamUrl: "https://www.rte.ie/radio/radioplayer/html5/?station=r1&type=url",
    logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/RTE-Radio-1.png",
    website: "https://www.rte.ie/radio1",
    genre: "News & Talk",
    gradientFrom: "hsl(210, 79%, 46%)",
    gradientTo: "hsl(227, 100%, 50%)"
  },
  {
    id: 12,
    name: "RTÉ 2FM",
    slug: "rte-2fm",
    description: "Pop & Rock Music",
    streamUrl: "https://www.rte.ie/radio/radioplayer/html5/?station=r2&type=url",
    logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/2FM-LOGO-main.png",
    website: "https://www.rte.ie/2fm",
    genre: "Music",
    gradientFrom: "hsl(45, 93%, 47%)",
    gradientTo: "hsl(60, 100%, 50%)"
  }
];

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
      
      let stations = RADIO_STATIONS;
      
      // Filter by search query
      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        stations = stations.filter(station => 
          station.name.toLowerCase().includes(searchLower) ||
          station.description.toLowerCase().includes(searchLower) ||
          station.genre.toLowerCase().includes(searchLower) ||
          (station.location && station.location.toLowerCase().includes(searchLower))
        );
      }
      
      // Filter by genre
      if (genre && typeof genre === 'string' && genre !== 'all') {
        stations = stations.filter(station => 
          station.genre.toLowerCase() === genre.toLowerCase()
        );
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