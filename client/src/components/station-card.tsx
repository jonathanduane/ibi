import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioVisualizer } from "./audio-visualizer";
import { Play, Pause, Heart, ExternalLink } from "lucide-react";
import type { RadioStation } from "@shared/schema";

interface StationCardProps {
  station: RadioStation;
  isPlaying: boolean;
  onPlay: () => void;
  viewMode?: "grid" | "list";
}

export function StationCard({ station, isPlaying, onPlay, viewMode = "grid" }: StationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite API call
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (station.website) {
      window.open(station.website, '_blank');
    }
  };

  if (viewMode === "list") {
    return (
      <div 
        className="station-card glass-effect rounded-2xl p-4 hover:bg-white/15 cursor-pointer group"
        onClick={onPlay}
      >
        <div className="flex items-center space-x-4">
          {/* Station Logo/Image */}
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${station.gradientFrom}, ${station.gradientTo})`
            }}
          >
            {station.logoUrl && !imageError ? (
              <img 
                src={station.logoUrl} 
                alt={station.name}
                className="w-full h-full object-contain p-2 bg-white rounded-xl"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-bold">
                {station.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
              </span>
            )}
          </div>

          {/* Station Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg truncate">{station.name}</h3>

              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
                    LIVE
                  </Badge>
                  {isPlaying && <AudioVisualizer />}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className={`hover:bg-white/20 ${isFavorite ? 'text-red-400' : 'text-gray-400'}`}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>

                <Button
                  variant="default"
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="station-card glass-effect rounded-2xl p-6 hover:bg-white/15 cursor-pointer group animate-fade-in"
      onClick={onPlay}
    >
      <div className="relative mb-4">
        {/* Station Logo/Image */}
        <div 
          className="w-full h-32 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${station.gradientFrom}, ${station.gradientTo})`
          }}
        >
          {station.logoUrl && !imageError ? (
            <img 
              src={station.logoUrl} 
              alt={station.name}
              className="w-full h-full object-contain p-3 bg-white rounded-xl"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <span className="text-xl font-bold">
              {station.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
            </span>
          )}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Favorite Button */}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleFavoriteToggle}
            className={`bg-black/50 hover:bg-black/70 ${isFavorite ? 'text-red-400' : 'text-white'}`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* External Link Button */}
        {station.website && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleExternalLink}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Station Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg truncate">{station.name}</h3>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
            LIVE
          </Badge>
          {isPlaying && <AudioVisualizer />}
        </div>



        <p className="text-xs text-gray-400 truncate">
          Now Playing: Live Stream
        </p>
      </div>
    </div>
  );
}
