import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Radio, Music, Newspaper, Star, Grid3X3, List, Settings, Heart, RadioTower, Users, Signal, ExternalLink } from "lucide-react";
import { StationCard } from "@/components/station-card";
import { FloatingPlayer } from "@/components/floating-player";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import type { RadioStation } from "@shared/schema";

const genres = [
  { id: "all", label: "All Stations", icon: Radio },
  { id: "music", label: "Music", icon: Music },
  { id: "news", label: "News & Talk", icon: Newspaper },
  { id: "local", label: "Local", icon: Star },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { currentStation, isPlaying, volume, isLoading: audioLoading, error: audioError, playStation, pauseStation, setVolume } = useAudioPlayer();

  // Use embedded station data directly instead of API call
  const stations = useMemo(() => {
    const stationsData = [
      {
        id: 1,
        name: "Newstalk",
        slug: "newstalk",
        frequency: "106-108 FM",
        description: "News & Talk Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/Lockup_Raspberry-1.png",
        website: "https://www.newstalk.com",
        genre: "News & Talk",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(15, 86%, 50%)",
        gradientTo: "hsl(31, 95%, 60%)"
      },
      {
        id: 2,
        name: "Today FM",
        slug: "today-fm",
        frequency: "100-102 FM",
        description: "Contemporary Hits",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/TDFM-LOGO-MAIN.png",
        website: "https://www.todayfm.com",
        genre: "Music",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(45, 93%, 47%)",
        gradientTo: "hsl(60, 100%, 50%)"
      },
      {
        id: 3,
        name: "Beat 102 103",
        slug: "beat-102-103",
        frequency: "102-103 FM",
        description: "South East's Hit Music",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Beat-1.png",
        website: "https://www.beat102103.com",
        genre: "Music",
        location: "Waterford",
        isActive: true,
        gradientFrom: "hsl(348, 83%, 47%)",
        gradientTo: "hsl(0, 84%, 60%)"
      },
      {
        id: 4,
        name: "iRadio",
        slug: "iradio",
        frequency: "105.2 FM",
        description: "Northwest's Choice",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/iRadio.png",
        website: "https://www.iradio.ie",
        genre: "Music",
        location: "Sligo",
        isActive: true,
        gradientFrom: "hsl(187, 85%, 53%)",
        gradientTo: "hsl(217, 91%, 60%)"
      },
      {
        id: 5,
        name: "SPIN South West",
        slug: "spin-south-west",
        frequency: "103.1 FM",
        description: "Hit Music Now",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/08/SPINSW-LOCKUP_MAIN.png",
        website: "https://www.spinsouthwest.com",
        genre: "Music",
        location: "Cork",
        isActive: true,
        gradientFrom: "hsl(316, 73%, 52%)",
        gradientTo: "hsl(266, 85%, 58%)"
      },
      {
        id: 6,
        name: "Classic Hits Radio",
        slug: "classic-hits-radio",
        frequency: "96.4 FM",
        description: "Ireland's Classic Hits",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Classic-Hits-FM.png",
        website: "https://www.classichits.ie",
        genre: "Music",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(262, 83%, 58%)",
        gradientTo: "hsl(231, 84%, 59%)"
      },
      {
        id: 7,
        name: "Spirit Radio",
        slug: "spirit-radio",
        frequency: "103.2 FM",
        description: "Christian Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://www.spiritradio.ie/wp-content/uploads/2019/01/sr_logo.png",
        website: "https://www.spiritradio.ie",
        genre: "Christian",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(210, 79%, 46%)",
        gradientTo: "hsl(227, 100%, 50%)"
      },
      {
        id: 8,
        name: "98FM",
        slug: "98fm",
        frequency: "98.1 FM",
        description: "Dublin's Music Station",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/09/98-FM.png",
        website: "https://www.98fm.com",
        genre: "Music",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(262, 83%, 58%)",
        gradientTo: "hsl(231, 84%, 59%)"
      },
      {
        id: 9,
        name: "FM104",
        slug: "fm104",
        frequency: "104.4 FM",
        description: "Dublin's Alternative",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://mmo.aiircdn.com/301/63435a48d085e.png",
        website: "https://www.fm104.ie",
        genre: "Music",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(160, 84%, 39%)",
        gradientTo: "hsl(158, 64%, 52%)"
      },
      {
        id: 10,
        name: "Q102",
        slug: "q102",
        frequency: "102.2 FM",
        description: "Dublin's Q102",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://mmo.aiircdn.com/301/67921da01ce24.png",
        website: "https://www.q102.ie",
        genre: "Music",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(240, 75%, 55%)",
        gradientTo: "hsl(250, 80%, 60%)"
      },
      {
        id: 11,
        name: "Radio Nova",
        slug: "radio-nova",
        frequency: "100.3 FM",
        description: "Dublin's Rock Station",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://www.nova.ie/wp-content/uploads/2024/11/main-logo.png",
        website: "https://www.nova.ie",
        genre: "Rock",
        location: "Dublin",
        isActive: true,
        gradientFrom: "hsl(210, 85%, 35%)",
        gradientTo: "hsl(220, 90%, 25%)"
      },
      {
        id: 12,
        name: "Red FM",
        slug: "red-fm",
        frequency: "104.5 FM",
        description: "Cork's Red FM",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Corks-Red-FM.png",
        website: "https://www.redfm.ie",
        genre: "Music",
        location: "Cork",
        isActive: true,
        gradientFrom: "hsl(348, 83%, 47%)",
        gradientTo: "hsl(348, 83%, 35%)"
      },
      {
        id: 13,
        name: "Galway Bay FM",
        slug: "galway-bay-fm",
        frequency: "95.8 FM",
        description: "Galway's Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Galway-Bay.png",
        website: "https://www.galwaybayfm.ie",
        genre: "Local",
        location: "Galway",
        isActive: true,
        gradientFrom: "hsl(45, 85%, 50%)",
        gradientTo: "hsl(50, 90%, 40%)"
      },
      {
        id: 14,
        name: "MidWest Radio",
        slug: "midwest-radio",
        frequency: "96.1 FM",
        description: "Mayo's Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Midwest-Radio.png",
        website: "https://www.midwestradio.ie",
        genre: "Local",
        location: "Mayo",
        isActive: true,
        gradientFrom: "hsl(215, 75%, 45%)",
        gradientTo: "hsl(225, 80%, 35%)"
      },
      {
        id: 15,
        name: "Ocean FM",
        slug: "ocean-fm",
        frequency: "102.5 FM",
        description: "Northwest Coast",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Ocean-FM.png",
        website: "https://www.oceanfm.ie",
        genre: "Music",
        location: "Sligo",
        isActive: true,
        gradientFrom: "hsl(199, 89%, 48%)",
        gradientTo: "hsl(187, 85%, 53%)"
      },
      {
        id: 16,
        name: "East Coast FM",
        slug: "east-coast-fm",
        frequency: "103.0 FM",
        description: "Wicklow's Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/East-Coast-FM.png",
        website: "https://www.eastcoast.ie",
        genre: "Local",
        location: "Wicklow",
        isActive: true,
        gradientFrom: "hsl(195, 85%, 45%)",
        gradientTo: "hsl(205, 90%, 35%)"
      },
      {
        id: 17,
        name: "KCLR 96FM",
        slug: "kclr-96fm",
        frequency: "96.0 FM",
        description: "Carlow/Kilkenny Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/KCLR.png",
        website: "https://www.kclr96fm.com",
        genre: "Local",
        location: "Carlow",
        isActive: true,
        gradientFrom: "hsl(24, 95%, 53%)",
        gradientTo: "hsl(348, 83%, 47%)"
      },
      {
        id: 18,
        name: "Live 95",
        slug: "live-95",
        frequency: "95.0 FM",
        description: "Limerick's Live Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/08/Live-95-Logo-600-x-600.png",
        website: "https://www.live95fm.ie",
        genre: "Music",
        location: "Limerick",
        isActive: true,
        gradientFrom: "hsl(328, 85%, 60%)",
        gradientTo: "hsl(348, 83%, 35%)"
      },
      {
        id: 19,
        name: "Clare FM",
        slug: "clare-fm",
        frequency: "96.4 FM",
        description: "Clare's Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/CLare-FM.png",
        website: "https://www.clarefm.ie",
        genre: "Local",
        location: "Clare",
        isActive: true,
        gradientFrom: "hsl(142, 76%, 36%)",
        gradientTo: "hsl(142, 86%, 28%)"
      },
      {
        id: 20,
        name: "Highland Radio",
        slug: "highland-radio",
        frequency: "103.3 FM",
        description: "Donegal's Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Highland-Radio.png",
        website: "https://www.highlandradio.com",
        genre: "Local",
        location: "Donegal",
        isActive: true,
        gradientFrom: "hsl(140, 60%, 40%)",
        gradientTo: "hsl(160, 70%, 30%)"
      },
      {
        id: 21,
        name: "Shannonside FM",
        slug: "shannonside-fm",
        frequency: "104.1 FM",
        description: "Longford/Roscommon Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://www.shannonside.ie/images/logo_2x.png",
        website: "https://www.shannonsidefm.ie",
        genre: "Local",
        location: "Longford",
        isActive: true,
        gradientFrom: "hsl(210, 79%, 46%)",
        gradientTo: "hsl(210, 90%, 55%)"
      },
      {
        id: 22,
        name: "WLR FM",
        slug: "wlr-fm",
        frequency: "95.1 FM",
        description: "Waterford Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/WLR.png",
        website: "https://www.wlrfm.com",
        genre: "Local",
        location: "Waterford",
        isActive: true,
        gradientFrom: "hsl(348, 85%, 50%)",
        gradientTo: "hsl(348, 75%, 35%)"
      },
      {
        id: 23,
        name: "C103",
        slug: "c103",
        frequency: "103.0 FM",
        description: "Cork's C103",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ourstoprotect.ie/wp-content/uploads/2023/05/C103.png",
        website: "https://www.c103.ie",
        genre: "Music",
        location: "Cork",
        isActive: true,
        gradientFrom: "hsl(348, 83%, 47%)",
        gradientTo: "hsl(0, 84%, 60%)"
      },
      {
        id: 24,
        name: "Northern Sound",
        slug: "northern-sound",
        frequency: "94.8 FM",
        description: "Cavan/Monaghan Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://www.northernsound.ie/images/logo_2x.png",
        website: "https://www.northernsound.ie",
        genre: "Local",
        location: "Cavan",
        isActive: true,
        gradientFrom: "hsl(210, 79%, 46%)",
        gradientTo: "hsl(227, 100%, 50%)"
      },
      {
        id: 25,
        name: "Tipp FM",
        slug: "tipp-fm",
        frequency: "97.1 FM",
        description: "Tipperary's Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Tipp-FM.png",
        website: "https://www.tippfm.com",
        genre: "Local",
        location: "Tipperary",
        isActive: true,
        gradientFrom: "hsl(142, 76%, 36%)",
        gradientTo: "hsl(142, 86%, 28%)"
      },
      {
        id: 26,
        name: "Radio Kerry",
        slug: "radio-kerry",
        frequency: "97.0 FM",
        description: "Kerry's Local Radio",
        streamUrl: "https://live-bauerie.sharp-stream.com/IRADNW",
        logoUrl: "https://ibireland.ie/wp-content/uploads/2023/05/Radio-Kerry.png",
        website: "https://www.radiokerry.ie",
        genre: "Local",
        location: "Kerry",
        isActive: true,
        gradientFrom: "hsl(140, 60%, 40%)",
        gradientTo: "hsl(160, 70%, 30%)"
      }
    ];
    return stationsData;
  }, []);
  
  const stationsLoading = false;
  const stationsError = null;

  const filteredStations = useMemo(() => {
    let filtered = stations;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(station =>
        station.name.toLowerCase().includes(query) ||
        station.description?.toLowerCase().includes(query) ||
        station.location?.toLowerCase().includes(query) ||
        station.genre?.toLowerCase().includes(query)
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      if (selectedGenre === "music") {
        filtered = filtered.filter(station => station.genre?.toLowerCase() === "music");
      } else if (selectedGenre === "news") {
        filtered = filtered.filter(station => 
          station.genre?.toLowerCase().includes("news") || 
          station.genre?.toLowerCase().includes("talk") ||
          station.genre?.toLowerCase().includes("christian")
        );
      } else if (selectedGenre === "local") {
        filtered = filtered.filter(station => station.genre?.toLowerCase() === "local");
      }
    }

    return filtered;
  }, [stations, searchQuery, selectedGenre]);

  const handleStationPlay = (station: RadioStation) => {
    if (currentStation?.id === station.id && isPlaying) {
      pauseStation();
    } else {
      playStation(station);
    }
  };

  if (stationsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Failed to load stations</h2>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Pattern */}
      <div className="background-pattern" />

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img 
                src="https://ibireland.ie/wp-content/uploads/2023/08/logo-ibi.png" 
                alt="IBI Logo" 
                className="h-12 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  IBI Stations
                </h1>
                <p className="text-gray-400 text-sm">Ireland's Premier Radio Streaming Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="glass-effect hover:bg-white/20">
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Button>
              <Button variant="ghost" size="icon" className="glass-effect hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="glass-effect rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search radio stations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => {
                  const Icon = genre.icon;
                  return (
                    <Button
                      key={genre.id}
                      variant={selectedGenre === genre.id ? "default" : "ghost"}
                      onClick={() => setSelectedGenre(genre.id)}
                      className={
                        selectedGenre === genre.id
                          ? "bg-green-700/80 hover:bg-green-700 text-white"
                          : "glass-effect hover:bg-white/20 text-white"
                      }
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {genre.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <RadioTower className="mr-2 h-4 w-4" />
                {stations.length} Active Stations
              </span>
              <span className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {filteredStations.length > 0 ? `${filteredStations.length} Found` : 'No Results'}
              </span>
              <span className="flex items-center">
                <Signal className="mr-2 h-4 w-4" />
                HD Quality
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "glass-effect bg-white/20" : "hover:bg-white/10"}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "glass-effect bg-white/20" : "hover:bg-white/10"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Audio Error Display */}
          {audioError && currentStation && (
            <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm mb-2">{audioError}</p>
                  <p className="text-blue-200 text-xs">Click "Listen Live" to open {currentStation.name} in a new tab.</p>
                </div>
                <Button
                  onClick={() => currentStation.website && window.open(currentStation.website, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Listen Live
                </Button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {stationsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="glass-effect rounded-2xl p-6 animate-pulse">
                  <div className="w-full h-32 bg-gray-700 rounded-xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                    <div className="h-3 bg-gray-700 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stations Grid */}
          {!stationsLoading && filteredStations.length > 0 && (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                : "space-y-4"
            }>
              {filteredStations.map((station) => (
                <StationCard
                  key={station.id}
                  station={station}
                  isPlaying={currentStation?.id === station.id && isPlaying}
                  onPlay={() => handleStationPlay(station)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!stationsLoading && filteredStations.length === 0 && (
            <div className="text-center py-12">
              <Radio className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No stations found</h3>
              <p className="text-gray-400">
                {searchQuery ? "Try adjusting your search terms" : "No stations available for the selected filter"}
              </p>
            </div>
          )}

          {/* Load More (for future pagination) */}
          {!stationsLoading && filteredStations.length > 0 && filteredStations.length >= 20 && (
            <div className="text-center mt-12">
              <Button variant="ghost" className="glass-effect hover:bg-white/20">
                Load More Stations
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Player */}
      {currentStation && (
        <FloatingPlayer
          station={currentStation}
          isPlaying={isPlaying}
          volume={volume}
          onPlayPause={() => handleStationPlay(currentStation)}
          onVolumeChange={setVolume}
        />
      )}
    </div>
  );
}
