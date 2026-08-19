// ─── STARS ───
(function(){
  const wrap = document.getElementById('stars');
  if(!wrap) return;
  for(let i=0;i<200;i++){
    const s=document.createElement('div'); s.className='star';
    const sz=Math.random()*2+0.4;
    s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--op:${(Math.random()*0.6+0.08).toFixed(2)};--dur:${(Math.random()*5+2).toFixed(1)}s;--del:${(Math.random()*7).toFixed(1)}s;`;
    wrap.appendChild(s);
  }
  for(let i=0;i<8;i++){
    const s=document.createElement('div'); s.className='star';
    const sz=Math.random()*1.4+0.5;
    s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;background:#c9a84c;--op:${(Math.random()*0.45+0.1).toFixed(2)};--dur:${(Math.random()*6+3).toFixed(1)}s;--del:${(Math.random()*8).toFixed(1)}s;`;
    wrap.appendChild(s);
  }
})();

// ─── LANGUAGE TOGGLE ───
(function(){
  const btn = document.getElementById('lang-toggle');
  if(!btn) return;
  let lang = localStorage.getItem('sg-lang') || 'it';

  function applyLang(l){
    lang = l;
    localStorage.setItem('sg-lang', l);
    document.documentElement.setAttribute('data-lang', l);
    btn.textContent = l==='it' ? 'EN' : 'IT';
    document.querySelectorAll('[data-it]').forEach(el => {
      const val = el.getAttribute('data-'+l);
      if(val !== null) el.innerHTML = val;
    });
  }
  btn.addEventListener('click', () => applyLang(lang==='it'?'en':'it'));
  applyLang(lang); // restore on page load
})();

// ─── SCROLL REVEAL ───
(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
