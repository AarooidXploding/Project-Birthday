/**
 * Birthday Website — Spider-Man Edition
 * =======================================
 * KONFIGURASI — isi URL di sini
 *
 * MUSIK_URL  : URL musik background (catbox / url mp3)
 * VIDEO_URL  : Objek berisi URL video per foto ganjil
 *              Foto 1→index 0, foto 3→index 2, dst.
 *
 * Contoh:
 *   MUSIK_URL = 'https://files.catbox.moe/xxxxxx.mp3';
 *   VIDEO_URLS = {
 *     0: 'https://files.catbox.moe/aaaaa.mp4',  // foto 1
 *     2: 'https://files.catbox.moe/bbbbb.mp4',  // foto 3
 *     4: 'https://files.catbox.moe/ccccc.mp4',  // foto 5
 *     6: 'https://files.catbox.moe/ddddd.mp4',  // foto 7
 *     8: 'https://files.catbox.moe/eeeee.mp4',  // foto 9
 *   };
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     CONFIG — ISI URL DI SINI
  ══════════════════════════════════════════════ */
  const MUSIK_URL = 'https://files.catbox.moe/4utjfd.mp3';   // ganti dengan URL mp3 di catbox, contoh: 'https://files.catbox.moe/abc123.mp3'

  const VIDEO_URLS = {
    0: 'https://files.catbox.moe/e7j4tx.mp4',  // video untuk foto 1 — isi URL mp4 di sini
    2: 'https://files.catbox.moe/b098uo.mp4',  // video untuk foto 3
    4: 'https://files.catbox.moe/gf3q8c.mp4',  // video untuk foto 5
    6: 'https://files.catbox.moe/zee3cl.mp4',  // video untuk foto 7
    8: 'https://files.catbox.moe/5zo3gv.mp4',  // video untuk foto 9
  };

  const PHOTOS = [
    'photo1.jpg','photo2.jpg','photo3.jpg','photo4.jpg','photo5.jpg',
    'photo6.jpg','photo7.jpg','photo8.jpg','photo9.jpg','photo10.jpg',
  ];

  /* ══════════════════════════════════════════════
     WEB CANVAS
  ══════════════════════════════════════════════ */
  const canvas = document.getElementById('web-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const NODES = [];
  for (let i = 0; i < 18; i++) {
    NODES.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }

  function drawWebBg() {
    ctx.clearRect(0, 0, W, H);
    for (const n of NODES) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    ctx.strokeStyle = '#cc0000'; ctx.lineWidth = 0.8;
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        const dx = NODES[i].x - NODES[j].x, dy = NODES[i].y - NODES[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
          ctx.globalAlpha = (1 - dist / 200) * 0.55;
          ctx.beginPath(); ctx.moveTo(NODES[i].x, NODES[i].y);
          ctx.lineTo(NODES[j].x, NODES[j].y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 0.4; ctx.fillStyle = '#cc0000';
    for (const n of NODES) {
      ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawWebBg);
  }
  drawWebBg();

  /* ══════════════════════════════════════════════
     SCENES
  ══════════════════════════════════════════════ */
  const scenes = {
    envelope: document.getElementById('scene-envelope'),
    letter:   document.getElementById('scene-letter'),
    balloons: document.getElementById('scene-balloons'),
    poster:   document.getElementById('scene-poster'),
  };

  let currentScene  = 'envelope';
  let transitioning = false;

  function switchScene(from, to, cb) {
    if (transitioning) return;
    transitioning = true;
    const f = scenes[from], t = scenes[to];
    f.classList.add('fade-out'); f.classList.remove('active');
    setTimeout(() => {
      f.classList.remove('fade-out');
      t.classList.add('active','fade-in');
      setTimeout(() => { t.classList.remove('fade-in'); transitioning = false; cb && cb(); }, 500);
    }, 380);
  }

  new MutationObserver(() => {
    for (const [name, el] of Object.entries(scenes)) {
      if (el.classList.contains('active')) { currentScene = name; break; }
    }
  }).observe(document.body, {subtree:true, attributes:true, attributeFilter:['class']});

  /* ══════════════════════════════════════════════
     SCENE 1 → 2 : ENVELOPE
  ══════════════════════════════════════════════ */
  const envelopeEl = document.getElementById('envelope');

  function onEnvTap() {
    if (transitioning) return;
    envelopeEl.classList.add('opening');
    const hint = document.querySelector('.tap-hint-global');
    if (hint) hint.style.opacity = '0';
    if (navigator.vibrate) navigator.vibrate([30,20,30]);
    tryStartMusic();
    setTimeout(() => switchScene('envelope','letter'), 380);
  }
  envelopeEl.addEventListener('click', onEnvTap);
  envelopeEl.addEventListener('touchstart', e => { e.preventDefault(); onEnvTap(); }, {passive:false});

  /* ══════════════════════════════════════════════
     SCENE 2 → 3 : LETTER CARD
  ══════════════════════════════════════════════ */
  const letterCardEl = document.getElementById('letter-card');

  function onLetterTap() {
    if (transitioning) retn;
    if (navigator.vibrate) navigator.vibrate([20,15,20]);
    switchScene('letter','balloons', () => launchBalloons());
  }
  letterCardEl.addEventListener('click', onLetterTap);
  letterCardEl.addEventListener('touchstart', e => { e.preventDefault(); onLetterTap(); }, {passive:false});

  /* ══════════════════════════════════════════════
     SCENE 3 : BALLOONS
  ══════════════════════════════════════════════ */
  const balloonsContainer = document.getElementById('balloons-container');
  const BALS = ['🎈','🎈','🎈','🎈','🎉','🎊','🕷️','✨'];

  function launchBalloons() {
    balloonsContainer.innerHTML = '';
    for (let i = 0; i < 26; i++) setTimeout(spawnBalloon, i * 65);
    setTimeout(() => switchScene('balloons','poster', () => startPoster()), 2400);
  }
  function spawnBalloon() {
    const el = document.createElement('div');
    el.classList.add('balloon');
    el.textContent = BALS[Math.floor(Math.random() * BALS.length)];
    const dur = 1.3 + Math.random() * 1.3;
    el.style.left = (4 + Math.random() * 92) + '%';
    el.style.bottom = '-70px';
    el.style.fontSize = (36 + Math.random() * 36) + 'px';
    el.style.setProperty('--drift', (Math.random()-0.5)*140+'px');
    el.style.setProperty('--rot',   (Math.random()-0.5)*45+'deg');
    el.style.animationDuration = dur + 's';
    el.style.animationTimingFunction = 'ease-out';
    balloonsContainer.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 100);
  }

  /* ══════════════════════════════════════════════
     SCENE 4 : POSTER
  ══════════════════════════════════════════════ */
  const heartsContainer   = document.getElementById('hearts-container');
  const carouselTrack     = document.getElementById('carousel-track');
  const carouselDotsEl    = document.getElementById('carousel-dots');
  const carouselWrapper   = document.getElementById('carousel-wrapper');
  const spideyHint        = document.getElementById('spidey-hint');
  const loveBurstLayer    = document.getElementById('love-burst-layer');

  const TOTAL   = 10;
  let   carIdx  = 0;
  let   isAnim  = false;
  const drag    = {on:false, x0:0, y0:0, x1:0, swiped:false, axis:null};

  // Track which slides are flipped (showing video)
  const flippedSlides = new Set();

  function startPoster() {
    buildCarousel();
    spawnHearts();
    setInterval(spawnHearts, 3000);
    initLikeSystem();
    initDoubleTapLove();
  }

  /* ── Build Carousel with flip cards ── */
  function buildCarousel() {
    carouselTrack.innerHTML  = '';
    carouselDotsEl.innerHTML = '';

    for (let i = 0; i < TOTAL; i++) {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
      slide.dataset.index = i;
      if (i === 0) slide.classList.add('active-slide');

      const flipInner = document.createElement('div');
      flipInner.classList.add('flip-inner');
      flipInner.dataset.slideIdx = i;

      /* FRONT — foto */
      const front = document.createElement('div');
      front.classList.add('flip-front');
      const img = document.createElement('img');
      img.alt = `Foto ${i+1}`;
      img.src = `assets/images/${PHOTOS[i]}`;
      img.draggable = false;
      const fb = document.createElement('div');
      fb.classList.add('slide-fallback');
      fb.style.display = 'none';
      fb.innerHTML = `<span class="slide-num">${i+1}</span><span class="slide-label">Foto ${i+1}</span>`;
      img.addEventListener('error', () => { img.style.display='none'; fb.style.display='flex'; });
      front.appendChild(img);
      front.appendChild(fb);

      flipInner.appendChild(front);

      /* BACK — video (hanya foto 1,3,5,7,9 = index genap 0,2,4,6,8) */
      if (i % 2 === 0 && i < 9) {
        const back = document.createElement('div');
        back.classList.add('flip-back');
        const videoUrl = VIDEO_URLS[i];

        if (videoUrl) {
          const vid = document.createElement('video');
          vid.src = videoUrl;
          vid.loop = true;
          vid.muted = false;
          vid.playsInline = true;
          vid.setAttribute('webkit-playsinline','');
          vid.preload = 'none';
          vid.style.width='100%'; vid.style.height='100%'; vid.style.objectFit='cover';
          // Smooth loop
          vid.addEventListener('timeupdate', () => {
            if (vid.duration && vid.currentTime > vid.duration - 0.25) {
              vid.currentTime = 0;
            }
          });
          // Duck music when video plays
          vid.addEventListener('play', () => duckMusic(true));
          vid.addEventListener('pause', () => duckMusic(false));
          vid.addEventListener('ended', () => duckMusic(false));
          back.appendChild(vid);
        } else {
          const placeholder = document.createElement('div');
          placeholder.classList.add('flip-back-placeholder');
          placeholder.innerHTML = `<span>🎬 Video ${i+1}</span><span style="font-size:11px;opacity:0.5">Isi URL di app.js</span>`;
          back.appendChild(placeholder);
        }

        flipInner.appendChild(back);

        // Hint tap to flip
        const hint = document.createElement('div');
        hint.classList.add('flip-hint');
        hint.textContent = '👆 Tahan dan tekan Foto lalu Lepas';
        slide.appendChild(hint);
      }

      slide.appendChild(flipInner);
      carouselTrack.appendChild(slide);

      /* Dot */
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      carouselDotsEl.appendChild(dot);
    }
    setTrack(0, false);
    updateSlideHints();
  }

  function setTrack(idx, anim) {
    carouselTrack.style.transition = anim
      ? 'transform 0.36s cubic-bezier(0.25,0.46,0.45,0.94)'
      : 'none';
    carouselTrack.style.transform = `translateX(${-idx * 100}%)`;
  }

  function goTo(raw, anim = true) {
    if (isAnim) return;
    isAnim = true;
    let idx = raw;
    if (idx < 0)      idx = TOTAL - 1;
    if (idx >= TOTAL) idx = 0;
    carIdx = idx;
    setTrack(carIdx, anim);

    const dots = carouselDotsEl.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === carIdx));

    // Update active-slide class
    carouselTrack.querySelectorAll('.carousel-slide').forEach((s,i) => {
      s.classList.toggle('active-slide', i === carIdx);
    });

    updateSlideHints();
    setTimeout(() => { isAnim = false; }, 400);
  }

  function updateSlideHints() {
    if (spideyHint) spideyHint.style.display = (carIdx === 9) ? 'block' : 'none';
  }

  /* ── Flip logic ── */
  function flipSlide(idx) {
    if (idx === 9) { openLetter(); return; } // slide 10 → surat

    // Only odd-indexed (0,2,4,6,8) flip
    if (idx % 2 !== 0) return;

    const slide = carouselTrack.querySelectorAll('.carousel-slide')[idx];
    if (!slide) return;
    const inner = slide.querySelector('.flip-inner');
    if (!inner) return;

    if (flippedSlides.has(idx)) {
      // Flip back to photo
      inner.classList.remove('flipped');
      flippedSlides.delete(idx);
      // Pause video
      const vid = inner.querySelector('video');
      if (vid) { vid.pause(); vid.currentTime = 0; duckMusic(false); }
      if (navigator.vibrate) navigator.vibrate(20);
    } else {
      // Flip to video
      inner.classList.add('flipped');
      flippedSlides.add(idx);
      if (navigator.vibrate) navigator.vibrate([15,10,15]);
      // Start playing video
      const vid = inner.querySelector('video');
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      }
    }
  }

  /* ── Drag handlers ── */
  function dStart(x, y) {
    drag.on=true; drag.x0=x; drag.y0=y; drag.x1=x; drag.swiped=false; drag.axis=null;
    carouselTrack.style.transition='none';
  }
  function dMove(x, y) {
    if (!drag.on) return;
    const dx=x-drag.x0, dy=y-drag.y0;
    drag.x1=x;
    if (drag.axis===null && (Math.abs(dx)>7||Math.abs(dy)>7))
      drag.axis = Math.abs(dy)>Math.abs(dx)?'v':'h';
    if (drag.axis==='v') { drag.on=false; setTrack(carIdx,true); return; }
    if (drag.axis==='h') {
      drag.swiped=true;
      const pct=(dx/carouselWrapper.offsetWidth)*100;
      carouselTrack.style.transform=`translateX(${(-carIdx*100)+pct}%)`;
    }
  }
  function dEnd(fx) {
    if (!drag.on) return;
    drag.on=false; drag.x1=fx;
    const moved = Math.abs(fx - drag.x0);
    if (!drag.swiped || drag.axis!=='h') {
      setTrack(carIdx, true);
      if (moved < 12) flipSlide(carIdx); // tap → flip
      return;
    }
    const thr = carouselWrapper.offsetWidth * 0.17;
    if      (fx - drag.x0 < -thr) goTo(carIdx+1);
    else if (fx - drag.x0 >  thr) goTo(carIdx-1);
    else {
      goTo(carIdx);
      if (moved < 12) flipSlide(carIdx);
    }
  }

  carouselWrapper.addEventListener('touchstart', e=>{
    if(e.touches.length!==1) return;
    dStart(e.touches[0].clientX, e.touches[0].clientY);
  },{passive:true});
  carouselWrapper.addEventListener('touchmove', e=>{
    if(e.touches.length!==1) return;
    dMove(e.touches[0].clientX, e.touches[0].clientY);
    if(drag.axis==='h') e.preventDefault();
  },{passive:false});
  carouselWrapper.addEventListener('touchend', e=>{
    const cx = e.changedTouches.length>0 ? e.changedTouches[0].clientX : drag.x1;
    dEnd(cx);
  },{passive:true});
  carouselWrapper.addEventListener('mousedown', e=>dStart(e.clientX,e.clientY));
  window.addEventListener('mousemove', e=>{ if(drag.on) dMove(e.clientX,e.clientY); });
  window.addEventListener('mouseup',   e=>{ if(drag.on) dEnd(e.clientX); });

  /* ══════════════════════════════════════════════
     LETTER POPUP (foto ke-10)
  ══════════════════════════════════════════════ */
  const letterOverlay = document.getElementById('letter-overlay');
  const loBackdrop    = document.getElementById('lo-backdrop');
  const loClose       = document.getElementById('lo-close');

  function openLetter() {
    letterOverlay.classList.add('open');
    letterOverlay.setAttribute('aria-hidden','false');
    if (navigator.vibrate) navigator.vibrate([20,10,20]);
  }
  function closeLetter() {
    letterOverlay.classList.remove('open');
    letterOverlay.setAttribute('aria-hidden','true');
  }

  loClose.addEventListener('click', closeLetter);
  loClose.addEventListener('touchstart', e=>{ e.preventDefault(); closeLetter(); },{passive:false});
  loBackdrop.addEventListener('click', closeLetter);
  loBackdrop.addEventListener('touchstart', e=>{ e.preventDefault(); closeLetter(); },{passive:false});

  /* ══════════════════════════════════════════════
     REALTIME LIKE SYSTEM
     Menggunakan localStorage sebagai state lokal
     (ringan, tanpa server)
  ══════════════════════════════════════════════ */
  const LIKE_KEY = 'spidey_bday_likes';
  const LIKED_KEY = 'spidey_bday_liked_me';

  let likeCount = 0;
  let userLiked = false;

  function initLikeSystem() {
    const likeBtn   = document.getElementById('iga-like-btn');
    const likeCountEl = document.getElementById('like-count');
    if (!likeBtn || !likeCountEl) return;

    // Load from localStorage
    try {
      likeCount = parseInt(localStorage.getItem(LIKE_KEY) || '0');
      userLiked = localStorage.getItem(LIKED_KEY) === '1';
    } catch(e) { likeCount = 0; }

    // Simulate multiple users by adding random count once
    if (likeCount === 0) {
      likeCount = Math.floor(Math.random() * 18) + 5; // mulai dari 5-22
      try { localStorage.setItem(LIKE_KEY, String(likeCount)); } catch(e){}
    }

    likeCountEl.textContent = likeCount;
    if (userLiked) {
      likeBtn.classList.add('liked');
    }

    likeBtn.addEventListener('click', () => toggleLike(likeBtn, likeCountEl));
    likeBtn.addEventListener('touchstart', e => {
      e.preventDefault();
      toggleLike(likeBtn, likeCountEl);
    }, {passive:false});
  }

  function toggleLike(btn, countEl) {
    if (userLiked) {
      userLiked = false;
      likeCount = Math.max(0, likeCount - 1);
      btn.classList.remove('liked');
    } else {
      userLiked = true;
      likeCount++;
      btn.classList.add('liked');
      spawnLoveBurstCenter();
      if (navigator.vibrate) navigator.vibrate([10,5,10]);
    }
    countEl.textContent = likeCount;
    countEl.classList.remove('bump');
    void countEl.offsetWidth;
    countEl.classList.add('bump');
    try {
      localStorage.setItem(LIKE_KEY, String(likeCount));
      localStorage.setItem(LIKED_KEY, userLiked ? '1' : '0');
    } catch(e) {}
  }

  /* ══════════════════════════════════════════════
     DOUBLE-TAP LOVE BURST (IG style)
  ══════════════════════════════════════════════ */
