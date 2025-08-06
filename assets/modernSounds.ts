// Sons modernes utilisant l'API Web Audio
export class ModernSounds {
  private audioContext: AudioContext | null = null;
  private isEnabled = true;

  constructor() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private createComplexTone(frequencies: number[], duration: number, type: OscillatorType = 'sine', volume: number = 0.2) {
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.createTone(freq, duration / frequencies.length, type, volume);
      }, (duration * 1000 / frequencies.length) * index);
    });
  }

  // Son de réponse correcte - Accord majeur moderne
  playCorrect() {
    if (!this.isEnabled) return;
    
    // Accord C major (Do-Mi-Sol) avec harmoniques
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.createTone(freq, 0.4, 'sine', 0.25);
      }, index * 50);
    });

    // Effet de montée
    setTimeout(() => {
      this.createTone(1046.5, 0.2, 'triangle', 0.15); // C6
    }, 200);
  }

  // Son de réponse incorrecte - Son moderne mais pas désagréable
  playIncorrect() {
    if (!this.isEnabled) return;
    
    // Descente harmonique douce
    const frequencies = [440, 369.99, 329.63]; // A4, F#4, E4
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.createTone(freq, 0.3, 'sine', 0.2);
      }, index * 100);
    });
  }

  // Son de clic/bouton - Moderne et subtil
  playClick() {
    if (!this.isEnabled) return;
    
    // Son de clic moderne - fréquence haute très courte
    this.createTone(800, 0.05, 'square', 0.1);
    setTimeout(() => {
      this.createTone(600, 0.03, 'triangle', 0.08);
    }, 20);
  }

  // Son de victoire - Mélodie moderne
  playVictory() {
    if (!this.isEnabled) return;
    
    // Mélodie de victoire moderne
    const melody = [
      { freq: 523.25, duration: 0.2 }, // C5
      { freq: 659.25, duration: 0.2 }, // E5
      { freq: 783.99, duration: 0.2 }, // G5
      { freq: 1046.5, duration: 0.4 }, // C6
    ];

    melody.forEach((note, index) => {
      setTimeout(() => {
        this.createTone(note.freq, note.duration, 'sine', 0.3);
        // Ajouter des harmoniques
        this.createTone(note.freq * 2, note.duration, 'triangle', 0.1);
      }, index * 200);
    });

    // Effet de scintillement final
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.createTone(2093, 0.05, 'sine', 0.15);
        }, i * 50);
      }
    }, 800);
  }

  // Son de démarrage de jeu
  playStart() {
    if (!this.isEnabled) return;
    
    // Séquence de démarrage moderne
    this.createComplexTone([200, 300, 400, 500, 600], 0.6, 'sine', 0.2);
  }

  // Son de fin de temps
  playTimeUp() {
    if (!this.isEnabled) return;
    
    // Son d'urgence moderne mais pas agressif
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createTone(880, 0.15, 'triangle', 0.2);
        setTimeout(() => {
          this.createTone(660, 0.15, 'triangle', 0.2);
        }, 75);
      }, i * 300);
    }
  }

  // Activer/désactiver les sons
  toggleSounds() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  // Vérifier si les sons sont activés
  isEnabled_() {
    return this.isEnabled;
  }
}

export const modernSounds = new ModernSounds();
