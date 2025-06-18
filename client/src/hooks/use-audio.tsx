import { useState, useRef, useEffect, useCallback } from 'react';
import type { Station } from '@shared/schema';

interface UseAudioReturn {
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
  play: (station: Station) => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  togglePlayPause: () => void;
}

export function useAudio(): UseAudioReturn {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('loadstart', handleLoadStart);
      audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
      audioRef.current.removeEventListener('error', handleError);
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    }
  }, []);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setError('Failed to load audio stream');
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const play = useCallback((station: Station) => {
    cleanup();
    
    setCurrentStation(station);
    setIsLoading(true);
    setError(null);

    // Create new audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    
    // Configure audio
    audio.volume = volume;
    audio.crossOrigin = 'anonymous';
    
    // For demo purposes, we'll simulate successful loading
    // In production, you'd use the actual stream URL
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 1000);
    
    // audio.src = station.streamUrl;
    // audio.load();
    // audio.play().catch(handleError);
  }, [volume, cleanup]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (currentStation) {
      play(currentStation);
    }
  }, [isPlaying, currentStation, play, pause]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    currentStation,
    isPlaying,
    volume,
    isLoading,
    error,
    play,
    pause,
    setVolume,
    togglePlayPause,
  };
}
