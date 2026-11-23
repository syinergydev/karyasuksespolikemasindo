import fs from 'node:fs'; import path from 'node:path';
import { FLAGS, SITE, CATS, PRODUCTS, CERTS, PARTNERS, FIVE_R } from './src/data.mjs';
import { S } from './src/i18n.mjs';

const OUT = 'dist';
const R = { home: ['', 'en'], about: ['tentang-kami', 'en/about'], products: ['produk', 'en/products'], certs: ['sertifikasi', 'en/certifications'], articles: ['artikel', 'en/articles'], contact: ['kontak', 'en/contact'] };
CATS.forEach(c => R['cat-' + c.k] = ['produk/' + c.k, 'en/products/' + c.k]);
const DIM = { 'hero-gedung': [1672, 941], 'gedung-lebar': [1800, 720], tim: [1600, 800], mesin: [1600, 900], roll: [600, 400], 'produk-semua': [1600, 878], 'prod-pe': [470, 460], 'prod-hdpe': [660, 340], 'prod-flex': [390, 350], 'prod-pp': [450, 550], 'prod-custom': [350, 290], ...Object.fromEntries(PARTNERS.map(p => ['mitra-' + p, [300, 300]])) };
let L = 0, DIR = '', KEY = '';
const t = k => S[k][L], pk = a => a[L], esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const up = () => path.posix.relative(DIR || '.', '.');
const A = f => (up() ? up() + '/' : '') + 'assets/' + f;
const u = (k, l = L) => { const r = path.posix.relative(DIR || '.', R[k][l] || '.'); return (r ? r + '/' : '') + 'index.html'; };
const img = (n, alt, cls = '', o = {}) => { const d = DIM[n]; return `<img src="${A('img/' + n + '.webp')}" alt="${esc(alt)}"${d ? ` width="${d[0]}" height="${d[1]}"` : ''}${o.eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${cls ? ` class="${cls}"` : ''}${o.pos ? ` style="object-position:${o.pos}"` : ''}>`; };
const ic = { wa: '<path d="M21 12a9 9 0 01-13.3 7.9L3 21l1.2-4.6A9 9 0 1121 12z"/>', mail: '<path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M22 6l-10 7L2 6"/>', pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>', tel: '<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/>', yt: '<path d="M22.5 7.2a2.5 2.5 0 00-1.8-1.8C19.1 5 12 5 12 5s-7.1 0-8.7.4A2.5 2.5 0 001.5 7.2C1 8.8 1 12 1 12s0 3.2.5 4.8a2.5 2.5 0 001.8 1.8C4.9 19 12 19 12 19s7.1 0 8.7-.4a2.5 2.5 0 001.8-1.8c.5-1.6.5-4.8.5-4.8s0-3.2-.5-4.8z"/><path d="M10 15l5-3-5-3z"/>', chev: '<path d="M6 9l6 6 6-6"/>' };
const svg = (n, s = 20) => `<svg class="ic" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ic[n]}</svg>`;
const wa = m => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(m)}`;
const note = s => FLAGS.DEMO_NOTES ? `<p class="demo-note">${s}</p>` : '';
const eyebrow = (s, c = '') => `<p class="eyebrow ${c}">${s}</p>`;
const crumb = (...a) => `<nav class="crumb" aria-label="Breadcrumb"><a href="${u('home')}">${t('home')}</a>${a.map(([l, k]) => ` <span aria-hidden="true">/</span> ${k ? `<a href="${u(k)}">${l}</a>` : `<span aria-current="page">${l}</span>`}`).join('')}</nav>`;

/* ---------- komponen ---------- */
const header = () => {
  const li = (k, l) => `<li><a href="${u(k)}"${KEY === k ? ' aria-current="page"' : ''}>${t(l)}</a></li>`;
  return `<header class="nav" data-nav><div class="wrap nav-in">
