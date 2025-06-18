import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AudioVisualizer } from "./audio-visualizer";
import { Play, Pause, Heart, Volume2, VolumeX, ExternalLink, X } from "lucide-react";
import type { RadioStation } from "@shared/schema";

interface FloatingPlayerProps {
  station: RadioStation;
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onClose?: () => void;
}

export function FloatingPlayer({ 
  station, 
  isPlaying, 
  volume, 
  onPlayPause, 
  onVolumeChange,
  onClose 
}: FloatingPlayerProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite API call
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onVolumeChange(isMuted ? volume : 0);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    onVolumeChange(volumeValue);
    setIsMuted(volumeValue === 0);
  };

  const handleExternalLink = () => {
    if (station.website) {
      window.open(station.website, '_blank');
    }
  };

  return (
    <div className="floating-player glass-effect rounded-2xl p-4 w-96 max-w-[90vw] animate-slide-up">
      <div className="flex items-center space-x-4">
        {/* Station Logo */}
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${station.gradientFrom}, ${station.gradientTo})`
          }}
        >
          {station.logoUrl && !imageError ? (
            <img 
              src={station.logoUrl} 
              alt={station.name}
              className="w-full h-full object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-xs font-bold">
              {station.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </span>
          )}
        </div>

        {/* Station Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{station.name}</h4>
          <p className="text-xs text-gray-400 truncate">
            {station.description || 'Live Stream'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            className={`hover:bg-white/20 ${isFavorite ? 'text-red-400' : 'text-gray-400'}`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>

          {/* Play/Pause Button */}
          <Button
            size="icon"
            onClick={onPlayPause}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMuteToggle}
              className="hover:bg-white/20 text-gray-400"
            >
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="w-16">
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* External Link */}
          {station.website && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExternalLink}
              className="hover:bg-white/20 text-gray-400"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}

          {/* Close Button */}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-white/20 text-gray-400"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar and Info */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <div className="flex items-center space-x-2">
            <span>Live Stream</span>
            {isPlaying && <AudioVisualizer size="small" />}
          </div>
          <span>HD Quality</span>
        </div>
        
        {/* Live Stream Indicator */}
        <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full ${
              isPlaying ? 'animate-pulse-slow' : ''
            }`}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
