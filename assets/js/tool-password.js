// ===== مولّد كلمات المرور =====
(function() {
  const root = document.querySelector('#passgen');
  if (!root) return;

  const out = root.querySelector('.pg-output');
  const lenEl = root.querySelector('.pg-length');
  const lenVal = root.querySelector('.pg-length-val');
  const upperEl = root.querySelector('.pg-upper');
  const lowerEl = root.querySelector('.pg-lower');
  const digitsEl = root.querySelector('.pg-digits');
  const symbolsEl = root.querySelector('.pg-symbols');
  const genBtn = root.querySelector('.pg-generate');
  const copyBtn = root.querySelector('.pg-copy');
  const meterBar = root.querySelector('.pg-meter-bar');
  const meterText = root.querySelector('.pg-meter-text');

  const SETS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    digits: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  function buildPool() {
    let pool = '';
    if (upperEl && upperEl.checked) pool += SETS.upper;
    if (lowerEl && lowerEl.checked) pool += SETS.lower;
    if (digitsEl && digitsEl.checked) pool += SETS.digits;
    if (symbolsEl && symbolsEl.checked) pool += SETS.symbols;
    return pool;
  }

  function randomInt(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      const limit = Math.floor(0xFFFFFFFF / max) * max;
      let x;
      do { window.crypto.getRandomValues(arr); x = arr[0]; } while (x >= limit);
      return x % max;
    }
    return Math.floor(Math.random() * max);
  }

  function strength(pass) {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (pass.length >= 16) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    // درجة من 1 إلى 5
    return Math.max(1, Math.min(5, Math.round(score * 5 / 6)));
  }

  function generate() {
    const pool = buildPool();
    if (!pool) {
      if (out) out.value = 'اختر نوعًا واحدًا على الأقل';
      return;
    }
    const len = parseInt(lenEl.value, 10) || 16;
    let pass = '';
    for (let i = 0; i < len; i++) {
      pass += pool[randomInt(pool.length)];
    }
    // ضمان وجود حرف من كل مجموعة مختارة
    if (out) out.value = pass;
    updateMeter(pass);
  }

  function updateMeter(pass) {
    const s = strength(pass);
    if (meterBar) {
      meterBar.style.width = (s * 20) + '%';
      meterBar.style.background = s <= 2 ? '#ef4444' : s === 3 ? '#f59e0b' : '#22c55e';
    }
    if (meterText) {
      const labels = { 1: 'ضعيفة جدًا', 2: 'ضعيفة', 3: 'متوسطة', 4: 'قوية', 5: 'قوية جدًا' };
      meterText.textContent = labels[s] || '';
      meterText.style.color = s <= 2 ? '#ef4444' : s === 3 ? '#f59e0b' : '#22c55e';
    }
  }

  if (lenEl) lenEl.addEventListener('input', function() {
    if (lenVal) lenVal.textContent = lenEl.value;
    generate();
  });
  [upperEl, lowerEl, digitsEl, symbolsEl].forEach(function(el) {
    if (el) el.addEventListener('change', generate);
  });
  if (genBtn) genBtn.addEventListener('click', generate);

  if (copyBtn) copyBtn.addEventListener('click', function() {
    if (!out || !out.value) return;
    const done = function() {
      const old = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> تم النسخ';
      setTimeout(function() { copyBtn.innerHTML = old; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(out.value).then(done).catch(function() {
        out.select(); document.execCommand('copy'); done();
      });
    } else {
      out.select(); document.execCommand('copy'); done();
    }
  });

  if (lenVal) lenVal.textContent = lenEl.value;
  generate();
})();
