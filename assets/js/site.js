(function () {
  'use strict';

  var S = window.SITE || {};
  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // File names contain spaces and "#", which must be encoded to load.
  function asset(path) { return path.split('/').map(encodeURIComponent).join('/'); }

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* Theme ---------------------------------------------------------- */
  function initTheme() {
    var btn = $('#theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
    });
  }

  /* Navigation ----------------------------------------------------- */
  function initNav() {
    var header = $('.site-header');
    var toggle = $('#nav-toggle');
    var nav = $('#site-nav');

    function onScroll() { header.classList.toggle('is-stuck', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && nav) {
      var setOpen = function (open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      };
      toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
      nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
      doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    }

    // Highlight the section in view on the home page.
    var links = $$('#site-nav a[href^="#"]');
    if (links.length && 'IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + entry.target.id;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      links.forEach(function (a) {
        var target = $(a.getAttribute('href'));
        if (target) spy.observe(target);
      });
    }

    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* Reveal on scroll ------------------------------------------------ */
  var revealer = null;
  function observeReveals(ctx) {
    var items = $$('.reveal:not(.is-in)', ctx);
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealer) {
      revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -6% 0px' });
    }
    items.forEach(function (el) { revealer.observe(el); });
  }

  /* Templates ------------------------------------------------------- */
  function projectCard(p) {
    return '<article class="project reveal">' +
      '<div class="project-top">' +
        '<img class="project-thumb" src="' + esc(asset(p.img)) + '" alt="" width="64" height="64" loading="lazy">' +
        '<span class="tag">' + esc(p.cat) + '</span>' +
      '</div>' +
      '<h3>' + esc(p.title) + '</h3>' +
      '<p>' + esc(p.desc) + '</p>' +
      '<div class="project-links">' +
        '<a href="' + esc(p.url) + '" target="_blank" rel="noopener"><i class="fa-brands fa-github" aria-hidden="true"></i>Code</a>' +
        (p.demo ? '<a class="is-live" href="' + esc(p.demo) + '" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>Live demo</a>' : '') +
      '</div>' +
    '</article>';
  }

  function certCard(c, i) {
    return '<button type="button" class="cert reveal" data-cert="' + i + '">' +
      '<img src="' + esc(asset(c.img)) + '" alt="" loading="lazy">' +
      '<span class="cert-body"><span class="cert-title">' + esc(c.title) + '</span>' +
      '<span class="cert-issuer">' + esc(c.issuer) + '</span></span>' +
    '</button>';
  }

  function articleCard(a) {
    return '<a class="article-card reveal" href="' + esc(a.url) + '">' +
      '<span class="tag">' + esc(a.topic) + '</span>' +
      '<h3>' + esc(a.title) + '</h3>' +
      '<p>' + esc(a.blurb) + '</p>' +
      '<span class="read-more">Read article <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>' +
    '</a>';
  }

  /* Lightbox --------------------------------------------------------- */
  function initLightbox(list, container) {
    var box = $('#lightbox');
    if (!box || !container) return;
    var img = $('img', box), caption = $('figcaption', box), index = 0;
    var visible = list;

    function show(i) {
      index = (i + visible.length) % visible.length;
      var c = visible[index];
      img.src = asset(c.img);
      img.alt = c.title + ' certificate';
      caption.textContent = c.title + ' · ' + c.issuer;
    }

    container.addEventListener('click', function (e) {
      var card = e.target.closest('[data-cert]');
      if (!card) return;
      visible = $$('[data-cert]', container).map(function (el) { return list[+el.dataset.cert]; });
      show(visible.indexOf(list[+card.dataset.cert]));
      box.showModal();
    });

    $('[data-lb="close"]', box).addEventListener('click', function () { box.close(); });
    $('[data-lb="prev"]', box).addEventListener('click', function () { show(index - 1); });
    $('[data-lb="next"]', box).addEventListener('click', function () { show(index + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* Filter chips ------------------------------------------------------ */
  function renderChips(el, labels, active, onPick) {
    el.innerHTML = labels.map(function (l) {
      return '<button type="button" class="chip" aria-pressed="' + (l.name === active) + '" data-name="' + esc(l.name) + '">' +
        esc(l.name) + ' <span>' + l.count + '</span></button>';
    }).join('');
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.chip');
      if (!b) return;
      $$('.chip', el).forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
      onPick(b.dataset.name);
    });
  }

  function countBy(list, key, allLabel) {
    var order = [], counts = {};
    list.forEach(function (x) {
      if (!counts[x[key]]) { counts[x[key]] = 0; order.push(x[key]); }
      counts[x[key]]++;
    });
    return [{ name: allLabel, count: list.length }].concat(order.map(function (n) { return { name: n, count: counts[n] }; }));
  }

  /* Projects page ------------------------------------------------------ */
  function initProjects() {
    var grid = $('#project-grid');
    if (!grid) return;
    var ALL = 'All', cat = ALL, q = '';
    var status = $('#project-status'), empty = $('#project-empty');

    function draw() {
      var term = q.trim().toLowerCase();
      var out = S.projects.filter(function (p) {
        return (cat === ALL || p.cat === cat) &&
          (!term || (p.title + ' ' + p.desc + ' ' + p.cat).toLowerCase().indexOf(term) !== -1);
      });
      grid.innerHTML = out.map(projectCard).join('');
      empty.hidden = out.length > 0;
      status.textContent = out.length + (out.length === 1 ? ' project' : ' projects');
      observeReveals(grid);
    }

    renderChips($('#project-filters'), countBy(S.projects, 'cat', ALL), ALL, function (n) { cat = n; draw(); });
    $('#project-search').addEventListener('input', function (e) { q = e.target.value; draw(); });
    draw();
  }

  /* Certificates page --------------------------------------------------- */
  function initCertificates() {
    var grid = $('#cert-grid');
    if (!grid) return;
    var ALL = 'All';

    function draw(issuer) {
      grid.innerHTML = S.certificates.map(function (c, i) {
        return issuer === ALL || c.issuer === issuer ? certCard(c, i) : '';
      }).join('');
      observeReveals(grid);
    }

    renderChips($('#cert-filters'), countBy(S.certificates, 'issuer', ALL), ALL, draw);
    draw(ALL);
    initLightbox(S.certificates, grid);
  }

  /* Articles page --------------------------------------------------------- */
  function initArticles() {
    var el = $('#article-list');
    if (el) { el.innerHTML = S.articles.map(articleCard).join(''); observeReveals(el); }
  }

  /* Article reading page ---------------------------------------------------- */
  function initArticleReader() {
    var body = $('.prose');
    if (!body) return;

    var meta = $('#read-time');
    if (meta) {
      var words = body.textContent.trim().split(/\s+/).length;
      meta.textContent = Math.max(1, Math.round(words / 200)) + ' min read';
    }

    $$('pre', body).forEach(function (pre) {
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code';
      btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        var code = $('code', pre).textContent;
        navigator.clipboard.writeText(code).then(function () {
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
        }, function () { btn.textContent = 'Press Ctrl+C'; });
      });
      pre.appendChild(btn);
    });

    var bar = $('#read-progress');
    if (bar) {
      var update = function () {
        var max = root.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    }
  }

  /* Home page --------------------------------------------------------------- */
  function yearsSince(dateStr) {
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / (365.25 * 864e5));
  }

  function animateCount(el) {
    var end = +el.dataset.count;
    if (reduceMotion) { el.textContent = end; return; }
    var start = null;
    function tick(t) {
      if (start === null) start = t;
      var k = Math.min(1, (t - start) / 900);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initStats() {
    var el = $('#stats');
    if (!el) return;
    var stats = [
      [yearsSince(S.careerStart), '+', 'Years building software'],
      [S.projects.length, '', 'Projects on GitHub'],
      [S.certificates.length, '', 'Certificates earned']
    ];
    el.innerHTML = stats.map(function (s) {
      return '<div class="stat"><dt>' + esc(s[2]) + '</dt><dd><span data-count="' + s[0] + '">' + s[0] + '</span>' + s[1] + '</dd></div>';
    }).join('');
    $$('[data-count]', el).forEach(animateCount);
  }

  function initRotator() {
    var el = $('#rotator');
    if (!el || !S.roles) return;
    var i = 0;
    el.textContent = S.roles[0];
    if (reduceMotion) return;
    setInterval(function () {
      el.classList.add('is-out');
      setTimeout(function () {
        i = (i + 1) % S.roles.length;
        el.textContent = S.roles[i];
        el.classList.remove('is-out');
      }, 320);
    }, 2800);
  }

  function initHome() {
    if (!$('#experience-list')) return;

    $('#experience-list').innerHTML = S.experience.map(function (x) {
      return '<li class="job reveal' + (x.current ? ' is-current' : '') + '">' +
        '<div class="job-head"><div><h3>' + esc(x.role) + '</h3>' +
        '<p class="job-company">' + esc(x.company) + (x.location ? ' <span class="muted">· ' + esc(x.location) + '</span>' : '') + '</p></div>' +
        '<p class="job-period">' + esc(x.period) + '</p></div>' +
        (x.points && x.points.length ? '<ul>' + x.points.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
      '</li>';
    }).join('');

    $('#education-list').innerHTML = S.education.map(function (e) {
      return '<li class="reveal"><h3>' + esc(e.degree) + '</h3><p>' + esc(e.school) + '</p>' +
        '<p class="muted mono">' + esc(e.period) + '</p>' +
        (e.note ? '<p class="edu-note muted">' + esc(e.note) + '</p>' : '') + '</li>';
    }).join('');

    var work = $('#work-list');
    if (work && S.work) {
      work.innerHTML = S.work.map(function (w) {
        return '<article class="work reveal">' +
          '<div class="work-head"><h3>' + esc(w.title) + '</h3>' +
          '<p class="job-period">' + esc(w.period) + '</p></div>' +
          '<p class="work-client">' + esc(w.client) + '</p>' +
          '<p>' + esc(w.desc) + '</p>' +
          '<ul class="pills">' + w.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
        '</article>';
      }).join('');
    }

    $('#skills-list').innerHTML = S.skills.map(function (g) {
      return '<div class="skill-group reveal"><h3>' + esc(g.group) + '</h3><ul class="pills">' +
        g.items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>';
    }).join('');

    $('#languages-list').innerHTML = S.languages.map(function (l) {
      return '<li><strong>' + esc(l.name) + '</strong> <span class="muted">' + esc(l.level) + '</span></li>';
    }).join('');

    $('#featured-projects').innerHTML = S.featured.map(function (t) {
      return S.projects.filter(function (p) { return p.title === t; })[0];
    }).filter(Boolean).map(projectCard).join('');

    $('#home-articles').innerHTML = S.articles.map(articleCard).join('');

    var certIdx = S.featuredCerts.map(function (t) {
      return S.certificates.map(function (c) { return c.title; }).indexOf(t);
    }).filter(function (i) { return i >= 0; });
    var certGrid = $('#home-certs');
    certGrid.innerHTML = certIdx.map(function (i) { return certCard(S.certificates[i], i); }).join('');
    initLightbox(S.certificates, certGrid);

    $$('[data-total-projects]').forEach(function (el) { el.textContent = S.projects.length; });
    $$('[data-total-certs]').forEach(function (el) { el.textContent = S.certificates.length; });

    initStats();
    initRotator();
    initGitHub();
    initCopyEmail();
  }

  /* Live GitHub activity ------------------------------------------------------ */
  function timeAgo(iso) {
    var days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
    if (days < 1) return 'today';
    if (days < 30) return days + (days === 1 ? ' day ago' : ' days ago');
    var months = Math.floor(days / 30.44);
    if (months < 12) return months + (months === 1 ? ' month ago' : ' months ago');
    var years = Math.floor(days / 365.25);
    return years + (years === 1 ? ' year ago' : ' years ago');
  }

  function drawRepos(repos) {
    var wrap = $('#github');
    var list = repos.filter(function (r) { return !r.fork && r.name.indexOf('.github.io') === -1; }).slice(0, 3);
    if (!list.length) return;
    $('#gh-repos').innerHTML = list.map(function (r) {
      return '<a class="repo reveal" href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' +
        '<h3>' + esc(r.name.replace(/[_-]/g, ' ')) + '</h3>' +
        '<p>' + esc(r.description || 'Public repository on GitHub.') + '</p>' +
        '<p class="repo-meta mono">' + (r.language ? esc(r.language) + ' · ' : '') + 'updated ' + esc(timeAgo(r.pushed_at)) + '</p>' +
      '</a>';
    }).join('');
    wrap.hidden = false;
    observeReveals(wrap);
  }

  function initGitHub() {
    if (!$('#github') || !window.fetch) return;
    var KEY = 'gh-repos-v1', cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { /* no cache */ }
    if (cached) { drawRepos(cached); return; }

    fetch('https://api.github.com/users/' + S.github + '/repos?sort=pushed&per_page=12', {
      headers: { Accept: 'application/vnd.github+json' }
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    }).then(function (repos) {
      try { sessionStorage.setItem(KEY, JSON.stringify(repos.map(function (r) {
        return { name: r.name, fork: r.fork, html_url: r.html_url, description: r.description, language: r.language, pushed_at: r.pushed_at };
      }))); } catch (e) { /* cache is optional */ }
      drawRepos(repos);
    }).catch(function () { /* section simply stays hidden */ });
  }

  function initCopyEmail() {
    $$('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var label = $('span', btn), original = label.textContent;
        navigator.clipboard.writeText(btn.dataset.copy).then(function () {
          label.textContent = 'Copied';
          setTimeout(function () { label.textContent = original; }, 1500);
        });
      });
    });
  }

  /* Hero network canvas --------------------------------------------------------- */
  function initCanvas() {
    var canvas = $('#net');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d'), w = 0, h = 0, nodes = [], raf = null, visible = true;
    var LINK = 130;

    function color() {
      return getComputedStyle(root).getPropertyValue('--accent-rgb').trim() || '15,118,110';
    }

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(70, Math.round(w * h / 18000));
      nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28
        });
      }
    }

    function frame() {
      var rgb = color();
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.2 * (1 - d / LINK)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(' + rgb + ',.55)';
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.7, 0, 6.283); ctx.fill();
      }
    }

    function loop() {
      if (!visible || doc.hidden) { raf = null; return; }
      frame();
      raf = requestAnimationFrame(loop);
    }
    function start() { if (!raf && !reduceMotion) raf = requestAnimationFrame(loop); }

    var timer;
    window.addEventListener('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { size(); if (reduceMotion) frame(); }, 150);
    });
    doc.addEventListener('visibilitychange', start);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; start(); }).observe(canvas);
    }
    size(); frame(); start();
  }

  initTheme();
  initNav();
  initHome();
  initProjects();
  initCertificates();
  initArticles();
  initArticleReader();
  initCanvas();
  observeReveals();
})();
