export class LevelTransition {
  private element!: HTMLElement;

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public show(level: number): void {
    this.createElement(level);
    this.container.appendChild(this.element);
    
    setTimeout(() => {
      this.element.classList.add('level-transition--show');
    }, 50);
    
    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  private createElement(level: number): void {
    this.element = document.createElement('div');
    this.element.className = 'level-transition';
    this.element.innerHTML = `
      <div class="level-transition__content">
        <h1>Level ${level}</h1>
        <p>Let's go!</p>
      </div>
    `;
  }

  private hide(): void {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}