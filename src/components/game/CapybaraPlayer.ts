export class CapybaraPlayer {
  private element!: HTMLElement;
  private fillElement!: HTMLElement;
  private svgElement!: SVGElement;
  private x: number = window.innerWidth / 2 - 40;
  private lastX: number = window.innerWidth / 2 - 40;
  private readonly speed: number = 8;
  private direction: 'left' | 'right' = 'right';

  constructor(container: HTMLElement) {
    this.createElement();
    container.appendChild(this.element);
    this.setupControls();
  }

  private updateCapybaraFill(percentage: number): void {
    const bodyFill = this.svgElement.querySelector('.body-fill') as SVGElement;
    if (bodyFill) {
      const opacity = Math.min(0.7, percentage / 100 * 0.7);
      bodyFill.setAttribute('opacity', opacity.toString());
      
      // Change color based on fullness
      if (percentage >= 80) {
        bodyFill.setAttribute('fill', '#FFD700');
      } else if (percentage >= 50) {
        bodyFill.setAttribute('fill', '#ADFF2F');
      } else {
        bodyFill.setAttribute('fill', '#32CD32');
      }
    }
  }

  private createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'capybara-player';
    
    const body = document.createElement('div');
    body.className = 'capybara-player__body';
    
    // Create SVG capybara
    this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgElement.setAttribute('class', 'capybara-player__svg');
    this.svgElement.setAttribute('viewBox', '0 0 80 60');
    
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#capybara-right');
    this.svgElement.appendChild(use);
    
    // Fill indicator inside capybara body
    this.fillElement = document.createElement('div');
    this.fillElement.className = 'capybara-player__fill';
    this.fillElement.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(45deg, #32CD32, #228B22);
      border-radius: 50% 50% 40% 40%;
      transition: height 0.3s ease;
    `;
    
    body.appendChild(this.fillElement);
    body.appendChild(this.svgElement);
    this.element.appendChild(body);
    
    this.updatePosition();
  }

  private setupControls(): void {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          this.moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          this.moveRight();
          break;
      }
    });

    // Mouse controls
    document.addEventListener('mousemove', (e) => {
      this.x = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - 50));
      this.updatePosition();
    });

    // Touch controls
    let isDragging = false;
    
    document.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      this.x = Math.max(0, Math.min(window.innerWidth - 100, touch.clientX - 50));
      this.updatePosition();
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  private moveLeft(): void {
    this.x = Math.max(0, this.x - this.speed);
    this.updatePosition();
  }

  private moveRight(): void {
    this.x = Math.min(window.innerWidth - 100, this.x + this.speed);
    this.updatePosition();
  }

  private updatePosition(): void {
    this.element.style.left = `${this.x}px`;
    
    // Update direction based on movement
    const newDirection = this.x > this.lastX ? 'right' : this.x < this.lastX ? 'left' : this.direction;
    
    if (newDirection !== this.direction) {
      this.direction = newDirection;
      const use = this.svgElement.querySelector('use');
      if (use) {
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#capybara-${this.direction}`);
      }
      
      // Add running animation
      this.element.classList.add('capybara-player--running');
      setTimeout(() => {
        this.element.classList.remove('capybara-player--running');
      }, 300);
    }
    
    this.lastX = this.x;
  }

  public updateFill(percentage: number): void {
    this.fillElement.style.height = `${percentage}%`;
    
    // Change color as capybara gets fuller
    if (percentage >= 80) {
      this.fillElement.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
    } else if (percentage >= 50) {
      this.fillElement.style.background = 'linear-gradient(45deg, #ADFF2F, #32CD32)';
    }
  }

  public getBounds() {
    return {
      x: this.x,
      y: window.innerHeight - 95,
      width: 100,
      height: 75
    };
  }

  public getX(): number {
    return this.x;
  }

  public destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}