let lastTapTime = 0;
  let lastTapX = 0, lastTapY = 0;

  function initDoubleTapLove() {
    const igFrame = document.querySelector('.ig-post-frame');
    if (!igFrame) return;

    igFrame.addEventListener('touchend', e => {
      const now = Date.now();
      const t = e.changedTouches[0];
      const x = t.clientX, y = t.clientY;

      // Skip jika tap di action bar atau comment bar
      const target = document.elementFromPoint(x, y);
      if (target && (target.closest('.ig-post-actions') || target.closest('.ig-comment-bar') || target.closest('.carousel-dots'))) return;

      if (now - lastTapTime < 320 && Math.abs(x - lastTapX) < 60 && Math.abs(y - lastTapY) < 60) {
        spawnLoveBurst(x, y);
        // Tambah like +1 tiap double tap, tanpa batas
        const likeBtn = document.getElementById('iga-like-btn');
        const countEl = document.getElementById('like-count');
        if (likeBtn && countEl) {
          likeCount++;
          userLiked = true;
          likeBtn.classList.add('liked');
          countEl.textContent = likeCount;
          countEl.classList.remove('bump');
          void countEl.offsetWidth;
          countEl.classList.add('bump');
          try {
            localStorage.setItem(LIKE_KEY, String(likeCount));
            localStorage.setItem(LIKED_KEY, '1');
          } catch(e) {}
        }
        lastTapTime = 0;
      } else {
        lastTapTime = now;
        lastTapX = x; lastTapY = y;
      }
    }, {passive:true});
  }

  function spawnLoveBurst(x, y) {
    if (!loveBurstLayer) return;
    if (navigator.vibrate) navigator.vibrate([8,4,8]);
    
    // Ripple
    const ripple = document.createElement('div');
    ripple.classList.add('tap-ripple');
    ripple.style.left = x + 'px';
    ripple.style.top  = y + 'px';
    loveBurstLayer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);

    // Heart burst
    const burst = document.createElement('div');
    burst.classList.add('love-burst');
    burst.style.left = x + 'px';
    burst.style.top  = y + 'px';
    const size = 60 + Math.random() * 30;
    burst.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
      <path fill="#cc0000" d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>`;
    loveBurstLayer.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
  }

  function spawnLoveBurstCenter() {
    const rect = document.getElementById('ig-post-frame')?.getBoundingClientRect();
    if (!rect) return;
    spawnLoveBurst(rect.left + rect.width/2, rect.top + rect.height/2);
  }

  /* ══════════════════════════════════════════════
     FLOATING HEARTS (bg deco)
  ══════════════════════════════════════════════ */
  function spawnHearts() {
    const labels = ['❤️','❤️','💬 97','👤 55','🕷️'];
    const count  = 2 + Math.floor(Math.random()*3);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.classList.add('heart-float');
        el.textContent = labels[Math.floor(Math.random()*labels.length)];
        const side = Math.random() < 0.5 ? 'left' : 'right';
        el.style.left = side==='left' ? (3+Math.random()*13)+'%' : (76+Math.random()*14)+'%';
        el.style.top  = (18+Math.random()*58)+'%';
        const dur = 2.5 + Math.random()*1.5;
        el.style.animationDuration = dur + 's';
        el.style.animationDelay   = (Math.random()*.3)+'s';
        heartsContainer.appendChild(el);
        setTimeout(() => el.remove(), (dur+.6)*1000);
      }, i*170);
    }
  }

  /* ══════════════════════════════════════════════
     MUSIC SYSTEM
  ══════════════════════════════════════════════ */
  const bgMusic = document.getElementById('bg-music');
  let musicStarted = false;
  let musicMuted   = false;
  let videoDucking = false;

  // Inject music bar UI
  function createMusicBar() {
    if (!MUSIK_URL) return;
    const bar = document.createElement('div');
    bar.className = 'music-bar';
    bar.id = 'music-bar';
    bar.innerHTML = '<span class="music-icon">💿</span><span class="music-label">MUSIC</span>';
    document.body.appendChild(bar);
    bar.addEventListener('click', toggleMusic);
    bar.addEventListener('touchstart', e=>{ e.preventDefault(); toggleMusic(); },{passive:false});
  }
  createMusicBar();

  function tryStartMusic() {
    if (!MUSIK_URL || musicStarted) return;
    bgMusic.src = MUSIK_URL;
    bgMusic.volume = 1.0;
    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(() => {
      // Will retry on next user interaction
      document.addEventListener('touchstart', () => {
        if (!musicStarted) {
          bgMusic.play().then(() => { musicStarted = true; }).catch(()=>{});
        }
      }, {once:true, passive:true});
    });
  }

  function toggleMusic() {
    if (!MUSIK_URL) return;
    if (!musicStarted) { tryStartMusic(); return; }
    musicMuted = !musicMuted;
    const bar = document.getElementById('music-bar');
    if (musicMuted) {
      bgMusic.volume = 0;
      if (bar) bar.classList.add('paused');
    } else {
      bgMusic.volume = videoDucking ? 0.1 : 1.0;
      if (bar) bar.classList.remove('paused');
    }
  }

  function duckMusic(duck) {
    if (!MUSIK_URL || !musicStarted) return;
    videoDucking = duck;
    if (musicMuted) return;
    // Smooth volume transition
    const target = duck ? 0.05 : 1.0;
    const step   = duck ? -0.05 : 0.05;
    const interval = setInterval(() => {
      const newVol = bgMusic.volume + step;
      if ((step > 0 && newVol >= target) || (step < 0 && newVol <= target)) {
        bgMusic.volume = Math.max(0, Math.min(1, target));
        clearInterval(interval);
      } else {
        bgMusic.volume = Math.max(0, Math.min(1, newVol));
      }
    }, 30);
  }

  /* ══════════════════════════════════════════════
     SCROLL LOCK (non-poster scenes)
  ══════════════════════════════════════════════ */
  document.addEventListener('touchmove', e => {
    if (currentScene !== 'poster') e.preventDefault();
  }, {passive:false});

  /* ══════════════════════════════════════════════
     KEYBOARD
  ══════════════════════════════════════════════ */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLetter(); return; }
    if ((e.key==='Enter'||e.key===' ') && !letterOverlay.classList.contains('open')) {
      e.preventDefault();
      if (currentScene === 'envelope') onEnvTap();
      else if (currentScene === 'letter') onLetterTap();
    }
    if (e.key==='ArrowRight' && currentScene==='poster') goTo(carIdx+1);
    if (e.key==='ArrowLeft'  && currentScene==='poster') goTo(carIdx-1);
  });

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  scenes.envelope.classList.add('active');
  console.log('🕷️ Spider-Man Birthday loaded!');

})();
