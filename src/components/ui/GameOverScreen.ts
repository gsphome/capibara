export class GameOverScreen {
  private element!: HTMLElement;
  private onRestart: () => void;

  constructor(container: HTMLElement, onRestart: () => void) {
    this.onRestart = onRestart;
    this.createElement();
    container.appendChild(this.element);
    this.hide(); // Start hidden
  }

  private createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'game-over';

    const title = document.createElement('h1');
    title.className = 'game-over__title';
    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'game-over__score';
    
    const restartButton = document.createElement('button');
    restartButton.className = 'game-over__button';
    restartButton.textContent = 'Play Again';
    restartButton.addEventListener('click', this.onRestart);

    this.element.appendChild(title);
    this.element.appendChild(scoreDisplay);
    this.element.appendChild(restartButton);
  }

  public show(won: boolean, score: number, level: number): void {
    const title = this.element.querySelector('.game-over__title') as HTMLElement;
    const scoreDisplay = this.element.querySelector('.game-over__score') as HTMLElement;
    
    if (won) {
      title.textContent = '🎉 You Win! 🎉';
      title.style.color = '#FFD700';
      scoreDisplay.textContent = `Capybara is full! Final Score: ${score} (Level ${level})`;
    } else {
      title.textContent = '💔 Game Over 💔';
      title.style.color = '#FF4444';
      scoreDisplay.textContent = `Too many vegetables missed! Final Score: ${score} (Level ${level})`;
    }
    
    this.element.style.display = 'flex';
  }

  public hide(): void {
    this.element.style.display = 'none';
  }

  public destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}