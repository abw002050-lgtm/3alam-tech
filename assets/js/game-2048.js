// ===== لعبة 2048 =====
(function() {
  const gridEl = document.querySelector('#game2048 .grid-2048');
  const scoreEl = document.querySelector('#game2048 .score-2048');
  const bestEl = document.querySelector('#game2048 .best-2048');
  const resetBtn = document.querySelector('#game2048 .reset-2048');
  const overEl = document.querySelector('#game2048 .over-2048');

  let grid, score, best;

  function init() {
    grid = Array(4).fill(null).map(() => Array(4).fill(0));
    score = 0;
    best = parseInt(localStorage.getItem('g2048-best') || '0');
    if (overEl) overEl.style.display = 'none';
    addRandom();
    addRandom();
    render();
  }

  function addRandom() {
    const empty = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++)
      if (grid[r][c] === 0) empty.push([r, c]);
    if (empty.length === 0) return;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  const colors = {
    0: 'var(--bg)', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
    32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61', 512: '#edc850',
    1024: '#edc53f', 2048: '#edc22e'
  };

  function render() {
    if (!gridEl) return;
    gridEl.innerHTML = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      const v = grid[r][c];
      const cell = document.createElement('div');
      cell.className = 'cell-2048';
      cell.textContent = v || '';
      const bg = colors[v] || '#3c3a32';
      cell.style.background = bg;
      cell.style.color = v <= 4 ? '#776e65' : '#fff';
      if (v >= 128) cell.style.fontSize = '1.4rem';
      if (v >= 1024) cell.style.fontSize = '1.2rem';
      gridEl.appendChild(cell);
    }
    if (scoreEl) scoreEl.textContent = score;
    if (bestEl) bestEl.textContent = best;
  }

  function slide(row) {
    let arr = row.filter(v => v);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i+1]) {
        arr[i] *= 2;
        score += arr[i];
        arr.splice(i+1, 1);
      }
    }
    while (arr.length < 4) arr.push(0);
    return arr;
  }

  function move(dir) {
    const old = JSON.stringify(grid);
    if (dir === 'left') grid = grid.map(slide);
    else if (dir === 'right') grid = grid.map(r => slide(r.reverse()).reverse());
    else if (dir === 'up' || dir === 'down') {
      for (let c = 0; c < 4; c++) {
        let col = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
        if (dir === 'down') col.reverse();
        col = slide(col);
        if (dir === 'down') col.reverse();
        for (let r = 0; r < 4; r++) grid[r][c] = col[r];
      }
    }
    if (JSON.stringify(grid) !== old) {
      addRandom();
      if (score > best) { best = score; localStorage.setItem('g2048-best', best); }
      render();
      if (isGameOver()) {
        if (overEl) { overEl.style.display = 'block'; overEl.textContent = 'انتهت اللعبة! النتيجة: ' + score; }
      }
    }
  }

  function isGameOver() {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return false;
      if (c < 3 && grid[r][c] === grid[r][c+1]) return false;
      if (r < 3 && grid[r][c] === grid[r+1][c]) return false;
    }
    return true;
  }

  // لوحة المفاتيح
  document.addEventListener('keydown', e => {
    if (!document.querySelector('#game2048')) return;
    const map = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down' };
    if (map[e.key]) { e.preventDefault(); move(map[e.key]); }
  });

  // اللمس (swipe) للهاتف
  let tsx, tsy;
  if (gridEl) {
    gridEl.addEventListener('touchstart', e => { tsx = e.touches[0].clientX; tsy = e.touches[0].clientY; }, { passive: true });
    gridEl.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tsx;
      const dy = e.changedTouches[0].clientY - tsy;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 30) move(dx > 0 ? 'right' : 'left');
      } else {
        if (Math.abs(dy) > 30) move(dy > 0 ? 'down' : 'up');
      }
    }, { passive: true });
  }

  resetBtn && resetBtn.addEventListener('click', init);
  init();
})();
