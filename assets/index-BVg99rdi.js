var _=Object.defineProperty;var F=(n,e,t)=>e in n?_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>F(n,typeof e!="symbol"?e+"":e,t);var g=(n,e,t)=>new Promise((i,s)=>{var l=c=>{try{d(t.next(c))}catch(h){s(h)}},r=c=>{try{d(t.throw(c))}catch(h){s(h)}},d=c=>c.done?i(c.value):Promise.resolve(c.value).then(l,r);d((t=t.apply(n,e)).next())});(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const T="modulepreload",M=function(n){return"/capibara/"+n},x={},E=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let h=function(m){return Promise.all(m.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var r=h;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),c=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=h(t.map(m=>{if(m=M(m),m in x)return;x[m]=!0;const p=m.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${y}`))return;const u=document.createElement("link");if(u.rel=p?"stylesheet":T,p||(u.as="script"),u.crossOrigin="",u.href=m,c&&u.setAttribute("nonce",c),document.head.appendChild(u),p)return new Promise((L,B)=>{u.addEventListener("load",L),u.addEventListener("error",()=>B(new Error(`Unable to preload CSS for ${m}`)))})}))}function l(d){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=d,window.dispatchEvent(c),!c.defaultPrevented)throw d}return s.then(d=>{for(const c of d||[])c.status==="rejected"&&l(c.reason);return e().catch(l)})},k=n=>{let e;const t=new Set,i=(h,m)=>{const p=typeof h=="function"?h(e):h;if(!Object.is(p,e)){const y=e;e=(m!=null?m:typeof p!="object"||p===null)?p:Object.assign({},e,p),t.forEach(u=>u(e,y))}},s=()=>e,d={setState:i,getState:s,getInitialState:()=>c,subscribe:h=>(t.add(h),()=>t.delete(h))},c=e=n(i,s,d);return d},A=(n=>k);class o{static isMobile(){return window.innerWidth<=this.MOBILE_BREAKPOINT}static getCapybaraWidth(){return this.isMobile()?this.CAPYBARA_WIDTH_MOBILE:this.CAPYBARA_WIDTH_DESKTOP}static getCapybaraHeight(){return this.isMobile()?this.CAPYBARA_HEIGHT_MOBILE:this.CAPYBARA_HEIGHT_DESKTOP}static getCapybaraBottom(){return this.isMobile()?this.CAPYBARA_BOTTOM_MOBILE:this.CAPYBARA_BOTTOM_DESKTOP}static getVegetableSize(){return this.isMobile()?this.VEGETABLE_SIZE_MOBILE:this.VEGETABLE_SIZE_DESKTOP}static getCapybaraBounds(e,t){const i=this.getCapybaraWidth(),s=this.getCapybaraHeight(),l=this.getCapybaraBottom();return{x:e,y:t-l-s,width:i,height:s}}static calculateFillPercentage(e){return Math.min(100,e/this.LEVEL_UP_THRESHOLD*100)}static getPointsForLevelUp(){return this.LEVEL_UP_THRESHOLD}}a(o,"MOBILE_BREAKPOINT",768),a(o,"CAPYBARA_WIDTH_DESKTOP",100),a(o,"CAPYBARA_HEIGHT_DESKTOP",75),a(o,"CAPYBARA_WIDTH_MOBILE",100),a(o,"CAPYBARA_HEIGHT_MOBILE",75),a(o,"CAPYBARA_BOTTOM_DESKTOP",20),a(o,"CAPYBARA_BOTTOM_MOBILE",10),a(o,"VEGETABLE_SIZE_DESKTOP",50),a(o,"VEGETABLE_SIZE_MOBILE",40),a(o,"PLAYER_SPEED",8),a(o,"SPAWN_RATE_BASE",2e3),a(o,"SPAWN_RATE_DECREASE",100),a(o,"MIN_SPAWN_RATE",800),a(o,"LEVEL_UP_THRESHOLD",50),a(o,"AUDIO_ENABLED_DEFAULT",!0),a(o,"MASTER_VOLUME",.6),a(o,"ANIMATION_DURATION_FAST",300),a(o,"ANIMATION_DURATION_NORMAL",600),a(o,"ANIMATION_DURATION_SLOW",1e3),a(o,"REDUCE_ANIMATIONS",!1);const w=A()(n=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",ceilingHeight:100,vegetables:[],addVegetable:e=>n(t=>({vegetables:[...t.vegetables,e]})),removeVegetable:e=>n(t=>({vegetables:t.vegetables.filter(i=>i.id!==e)})),incrementLevel:()=>n(e=>({level:e.level+1,ceilingHeight:Math.max(50,e.ceilingHeight*.9)})),incrementMissed:()=>n(e=>{const t=e.missedVegetables+1;return{missedVegetables:t,gameStatus:t>=3?"lost":e.gameStatus}}),updateScore:e=>n(t=>{const i=t.score+e,s=t.capybaraFillPercentage+e,l=s>=o.LEVEL_UP_THRESHOLD;return{score:i,capybaraFillPercentage:l?o.LEVEL_UP_THRESHOLD:s,gameStatus:l?"won":t.gameStatus}}),resetForNextLevel:()=>n(()=>({capybaraFillPercentage:0,missedVegetables:0,vegetables:[],gameStatus:"playing"})),resetGame:()=>n(()=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",ceilingHeight:100,vegetables:[]})),pauseGame:()=>n(()=>({gameStatus:"paused"})),resumeGame:()=>n(()=>({gameStatus:"playing"}))}));class D{constructor(){a(this,"level",1);a(this,"score",0);a(this,"missedVegetables",0);a(this,"capybaraFillPercentage",0);a(this,"gameStatus","playing");a(this,"fallSpeed",2);a(this,"ceilingHeight",100);a(this,"vegetables",[]);a(this,"listeners",[])}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notify(){this.listeners.forEach(e=>e())}addVegetable(e){this.vegetables.push(e),this.notify()}removeVegetable(e){this.vegetables=this.vegetables.filter(t=>t.id!==e),this.notify()}incrementLevel(){this.level+=1,this.fallSpeed*=1.15,this.ceilingHeight=Math.max(50,this.ceilingHeight*.9),this.notify()}incrementMissed(){this.missedVegetables+=1,this.missedVegetables>=3&&(this.gameStatus="lost"),this.notify()}updateScore(e){this.score+=e,this.capybaraFillPercentage=Math.min(100,this.capybaraFillPercentage+e),this.capybaraFillPercentage>=100&&(this.gameStatus="won",this.incrementLevel()),this.notify()}resetForNextLevel(){this.capybaraFillPercentage=0,this.missedVegetables=0,this.vegetables=[],this.notify()}resetGame(){this.level=1,this.score=0,this.missedVegetables=0,this.capybaraFillPercentage=0,this.gameStatus="playing",this.fallSpeed=2,this.ceilingHeight=100,this.vegetables=[],setTimeout(()=>this.notify(),100)}pauseGame(){this.gameStatus="paused",this.notify()}resumeGame(){this.gameStatus="playing",this.notify()}}const b=new D;class P{constructor(e){a(this,"element");a(this,"fillElement");a(this,"svgElement");a(this,"x",0);a(this,"lastX",0);a(this,"gameContainer");a(this,"speed",8);a(this,"direction","right");this.gameContainer=e,this.x=this.gameContainer.clientWidth/2-o.getCapybaraWidth()/2,this.lastX=this.x,this.createElement(),e.appendChild(this.element),this.setupControls()}createElement(){this.element=document.createElement("div"),this.element.className="capybara-player";const e=document.createElement("div");e.className="capybara-player__body",this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svgElement.setAttribute("class","capybara-player__svg"),this.svgElement.setAttribute("viewBox","0 0 80 60");const t=document.createElementNS("http://www.w3.org/2000/svg","use");t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#capybara-right"),this.svgElement.appendChild(t),this.fillElement=document.createElement("div"),this.fillElement.className="capybara-player__fill",this.fillElement.style.cssText=`
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(45deg, #32CD32, #228B22);
      border-radius: 50% 50% 40% 40%;
      transition: height 0.3s ease;
    `,e.appendChild(this.fillElement),e.appendChild(this.svgElement),this.element.appendChild(e),this.updatePosition()}setupControls(){document.addEventListener("keydown",t=>{if(b.gameStatus==="playing")switch(t.key){case"ArrowLeft":case"a":case"A":this.moveLeft();break;case"ArrowRight":case"d":case"D":this.moveRight();break}}),document.addEventListener("mousemove",t=>{if(b.gameStatus!=="playing")return;const i=this.gameContainer.getBoundingClientRect(),s=t.clientX-i.left,l=o.getCapybaraWidth(),r=l/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-l,s-r)),this.updatePosition()});let e=!1;document.addEventListener("touchstart",t=>{const i=t.target;i.closest(".pause-overlay")||i.closest(".game-over")||i.closest(".level-transition")||(e=!0,t.preventDefault())},{passive:!1}),document.addEventListener("touchmove",t=>{if(!e||b.gameStatus!=="playing")return;const i=t.target;if(i.closest(".pause-overlay")||i.closest(".game-over")||i.closest(".level-transition"))return;const s=t.touches[0],l=this.gameContainer.getBoundingClientRect(),r=s.clientX-l.left,d=o.getCapybaraWidth(),c=d/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-d,r-c)),this.updatePosition(),t.preventDefault()},{passive:!1}),document.addEventListener("touchend",()=>{e=!1})}moveLeft(){this.x=Math.max(0,this.x-this.speed),this.updatePosition()}moveRight(){const e=o.getCapybaraWidth();this.x=Math.min(this.gameContainer.clientWidth-e,this.x+this.speed),this.updatePosition()}updatePosition(){this.element.style.left=`${this.x}px`;const e=this.x>this.lastX?"right":this.x<this.lastX?"left":this.direction;if(e!==this.direction){this.direction=e;const t=this.svgElement.querySelector("use");t&&t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#capybara-${this.direction}`),this.element.classList.add("capybara-player--running"),setTimeout(()=>{this.element.classList.remove("capybara-player--running")},300)}this.lastX=this.x}updateFill(e){this.fillElement.style.height=`${e}%`,e>=80?this.fillElement.style.background="linear-gradient(45deg, #FFD700, #FFA500)":e>=50&&(this.fillElement.style.background="linear-gradient(45deg, #ADFF2F, #32CD32)")}getBounds(){return o.getCapybaraBounds(this.x,this.gameContainer.clientHeight)}getX(){return this.x}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class N{constructor(e){a(this,"container");a(this,"spawnTimer",0);a(this,"vegetableTypes",["carrot","broccoli","lettuce","tomato","pepper"]);a(this,"activeVegetables",new Map);this.container=e}update(e,t){this.spawnTimer+=e;const i=Math.max(800,2e3-t*100),s=[];if(this.spawnTimer>=i){const l=this.spawnVegetable(t);s.push(l),this.spawnTimer=0}return s}spawnVegetable(e){const t=this.vegetableTypes[Math.floor(Math.random()*this.vegetableTypes.length)],i=Math.random()*(this.container.clientWidth-o.getVegetableSize()),s={id:Date.now().toString()+Math.random(),type:t,x:i,y:-o.getVegetableSize(),speed:this.calculateVegetableSpeed(t,e),points:this.getVegetablePoints(t)};return this.createVegetableElement(s),s}createVegetableElement(e){const t=document.createElement("div");t.className=`vegetable vegetable--${e.type} vegetable--spawning`,t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.id=e.id;const i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("viewBox","0 0 30 30"),i.setAttribute("width",o.getVegetableSize().toString()),i.setAttribute("height",o.getVegetableSize().toString());const s=document.createElementNS("http://www.w3.org/2000/svg","use");s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#${e.type}`),i.appendChild(s),t.appendChild(i),this.container.appendChild(t),this.activeVegetables.set(e.id,t),setTimeout(()=>{t.classList.remove("vegetable--spawning")},300)}updateVegetablePosition(e){const t=this.activeVegetables.get(e.id);t&&(t.style.top=`${e.y}px`)}removeVegetable(e){const t=this.activeVegetables.get(e);t&&t.parentNode&&(t.parentNode.removeChild(t),this.activeVegetables.delete(e))}getVegetablePoints(e){return{carrot:5,broccoli:8,lettuce:3,tomato:6,pepper:10}[e]||5}calculateVegetableSpeed(e,t){const i=1.8+t*.25,l={lettuce:.8,carrot:1,tomato:1.1,broccoli:1.25,pepper:1.4}[e]||1;return i*l}}class O{constructor(e){a(this,"particles",[]);a(this,"canvas");a(this,"ctx");this.canvas=document.createElement("canvas"),this.canvas.className="particle-canvas",this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.style.position="absolute",this.canvas.style.top="0",this.canvas.style.left="0",this.canvas.style.pointerEvents="none",this.canvas.style.zIndex="15",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight})}createCatchEffect(e,t){for(let i=0;i<8;i++)this.particles.push({x:e+15,y:t+15,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,life:30,maxLife:30,color:`hsl(${Math.random()*60+60}, 70%, 60%)`})}update(){this.particles=this.particles.filter(e=>(e.x+=e.vx,e.y+=e.vy,e.vy+=.1,e.life--,e.life>0))}render(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{const t=e.life/e.maxLife;this.ctx.globalAlpha=t,this.ctx.fillStyle=e.color,this.ctx.fillRect(e.x,e.y,4,4)}),this.ctx.globalAlpha=1}destroy(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}class V{constructor(e){a(this,"element");a(this,"scoreElement");a(this,"levelElement");a(this,"missedElement");a(this,"progressBar");a(this,"progressFill");const t=document.querySelector(".game-hud");t&&t.remove(),this.createElement();let i=document.querySelector(".game-wrapper"),s=document.querySelector(".game-sidebar");i?s&&s.appendChild(this.element):(i=document.createElement("div"),i.className="game-wrapper",s=document.createElement("div"),s.className="game-sidebar",s.appendChild(this.element),i.appendChild(s),i.appendChild(e),document.body.appendChild(i))}createElement(){this.element=document.createElement("div"),this.element.className="game-hud",this.scoreElement=document.createElement("div"),this.scoreElement.className="game-hud__score",this.scoreElement.innerHTML="Score<br>0",this.levelElement=document.createElement("div"),this.levelElement.className="game-hud__level",this.levelElement.innerHTML="Level<br>1",this.missedElement=document.createElement("div"),this.missedElement.className="game-hud__lives",this.updateLives(3);const e=document.createElement("div");e.className="game-hud__row",e.appendChild(this.scoreElement),e.appendChild(this.levelElement),e.appendChild(this.missedElement),this.element.appendChild(e);const t=document.createElement("div");t.className="progress-bar",this.progressFill=document.createElement("div"),this.progressFill.className="progress-bar__fill",this.progressFill.style.width="0%",t.appendChild(this.progressFill),this.element.appendChild(t),this.progressBar=t}updateScore(e){this.scoreElement.innerHTML=`Score<br>${e}`}updateLevel(e){this.levelElement.innerHTML=`Level<br>${e}`}updateLives(e){const t=[];for(let i=0;i<3;i++)i<e?t.push("❤️"):t.push("🤍");this.missedElement.innerHTML=t.join(" ")}updateProgress(e){this.progressFill.style.width=`${e}%`,e>=100&&(this.progressFill.style.background="linear-gradient(90deg, #FFD700, #FFA500)")}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.progressBar.parentNode&&this.progressBar.parentNode.removeChild(this.progressBar)}}class H{constructor(e,t){a(this,"element");a(this,"onRestart");this.onRestart=t,this.createElement(),e.appendChild(this.element),this.hide()}createElement(){this.element=document.createElement("div"),this.element.className="game-over";const e=document.createElement("h1");e.className="game-over__title";const t=document.createElement("div");t.className="game-over__score";const i=document.createElement("button");i.className="game-over__button",i.textContent="Play Again",i.addEventListener("click",this.onRestart),this.element.appendChild(e),this.element.appendChild(t),this.element.appendChild(i)}show(e,t,i){const s=this.element.querySelector(".game-over__title"),l=this.element.querySelector(".game-over__score");e?(s.textContent="🎉 You Win! 🎉",s.style.color="#FFD700",l.textContent=`Capybara is full! Final Score: ${t} (Level ${i})`):(s.textContent="💔 Game Over 💔",s.style.color="#FF4444",l.textContent=`Too many vegetables missed! Final Score: ${t} (Level ${i})`),this.element.style.display="flex"}hide(){this.element.style.display="none"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class I{constructor(e){a(this,"element");a(this,"container");this.container=e}show(e){this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("level-transition--show")},50),setTimeout(()=>{this.hide()},2e3)}createElement(e){this.element=document.createElement("div"),this.element.className="level-transition",this.element.innerHTML=`
      <div class="level-transition__content">
        <h1>Level ${e}</h1>
        <p>Let's go!</p>
      </div>
    `}hide(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class R{constructor(e,t){a(this,"element");a(this,"container");a(this,"onShowHelp");this.container=e,this.onShowHelp=t}show(e){this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("pause-overlay--show")},50)}hide(){this.element&&(this.element.classList.remove("pause-overlay--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(e){this.element=document.createElement("div"),this.element.className="pause-overlay",this.element.innerHTML=`
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
    `;const t=this.element.querySelector(".pause-overlay__resume-btn"),i=this.element.querySelector("#pauseHelpBtn"),s=()=>{this.hide(),e()};t.addEventListener("click",s),t.addEventListener("touchend",r=>{r.preventDefault(),s()}),i&&this.onShowHelp&&i.addEventListener("click",this.onShowHelp);const l=r=>{r.code==="Space"&&(r.preventDefault(),s(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}}class S{constructor(){a(this,"element")}show(){this.createElement(),document.body.appendChild(this.element),setTimeout(()=>{this.element.classList.add("help-modal--show")},50)}hide(){this.element&&(this.element.classList.remove("help-modal--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(){this.element=document.createElement("div"),this.element.className="help-modal",this.element.innerHTML=`
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
    `;const e=this.element.querySelector(".help-modal__close"),t=this.element.querySelector(".help-modal__backdrop"),i=()=>this.hide();e.addEventListener("click",i),t.addEventListener("click",i);const s=l=>{l.key==="Escape"&&(i(),document.removeEventListener("keydown",s))};document.addEventListener("keydown",s)}}const v=class v{constructor(){a(this,"enabled",!0);a(this,"audioContext",null)}static getInstance(){return v.instance||(v.instance=new v),v.instance}play(e){return g(this,null,function*(){if(this.enabled)try{(!this.audioContext||this.audioContext.state==="closed")&&(this.audioContext=new(window.AudioContext||window.webkitAudioContext)),this.audioContext.state==="suspended"&&(yield this.audioContext.resume());const t=this.audioContext.createOscillator(),i=this.audioContext.createGain();t.connect(i),i.connect(this.audioContext.destination);const l={catch:{freq:800,duration:.1},miss:{freq:200,duration:.2},levelup:{freq:1e3,duration:.3},gameover:{freq:150,duration:.5},click:{freq:600,duration:.05}}[e];if(!l)return;t.frequency.value=l.freq,t.type="sine",i.gain.setValueAtTime(0,this.audioContext.currentTime),i.gain.linearRampToValueAtTime(.3,this.audioContext.currentTime+.01),i.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+l.duration),t.start(),t.stop(this.audioContext.currentTime+l.duration)}catch(t){console.warn("Audio playback failed:",t)}})}toggle(){return this.enabled=!this.enabled,this.enabled}isEnabled(){return this.enabled}init(){return g(this,null,function*(){try{this.audioContext||(this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.audioContext.state==="suspended"&&(yield this.audioContext.resume()))}catch(e){console.warn("Audio initialization failed:",e)}})}};a(v,"instance");let f=v;const C=Object.freeze(Object.defineProperty({__proto__:null,AudioManager:f},Symbol.toStringTag,{value:"Module"}));class Q{constructor(e){a(this,"element");a(this,"audioManager",f.getInstance());this.createElement(),e.appendChild(this.element)}createElement(){this.element=document.createElement("button"),this.element.className="audio-toggle",this.element.innerHTML="🔊",this.element.style.cssText=`
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
    `,this.element.addEventListener("click",()=>g(this,null,function*(){yield this.audioManager.init(),this.audioManager.play("click");const e=this.audioManager.toggle();this.element.innerHTML=e?"🔊":"🔇",this.element.style.opacity=e?"1":"0.6"})),this.element.addEventListener("mouseenter",()=>{this.element.style.transform="scale(1.1)"}),this.element.addEventListener("mouseleave",()=>{this.element.style.transform="scale(1)"})}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class W{constructor(e){a(this,"container");a(this,"player");a(this,"spawner");a(this,"particles");a(this,"hud");a(this,"gameOverScreen");a(this,"levelTransition");a(this,"pauseOverlay");a(this,"helpModal");a(this,"audioToggle");a(this,"audioManager",f.getInstance());a(this,"animationId",0);a(this,"lastTime",0);a(this,"vegetables",[]);a(this,"gameStore",w);a(this,"levelTransitionActive",!1);this.container=e,this.init()}init(){this.player=new P(this.container),this.spawner=new N(this.container),this.particles=new O(this.container),this.hud=new V(this.container),this.gameOverScreen=new H(this.container,()=>this.restart()),this.levelTransition=new I(this.container),this.pauseOverlay=new R(this.container,()=>this.helpModal.show()),this.helpModal=new S,this.audioToggle=new Q(document.body),w.subscribe(e=>this.handleGameStateChange(e)),this.gameLoop(0),this.setupKeyboardControls()}handleGameStateChange(e){e.gameStatus==="paused"?this.pauseOverlay.show(()=>this.gameStore.getState().resumeGame()):e.gameStatus==="playing"?this.pauseOverlay.hide():e.gameStatus==="won"&&!this.levelTransitionActive?(this.levelTransitionActive=!0,this.audioManager.play("levelup"),this.levelTransition.show(e.level+1),setTimeout(()=>{this.gameStore.getState().incrementLevel(),this.gameStore.getState().resetForNextLevel(),this.levelTransitionActive=!1},2e3)):e.gameStatus==="lost"&&(this.audioManager.play("gameover"),this.gameOverScreen.show(!1,e.score,e.level))}setupKeyboardControls(){document.addEventListener("keydown",e=>{switch(e.key){case" ":case"Escape":e.preventDefault();const t=this.gameStore.getState();t.gameStatus==="playing"?t.pauseGame():t.gameStatus==="paused"&&t.resumeGame();break;case"r":case"R":const i=this.gameStore.getState();(i.gameStatus==="lost"||i.gameStatus==="won")&&this.restart();break}})}gameLoop(e){const t=e-this.lastTime;this.lastTime=e;const i=this.gameStore.getState();i.gameStatus==="playing"?(this.update(t),this.render()):i.gameStatus,this.animationId=requestAnimationFrame(s=>this.gameLoop(s))}update(e){const t=this.gameStore.getState(),i=this.spawner.update(e,t.level);this.vegetables.push(...i),this.vegetables=this.vegetables.filter(r=>{r.y+=r.speed,this.spawner.updateVegetablePosition(r);const d=this.player.getBounds();if(this.checkCollision(d,r)){this.audioManager.play("catch"),t.updateScore(r.points),this.particles.createCatchEffect(r.x,r.y),this.spawner.removeVegetable(r.id);const c=this.container.querySelector(".capybara-player");return c&&(c.classList.add("capybara-player--catch"),setTimeout(()=>{c.classList.remove("capybara-player--catch")},600)),this.createScorePopup(r.x,r.y,r.points),!1}return r.y>this.container.clientHeight?(this.audioManager.play("miss"),t.incrementMissed(),this.spawner.removeVegetable(r.id),!1):!0}),this.particles.update();const s=this.gameStore.getState();this.hud.updateScore(s.score),this.hud.updateLevel(s.level),this.hud.updateLives(3-s.missedVegetables);const l=o.calculateFillPercentage(s.capybaraFillPercentage);this.hud.updateProgress(l),this.player.updateFill(l)}render(){this.particles.render()}checkCollision(e,t){const i=o.getVegetableSize(),s=.3,l=Math.max(0,Math.min(e.x+e.width,t.x+i)-Math.max(e.x,t.x)),r=Math.max(0,Math.min(e.y+e.height,t.y+i)-Math.max(e.y,t.y)),c=Math.min(e.width*e.height,i*i)*s;return l*r>=c}restart(){this.gameStore.getState().resetGame(),this.vegetables.forEach(e=>{this.spawner.removeVegetable(e.id)}),this.vegetables=[],this.gameOverScreen.hide(),this.hud.updateScore(0),this.hud.updateLevel(1),this.hud.updateLives(3),this.hud.updateProgress(0),this.player.updateFill(0)}createScorePopup(e,t,i){const s=document.createElement("div");s.className="score-popup",s.textContent=`+${i}`,s.style.cssText=`
      position: absolute;
      left: ${e}px;
      top: ${t}px;
      color: #FFD700;
      font-weight: bold;
      font-size: 1.2rem;
      pointer-events: none;
      z-index: 1000;
    `,this.container.appendChild(s),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},1e3)}destroy(){this.animationId&&cancelAnimationFrame(this.animationId),this.player.destroy(),this.particles.destroy(),this.hud.destroy(),this.gameOverScreen.destroy(),this.audioToggle.destroy()}}class q{constructor(){a(this,"gameEngine",null);a(this,"container");a(this,"helpModal");this.init()}init(){this.loadSVGSprites(),this.container=document.createElement("div"),this.container.className="capybara-game",this.helpModal=new S,this.showInstructions(),document.body.appendChild(this.container)}loadSVGSprites(){const e=`
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
    `,this.container.appendChild(e);const t=e.querySelector("#startGame"),i=e.querySelector("#helpButton"),s=()=>{e.remove(),this.startGame()};t.addEventListener("click",()=>g(this,null,function*(){yield(yield E(()=>g(this,null,function*(){const{AudioManager:r}=yield Promise.resolve().then(()=>C);return{AudioManager:r}}),void 0)).AudioManager.getInstance().init(),s()})),t.addEventListener("touchend",l=>g(this,null,function*(){l.preventDefault(),yield(yield E(()=>g(this,null,function*(){const{AudioManager:d}=yield Promise.resolve().then(()=>C);return{AudioManager:d}}),void 0)).AudioManager.getInstance().init(),s()})),i.addEventListener("click",()=>{this.helpModal.show()}),t.addEventListener("click",()=>{}),i.addEventListener("click",()=>{}),e.addEventListener("touchmove",l=>{l.preventDefault()}),e.addEventListener("click",l=>{l.stopPropagation()})}startGame(){this.gameEngine&&this.gameEngine.destroy(),this.gameEngine=new W(this.container)}}document.addEventListener("DOMContentLoaded",()=>{new q});window.addEventListener("resize",()=>{const n=document.querySelector(".particle-canvas"),e=document.querySelector(".capybara-game");n&&e&&(n.width=e.clientWidth,n.height=e.clientHeight)});
