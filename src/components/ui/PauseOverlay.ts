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
        <div class="pause-overlay__secondary-controls">
          <button class="pause-overlay__audio-btn" id="pauseAudioBtn">
            <span class="audio-icon">🔊</span>
            <span class="mute-indicator"></span>
          </button>
        </div>
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
    const audioBtn = this.element.querySelector('#pauseAudioBtn') as HTMLButtonElement;
    const helpBtn = this.element.querySelector('#pauseHelpBtn') as HTMLButtonElement;
    
    // Initialize audio button state
    this.updateAudioButtonState(audioBtn);
    
    const resume = () => {
      this.hide();
      onResume();
    };

    resumeBtn.addEventListener('click', resume);
    resumeBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      resume();
    });
    
    // Audio button functionality
    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleAudio(audioBtn);
      });
    }
    
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
  
  private updateAudioButtonState(audioBtn: HTMLButtonElement): void {
    if (!audioBtn) return;
    
    // Check current audio state from existing audio toggle
    const existingAudioToggle = document.querySelector('.audio-toggle') as HTMLElement;
    const mobileAudioBtn = document.querySelector('.mobile-ui-bar .audio-icon') as HTMLElement;
    const hudAudioBtn = document.querySelector('.hud-control-btn.audio-btn') as HTMLElement;
    
    let isEnabled = true;
    
    // Determine current state from existing buttons
    if (existingAudioToggle) {
      isEnabled = existingAudioToggle.innerHTML === '🔊';
    } else if (mobileAudioBtn) {
      const muteIndicator = mobileAudioBtn.parentElement?.querySelector('.mute-indicator') as HTMLElement;
      isEnabled = !muteIndicator || muteIndicator.style.opacity === '0';
    } else if (hudAudioBtn) {
      isEnabled = !hudAudioBtn.classList.contains('muted');
    }
    
    // Update pause modal audio button
    const muteIndicator = audioBtn.querySelector('.mute-indicator') as HTMLElement;
    const audioIcon = audioBtn.querySelector('.audio-icon') as HTMLElement;
    
    if (muteIndicator && audioIcon) {
      muteIndicator.style.opacity = isEnabled ? '0' : '1';
      audioIcon.style.opacity = isEnabled ? '1' : '0.6';
      audioBtn.classList.toggle('muted', !isEnabled);
    }
  }
  
  private async toggleAudio(audioBtn: HTMLButtonElement): Promise<void> {
    const { AudioManager } = await import('../../audio/AudioManager');
    const audioManager = AudioManager.getInstance();
    const newState = audioManager.toggle();
    
    // Update all audio buttons with new state
    this.syncAllAudioButtons(newState);
  }
  
  private syncAllAudioButtons(isEnabled: boolean): void {
    // Update pause modal button
    const pauseAudioBtn = document.querySelector('#pauseAudioBtn') as HTMLElement;
    if (pauseAudioBtn) {
      const muteIndicator = pauseAudioBtn.querySelector('.mute-indicator') as HTMLElement;
      const audioIcon = pauseAudioBtn.querySelector('.audio-icon') as HTMLElement;
      
      if (muteIndicator && audioIcon) {
        muteIndicator.style.opacity = isEnabled ? '0' : '1';
        audioIcon.style.opacity = isEnabled ? '1' : '0.6';
        pauseAudioBtn.classList.toggle('muted', !isEnabled);
      }
    }
    
    // Update mobile UI bar button
    const mobileAudioBtn = document.querySelector('.mobile-ui-bar .audio-icon') as HTMLElement;
    if (mobileAudioBtn) {
      const muteIndicator = mobileAudioBtn.parentElement?.querySelector('.mute-indicator') as HTMLElement;
      if (muteIndicator) {
        muteIndicator.style.opacity = isEnabled ? '0' : '1';
        mobileAudioBtn.style.opacity = isEnabled ? '1' : '0.6';
      }
    }
    
    // Update desktop HUD button
    const hudAudioBtn = document.querySelector('.hud-control-btn.audio-btn') as HTMLElement;
    if (hudAudioBtn) {
      hudAudioBtn.classList.toggle('muted', !isEnabled);
    }
    
    // Update original audio toggle if exists
    const audioToggle = document.querySelector('.audio-toggle') as HTMLElement;
    if (audioToggle) {
      audioToggle.innerHTML = isEnabled ? '🔊' : '🔇';
      audioToggle.style.opacity = isEnabled ? '1' : '0.6';
    }
  }
}