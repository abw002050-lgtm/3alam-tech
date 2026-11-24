// ===== قائمة المهام =====
(function() {
  const root = document.querySelector('#todo');
  if (!root) return;

  const input = root.querySelector('.todo-input');
  const addBtn = root.querySelector('.todo-add');
  const list = root.querySelector('.todo-list');
  const counter = root.querySelector('.todo-counter');
  const clearBtn = root.querySelector('.todo-clear');
  const STORAGE_KEY = 'alam_todo_v1';

  let tasks = [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) tasks = JSON.parse(saved);
  } catch (e) { tasks = []; }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (e) {}
  }

  function render() {
    if (!list) return;
    list.innerHTML = '';
    if (tasks.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'todo-empty';
      empty.textContent = 'لا توجد مهام بعد — أضف أول مهمة لك';
      list.appendChild(empty);
    }
    tasks.forEach(function(t) {
      const li = document.createElement('li');
      li.className = 'todo-item' + (t.done ? ' done' : '');

      const cb = document.createElement('button');
      cb.className = 'todo-check';
      cb.setAttribute('aria-label', t.done ? 'إلغاء الإكمال' : 'تحديد كمكتمل');
      cb.innerHTML = t.done ? '<i class="fa-solid fa-check"></i>' : '';
      cb.addEventListener('click', function() {
        t.done = !t.done;
        save(); render();
      });

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = t.text;

      const del = document.createElement('button');
      del.className = 'todo-del';
      del.setAttribute('aria-label', 'حذف');
      del.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      del.addEventListener('click', function() {
        tasks = tasks.filter(function(x) { return x.id !== t.id; });
        save(); render();
      });

      li.appendChild(cb);
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    });

    if (counter) {
      const done = tasks.filter(function(t) { return t.done; }).length;
      counter.textContent = `${done} من ${tasks.length} مكتملة`;
    }
  }

  function add() {
    const text = (input.value || '').trim();
    if (!text) return;
    tasks.unshift({ id: Date.now() + Math.random(), text: text, done: false });
    input.value = '';
    save(); render();
  }

  if (addBtn) addBtn.addEventListener('click', add);
  if (input) input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); add(); }
  });
  if (clearBtn) clearBtn.addEventListener('click', function() {
    tasks = tasks.filter(function(t) { return !t.done; });
    save(); render();
  });

  render();
})();
