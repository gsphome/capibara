var F=Object.defineProperty,P=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var b=(r,e,t)=>e in r?F(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,w=(r,e)=>{for(var t in e||(e={}))D.call(e,t)&&b(r,t,e[t]);if(E)for(var t of E(e))N.call(e,t)&&b(r,t,e[t]);return r},S=(r,e)=>P(r,k(e));var a=(r,e,t)=>b(r,typeof e!="symbol"?e+"":e,t);var m=(r,e,t)=>new Promise((s,i)=>{var n=c=>{try{o(t.next(c))}catch(h){i(h)}},l=c=>{try{o(t.throw(c))}catch(h){i(h)}},o=c=>c.done?s(c.value):Promise.resolve(c.value).then(n,l);o((t=t.apply(r,e)).next())});(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const I="modulepreload",H=function(r){return"/capibara/"+r},C={},B=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let h=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var l=h;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=h(t.map(u=>{if(u=H(u),u in C)return;C[u]=!0;const p=u.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const g=document.createElement("link");if(g.rel=p?"stylesheet":I,p||(g.as="script"),g.crossOrigin="",g.href=u,c&&g.setAttribute("nonce",c),document.head.appendChild(g),p)return new Promise((_,M)=>{g.addEventListener("load",_),g.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${u}`)))})}))}function n(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return i.then(o=>{for(const c of o||[])c.status==="rejected"&&n(c.reason);return e().catch(n)})},O=r=>{let e;const t=new Set,s=(h,u)=>{const p=typeof h=="function"?h(e):h;if(!Object.is(p,e)){const y=e;e=(u!=null?u:typeof p!="object"||p===null)?p:Object.assign({},e,p),t.forEach(g=>g(e,y))}},i=()=>e,o={setState:s,getState:i,getInitialState:()=>c,subscribe:h=>(t.add(h),()=>t.delete(h))},c=e=r(s,i,o);return o},V=(r=>O);class d{static isMobile(){return window.innerWidth<=this.MOBILE_BREAKPOINT}static getCapybaraWidth(){return this.isMobile()?this.CAPYBARA_WIDTH_MOBILE:this.CAPYBARA_WIDTH_DESKTOP}static getCapybaraHeight(){return this.isMobile()?this.CAPYBARA_HEIGHT_MOBILE:this.CAPYBARA_HEIGHT_DESKTOP}static getCapybaraBottom(){return this.isMobile()?this.CAPYBARA_BOTTOM_MOBILE:this.CAPYBARA_BOTTOM_DESKTOP}static getVegetableSize(){return this.isMobile()?this.VEGETABLE_SIZE_MOBILE:this.VEGETABLE_SIZE_DESKTOP}static getCapybaraBounds(e,t){const s=this.getCapybaraWidth(),i=this.getCapybaraHeight(),n=this.getCapybaraBottom();return{x:e,y:t-n-i,width:s,height:i}}static calculateFillPercentage(e){return Math.min(100,e/this.LEVEL_UP_THRESHOLD*100)}static getPointsForLevelUp(){return this.LEVEL_UP_THRESHOLD}}a(d,"MOBILE_BREAKPOINT",768),a(d,"CAPYBARA_WIDTH_DESKTOP",100),a(d,"CAPYBARA_HEIGHT_DESKTOP",75),a(d,"CAPYBARA_WIDTH_MOBILE",100),a(d,"CAPYBARA_HEIGHT_MOBILE",75),a(d,"CAPYBARA_BOTTOM_DESKTOP",20),a(d,"CAPYBARA_BOTTOM_MOBILE",10),a(d,"VEGETABLE_SIZE_DESKTOP",50),a(d,"VEGETABLE_SIZE_MOBILE",40),a(d,"PLAYER_SPEED",8),a(d,"SPAWN_RATE_BASE",2e3),a(d,"SPAWN_RATE_DECREASE",100),a(d,"MIN_SPAWN_RATE",800),a(d,"LEVEL_UP_THRESHOLD",50),a(d,"AUDIO_ENABLED_DEFAULT",!0),a(d,"MASTER_VOLUME",.6),a(d,"ANIMATION_DURATION_FAST",300),a(d,"ANIMATION_DURATION_NORMAL",600),a(d,"ANIMATION_DURATION_SLOW",1e3),a(d,"REDUCE_ANIMATIONS",!1);const L=V()(r=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",ceilingHeight:100,incrementLevel:()=>r(e=>({level:e.level+1,ceilingHeight:Math.max(50,e.ceilingHeight*.9)})),incrementMissed:()=>r(e=>{const t=e.missedVegetables+1;return{missedVegetables:t,gameStatus:t>=3?"lost":e.gameStatus}}),updateScore:e=>r(t=>{const s=t.score+e,i=t.capybaraFillPercentage+e,n=i>=d.LEVEL_UP_THRESHOLD;return{score:s,capybaraFillPercentage:n?d.LEVEL_UP_THRESHOLD:i,gameStatus:n?"won":t.gameStatus}}),resetForNextLevel:()=>r(()=>({capybaraFillPercentage:0,missedVegetables:0,gameStatus:"playing"})),resetGame:()=>r(()=>({level:1,score:0,missedVegetables:0,capybaraFillPercentage:0,gameStatus:"playing",ceilingHeight:100})),pauseGame:()=>r(()=>({gameStatus:"paused"})),resumeGame:()=>r(()=>({gameStatus:"playing"}))}));class R{constructor(){a(this,"level",1);a(this,"score",0);a(this,"missedVegetables",0);a(this,"capybaraFillPercentage",0);a(this,"gameStatus","playing");a(this,"fallSpeed",2);a(this,"ceilingHeight",100);a(this,"vegetables",[]);a(this,"listeners",[])}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notify(){this.listeners.forEach(e=>e())}addVegetable(e){this.vegetables.push(e),this.notify()}removeVegetable(e){this.vegetables=this.vegetables.filter(t=>t.id!==e),this.notify()}incrementLevel(){this.level+=1,this.fallSpeed*=1.15,this.ceilingHeight=Math.max(50,this.ceilingHeight*.9),this.notify()}incrementMissed(){this.missedVegetables+=1,this.missedVegetables>=3&&(this.gameStatus="lost"),this.notify()}updateScore(e){this.score+=e,this.capybaraFillPercentage=Math.min(100,this.capybaraFillPercentage+e),this.capybaraFillPercentage>=100&&(this.gameStatus="won",this.incrementLevel()),this.notify()}resetForNextLevel(){this.capybaraFillPercentage=0,this.missedVegetables=0,this.vegetables=[],this.notify()}resetGame(){this.level=1,this.score=0,this.missedVegetables=0,this.capybaraFillPercentage=0,this.gameStatus="playing",this.fallSpeed=2,this.ceilingHeight=100,this.vegetables=[],setTimeout(()=>this.notify(),100)}pauseGame(){this.gameStatus="paused",this.notify()}resumeGame(){this.gameStatus="playing",this.notify()}}const x=new R;class q{constructor(e){a(this,"element");a(this,"fillElement");a(this,"svgElement");a(this,"x",0);a(this,"lastX",0);a(this,"gameContainer");a(this,"speed",8);a(this,"direction","right");this.gameContainer=e,this.x=this.gameContainer.clientWidth/2-d.getCapybaraWidth()/2,this.lastX=this.x,this.createElement(),e.appendChild(this.element),this.setupControls()}createElement(){this.element=document.createElement("div"),this.element.className="capybara-player";const e=document.createElement("div");e.className="capybara-player__body",this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svgElement.setAttribute("class","capybara-player__svg"),this.svgElement.setAttribute("viewBox","0 0 80 60");const t=document.createElementNS("http://www.w3.org/2000/svg","use");t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#capybara-right"),this.svgElement.appendChild(t),this.fillElement=document.createElement("div"),this.fillElement.className="capybara-player__fill",this.fillElement.style.cssText=`
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(45deg, #FF4500, #DC143C);
      border-radius: 50% 50% 40% 40%;
      transition: height 0.3s ease, background 0.3s ease;
    `,e.appendChild(this.fillElement),e.appendChild(this.svgElement),this.element.appendChild(e),this.updatePosition()}setupControls(){document.addEventListener("keydown",t=>{if(x.gameStatus==="playing")switch(t.key){case"ArrowLeft":case"a":case"A":this.moveLeft();break;case"ArrowRight":case"d":case"D":this.moveRight();break}}),document.addEventListener("mousemove",t=>{if(x.gameStatus!=="playing")return;const s=this.gameContainer.getBoundingClientRect(),i=t.clientX-s.left,n=d.getCapybaraWidth(),l=n/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-n,i-l)),this.updatePosition()});let e=!1;this.gameContainer.addEventListener("touchstart",t=>{const s=t.target;s.closest(".pause-overlay")||s.closest(".game-over")||s.closest(".level-transition")||s.closest(".audio-toggle")||(e=!0,t.preventDefault())},{passive:!1}),this.gameContainer.addEventListener("touchmove",t=>{if(!e||x.gameStatus!=="playing")return;const s=t.target;if(s.closest(".pause-overlay")||s.closest(".game-over")||s.closest(".level-transition")||s.closest(".audio-toggle"))return;const i=t.touches[0],n=this.gameContainer.getBoundingClientRect(),l=i.clientX-n.left,o=d.getCapybaraWidth(),c=o/2;this.x=Math.max(0,Math.min(this.gameContainer.clientWidth-o,l-c)),this.updatePosition(),t.preventDefault()},{passive:!1}),this.gameContainer.addEventListener("touchend",()=>{e=!1})}moveLeft(){this.x=Math.max(0,this.x-this.speed),this.updatePosition()}moveRight(){const e=d.getCapybaraWidth();this.x=Math.min(this.gameContainer.clientWidth-e,this.x+this.speed),this.updatePosition()}updatePosition(){this.element.style.left=`${this.x}px`;const e=this.x>this.lastX?"right":this.x<this.lastX?"left":this.direction;if(e!==this.direction){this.direction=e;const t=this.svgElement.querySelector("use");t&&t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#capybara-${this.direction}`),this.element.classList.add("capybara-player--running"),setTimeout(()=>{this.element.classList.remove("capybara-player--running")},300)}this.lastX=this.x}updateFill(e){this.fillElement.style.height=`${e}%`,e>=80?this.fillElement.style.background="linear-gradient(45deg, #32CD32, #228B22)":e>=50?this.fillElement.style.background="linear-gradient(45deg, #FFD700, #FFA500)":e>=20?this.fillElement.style.background="linear-gradient(45deg, #FF8C00, #FF6347)":this.fillElement.style.background="linear-gradient(45deg, #FF4500, #DC143C)"}getBounds(){return d.getCapybaraBounds(this.x,this.gameContainer.clientHeight)}getX(){return this.x}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class U{constructor(e){a(this,"container");a(this,"spawnTimer",0);a(this,"vegetableTypes",["carrot","broccoli","lettuce","tomato","pepper"]);a(this,"activeVegetables",new Map);this.container=e}update(e,t){this.spawnTimer+=e;const s=Math.max(800,2e3-t*100),i=[];if(this.spawnTimer>=s){const n=this.spawnVegetable(t);i.push(n),this.spawnTimer=0}return i}spawnVegetable(e){const t=this.vegetableTypes[Math.floor(Math.random()*this.vegetableTypes.length)],s=Math.random()*(this.container.clientWidth-d.getVegetableSize()),i={id:Date.now().toString()+Math.random(),type:t,x:s,y:-d.getVegetableSize(),speed:this.calculateVegetableSpeed(t,e),points:this.getVegetablePoints(t)};return this.createVegetableElement(i),i}createVegetableElement(e){const t=document.createElement("div");t.className=`vegetable vegetable--${e.type} vegetable--spawning`,t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.id=e.id;const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("viewBox","0 0 30 30"),s.setAttribute("width",d.getVegetableSize().toString()),s.setAttribute("height",d.getVegetableSize().toString());const i=document.createElementNS("http://www.w3.org/2000/svg","use");i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#${e.type}`),s.appendChild(i),t.appendChild(s),this.container.appendChild(t),this.activeVegetables.set(e.id,t),setTimeout(()=>{t.classList.remove("vegetable--spawning")},300)}updateVegetablePosition(e){const t=this.activeVegetables.get(e.id);t&&(t.style.top=`${e.y}px`)}reset(){this.activeVegetables.forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)}),this.activeVegetables.clear(),this.spawnTimer=0}removeVegetable(e){const t=this.activeVegetables.get(e);t&&t.parentNode&&(t.parentNode.removeChild(t),this.activeVegetables.delete(e))}getVegetablePoints(e){return{carrot:5,broccoli:8,lettuce:3,tomato:6,pepper:10}[e]||5}calculateVegetableSpeed(e,t){const s=1.8+t*.25,n={lettuce:.8,carrot:1,tomato:1.1,broccoli:1.25,pepper:1.4}[e]||1;return s*n}}class Q{constructor(e){a(this,"particles",[]);a(this,"canvas");a(this,"ctx");this.canvas=document.createElement("canvas"),this.canvas.className="particle-canvas",this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.style.position="absolute",this.canvas.style.top="0",this.canvas.style.left="0",this.canvas.style.pointerEvents="none",this.canvas.style.zIndex="15",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight})}createCatchEffect(e,t){for(let s=0;s<8;s++)this.particles.push({x:e+15,y:t+15,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,life:30,maxLife:30,color:`hsl(${Math.random()*60+60}, 70%, 60%)`})}update(){this.particles=this.particles.filter(e=>(e.x+=e.vx,e.y+=e.vy,e.vy+=.1,e.life--,e.life>0))}render(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{const t=e.life/e.maxLife;this.ctx.globalAlpha=t,this.ctx.fillStyle=e.color,this.ctx.fillRect(e.x,e.y,4,4)}),this.ctx.globalAlpha=1}destroy(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}class W{constructor(e){a(this,"element");a(this,"scoreElement");a(this,"levelElement");a(this,"missedElement");a(this,"progressBar");a(this,"progressFill");const t=document.querySelector(".game-hud");t&&t.remove(),this.createElement();let s=document.querySelector(".game-wrapper"),i=document.querySelector(".game-sidebar");s?i&&i.appendChild(this.element):(s=document.createElement("div"),s.className="game-wrapper",i=document.createElement("div"),i.className="game-sidebar",i.appendChild(this.element),s.appendChild(i),s.appendChild(e),document.body.appendChild(s))}createElement(){this.element=document.createElement("div"),this.element.className="game-hud",this.scoreElement=document.createElement("div"),this.scoreElement.className="game-hud__score",this.scoreElement.innerHTML="Score<br>0",this.levelElement=document.createElement("div"),this.levelElement.className="game-hud__level",this.levelElement.innerHTML="Level<br>1",this.missedElement=document.createElement("div"),this.missedElement.className="game-hud__lives",this.updateLives(3);const e=document.createElement("div");e.className="game-hud__row";const t=window.innerWidth<=1024;if(t){const i=document.querySelector(".pause-button");i&&e.appendChild(i)}else{const i=document.createElement("button");i.className="hud-control-btn pause-btn",i.innerHTML="⏸️",i.addEventListener("click",n=>{n.stopPropagation(),document.dispatchEvent(new KeyboardEvent("keydown",{key:" "}))}),e.appendChild(i)}e.appendChild(this.scoreElement),e.appendChild(this.levelElement),e.appendChild(this.missedElement);const s=document.createElement("div");if(s.className="progress-bar",this.progressFill=document.createElement("div"),this.progressFill.className="progress-bar__fill",this.progressFill.style.width="0%",s.appendChild(this.progressFill),e.appendChild(s),t){const i=document.querySelector(".audio-toggle");i&&e.appendChild(i)}else{const i=document.createElement("button");i.className="hud-control-btn audio-btn",i.innerHTML=`
        <span class="audio-icon">🔊</span>
        <span class="mute-indicator"></span>
      `,i.addEventListener("click",n=>{n.stopPropagation();const l=document.querySelector(".audio-toggle");if(l){l.click();const o=l.innerHTML==="🔊";i.classList.toggle("muted",!o)}}),e.appendChild(i)}this.element.appendChild(e),this.progressBar=s}updateScore(e){this.scoreElement.innerHTML=`Score<br>${e}`}updateLevel(e){this.levelElement.innerHTML=`Level<br>${e}`}updateLives(e){const t=[];for(let s=0;s<3;s++)s<e?t.push("❤️"):t.push("🤍");this.missedElement.innerHTML=t.join(" ")}updateProgress(e){this.progressFill.style.width=`${e}%`,this.progressFill.classList.remove("progress-bar__fill--low","progress-bar__fill--medium-low","progress-bar__fill--medium","progress-bar__fill--high"),e>=80?this.progressFill.classList.add("progress-bar__fill--high"):e>=50?this.progressFill.classList.add("progress-bar__fill--medium"):e>=20?this.progressFill.classList.add("progress-bar__fill--medium-low"):this.progressFill.classList.add("progress-bar__fill--low")}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.progressBar.parentNode&&this.progressBar.parentNode.removeChild(this.progressBar)}}class z{constructor(e,t){a(this,"element");a(this,"onRestart");this.onRestart=t,this.createElement(),e.appendChild(this.element),this.hide()}createElement(){this.element=document.createElement("div"),this.element.className="game-over";const e=document.createElement("h1");e.className="game-over__title";const t=document.createElement("div");t.className="game-over__score";const s=document.createElement("button");s.className="game-over__button",s.textContent="Play Again",s.addEventListener("click",this.onRestart),this.element.appendChild(e),this.element.appendChild(t),this.element.appendChild(s)}show(e,t,s){const i=this.element.querySelector(".game-over__title"),n=this.element.querySelector(".game-over__score");e?(i.textContent="🎉 You Win! 🎉",i.style.color="#FFD700",n.textContent=`Capybara has full energy! Final Score: ${t} (Level ${s})`):(i.textContent="💔 Game Over 💔",i.style.color="#FF4444",n.textContent=`Too many vegetables missed! Final Score: ${t} (Level ${s})`),this.element.style.display="flex"}hide(){this.element.style.display="none"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class G{constructor(e){a(this,"element");a(this,"container");this.container=e}show(e){console.log(`🎉 ¡Pasaste al nivel ${e}! ¡Felicidades!`),this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("level-transition--show")},50),setTimeout(()=>{this.hide()},2e3)}createElement(e){this.element=document.createElement("div"),this.element.className="level-transition",this.element.innerHTML=`
      <div class="level-transition__content">
        <h1>Level ${e}</h1>
        <p>Let's go!</p>
      </div>
    `}hide(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class ${constructor(e,t){a(this,"element");a(this,"container");a(this,"onShowHelp");this.container=e,this.onShowHelp=t}show(e){this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("pause-overlay--show")},50)}hide(){this.element&&(this.element.classList.remove("pause-overlay--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(e){this.element=document.createElement("div"),this.element.className="pause-overlay",this.element.innerHTML=`
      <div class="pause-overlay__backdrop"></div>
      <div class="pause-overlay__content">
        <div class="pause-overlay__icon">⏸️</div>
        <h2>Game Paused</h2>
        <p>Take a break! The capybara is waiting for you.</p>
        <button class="pause-overlay__resume-btn">
          ▶️ Resume Game
        </button>
        <div class="pause-overlay__secondary-controls">
          <button class="pause-overlay__audio-btn" id="pauseAudioBtn">
            <span class="audio-icon">🔊</span>
            <span class="mute-indicator"></span>
          </button>
        </div>
        <div class="pause-overlay__hint">
          <small>💡 Tip: Press SPACE to pause/resume anytime</small>
          <br>
          <button class="pause-overlay__help-btn" id="pauseHelpBtn">
            🥕 Vegetable Guide
          </button>
        </div>
      </div>
    `;const t=this.element.querySelector(".pause-overlay__resume-btn"),s=this.element.querySelector("#pauseAudioBtn"),i=this.element.querySelector("#pauseHelpBtn");this.updateAudioButtonState(s);const n=()=>{this.hide(),e()};t.addEventListener("click",n),t.addEventListener("touchend",o=>{o.preventDefault(),n()}),s&&s.addEventListener("click",o=>{o.stopPropagation(),this.toggleAudio()}),i&&this.onShowHelp&&i.addEventListener("click",this.onShowHelp);const l=o=>{o.code==="Space"&&(o.preventDefault(),n(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}updateAudioButtonState(e){var c;if(!e)return;const t=document.querySelector(".audio-toggle"),s=document.querySelector(".mobile-ui-bar .audio-icon"),i=document.querySelector(".hud-control-btn.audio-btn");let n=!0;if(t)n=t.innerHTML==="🔊";else if(s){const h=(c=s.parentElement)==null?void 0:c.querySelector(".mute-indicator");n=!h||h.style.opacity==="0"}else i&&(n=!i.classList.contains("muted"));const l=e.querySelector(".mute-indicator"),o=e.querySelector(".audio-icon");l&&o&&(l.style.opacity=n?"0":"1",o.style.opacity=n?"1":"0.6",e.classList.toggle("muted",!n))}toggleAudio(){return m(this,null,function*(){const{AudioManager:e}=yield B(()=>m(null,null,function*(){const{AudioManager:i}=yield Promise.resolve().then(()=>A);return{AudioManager:i}}),void 0),s=e.getInstance().toggle();this.syncAllAudioButtons(s)})}syncAllAudioButtons(e){var l;const t=document.querySelector("#pauseAudioBtn");if(t){const o=t.querySelector(".mute-indicator"),c=t.querySelector(".audio-icon");o&&c&&(o.style.opacity=e?"0":"1",c.style.opacity=e?"1":"0.6",t.classList.toggle("muted",!e))}const s=document.querySelector(".mobile-ui-bar .audio-icon");if(s){const o=(l=s.parentElement)==null?void 0:l.querySelector(".mute-indicator");o&&(o.style.opacity=e?"0":"1",s.style.opacity=e?"1":"0.6")}const i=document.querySelector(".hud-control-btn.audio-btn");i&&i.classList.toggle("muted",!e);const n=document.querySelector(".audio-toggle");n&&(n.innerHTML=e?"🔊":"🔇",n.style.opacity=e?"1":"0.6")}}class T{constructor(){a(this,"element")}show(){this.createElement(),document.body.appendChild(this.element),setTimeout(()=>{this.element.classList.add("help-modal--show")},50)}hide(){this.element&&(this.element.classList.remove("help-modal--show"),setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}createElement(){this.element=document.createElement("div"),this.element.className="help-modal",this.element.innerHTML=`
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
    `;const e=this.element.querySelector(".help-modal__close"),t=this.element.querySelector(".help-modal__backdrop"),s=()=>this.hide();e.addEventListener("click",s),t.addEventListener("click",s);const i=n=>{n.key==="Escape"&&(s(),document.removeEventListener("keydown",i))};document.addEventListener("keydown",i)}}class K{constructor(e,t){a(this,"element");a(this,"isPaused",!1);a(this,"onToggle");this.onToggle=t,this.createElement(),e.appendChild(this.element)}createElement(){this.element=document.createElement("button"),this.element.className="pause-button",this.element.innerHTML="⏸️",this.element.style.cssText=`
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
    `,this.element.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault(),this.toggle()}),this.element.addEventListener("touchend",e=>{e.stopPropagation(),e.preventDefault(),this.toggle()}),this.element.addEventListener("mouseenter",()=>{this.element.style.transform="scale(1.1)"}),this.element.addEventListener("mouseleave",()=>{this.element.style.transform="scale(1)"})}toggle(){this.isPaused=!this.isPaused,this.element.innerHTML=this.isPaused?"▶️":"⏸️",this.element.style.opacity=this.isPaused?"0.8":"1",this.onToggle(this.isPaused)}updateState(e){this.isPaused=e,this.element.innerHTML=this.isPaused?"▶️":"⏸️",this.element.style.opacity=this.isPaused?"0.8":"1"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class Y{constructor(e,t){a(this,"element");a(this,"pauseBtn");a(this,"audioBtn");a(this,"scoreElement");a(this,"levelElement");a(this,"livesElement");a(this,"progressBar");a(this,"progressFill");a(this,"onPauseToggle");a(this,"onAudioToggle");a(this,"isPaused",!1);a(this,"audioEnabled",!0);this.onPauseToggle=e,this.onAudioToggle=t,this.createElement(),document.body.appendChild(this.element)}createElement(){this.element=document.createElement("div"),this.element.className="mobile-ui-bar",this.element.style.cssText=`
      position: fixed;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,0,0,0.9);
      padding: 6px 12px;
      border-radius: 20px;
      backdrop-filter: blur(25px);
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      z-index: 1000;
      max-width: 95vw;
      overflow: hidden;
    `,this.pauseBtn=document.createElement("button"),this.pauseBtn.innerHTML="⏸️",this.pauseBtn.style.cssText=`
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
      touch-action: manipulation;
      display: flex;
      align-items: center;
      justify-content: center;
    `,this.scoreElement=document.createElement("div"),this.scoreElement.innerHTML="Score<br>0",this.scoreElement.style.cssText=`
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 10px;
      padding: 4px 8px;
      font-size: 9px;
      font-weight: 700;
      color: white;
      text-align: center;
      min-width: 40px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      white-space: nowrap;
    `,this.levelElement=document.createElement("div"),this.levelElement.innerHTML="Level<br>1",this.levelElement.style.cssText=this.scoreElement.style.cssText,this.livesElement=document.createElement("div"),this.livesElement.innerHTML="❤️ ❤️ ❤️",this.livesElement.style.cssText=`
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 10px;
      padding: 4px 8px;
      font-size: 11px;
      color: white;
      text-align: center;
      min-width: 40px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `,this.progressBar=document.createElement("div"),this.progressBar.style.cssText=`
      position: relative;
      width: 80px;
      height: 12px;
      background: rgba(0,0,0,0.6);
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.3);
      overflow: hidden;
    `,this.progressFill=document.createElement("div"),this.progressFill.style.cssText=`
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #FF4500, #DC143C);
      transition: width 0.3s ease-out, background 0.3s ease-out;
      border-radius: 6px;
    `,this.progressBar.appendChild(this.progressFill),this.audioBtn=document.createElement("button"),this.audioBtn.innerHTML=`
      <span class="audio-icon">🔊</span>
      <span class="mute-indicator" style="
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 20px;
        background: #ff0000;
        transform: translate(-50%, -50%) rotate(45deg);
        opacity: 0;
        transition: opacity 0.2s ease;
        border-radius: 1px;
        box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);
      "></span>
    `,this.audioBtn.style.cssText=this.pauseBtn.style.cssText+"position: relative; overflow: visible;",this.element.appendChild(this.pauseBtn),this.element.appendChild(this.scoreElement),this.element.appendChild(this.levelElement),this.element.appendChild(this.livesElement),this.element.appendChild(this.progressBar),this.element.appendChild(this.audioBtn),this.pauseBtn.addEventListener("click",e=>{e.stopPropagation(),this.togglePause()}),this.audioBtn.addEventListener("click",e=>{e.stopPropagation(),this.toggleAudio()})}togglePause(){this.isPaused=!this.isPaused,this.pauseBtn.innerHTML=this.isPaused?"▶️":"⏸️",this.pauseBtn.style.opacity=this.isPaused?"0.8":"1",this.onPauseToggle(this.isPaused)}toggleAudio(){this.audioEnabled=!this.audioEnabled;const e=this.audioBtn.querySelector(".mute-indicator"),t=this.audioBtn.querySelector(".audio-icon");e&&t&&(e.style.opacity=this.audioEnabled?"0":"1",t.style.opacity=this.audioEnabled?"1":"0.6"),this.onAudioToggle()}updateScore(e){this.scoreElement.innerHTML=`Score<br>${e}`}updateLevel(e){this.levelElement.innerHTML=`Level<br>${e}`}updateLives(e){const t=[];for(let s=0;s<3;s++)t.push(s<e?"❤️":"🤍");this.livesElement.innerHTML=t.join(" ")}updateProgress(e){this.progressFill.style.width=`${e}%`,e>=80?this.progressFill.style.background="linear-gradient(90deg, #32CD32, #228B22)":e>=50?this.progressFill.style.background="linear-gradient(90deg, #FFD700, #FFA500)":e>=20?this.progressFill.style.background="linear-gradient(90deg, #FF8C00, #FF6347)":this.progressFill.style.background="linear-gradient(90deg, #FF4500, #DC143C)"}updatePauseState(e){this.isPaused=e,this.pauseBtn.innerHTML=this.isPaused?"▶️":"⏸️",this.pauseBtn.style.opacity=this.isPaused?"0.8":"1"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}const v=class v{constructor(){a(this,"enabled",!0);a(this,"audioContext",null);a(this,"initialized",!1);a(this,"useHTML5Audio",!1);a(this,"audioElements",new Map);this.detectAudioSupport(),this.setupMobileAudioInit()}detectAudioSupport(){const e=/iPad|iPhone|iPod/.test(navigator.userAgent),t=/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);this.useHTML5Audio=e&&t,console.log("Audio method:",this.useHTML5Audio?"HTML5 Audio":"Web Audio API"),this.useHTML5Audio&&this.createHTML5Sounds()}createHTML5Sounds(){["catch","miss","levelup","gameover","click"].forEach(t=>{const s=new Audio;s.preload="auto";const i=this.getSoundFrequency(t),n=this.getSoundDuration(t);s.src=this.createBeepDataURL(i,n),s.volume=.3,this.audioElements.set(t,s)})}getSoundFrequency(e){return{catch:800,miss:200,levelup:1e3,gameover:150,click:600}[e]||440}getSoundDuration(e){return{catch:.1,miss:.2,levelup:.3,gameover:.5,click:.05}[e]||.1}createBeepDataURL(e,t){const i=Math.floor(8e3*t),n=new ArrayBuffer(44+i*2),l=new DataView(n),o=(h,u)=>{for(let p=0;p<u.length;p++)l.setUint8(h+p,u.charCodeAt(p))};o(0,"RIFF"),l.setUint32(4,36+i*2,!0),o(8,"WAVE"),o(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,1,!0),l.setUint32(24,8e3,!0),l.setUint32(28,8e3*2,!0),l.setUint16(32,2,!0),l.setUint16(34,16,!0),o(36,"data"),l.setUint32(40,i*2,!0);for(let h=0;h<i;h++){const u=Math.sin(2*Math.PI*e*h/8e3)*.3*32767;l.setInt16(44+h*2,u,!0)}const c=new Blob([n],{type:"audio/wav"});return URL.createObjectURL(c)}static getInstance(){return v.instance||(v.instance=new v),v.instance}setupMobileAudioInit(){const e=/iPad|iPhone|iPod/.test(navigator.userAgent),t=()=>m(this,null,function*(){this.initialized||(console.log("Initializing audio for mobile, iOS detected:",e),yield this.init(),this.initialized=!0,e&&setTimeout(()=>m(this,null,function*(){try{yield this.playUnlockSound()}catch(s){console.warn("Additional iOS unlock failed:",s)}}),200),document.removeEventListener("touchstart",t),document.removeEventListener("click",t))});document.addEventListener("touchstart",t,{once:!0}),document.addEventListener("click",t,{once:!0})}play(e){return m(this,null,function*(){if(this.enabled)try{if(this.useHTML5Audio){const l=this.audioElements.get(e);if(l){l.currentTime=0;const o=l.play();o&&(yield o),console.log("HTML5 Audio played:",e)}return}if(this.initialized||(yield this.init(),this.initialized=!0),(!this.audioContext||this.audioContext.state==="closed")&&(this.audioContext=new(window.AudioContext||window.webkitAudioContext)),this.audioContext.state==="suspended"&&(yield this.audioContext.resume()),this.audioContext.state!=="running"){console.warn("AudioContext not running, skipping sound");return}const t=this.audioContext.createOscillator(),s=this.audioContext.createGain();t.connect(s),s.connect(this.audioContext.destination);const n={catch:{freq:800,duration:.1},miss:{freq:200,duration:.2},levelup:{freq:1e3,duration:.3},gameover:{freq:150,duration:.5},click:{freq:600,duration:.05}}[e];if(!n)return;t.frequency.value=n.freq,t.type="sine",s.gain.setValueAtTime(0,this.audioContext.currentTime),s.gain.linearRampToValueAtTime(.3,this.audioContext.currentTime+.01),s.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+n.duration),t.start(),t.stop(this.audioContext.currentTime+n.duration)}catch(t){console.warn("Audio playback failed:",t)}})}toggle(){return this.enabled=!this.enabled,this.enabled}isEnabled(){return this.enabled}init(){return m(this,null,function*(){try{this.audioContext||(this.audioContext=new(window.AudioContext||window.webkitAudioContext)),this.audioContext.state==="suspended"&&(yield this.audioContext.resume()),this.initialized||(yield this.playUnlockSound())}catch(e){console.warn("Audio initialization failed:",e)}})}playUnlockSound(){return m(this,null,function*(){try{if(!this.audioContext||this.audioContext.state!=="running")return;const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.connect(t),t.connect(this.audioContext.destination),e.frequency.value=440,e.type="sine",t.gain.setValueAtTime(.001,this.audioContext.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+.01),e.start(),e.stop(this.audioContext.currentTime+.01),console.log("iOS audio unlock sound played")}catch(e){console.warn("iOS audio unlock failed:",e)}})}};a(v,"instance");let f=v;const A=Object.freeze(Object.defineProperty({__proto__:null,AudioManager:f},Symbol.toStringTag,{value:"Module"}));class j{constructor(e){a(this,"container");a(this,"player");a(this,"spawner");a(this,"particles");a(this,"hud");a(this,"gameOverScreen");a(this,"levelTransition");a(this,"pauseOverlay");a(this,"helpModal");a(this,"pauseButton");a(this,"mobileUIBar");a(this,"audioManager",f.getInstance());a(this,"isMobile",window.innerWidth<=1024);a(this,"animationId",0);a(this,"lastTime",0);a(this,"vegetables",[]);a(this,"gameStore",L);a(this,"levelTransitionActive",!1);this.container=e,this.init()}init(){this.player=new q(this.container),this.spawner=new U(this.container),this.particles=new Q(this.container),this.isMobile||(this.hud=new W(this.container)),this.gameOverScreen=new z(this.container,()=>this.restart()),this.levelTransition=new G(this.container),this.pauseOverlay=new $(this.container,()=>this.helpModal.show()),this.helpModal=new T,this.isMobile?this.mobileUIBar=new Y(e=>this.handlePauseToggle(e),()=>this.handleAudioToggle()):this.pauseButton=new K(document.body,e=>this.handlePauseToggle(e)),L.subscribe(e=>this.handleGameStateChange(e)),this.gameLoop(0),this.setupKeyboardControls()}handlePauseToggle(e){const t=this.gameStore.getState();e&&t.gameStatus==="playing"?t.pauseGame():!e&&t.gameStatus==="paused"&&t.resumeGame()}handleAudioToggle(){this.audioManager.toggle()}handleGameStateChange(e){this.isMobile&&this.mobileUIBar?this.mobileUIBar.updatePauseState(e.gameStatus==="paused"):this.pauseButton&&this.pauseButton.updateState(e.gameStatus==="paused"),e.gameStatus==="paused"?this.pauseOverlay.show(()=>this.gameStore.getState().resumeGame()):e.gameStatus==="playing"?this.pauseOverlay.hide():e.gameStatus==="won"&&!this.levelTransitionActive?(this.levelTransitionActive=!0,this.audioManager.play("levelup"),this.clearAllVegetables(),this.levelTransition.show(e.level+1),setTimeout(()=>{this.gameStore.getState().incrementLevel(),this.gameStore.getState().resetForNextLevel(),this.levelTransitionActive=!1},2e3)):e.gameStatus==="lost"&&(this.audioManager.play("gameover"),this.gameOverScreen.show(!1,e.score,e.level))}setupKeyboardControls(){document.addEventListener("keydown",e=>{switch(e.key){case" ":case"Escape":e.preventDefault();const t=this.gameStore.getState();t.gameStatus==="playing"?t.pauseGame():t.gameStatus==="paused"&&t.resumeGame();break;case"r":case"R":const s=this.gameStore.getState();(s.gameStatus==="lost"||s.gameStatus==="won")&&this.restart();break}})}gameLoop(e){const t=e-this.lastTime;this.lastTime=e;const s=this.gameStore.getState();s.gameStatus==="playing"&&!this.levelTransitionActive?(this.update(t),this.render()):s.gameStatus,this.animationId=requestAnimationFrame(i=>this.gameLoop(i))}update(e){const t=this.gameStore.getState();if(t.gameStatus!=="playing"||this.levelTransitionActive)return;const s=this.spawner.update(e,t.level);this.vegetables.push(...s),this.vegetables=this.vegetables.filter(l=>{const o=l.y+l.speed;if(this.gameStore.getState().gameStatus!=="playing"||this.levelTransitionActive)return this.spawner.removeVegetable(l.id),!1;const h=this.player.getBounds();if(this.checkCollision(h,S(w({},l),{y:o}))){this.audioManager.play("catch"),t.updateScore(l.points),this.particles.createCatchEffect(l.x,o),this.spawner.removeVegetable(l.id);const u=this.container.querySelector(".capybara-player");return u&&(u.classList.add("capybara-player--catch"),setTimeout(()=>{u.classList.remove("capybara-player--catch")},600)),this.createScorePopup(l.x,o,l.points),!1}return o>this.container.clientHeight?(this.audioManager.play("miss"),t.incrementMissed(),this.spawner.removeVegetable(l.id),!1):(l.y=o,this.spawner.updateVegetablePosition(l),!0)}),this.particles.update();const i=this.gameStore.getState(),n=d.calculateFillPercentage(i.capybaraFillPercentage);this.isMobile&&this.mobileUIBar?(this.mobileUIBar.updateScore(i.score),this.mobileUIBar.updateLevel(i.level),this.mobileUIBar.updateLives(3-i.missedVegetables),this.mobileUIBar.updateProgress(n)):this.hud&&(this.hud.updateScore(i.score),this.hud.updateLevel(i.level),this.hud.updateLives(3-i.missedVegetables),this.hud.updateProgress(n)),this.player.updateFill(n)}render(){this.particles.render()}checkCollision(e,t){const s=d.getVegetableSize(),i=.3,n=Math.max(0,Math.min(e.x+e.width,t.x+s)-Math.max(e.x,t.x)),l=Math.max(0,Math.min(e.y+e.height,t.y+s)-Math.max(e.y,t.y)),c=Math.min(e.width*e.height,s*s)*i;return n*l>=c}clearAllVegetables(){this.vegetables=[],this.spawner.reset()}restart(){this.clearAllVegetables(),this.gameStore.getState().resetGame(),this.gameOverScreen.hide(),this.isMobile&&this.mobileUIBar?(this.mobileUIBar.updateScore(0),this.mobileUIBar.updateLevel(1),this.mobileUIBar.updateLives(3),this.mobileUIBar.updateProgress(0)):this.hud&&(this.hud.updateScore(0),this.hud.updateLevel(1),this.hud.updateLives(3),this.hud.updateProgress(0)),this.player.updateFill(0)}createScorePopup(e,t,s){const i=document.createElement("div");i.className="score-popup",i.textContent=`+${s}`,i.style.cssText=`
      position: absolute;
      left: ${e}px;
      top: ${t}px;
      color: #FFD700;
      font-weight: bold;
      font-size: 1.2rem;
      pointer-events: none;
      z-index: 1000;
    `,this.container.appendChild(i),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},1e3)}destroy(){this.animationId&&cancelAnimationFrame(this.animationId),this.player.destroy(),this.particles.destroy(),!this.isMobile&&this.hud&&this.hud.destroy(),this.gameOverScreen.destroy(),this.isMobile&&this.mobileUIBar?this.mobileUIBar.destroy():this.pauseButton&&this.pauseButton.destroy()}}class X{constructor(e){a(this,"element");a(this,"audioManager",f.getInstance());const t=e.querySelector(".audio-toggle");t&&t.remove(),this.createElement(),e.appendChild(this.element)}createElement(){this.element=document.createElement("button"),this.element.className="audio-toggle",this.element.innerHTML="🔊",this.element.style.cssText=`
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
    `,this.element.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault(),this.toggleAudio()}),this.element.addEventListener("touchend",e=>{e.stopPropagation(),e.preventDefault(),this.toggleAudio()}),this.element.addEventListener("mouseenter",()=>{this.element.style.transform="scale(1.1)"}),this.element.addEventListener("mouseleave",()=>{this.element.style.transform="scale(1)"})}toggleAudio(){return m(this,null,function*(){try{const e=this.audioManager.toggle();this.element.innerHTML=e?"🔊":"🔇",this.element.style.opacity=e?"1":"0.6",e&&(yield this.audioManager.init(),yield this.audioManager.play("click"))}catch(e){console.warn("Audio toggle failed:",e)}})}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class Z{constructor(){a(this,"gameEngine",null);a(this,"container");a(this,"helpModal");a(this,"_audioToggle");this.init()}init(){this.loadSVGSprites(),this.container=document.createElement("div"),this.container.className="capybara-game",this.helpModal=new T,window.innerWidth>1024&&(this._audioToggle=new X(document.body)),this.showInstructions(),document.body.appendChild(this.container)}loadSVGSprites(){const e=`
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
    `,t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t)}showInstructions(){const e=document.createElement("div");e.className="start-modal-overlay",e.innerHTML=`
      <div class="start-modal">
        <h1 class="start-modal__title">🦫 Capybara Catcher</h1>
        <p class="start-modal__subtitle">Help the hungry capybara catch falling vegetables!</p>
        <div class="start-modal__info">
          <p><strong>Controls:</strong> <span class="desktop-only">Mouse/Keys/</span>Touch</p>
          <p><strong>Goal:</strong> Fill capybara to 100%</p>
          <p><strong>Warning:</strong> Don't miss 3 vegetables!</p>
        </div>
        <div class="start-modal__help desktop-only">
          <button id="helpButton" class="help-btn">🥕 Vegetable Guide</button>
        </div>
        <button id="startGame" class="start-btn">
          <span class="start-btn__icon">🎮</span>
          <span class="start-btn__text-full">Start Game</span>
          <span class="start-btn__text-short">Start</span>
        </button>
      </div>
    `,this.container.appendChild(e);const t=e.querySelector("#startGame"),s=()=>{e.remove(),this.startGame()},i=l=>m(this,null,function*(){l&&l.preventDefault();try{const o=(yield B(()=>m(this,null,function*(){const{AudioManager:c}=yield Promise.resolve().then(()=>A);return{AudioManager:c}}),void 0)).AudioManager.getInstance();yield o.init(),yield new Promise(c=>setTimeout(c,100)),yield o.play("click"),console.log("Audio initialized successfully for iOS")}catch(o){console.warn("Audio initialization failed:",o)}s()});t.removeAttribute("style"),t.addEventListener("click",i),t.addEventListener("touchend",i);const n=e.querySelector("#helpButton");n&&n.addEventListener("click",()=>{this.helpModal.show()}),t.addEventListener("click",()=>{}),n.addEventListener("click",()=>{}),e.addEventListener("touchmove",l=>{l.preventDefault()}),e.addEventListener("click",l=>{l.stopPropagation()})}startGame(){this.gameEngine&&this.gameEngine.destroy(),this.gameEngine=new j(this.container)}}document.addEventListener("DOMContentLoaded",()=>{new Z});window.addEventListener("resize",()=>{const r=document.querySelector(".particle-canvas"),e=document.querySelector(".capybara-game");r&&e&&(r.width=e.clientWidth,r.height=e.clientHeight)});
//# sourceMappingURL=index-BVR3G8MR.js.map
