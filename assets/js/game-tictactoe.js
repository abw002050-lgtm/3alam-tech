// ===== لعبة إكس-أو (Tic-Tac-Toe) =====
(function() {
  const board = Array(9).fill('');
  let human = 'X', computer = 'O';
  let scores = { human: 0, computer: 0, draw: 0 };
  let gameOver = false;

  const cells = document.querySelectorAll('#tictactoe .cell');
  const statusEl = document.querySelector('#tictactoe .ttt-status');
  const resetBtn = document.querySelector('#tictactoe .ttt-reset');
  const scoreEl = document.querySelector('#tictactoe .ttt-scores');

  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  function checkWin(b, p) {
    return lines.find(l => l.every(i => b[i] === p));
  }

  function isFull(b) { return b.every(c => c); }

  function render() {
    cells.forEach((c, i) => {
      c.textContent = board[i];
      c.classList.remove('x', 'o');
      if (board[i] === 'X') c.classList.add('x');
      if (board[i] === 'O') c.classList.add('o');
    });
    renderScores();
  }

  function renderScores() {
    if (scoreEl) scoreEl.textContent = `أنت: ${scores.human}  •  الكمبيوتر: ${scores.computer}  •  تعادل: ${scores.draw}`;
  }

  function setStatus(msg, win) {
    if (statusEl) {
      statusEl.textContent = msg;
      statusEl.style.color = win === 'win' ? '#22c55e' : win === 'lose' ? '#ef4444' : 'var(--text-muted)';
    }
  }

  // Minimax للذكاء الاصطناعي
  function minimax(b, depth, isMax) {
    if (checkWin(b, computer)) return 10 - depth;
    if (checkWin(b, human)) return depth - 10;
    if (isFull(b)) return 0;
    if (isMax) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) if (!b[i]) {
        b[i] = computer;
        best = Math.max(best, minimax(b, depth+1, false));
        b[i] = '';
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) if (!b[i]) {
        b[i] = human;
        best = Math.min(best, minimax(b, depth+1, true));
        b[i] = '';
      }
      return best;
    }
  }

  function computerMove() {
    let best = -Infinity, move = -1;
    for (let i = 0; i < 9; i++) if (!board[i]) {
      board[i] = computer;
      const score = minimax(board, 0, false);
      board[i] = '';
      if (score > best) { best = score; move = i; }
    }
    if (move >= 0) board[move] = computer;
  }

  function handleClick(e) {
    const idx = parseInt(e.currentTarget.dataset.idx);
    if (board[idx] || gameOver) return;
    board[idx] = human;
    let win = checkWin(board, human);
    if (win) { endGame('فزت! 🎉', 'win'); return; }
    if (isFull(board)) { endGame('تعادل!', 'draw'); return; }
    computerMove();
    win = checkWin(board, computer);
    if (win) { endGame('خسرت ضد الكمبيوتر!', 'lose'); return; }
    if (isFull(board)) { endGame('تعادل!', 'draw'); return; }
    setStatus('دورك — أنت X');
  }

  function endGame(msg, type) {
    gameOver = true;
    setStatus(msg, type);
    if (type === 'win') scores.human++;
    else if (type === 'lose') scores.computer++;
    else scores.draw++;
    renderScores();
  }

  function reset() {
    board.fill('');
    gameOver = false;
    setStatus('دورك — أنت X');
    render();
  }

  cells.forEach(c => c.addEventListener('click', handleClick));
  resetBtn && resetBtn.addEventListener('click', reset);
  setStatus('دورك — أنت X');
  renderScores();
})();
