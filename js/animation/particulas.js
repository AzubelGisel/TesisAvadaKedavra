(function(){
    const canvas = document.getElementById('particles-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let stars = [];
    const STAR_COUNT = Math.floor((w*h)/60000);
  
    function rand(min,max){ return Math.random()*(max-min)+min; }
  
    function createStars(){
      stars = [];
      for(let i=0;i<Math.max(40,STAR_COUNT);i++){
        stars.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: rand(0.3,1.6),
          alpha: rand(0.1,0.9),
          dx: rand(-0.02,0.02),
          dy: rand(-0.02,0.02),
          pulse: Math.random()*0.03 + 0.01,
          phase: Math.random()*Math.PI*2
        });
      }
    }
  
    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      createStars();
    }
  
    window.addEventListener('resize', resize);
  
    function draw(){
      ctx.clearRect(0,0,w,h);
      const g = ctx.createLinearGradient(0,0,w,h);
      g.addColorStop(0,'rgba(255,255,255,0.01)');
      g.addColorStop(1,'rgba(0,0,0,0.03)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);
  
      for(let s of stars){
        s.phase += s.pulse;
        const a = 0.4 + Math.abs(Math.sin(s.phase))*0.6 * s.alpha;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,'+a+')';
        ctx.shadowBlur = Math.max(0, s.r*6);
        ctx.shadowColor = 'rgba(255,240,200,0.08)';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
  
        s.x += s.dx;
        s.y += s.dy;
        if(s.x<0) s.x = w;
        if(s.x>w) s.x = 0;
        if(s.y<0) s.y = h;
        if(s.y>h) s.y = 0;
      }
  
      requestAnimationFrame(draw);
    }
  
    resize();
    draw();
  })();
  
  