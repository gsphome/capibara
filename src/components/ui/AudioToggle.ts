import { AudioManager } from '../../audio/AudioManager';

export class AudioToggle {
  private element!: HTMLElement;
  private audioManager = AudioManager.getInstance();
  
  constructor(container: HTMLElement) {
    this.createElement();
    container.appendChild(this.element);
  }
  
  private createElement(): void {
    this.element = document.createElement('button');
    this.element.className = 'audio-toggle';
    this.element.innerHTML = '🔊';
    this.element.style.cssText = `
      position: fixed;
      top: max(10px, env(safe-area-inset-top) + 5px);
      right: max(10px, env(safe-area-inset-right) + 5px);
      background: rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 1.2rem;
      cursor: pointer;
      z-index: 1000;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    this.element.addEventListener('click', async () => {
      await this.audioManager.init(); // Ensure audio is initialized
      this.audioManager.play('click');
      const enabled = this.audioManager.toggle();
      this.element.innerHTML = enabled ? '🔊' : '🔇';
      this.element.style.opacity = enabled ? '1' : '0.6';
    });
    
    this.element.addEventListener('mouseenter', () => {
      this.element.style.transform = 'scale(1.1)';
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.element.style.transform = 'scale(1)';
    });
  }
  
  public destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}