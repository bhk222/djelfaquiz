
import { useCallback } from 'react';

// Stocker les instances Audio pour éviter de les recréer à chaque lecture
const audioCache: { [key: string]: HTMLAudioElement } = {};

export const useSound = (soundUrl: string) => {
  const play = useCallback(() => {
    if (!audioCache[soundUrl]) {
      audioCache[soundUrl] = new Audio(soundUrl);
    }
    const audio = audioCache[soundUrl];
    
    // Assurez-vous que le son peut être rejoué rapidement
    audio.currentTime = 0;
    
    audio.play().catch(e => console.error("Erreur lors de la lecture du son :", e));
  }, [soundUrl]);

  return play;
};
