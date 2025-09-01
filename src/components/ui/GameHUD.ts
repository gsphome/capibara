export class GameHUD {
  private element!: HTMLElement;
  private scoreElement!: HTMLElement;
  private levelElement!: HTMLElement;
  private missedElement!: HTMLElement;
  private progressBar!: HTMLElement;
  private progressFill!: HTMLElement;

  constructor(container: HTMLElement) {
    // Clear any existing HUD
    const existingHUD = document.querySelector('.game-hud');
    if (existingHUD) {
      existingHUD.remove();
    }
    
    this.createElement();
    
    // Check if wrapper already exists
    let wrapper = document.querySelector('.game-wrapper') as HTMLElement;
    let sidebar = document.querySelector('.game-sidebar') as HTMLElement;
    
    if (!wrapper) {
      // Create new wrapper and sidebar
      wrapper = document.createElement('div');
      wrapper.className = 'game-wrapper';
      
      sidebar = document.createElement('div');
      sidebar.className = 'game-sidebar';
      
      sidebar.appendChild(this.element);
      wrapper.appendChild(sidebar);
      wrapper.appendChild(container);
      document.body.appendChild(wrapper);
    } else if (sidebar) {
      // Use existing sidebar
      sidebar.appendChild(this.element);
    }
  }

  private createElement(): void {
    // Main HUD container
    this.element = document.createElement('div');
    this.element.className = 'game-hud';

    // Score display
    this.scoreElement = document.createElement('div');
    this.scoreElement.className = 'game-hud__score';
    this.scoreElement.innerHTML = 'Score<br>0';

    // Level display
    this.levelElement = document.createElement('div');
    this.levelElement.className = 'game-hud__level';
    this.levelElement.innerHTML = 'Level<br>1';

    // Lives display
    this.missedElement = document.createElement('div');
    this.missedElement.className = 'game-hud__lives';
    this.updateLives(3);

    // Create row for main buttons
    const hudRow = document.createElement('div');
    hudRow.className = 'game-hud__row';
    
    const isMobile = window.innerWidth <= 1024;
    
    // Add pause button to HUD
    if (isMobile) {
      const pauseBtn = document.querySelector('.pause-button');
      if (pauseBtn) {
        hudRow.appendChild(pauseBtn);
      }
    } else {
      // Create pause button for desktop HUD
      const desktopPauseBtn = document.createElement('button');
      desktopPauseBtn.className = 'hud-control-btn pause-btn';
      desktopPauseBtn.innerHTML = '⏸️';
      desktopPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Trigger pause via keyboard event
        document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      });
      hudRow.appendChild(desktopPauseBtn);
    }
    
    hudRow.appendChild(this.scoreElement);
    hudRow.appendChild(this.levelElement);
    hudRow.appendChild(this.missedElement);
    
    // Progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-bar';
    
    this.progressFill = document.createElement('div');
    this.progressFill.className = 'progress-bar__fill';
    this.progressFill.style.width = '0%';
    
    progressContainer.appendChild(this.progressFill);
    hudRow.appendChild(progressContainer);
    
    // Add audio button to HUD
    if (isMobile) {
      const audioBtn = document.querySelector('.audio-toggle');
      if (audioBtn) {
        hudRow.appendChild(audioBtn);
      }
    } else {
      // Create audio button for desktop HUD
      const desktopAudioBtn = document.createElement('button');
      desktopAudioBtn.className = 'hud-control-btn audio-btn';
      desktopAudioBtn.innerHTML = `
        <span class="audio-icon">🔊</span>
        <span class="mute-indicator"></span>
      `;
      desktopAudioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Toggle audio via existing AudioToggle functionality
        const audioToggle = document.querySelector('.audio-toggle') as HTMLElement;
        if (audioToggle) {
          audioToggle.click();
          // Update visual state
          const isEnabled = audioToggle.innerHTML === '🔊';
          desktopAudioBtn.classList.toggle('muted', !isEnabled);
        }
      });
      hudRow.appendChild(desktopAudioBtn);
    }
    
    this.element.appendChild(hudRow);
    
    this.progressBar = progressContainer;


  }

  public updateScore(score: number): void {
    this.scoreElement.innerHTML = `Score<br>${score}`;
  }

  public updateLevel(level: number): void {
    this.levelElement.innerHTML = `Level<br>${level}`;
  }

  public updateLives(lives: number): void {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      if (i < lives) {
        hearts.push('❤️');
      } else {
        hearts.push('🤍');
      }
    }
    this.missedElement.innerHTML = hearts.join(' ');
  }

  public updateProgress(percentage: number): void {
    this.progressFill.style.width = `${percentage}%`;
    
    // Remove all energy level classes
    this.progressFill.classList.remove('progress-bar__fill--low', 'progress-bar__fill--medium-low', 'progress-bar__fill--medium', 'progress-bar__fill--high');
    
    // Apply energy color progression: Red (low) → Yellow (medium) → Green (high)
    if (percentage >= 80) {
      // High energy: Bright green
      this.progressFill.classList.add('progress-bar__fill--high');
    } else if (percentage >= 50) {
      // Medium energy: Yellow/orange
      this.progressFill.classList.add('progress-bar__fill--medium');
    } else if (percentage >= 20) {
      // Low-medium energy: Orange/red-orange
      this.progressFill.classList.add('progress-bar__fill--medium-low');
    } else {
      // Very low energy: Red (default)
      this.progressFill.classList.add('progress-bar__fill--low');
    }
  }

  public destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    if (this.progressBar.parentNode) {
      this.progressBar.parentNode.removeChild(this.progressBar);
    }
  }
}