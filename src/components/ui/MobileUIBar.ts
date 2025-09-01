export class MobileUIBar {
  private element!: HTMLElement;
  private pauseBtn!: HTMLElement;
  private audioBtn!: HTMLElement;
  private scoreElement!: HTMLElement;
  private levelElement!: HTMLElement;
  private livesElement!: HTMLElement;
  private progressBar!: HTMLElement;
  private progressFill!: HTMLElement;
  
  private onPauseToggle: (paused: boolean) => void;
  private onAudioToggle: () => void;
  private isPaused: boolean = false;
  private audioEnabled: boolean = true;

  constructor(
    onPauseToggle: (paused: boolean) => void,
    onAudioToggle: () => void
  ) {
    this.onPauseToggle = onPauseToggle;
    this.onAudioToggle = onAudioToggle;
    this.createElement();
    document.body.appendChild(this.element);
  }

  private createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'mobile-ui-bar';
    this.element.style.cssText = `
      position: fixed;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,0,0,0.9);
      padding: 6px 12px;
      border-radius: 20px;
      backdrop-filter: blur(25px);
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      z-index: 1000;
      max-width: 95vw;
      overflow: hidden;
    `;

    // Pause button
    this.pauseBtn = document.createElement('button');
    this.pauseBtn.innerHTML = '⏸️';
    this.pauseBtn.style.cssText = `
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
      touch-action: manipulation;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Score
    this.scoreElement = document.createElement('div');
    this.scoreElement.innerHTML = 'Score<br>0';
    this.scoreElement.style.cssText = `
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 10px;
      padding: 4px 8px;
      font-size: 9px;
      font-weight: 700;
      color: white;
      text-align: center;
      min-width: 40px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      white-space: nowrap;
    `;

    // Level
    this.levelElement = document.createElement('div');
    this.levelElement.innerHTML = 'Level<br>1';
    this.levelElement.style.cssText = this.scoreElement.style.cssText;

    // Lives
    this.livesElement = document.createElement('div');
    this.livesElement.innerHTML = '❤️ ❤️ ❤️';
    this.livesElement.style.cssText = `
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 10px;
      padding: 4px 8px;
      font-size: 11px;
      color: white;
      text-align: center;
      min-width: 40px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Progress bar
    this.progressBar = document.createElement('div');
    this.progressBar.style.cssText = `
      position: relative;
      width: 80px;
      height: 12px;
      background: rgba(0,0,0,0.6);
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.3);
      overflow: hidden;
    `;

    this.progressFill = document.createElement('div');
    this.progressFill.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #FF4500, #DC143C);
      transition: width 0.3s ease-out, background 0.3s ease-out;
      border-radius: 6px;
    `;
    this.progressBar.appendChild(this.progressFill);

    // Audio button
    this.audioBtn = document.createElement('button');
    this.audioBtn.innerHTML = '🔊';
    this.audioBtn.style.cssText = this.pauseBtn.style.cssText;

    // Add all elements
    this.element.appendChild(this.pauseBtn);
    this.element.appendChild(this.scoreElement);
    this.element.appendChild(this.levelElement);
    this.element.appendChild(this.livesElement);
    this.element.appendChild(this.progressBar);
    this.element.appendChild(this.audioBtn);

    // Event listeners
    this.pauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePause();
    });

    this.audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleAudio();
    });
  }

  private togglePause(): void {
    this.isPaused = !this.isPaused;
    this.pauseBtn.innerHTML = this.isPaused ? '▶️' : '⏸️';
    this.pauseBtn.style.opacity = this.isPaused ? '0.8' : '1';
    this.onPauseToggle(this.isPaused);
  }

  private toggleAudio(): void {
    this.audioEnabled = !this.audioEnabled;
    this.audioBtn.innerHTML = this.audioEnabled ? '🔊' : '🔇';
    this.audioBtn.style.opacity = this.audioEnabled ? '1' : '0.6';
    this.onAudioToggle();
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
      hearts.push(i < lives ? '❤️' : '🤍');
    }
    this.livesElement.innerHTML = hearts.join(' ');
  }

  public updateProgress(percentage: number): void {
    this.progressFill.style.width = `${percentage}%`;
    
    // Energy color progression
    if (percentage >= 80) {
      this.progressFill.style.background = 'linear-gradient(90deg, #32CD32, #228B22)';
    } else if (percentage >= 50) {
      this.progressFill.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)';
    } else if (percentage >= 20) {
      this.progressFill.style.background = 'linear-gradient(90deg, #FF8C00, #FF6347)';
    } else {
      this.progressFill.style.background = 'linear-gradient(90deg, #FF4500, #DC143C)';
    }
  }

  public updatePauseState(paused: boolean): void {
    this.isPaused = paused;
    this.pauseBtn.innerHTML = this.isPaused ? '▶️' : '⏸️';
    this.pauseBtn.style.opacity = this.isPaused ? '0.8' : '1';
  }

  public destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}