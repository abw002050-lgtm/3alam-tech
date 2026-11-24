// ===== الحاسبة التقنية =====
(function() {
  const root = document.querySelector('#calc');
  if (!root) return;

  const display = root.querySelector('.calc-display');
  const history = root.querySelector('.calc-history');
  let current = '0';
  let previous = null;
  let operator = null;
  let justEvaluated = false;

  function render() {
    if (display) display.textContent = current;
    if (history) history.textContent = previous !== null && operator ? `${previous} ${operator}` : '';
  }

  function inputDigit(d) {
    if (justEvaluated) { current = '0'; justEvaluated = false; }
    current = current === '0' ? d : current + d;
    render();
  }

  function inputDot() {
    if (justEvaluated) { current = '0'; justEvaluated = false; }
    if (!current.includes('.')) current += '.';
    render();
  }

  function calc(a, b, op) {
    a = parseFloat(a); b = parseFloat(b);
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 'خطأ' : a / b;
      case '%': return a % b;
      default: return b;
    }
  }

  function setOperator(op) {
    if (operator && previous !== null && !justEvaluated) {
      current = String(calc(previous, current, operator));
    }
    previous = current;
    operator = op;
    justEvaluated = false;
    render();
  }

  function equals() {
    if (operator === null || previous === null) return;
    const result = calc(previous, current, operator);
    current = typeof result === 'number' ? String(Math.round(result * 1e10) / 1e10) : result;
    previous = null;
    operator = null;
    justEvaluated = true;
    render();
  }

  function clearAll() {
    current = '0'; previous = null; operator = null; justEvaluated = false;
    render();
  }

  function backspace() {
    if (justEvaluated) { clearAll(); return; }
    current = current.length > 1 ? current.slice(0, -1) : '0';
    render();
  }

  function toggleSign() {
    if (current === '0' || current === 'خطأ') return;
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
    render();
  }

  root.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    const v = btn.dataset.val;
    const act = btn.dataset.act;
    if (v !== undefined) {
      if (v === '.') inputDot();
      else inputDigit(v);
    }
    switch (act) {
      case 'op': setOperator(btn.dataset.op); break;
      case 'eq': equals(); break;
      case 'clear': clearAll(); break;
      case 'back': backspace(); break;
      case 'sign': toggleSign(); break;
    }
  });

  // دعم لوحة المفاتيح
  document.addEventListener('keydown', function(e) {
    if (!root.offsetParent) return;
    if (/^[0-9]$/.test(e.key)) { inputDigit(e.key); }
    else if (e.key === '.') { inputDot(); }
    else if (['+', '-', '*', '/'].includes(e.key)) {
      const map = { '+': '+', '-': '−', '*': '×', '/': '÷' };
      setOperator(map[e.key]);
    } else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); equals(); }
    else if (e.key === 'Backspace') { backspace(); }
    else if (e.key === 'Escape') { clearAll(); }
  });

  render();
})();
