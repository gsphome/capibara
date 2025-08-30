import './styles/game.css';
import { GameEngine } from './components/game/GameEngine';

class CapybaraCatcherGame {
  private gameEngine: GameEngine | null = null;
  private container!: HTMLElement;

  constructor() {
    this.init();
  }

  private init(): void {
    // Load SVG sprites first
    this.loadSVGSprites();
    
    // Create game container
    this.container = document.createElement('div');
    this.container.className = 'capybara-game';
    
    // Add instructions
    this.showInstructions();
    
    document.body.appendChild(this.container);
  }

  private loadSVGSprites(): void {
    // Inline SVG sprites for better compatibility
    const svgSprites = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <!-- Capybara Sprites -->
        <symbol id="capybara-right" viewBox="0 0 80 60">
          <ellipse cx="40" cy="35" rx="25" ry="18" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
          <ellipse cx="40" cy="35" rx="20" ry="14" fill="#DEB887"/>
          <ellipse class="body-fill" cx="40" cy="35" rx="18" ry="12" fill="#32CD32" opacity="0" style="transition: opacity 0.3s ease;"/>
          <ellipse cx="60" cy="25" rx="15" ry="12" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
          <ellipse cx="60" cy="25" rx="12" ry="9" fill="#DEB887"/>
          <ellipse cx="55" cy="18" rx="4" ry="6" fill="#D2691E" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="65" cy="18" rx="4" ry="6" fill="#D2691E" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="55" cy="18" rx="2" ry="4" fill="#CD853F"/>
          <ellipse cx="65" cy="18" rx="2" ry="4" fill="#CD853F"/>
          <circle cx="57" cy="22" r="3" fill="#000"/>
          <circle cx="67" cy="22" r="3" fill="#000"/>
          <circle cx="58" cy="21" r="1" fill="#FFF"/>
          <circle cx="68" cy="21" r="1" fill="#FFF"/>
          <ellipse cx="72" cy="27" rx="2" ry="1.5" fill="#8B4513"/>
          <g class="legs-right">
            <ellipse cx="30" cy="48" rx="3" ry="8" fill="#D2691E"/>
            <ellipse cx="40" cy="50" rx="3" ry="6" fill="#D2691E"/>
            <ellipse cx="50" cy="48" rx="3" ry="8" fill="#D2691E"/>
            <ellipse cx="60" cy="50" rx="3" ry="6" fill="#D2691E"/>
          </g>
          <circle cx="18" cy="30" r="4" fill="#D2691E" stroke="#8B4513" stroke-width="1"/>
        </symbol>
        
        <symbol id="capybara-left" viewBox="0 0 80 60">
          <ellipse cx="40" cy="35" rx="25" ry="18" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
          <ellipse cx="40" cy="35" rx="20" ry="14" fill="#DEB887"/>
          <ellipse class="body-fill" cx="40" cy="35" rx="18" ry="12" fill="#32CD32" opacity="0" style="transition: opacity 0.3s ease;"/>
          <ellipse cx="20" cy="25" rx="15" ry="12" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
          <ellipse cx="20" cy="25" rx="12" ry="9" fill="#DEB887"/>
          <ellipse cx="15" cy="18" rx="4" ry="6" fill="#D2691E" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="25" cy="18" rx="4" ry="6" fill="#D2691E" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="15" cy="18" rx="2" ry="4" fill="#CD853F"/>
          <ellipse cx="25" cy="18" rx="2" ry="4" fill="#CD853F"/>
          <circle cx="13" cy="22" r="3" fill="#000"/>
          <circle cx="23" cy="22" r="3" fill="#000"/>
          <circle cx="12" cy="21" r="1" fill="#FFF"/>
          <circle cx="22" cy="21" r="1" fill="#FFF"/>
          <ellipse cx="8" cy="27" rx="2" ry="1.5" fill="#8B4513"/>
          <g class="legs-left">
            <ellipse cx="20" cy="50" rx="3" ry="6" fill="#D2691E"/>
            <ellipse cx="30" cy="48" rx="3" ry="8" fill="#D2691E"/>
            <ellipse cx="40" cy="50" rx="3" ry="6" fill="#D2691E"/>
            <ellipse cx="50" cy="48" rx="3" ry="8" fill="#D2691E"/>
          </g>
          <circle cx="62" cy="30" r="4" fill="#D2691E" stroke="#8B4513" stroke-width="1"/>
        </symbol>
        
        <!-- Vegetable Sprites -->
        <symbol id="carrot" viewBox="0 0 30 30">
          <path d="M15 2 L12 8 L8 12 L10 18 L15 28 L20 18 L22 12 L18 8 Z" 
                fill="#FF8C00" stroke="#E67300" stroke-width="1"/>
          <path d="M15 2 L13 6 L11 10 L12 16 L15 24 L18 16 L19 10 L17 6 Z" 
                fill="#FFA500"/>
          <path d="M15 2 Q12 0 10 2 Q13 1 15 2" fill="#228B22"/>
          <path d="M15 2 Q18 0 20 2 Q17 1 15 2" fill="#228B22"/>
          <path d="M15 2 Q14 -1 16 1 Q15 0 15 2" fill="#32CD32"/>
        </symbol>
        
        <symbol id="broccoli" viewBox="0 0 30 30">
          <rect x="13" y="20" width="4" height="8" fill="#90EE90" rx="2"/>
          <circle cx="15" cy="12" r="6" fill="#228B22"/>
          <circle cx="11" cy="10" r="4" fill="#32CD32"/>
          <circle cx="19" cy="10" r="4" fill="#32CD32"/>
          <circle cx="9" cy="15" r="3" fill="#228B22"/>
          <circle cx="21" cy="15" r="3" fill="#228B22"/>
          <circle cx="15" cy="8" r="3" fill="#006400"/>
          <circle cx="12" cy="16" r="2.5" fill="#32CD32"/>
          <circle cx="18" cy="16" r="2.5" fill="#32CD32"/>
          <circle cx="15" cy="12" r="2" fill="#006400"/>
          <circle cx="13" cy="9" r="1.5" fill="#228B22"/>
          <circle cx="17" cy="9" r="1.5" fill="#228B22"/>
        </symbol>
        
        <symbol id="lettuce" viewBox="0 0 30 30">
          <path d="M15 5 Q8 8 6 15 Q8 22 15 25 Q22 22 24 15 Q22 8 15 5 Z" 
                fill="#90EE90" stroke="#7CCD7C" stroke-width="1"/>
          <path d="M15 8 Q10 10 9 15 Q10 20 15 22 Q20 20 21 15 Q20 10 15 8 Z" 
                fill="#98FB98"/>
          <path d="M15 8 L15 22" stroke="#7CCD7C" stroke-width="0.5"/>
          <path d="M12 10 Q15 12 12 18" stroke="#7CCD7C" stroke-width="0.5" fill="none"/>
          <path d="M18 10 Q15 12 18 18" stroke="#7CCD7C" stroke-width="0.5" fill="none"/>
          <ellipse cx="15" cy="15" rx="3" ry="4" fill="#ADFF2F"/>
        </symbol>
        
        <symbol id="tomato" viewBox="0 0 30 30">
          <circle cx="15" cy="16" r="10" fill="#FF6347"/>
          <ellipse cx="12" cy="13" rx="3" ry="4" fill="#FF7F50" opacity="0.7"/>
          <ellipse cx="15" cy="8" rx="4" ry="2" fill="#228B22"/>
          <rect x="14" y="6" width="2" height="3" fill="#32CD32"/>
          <path d="M11 8 Q10 6 12 7 Q13 8 11 8" fill="#228B22"/>
          <path d="M19 8 Q20 6 18 7 Q17 8 19 8" fill="#228B22"/>
          <path d="M15 7 Q14 5 16 6 Q15 7 15 7" fill="#228B22"/>
          <path d="M13 8 Q12 6 14 7 Q13 8 13 8" fill="#228B22"/>
          <path d="M17 8 Q18 6 16 7 Q17 8 17 8" fill="#228B22"/>
        </symbol>
        
        <symbol id="pepper" viewBox="0 0 30 30">
          <path d="M15 6 Q10 8 8 15 Q9 22 12 26 Q15 28 18 26 Q21 22 22 15 Q20 8 15 6 Z" 
                fill="#FF0000"/>
          <path d="M15 8 Q12 10 11 15 Q12 20 14 24 Q15 25 16 24 Q18 20 19 15 Q18 10 15 8 Z" 
                fill="#FF4500" opacity="0.6"/>
          <ellipse cx="15" cy="6" rx="2" ry="1.5" fill="#228B22"/>
          <rect x="14.5" y="4" width="1" height="3" fill="#32CD32"/>
          <path d="M15 6 Q18 8 20 12 Q19 16 17 20" stroke="#DC143C" stroke-width="1" fill="none"/>
        </symbol>
      </svg>
    `;
    
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = svgSprites;
    document.body.appendChild(svgContainer);
  }

  private showInstructions(): void {
    const instructions = document.createElement('div');
    instructions.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      z-index: 1000;
      max-width: 400px;
    `;
    
    instructions.innerHTML = `
      <h1>🦫 Capybara Catcher</h1>
      <p>Help the hungry capybara catch falling vegetables!</p>
      <div style="margin: 1rem 0;">
        <p><strong>Controls:</strong></p>
        <p>🖱️ Mouse: Move to follow cursor</p>
        <p>⌨️ Keyboard: Arrow keys or A/D</p>
        <p>📱 Mobile: Touch and drag</p>
      </div>
      <div style="margin: 1rem 0;">
        <p><strong>Goal:</strong> Fill the capybara to 100%</p>
        <p><strong>Warning:</strong> Don't miss 3 vegetables!</p>
      </div>
      <button id="startGame" style="
        padding: 12px 24px;
        font-size: 1.2rem;
        background: #32CD32;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 1rem;
      ">Start Game</button>
    `;
    
    this.container.appendChild(instructions);
    
    const startButton = instructions.querySelector('#startGame') as HTMLButtonElement;
    startButton.addEventListener('click', () => {
      instructions.remove();
      this.startGame();
    });
  }

  private startGame(): void {
    if (this.gameEngine) {
      this.gameEngine.destroy();
    }
    
    this.gameEngine = new GameEngine(this.container);
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CapybaraCatcherGame();
});

// Handle window resize
window.addEventListener('resize', () => {
  // Update canvas sizes if needed
  const canvas = document.querySelector('.particle-canvas') as HTMLCanvasElement;
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});