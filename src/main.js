(() => {
  const d = document, $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = $('[data-nav]'), burger = $('.burger'), menu = $('#menu');

  /* navbar */
  const solid = () => nav.classList.toggle('solid', scrollY > 40 || menu.classList.contains('open'));
  addEventListener('scroll', solid, { passive: true }); solid();
  const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); d.body.style.overflow = o ? 'hidden' : ''; nav.classList.toggle('menu-open', o); solid(); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('.dd-btn').forEach(b => b.addEventListener('click', () => { const li = b.closest('.has-dd'), o = li.classList.toggle('open'); b.setAttribute('aria-expanded', o); }));
  d.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); $$('.has-dd.open').forEach(li => { li.classList.remove('open'); $('.dd-btn', li).setAttribute('aria-expanded', 'false'); }); } });
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* dialog produk */
  const dlg = $('#pdlg'), raw = $('#pdata');
  if (dlg && raw) {
    const data = JSON.parse(raw.textContent);
    d.addEventListener('click', e => {
      const b = e.target.closest('[data-detail]'); if (!b) return;
      const p = data[b.dataset.detail]; if (!p) return;
      $('#pdi', dlg).src = p.img; $('#pdi', dlg).style.objectPosition = p.pos; $('#pdc', dlg).textContent = p.code; $('#pdt', dlg).textContent = p.n; $('#pdd', dlg).textContent = p.d;
      $('#pds', dlg).innerHTML = p.s.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join(''); $('#pdw', dlg).href = p.w; dlg.showModal();
    });
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }
  /* video */
  const vd = $('#vdlg'), vb = $('.vid');
  if (vd && vb) {
    vb.addEventListener('click', () => { $('.vbox', vd).innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${vb.dataset.yt}?autoplay=1&rel=0" title="${vb.dataset.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; vd.showModal(); });
    vd.addEventListener('close', () => { $('.vbox', vd).innerHTML = ''; });
    vd.addEventListener('click', e => { if (e.target === vd) vd.close(); });
  }

  /* filter + pencarian */
  const grid = $('#pgrid');
  const gsapOk = !!window.gsap && !rm;
  if (grid) {
    let f = 'all'; const q = $('#q'), none = $('#none'), cards = $$('.pcard', grid);
    const run = () => {
      const s = q.value.trim().toLowerCase(); let vis = [];
      cards.forEach(c => { const ok = (f === 'all' || c.dataset.cat === f) && c.dataset.q.includes(s); c.hidden = !ok; if (ok) vis.push(c); });
      none.hidden = vis.length > 0;
      if (gsapOk) gsap.fromTo(vis, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .45, stagger: .04, ease: 'power2.out', overwrite: true, clearProps: 'transform' });
    };
    $$('.chip-b').forEach(b => b.addEventListener('click', () => { f = b.dataset.f; $$('.chip-b').forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); }); run(); }));
    q.addEventListener('input', run);
  }

  /* form -> WhatsApp */
  const form = $('#cform');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault(); const v = Object.fromEntries(new FormData(form)), en = form.dataset.l === '1';
    const m = en ? `Hello, I am ${v.n}${v.c ? ' from ' + v.c : ''}. Interested in: ${v.p}. ${v.m}${v.t ? ' (WhatsApp: ' + v.t + ')' : ''}`
      : `Halo, saya ${v.n}${v.c ? ' dari ' + v.c : ''}. Tertarik pada: ${v.p}. ${v.m}${v.t ? ' (WhatsApp: ' + v.t + ')' : ''}`;
    open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
  });

  /* animasi GSAP */
  if (!window.gsap || !window.ScrollTrigger) { d.documentElement.classList.remove('js'); return; }
  if (rm) return;
  gsap.registerPlugin(ScrollTrigger);
  $$('[data-split]').forEach(h => { h.innerHTML = h.textContent.trim().split(/\s+/).map(w => `<span class="w"><span>${w}</span></span>`).join(' '); });
  const hl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  hl.fromTo('.hero-media img,.phero-bg img', { scale: 1.15 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, 0)
    .fromTo('h1 .w>span', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: .07 }, .2)
    .fromTo('[data-hero]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8, stagger: .12 }, .7);
  $$('[data-par]').forEach(el => gsap.to(el, { yPercent: (parseFloat(el.dataset.par) || .1) * 40, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('[data-img]').forEach(el => {
    const c = d.createElement('i'); c.className = 'cur'; c.style.borderRadius = '16px';
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden'; el.appendChild(c);
    const im = $('.tile-i', el) || $('img', el);
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } })
      .to(c, { yPercent: -101, duration: 1.1, ease: 'power3.inOut' })
      .fromTo(im, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0);
  });
  ScrollTrigger.batch('[data-rv]', { start: 'top 90%', onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, overwrite: true }) });
  const pl = $$('.pl');
  if (pl.length) { gsap.set(pl, { opacity: 0, y: 20 }); ScrollTrigger.batch(pl, { start: 'top 92%', once: true, onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: .8, ease: 'power2.out', stagger: .09, overwrite: true, clearProps: 'transform' }) }); }
  gsap.set('.pcard', { opacity: 0, y: 32 });
  ScrollTrigger.batch('.pcard', { start: 'top 92%', onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .08, overwrite: true, clearProps: 'transform' }) });
  const mm = gsap.matchMedia();
  mm.add('(min-width:1025px)', () => {
    const t = $('.hs-t'); if (!t) return;
    t.style.overflow = 'visible'; t.style.scrollSnapType = 'none';
    const dist = () => Math.max(0, t.scrollWidth - d.documentElement.clientWidth);
    gsap.to(t, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.hs', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .6, invalidateOnRefresh: true } });
    return () => { t.style.overflow = ''; t.style.scrollSnapType = ''; };
  });
})();
