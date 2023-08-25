for (let i=0; i<100; i++){
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
  document.querySelector('.bgLines').appendChild(p);
	gsap.set(p, {
    x:450,
    scaleY:0,    
    skewX:-20,
    svgOrigin:'300 300',
    attr:{
      d:'M0,0 0,600',
      stroke:'#ddd',//'hsl(3,100,60)', 
      'stroke-width':2,
      'stroke-dasharray':'9,0'
    }
  });
}

const tl = gsap.timeline()
.from('path', { // marching ants
  attr:{'stroke-dashoffset':(i,t,a)=>{
      const n = gsap.utils.wrapYoyo(1, a.length/2, i)
      return (9*n/a.length)+(10*n/a.length)
  }},
  repeat:-1,
  ease:'none'
}, 0)
.to('path', { // scale up
  duration:1,
  scaleY:1,
  ease:'power2.inOut'
}, 0)
.to('path', { // change stroke color
  duration:2.6,
  ease:'expo',
  attr:{
    stroke:(i,t,a)=>{
      const n = 50-gsap.utils.wrapYoyo(1, 50, i)
      return 'hsl(3,'+(n/50*100)+'%,'+gsap.utils.mapRange(1, 50, 39, 60, n)+'%)'
    }
  }
}, 0.5)
.to('path', { // change x-pos
  duration:2,
  ease:'expo.inOut',
  x:gsap.utils.distribute({
    base: 150,
    amount: 600,
    ease:'sine.inOut'
  }),
  attr:{
    'stroke-width':0.5,
    'stroke-dasharray':(i,t,a)=>{
      const n = gsap.utils.wrapYoyo(1, a.length/2, i)
      return (9*n/a.length)+','+(10*n/a.length)
    }
  }
}, 0.9)