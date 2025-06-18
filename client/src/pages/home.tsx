import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Radio, Music, Newspaper, Star, Grid3X3, List, Settings, Heart, RadioTower, Users, Signal } from "lucide-react";
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

  const { data: stations = [], isLoading: stationsLoading, error: stationsError } = useQuery<RadioStation[]>({
    queryKey: ["/api/stations"],
  });

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
          {audioError && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-xl">
              <p className="text-red-400 text-sm">{audioError}</p>
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