<a class="brand" href="${u('home')}"><img src="${A('img/logo-horizontal.webp')}" alt="${SITE.name}" width="157" height="39"></a>
<nav id="menu" class="menu" aria-label="${L ? 'Main' : 'Utama'}"><ul>${li('home', 'home')}${li('about', 'about')}
<li class="has-dd"><a href="${u('products')}"${KEY.startsWith('cat-') || KEY === 'products' ? ' aria-current="page"' : ''}>${t('products')}</a><button class="dd-btn" type="button" aria-expanded="false" aria-controls="dd" aria-label="${t('sub')}">${svg('chev', 16)}</button>
<ul id="dd" class="dd">${CATS.map(c => `<li><a href="${u('cat-' + c.k)}"><b>${c.code}</b><span>${pk(c.tag)}</span></a></li>`).join('')}</ul></li>
${li('certs', 'certs')}${li('articles', 'articles')}${li('contact', 'contact')}</ul>
<div class="lang" role="group" aria-label="Language"><a href="${u(KEY, 0)}" lang="id" hreflang="id"${L === 0 ? ' aria-current="true"' : ''}>ID</a><a href="${u(KEY, 1)}" lang="en" hreflang="en"${L === 1 ? ' aria-current="true"' : ''}>EN</a></div>
<a class="btn btn-p nav-cta" href="${u('contact')}">${t('cta')}</a></nav>
<button class="burger" type="button" aria-label="${t('menu')}" aria-expanded="false" aria-controls="menu"><span></span><span></span></button></div></header>`;
};
const social = () => [['wa', t('wa'), wa(L ? 'Hello, I would like to ask about your products' : 'Halo, saya ingin bertanya tentang produk KSP')], ['mail', t('email'), 'mailto:' + SITE.email], ['pin', t('maps'), SITE.maps], ['yt', t('yt'), SITE.youtube]]
  .map(([i, l, h]) => `<a class="soc" href="${h}" target="_blank" rel="noopener" aria-label="${l}" title="${l}">${svg(i, 22)}</a>`).join('')
  + Object.entries(SITE.socials).filter(([, v]) => v).map(([k, v]) => `<a class="soc" href="${v}" target="_blank" rel="noopener" aria-label="${k}" title="${k}"><b aria-hidden="true">${{ instagram: 'IG', facebook: 'FB', tiktok: 'TT', linkedin: 'in' }[k]}</b></a>`).join('');
const footer = () => `<footer class="foot"><div class="wrap foot-g" data-rv>
<div><img class="foot-logo" src="${A('img/logo-horizontal.webp')}" alt="${SITE.name}" width="157" height="39" loading="lazy"><p>${t('fDesc')}</p><div class="socs">${social()}</div></div>
<nav aria-label="${t('fNav')}"><h2>${t('fNav')}</h2><ul>${['home', 'about', 'products', 'certs', 'articles', 'contact'].map(k => `<li><a href="${u(k)}">${t(k)}</a></li>`).join('')}</ul></nav>
<nav aria-label="${t('fCat')}"><h2>${t('fCat')}</h2><ul>${CATS.map(c => `<li><a href="${u('cat-' + c.k)}">${c.code}</a></li>`).join('')}</ul></nav>
<div><h2>${t('fCon')}</h2><address><p>${SITE.address}</p><p><a href="tel:${SITE.phoneTel}">${SITE.phone}</a></p><p><a href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener">WhatsApp ${SITE.waLabel}</a></p><p><a href="mailto:${SITE.email}">${SITE.email}</a></p></address></div></div>
<div class="wrap foot-b"><p>© ${new Date().getFullYear()} ${SITE.name}. ${t('rights')}</p></div></footer>`;
const dialogs = () => `<dialog id="pdlg" aria-labelledby="pdt"><form method="dialog"><button class="x" aria-label="${t('close')}">×</button></form><div class="dl-img"><img alt="" id="pdi"></div><div class="dl-b"><span class="chip" id="pdc"></span><h2 id="pdt"></h2><p id="pdd"></p><dl id="pds"></dl><p class="fine">${t('priceNote')} ${t('specNote')}</p><a id="pdw" class="btn btn-p" target="_blank" rel="noopener">${t('quote')}</a></div></dialog>`;
const sectionHead = (ey, h, p = '', c = '') => `<div class="sh ${c}" data-rv>${eyebrow(ey, c)}<h2>${h}</h2>${p ? `<p class="lead">${p}</p>` : ''}</div>`;
const phero = (title, sub, bg, crumbs) => `<section class="phero"><div class="phero-bg" data-par=".1">${img(bg, '', '', { eager: true })}</div><div class="wrap phero-in">${crumbs}<h1 data-split>${title}</h1><p class="lead">${sub}</p></div></section>`;
const ctaBand = (h = t('ctaH')) => `<section class="cta"><div class="cta-bg">${img('mesin', '')}</div><div class="wrap cta-in" data-rv><h2>${h}</h2><div class="btns"><a class="btn btn-w" href="${wa(L ? 'Hello, I would like a consultation about packaging' : 'Halo, saya ingin konsultasi kebutuhan kemasan')}" target="_blank" rel="noopener">${t('ctaB1')}</a><a class="btn btn-o" href="${u('products')}">${t('ctaB2')}</a></div></div></section>`;
const certItem = c => `<figure class="cl">${img('cert-' + c.k, pk(c.n))}<figcaption>${pk(c.n)}</figcaption></figure>`;
const marquee = (items, label) => `<div class="marq" role="group" aria-label="${label}"><div class="marq-t">${items}</div><div class="marq-t" aria-hidden="true">${items}</div></div>`;
const certStrip = () => `<section class="sec grey"><div class="wrap">${sectionHead(t('certEy'), t('certH'), t('certP'))}</div>${marquee(CERTS.map(certItem).join(''), t('certH'))}<div class="wrap strip-f" data-rv><a class="btn btn-s" href="${u('certs')}">${t('certAll')}</a><p class="fine">${t('certNote')}</p></div></section>`;
const PNAME = { garudafood: 'Garudafood', ubm: 'UBM Biscuits', bernofarm: 'Bernofarm', rosebrand: 'Rose Brand', kokola: 'Kokola', japfa: 'Japfa', siantartop: 'Siantar Top', pokphand: 'Pokphand', finna: 'Finna' };
const partners = () => FLAGS.SHOW_PARTNERS ? `<section class="sec part" id="mitra" aria-labelledby="part-h"><div class="wrap"><div class="sh" data-rv><h2 id="part-h">${esc(t('partH'))}</h2><p class="lead">${t('partP')}</p></div>
<ul class="pgrid-l" role="list">${PARTNERS.map(p => `<li class="pl">${img('mitra-' + p, PNAME[p] || p)}</li>`).join('')}</ul>${note(t('partNote')).replace('demo-note', 'demo-note part-note')}</div></section>` : '';
const pcard = (p, i) => { const c = CATS.find(x => x.k === p.c), nm = pk(p.n); return `<article class="pcard" data-cat="${p.c}" data-q="${esc((nm + ' ' + c.code).toLowerCase())}"><div class="pimg">${img(p.img, nm, '', { pos: p.pos })}</div><div class="pbody"><span class="chip">${c.code}</span><h3>${nm}</h3><p class="meta">${p.m ? `${t('thick')}: ${p.m} ${t('micron')}` : pk(c.tag)}</p><div class="acts"><button class="btn btn-s" type="button" data-detail="${i}">${t('detail')}</button><a class="btn btn-p" href="${wa(t('waQ') + ' ' + nm)}" target="_blank" rel="noopener">${t('quote')}</a></div></div></article>`; };
const pdata = list => `<script type="application/json" id="pdata">${JSON.stringify(Object.fromEntries(list.map(p => { const c = CATS.find(x => x.k === p.c); return [PRODUCTS.indexOf(p), { n: pk(p.n), code: c.code, img: A('img/' + p.img + '.webp'), pos: p.pos, d: pk(c.desc), s: [...(p.m ? [[t('thick'), `${p.m} ${t('micron')}`]] : []), ...c.specs.map(([a, b]) => [pk(a), pk(b)])], w: wa(t('waQ') + ' ' + pk(p.n)) }]; })))}</script>`;

/* ---------- shell ---------- */
const shell = ({ title, desc, body, og = 'hero-gedung', extra = '' }) => {
  const abs = l => `${FLAGS.SITE_URL}/${R[KEY][l] ? R[KEY][l] + '/' : ''}`;
  return `<!doctype html><html lang="${L ? 'en' : 'id'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)} | ${SITE.short} — ${SITE.name}</title><meta name="description" content="${esc(desc)}">${FLAGS.DEMO_NOTES ? '<meta name="robots" content="noindex">' : ''}
