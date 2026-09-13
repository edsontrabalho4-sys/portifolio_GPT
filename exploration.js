/* Interações locais: inclinação da moldura e capítulos de Sobre. */
(() => {
  'use strict';
  const portrait=document.querySelector('[data-portrait-interaction]');
  const fine=matchMedia('(hover: hover) and (pointer: fine)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const motion=document.querySelector('[data-ea-toggle-motion]');
  let paused=reduce.matches||motion?.getAttribute('aria-pressed')==='true',frame=null,point=null;
  const clamp=(value)=>Math.max(-1,Math.min(1,value));
  function reset(){
    point=null;if(frame!==null)cancelAnimationFrame(frame);frame=null;
    if(!portrait)return;
    for(const [key,value] of [['rx','0deg'],['ry','0deg'],['scale','1'],['light','0']])portrait.style.setProperty('--portrait-'+key,value);
  }
  function update(){
    frame=null;if(paused||!point||!portrait)return;
    const rect=portrait.getBoundingClientRect();if(!rect.width||!rect.height)return;
    const x=clamp((point.x-rect.left)/rect.width*2-1),y=clamp((point.y-rect.top)/rect.height*2-1);
    portrait.style.setProperty('--portrait-rx',(-y*4).toFixed(2)+'deg');portrait.style.setProperty('--portrait-ry',(x*6).toFixed(2)+'deg');
    portrait.style.setProperty('--portrait-scale','1.025');portrait.style.setProperty('--portrait-light','1');
    portrait.style.setProperty('--portrait-x',((x+1)*50).toFixed(2)+'%');portrait.style.setProperty('--portrait-y',((y+1)*50).toFixed(2)+'%');
  }
  portrait?.addEventListener('pointermove',event=>{
    if(paused||!fine.matches||event.pointerType==='touch')return;
    point={x:event.clientX,y:event.clientY};if(frame===null)frame=requestAnimationFrame(update);
  },{passive:true});
  portrait?.addEventListener('pointerleave',reset);
  const chapters=[...document.querySelectorAll('.about-chapter')];
  chapters.forEach(chapter=>{
    chapter.addEventListener('toggle',()=>{if(chapter.open)chapters.forEach(other=>{if(other!==chapter)other.open=false;});});
    chapter.addEventListener('pointermove',event=>{if(paused||event.pointerType==='touch')return;chapter.style.setProperty('--chapter-x',(event.clientX-chapter.getBoundingClientRect().left)+'px');chapter.style.setProperty('--chapter-hover','1');},{passive:true});
    chapter.addEventListener('pointerleave',()=>chapter.style.setProperty('--chapter-hover','0'));
  });
  window.addEventListener('ea:motion',event=>{paused=event.detail.paused;if(paused){reset();chapters.forEach(chapter=>chapter.style.setProperty('--chapter-hover','0'));document.querySelector('[data-document-body]')?.getAnimations?.().forEach(a=>a.cancel());}});
  reduce.addEventListener('change',event=>{paused=event.matches||motion?.getAttribute('aria-pressed')==='true';reset();});
  fine.addEventListener('change',reset);window.addEventListener('blur',reset);window.addEventListener('scroll',reset,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
})();
