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
    this.scoreElement.textContent = 'Score: 0';

    // Level display
    this.levelElement = document.createElement('div');
    this.levelElement.className = 'game-hud__level';
    this.levelElement.textContent = 'Level: 1';

    // Missed vegetables display
    this.missedElement = document.createElement('div');
    this.missedElement.className = 'game-hud__missed';
    this.missedElement.textContent = 'Missed: 0/3';

    this.element.appendChild(this.scoreElement);
    this.element.appendChild(this.levelElement);
    this.element.appendChild(this.missedElement);
    
    // Progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-bar';
    
    this.progressFill = document.createElement('div');
    this.progressFill.className = 'progress-bar__fill';
    this.progressFill.style.width = '0%';
    
    progressContainer.appendChild(this.progressFill);
    this.element.appendChild(progressContainer);
    
    this.progressBar = progressContainer;


  }

  public updateScore(score: number): void {
    this.scoreElement.textContent = `Score: ${score}`;
  }

  public updateLevel(level: number): void {
    this.levelElement.textContent = `Level: ${level}`;
  }

  public updateMissed(missed: number): void {
    this.missedElement.textContent = `Missed: ${missed}/3`;
    if (missed >= 2) {
      this.missedElement.style.color = '#ff4444';
    } else {
      this.missedElement.style.color = 'white';
    }
  }

  public updateProgress(percentage: number): void {
    this.progressFill.style.width = `${percentage}%`;
    
    if (percentage >= 100) {
      this.progressFill.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)';
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