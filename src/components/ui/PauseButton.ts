export class PauseButton {
  private element!: HTMLElement;
  private isPaused: boolean = false;
  private onToggle: (paused: boolean) => void;
  
  constructor(container: HTMLElement, onToggle: (paused: boolean) => void) {
    this.onToggle = onToggle;
    this.createElement();
    container.appendChild(this.element);
  }
  
  private createElement(): void {
    this.element = document.createElement('button');
    this.element.className = 'pause-button';
    this.element.innerHTML = '⏸️';
    this.element.style.cssText = `
      position: fixed;
      top: max(10px, env(safe-area-inset-top) + 5px);
      left: max(10px, env(safe-area-inset-left) + 5px);
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
      touch-action: manipulation;
    `;
    
    // Prevent event bubbling to avoid conflicts
    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.toggle();
    });
    
    this.element.addEventListener('touchend', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.toggle();
    });
    
    this.element.addEventListener('mouseenter', () => {
      this.element.style.transform = 'scale(1.1)';
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.element.style.transform = 'scale(1)';
    });
  }
  
  private toggle(): void {
    this.isPaused = !this.isPaused;
    this.element.innerHTML = this.isPaused ? '▶️' : '⏸️';
    this.element.style.opacity = this.isPaused ? '0.8' : '1';
    this.onToggle(this.isPaused);
  }
  
  public updateState(paused: boolean): void {
    this.isPaused = paused;
    this.element.innerHTML = this.isPaused ? '▶️' : '⏸️';
    this.element.style.opacity = this.isPaused ? '0.8' : '1';
  }
  
  public destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}