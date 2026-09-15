// ===== لعبة الذاكرة =====
(function() {
  const gridEl = document.querySelector('#memory .mem-grid');
  const movesEl = document.querySelector('#memory .mem-moves');
  const resetBtn = document.querySelector('#memory .mem-reset');
  const winEl = document.querySelector('#memory .mem-win');

  const emojis = ['🎮', '🚀', '💡', '🎯', '⚡', '🔧', '📱', '🤖'];
  let cards, flipped, matched, moves, lock;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function init() {
    cards = shuffle([...emojis, ...emojis]);
    flipped = [];
    matched = 0;
    moves = 0;
    lock = false;
    if (winEl) winEl.style.display = 'none';
    if (movesEl) movesEl.textContent = '0';
    render();
  }

  function render() {
    if (!gridEl) return;
    gridEl.innerHTML = '';
    cards.forEach((emoji, i) => {
      const card = document.createElement('button');
      card.className = 'mem-card';
      card.dataset.idx = i;
      card.dataset.emoji = emoji;
      card.innerHTML = '<span class="mem-back">?</span><span class="mem-front">' + emoji + '</span>';
      card.addEventListener('click', () => flip(card, i));
      gridEl.appendChild(card);
    });
  }

  function flip(card, i) {
    if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flipped.push({ card, emoji: cards[i], i });

    if (flipped.length === 2) {
      moves++;
      if (movesEl) movesEl.textContent = moves;
      lock = true;
      const [a, b] = flipped;
      if (a.emoji === b.emoji) {
        setTimeout(() => {
          a.card.classList.add('matched');
          b.card.classList.add('matched');
          matched += 2;
          flipped = [];
          lock = false;
          if (matched === cards.length) {
            if (winEl) { winEl.style.display = 'block'; winEl.textContent = '🎉 فزت في ' + moves + ' حركة!'; }
          }
        }, 400);
      } else {
        setTimeout(() => {
          a.card.classList.remove('flipped');
          b.card.classList.remove('flipped');
          flipped = [];
          lock = false;
        }, 900);
      }
    }
  }

  resetBtn && resetBtn.addEventListener('click', init);
  init();
})();
