/* Integração independente: imagens reais no HTML, desenho e rolagem nativos.
   Uma falha nos cartões ou no fundo não impede esta sequência de iniciar. */
(() => {
  'use strict';
  const api=window.EASpace,chapter=document.querySelector('#orbita');
  if(!api||!chapter)return;
  const body=document.body,stage=chapter.querySelector('.space-chapter__stage');
  const sceneCanvas=chapter.querySelector('[data-scene-canvas]'),flightCanvas=document.querySelector('[data-voyage-canvas]');
  const ship=chapter.querySelector('[data-space-ship]'),earth=chapter.querySelector('[data-space-earth]');
  const about=document.querySelector('#sobre'),skills=document.querySelector('#habilidades');
  const motionButton=document.querySelector('[data-ea-toggle-motion]'),resume=chapter.querySelector('[data-space-resume]');
  const instruction=chapter.querySelector('.space-chapter__instruction'),label=chapter.querySelector('[data-orbit-phase]');
  const bar=chapter.querySelector('[data-orbit-progress]'),percentage=chapter.querySelector('[data-orbit-percentage]');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduce.matches||motionButton?.getAttribute('aria-pressed')==='true';
  let ready=false,scene=null,flight=null,frame=null,dirty=true,route=[],width=1,height=1,top=0,span=1,lastY=NaN;
  const lang=()=>document.documentElement.lang==='en'?'en':'pt';
  const copy={
    pt:{phases:['01 / APROXIMAÇÃO','02 / CARREGANDO','03 / IMPACTO','04 / RUPTURA','05 / PROJETOS'],resume:'RETOMAR ANIMAÇÃO',paused:'Animação pausada. Ative para acompanhar a viagem pela rolagem.',scroll:'Role para avançar. Suba a página para voltar no tempo.'},
    en:{phases:['01 / APPROACH','02 / CHARGING','03 / IMPACT','04 / RUPTURE','05 / PROJECTS'],resume:'RESUME ANIMATION',paused:'Animation paused. Enable it to follow the journey as you scroll.',scroll:'Scroll down to advance. Scroll up to go back in time.'},
  };
  const makeCanvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
  function schedule(){
    if(frame!==null||document.hidden)return;
    frame=requestAnimationFrame(()=>{frame=null;render();});
  }
  function measure(){
    width=stage.clientWidth||document.documentElement.clientWidth;height=stage.clientHeight||innerHeight;
    scene.resize(width,height,devicePixelRatio||1);flight.resize(width,height,devicePixelRatio||1);
    // Os dois Canvas têm exatamente o mesmo tamanho visual, inclusive no celular.
    flightCanvas.style.width=width+'px';flightCanvas.style.height=height+'px';
    top=chapter.getBoundingClientRect().top+scrollY;span=Math.max(chapter.offsetHeight-height,1);
    route=api.makeRoute(about.getBoundingClientRect().top+scrollY,skills.getBoundingClientRect().top+scrollY,top,width,height);
    dirty=false;lastY=NaN;
  }
  function render(){
    if(!ready)return;
    if(dirty)measure();
    const y=scrollY;if(lastY===y)return;lastY=y;
    const p=paused?0:(y-top)/span;
    flight.clear();
    if(!paused&&!body.classList.contains('background-only')&&y<top)flight.flight(route,y);
    flightCanvas.classList.toggle('is-flying',!paused&&y>=route[0].at&&y<top);
    if(!paused&&(y+height<top||y>top+span+height))return;
    let entry=null;
    if(p<0){entry=api.flightAt(route,y,width,height);entry.y-=Math.max(0,top-y);}
    const state=scene.scene(Math.max(-.5,Math.min(1.05,p)),entry),text=copy[lang()];
    stage.style.setProperty('--impact',state.heat.toFixed(3));
    stage.style.setProperty('--caption',state.caption.toFixed(3));stage.style.setProperty('--reveal',state.reveal.toFixed(3));
    const progress=Math.max(0,Math.min(1,p));bar.style.transform='scaleX('+progress+')';percentage.textContent=String(Math.round(progress*100)).padStart(3,'0')+'%';
    label.textContent=text.phases[state.phase];chapter.dataset.flightPhase=String(state.phase);
  }
  function sync(){
    body.classList.toggle('space-enhanced',ready&&!paused);body.classList.toggle('space-scene-ready',ready);
    body.classList.toggle('space-paused',paused);resume.hidden=!paused;
    resume.textContent=copy[lang()].resume;instruction.textContent=copy[lang()][paused?'paused':'scroll'];
    dirty=true;schedule();
  }
  function imageReady(image){
    if(image.complete)return image.naturalWidth>0?Promise.resolve():Promise.reject(new Error('Image did not load'));
    return new Promise((resolve,reject)=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',reject,{once:true});});
  }
  Promise.all([imageReady(ship),imageReady(earth)]).then(()=>{
    if(!sceneCanvas.getContext('2d')||!flightCanvas.getContext('2d'))return;
    const assets={ship,earth};scene=new api.SpaceRenderer(sceneCanvas,assets,makeCanvas);flight=new api.SpaceRenderer(flightCanvas,assets,makeCanvas);
    ready=true;sync();
  }).catch(()=>{chapter.querySelector('[data-space-error]').hidden=false;});
  resume.addEventListener('click',()=>{
    if(motionButton?.getAttribute('aria-pressed')==='true')motionButton.click();
    else {paused=false;try{localStorage.setItem('ea-motion','running');}catch{}sync();}
  });
  window.addEventListener('ea:motion',event=>{paused=event.detail.paused;sync();});
  window.addEventListener('ea:language',sync);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
  window.addEventListener('pageshow',()=>{dirty=true;schedule();});
  window.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
  window.addEventListener('pagehide',()=>{if(frame!==null)cancelAnimationFrame(frame);frame=null;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(frame!==null)cancelAnimationFrame(frame);frame=null;}else{dirty=true;schedule();}});
  reduce.addEventListener('change',event=>{paused=event.matches;sync();});
  if(typeof ResizeObserver==='function'){
    const observer=new ResizeObserver(()=>{dirty=true;schedule();});[about,skills,chapter].forEach(el=>observer.observe(el));
  }
  document.fonts?.ready.then(()=>{dirty=true;schedule();});
  sync();
})();
