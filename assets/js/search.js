/* عالم تقني — بحث سريع وفلترة الشروحات حسب التصنيف
   يعمل بالكامل في المتصفح (بدون خادم)، ولا يغيّر شيءًا إن كان JavaScript معطّلًا:
   كل الشروحات تبقى معروضة كما هي من Jekyll. */
(function () {
  'use strict';

  var input = document.getElementById('postSearch');
  var grid = document.getElementById('postsGrid');
  if (!input || !grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.content-card'));
  if (!cards.length) return;

  var chips = Array.prototype.slice.call(document.querySelectorAll('#categoryChips .chip'));
  var statusEl = document.getElementById('searchStatus');
  var clearBtn = document.getElementById('searchClear');
  var noResults = document.getElementById('noResults');
  var noResultsText = document.getElementById('noResultsText');
  var resetBtn = document.getElementById('resetFilters');

  /* تطبيع النص العربي: بدون هذه الخطوة لن يجد القارئ «أندرويد» إن كتب «الاندرويد».
     تُوحَّد الألفات والياء والتاء المربوطة والهمزة، وتُحذف الحركات والتطويل. */
  function normalize(s) {
    if (!s) return '';
    return String(s)
      .toLowerCase()
      .replace(/[\u064B-\u0652\u0670\u0640]/g, '')          // الحركات والتطويل (ـــ)
      .replace(/[\u0622\u0623\u0625\u0627\u0671]/g, '\u0627') // آ أ إ ا ٱ → ا
      .replace(/\u0649/g, '\u064A')                          // ى → ي
      .replace(/\u0629/g, '\u0647')                          // ة → ه
      .replace(/\u0624/g, '\u0648')                          // ؤ → و
      .replace(/\u0626/g, '\u064A')                          // ئ → ي
      .replace(/[\u0621\u0653\u0654\u0655]/g, '')            // الهمزة بأشكالها
      .replace(/\s+/g, ' ')
      .trim();
  }

  // فهرس البحث يُبنى مرة واحدة عند تحميل الصفحة (أسرع من المعالجة عند كل حرف)
  cards.forEach(function (card) {
    card._haystack = normalize([
      card.getAttribute('data-title'),
      card.getAttribute('data-excerpt'),
      card.getAttribute('data-category'),
      card.getAttribute('data-tags')
    ].join(' '));
    card._cat = card.getAttribute('data-category') || '';
  });

  var activeCat = '';
  var debounceTimer = null;

  function readParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }

  function syncURL() {
    try {
      if (!window.history || !window.history.replaceState) return;
      var parts = [];
      if (input.value.trim()) parts.push('q=' + encodeURIComponent(input.value.trim()));
      if (activeCat) parts.push('cat=' + encodeURIComponent(activeCat));
      window.history.replaceState(
        null, '',
        window.location.pathname + (parts.length ? '?' + parts.join('&') : '') + '#all'
      );
    } catch (e) { /* المتصفح لا يدعم */ }
  }

  function setActiveChip(chip) {
    chips.forEach(function (c) {
      var on = (c === chip);
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function apply() {
    var terms = normalize(input.value).split(' ').filter(function (t) { return t.length > 0; });
    var shown = 0;

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var okCat = !activeCat || card._cat === activeCat;
      var okQuery = true;
      for (var j = 0; j < terms.length; j++) {
        if (card._haystack.indexOf(terms[j]) === -1) { okQuery = false; break; }
      }
      var visible = okCat && okQuery;

      card.style.display = visible ? '' : 'none';
      if (visible) {
        shown++;
        /* مهم: البطاقات تحمل صنف .reveal وتعتمد على IntersectionObserver.
           بعد الفلترة قد تظهر بطاقة لم يسبق أن رصدها المراقب، فتظل شفافة.
           نضيف visible مباشرة لضمان ظهورها فورًا. */
        card.classList.add('visible');
      }
    }

    var total = cards.length;
    var q = input.value.trim();

    if (!terms.length && !activeCat) {
      if (statusEl) statusEl.textContent = '';
    } else if (shown) {
      var scope = activeCat ? ' في تصنيف «' + activeCat + '»' : '';
      if (statusEl) {
        statusEl.textContent = terms.length
          ? 'ظهر ' + shown + ' من ' + total + ' شرحًا' + scope + ' عن: "' + q + '"'
          : shown + ' شرحًا' + scope;
      }
    } else if (statusEl) {
      statusEl.textContent = '';
    }

    if (noResults) {
      noResults.hidden = shown !== 0;
      if (shown === 0 && noResultsText) {
        noResultsText.textContent = q
          ? 'لم نجد شيئًا يطابق "' + q + '"' + (activeCat ? ' داخل تصنيف ' + activeCat : '') +
            '. جرّب كلمة أقصر، أو اكتب بدون تشكيل، أو اختر تصنيفًا آخر.'
          : 'لا توجد شروحات في هذا التصنيف حاليًا.';
      }
    }
    if (grid) grid.style.display = shown === 0 ? 'none' : '';
    if (clearBtn) clearBtn.hidden = !input.value;
  }

  // البحث أثناء الكتابة (مع تأخير بسيط حتى لا نعيد الحساب عند كل حرف)
  input.addEventListener('input', function () {
    if (clearBtn) clearBtn.hidden = !input.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () { apply(); syncURL(); }, 130);
  });

  // زر المسح
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      apply();
      syncURL();
      input.focus();
    });
  }

  // Escape = مسح سريع
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      input.value = '';
      apply();
      syncURL();
    }
  });

  // أزرار التصنيفات
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var cat = chip.getAttribute('data-cat') || '';
      activeCat = (activeCat === cat && cat !== '') ? '' : cat; // نقرة ثانية على نفس التصنيف تلغيه
      setActiveChip(activeCat ? chip : chips[0]);
      apply();
      syncURL();
    });
  });

  // زر «عرض كل الشروحات» داخل رسالة عدم وجود نتائج
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      input.value = '';
      activeCat = '';
      setActiveChip(chips[0]);
      apply();
      syncURL();
    });
  }

  // قراءة ?q= و ?cat= من الرابط — يسمح بمشاركة رابط بحث جاهز
  (function init() {
    var q = readParam('q');
    var cat = readParam('cat');

    if (q) input.value = q;
    if (cat) {
      for (var i = 0; i < chips.length; i++) {
        if (chips[i].getAttribute('data-cat') === cat) {
          activeCat = cat;
          setActiveChip(chips[i]);
          break;
        }
      }
    }
    apply();

    // القدوم من زر البحث في شريط التنقل (/shuroohat/#search) → تركيز تلقائي
    if (window.location.hash === '#search') {
      try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
      try { input.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      catch (e) { input.scrollIntoView(); }
    }
  })();
})();
