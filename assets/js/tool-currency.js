// ===== محوّل العملات =====
(function() {
  const root = document.querySelector('#currency');
  if (!root) return;

  const amountEl = root.querySelector('.cur-amount');
  const fromEl = root.querySelector('.cur-from');
  const toEl = root.querySelector('.cur-to');
  const resultEl = root.querySelector('.cur-result');
  const rateEl = root.querySelector('.cur-rate');
  const swapBtn = root.querySelector('.cur-swap');

  // أسعار تقريبية مقابل 1 دولار أمريكي (تُحدَّث يدويًا حسب الحاجة)
  const RATES = {
    USD: 1,
    YER: 530,      // ريال يمني (سعر تقريبي)
    SAR: 3.75,
    AED: 3.67,
    EUR: 0.92,
    GBP: 0.79,
    EGP: 48.5,
    TRY: 34.2,
    JOD: 0.709,
    KWD: 0.307,
    QAR: 3.64,
    OMR: 0.385
  };

  const NAMES = {
    USD: 'دولار أمريكي',
    YER: 'ريال يمني',
    SAR: 'ريال سعودي',
    AED: 'درهم إماراتي',
    EUR: 'يورو',
    GBP: 'جنيه إسترليني',
    EGP: 'جنيه مصري',
    TRY: 'ليرة تركية',
    JOD: 'دينار أردني',
    KWD: 'دينار كويتي',
    QAR: 'ريال قطري',
    OMR: 'ريال عماني'
  };

  function convert() {
    const amount = parseFloat(amountEl.value) || 0;
    const from = fromEl.value;
    const to = toEl.value;
    const usd = amount / RATES[from];
    const out = usd * RATES[to];
    const decimals = (to === 'YER' || to === 'EGP') ? 0 : 2;
    if (resultEl) {
      resultEl.textContent = out.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    if (rateEl) {
      const unit = RATES[to] / RATES[from];
      rateEl.textContent = `1 ${NAMES[from]} = ${unit.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${NAMES[to]}`;
    }
  }

  [amountEl, fromEl, toEl].forEach(function(el) {
    if (!el) return;
    el.addEventListener('input', convert);
    el.addEventListener('change', convert);
  });

  if (swapBtn) swapBtn.addEventListener('click', function() {
    const a = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = a;
    convert();
  });

  convert();
})();
