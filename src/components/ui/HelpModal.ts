export class HelpModal {
  private element!: HTMLElement;

  constructor() {
  }

  public show(): void {
    this.createElement();
    document.body.appendChild(this.element);
    
    setTimeout(() => {
      this.element.classList.add('help-modal--show');
    }, 50);
  }

  public hide(): void {
    if (this.element) {
      this.element.classList.remove('help-modal--show');
      setTimeout(() => {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }, 300);
    }
  }

  private createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'help-modal';
    
    this.element.innerHTML = `
      <div class="help-modal__backdrop"></div>
      <div class="help-modal__content">
        <div class="help-modal__header">
          <h2>🥕 Vegetable Guide</h2>
          <button class="help-modal__close">✕</button>
        </div>
        
        <div class="help-modal__body">
          <div class="vegetable-grid">
            <div class="vegetable-card">
              <div class="vegetable-icon">🥕</div>
              <div class="vegetable-name">Carrot</div>
              <div class="vegetable-points">5 Points</div>
            </div>
            
            <div class="vegetable-card">
              <div class="vegetable-icon">🥦</div>
              <div class="vegetable-name">Broccoli</div>
              <div class="vegetable-points">8 Points</div>
            </div>
            
            <div class="vegetable-card">
              <div class="vegetable-icon">🥬</div>
              <div class="vegetable-name">Lettuce</div>
              <div class="vegetable-points">3 Points</div>
            </div>
            
            <div class="vegetable-card">
              <div class="vegetable-icon">🍅</div>
              <div class="vegetable-name">Tomato</div>
              <div class="vegetable-points">6 Points</div>
            </div>
            
            <div class="vegetable-card">
              <div class="vegetable-icon">🌶️</div>
              <div class="vegetable-name">Bell Pepper</div>
              <div class="vegetable-points">10 Points</div>
            </div>
          </div>
          
          <div class="help-tips">
            <h3>💡 Pro Tips</h3>
            <ul>
              <li>Focus on Bell Peppers (10 pts) for maximum score</li>
              <li>Don't miss 3 vegetables or it's game over!</li>
              <li>Fill the capybara to 100% to advance levels</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    const closeBtn = this.element.querySelector('.help-modal__close') as HTMLButtonElement;
    const backdrop = this.element.querySelector('.help-modal__backdrop') as HTMLElement;
    
    const close = () => this.hide();
    
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    
    // Close with Escape key
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', handleKeyPress);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
  }
}