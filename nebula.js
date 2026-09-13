/* Nebulosa procedural: filamentos, poeira escura e luz em três camadas em cache.
   Sem PNG de fundo, WebGL ou downloads. O cursor ilumina a própria textura. */
(() => {
  'use strict';
  const cap=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const stops=[
    {x:.76,y:.29,angle:-.30,scale:1,alpha:1.12},
    {x:.18,y:.72,angle:.30,scale:1.12,alpha:.65},
    {x:.82,y:.47,angle:-.62,scale:.92,alpha:1.03},
    {x:.56,y:.27,angle:-.15,scale:1.18,alpha:1.18},
    {x:.62,y:.82,angle:.26,scale:1.26,alpha:1.07},
    {x:.22,y:.45,angle:-.48,scale:1.06,alpha:.74},
  ];
  function layoutAt(progress=0){
    progress=cap(progress,0,stops.length-1);const index=Math.min(Math.floor(progress),stops.length-2);
    const a=stops[index],b=stops[index+1],t=progress-index,s=t*t*(3-2*t),result={};
    for(const key of Object.keys(a))result[key]=a[key]+(b[key]-a[key])*s;
    return result;
  }
  function makeNoise(seed) {
    const grid=new Float32Array(4096);
    let state=seed>>>0;
    for(let i=0;i<grid.length;i++){state=(Math.imul(state,1664525)+1013904223)>>>0;grid[i]=state/4294967296;}
    return (x,y)=>{
      const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
      const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
      const a=grid[((iy&63)<<6)+(ix&63)],b=grid[((iy&63)<<6)+((ix+1)&63)];
      const c=grid[(((iy+1)&63)<<6)+(ix&63)],d=grid[(((iy+1)&63)<<6)+((ix+1)&63)];
      return (a+(b-a)*sx)*(1-sy)+(c+(d-c)*sx)*sy;
    };
  }
  function makeCloud(seed,detail=false) {
    const width=384,height=256;
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d');if(!ctx)return canvas;
    const noise=makeNoise(seed),data=ctx.createImageData(width,height);
    const fbm=(x,y)=>noise(x,y)*.48+noise(x*2.03+7,y*2.03+11)*.26+noise(x*4.1+13,y*4.1+5)*.14+noise(x*8.2,y*8.2)*.08+noise(x*16.5,y*16.5)*.04;
    for(let y=0;y<height;y++)for(let x=0;x<width;x++){
      const u=x/(width-1),v=y/(height-1),wx=u*6.2,wy=v*4;
      const warpX=fbm(wx*.65+3,wy*.65)*2.6,warpY=fbm(wx*.65,wy*.65+9)*2.6;
      const n=fbm(wx+warpX,wy+warpY);
      const spine=.52+Math.sin(u*7+warpY)*.13+Math.sin(u*17)*.025;
      const ribbon=Math.exp(-Math.pow((v-spine)/(detail?.19:.29),2));
      const ridge=Math.pow(1-Math.abs(noise((wx+warpX)*2.8,(wy+warpY)*2.8)*2-1),7);
      const dust=Math.pow(cap((fbm(wx*1.7+19,wy*1.7)-.32)*2.4),2.2);
      const gas=Math.pow(cap((n-.27)*2.35),1.45);
      const density=cap((gas*(detail?.4:.94)+ridge*gas*(detail?1.5:.24))*(1-dust*.87))*ribbon;
      const fade=Math.pow(Math.max(0,Math.sin(u*Math.PI)*Math.sin(v*Math.PI)),.65);
      const heat=cap(density*1.2),i=(y*width+x)*4;
      data.data[i]=detail?148+heat*102:112+heat*122;
      data.data[i+1]=detail?20+heat*48:5+heat*16;
      data.data[i+2]=detail?32+heat*57:14+heat*24;
      data.data[i+3]=Math.round(density*fade*(detail?174:235));
    }
    ctx.putImageData(data,0,0);return canvas;
  }
  class NebulaField {
    constructor(canvas){
      this.canvas=canvas;this.ctx=canvas?.getContext('2d');this.width=1;this.height=1;this.time=0;
      this.presence=0;this.pointerX=.5;this.pointerY=.5;
      this.clouds=this.ctx?[makeCloud(2381),makeCloud(8713),makeCloud(2381,true)]:[];
      this.lightCanvas=document.createElement('canvas');this.lightContext=this.lightCanvas.getContext('2d');
    }
    resize(width,height){
      this.width=Math.max(width,1);this.height=Math.max(height,1);
      if(!this.ctx)return;
      const ratio=Math.min(.6,960/this.width,600/this.height);
      this.canvas.width=Math.max(1,Math.round(this.width*ratio));this.canvas.height=Math.max(1,Math.round(this.height*ratio));
      this.lightCanvas.width=this.canvas.width;this.lightCanvas.height=this.canvas.height;
      this.ctx.setTransform(ratio,0,0,ratio,0,0);
    }
    update(delta,pointer){
      const dt=cap(delta,0,.08);if(!dt)return;
      this.time+=dt;
      const ease=1-Math.exp(-4*dt);
      this.presence+=((pointer.active?1:0)-this.presence)*ease;
      this.pointerX+=(cap(pointer.clientX/this.width)-this.pointerX)*ease;
      this.pointerY+=(cap(pointer.clientY/this.height)-this.pointerY)*ease;
    }
    draw(mix=0,journey=0){
      const ctx=this.ctx;if(!ctx)return;
      const w=this.width,h=this.height,t=this.time;
      ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.fillStyle='#020203';ctx.fillRect(0,0,w,h);
      ctx.globalCompositeOperation='screen';
      const drift=Math.sin(t*.038),look=layoutAt(journey);
      const layers=[
        {x:look.x,y:look.y,angle:look.angle,width:1.58*look.scale,height:1.12*look.scale,alpha:look.alpha},
        {x:1-look.x,y:1-look.y*.7,angle:-look.angle+.16,width:1.24,height:1.05,alpha:look.alpha*.68},
        {x:look.x,y:look.y,angle:look.angle,width:1.58*look.scale,height:1.12*look.scale,alpha:look.alpha*.8},
      ];
      for(let i=0;i<layers.length;i++){
        const layer=layers[i];
        ctx.save();
        ctx.translate(w*layer.x+(this.pointerX-.5)*(i===1?10:18),h*layer.y+drift*(i===1?-10:12));
        ctx.rotate(layer.angle+Math.sin(t*.018)*.018);
        ctx.globalAlpha=cap(layer.alpha*(1-mix*.08));
        const sw=Math.max(w*layer.width,h*.95),sh=Math.max(h*layer.height,w*.64);
        ctx.drawImage(this.clouds[i],-sw/2,-sh/2,sw,sh);
        ctx.restore();
      }
      if(this.presence>.005&&this.lightContext){
        // A máscara reutiliza as nuvens renderizadas: a luz revela filamentos reais.
        const light=this.lightContext,lw=this.lightCanvas.width,lh=this.lightCanvas.height;
        light.globalCompositeOperation='source-over';light.clearRect(0,0,lw,lh);
        light.drawImage(this.canvas,0,0);
        light.globalCompositeOperation='destination-in';
        const x=this.pointerX*lw,y=this.pointerY*lh,r=Math.min(340,Math.max(180,w*.24))*lw/w;
        const mask=light.createRadialGradient(x,y,0,x,y,r);
        mask.addColorStop(0,'rgba(255,255,255,'+this.presence*.95+')');
        mask.addColorStop(.35,'rgba(255,255,255,'+this.presence*.65+')');mask.addColorStop(1,'rgba(255,255,255,0)');
        light.fillStyle=mask;light.fillRect(0,0,lw,lh);
        ctx.globalAlpha=.95;ctx.drawImage(this.lightCanvas,0,0,w,h);
      }
      ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    }
  }
  window.EANebula=Object.freeze({NebulaField,layoutAt});
})();
