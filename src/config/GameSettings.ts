export class GameSettings {
  // Screen breakpoints
  public static readonly MOBILE_BREAKPOINT = 768;
  
  // Capybara settings
  public static readonly CAPYBARA_WIDTH_DESKTOP = 100;
  public static readonly CAPYBARA_HEIGHT_DESKTOP = 75;
  public static readonly CAPYBARA_WIDTH_MOBILE = 100;
  public static readonly CAPYBARA_HEIGHT_MOBILE = 75;
  public static readonly CAPYBARA_BOTTOM_DESKTOP = 20;
  public static readonly CAPYBARA_BOTTOM_MOBILE = 10;
  
  // Vegetable settings
  public static readonly VEGETABLE_SIZE_DESKTOP = 50;
  public static readonly VEGETABLE_SIZE_MOBILE = 40;
  
  // Player settings
  public static readonly PLAYER_SPEED = 8;
  
  // Game mechanics
  public static readonly SPAWN_RATE_BASE = 2000;
  public static readonly SPAWN_RATE_DECREASE = 100;
  public static readonly MIN_SPAWN_RATE = 800;
  public static readonly LEVEL_UP_THRESHOLD = 50;
  
  // Audio settings
  public static readonly AUDIO_ENABLED_DEFAULT = true;
  public static readonly MASTER_VOLUME = 0.6;
  
  // Animation settings
  public static readonly ANIMATION_DURATION_FAST = 300;
  public static readonly ANIMATION_DURATION_NORMAL = 600;
  public static readonly ANIMATION_DURATION_SLOW = 1000;
  
  // Performance settings
  public static readonly REDUCE_ANIMATIONS = false;
  
  // Helper methods
  public static isMobile(): boolean {
    return window.innerWidth <= this.MOBILE_BREAKPOINT;
  }
  
  public static getCapybaraWidth(): number {
    return this.isMobile() ? this.CAPYBARA_WIDTH_MOBILE : this.CAPYBARA_WIDTH_DESKTOP;
  }
  
  public static getCapybaraHeight(): number {
    return this.isMobile() ? this.CAPYBARA_HEIGHT_MOBILE : this.CAPYBARA_HEIGHT_DESKTOP;
  }
  
  public static getCapybaraBottom(): number {
    return this.isMobile() ? this.CAPYBARA_BOTTOM_MOBILE : this.CAPYBARA_BOTTOM_DESKTOP;
  }
  
  public static getVegetableSize(): number {
    return this.isMobile() ? this.VEGETABLE_SIZE_MOBILE : this.VEGETABLE_SIZE_DESKTOP;
  }
  
  public static getCapybaraBounds(x: number, containerHeight: number) {
    const width = this.getCapybaraWidth();
    const height = this.getCapybaraHeight();
    const bottom = this.getCapybaraBottom();
    
    return {
      x,
      y: containerHeight - bottom - height,
      width,
      height
    };
  }
}