export class AudioManager {
  private static instance: AudioManager;
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;
  private initialized: boolean = false;
  private useHTML5Audio: boolean = false;
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  
  private constructor() {
    this.detectAudioSupport();
    this.setupMobileAudioInit();
  }
  
  private detectAudioSupport(): void {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    
    // Use HTML5 Audio for iOS Safari
    this.useHTML5Audio = isIOS && isSafari;
    console.log('Audio method:', this.useHTML5Audio ? 'HTML5 Audio' : 'Web Audio API');
    
    if (this.useHTML5Audio) {
      this.createHTML5Sounds();
    }
  }
  
  private createHTML5Sounds(): void {
    const sounds = ['catch', 'miss', 'levelup', 'gameover', 'click'];
    
    sounds.forEach(soundName => {
      const audio = new Audio();
      audio.preload = 'auto';
      
      // Create data URL for simple beep sounds
      const freq = this.getSoundFrequency(soundName);
      const duration = this.getSoundDuration(soundName);
      
      // Simple beep using data URL (works better on iOS)
      audio.src = this.createBeepDataURL(freq, duration);
      audio.volume = 0.3;
      
      this.audioElements.set(soundName, audio);
    });
  }
  
  private getSoundFrequency(name: string): number {
    const freqs = {
      catch: 800,
      miss: 200,
      levelup: 1000,
      gameover: 150,
      click: 600
    };
    return freqs[name as keyof typeof freqs] || 440;
  }
  
  private getSoundDuration(name: string): number {
    const durations = {
      catch: 0.1,
      miss: 0.2,
      levelup: 0.3,
      gameover: 0.5,
      click: 0.05
    };
    return durations[name as keyof typeof durations] || 0.1;
  }
  
  private createBeepDataURL(frequency: number, duration: number): string {
    // Create a simple sine wave data URL
    const sampleRate = 8000;
    const samples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples * 2, true);
    
    // Generate sine wave
    for (let i = 0; i < samples; i++) {
      const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3 * 32767;
      view.setInt16(44 + i * 2, sample, true);
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }
  
  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }
  
  private setupMobileAudioInit(): void {
    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Auto-initialize audio on first user interaction (Safari mobile fix)
    const initAudio = async () => {
      if (!this.initialized) {
        console.log('Initializing audio for mobile, iOS detected:', isIOS);
        await this.init();
        this.initialized = true;
        
        // For iOS, try additional unlock attempts
        if (isIOS) {
          setTimeout(async () => {
            try {
              await this.playUnlockSound();
            } catch (e) {
              console.warn('Additional iOS unlock failed:', e);
            }
          }, 200);
        }
        
        // Remove listeners after first init
        document.removeEventListener('touchstart', initAudio);
        document.removeEventListener('click', initAudio);
      }
    };
    
    document.addEventListener('touchstart', initAudio, { once: true });
    document.addEventListener('click', initAudio, { once: true });
  }
  
  public async play(name: string): Promise<void> {
    if (!this.enabled) return;
    
    try {
      // Use HTML5 Audio for iOS Safari
      if (this.useHTML5Audio) {
        const audio = this.audioElements.get(name);
        if (audio) {
          audio.currentTime = 0;
          const playPromise = audio.play();
          if (playPromise) {
            await playPromise;
          }
          console.log('HTML5 Audio played:', name);
        }
        return;
      }
      
      // Web Audio API fallback
      if (!this.initialized) {
        await this.init();
        this.initialized = true;
      }
      
      if (!this.audioContext || this.audioContext.state === 'closed') {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      if (this.audioContext.state !== 'running') {
        console.warn('AudioContext not running, skipping sound');
        return;
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
      }
      
      // iOS Safari specific: Resume context and play silent sound
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      // iOS Safari fix: Play a silent sound to unlock audio
      if (!this.initialized) {
        await this.playUnlockSound();
      }
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }
  
  private async playUnlockSound(): Promise<void> {
    try {
      if (!this.audioContext || this.audioContext.state !== 'running') return;
      
      // Create a very short, silent sound to unlock iOS audio
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = 440;
      oscillator.type = 'sine';
      
      // Make it silent but audible to iOS
      gainNode.gain.setValueAtTime(0.001, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.01);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.01);
      
      console.log('iOS audio unlock sound played');
    } catch (error) {
      console.warn('iOS audio unlock failed:', error);
    }
  }
}