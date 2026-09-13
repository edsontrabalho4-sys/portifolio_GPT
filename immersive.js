/* EA — contornos, texto a cada 5 segundos e interações dos cartões.
   Sem bibliotecas externas. Os efeitos usam o mesmo relógio de script.js. */
(() => {
  'use strict';
  const FX = { textInterval:5, textTransition:1.85, edgeRadius:145 };
  const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
  const lerp = (a,b,t) => a+(b-a)*t;
  const smooth = (a,b,v) => { const t=clamp((v-a)/(b-a)); return t*t*(3-2*t); };
  function pointerInPanel(rect,width,height,clientX,clientY) {
    return {x:(clientX-rect.left)*width/rect.width,y:(clientY-rect.top)*height/rect.height};
  }
  function wordFragment(index,count) {
    const side=index/(Math.max(1,count-1))-.5;
    const angle=index*2.3999632297;
    return {x:34+Math.cos(angle)*35,y:Math.sin(angle)*(24+(index%5)*7),rotation:Math.sin(index*4.7)*65,delay:index/Math.max(1,count-1)*.45};
  }
  // Geometria compartilhada entre recorte e contorno; inclui os lados diagonais.
  function framePoints(shape,w,h) {
    const c=Math.min(shape==='small'?9:shape==='button'?12:20,w/5,h/4);
    if(shape==='folder') return [[0,12],[12,0],[w*.36,0],[w*.4,9],[w-14,9],[w,22],[w,h-12],[w-12,h],[12,h],[0,h-12]];
    if(shape==='info') return [[0,0],[w-c,0],[w,c],[w,h],[c,h],[0,h-c]];
    if(shape==='button') return [[c,0],[w,0],[w,h-c],[w-c,h],[0,h],[0,c]];
    return [[c,0],[w-c,0],[w,c],[w,h-c],[w-c,h],[c,h],[0,h-c],[0,c]];
  }
  const body=document.body, motionButton=document.querySelector('[data-ea-toggle-motion]');
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  let muted=motionButton?.getAttribute('aria-pressed')==='true';
  let heroVisible=true;
  const language=() => document.documentElement.lang==='en'?'en':'pt';

  // 1. Painéis: SVG só para o contorno funcional, nunca como imagem do cenário.
  const namespace='http://www.w3.org/2000/svg';
  const panels=new Map(); let frameId=0;
  const svgElement=(tag,attrs={}) => { const el=document.createElementNS(namespace,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));return el; };
  function resizePanel(el) {
    const data=panels.get(el);if(!data)return;
    const w=el.offsetWidth,h=el.offsetHeight;if(w<25||h<25)return;
    const points=framePoints(data.shape,w,h);
    el.style.clipPath='polygon('+points.map(([x,y])=>x+'px '+y+'px').join(',')+')';
    data.svg.setAttribute('viewBox','0 0 '+w+' '+h);
    const d=points.map(([x,y],i)=>(i?'L':'M')+(1+x*(w-2)/w).toFixed(2)+' '+(1+y*(h-2)/h).toFixed(2)).join(' ')+' Z';
    data.paths.forEach(path=>path.setAttribute('d',d));el.classList.add('fx-ready');
  }
  const panelResize=typeof ResizeObserver==='function'?new ResizeObserver(entries=>entries.forEach(e=>resizePanel(e.target))):null;
  function registerPanels() {
    const selectors=[
      ['.hud-window,.cut-panel:not(.biography):not(.availability),.detail-panel,.project-copy','panel',false],
      ['.biography,.availability','panel',true],
      ['.folder-tab','folder',true],['.skill-card,.contact-link','small',true],
      ['.info-list>div','info',true],['.info-icon','small',false],['.button--resume,.button--solid','button',false],
      ['.skills-workspace,.skill-document','panel',false],
    ];
    for(const [selector,shape,float] of selectors) document.querySelectorAll(selector).forEach(el=>{
      if(panels.has(el))return;
      el.classList.add('fx-panel');if(float)el.classList.add('fx-float');
      const svg=svgElement('svg',{'class':'panel-frame','aria-hidden':'true',focusable:'false',preserveAspectRatio:'none'});
      const defs=svgElement('defs'),id='ea-edge-'+(++frameId);
      const gradient=svgElement('radialGradient',{id,gradientUnits:'userSpaceOnUse',cx:0,cy:0,r:FX.edgeRadius});
      [[0,'#ffd0d0',1],[.12,'#ff3b42',1],[.46,'#f51422',.85],[1,'#f51422',0]].forEach(([offset,color,opacity])=>gradient.append(svgElement('stop',{offset,'stop-color':color,'stop-opacity':opacity})));
      defs.append(gradient);
      const base=svgElement('path',{'class':'panel-frame__base'}),halo=svgElement('path',{'class':'panel-frame__halo',stroke:'url(#'+id+')'}),light=svgElement('path',{'class':'panel-frame__light',stroke:'url(#'+id+')'});
      svg.append(defs,base,halo,light);
      const sheen=document.createElement('span');sheen.className='panel-sheen';sheen.setAttribute('aria-hidden','true');
      el.append(sheen,svg);panels.set(el,{svg,paths:[base,halo,light],gradient,shape,active:false,float,x:0,y:0});
      el.addEventListener('pointerenter',event=>{const d=panels.get(el);d.x=event.clientX;d.y=event.clientY;d.active=!muted&&fine.matches&&event.pointerType!=='touch';});
      el.addEventListener('pointermove',event=>{
        const d=panels.get(el);if(muted||!fine.matches||event.pointerType==='touch')return;
        d.x=event.clientX;d.y=event.clientY;d.active=true;
      },{passive:true});
      el.addEventListener('pointerleave',()=>resetPanel(el));
      resizePanel(el);panelResize?.observe(el);
    });
    for(const [el] of panels) if(!el.isConnected){panelResize?.unobserve(el);panels.delete(el);}
  }
  function resetPanel(el) {
    const d=panels.get(el);if(!d)return;d.active=false;
    el.style.setProperty('--fx-active','0');
  }
  function updatePanels() {
    // Primeiro todas as leituras; depois as escritas. A escala entra no cálculo.
    const active=[];
    for(const [el,d] of panels) if(d.active)active.push({el,d,rect:el.getBoundingClientRect(),width:el.offsetWidth,height:el.offsetHeight});
    for(const {el,d,rect,width,height} of active) {
      if(!rect.width||!rect.height)continue;
      const {x,y}=pointerInPanel(rect,width,height,d.x,d.y);
      if(x<0||y<0||x>width||y>height){resetPanel(el);continue;}
      d.gradient.setAttribute('cx',x);d.gradient.setAttribute('cy',y);
      d.gradient.setAttribute('r',Math.min(FX.edgeRadius,Math.max(65,Math.min(width,height)*.72)));
      el.style.setProperty('--fx-x',x+'px');el.style.setProperty('--fx-y',y+'px');el.style.setProperty('--fx-active','1');
    }
  }
  registerPanels();
  window.addEventListener('ea:skills-updated',()=>{registerPanels();});

  // 2. Frases. O leitor de tela recebe a descrição estática, sem anúncios a cada letra.
  const phrases={
    pt:['CÓDIGO EM EVOLUÇÃO.','IDEIAS FORA DE ÓRBITA.','CRIATIVIDADE EM AÇÃO.'],
    en:['CODE IN EVOLUTION.','IDEAS BEYOND ORBIT.','CREATIVITY IN MOTION.'],
  };
  const text=document.querySelector('[data-rotator-text]'),textIndex=document.querySelector('[data-rotator-index]');
  const rotator=text?.closest('.role-rotator');
  let phrase=0,textClock=0,transition=-1,wordSwapped=false,letters=[],sparks=[];
  const sparkLayer=document.createElement('span');sparkLayer.className='role-rotator__sparks';sparkLayer.setAttribute('aria-hidden','true');
  rotator?.append(sparkLayer);
  function mountPhrase() {
    if(!text)return;
    const value=phrases[language()][phrase],total=Array.from(value.replaceAll(' ','')).length;
    const content=document.createDocumentFragment();let index=0;letters=[];
    value.split(' ').forEach((word,wordIndex)=>{
      if(wordIndex)content.append(document.createTextNode(' '));
      const group=document.createElement('span');group.className='rotator-word';
      for(const character of word){
        const el=document.createElement('span');el.className='rotator-letter';el.textContent=character;
        letters.push({el,...wordFragment(index++,total)});group.append(el);
      }
      content.append(group);
    });
    text.replaceChildren(content);
    if(textIndex)textIndex.textContent=String(phrase+1).padStart(2,'0')+' / 03';
  }
  function createSparks() {
    sparks=[];const content=document.createDocumentFragment(),count=innerWidth<700?22:40,base=rotator.getBoundingClientRect();
    for(let i=0;i<count;i++){
      const el=document.createElement('i'),angle=i*2.3999632297,letter=letters[Math.min(letters.length-1,Math.floor(i/count*letters.length))],rect=letter.el.getBoundingClientRect();
      el.className='text-spark';el.style.width=(i%3===0?6:2)+'px';
      el.style.left=(rect.left-base.left+rect.width*.5)+'px';el.style.top=(rect.top-base.top+rect.height*.5)+'px';
      sparks.push({el,x:Math.cos(angle)*(30+i%7*9)+20,y:Math.sin(angle)*(20+i%6*6),delay:letter.delay});content.append(el);
    }
    sparkLayer.replaceChildren(content);
  }
  function resetText() {
    textClock=0;transition=-1;wordSwapped=false;rotator?.classList.remove('is-changing');
    sparkLayer.replaceChildren();sparks=[];mountPhrase();
  }
  function updateText(dt) {
    if(!text||!heroVisible)return;
    textClock+=dt;
    if(textClock>=FX.textInterval&&transition<0){
      textClock%=FX.textInterval;transition=0;wordSwapped=false;createSparks();rotator.classList.add('is-changing');
    }
    if(transition<0)return;
    transition+=dt;
    if(transition>=.84&&!wordSwapped){phrase=(phrase+1)%3;mountPhrase();wordSwapped=true;}
    for(const letter of letters){
      const start=(wordSwapped?.87:0)+letter.delay;
      const progress=smooth(start,start+(wordSwapped?.4:.34),transition);
      const scatter=wordSwapped?1-progress:1-Math.pow(1-progress,3);
      const alpha=wordSwapped?progress:1-smooth(.08,.31,transition-letter.delay);
      const distance=wordSwapped?.65:1;
      letter.el.style.transform='translate('+ (letter.x*scatter*distance).toFixed(2)+'px,'+(letter.y*scatter*distance).toFixed(2)+'px) rotate('+(letter.rotation*scatter).toFixed(2)+'deg) scale('+(1+scatter*.25).toFixed(3)+')';
      letter.el.style.opacity=alpha.toFixed(3);
    }
    for(const spark of sparks){
      const blast=clamp((transition-spark.delay)/.55),travel=1-Math.pow(1-blast,3);
      spark.el.style.transform='translate('+(spark.x*travel).toFixed(2)+'px,'+(spark.y*travel).toFixed(2)+'px) scale('+(1-blast*.65).toFixed(3)+')';
      spark.el.style.opacity=(Math.sin(blast*Math.PI)*.9).toFixed(3);
    }
    if(transition>=FX.textTransition){
      transition=-1;rotator.classList.remove('is-changing');sparkLayer.replaceChildren();sparks=[];
      letters.forEach(({el})=>{el.style.removeProperty('transform');el.style.removeProperty('opacity');});
    }
  }
  resetText();
  if(typeof IntersectionObserver==='function'){
    new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;}).observe(document.querySelector('#inicio'));
    const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.dataset.revealed='true';reveals.unobserve(entry.target);}
    }),{threshold:.08});
    document.querySelectorAll('.section-heading,.project-row,.about-composition,.skills-window').forEach(el=>{
      el.classList.add('fx-reveal');el.dataset.revealed='false';reveals.observe(el);
    });
  }

  function syncMotion(event){
    muted=event?.detail?.paused ?? (motionButton?.getAttribute('aria-pressed')==='true');
    body.classList.toggle('motion-muted',muted);
    if(muted){panels.forEach((_,el)=>resetPanel(el));resetText();}
  }
  window.addEventListener('ea:motion',syncMotion);
  window.addEventListener('ea:frame',event=>{
    if(muted||document.hidden)return;
    updatePanels();updateText(event.detail.delta);
  });
  window.addEventListener('blur',()=>panels.forEach((_,el)=>resetPanel(el)));
  window.addEventListener('resize',()=>{if(!panelResize)panels.forEach((_,el)=>resizePanel(el));},{passive:true});
  window.addEventListener('ea:language',resetText);
  syncMotion();
})();
