export class PauseOverlay {
  private element!: HTMLElement;
  private container: HTMLElement;
  private onShowHelp?: () => void;

  constructor(container: HTMLElement, onShowHelp?: () => void) {
    this.container = container;
    this.onShowHelp = onShowHelp;
  }

  public show(onResume: () => void): void {
    this.createElement(onResume);
    this.container.appendChild(this.element);
    
    setTimeout(() => {
      this.element.classList.add('pause-overlay--show');
    }, 50);
  }

  public hide(): void {
    if (this.element) {
      this.element.classList.remove('pause-overlay--show');
      setTimeout(() => {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }, 300);
    }
  }

  private createElement(onResume: () => void): void {
    this.element = document.createElement('div');
    this.element.className = 'pause-overlay';
    
    this.element.innerHTML = `
      <div class="pause-overlay__backdrop"></div>
      <div class="pause-overlay__content">
        <div class="pause-overlay__icon">⏸️</div>
        <h2>Game Paused</h2>
        <p>Take a break! The capybara is waiting for you.</p>
        <button class="pause-overlay__resume-btn">
          ▶️ Resume Game
        </button>
        <div class="pause-overlay__hint">
          <small>💡 Tip: Press SPACE to pause/resume anytime</small>
          <br>
          <button class="pause-overlay__help-btn" id="pauseHelpBtn">
            🥕 Vegetable Guide
          </button>
        </div>
      </div>
    `;

    const resumeBtn = this.element.querySelector('.pause-overlay__resume-btn') as HTMLButtonElement;
    const helpBtn = this.element.querySelector('#pauseHelpBtn') as HTMLButtonElement;
    
    const resume = () => {
      this.hide();
      onResume();
    };

    resumeBtn.addEventListener('click', resume);
    resumeBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      resume();
    });
    
    if (helpBtn && this.onShowHelp) {
      helpBtn.addEventListener('click', this.onShowHelp);
    }

    // Resume with spacebar
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        resume();
        document.removeEventListener('keydown', handleKeyPress);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
  }
}