var b=Object.defineProperty;var x=(r,e,t)=>e in r?b(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var i=(r,e,t)=>x(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(l){if(l.ep)return;l.ep=!0;const a=t(l);fetch(l.href,a)}})();const E=r=>{let e;const t=new Set,s=(h,g)=>{const d=typeof h=="function"?h(e):h;if(!Object.is(d,e)){const v=e;e=(g!=null?g:typeof d!="object"||d===null)?d:Object.assign({},e,d),t.forEach(f=>f(e,v))}},l=()=>e,c={setState:s,getState:l,getInitialState:()=>m,subscribe:h=>(t.add(h),()=>t.delete(h))},m=e=r(s,l,c);return c},w=(r=>E);class n{static isMobile(){return window.innerWidth<=this.MOBILE_BREAKPOINT}static getCapybaraWidth(){return this.isMobile()?this.CAPYBARA_WIDTH_MOBILE:this.CAPYBARA_WIDTH_DESKTOP}static getCapybaraHeight(){return this.isMobile()?this.CAPYBARA_HEIGHT_MOBILE:this.CAPYBARA_HEIGHT_DESKTOP}static getCapybaraBottom(){return this.isMobile()?this.CAPYBARA_BOTTOM_MOBILE:this.CAPYBARA_BOTTOM_DESKTOP}static getVegetableSize(){return this.isMobile()?this.VEGETABLE_SIZE_MOBILE:this.VEGETABLE_SIZE_DESKTOP}static getCapybaraBounds(e,t){const s=this.getCapybaraWidth(),l=this.getCapybaraHeight(),a=this.getCapybaraBottom();return{x:e,y:t-a-l,width:s,height:l}}}i(n,"MOBILE_BREAKPOINT",768),i(n,"CAPYBARA_WIDTH_DESKTOP",100),i(n,"CAPYBARA_HEIGHT_DESKTOP",75),i(n,"CAPYBARA_WIDTH_MOBILE",100),i(n,"CAPYBARA_HEIGHT_MOBILE",75),i(n,"CAPYBARA_BOTTOM_DESKTOP",20),i(n,"CAPYBARA_BOTTOM_MOBILE",10),i(n,"VEGETABLE_SIZE_DESKTOP",50),i(n,"VEGETABLE_SIZE_MOBILE",40),i(n,"PLAYER_SPEED",8),i(n,"SPAWN_RATE_BASE",2e3),i(n,"SPAWN_RATE_DECREASE",100),i(n,"MIN_SPAWN_RATE",800),i(n,"LEVEL_UP_THRESHOLD",50);const u=w()(r=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",fallSpeed:2,ceilingHeight:100,vegetables:[],addVegetable:e=>r(t=>({vegetables:[...t.vegetables,e]})),removeVegetable:e=>r(t=>({vegetables:t.vegetables.filter(s=>s.id!==e)})),incrementLevel:()=>r(e=>({level:e.level+1,fallSpeed:e.fallSpeed*1.15,ceilingHeight:Math.max(50,e.ceilingHeight*.9)})),incrementMissed:()=>r(e=>{const t=e.missedVegetables+1;return{missedVegetables:t,gameStatus:t>=3?"lost":e.gameStatus}}),updateScore:e=>r(t=>{const s=Math.min(100,t.capybaraFillPercentage+e);return{score:t.score+e,capybaraFillPercentage:s,gameStatus:s>=n.LEVEL_UP_THRESHOLD?"won":t.gameStatus}}),resetForNextLevel:()=>r(()=>({capybaraFillPercentage:0,missedVegetables:0,vegetables:[],gameStatus:"playing"})),resetGame:()=>r(()=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",fallSpeed:2,ceilingHeight:100,vegetables:[]})),pauseGame:()=>r(()=>({gameStatus:"paused"})),resumeGame:()=>r(()=>({gameStatus:"playing"}))}));class C{constructor(){i(this,"level",1);i(this,"score",0);i(this,"missedVegetables",0);i(this,"capybaraFillPercentage",0);i(this,"gameStatus","playing");i(this,"fallSpeed",2);i(this,"ceilingHeight",100);i(this,"vegetables",[]);i(this,"listeners",[])}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notify(){this.listeners.forEach(e=>e())}addVegetable(e){this.vegetables.push(e),this.notify()}removeVegetable(e){this.vegetables=this.vegetables.filter(t=>t.id!==e),this.notify()}incrementLevel(){this.level+=1,this.fallSpeed*=1.15,this.ceilingHeight=Math.max(50,this.ceilingHeight*.9),this.notify()}incrementMissed(){this.missedVegetables+=1,this.missedVegetables>=3&&(this.gameStatus="lost"),this.notify()}updateScore(e){this.score+=e,this.capybaraFillPercentage=Math.min(100,this.capybaraFillPercentage+e),this.capybaraFillPercentage>=100&&(this.gameStatus="won",this.incrementLevel()),this.notify()}resetForNextLevel(){this.capybaraFillPercentage=0,this.missedVegetables=0,this.vegetables=[],this.notify()}resetGame(){this.level=1,this.score=0,this.missedVegetables=0,this.capybaraFillPercentage=0,this.gameStatus="playing",this.fallSpeed=2,this.ceilingHeight=100,this.vegetables=[],setTimeout(()=>this.notify(),100)}pauseGame(){this.gameStatus="paused",this.notify()}resumeGame(){this.gameStatus="playing",this.notify()}}const p=new C;class S{constructor(e){i(this,"element");i(this,"fillElement");i(this,"svgElement");i(this,"x",0);i(this,"lastX",0);i(this,"gameContainer");i(this,"speed",8);i(this,"direction","right");this.gameContainer=e,this.x=this.gameContainer.clientWidth/2-n.getCapybaraWidth()/2,this.lastX=this.x,this.createElement(),e.appendChild(this.element),this.setupControls()}createElement(){this.element=document.createElement("div"),this.element.className="capybara-player";const e=document.createElement("div");e.className="capybara-player__body",this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svgElement.setAttribute("class","capybara-player__svg"),this.svgElement.setAttribute("viewBox","0 0 80 60");const t=document.createElementNS("http://www.w3.org/2000/svg","use");t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#capybara-right"),this.svgElement.appendChild(t),this.fillElement=document.createElement("div"),this.fillElement.className="capybara-player__fill",this.fillElement.style.cssText=`
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(45deg, #32CD32, #228B22);
      border-radius: 50% 50% 40% 40%;
      transition: height 0.3s ease;
    `,e.appendChild(this.fillElement),e.appendChild(this.svgElement),this.element.appendChild(e),this.updatePosition()}setupControls(){document.addEventListener("keydown",t=>{if(p.gameStatus==="playing")switch(t.key){case"ArrowLeft":case"a":case"A":this.moveLeft();break;case"ArrowRight":case"d":case"D":this.moveRight();break}}),document.addEventListener("mousemove",t=>{if(p.gameStatus!=="playing")return;const s=this.gameContainer.getBoundingClientRect(),l=t.clientX-s.left,a=n.getCapybaraWidth(),o=a/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-a,l-o)),this.updatePosition()});let e=!1;document.addEventListener("touchstart",t=>{const s=t.target;s.closest(".pause-overlay")||s.closest(".game-over")||s.closest(".level-transition")||(e=!0,t.preventDefault())},{passive:!1}),document.addEventListener("touchmove",t=>{if(!e||p.gameStatus!=="playing")return;const s=t.target;if(s.closest(".pause-overlay")||s.closest(".game-over")||s.closest(".level-transition"))return;const l=t.touches[0],a=this.gameContainer.getBoundingClientRect(),o=l.clientX-a.left,c=n.getCapybaraWidth(),m=c/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-c,o-m)),this.updatePosition(),t.preventDefault()},{passive:!1}),document.addEventListener("touchend",()=>{e=!1})}moveLeft(){this.x=Math.max(0,this.x-this.speed),this.updatePosition()}moveRight(){const e=n.getCapybaraWidth();this.x=Math.min(this.gameContainer.clientWidth-e,this.x+this.speed),this.updatePosition()}updatePosition(){this.element.style.left=`${this.x}px`;const e=this.x>this.lastX?"right":this.x<this.lastX?"left":this.direction;if(e!==this.direction){this.direction=e;const t=this.svgElement.querySelector("use");t&&t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#capybara-${this.direction}`),this.element.classList.add("capybara-player--running"),setTimeout(()=>{this.element.classList.remove("capybara-player--running")},300)}this.lastX=this.x}updateFill(e){this.fillElement.style.height=`${e}%`,e>=80?this.fillElement.style.background="linear-gradient(45deg, #FFD700, #FFA500)":e>=50&&(this.fillElement.style.background="linear-gradient(45deg, #ADFF2F, #32CD32)")}getBounds(){return n.getCapybaraBounds(this.x,this.gameContainer.clientHeight)}getX(){return this.x}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class B{constructor(e){i(this,"container");i(this,"spawnTimer",0);i(this,"vegetableTypes",["carrot","broccoli","lettuce","tomato","pepper"]);i(this,"activeVegetables",new Map);this.container=e}update(e,t){this.spawnTimer+=e;const s=Math.max(800,2e3-t*100),l=[];if(this.spawnTimer>=s){const a=this.spawnVegetable(t);l.push(a),this.spawnTimer=0}return l}spawnVegetable(e){const t=this.vegetableTypes[Math.floor(Math.random()*this.vegetableTypes.length)],s=Math.random()*(this.container.clientWidth-n.getVegetableSize()),l={id:Date.now().toString()+Math.random(),type:t,x:s,y:-n.getVegetableSize(),speed:2+e*.3,points:this.getVegetablePoints(t)};return this.createVegetableElement(l),l}createVegetableElement(e){const t=document.createElement("div");t.className=`vegetable vegetable--${e.type}`,t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.id=e.id;const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("viewBox","0 0 30 30"),s.setAttribute("width",n.getVegetableSize().toString()),s.setAttribute("height",n.getVegetableSize().toString());const l=document.createElementNS("http://www.w3.org/2000/svg","use");l.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#${e.type}`),s.appendChild(l),t.appendChild(s),this.container.appendChild(t),this.activeVegetables.set(e.id,t)}updateVegetablePosition(e){const t=this.activeVegetables.get(e.id);t&&(t.style.top=`${e.y}px`)}removeVegetable(e){const t=this.activeVegetables.get(e);t&&t.parentNode&&(t.parentNode.removeChild(t),this.activeVegetables.delete(e))}getVegetablePoints(e){return{carrot:5,broccoli:8,lettuce:3,tomato:6,pepper:10}[e]||5}}class L{constructor(e){i(this,"particles",[]);i(this,"canvas");i(this,"ctx");this.canvas=document.createElement("canvas"),this.canvas.className="particle-canvas",this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.style.position="absolute",this.canvas.style.top="0",this.canvas.style.left="0",this.canvas.style.pointerEvents="none",this.canvas.style.zIndex="15",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight})}createCatchEffect(e,t){for(let s=0;s<8;s++)this.particles.push({x:e+15,y:t+15,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,life:30,maxLife:30,color:`hsl(${Math.random()*60+60}, 70%, 60%)`})}update(){this.particles=this.particles.filter(e=>(e.x+=e.vx,e.y+=e.vy,e.vy+=.1,e.life--,e.life>0))}render(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{const t=e.life/e.maxLife;this.ctx.globalAlpha=t,this.ctx.fillStyle=e.color,this.ctx.fillRect(e.x,e.y,4,4)}),this.ctx.globalAlpha=1}destroy(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}class F{constructor(e){i(this,"element");i(this,"scoreElement");i(this,"levelElement");i(this,"missedElement");i(this,"progressBar");i(this,"progressFill");const t=document.querySelector(".game-hud");t&&t.remove(),this.createElement();let s=document.querySelector(".game-wrapper"),l=document.querySelector(".game-sidebar");s?l&&l.appendChild(this.element):(s=document.createElement("div"),s.className="game-wrapper",l=document.createElement("div"),l.className="game-sidebar",l.appendChild(this.element),s.appendChild(l),s.appendChild(e),document.body.appendChild(s))}createElement(){this.element=document.createElement("div"),this.element.className="game-hud",this.scoreElement=document.createElement("div"),this.scoreElement.className="game-hud__score",this.scoreElement.innerHTML="Score<br>0",this.levelElement=document.createElement("div"),this.levelElement.className="game-hud__level",this.levelElement.innerHTML="Level<br>1",this.missedElement=document.createElement("div"),this.missedElement.className="game-hud__lives",this.updateLives(3);const e=document.createElement("div");e.className="game-hud__row",e.appendChild(this.scoreElement),e.appendChild(this.levelElement),e.appendChild(this.missedElement),this.element.appendChild(e);const t=document.createElement("div");t.className="progress-bar",this.progressFill=document.createElement("div"),this.progressFill.className="progress-bar__fill",this.progressFill.style.width="0%",t.appendChild(this.progressFill),this.element.appendChild(t),this.progressBar=t}updateScore(e){this.scoreElement.innerHTML=`Score<br>${e}`}updateLevel(e){this.levelElement.innerHTML=`Level<br>${e}`}updateLives(e){const t=[];for(let s=0;s<3;s++)s<e?t.push("❤️"):t.push("🤍");this.missedElement.innerHTML=t.join(" ")}updateProgress(e){this.progressFill.style.width=`${e}%`,e>=100&&(this.progressFill.style.background="linear-gradient(90deg, #FFD700, #FFA500)")}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.progressBar.parentNode&&this.progressBar.parentNode.removeChild(this.progressBar)}}class _{constructor(e,t){i(this,"element");i(this,"onRestart");this.onRestart=t,this.createElement(),e.appendChild(this.element),this.hide()}createElement(){this.element=document.createElement("div"),this.element.className="game-over";const e=document.createElement("h1");e.className="game-over__title";const t=document.createElement("div");t.className="game-over__score";const s=document.createElement("button");s.className="game-over__button",s.textContent="Play Again",s.addEventListener("click",this.onRestart),this.element.appendChild(e),this.element.appendChild(t),this.element.appendChild(s)}show(e,t,s){const l=this.element.querySelector(".game-over__title"),a=this.element.querySelector(".game-over__score");e?(l.textContent="🎉 You Win! 🎉",l.style.color="#FFD700",a.textContent=`Capybara is full! Final Score: ${t} (Level ${s})`):(l.textContent="💔 Game Over 💔",l.style.color="#FF4444",a.textContent=`Too many vegetables missed! Final Score: ${t} (Level ${s})`),this.element.style.display="flex"}hide(){this.element.style.display="none"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class k{constructor(e){i(this,"element");i(this,"container");this.container=e}show(e){this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("level-transition--show")},50),setTimeout(()=>{this.hide()},2e3)}createElement(e){this.element=document.createElement("div"),this.element.className="level-transition",this.element.innerHTML=`
      <div class="level-transition__content">
        <h1>Level ${e}</h1>
        <p>Let's go!</p>
      </div>
    `}hide(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class D{constructor(e,t){i(this,"element");i(this,"container");i(this,"onShowHelp");this.container=e,this.onShowHelp=t}show(e){this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("pause-overlay--show")},50)}hide(){this.element&&(this.element.classList.remove("pause-overlay--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(e){this.element=document.createElement("div"),this.element.className="pause-overlay",this.element.innerHTML=`
      <div class="pause-overlay__backdrop"></div>
      <div class="pause-overlay__content">
        <div class="pause-overlay__icon">⏸️</div>
        <h2>Game Paused</h2>
        <p>Take a break! The capybara is waiting for you.</p>
        <button class="pause-overlay__resume-btn">
          ▶️ Resume Game
        </button>
        <div class="pause-overlay__hint">
          <small>💡 Tip: Press SPACE to pause/resume anytime</small>
          <br>
          <button class="pause-overlay__help-btn" id="pauseHelpBtn">
            🥕 Vegetable Guide
          </button>
        </div>
      </div>
    `;const t=this.element.querySelector(".pause-overlay__resume-btn"),s=this.element.querySelector("#pauseHelpBtn"),l=()=>{this.hide(),e()};t.addEventListener("click",l),t.addEventListener("touchend",o=>{o.preventDefault(),l()}),s&&this.onShowHelp&&s.addEventListener("click",this.onShowHelp);const a=o=>{o.code==="Space"&&(o.preventDefault(),l(),document.removeEventListener("keydown",a))};document.addEventListener("keydown",a)}}class y{constructor(){i(this,"element")}show(){this.createElement(),document.body.appendChild(this.element),setTimeout(()=>{this.element.classList.add("help-modal--show")},50)}hide(){this.element&&(this.element.classList.remove("help-modal--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(){this.element=document.createElement("div"),this.element.className="help-modal",this.element.innerHTML=`
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
    `;const e=this.element.querySelector(".help-modal__close"),t=this.element.querySelector(".help-modal__backdrop"),s=()=>this.hide();e.addEventListener("click",s),t.addEventListener("click",s);const l=a=>{a.key==="Escape"&&(s(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}}class M{constructor(e){i(this,"container");i(this,"player");i(this,"spawner");i(this,"particles");i(this,"hud");i(this,"gameOverScreen");i(this,"levelTransition");i(this,"pauseOverlay");i(this,"helpModal");i(this,"animationId",0);i(this,"lastTime",0);i(this,"vegetables",[]);i(this,"gameStore",u);i(this,"levelTransitionActive",!1);this.container=e,this.init()}init(){this.player=new S(this.container),this.spawner=new B(this.container),this.particles=new L(this.container),this.hud=new F(this.container),this.gameOverScreen=new _(this.container,()=>this.restart()),this.levelTransition=new k(this.container),this.pauseOverlay=new D(this.container,()=>this.helpModal.show()),this.helpModal=new y,u.subscribe(e=>this.handleGameStateChange(e)),this.gameLoop(0),this.setupKeyboardControls()}handleGameStateChange(e){e.gameStatus==="paused"?this.pauseOverlay.show(()=>this.gameStore.getState().resumeGame()):e.gameStatus==="playing"?this.pauseOverlay.hide():e.gameStatus==="won"&&!this.levelTransitionActive?(this.levelTransitionActive=!0,this.levelTransition.show(e.level+1),setTimeout(()=>{this.gameStore.getState().incrementLevel(),this.gameStore.getState().resetForNextLevel(),this.levelTransitionActive=!1},2e3)):e.gameStatus==="lost"&&this.gameOverScreen.show(!1,e.score,e.level)}setupKeyboardControls(){document.addEventListener("keydown",e=>{switch(e.key){case" ":case"Escape":e.preventDefault();const t=this.gameStore.getState();t.gameStatus==="playing"?t.pauseGame():t.gameStatus==="paused"&&t.resumeGame();break;case"r":case"R":const s=this.gameStore.getState();(s.gameStatus==="lost"||s.gameStatus==="won")&&this.restart();break}})}gameLoop(e){const t=e-this.lastTime;this.lastTime=e;const s=this.gameStore.getState();s.gameStatus==="playing"?(this.update(t),this.render()):s.gameStatus,this.animationId=requestAnimationFrame(l=>this.gameLoop(l))}update(e){const t=this.gameStore.getState(),s=this.spawner.update(e,t.level);this.vegetables.push(...s),this.vegetables=this.vegetables.filter(a=>{a.y+=a.speed,this.spawner.updateVegetablePosition(a);const o=this.player.getBounds();if(this.checkCollision(o,a)){t.updateScore(a.points),this.particles.createCatchEffect(a.x,a.y),this.spawner.removeVegetable(a.id);const c=this.container.querySelector(".capybara-player");return c&&(c.classList.add("capybara-player--catch"),setTimeout(()=>{c.classList.remove("capybara-player--catch")},500)),!1}return a.y>this.container.clientHeight?(t.incrementMissed(),this.spawner.removeVegetable(a.id),!1):!0}),this.particles.update();const l=this.gameStore.getState();this.hud.updateScore(l.score),this.hud.updateLevel(l.level),this.hud.updateLives(3-l.missedVegetables),this.hud.updateProgress(l.capybaraFillPercentage),this.player.updateFill(l.capybaraFillPercentage)}render(){this.particles.render()}checkCollision(e,t){return t.x<e.x+e.width&&t.x+30>e.x&&t.y<e.y+e.height&&t.y+30>e.y}restart(){this.gameStore.getState().resetGame(),this.vegetables.forEach(e=>{this.spawner.removeVegetable(e.id)}),this.vegetables=[],this.gameOverScreen.hide(),this.hud.updateScore(0),this.hud.updateLevel(1),this.hud.updateLives(3),this.hud.updateProgress(0),this.player.updateFill(0)}destroy(){this.animationId&&cancelAnimationFrame(this.animationId),this.player.destroy(),this.particles.destroy(),this.hud.destroy(),this.gameOverScreen.destroy()}}class T{constructor(){i(this,"gameEngine",null);i(this,"container");i(this,"helpModal");this.init()}init(){this.loadSVGSprites(),this.container=document.createElement("div"),this.container.className="capybara-game",this.helpModal=new y,this.showInstructions(),document.body.appendChild(this.container)}loadSVGSprites(){const e=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <!-- Capybara Sprites -->
        <symbol id="capybara-right" viewBox="0 0 80 60">
          <!-- Body -->
          <ellipse cx="40" cy="35" rx="25" ry="18" fill="#CD853F" stroke="#8B4513" stroke-width="1.5"/>
          <ellipse cx="40" cy="35" rx="22" ry="15" fill="#DEB887"/>
          <ellipse class="body-fill" cx="40" cy="35" rx="20" ry="13" fill="#32CD32" opacity="0" style="transition: opacity 0.3s ease;"/>
          
          <!-- Head -->
          <ellipse cx="62" cy="25" rx="16" ry="14" fill="#CD853F" stroke="#8B4513" stroke-width="1.5"/>
          <ellipse cx="62" cy="25" rx="14" ry="12" fill="#DEB887"/>
          
          <!-- Snout -->
          <ellipse cx="75" cy="28" rx="6" ry="4" fill="#DEB887" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="75" cy="28" rx="4" ry="2.5" fill="#F5DEB3"/>
          
          <!-- Nostrils -->
          <ellipse cx="78" cy="27" rx="1" ry="0.8" fill="#8B4513"/>
          <ellipse cx="78" cy="29" rx="1" ry="0.8" fill="#8B4513"/>
          
          <!-- Ears -->
          <ellipse cx="55" cy="16" rx="3" ry="5" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="69" cy="16" rx="3" ry="5" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="55" cy="17" rx="1.5" ry="3" fill="#F5DEB3"/>
          <ellipse cx="69" cy="17" rx="1.5" ry="3" fill="#F5DEB3"/>
          
          <!-- Eyes (larger and cuter) -->
          <circle cx="58" cy="22" r="4" fill="#000"/>
          <circle cx="70" cy="22" r="4" fill="#000"/>
          <circle cx="59" cy="20.5" r="1.5" fill="#FFF"/>
          <circle cx="71" cy="20.5" r="1.5" fill="#FFF"/>
          <circle cx="59.5" cy="21" r="0.5" fill="#FFF"/>
          <circle cx="71.5" cy="21" r="0.5" fill="#FFF"/>
          
          <!-- Mouth (subtle smile) -->
          <path d="M72 31 Q75 33 78 31" stroke="#8B4513" stroke-width="1" fill="none"/>
          
          <!-- Legs -->
          <g class="legs-right">
            <ellipse cx="30" cy="48" rx="4" ry="8" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
            <ellipse cx="42" cy="50" rx="4" ry="6" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
            <ellipse cx="54" cy="48" rx="4" ry="8" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
            <ellipse cx="66" cy="50" rx="4" ry="6" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
          </g>
          
          <!-- Tail -->
          <circle cx="18" cy="32" r="3" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
        </symbol>
        
        <symbol id="capybara-left" viewBox="0 0 80 60">
          <!-- Body -->
          <ellipse cx="40" cy="35" rx="25" ry="18" fill="#CD853F" stroke="#8B4513" stroke-width="1.5"/>
          <ellipse cx="40" cy="35" rx="22" ry="15" fill="#DEB887"/>
          <ellipse class="body-fill" cx="40" cy="35" rx="20" ry="13" fill="#32CD32" opacity="0" style="transition: opacity 0.3s ease;"/>
          
          <!-- Head -->
          <ellipse cx="18" cy="25" rx="16" ry="14" fill="#CD853F" stroke="#8B4513" stroke-width="1.5"/>
          <ellipse cx="18" cy="25" rx="14" ry="12" fill="#DEB887"/>
          
          <!-- Snout -->
          <ellipse cx="5" cy="28" rx="6" ry="4" fill="#DEB887" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="5" cy="28" rx="4" ry="2.5" fill="#F5DEB3"/>
          
          <!-- Nostrils -->
          <ellipse cx="2" cy="27" rx="1" ry="0.8" fill="#8B4513"/>
          <ellipse cx="2" cy="29" rx="1" ry="0.8" fill="#8B4513"/>
          
          <!-- Ears -->
          <ellipse cx="11" cy="16" rx="3" ry="5" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="25" cy="16" rx="3" ry="5" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
          <ellipse cx="11" cy="17" rx="1.5" ry="3" fill="#F5DEB3"/>
          <ellipse cx="25" cy="17" rx="1.5" ry="3" fill="#F5DEB3"/>
          
          <!-- Eyes (larger and cuter) -->
          <circle cx="10" cy="22" r="4" fill="#000"/>
          <circle cx="22" cy="22" r="4" fill="#000"/>
          <circle cx="9" cy="20.5" r="1.5" fill="#FFF"/>
          <circle cx="21" cy="20.5" r="1.5" fill="#FFF"/>
          <circle cx="8.5" cy="21" r="0.5" fill="#FFF"/>
          <circle cx="20.5" cy="21" r="0.5" fill="#FFF"/>
          
          <!-- Mouth (subtle smile) -->
          <path d="M2 31 Q5 33 8 31" stroke="#8B4513" stroke-width="1" fill="none"/>
          
          <!-- Legs -->
          <g class="legs-left">
            <ellipse cx="14" cy="50" rx="4" ry="6" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
            <ellipse cx="26" cy="48" rx="4" ry="8" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
            <ellipse cx="38" cy="50" rx="4" ry="6" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
            <ellipse cx="50" cy="48" rx="4" ry="8" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
          </g>
          
          <!-- Tail -->
          <circle cx="62" cy="32" r="3" fill="#CD853F" stroke="#8B4513" stroke-width="1"/>
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
    `,t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t)}showInstructions(){const e=document.createElement("div");e.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 2rem;
      box-sizing: border-box;
      overflow: hidden;
    `,e.innerHTML=`
      <div style="background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 20px; width: 350px; max-width: 90vw; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
        <h1 style="font-size: 2rem; margin: 0 0 0.8rem 0; color: #FFD700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🦫 Capybara Catcher</h1>
        <p style="font-size: 1rem; margin-bottom: 1rem; color: #E0E0E0; line-height: 1.4;">Help the hungry capybara<br>catch falling vegetables!</p>
        <div style="margin: 0.8rem 0; font-size: 0.9rem;">
          <p><strong>Controls:</strong> Mouse/Keys/Touch</p>
          <p><strong>Goal:</strong> Fill capybara to 100%</p>
          <p><strong>Warning:</strong> Don't miss 3 vegetables!</p>
        </div>
        <div style="margin: 1rem 0;">
          <button id="helpButton" style="
            display: inline-block;
            padding: 8px 16px;
            font-size: 0.9rem;
            background: rgba(255,255,255,0.1);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(10px);
          " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">🥕 Vegetable Guide</button>
        </div>
      <button id="startGame" style="
        padding: 12px 24px;
        font-size: 1.2rem;
        background: linear-gradient(45deg, #32CD32, #228B22);
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 1rem;
        min-height: 45px;
        min-width: 160px;
        font-weight: bold;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
      " onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.95)'" ontouchend="this.style.transform='scale(1)'">🎮 Start Game</button>
      </div>
    `,this.container.appendChild(e);const t=e.querySelector("#startGame"),s=e.querySelector("#helpButton"),l=()=>{e.remove(),this.startGame()};t.addEventListener("click",l),t.addEventListener("touchend",a=>{a.preventDefault(),l()}),s.addEventListener("click",()=>{this.helpModal.show()}),e.addEventListener("touchmove",a=>{a.preventDefault()}),e.addEventListener("click",a=>{a.stopPropagation()})}startGame(){this.gameEngine&&this.gameEngine.destroy(),this.gameEngine=new M(this.container)}}document.addEventListener("DOMContentLoaded",()=>{new T});window.addEventListener("resize",()=>{const r=document.querySelector(".particle-canvas"),e=document.querySelector(".capybara-game");r&&e&&(r.width=e.clientWidth,r.height=e.clientHeight)});