<meta name="theme-color" content="#061A38"><link rel="canonical" href="${abs(L)}"><link rel="alternate" hreflang="id" href="${abs(0)}"><link rel="alternate" hreflang="en" href="${abs(1)}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)} | ${SITE.short}"><meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="${FLAGS.SITE_URL}/assets/img/${og}.webp"><meta property="og:locale" content="${L ? 'en_US' : 'id_ID'}">
<link rel="icon" href="${A('img/favicon.png')}"><link rel="preload" as="font" type="font/woff2" href="${A('fonts/outfit-latin-wght-normal.woff2')}" crossorigin><link rel="stylesheet" href="${A('style.css')}">
<script>document.documentElement.classList.add('js')</script>${extra}</head><body>
<a class="skip" href="#main">${t('skip')}</a>${header()}<main id="main">${body}</main>${footer()}
<script src="${A('vendor/gsap.min.js')}" defer></script><script src="${A('vendor/ScrollTrigger.min.js')}" defer></script><script src="${A('main.js')}" defer></script></body></html>`;
};
const ld = () => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, url: FLAGS.SITE_URL, logo: `${FLAGS.SITE_URL}/assets/img/logo-globe.png`, email: SITE.email, telephone: SITE.phoneTel, address: { '@type': 'PostalAddress', streetAddress: 'Jl. Gempol Bypass, Sejo, Winong', addressLocality: 'Gempol', addressRegion: 'Jawa Timur', postalCode: '67155', addressCountry: 'ID' } })}</script>`;

