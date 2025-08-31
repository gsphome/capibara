export class AudioManager {
  private static instance: AudioManager;
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;
  
  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }
  
  public async play(name: string): Promise<void> {
    if (!this.enabled) return;
    
    try {
      // Reuse existing context or create new one
      if (!this.audioContext || this.audioContext.state === 'closed') {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      const sounds = {
        catch: { freq: 800, duration: 0.1 },
        miss: { freq: 200, duration: 0.2 },
        levelup: { freq: 1000, duration: 0.3 },
        gameover: { freq: 150, duration: 0.5 },
        click: { freq: 600, duration: 0.05 }
      };
      
      const sound = sounds[name as keyof typeof sounds];
      if (!sound) return;
      
      oscillator.frequency.value = sound.freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + sound.duration);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + sound.duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }
  
  public toggle(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  
  public isEnabled(): boolean {
    return this.enabled;
  }
  
  public async init(): Promise<void> {
    try {
      // Initialize context on first user interaction
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Ensure context is running
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
      }
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }
}