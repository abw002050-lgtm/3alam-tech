// ===== مولّد QR =====
(function() {
  const input = document.querySelector('#qrgen .qr-input');
  const btn = document.querySelector('#qrgen .qr-btn');
  const img = document.querySelector('#qrgen .qr-img');
  const dl = document.querySelector('#qrgen .qr-download');
  const sizeSel = document.querySelector('#qrgen .qr-size');

  function generate() {
    const text = input.value.trim();
    if (!text) { if (img) img.style.display = 'none'; if (dl) dl.style.display = 'none'; return; }
    const size = (sizeSel && sizeSel.value) || '200x200';
    const url = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + '&data=' + encodeURIComponent(text);
    if (img) { img.src = url; img.style.display = 'block'; img.alt = 'QR Code for ' + text; }
    if (dl) { dl.href = url; dl.style.display = 'inline-flex'; }
  }

  btn && btn.addEventListener('click', generate);
  input && input.addEventListener('keydown', e => { if (e.key === 'Enter') generate(); });
})();
