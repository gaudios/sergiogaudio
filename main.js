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

/* ── MOBILE MENU ── */
(function(){
  // Inject hamburger + mobile menu into every page
  const nav = document.querySelector('nav');
  if(!nav) return;

  // Hamburger button
  const btn = document.createElement('button');
  btn.className = 'hamburger';
  btn.setAttribute('aria-label','Menu');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);

  // Mobile menu overlay
  const menu = document.createElement('div');
  menu.className = 'mobile-menu';

  // Build links from existing nav
  const links = [
    {href:'index.html', it:'Home', en:'Home'},
    {href:'about.html', it:'Chi sono', en:'About'},
    {href:'publications.html', it:'Pubblicazioni', en:'Publications'},
    {href:'research.html', it:'Ricerca', en:'Research'},
    {href:'teaching.html', it:'Insegnamento', en:'Teaching'},
    {href:'passions.html', it:'Passioni', en:'Passions'},
    {href:'contact.html', it:'Contatti', en:'Contact'},
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const lang = localStorage.getItem('sg-lang') || 'it';

  links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.setAttribute('data-it', l.it);
    a.setAttribute('data-en', l.en);
    a.textContent = lang === 'en' ? l.en : l.it;
    if(l.href === currentPage || (currentPage === '' && l.href === 'index.html'))
      a.classList.add('active');
    menu.appendChild(a);
  });

  // Lang toggle in mobile menu
  const langBtn = document.createElement('button');
  langBtn.className = 'lang-btn-mob';
  langBtn.textContent = lang === 'en' ? 'IT' : 'EN';
  langBtn.addEventListener('click', () => {
    document.getElementById('lang-toggle')?.click();
    langBtn.textContent = (localStorage.getItem('sg-lang')||'it') === 'en' ? 'IT' : 'EN';
    menu.querySelectorAll('a[data-it]').forEach(a => {
      const l2 = localStorage.getItem('sg-lang') || 'it';
      a.textContent = l2 === 'en' ? a.getAttribute('data-en') : a.getAttribute('data-it');
    });
  });
  menu.appendChild(langBtn);
  document.body.appendChild(menu);

  // Toggle
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
