// ===== عدّاد الكلمات =====
(function() {
  const ta = document.querySelector('#wordcount .wc-input');
  const wordsEl = document.querySelector('#wordcount .wc-words');
  const charsEl = document.querySelector('#wordcount .wc-chars');
  const sentsEl = document.querySelector('#wordcount .wc-sentences');
  const parasEl = document.querySelector('#wordcount .wc-paragraphs');
  const readEl = document.querySelector('#wordcount .wc-reading');

  function count() {
    const text = ta.value;
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sents = text.trim() ? (text.match(/[.!?؟]+/g) || [text.trim()]).length : 0;
    const paras = text.trim() ? text.trim().split(/\n+/).filter(p => p.trim()).length : 0;
    const mins = Math.max(1, Math.ceil(words / 200));
    if (wordsEl) wordsEl.textContent = words;
    if (charsEl) charsEl.textContent = chars;
    if (sentsEl) sentsEl.textContent = sents;
    if (parasEl) parasEl.textContent = paras;
    if (readEl) readEl.textContent = mins + ' دقيقة';
  }

  ta && ta.addEventListener('input', count);
  count();
})();