/* ---------- halaman ---------- */
const pages = {
  home: () => ({ title: t('seoHome'), desc: t('heroP'), extra: ld(), body: `
<section class="hero"><div class="hero-media" data-par=".12">${img('hero-gedung', L ? 'KSP production facility in Gempol, Pasuruan' : 'Fasilitas produksi KSP di Gempol, Pasuruan', '', { eager: true })}</div>
<div class="wrap hero-in">${eyebrow(t('heroTag'), 'light')}<h1 data-split>${t('heroH')}</h1><p class="lead light" data-hero>${t('heroP')}</p>
<div class="btns" data-hero><a class="btn btn-w" href="${u('products')}">${t('explore')}</a><a class="btn btn-o" href="${u('contact')}">${t('cta')}</a></div></div><span class="scroll" aria-hidden="true">${t('scroll')}</span></section>
<section class="sec"><div class="wrap prof"><div class="prof-m"><figure class="rv" data-img>${img('gedung-lebar', L ? 'KSP facility glass facade' : 'Fasad kaca fasilitas KSP', 'cover')}<figcaption>${t('cap1')}</figcaption></figure><div class="prof-s" data-img data-par="-.08">${img('roll', L ? 'Plastic film roll' : 'Gulungan film plastik')}</div></div>
<div class="prof-t" data-rv>${eyebrow(t('profEy'))}<h2>${t('profH')}</h2><p class="lead">${t('profP1')}</p><p>${t('profP2')}</p>
<dl class="facts"><div><dt>${t('fLoc')}</dt><dd>Gempol, Pasuruan</dd></div><div><dt>${t('fMat')}</dt><dd>PP · PE · HD</dd></div><div><dt>${t('fMkt')}</dt><dd>${t('fMktV')}</dd></div></dl><a class="btn btn-p" href="${u('about')}">${t('learn')}</a></div></div></section>
<section class="sec grey"><div class="wrap">${sectionHead(t('catEy'), t('catH'))}<div class="bento">${CATS.map(c => `<a class="tile t-${c.k}" href="${u('cat-' + c.k)}" data-img><span class="tile-i">${img(c.img, pk(c.name))}</span><span class="tile-b"><b>${c.code}</b><span>${pk(c.tag)}</span><em>${t('viewProd')} →</em></span></a>`).join('')}</div></div></section>
<section class="sec dark"><div class="wrap qual"><div class="qual-h">${sectionHead(t('qEy'), t('qH'), '', 'light')}</div><ol class="qual-l">${S.q.map((q, i) => `<li data-rv><span class="num">0${i + 1}</span><div><h3>${pk(q[0])}</h3><p>${pk(q[1])}</p></div></li>`).join('')}</ol></div></section>
<section class="sec"><div class="wrap">${sectionHead(t('vsEy'), t('vsH'))}<div class="trio"><figure data-img class="tr-a">${img('tim', t('cap2'), 'cover')}<figcaption>${t('cap2')}</figcaption></figure><figure data-img class="tr-b">${img('mesin', t('cap3'), 'cover')}<figcaption>${t('cap3')}</figcaption></figure><figure data-img class="tr-c">${img('produk-semua', t('cap4'), 'cover')}<figcaption>${t('cap4')}</figcaption></figure></div></div></section>
${certStrip()}${partners()}
<section class="sec"><div class="wrap">${sectionHead(t('vidEy'), t('vidH'))}<button class="vid" type="button" data-yt="${SITE.youtubeId}" data-title="${t('vidT')}" aria-label="${t('vidB')}">${img('gedung-lebar', '', 'cover')}<span class="play" aria-hidden="true"></span><span class="vid-l">${t('vidB')}</span></button></div></section>
${ctaBand()}
<dialog id="vdlg" aria-label="${t('vidT')}"><form method="dialog"><button class="x" aria-label="${t('close')}">×</button></form><div class="vbox"></div></dialog>` }),

  about: () => ({ title: t('about'), desc: t('aboutSub'), body: `${phero(t('aboutH'), t('aboutSub'), 'hero-gedung', crumb([t('about')]))}
<section class="sec"><div class="wrap prof"><div class="prof-m"><figure class="rv" data-img>${img('tim', t('cap2'), 'cover')}<figcaption>${t('cap2')}</figcaption></figure></div><div class="prof-t" data-rv>${eyebrow(t('profEy'))}<h2>${t('profH')}</h2><p class="lead">${t('profP1')}</p><p>${t('profP2')}</p></div></div></section>
<section class="sec grey"><div class="wrap two" data-rv><div>${eyebrow(t('histH'))}<h2>${t('histH')}</h2><p>${t('histP')}</p>${note(t('histNote'))}</div><div class="vm"><div><h3>${t('visH')}</h3><p>${t('vis')}</p></div><div><h3>${t('misH')}</h3><ol class="mis">${S.mis.map(m => `<li>${pk(m)}</li>`).join('')}</ol></div></div></div></section>
<section class="sec dark"><div class="wrap">${sectionHead(t('rEy'), t('rH'), t('rP'), 'light')}<ol class="five">${FIVE_R.map((r, i) => `<li data-rv><span class="num">R${i + 1}</span><h3>${r[0]}</h3><p>${r[2 + L]}</p></li>`).join('')}</ol></div></section>
<section class="sec"><div class="wrap">${sectionHead(t('qEy'), t('qH'))}<ol class="qual-l light-l">${S.q.map((q, i) => `<li data-rv><span class="num">0${i + 1}</span><div><h3>${pk(q[0])}</h3><p>${pk(q[1])}</p></div></li>`).join('')}</ol></div></section>
<section class="sec grey"><div class="wrap prof flip"><div class="prof-t" data-rv>${eyebrow(t('facH'))}<h2>${t('facH')}</h2><p class="lead">${t('facP')}</p><a class="btn btn-s" href="${u('contact')}">${t('cta')}</a></div><div class="prof-m"><figure data-img>${img('gedung-lebar', t('cap1'), 'cover')}<figcaption>${t('cap1')}</figcaption></figure></div></div></section>
<section class="hs" aria-label="${t('galH')}"><div class="wrap"><h2 data-rv>${t('galH')}</h2></div><div class="hs-t">${[['gedung-lebar', 'cap1'], ['tim', 'cap2'], ['mesin', 'cap3'], ['produk-semua', 'cap4']].map(([n, c]) => `<figure>${img(n, t(c), 'cover')}<figcaption>${t(c)}</figcaption></figure>`).join('')}</div></section>
${certStrip()}${partners()}${ctaBand()}` }),

  products: () => ({ title: t('prodH'), desc: t('prodSub'), body: `${phero(t('prodH'), t('prodSub'), 'produk-semua', crumb([t('products')]))}
<section class="sec"><div class="wrap"><div class="tools"><div class="chips" role="group" aria-label="${t('fCat')}"><button type="button" class="chip-b on" data-f="all" aria-pressed="true">${t('all')}</button>${CATS.map(c => `<button type="button" class="chip-b" data-f="${c.k}" aria-pressed="false">${c.code}</button>`).join('')}</div><label class="srch"><span class="sr">${t('search')}</span><input type="search" id="q" placeholder="${t('searchPh')}" autocomplete="off"></label></div>
<div class="pgrid" id="pgrid">${PRODUCTS.map((p, i) => pcard(p, i)).join('')}</div><p id="none" class="none" hidden>${t('none')}</p><p class="fine">${t('priceNote')} ${t('ph')}</p>${note(t('specNote'))}</div></section>${ctaBand()}${dialogs()}${pdata(PRODUCTS)}` }),

  certs: () => ({ title: t('certPageH'), desc: t('certPageSub'), body: `${phero(t('certPageH'), t('certPageSub'), 'gedung-lebar', crumb([t('certs')]))}
<section class="sec"><div class="wrap"><ul class="cgrid">${CERTS.map(c => `<li data-rv>${certItem(c).replace('<figcaption>' + pk(c.n) + '</figcaption>', '')}<div><h3>${pk(c.n)}</h3><p>${pk(c.d)}</p>${note(t('certVal'))}</div></li>`).join('')}</ul><p class="fine" data-rv>${t('certNote')}</p></div></section>${ctaBand()}` }),

  articles: () => ({ title: t('artH'), desc: t('artSub'), body: `${phero(t('artH'), t('artSub'), 'tim', crumb([t('articles')]))}
<section class="sec"><div class="wrap empty" data-rv><h2>${t('artEmpty')}</h2><p class="lead">${t('artEmptyP')}</p><a class="btn btn-p" href="${u('contact')}">${t('cta')}</a></div></section>` }),

  contact: () => ({ title: t('contact'), desc: t('conSub'), body: `${phero(t('conH'), t('conSub'), 'hero-gedung', crumb([t('contact')]))}
<section class="sec"><div class="wrap two"><div data-rv><ul class="cinfo"><li>${svg('pin', 24)}<div><h3>${t('addr')}</h3><p>${SITE.address}</p><a href="${SITE.maps}" target="_blank" rel="noopener">${t('openMaps')}</a></div></li><li>${svg('wa', 24)}<div><h3>WhatsApp</h3><p>${SITE.waLabel}</p><a href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener">${t('chatWa')}</a></div></li><li>${svg('tel', 24)}<div><h3>${t('phone')}</h3><p><a href="tel:${SITE.phoneTel}">${SITE.phone}</a></p></div></li><li>${svg('mail', 24)}<div><h3>Email</h3><p>${SITE.email}</p><a href="mailto:${SITE.email}">${t('sendMail')}</a></div></li>${FLAGS.SHOW_HOURS ? `<li><div><p>${t('hrs')}</p></div></li>` : ''}</ul><div class="socs">${social()}</div></div>
<form class="form" id="cform" data-rv data-wa="${SITE.wa}" data-l="${L}"><h2>${t('fHead')}</h2><label for="f1">${t('fName')}</label><input id="f1" name="n" required autocomplete="name"><label for="f2">${t('fCo')}</label><input id="f2" name="c" autocomplete="organization"><label for="f3">${t('fTel')}</label><input id="f3" name="t" type="tel" autocomplete="tel"><label for="f4">${t('fInt')}</label><select id="f4" name="p">${CATS.map(c => `<option>${c.code}</option>`).join('')}</select><label for="f5">${t('fMsg')}</label><textarea id="f5" name="m" rows="4" required></textarea><button class="btn btn-p" type="submit">${t('fSend')}</button><p class="fine">${t('fNote')}</p></form></div></section>
<section class="map" data-rv><iframe title="${t('mapT')}" src="${SITE.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></section>` }),
};
CATS.forEach(c => pages['cat-' + c.k] = () => { const list = PRODUCTS.filter(p => p.c === c.k); return {
  title: pk(c.name), desc: pk(c.desc), og: c.img, body: `${phero(pk(c.name), pk(c.tag), c.img, crumb([t('products'), 'products'], [c.code]))}
<section class="sec"><div class="wrap two" data-rv><div>${eyebrow(c.code)}<h2>${pk(c.tag)}</h2><p class="lead">${pk(c.desc)}</p></div><div><h3 class="h3s">${t('advH')}</h3><ol class="mis adv">${c.adv.map(a => `<li>${pk(a)}</li>`).join('')}</ol></div></div></section>
<section class="sec grey"><div class="wrap">${sectionHead(c.code, t('showH'))}<div class="pgrid">${list.map(p => pcard(p, PRODUCTS.indexOf(p))).join('')}</div><p class="fine">${t('ph')}</p></div></section>
<section class="sec"><div class="wrap two"><div data-rv><h2>${t('specH')}</h2><table class="spec"><tbody>${c.specs.map(([a, b]) => `<tr><th scope="row">${pk(a)}</th><td>${pk(b)}</td></tr>`).join('')}</tbody></table><p class="fine">${t('specNote')}</p></div><div class="wacta" data-rv><p class="lead">${t('waCta')}</p><a class="btn btn-p" href="${wa(t('waMsg') + ' ' + c.code)}" target="_blank" rel="noopener">${svg('wa', 18)} ${t('waCta')}</a></div></div></section>
<section class="sec grey"><div class="wrap">${sectionHead('', t('relH'))}<div class="rel">${CATS.filter(x => x.k !== c.k).map(x => `<a href="${u('cat-' + x.k)}" class="relc"><b>${x.code}</b><span>${pk(x.tag)}</span></a>`).join('')}</div></div></section>${ctaBand()}${dialogs()}${pdata(list)}` }; });

/* ---------- tulis ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
const urls = [];
for (const key of Object.keys(pages)) for (const l of [0, 1]) {
  L = l; KEY = key; DIR = R[key][l];
  const p = pages[key](); const html = shell(p);
  const f = path.join(OUT, DIR, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html);
  urls.push(`${FLAGS.SITE_URL}/${DIR ? DIR + '/' : ''}`);
}
fs.cpSync('assets', path.join(OUT, 'assets'), { recursive: true });
fs.cpSync('vendor', path.join(OUT, 'assets/vendor'), { recursive: true });
fs.copyFileSync('src/style.css', path.join(OUT, 'assets/style.css')); fs.copyFileSync('src/main.js', path.join(OUT, 'assets/main.js'));
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(x => `<url><loc>${x}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), FLAGS.DEMO_NOTES ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${FLAGS.SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log('OK', urls.length, 'halaman');
