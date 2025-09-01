export class AudioManager {
  private static instance: AudioManager;
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;
  private initialized: boolean = false;
  
  private constructor() {
    this.setupMobileAudioInit();
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
      // Initialize if not done yet
      if (!this.initialized) {
        await this.init();
        this.initialized = true;
      }
      
      // Reuse existing context or create new one
      if (!this.audioContext || this.audioContext.state === 'closed') {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume context if suspended (Safari mobile requirement)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      // Double-check context is running
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