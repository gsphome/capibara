var B=Object.defineProperty,F=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var b=(r,e,t)=>e in r?B(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,E=(r,e)=>{for(var t in e||(e={}))k.call(e,t)&&b(r,t,e[t]);if(w)for(var t of w(e))P.call(e,t)&&b(r,t,e[t]);return r},C=(r,e)=>F(r,M(e));var a=(r,e,t)=>b(r,typeof e!="symbol"?e+"":e,t);var y=(r,e,t)=>new Promise((i,s)=>{var n=d=>{try{o(t.next(d))}catch(u){s(u)}},l=d=>{try{o(t.throw(d))}catch(u){s(u)}},o=d=>d.done?i(d.value):Promise.resolve(d.value).then(n,l);o((t=t.apply(r,e)).next())});(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const D="modulepreload",N=function(r){return"/capibara/"+r},S={},O=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let u=function(h){return Promise.all(h.map(m=>Promise.resolve(m).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};var l=u;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),d=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=u(t.map(h=>{if(h=N(h),h in S)return;S[h]=!0;const m=h.endsWith(".css"),p=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const g=document.createElement("link");if(g.rel=m?"stylesheet":D,m||(g.as="script"),g.crossOrigin="",g.href=h,d&&g.setAttribute("nonce",d),document.head.appendChild(g),m)return new Promise((A,_)=>{g.addEventListener("load",A),g.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function n(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return s.then(o=>{for(const d of o||[])d.status==="rejected"&&n(d.reason);return e().catch(n)})},H=r=>{let e;const t=new Set,i=(u,h)=>{const m=typeof u=="function"?u(e):u;if(!Object.is(m,e)){const p=e;e=(h!=null?h:typeof m!="object"||m===null)?m:Object.assign({},e,m),t.forEach(g=>g(e,p))}},s=()=>e,o={setState:i,getState:s,getInitialState:()=>d,subscribe:u=>(t.add(u),()=>t.delete(u))},d=e=r(i,s,o);return o},V=(r=>H);class c{static isMobile(){return window.innerWidth<=this.MOBILE_BREAKPOINT}static getCapybaraWidth(){return this.isMobile()?this.CAPYBARA_WIDTH_MOBILE:this.CAPYBARA_WIDTH_DESKTOP}static getCapybaraHeight(){return this.isMobile()?this.CAPYBARA_HEIGHT_MOBILE:this.CAPYBARA_HEIGHT_DESKTOP}static getCapybaraBottom(){return this.isMobile()?this.CAPYBARA_BOTTOM_MOBILE:this.CAPYBARA_BOTTOM_DESKTOP}static getVegetableSize(){return this.isMobile()?this.VEGETABLE_SIZE_MOBILE:this.VEGETABLE_SIZE_DESKTOP}static getCapybaraBounds(e,t){const i=this.getCapybaraWidth(),s=this.getCapybaraHeight(),n=this.getCapybaraBottom();return{x:e,y:t-n-s,width:i,height:s}}static calculateFillPercentage(e){return Math.min(100,e/this.LEVEL_UP_THRESHOLD*100)}static getPointsForLevelUp(){return this.LEVEL_UP_THRESHOLD}}a(c,"MOBILE_BREAKPOINT",768),a(c,"CAPYBARA_WIDTH_DESKTOP",100),a(c,"CAPYBARA_HEIGHT_DESKTOP",75),a(c,"CAPYBARA_WIDTH_MOBILE",100),a(c,"CAPYBARA_HEIGHT_MOBILE",75),a(c,"CAPYBARA_BOTTOM_DESKTOP",20),a(c,"CAPYBARA_BOTTOM_MOBILE",10),a(c,"VEGETABLE_SIZE_DESKTOP",50),a(c,"VEGETABLE_SIZE_MOBILE",40),a(c,"PLAYER_SPEED",8),a(c,"SPAWN_RATE_BASE",2e3),a(c,"SPAWN_RATE_DECREASE",100),a(c,"MIN_SPAWN_RATE",800),a(c,"LEVEL_UP_THRESHOLD",50),a(c,"AUDIO_ENABLED_DEFAULT",!0),a(c,"MASTER_VOLUME",.6),a(c,"ANIMATION_DURATION_FAST",300),a(c,"ANIMATION_DURATION_NORMAL",600),a(c,"ANIMATION_DURATION_SLOW",1e3),a(c,"REDUCE_ANIMATIONS",!1);const L=V()(r=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",ceilingHeight:100,incrementLevel:()=>r(e=>({level:e.level+1,ceilingHeight:Math.max(50,e.ceilingHeight*.9)})),incrementMissed:()=>r(e=>{const t=e.missedVegetables+1;return{missedVegetables:t,gameStatus:t>=3?"lost":e.gameStatus}}),updateScore:e=>r(t=>{const i=t.score+e,s=t.capybaraFillPercentage+e,n=s>=c.LEVEL_UP_THRESHOLD;return{score:i,capybaraFillPercentage:n?c.LEVEL_UP_THRESHOLD:s,gameStatus:n?"won":t.gameStatus}}),resetForNextLevel:()=>r(()=>({capybaraFillPercentage:0,missedVegetables:0,gameStatus:"playing"})),resetGame:()=>r(()=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",ceilingHeight:100})),pauseGame:()=>r(()=>({gameStatus:"paused"})),resumeGame:()=>r(()=>({gameStatus:"playing"}))}));class I{constructor(){a(this,"level",1);a(this,"score",0);a(this,"missedVegetables",0);a(this,"capybaraFillPercentage",0);a(this,"gameStatus","playing");a(this,"fallSpeed",2);a(this,"ceilingHeight",100);a(this,"vegetables",[]);a(this,"listeners",[])}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notify(){this.listeners.forEach(e=>e())}addVegetable(e){this.vegetables.push(e),this.notify()}removeVegetable(e){this.vegetables=this.vegetables.filter(t=>t.id!==e),this.notify()}incrementLevel(){this.level+=1,this.fallSpeed*=1.15,this.ceilingHeight=Math.max(50,this.ceilingHeight*.9),this.notify()}incrementMissed(){this.missedVegetables+=1,this.missedVegetables>=3&&(this.gameStatus="lost"),this.notify()}updateScore(e){this.score+=e,this.capybaraFillPercentage=Math.min(100,this.capybaraFillPercentage+e),this.capybaraFillPercentage>=100&&(this.gameStatus="won",this.incrementLevel()),this.notify()}resetForNextLevel(){this.capybaraFillPercentage=0,this.missedVegetables=0,this.vegetables=[],this.notify()}resetGame(){this.level=1,this.score=0,this.missedVegetables=0,this.capybaraFillPercentage=0,this.gameStatus="playing",this.fallSpeed=2,this.ceilingHeight=100,this.vegetables=[],setTimeout(()=>this.notify(),100)}pauseGame(){this.gameStatus="paused",this.notify()}resumeGame(){this.gameStatus="playing",this.notify()}}const x=new I;class R{constructor(e){a(this,"element");a(this,"fillElement");a(this,"svgElement");a(this,"x",0);a(this,"lastX",0);a(this,"gameContainer");a(this,"speed",8);a(this,"direction","right");this.gameContainer=e,this.x=this.gameContainer.clientWidth/2-c.getCapybaraWidth()/2,this.lastX=this.x,this.createElement(),e.appendChild(this.element),this.setupControls()}createElement(){this.element=document.createElement("div"),this.element.className="capybara-player";const e=document.createElement("div");e.className="capybara-player__body",this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svgElement.setAttribute("class","capybara-player__svg"),this.svgElement.setAttribute("viewBox","0 0 80 60");const t=document.createElementNS("http://www.w3.org/2000/svg","use");t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#capybara-right"),this.svgElement.appendChild(t),this.fillElement=document.createElement("div"),this.fillElement.className="capybara-player__fill",this.fillElement.style.cssText=`
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(45deg, #FF4500, #DC143C);
      border-radius: 50% 50% 40% 40%;
      transition: height 0.3s ease, background 0.3s ease;
    `,e.appendChild(this.fillElement),e.appendChild(this.svgElement),this.element.appendChild(e),this.updatePosition()}setupControls(){document.addEventListener("keydown",t=>{if(x.gameStatus==="playing")switch(t.key){case"ArrowLeft":case"a":case"A":this.moveLeft();break;case"ArrowRight":case"d":case"D":this.moveRight();break}}),document.addEventListener("mousemove",t=>{if(x.gameStatus!=="playing")return;const i=this.gameContainer.getBoundingClientRect(),s=t.clientX-i.left,n=c.getCapybaraWidth(),l=n/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-n,s-l)),this.updatePosition()});let e=!1;this.gameContainer.addEventListener("touchstart",t=>{const i=t.target;i.closest(".pause-overlay")||i.closest(".game-over")||i.closest(".level-transition")||i.closest(".audio-toggle")||(e=!0,t.preventDefault())},{passive:!1}),this.gameContainer.addEventListener("touchmove",t=>{if(!e||x.gameStatus!=="playing")return;const i=t.target;if(i.closest(".pause-overlay")||i.closest(".game-over")||i.closest(".level-transition")||i.closest(".audio-toggle"))return;const s=t.touches[0],n=this.gameContainer.getBoundingClientRect(),l=s.clientX-n.left,o=c.getCapybaraWidth(),d=o/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-o,l-d)),this.updatePosition(),t.preventDefault()},{passive:!1}),this.gameContainer.addEventListener("touchend",()=>{e=!1})}moveLeft(){this.x=Math.max(0,this.x-this.speed),this.updatePosition()}moveRight(){const e=c.getCapybaraWidth();this.x=Math.min(this.gameContainer.clientWidth-e,this.x+this.speed),this.updatePosition()}updatePosition(){this.element.style.left=`${this.x}px`;const e=this.x>this.lastX?"right":this.x<this.lastX?"left":this.direction;if(e!==this.direction){this.direction=e;const t=this.svgElement.querySelector("use");t&&t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#capybara-${this.direction}`),this.element.classList.add("capybara-player--running"),setTimeout(()=>{this.element.classList.remove("capybara-player--running")},300)}this.lastX=this.x}updateFill(e){this.fillElement.style.height=`${e}%`,e>=80?this.fillElement.style.background="linear-gradient(45deg, #32CD32, #228B22)":e>=50?this.fillElement.style.background="linear-gradient(45deg, #FFD700, #FFA500)":e>=20?this.fillElement.style.background="linear-gradient(45deg, #FF8C00, #FF6347)":this.fillElement.style.background="linear-gradient(45deg, #FF4500, #DC143C)"}getBounds(){return c.getCapybaraBounds(this.x,this.gameContainer.clientHeight)}getX(){return this.x}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class Q{constructor(e){a(this,"container");a(this,"spawnTimer",0);a(this,"vegetableTypes",["carrot","broccoli","lettuce","tomato","pepper"]);a(this,"activeVegetables",new Map);this.container=e}update(e,t){this.spawnTimer+=e;const i=Math.max(800,2e3-t*100),s=[];if(this.spawnTimer>=i){const n=this.spawnVegetable(t);s.push(n),this.spawnTimer=0}return s}spawnVegetable(e){const t=this.vegetableTypes[Math.floor(Math.random()*this.vegetableTypes.length)],i=Math.random()*(this.container.clientWidth-c.getVegetableSize()),s={id:Date.now().toString()+Math.random(),type:t,x:i,y:-c.getVegetableSize(),speed:this.calculateVegetableSpeed(t,e),points:this.getVegetablePoints(t)};return this.createVegetableElement(s),s}createVegetableElement(e){const t=document.createElement("div");t.className=`vegetable vegetable--${e.type} vegetable--spawning`,t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.id=e.id;const i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("viewBox","0 0 30 30"),i.setAttribute("width",c.getVegetableSize().toString()),i.setAttribute("height",c.getVegetableSize().toString());const s=document.createElementNS("http://www.w3.org/2000/svg","use");s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#${e.type}`),i.appendChild(s),t.appendChild(i),this.container.appendChild(t),this.activeVegetables.set(e.id,t),setTimeout(()=>{t.classList.remove("vegetable--spawning")},300)}updateVegetablePosition(e){const t=this.activeVegetables.get(e.id);t&&(t.style.top=`${e.y}px`)}reset(){this.activeVegetables.forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)}),this.activeVegetables.clear(),this.spawnTimer=0}removeVegetable(e){const t=this.activeVegetables.get(e);t&&t.parentNode&&(t.parentNode.removeChild(t),this.activeVegetables.delete(e))}getVegetablePoints(e){return{carrot:5,broccoli:8,lettuce:3,tomato:6,pepper:10}[e]||5}calculateVegetableSpeed(e,t){const i=1.8+t*.25,n={lettuce:.8,carrot:1,tomato:1.1,broccoli:1.25,pepper:1.4}[e]||1;return i*n}}class ${constructor(e){a(this,"particles",[]);a(this,"canvas");a(this,"ctx");this.canvas=document.createElement("canvas"),this.canvas.className="particle-canvas",this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.style.position="absolute",this.canvas.style.top="0",this.canvas.style.left="0",this.canvas.style.pointerEvents="none",this.canvas.style.zIndex="15",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight})}createCatchEffect(e,t){for(let i=0;i<8;i++)this.particles.push({x:e+15,y:t+15,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,life:30,maxLife:30,color:`hsl(${Math.random()*60+60}, 70%, 60%)`})}update(){this.particles=this.particles.filter(e=>(e.x+=e.vx,e.y+=e.vy,e.vy+=.1,e.life--,e.life>0))}render(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{const t=e.life/e.maxLife;this.ctx.globalAlpha=t,this.ctx.fillStyle=e.color,this.ctx.fillRect(e.x,e.y,4,4)}),this.ctx.globalAlpha=1}destroy(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}class U{constructor(e){a(this,"element");a(this,"scoreElement");a(this,"levelElement");a(this,"missedElement");a(this,"progressBar");a(this,"progressFill");const t=document.querySelector(".game-hud");t&&t.remove(),this.createElement();let i=document.querySelector(".game-wrapper"),s=document.querySelector(".game-sidebar");i?s&&s.appendChild(this.element):(i=document.createElement("div"),i.className="game-wrapper",s=document.createElement("div"),s.className="game-sidebar",s.appendChild(this.element),i.appendChild(s),i.appendChild(e),document.body.appendChild(i))}createElement(){this.element=document.createElement("div"),this.element.className="game-hud",this.scoreElement=document.createElement("div"),this.scoreElement.className="game-hud__score",this.scoreElement.innerHTML="Score<br>0",this.levelElement=document.createElement("div"),this.levelElement.className="game-hud__level",this.levelElement.innerHTML="Level<br>1",this.missedElement=document.createElement("div"),this.missedElement.className="game-hud__lives",this.updateLives(3);const e=document.createElement("div");e.className="game-hud__row",e.appendChild(this.scoreElement),e.appendChild(this.levelElement),e.appendChild(this.missedElement),this.element.appendChild(e);const t=document.createElement("div");t.className="progress-bar",this.progressFill=document.createElement("div"),this.progressFill.className="progress-bar__fill",this.progressFill.style.width="0%",t.appendChild(this.progressFill),this.element.appendChild(t),this.progressBar=t}updateScore(e){this.scoreElement.innerHTML=`Score<br>${e}`}updateLevel(e){this.levelElement.innerHTML=`Level<br>${e}`}updateLives(e){const t=[];for(let i=0;i<3;i++)i<e?t.push("❤️"):t.push("🤍");this.missedElement.innerHTML=t.join(" ")}updateProgress(e){this.progressFill.style.width=`${e}%`,this.progressFill.classList.remove("progress-bar__fill--low","progress-bar__fill--medium-low","progress-bar__fill--medium","progress-bar__fill--high"),e>=80?this.progressFill.classList.add("progress-bar__fill--high"):e>=50?this.progressFill.classList.add("progress-bar__fill--medium"):e>=20?this.progressFill.classList.add("progress-bar__fill--medium-low"):this.progressFill.classList.add("progress-bar__fill--low")}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.progressBar.parentNode&&this.progressBar.parentNode.removeChild(this.progressBar)}}class z{constructor(e,t){a(this,"element");a(this,"onRestart");this.onRestart=t,this.createElement(),e.appendChild(this.element),this.hide()}createElement(){this.element=document.createElement("div"),this.element.className="game-over";const e=document.createElement("h1");e.className="game-over__title";const t=document.createElement("div");t.className="game-over__score";const i=document.createElement("button");i.className="game-over__button",i.textContent="Play Again",i.addEventListener("click",this.onRestart),this.element.appendChild(e),this.element.appendChild(t),this.element.appendChild(i)}show(e,t,i){const s=this.element.querySelector(".game-over__title"),n=this.element.querySelector(".game-over__score");e?(s.textContent="🎉 You Win! 🎉",s.style.color="#FFD700",n.textContent=`Capybara has full energy! Final Score: ${t} (Level ${i})`):(s.textContent="💔 Game Over 💔",s.style.color="#FF4444",n.textContent=`Too many vegetables missed! Final Score: ${t} (Level ${i})`),this.element.style.display="flex"}hide(){this.element.style.display="none"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class q{constructor(e){a(this,"element");a(this,"container");this.container=e}show(e){console.log(`🎉 ¡Pasaste al nivel ${e}! ¡Felicidades!`),this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("level-transition--show")},50),setTimeout(()=>{this.hide()},2e3)}createElement(e){this.element=document.createElement("div"),this.element.className="level-transition",this.element.innerHTML=`
      <div class="level-transition__content">
        <h1>Level ${e}</h1>
        <p>Let's go!</p>
      </div>
    `}hide(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class W{constructor(e,t){a(this,"element");a(this,"container");a(this,"onShowHelp");this.container=e,this.onShowHelp=t}show(e){this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("pause-overlay--show")},50)}hide(){this.element&&(this.element.classList.remove("pause-overlay--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(e){this.element=document.createElement("div"),this.element.className="pause-overlay",this.element.innerHTML=`
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
    `;const t=this.element.querySelector(".pause-overlay__resume-btn"),i=this.element.querySelector("#pauseHelpBtn"),s=()=>{this.hide(),e()};t.addEventListener("click",s),t.addEventListener("touchend",l=>{l.preventDefault(),s()}),i&&this.onShowHelp&&i.addEventListener("click",this.onShowHelp);const n=l=>{l.code==="Space"&&(l.preventDefault(),s(),document.removeEventListener("keydown",n))};document.addEventListener("keydown",n)}}class T{constructor(){a(this,"element")}show(){this.createElement(),document.body.appendChild(this.element),setTimeout(()=>{this.element.classList.add("help-modal--show")},50)}hide(){this.element&&(this.element.classList.remove("help-modal--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(){this.element=document.createElement("div"),this.element.className="help-modal",this.element.innerHTML=`
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
    `;const e=this.element.querySelector(".help-modal__close"),t=this.element.querySelector(".help-modal__backdrop"),i=()=>this.hide();e.addEventListener("click",i),t.addEventListener("click",i);const s=n=>{n.key==="Escape"&&(i(),document.removeEventListener("keydown",s))};document.addEventListener("keydown",s)}}class G{constructor(e,t){a(this,"element");a(this,"isPaused",!1);a(this,"onToggle");this.onToggle=t,this.createElement(),e.appendChild(this.element)}createElement(){this.element=document.createElement("button"),this.element.className="pause-button",this.element.innerHTML="⏸️",this.element.style.cssText=`
      position: fixed;
      top: max(10px, env(safe-area-inset-top) + 5px);
      left: max(10px, env(safe-area-inset-left) + 5px);
      background: rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 1.2rem;
      cursor: pointer;
      z-index: 1000;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      touch-action: manipulation;
    `,this.element.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault(),this.toggle()}),this.element.addEventListener("touchend",e=>{e.stopPropagation(),e.preventDefault(),this.toggle()}),this.element.addEventListener("mouseenter",()=>{this.element.style.transform="scale(1.1)"}),this.element.addEventListener("mouseleave",()=>{this.element.style.transform="scale(1)"})}toggle(){this.isPaused=!this.isPaused,this.element.innerHTML=this.isPaused?"▶️":"⏸️",this.element.style.opacity=this.isPaused?"0.8":"1",this.onToggle(this.isPaused)}updateState(e){this.isPaused=e,this.element.innerHTML=this.isPaused?"▶️":"⏸️",this.element.style.opacity=this.isPaused?"0.8":"1"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}const v=class v{constructor(){a(this,"enabled",!0);a(this,"audioContext",null);a(this,"initialized",!1);a(this,"useHTML5Audio",!1);a(this,"audioElements",new Map);this.detectAudioSupport(),this.setupMobileAudioInit()}detectAudioSupport(){const e=/iPad|iPhone|iPod/.test(navigator.userAgent),t=/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);this.useHTML5Audio=e&&t,console.log("Audio method:",this.useHTML5Audio?"HTML5 Audio":"Web Audio API"),this.useHTML5Audio&&this.createHTML5Sounds()}createHTML5Sounds(){["catch","miss","levelup","gameover","click"].forEach(t=>{const i=new Audio;i.preload="auto";const s=this.getSoundFrequency(t),n=this.getSoundDuration(t);i.src=this.createBeepDataURL(s,n),i.volume=.3,this.audioElements.set(t,i)})}getSoundFrequency(e){return{catch:800,miss:200,levelup:1e3,gameover:150,click:600}[e]||440}getSoundDuration(e){return{catch:.1,miss:.2,levelup:.3,gameover:.5,click:.05}[e]||.1}createBeepDataURL(e,t){const s=Math.floor(8e3*t),n=new ArrayBuffer(44+s*2),l=new DataView(n),o=(u,h)=>{for(let m=0;m<h.length;m++)l.setUint8(u+m,h.charCodeAt(m))};o(0,"RIFF"),l.setUint32(4,36+s*2,!0),o(8,"WAVE"),o(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,1,!0),l.setUint32(24,8e3,!0),l.setUint32(28,8e3*2,!0),l.setUint16(32,2,!0),l.setUint16(34,16,!0),o(36,"data"),l.setUint32(40,s*2,!0);for(let u=0;u<s;u++){const h=Math.sin(2*Math.PI*e*u/8e3)*.3*32767;l.setInt16(44+u*2,h,!0)}const d=new Blob([n],{type:"audio/wav"});return URL.createObjectURL(d)}static getInstance(){return v.instance||(v.instance=new v),v.instance}setupMobileAudioInit(){const e=/iPad|iPhone|iPod/.test(navigator.userAgent),t=()=>y(this,null,function*(){this.initialized||(console.log("Initializing audio for mobile, iOS detected:",e),yield this.init(),this.initialized=!0,e&&setTimeout(()=>y(this,null,function*(){try{yield this.playUnlockSound()}catch(i){console.warn("Additional iOS unlock failed:",i)}}),200),document.removeEventListener("touchstart",t),document.removeEventListener("click",t))});document.addEventListener("touchstart",t,{once:!0}),document.addEventListener("click",t,{once:!0})}play(e){return y(this,null,function*(){if(this.enabled)try{if(this.useHTML5Audio){const l=this.audioElements.get(e);if(l){l.currentTime=0;const o=l.play();o&&(yield o),console.log("HTML5 Audio played:",e)}return}if(this.initialized||(yield this.init(),this.initialized=!0),(!this.audioContext||this.audioContext.state==="closed")&&(this.audioContext=new(window.AudioContext||window.webkitAudioContext)),this.audioContext.state==="suspended"&&(yield this.audioContext.resume()),this.audioContext.state!=="running"){console.warn("AudioContext not running, skipping sound");return}const t=this.audioContext.createOscillator(),i=this.audioContext.createGain();t.connect(i),i.connect(this.audioContext.destination);const n={catch:{freq:800,duration:.1},miss:{freq:200,duration:.2},levelup:{freq:1e3,duration:.3},gameover:{freq:150,duration:.5},click:{freq:600,duration:.05}}[e];if(!n)return;t.frequency.value=n.freq,t.type="sine",i.gain.setValueAtTime(0,this.audioContext.currentTime),i.gain.linearRampToValueAtTime(.3,this.audioContext.currentTime+.01),i.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+n.duration),t.start(),t.stop(this.audioContext.currentTime+n.duration)}catch(t){console.warn("Audio playback failed:",t)}})}toggle(){return this.enabled=!this.enabled,this.enabled}isEnabled(){return this.enabled}init(){return y(this,null,function*(){try{this.audioContext||(this.audioContext=new(window.AudioContext||window.webkitAudioContext)),this.audioContext.state==="suspended"&&(yield this.audioContext.resume()),this.initialized||(yield this.playUnlockSound())}catch(e){console.warn("Audio initialization failed:",e)}})}playUnlockSound(){return y(this,null,function*(){try{if(!this.audioContext||this.audioContext.state!=="running")return;const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.connect(t),t.connect(this.audioContext.destination),e.frequency.value=440,e.type="sine",t.gain.setValueAtTime(.001,this.audioContext.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+.01),e.start(),e.stop(this.audioContext.currentTime+.01),console.log("iOS audio unlock sound played")}catch(e){console.warn("iOS audio unlock failed:",e)}})}};a(v,"instance");let f=v;const K=Object.freeze(Object.defineProperty({__proto__:null,AudioManager:f},Symbol.toStringTag,{value:"Module"}));class Y{constructor(e){a(this,"container");a(this,"player");a(this,"spawner");a(this,"particles");a(this,"hud");a(this,"gameOverScreen");a(this,"levelTransition");a(this,"pauseOverlay");a(this,"helpModal");a(this,"pauseButton");a(this,"audioManager",f.getInstance());a(this,"animationId",0);a(this,"lastTime",0);a(this,"vegetables",[]);a(this,"gameStore",L);a(this,"levelTransitionActive",!1);this.container=e,this.init()}init(){this.player=new R(this.container),this.spawner=new Q(this.container),this.particles=new $(this.container),this.hud=new U(this.container),this.gameOverScreen=new z(this.container,()=>this.restart()),this.levelTransition=new q(this.container),this.pauseOverlay=new W(this.container,()=>this.helpModal.show()),this.helpModal=new T,this.pauseButton=new G(document.body,e=>this.handlePauseToggle(e)),L.subscribe(e=>this.handleGameStateChange(e)),this.gameLoop(0),this.setupKeyboardControls()}handlePauseToggle(e){const t=this.gameStore.getState();e&&t.gameStatus==="playing"?t.pauseGame():!e&&t.gameStatus==="paused"&&t.resumeGame()}handleGameStateChange(e){this.pauseButton.updateState(e.gameStatus==="paused"),e.gameStatus==="paused"?this.pauseOverlay.show(()=>this.gameStore.getState().resumeGame()):e.gameStatus==="playing"?this.pauseOverlay.hide():e.gameStatus==="won"&&!this.levelTransitionActive?(this.levelTransitionActive=!0,this.audioManager.play("levelup"),this.clearAllVegetables(),this.levelTransition.show(e.level+1),setTimeout(()=>{this.gameStore.getState().incrementLevel(),this.gameStore.getState().resetForNextLevel(),this.levelTransitionActive=!1},2e3)):e.gameStatus==="lost"&&(this.audioManager.play("gameover"),this.gameOverScreen.show(!1,e.score,e.level))}setupKeyboardControls(){document.addEventListener("keydown",e=>{switch(e.key){case" ":case"Escape":e.preventDefault();const t=this.gameStore.getState();t.gameStatus==="playing"?t.pauseGame():t.gameStatus==="paused"&&t.resumeGame();break;case"r":case"R":const i=this.gameStore.getState();(i.gameStatus==="lost"||i.gameStatus==="won")&&this.restart();break}})}gameLoop(e){const t=e-this.lastTime;this.lastTime=e;const i=this.gameStore.getState();i.gameStatus==="playing"&&!this.levelTransitionActive?(this.update(t),this.render()):i.gameStatus,this.animationId=requestAnimationFrame(s=>this.gameLoop(s))}update(e){const t=this.gameStore.getState();if(t.gameStatus!=="playing"||this.levelTransitionActive)return;const i=this.spawner.update(e,t.level);this.vegetables.push(...i),this.vegetables=this.vegetables.filter(l=>{const o=l.y+l.speed;if(this.gameStore.getState().gameStatus!=="playing"||this.levelTransitionActive)return this.spawner.removeVegetable(l.id),!1;const u=this.player.getBounds();if(this.checkCollision(u,C(E({},l),{y:o}))){this.audioManager.play("catch"),t.updateScore(l.points),this.particles.createCatchEffect(l.x,o),this.spawner.removeVegetable(l.id);const h=this.container.querySelector(".capybara-player");return h&&(h.classList.add("capybara-player--catch"),setTimeout(()=>{h.classList.remove("capybara-player--catch")},600)),this.createScorePopup(l.x,o,l.points),!1}return o>this.container.clientHeight?(this.audioManager.play("miss"),t.incrementMissed(),this.spawner.removeVegetable(l.id),!1):(l.y=o,this.spawner.updateVegetablePosition(l),!0)}),this.particles.update();const s=this.gameStore.getState();this.hud.updateScore(s.score),this.hud.updateLevel(s.level),this.hud.updateLives(3-s.missedVegetables);const n=c.calculateFillPercentage(s.capybaraFillPercentage);this.hud.updateProgress(n),this.player.updateFill(n)}render(){this.particles.render()}checkCollision(e,t){const i=c.getVegetableSize(),s=.3,n=Math.max(0,Math.min(e.x+e.width,t.x+i)-Math.max(e.x,t.x)),l=Math.max(0,Math.min(e.y+e.height,t.y+i)-Math.max(e.y,t.y)),d=Math.min(e.width*e.height,i*i)*s;return n*l>=d}clearAllVegetables(){this.vegetables=[],this.spawner.reset()}restart(){this.clearAllVegetables(),this.gameStore.getState().resetGame(),this.gameOverScreen.hide(),this.hud.updateScore(0),this.hud.updateLevel(1),this.hud.updateLives(3),this.hud.updateProgress(0),this.player.updateFill(0)}createScorePopup(e,t,i){const s=document.createElement("div");s.className="score-popup",s.textContent=`+${i}`,s.style.cssText=`
      position: absolute;
      left: ${e}px;
      top: ${t}px;
      color: #FFD700;
      font-weight: bold;
      font-size: 1.2rem;
      pointer-events: none;
      z-index: 1000;
    `,this.container.appendChild(s),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},1e3)}destroy(){this.animationId&&cancelAnimationFrame(this.animationId),this.player.destroy(),this.particles.destroy(),this.hud.destroy(),this.gameOverScreen.destroy(),this.pauseButton.destroy()}}class j{constructor(e){a(this,"element");a(this,"audioManager",f.getInstance());const t=e.querySelector(".audio-toggle");t&&t.remove(),this.createElement(),e.appendChild(this.element)}createElement(){this.element=document.createElement("button"),this.element.className="audio-toggle",this.element.innerHTML="🔊",this.element.style.cssText=`
      position: fixed;
      top: max(10px, env(safe-area-inset-top) + 5px);
      right: max(10px, env(safe-area-inset-right) + 5px);
      background: rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 1.2rem;
      cursor: pointer;
      z-index: 1000;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      touch-action: manipulation;
    `,this.element.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault(),this.toggleAudio()}),this.element.addEventListener("touchend",e=>{e.stopPropagation(),e.preventDefault(),this.toggleAudio()}),this.element.addEventListener("mouseenter",()=>{this.element.style.transform="scale(1.1)"}),this.element.addEventListener("mouseleave",()=>{this.element.style.transform="scale(1)"})}toggleAudio(){return y(this,null,function*(){try{const e=this.audioManager.toggle();this.element.innerHTML=e?"🔊":"🔇",this.element.style.opacity=e?"1":"0.6",e&&(yield this.audioManager.init(),yield this.audioManager.play("click"))}catch(e){console.warn("Audio toggle failed:",e)}})}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class X{constructor(){a(this,"gameEngine",null);a(this,"container");a(this,"helpModal");a(this,"_audioToggle");this.init()}init(){this.loadSVGSprites(),this.container=document.createElement("div"),this.container.className="capybara-game",this.helpModal=new T,this._audioToggle=new j(document.body),this.showInstructions(),document.body.appendChild(this.container)}loadSVGSprites(){const e=`
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
    `,t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t)}showInstructions(){const e=document.createElement("div"),t=window.innerWidth<=768;e.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: ${t?"flex-start":"center"};
      align-items: center;
      z-index: 1000;
      padding: ${t?"60px 1rem 2rem":"2rem"};
      padding-top: ${t?"60px":"2rem"};
      box-sizing: border-box;
      overflow-y: auto;
    `;const i=t?"90vw":"350px",s=t?"1.5rem":"2rem",n=t?"1rem":"1.5rem";e.innerHTML=`
      <div class="start-modal" style="
        background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255,255,255,0.2);
        padding: ${n};
        border-radius: 15px;
        width: ${i};
        max-width: 95vw;
        max-height: 80vh;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        overflow-y: auto;
      ">
        <h1 style="font-size: ${s}; margin: 0 0 0.5rem 0; color: #FFD700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🦫 Capybara Catcher</h1>
        <p style="font-size: ${t?"0.9rem":"1rem"}; margin-bottom: 0.8rem; color: #E0E0E0; line-height: 1.3;">Help the hungry capybara catch falling vegetables!</p>
        <div style="margin: 0.6rem 0; font-size: ${t?"0.8rem":"0.9rem"};">
          <p style="margin: 0.3rem 0;"><strong>Controls:</strong> ${t?"Touch":"Mouse/Keys/Touch"}</p>
          <p style="margin: 0.3rem 0;"><strong>Goal:</strong> Fill capybara to 100%</p>
          <p style="margin: 0.3rem 0;"><strong>Warning:</strong> Don't miss 3 vegetables!</p>
        </div>
        ${t?"":`<div style="margin: 0.8rem 0;">
          <button id="helpButton" style="
            display: inline-block;
            padding: 6px 12px;
            font-size: 0.8rem;
            background: rgba(255,255,255,0.1);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(10px);
          ">🥕 Vegetable Guide</button>
        </div>`}
      <button id="startGame" style="
        padding: ${t?"14px 28px":"12px 24px"};
        font-size: ${t?"1.1rem":"1.2rem"};
        background: linear-gradient(45deg, #32CD32, #228B22);
        color: white;
        border: none;
        border-radius: 18px;
        cursor: pointer;
        margin-top: 0.8rem;
        min-height: ${t?"50px":"45px"};
        min-width: ${t?"200px":"160px"};
        font-weight: bold;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        box-shadow: 0 4px 12px rgba(50, 205, 50, 0.3);
        transition: all 0.2s ease;
      ">🎮 Start Game</button>
      </div>
    `,this.container.appendChild(e);const l=e.querySelector("#startGame"),o=()=>{e.remove(),this.startGame()},d=h=>y(this,null,function*(){h&&h.preventDefault();try{const m=(yield O(()=>y(this,null,function*(){const{AudioManager:p}=yield Promise.resolve().then(()=>K);return{AudioManager:p}}),void 0)).AudioManager.getInstance();yield m.init(),yield new Promise(p=>setTimeout(p,100)),yield m.play("click"),console.log("Audio initialized successfully for iOS")}catch(m){console.warn("Audio initialization failed:",m)}o()});l.addEventListener("click",d),l.addEventListener("touchend",d);const u=e.querySelector("#helpButton");u&&u.addEventListener("click",()=>{this.helpModal.show()}),l.addEventListener("click",()=>{}),u.addEventListener("click",()=>{}),e.addEventListener("touchmove",h=>{h.preventDefault()}),e.addEventListener("click",h=>{h.stopPropagation()})}startGame(){this.gameEngine&&this.gameEngine.destroy(),this.gameEngine=new Y(this.container)}}document.addEventListener("DOMContentLoaded",()=>{new X});window.addEventListener("resize",()=>{const r=document.querySelector(".particle-canvas"),e=document.querySelector(".capybara-game");r&&e&&(r.width=e.clientWidth,r.height=e.clientHeight)});
//# sourceMappingURL=index-CWD-GHuY.js.map
