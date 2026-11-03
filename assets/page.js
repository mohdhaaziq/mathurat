// Suasana pagi/petang (ikut waktu Malaysia, sama dgn app) + pilihan bahasa BM/EN.
(function () {
  var root = document.documentElement;
  var body = document.body;

  // ---- Suasana ----
  function setMode(mode) {
    var petang = mode === 'petang';
    root.classList.toggle('evening', petang);
    document.querySelectorAll('[data-mode]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === mode));
    });
  }
  document.querySelectorAll('[data-mode]').forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); });
  });
  var jam = 9;
  try {
    jam = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Kuala_Lumpur' }).format(new Date()));
  } catch (e) { jam = new Date().getHours(); }
  setMode(jam >= 15 || jam < 5 ? 'petang' : 'pagi');

  // ---- Bahasa ----
  function setLang(l) {
    if (l !== 'ms' && l !== 'en') l = 'ms';
    root.setAttribute('lang', l);
    root.setAttribute('data-lang', l);
    try { localStorage.setItem('mathurat-lang', l); } catch (e) {}
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === l));
    });
    var t = body.getAttribute(l === 'en' ? 'data-title-en' : 'data-title-ms');
    if (t) document.title = t;
  }
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
  });
  setLang(root.getAttribute('data-lang') || 'ms');
})();
