import { useState, useRef, useCallback } from "react";
import type { RadioStation } from "@shared/schema";

interface AudioPlayerState {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    currentStation: null,
    isPlaying: false,
    volume: 70,
    isLoading: false,
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playStation = useCallback(async (station: RadioStation) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
        audioRef.current = null;
      }

      // For the specific stream URL, create a hidden iframe player
      if (station.streamUrl.includes('live-bauerie.sharp-stream.com')) {
        // Create iframe element for CORS-restricted streams
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `data:text/html,<audio autoplay controls><source src="${station.streamUrl}" type="audio/mpeg"></audio>`;
        document.body.appendChild(iframe);
        
        setState(prev => ({
          ...prev,
          currentStation: station,
          isPlaying: true,
          isLoading: false,
          error: null
        }));
        
        console.log(`Now playing ${station.name} - ${station.streamUrl}`);
        return;
      }

      // Create new audio element for regular streams
      const audio = new Audio();
      audio.preload = "none";
      audio.volume = state.volume / 100;

      // Set up event listeners
      audio.addEventListener('loadstart', () => {
        setState(prev => ({ ...prev, isLoading: true }));
      });

      audio.addEventListener('canplay', () => {
        setState(prev => ({ ...prev, isLoading: false, isPlaying: true }));
      });

      audio.addEventListener('play', () => {
        setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
      });

      audio.addEventListener('pause', () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      });

      audio.addEventListener('error', (e) => {
        console.error(`Audio error for ${station.name}:`, e);
        setState(prev => ({
          ...prev,
          error: `Audio streaming requires visiting ${station.website} directly to listen live.`,
          isLoading: false,
          isPlaying: false,
        }));
      });

      audio.addEventListener('stalled', () => {
        setState(prev => ({ ...prev, error: "Stream is buffering...", isLoading: true }));
      });

      audio.addEventListener('waiting', () => {
        setState(prev => ({ ...prev, isLoading: true }));
      });

      // Try to load and play the stream
      audioRef.current = audio;
      audio.src = station.streamUrl;
      
      setState(prev => ({
        ...prev,
        currentStation: station,
      }));

      try {
        await audio.load();
        await audio.play();
        console.log(`Now playing ${station.name} - ${station.streamUrl}`);
      } catch (playError) {
        console.error(`Playback failed for ${station.name}:`, playError);
        setState(prev => ({
          ...prev,
          error: `Direct streaming not available. Visit ${station.website} to listen live.`,
          isLoading: false,
          isPlaying: false,
        }));
      }
      
    } catch (error) {
      console.error(`Error setting up audio for ${station.name}:`, error);
      setState(prev => ({
        ...prev,
        error: "Failed to initialize audio player",
        isLoading: false,
        isPlaying: false,
      }));
    }
  }, [state.volume]);

  const pauseStation = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setState(prev => ({
      ...prev,
      isPlaying: false,
    }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume }));
    
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  const stopStation = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    setState({
      currentStation: null,
      isPlaying: false,
      volume: state.volume,
      isLoading: false,
      error: null,
    });
  }, [state.volume]);

  return {
    ...state,
    playStation,
    pauseStation,
    stopStation,
    setVolume,
  };
}
