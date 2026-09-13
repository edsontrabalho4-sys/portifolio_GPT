/* EA / VOO 08 — renderizador puro. O progresso vem da rolagem, nunca de um vídeo.
   A mesma classe também gera a prévia entregue com o projeto. */
(() => {
  'use strict';
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const mix=(a,b,t)=>a+(b-a)*t;
  const ease=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
  const TAU=Math.PI*2;
  function stateAt(p,w,h){
    const mobile=w<700,approach=ease(0,.22,p),leave=ease(.71,.97,p);
    const radius=Math.min(w*(mobile?.29:.255),h*.32,365)*(1+ease(.43,.7,p)*.12);
    const planet={x:w*(mobile?.66:.74),y:h*(mobile?.43:.43),radius};
    const ship={x:mix(w*(mobile?.22:.2),w*(mobile?.24:.235),approach),y:h*(mobile?.17:.29),size:Math.min(w*(mobile?.34:.2),280)*(1+approach*.07)};
    const aim=Math.atan2(planet.y-ship.y,planet.x-ship.x);
    ship.angle=mix(aim,-.28,leave);ship.x=mix(ship.x,w*1.4,leave);ship.y=mix(ship.y,-h*.18,leave);
    ship.alpha=1-ease(.87,1,p);ship.size*=1-leave*.35;
    const nose={x:ship.x+Math.cos(ship.angle)*ship.size*.463-Math.sin(ship.angle)*ship.size*.011,
      y:ship.y+Math.sin(ship.angle)*ship.size*.463+Math.cos(ship.angle)*ship.size*.011};
    const target={x:planet.x-Math.cos(aim)*radius*.88,y:planet.y-Math.sin(aim)*radius*.88};
    return {p,planet,ship,nose,target,
      charge:ease(.1,.25,p)*(1-ease(.34,.43,p)),beam:ease(.245,.28,p)*(1-ease(.43,.51,p)),shot:ease(.25,.335,p),
      heat:ease(.335,.53,p),cracks:ease(.38,.53,p)*(1-ease(.64,.77,p)),split:ease(.52,.86,p),
      burst:ease(.53,.9,p),entry:ease(-.35,0,p),fade:1-ease(.87,.99,p),reveal:ease(.84,.97,p),
      caption:1-ease(.27,.43,p),phase:p<.1?0:p<.335?1:p<.52?2:p<.84?3:4,
    };
  }
  function mesh(count){
    const pieces=[],vertex=(i,outer)=>{const a=i/count*TAU,r=outer?1.13:.43+Math.sin((i%count)*4.1)*.08;return [Math.cos(a)*r,Math.sin(a)*r];};
    for(let i=0;i<count;i++){
      const a=vertex(i,false),b=vertex(i+1,false),c=vertex(i,true),d=vertex(i+1,true);
      for(const v of [[[0,0],a,b],[a,c,d],[a,d,b]]){
        const x=v.reduce((s,p)=>s+p[0],0)/3,y=v.reduce((s,p)=>s+p[1],0)/3,n=pieces.length;
        pieces.push({v,x,y,angle:Math.atan2(y,x),reach:1.5+(n%7)*.29,spin:Math.sin(n*3.7)*1.1});
      }
    }return pieces;
  }
  function makeRoute(aboutTop,skillsTop,end,w,h){
    const start=Math.max(0,aboutTop-h*.86),span=Math.max(1,end-start);
    const at=(value,a,b)=>clamp(value,start+span*a,start+span*b);
    const arrival=stateAt(0,w,h).ship;
    return [
      {at:start,x:w*.84,y:h*.65},
      {at:at(aboutTop+h*.2,.13,.33),x:w*.92,y:h*.43},
      {at:at(skillsTop-h*.26,.4,.62),x:w*.52,y:h*.14},
      {at:at(skillsTop+h*.43,.67,.8),x:w*.08,y:h*.5},
      {at:start+span*.92,x:w*.13,y:h*.3},
      {at:end,x:arrival.x,y:arrival.y},
    ];
  }
  function routePoint(route,at){
    at=clamp(at,route[0].at,route[route.length-1].at);
    let i=0;while(i<route.length-2&&at>route[i+1].at)i++;
    const a=route[i],b=route[i+1],t=ease(a.at,b.at,at);
    return {x:mix(a.x,b.x,t),y:at+mix(a.y,b.y,t)};
  }
  function flightAt(route,at,w,h){
    const end=route.at(-1).at,point=routePoint(route,at),before=routePoint(route,at-4);
    const join=ease(route[4].at,end,at),arrival=stateAt(0,w,h).ship;
    // A nave inclina sem ficar de ponta-cabeça nas curvas do percurso.
    const bank=clamp((point.x-before.x)*.014,-.19,.19);
    const turnSpan=(end-route[0].at)*.035;
    const turnLeft=ease(route[1].at-turnSpan,route[1].at+turnSpan,at);
    const turnRight=ease(route[3].at-turnSpan,route[3].at+turnSpan,at);
    return {x:point.x,y:point.y-at,angle:mix(bank,arrival.angle,join),size:arrival.size,
      alpha:ease(route[0].at,route[0].at+h*.23,at),facing:1-2*turnLeft+2*turnRight};
  }
  class SpaceRenderer{
    constructor(canvas,assets,makeCanvas){
      this.canvas=canvas;this.ctx=canvas.getContext('2d');this.w=1;this.h=1;this.assets=assets;
      this.meshes={desktop:mesh(14),mobile:mesh(9)};
      this.stars=Array.from({length:250},(_,i)=>({x:((i*731)%997)/997,y:((i*419)%991)/991,r:.4+(i%5)*.16,a:.16+(i%7)*.075}));
      this.debris=Array.from({length:120},(_,i)=>({angle:i*2.3999632297,reach:.5+((i*73)%101)/90,size:1+i%4}));
      this.ship=makeCanvas(1024,342);const lit=this.ship.getContext('2d');
      lit.filter='brightness(1.3) contrast(1.05)';lit.drawImage(assets.ship,0,0,1024,342);
      this.redEarth=makeCanvas(768,768);const red=this.redEarth.getContext('2d');
      red.filter='grayscale(1) contrast(1.3)';red.drawImage(assets.earth,0,0,768,768);
      red.filter='none';red.globalCompositeOperation='multiply';red.fillStyle='#ff2539';red.fillRect(0,0,768,768);
    }
    resize(w,h,ratio=1){
      this.w=w;this.h=h;ratio=Math.min(ratio,1.5);
      this.canvas.width=Math.round(w*ratio);this.canvas.height=Math.round(h*ratio);
      this.ctx.setTransform(ratio,0,0,ratio,0,0);
    }
    clear(){this.ctx.clearRect(0,0,this.w,this.h);}
    glow(x,y,r,color,alpha=1){
      if(alpha<=0||r<=0)return;const c=this.ctx;c.save();c.globalAlpha*=alpha;
      const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(130,0,22,0)');
      c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.restore();
    }
    drawShip(pose,thrust=1){
      const c=this.ctx,s=pose.size;c.save();c.globalAlpha*=pose.alpha;
      c.translate(pose.x,pose.y);c.rotate(pose.angle);if(pose.facing!==undefined)c.scale(pose.facing,1);
      this.glow(-s*.4,0,s*.29,'rgba(255,28,56,.6)');
      const g=c.createLinearGradient(-s*(1.2+thrust*.3),0,-s*.36,0);
      g.addColorStop(0,'rgba(245,0,48,0)');g.addColorStop(.58,'rgba(242,16,50,.14)');g.addColorStop(.88,'rgba(255,83,94,.8)');g.addColorStop(1,'#fff0d9');
      c.lineCap='round';c.strokeStyle=g;
      for(const y of [-s*.035,s*.022]){
        c.lineWidth=s*.023;c.beginPath();c.moveTo(-s*(1+thrust*.32),y);c.lineTo(-s*.46,y);c.stroke();
        c.lineWidth=s*.005;c.stroke();
      }
      c.drawImage(this.ship,-s*.5,-s/6,s,s/3);c.restore();
    }
    trail(route,at,offset=0){
      const c=this.ctx,start=Math.max(route[0].at,at-this.h*1.1),count=this.w<700?30:50;
      let prev=routePoint(route,start);c.save();c.lineCap='round';
      for(let i=1;i<=count;i++){
        const point=routePoint(route,mix(start,at,i/count)),a=i/count;
        c.beginPath();c.moveTo(prev.x,prev.y-at-offset);c.lineTo(point.x,point.y-at-offset);
        c.lineWidth=4+a*12;c.strokeStyle='rgba(255,20,51,'+(a*.075)+')';c.stroke();
        c.lineWidth=1+a*2;c.strokeStyle='rgba(255,97,102,'+(a*.8)+')';c.stroke();prev=point;
      }c.restore();
    }
    flight(route,at){
      this.clear();if(at<route[0].at||at>route.at(-1).at)return;
      this.trail(route,at);this.drawShip(flightAt(route,at,this.w,this.h),1.4);
    }
    sky(state){
      const c=this.ctx,w=this.w,h=this.h,p=state.p;
      c.fillStyle='#020204';c.fillRect(0,0,w,h);
      this.glow(w*.73,h*.42,w*.65,'rgba(100,10,37,.32)');
      this.glow(w*.08,h*.95,h*.8,'rgba(92,5,16,.2)');
      const count=w<700?100:this.stars.length;
      for(let i=0;i<count;i++){
        const star=this.stars[i],x=(star.x*w+(star.x-.5)*p*45+w)%w,y=(star.y*h+(star.y-.5)*p*25+h)%h;
        c.fillStyle='rgba(225,231,245,'+star.a*(1-state.heat*.3)+')';c.beginPath();c.arc(x,y,star.r,0,TAU);c.fill();
      }
      c.fillStyle='rgba(134,0,19,'+(state.heat*.13+Math.sin(state.burst*Math.PI)*.22)+')';c.fillRect(0,0,w,h);
    }
    planet(state){
      const c=this.ctx,{x,y,radius:r}=state.planet,p=state.p,split=state.split;
      const pieces=ease(.52,.56,p),scatter=Math.pow(split,1.35),diameter=r*2.2;
      c.save();c.globalCompositeOperation='screen';c.globalAlpha=state.entry*state.fade;
      this.glow(x,y,r*1.33,state.heat>.5?'rgba(251,19,36,.32)':'rgba(77,111,197,.17)');
      c.globalAlpha=state.entry*(1-pieces)*(1-state.heat);c.drawImage(this.assets.earth,x-diameter/2,y-diameter/2,diameter,diameter);
      c.globalAlpha=state.entry*(1-pieces)*state.heat;c.drawImage(this.redEarth,x-diameter/2,y-diameter/2,diameter,diameter);
      const fragments=this.w<700?this.meshes.mobile:this.meshes.desktop;
      for(let i=0;i<fragments.length;i++){
        const part=fragments[i],dx=part.x*r,dy=part.y*r,distance=scatter*r*part.reach;
        c.save();c.translate(x+dx+Math.cos(part.angle)*distance,y+dy+Math.sin(part.angle)*distance*.84);
        c.rotate(part.spin*scatter);const zoom=1+scatter*(i%3)*.13;c.scale(zoom,zoom);
        c.beginPath();c.arc(-dx,-dy,r*.99,0,TAU);c.clip();
        c.beginPath();part.v.forEach(([vx,vy],j)=>{j?c.lineTo(vx*r-dx,vy*r-dy):c.moveTo(vx*r-dx,vy*r-dy);});c.closePath();
        if(pieces>0){
          c.save();c.clip();c.globalAlpha=pieces*state.fade;
          c.drawImage(this.redEarth,-diameter/2-dx,-diameter/2-dy,diameter,diameter);c.restore();
        }
        c.globalAlpha=state.cracks*.64*state.fade;c.strokeStyle='#ff8265';c.lineWidth=1.15;c.stroke();c.restore();
      }
      if(p>=.335&&p<.58){
        const impact=ease(.335,.36,p)*(1-ease(.43,.58,p));
        this.glow(state.target.x,state.target.y,r*.65,'rgba(255,157,118,.88)',impact);
        this.glow(x,y,r*1.1,'rgba(249,37,42,.46)',impact);
      }
      c.restore();
    }
    beam(state){
      if(state.beam<=0)return;const c=this.ctx,{nose,target}=state;
      const x=mix(nose.x,target.x,state.shot),y=mix(nose.y,target.y,state.shot);
      c.save();c.globalAlpha=state.beam;c.lineCap='round';
      for(const [width,color] of [[38,'rgba(238,17,42,.07)'],[19,'rgba(251,35,55,.2)'],[7,'#ff4554'],[2.3,'#fff0d6']]){
        c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(nose.x,nose.y);c.lineTo(x,y);c.stroke();
      }c.restore();
    }
    explosion(state){
      if(state.burst<=0)return;const c=this.ctx,{x,y,radius:r}=state.planet,b=state.burst;
      c.save();c.globalCompositeOperation='screen';
      this.glow(x,y,r*(1+b*5),'rgba(247,7,28,.43)',Math.sin(b*Math.PI));
      for(let i=0;i<3;i++){
        const wave=ease(.53+i*.025,.88+i*.035,state.p);
        c.globalAlpha=(1-wave)*.8;c.lineWidth=i?1.2:3;c.strokeStyle=i?'#ff7180':'#ffe0c8';
        c.beginPath();c.ellipse(x,y,r*(.75+wave*5.4),r*(.2+wave*1.6),-.23,0,TAU);c.stroke();
      }
      const count=this.w<700?48:this.debris.length;
      for(let i=0;i<count;i++){
        const part=this.debris[i],dist=r*(.2+b*5)*part.reach,dx=Math.cos(part.angle),dy=Math.sin(part.angle)*.82;
        const px=x+dx*dist,py=y+dy*dist;
        c.globalAlpha=(1-b)*.9;c.strokeStyle=i%3===0?'#ffd6b3':'#ff4557';c.lineWidth=part.size*.65;
        c.beginPath();c.moveTo(px,py);c.lineTo(px-dx*(8+b*55),py-dy*(8+b*55));c.stroke();
      }c.restore();
    }
    scene(progress,entryPose=null){
      const state=stateAt(progress,this.w,this.h);this.clear();this.sky(state);this.planet(state);this.beam(state);
      if(state.charge>0){
        const {nose,charge}=state;
        this.glow(nose.x,nose.y,22+charge*50,'rgba(255,22,51,.63)',charge);
        this.glow(nose.x,nose.y,4+charge*9,'rgba(255,225,188,.9)',charge);
      }
      if(progress<0){if(entryPose)this.drawShip(entryPose,1.4);}
      else if(progress<1)this.drawShip(state.ship,1.4+ease(.71,.97,progress)*2);
      this.explosion(state);
      return state;
    }
  }
  globalThis.EASpace=Object.freeze({SpaceRenderer,stateAt,makeRoute,routePoint,flightAt});
})();
