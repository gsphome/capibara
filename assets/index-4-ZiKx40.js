var c=Object.defineProperty;var h=(n,e,t)=>e in n?c(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var s=(n,e,t)=>h(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();class d{constructor(){s(this,"level",1);s(this,"score",0);s(this,"missedVegetables",0);s(this,"capybaraFillPercentage",0);s(this,"gameStatus","playing");s(this,"fallSpeed",2);s(this,"ceilingHeight",100);s(this,"vegetables",[]);s(this,"listeners",[])}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notify(){this.listeners.forEach(e=>e())}addVegetable(e){this.vegetables.push(e),this.notify()}removeVegetable(e){this.vegetables=this.vegetables.filter(t=>t.id!==e),this.notify()}incrementLevel(){this.level+=1,this.fallSpeed*=1.15,this.ceilingHeight=Math.max(50,this.ceilingHeight*.9),this.notify()}incrementMissed(){this.missedVegetables+=1,this.missedVegetables>=3&&(this.gameStatus="lost"),this.notify()}updateScore(e){this.score+=e,this.capybaraFillPercentage=Math.min(100,this.capybaraFillPercentage+e),this.capybaraFillPercentage>=100&&(this.gameStatus="won"),this.notify()}resetForNextLevel(){this.capybaraFillPercentage=0,this.missedVegetables=0,this.vegetables=[],this.notify()}resetGame(){this.level=1,this.score=0,this.missedVegetables=0,this.capybaraFillPercentage=0,this.gameStatus="playing",this.fallSpeed=2,this.ceilingHeight=100,this.vegetables=[],this.notify()}pauseGame(){this.gameStatus="paused",this.notify()}resumeGame(){this.gameStatus="playing",this.notify()}}const r=new d;class m{constructor(e){s(this,"element");s(this,"fillElement");s(this,"svgElement");s(this,"x",window.innerWidth/2-40);s(this,"lastX",window.innerWidth/2-40);s(this,"speed",8);s(this,"direction","right");this.createElement(),e.appendChild(this.element),this.setupControls()}createElement(){this.element=document.createElement("div"),this.element.className="capybara-player";const e=document.createElement("div");e.className="capybara-player__body",this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svgElement.setAttribute("class","capybara-player__svg"),this.svgElement.setAttribute("viewBox","0 0 80 60");const t=document.createElementNS("http://www.w3.org/2000/svg","use");t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#capybara-right"),this.svgElement.appendChild(t),this.fillElement=document.createElement("div"),this.fillElement.className="capybara-player__fill",this.fillElement.style.cssText=`
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(45deg, #32CD32, #228B22);
      border-radius: 50% 50% 40% 40%;
      transition: height 0.3s ease;
    `,e.appendChild(this.fillElement),e.appendChild(this.svgElement),this.element.appendChild(e),this.updatePosition()}setupControls(){document.addEventListener("keydown",t=>{switch(t.key){case"ArrowLeft":case"a":case"A":this.moveLeft();break;case"ArrowRight":case"d":case"D":this.moveRight();break}}),document.addEventListener("mousemove",t=>{this.x=Math.max(0,Math.min(window.innerWidth-100,t.clientX-50)),this.updatePosition()});let e=!1;document.addEventListener("touchstart",t=>{e=!0,t.preventDefault()},{passive:!1}),document.addEventListener("touchmove",t=>{if(!e)return;const l=t.touches[0];this.x=Math.max(0,Math.min(window.innerWidth-100,l.clientX-50)),this.updatePosition(),t.preventDefault()},{passive:!1}),document.addEventListener("touchend",()=>{e=!1})}moveLeft(){this.x=Math.max(0,this.x-this.speed),this.updatePosition()}moveRight(){this.x=Math.min(window.innerWidth-100,this.x+this.speed),this.updatePosition()}updatePosition(){this.element.style.left=`${this.x}px`;const e=this.x>this.lastX?"right":this.x<this.lastX?"left":this.direction;if(e!==this.direction){this.direction=e;const t=this.svgElement.querySelector("use");t&&t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#capybara-${this.direction}`),this.element.classList.add("capybara-player--running"),setTimeout(()=>{this.element.classList.remove("capybara-player--running")},300)}this.lastX=this.x}updateFill(e){this.fillElement.style.height=`${e}%`,e>=80?this.fillElement.style.background="linear-gradient(45deg, #FFD700, #FFA500)":e>=50&&(this.fillElement.style.background="linear-gradient(45deg, #ADFF2F, #32CD32)")}getBounds(){return{x:this.x,y:window.innerHeight-95,width:100,height:75}}getX(){return this.x}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class p{constructor(e){s(this,"container");s(this,"spawnTimer",0);s(this,"vegetableTypes",["carrot","broccoli","lettuce","tomato","pepper"]);s(this,"activeVegetables",new Map);this.container=e}update(e,t){this.spawnTimer+=e;const l=Math.max(800,2e3-t*100),i=[];if(this.spawnTimer>=l){const a=this.spawnVegetable(t);i.push(a),this.spawnTimer=0}return i}spawnVegetable(e){const t=this.vegetableTypes[Math.floor(Math.random()*this.vegetableTypes.length)],l=Math.random()*(window.innerWidth-30),i={id:Date.now().toString()+Math.random(),type:t,x:l,y:-30,speed:2+e*.3,points:this.getVegetablePoints(t)};return this.createVegetableElement(i),i}createVegetableElement(e){const t=document.createElement("div");t.className=`vegetable vegetable--${e.type}`,t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.id=e.id;const l=document.createElementNS("http://www.w3.org/2000/svg","svg");l.setAttribute("viewBox","0 0 30 30"),l.setAttribute("width","30"),l.setAttribute("height","30");const i=document.createElementNS("http://www.w3.org/2000/svg","use");i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#${e.type}`),l.appendChild(i),t.appendChild(l),this.container.appendChild(t),this.activeVegetables.set(e.id,t)}updateVegetablePosition(e){const t=this.activeVegetables.get(e.id);t&&(t.style.top=`${e.y}px`)}removeVegetable(e){const t=this.activeVegetables.get(e);t&&t.parentNode&&(t.parentNode.removeChild(t),this.activeVegetables.delete(e))}getVegetablePoints(e){return{carrot:5,broccoli:8,lettuce:3,tomato:6,pepper:10}[e]||5}}class y{constructor(e){s(this,"particles",[]);s(this,"canvas");s(this,"ctx");this.canvas=document.createElement("canvas"),this.canvas.className="particle-canvas",this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.style.position="absolute",this.canvas.style.top="0",this.canvas.style.left="0",this.canvas.style.pointerEvents="none",this.canvas.style.zIndex="15",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight})}createCatchEffect(e,t){for(let l=0;l<8;l++)this.particles.push({x:e+15,y:t+15,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,life:30,maxLife:30,color:`hsl(${Math.random()*60+60}, 70%, 60%)`})}update(){this.particles=this.particles.filter(e=>(e.x+=e.vx,e.y+=e.vy,e.vy+=.1,e.life--,e.life>0))}render(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{const t=e.life/e.maxLife;this.ctx.globalAlpha=t,this.ctx.fillStyle=e.color,this.ctx.fillRect(e.x,e.y,4,4)}),this.ctx.globalAlpha=1}destroy(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}class g{constructor(e){s(this,"element");s(this,"scoreElement");s(this,"levelElement");s(this,"missedElement");s(this,"progressBar");s(this,"progressFill");this.createElement(e),e.appendChild(this.element)}createElement(e){this.element=document.createElement("div"),this.element.className="game-hud",this.scoreElement=document.createElement("div"),this.scoreElement.className="game-hud__score",this.scoreElement.textContent="Score: 0",this.levelElement=document.createElement("div"),this.levelElement.className="game-hud__level",this.levelElement.textContent="Level: 1",this.missedElement=document.createElement("div"),this.missedElement.className="game-hud__missed",this.missedElement.textContent="Missed: 0/3",this.element.appendChild(this.scoreElement),this.element.appendChild(this.levelElement),this.element.appendChild(this.missedElement);const t=document.createElement("div");t.className="progress-bar",this.progressFill=document.createElement("div"),this.progressFill.className="progress-bar__fill",this.progressFill.style.width="0%",t.appendChild(this.progressFill),e.appendChild(t),this.progressBar=t}updateScore(e){this.scoreElement.textContent=`Score: ${e}`}updateLevel(e){this.levelElement.textContent=`Level: ${e}`}updateMissed(e){this.missedElement.textContent=`Missed: ${e}/3`,e>=2&&(this.missedElement.style.color="#ff4444")}updateProgress(e){this.progressFill.style.width=`${e}%`,e>=100&&(this.progressFill.style.background="linear-gradient(90deg, #FFD700, #FFA500)")}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.progressBar.parentNode&&this.progressBar.parentNode.removeChild(this.progressBar)}}class u{constructor(e,t){s(this,"element");s(this,"onRestart");this.onRestart=t,this.createElement(),e.appendChild(this.element)}createElement(){this.element=document.createElement("div"),this.element.className="game-over";const e=document.createElement("h1");e.className="game-over__title";const t=document.createElement("div");t.className="game-over__score";const l=document.createElement("button");l.className="game-over__button",l.textContent="Play Again",l.addEventListener("click",this.onRestart),this.element.appendChild(e),this.element.appendChild(t),this.element.appendChild(l)}show(e,t,l){const i=this.element.querySelector(".game-over__title"),a=this.element.querySelector(".game-over__score");e?(i.textContent="🎉 You Win! 🎉",i.style.color="#FFD700",a.textContent=`Capybara is full! Final Score: ${t} (Level ${l})`):(i.textContent="💔 Game Over 💔",i.style.color="#FF4444",a.textContent=`Too many vegetables missed! Final Score: ${t} (Level ${l})`),this.element.style.display="flex"}hide(){this.element.style.display="none"}destroy(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class f{constructor(e){s(this,"element");s(this,"container");this.container=e}show(e){this.createElement(e),this.container.appendChild(this.element),setTimeout(()=>{this.element.classList.add("level-transition--show")},50),setTimeout(()=>{this.hide()},2e3)}createElement(e){this.element=document.createElement("div"),this.element.className="level-transition",this.element.innerHTML=`
      <div class="level-transition__content">
        <h1>Level ${e}</h1>
        <p>Get ready!</p>
      </div>
    `}hide(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class x{constructor(e){s(this,"container");s(this,"player");s(this,"spawner");s(this,"particles");s(this,"hud");s(this,"gameOverScreen");s(this,"levelTransition");s(this,"animationId",0);s(this,"lastTime",0);s(this,"vegetables",[]);this.container=e,this.init()}init(){this.player=new m(this.container),this.spawner=new p(this.container),this.particles=new y(this.container),this.hud=new g(this.container),this.gameOverScreen=new u(this.container,()=>this.restart()),this.levelTransition=new f(this.container),this.gameLoop(0),this.setupKeyboardControls()}setupKeyboardControls(){document.addEventListener("keydown",e=>{switch(e.key){case" ":case"Escape":e.preventDefault(),r.gameStatus==="playing"?r.pauseGame():r.gameStatus==="paused"&&r.resumeGame();break;case"r":case"R":(r.gameStatus==="lost"||r.gameStatus==="won")&&this.restart();break}})}gameLoop(e){const t=e-this.lastTime;this.lastTime=e,r.gameStatus==="playing"&&(this.update(t),this.render()),r.gameStatus==="won"?(this.levelTransition.show(r.level+1),setTimeout(()=>{r.resetForNextLevel(),r.gameStatus="playing"},2e3)):r.gameStatus==="lost"&&this.gameOverScreen.show(!1,r.score,r.level),this.animationId=requestAnimationFrame(l=>this.gameLoop(l))}update(e){const t=this.spawner.update(e,r.level);this.vegetables.push(...t),this.vegetables=this.vegetables.filter(i=>{i.y+=i.speed,this.spawner.updateVegetablePosition(i);const a=this.player.getBounds();if(this.checkCollision(a,i)){r.updateScore(i.points),this.particles.createCatchEffect(i.x,i.y),this.spawner.removeVegetable(i.id);const o=this.container.querySelector(".capybara-player");return o&&(o.classList.add("capybara-player--catch"),setTimeout(()=>{o.classList.remove("capybara-player--catch")},500)),!1}return i.y>window.innerHeight?(r.incrementMissed(),this.spawner.removeVegetable(i.id),!1):!0}),this.particles.update(),this.hud.updateScore(r.score),this.hud.updateLevel(r.level),this.hud.updateMissed(r.missedVegetables),this.hud.updateProgress(r.capybaraFillPercentage),this.player.updateFill(r.capybaraFillPercentage);const l=r.level*100;r.score>=l&&r.capybaraFillPercentage<100&&r.incrementLevel()}render(){this.particles.render()}checkCollision(e,t){return t.x<e.x+e.width&&t.x+30>e.x&&t.y<e.y+e.height&&t.y+30>e.y}restart(){r.resetGame(),this.vegetables.forEach(e=>{this.spawner.removeVegetable(e.id)}),this.vegetables=[],this.gameOverScreen.hide(),this.hud.updateScore(0),this.hud.updateLevel(1),this.hud.updateMissed(0),this.hud.updateProgress(0),this.player.updateFill(0)}destroy(){this.animationId&&cancelAnimationFrame(this.animationId),this.player.destroy(),this.particles.destroy(),this.hud.destroy(),this.gameOverScreen.destroy()}}class v{constructor(){s(this,"gameEngine",null);s(this,"container");this.init()}init(){this.loadSVGSprites(),this.container=document.createElement("div"),this.container.className="capybara-game",this.showInstructions(),document.body.appendChild(this.container)}loadSVGSprites(){const e=`
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
      <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 20px; max-width: 400px; text-align: center;">
        <h1 style="font-size: 2.5rem; margin: 0 0 1rem 0;">🦫 Capybara Catcher</h1>
        <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">Help the hungry capybara catch falling vegetables!</p>
        <div style="margin: 1rem 0; font-size: 1rem;">
          <p><strong>Controls:</strong></p>
          <p>🖱️ Mouse: Move to follow cursor</p>
          <p>⌨️ Keyboard: Arrow keys or A/D</p>
          <p>📱 Mobile: Touch and drag</p>
        </div>
        <div style="margin: 1.5rem 0; font-size: 1rem;">
          <p><strong>Goal:</strong> Fill the capybara to 100%</p>
          <p><strong>Warning:</strong> Don't miss 3 vegetables!</p>
        </div>
      <button id="startGame" style="
        padding: 16px 32px;
        font-size: 1.4rem;
        background: #32CD32;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 1rem;
        min-height: 60px;
        min-width: 200px;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
      " onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.95)'" ontouchend="this.style.transform='scale(1)'">🎮 Start Game</button>
      </div>
    `,this.container.appendChild(e);const t=e.querySelector("#startGame"),l=()=>{e.remove(),this.startGame()};t.addEventListener("click",l),t.addEventListener("touchend",i=>{i.preventDefault(),l()}),e.addEventListener("touchmove",i=>{i.preventDefault()}),e.addEventListener("click",i=>{i.stopPropagation()})}startGame(){this.gameEngine&&this.gameEngine.destroy(),this.gameEngine=new x(this.container)}}document.addEventListener("DOMContentLoaded",()=>{new v});window.addEventListener("resize",()=>{const n=document.querySelector(".particle-canvas");n&&(n.width=window.innerWidth,n.height=window.innerHeight)});
