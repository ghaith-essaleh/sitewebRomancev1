const intro=document.getElementById('intro');
const beginBtn=document.getElementById('beginBtn');
const body=document.body;

beginBtn.addEventListener('click',()=>{
  intro.classList.add('hide');
  body.classList.add('started');
  for(let i=0;i<12;i++) setTimeout(createPetal,i*100);
});

const petals=document.getElementById('petals');
function createPetal(){
  const p=document.createElement('span');
  p.className='petal';
  p.textContent=Math.random()>.35?'♡':'✦';
  p.style.left=Math.random()*100+'vw';
  p.style.fontSize=(10+Math.random()*14)+'px';
  p.style.animationDuration=(5+Math.random()*7)+'s';
  p.style.animationDelay=(Math.random()*.4)+'s';
  petals.appendChild(p);
  setTimeout(()=>p.remove(),13000);
}
setInterval(()=>{if(body.classList.contains('started')) createPetal()},900);

const envelope=document.getElementById('envelope');
const openLetter=document.getElementById('openLetter');
const overlay=document.getElementById('letterOverlay');
openLetter.addEventListener('click',()=>{
  envelope.classList.toggle('open');
  openLetter.innerHTML=envelope.classList.contains('open')?'Read the letter ✦':'Open my letter ♡';
  if(envelope.classList.contains('open')) setTimeout(()=>overlay.classList.add('open'),1100);
});

document.getElementById('closeLetter').addEventListener('click',()=>overlay.classList.remove('open'));
overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.classList.contains('overlay-backdrop')) overlay.classList.remove('open')});

const after=document.getElementById('afterLetter');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible')});
},{threshold:.2});
observer.observe(after);

document.getElementById('loveBtn').addEventListener('click',()=>{
  const msg=document.getElementById('magicMessage');
  msg.classList.remove('show'); void msg.offsetWidth; msg.classList.add('show');
  for(let i=0;i<30;i++) setTimeout(createPetal,i*45);
});

document.getElementById('soundBtn').addEventListener('click',function(){
  this.classList.toggle('active');
  this.innerHTML=this.classList.contains('active')?'♫ <span>music on</span>':'♪ <span>sound</span>';
  // Add your own audio file as music.mp3 and uncomment the two lines below.
  // if(!window.loveAudio) window.loveAudio=new Audio('music.mp3');
  // this.classList.contains('active') ? loveAudio.play() : loveAudio.pause();
});

// Gentle image reveal on scroll.
const imgs=document.querySelectorAll('.gallery-image,.final-card');
const revealObs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.style.animation='fadeUp 1s ease forwards';revealObs.unobserve(e.target)}
}),{threshold:.15});
imgs.forEach(x=>{x.style.opacity='0';revealObs.observe(x)});
