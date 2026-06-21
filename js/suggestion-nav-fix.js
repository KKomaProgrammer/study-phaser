const normalizeText = value => String(value || '')
  .toLowerCase()
  .replace(/[._()\/:'"#\s-]/g, '')
  .trim();

function distance(a, b) {
  a = normalizeText(a);
  b = normalizeText(b);
  if (a === b) return 0;
  if (!a || !b) return Math.max(a.length, b.length);
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = old;
    }
  }
  return row[b.length];
}

function hideSuggestionBoxes() {
  document.querySelectorAll('.suggestion-popover,.mini-suggestion-popover').forEach(box => {
    box.hidden = true;
    box.innerHTML = '';
  });
}

function blurSearchFocus() {
  const active = document.activeElement;
  if (active && typeof active.blur === 'function') active.blur();
  document.querySelectorAll('#searchInput,#miniInput').forEach(input => input.blur());
  document.querySelectorAll('.search-panel').forEach(panel => panel.classList.remove('is-focused'));
}

function closeSearchUi() {
  hideSuggestionBoxes();
  blurSearchFocus();
}

function routeTo(path) {
  if (location.pathname + location.search !== path) history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function isVeryCloseToDoc(query, doc) {
  if (!doc || !query || query.trim().startsWith('#')) return false;
  const q = normalizeText(query);
  const title = normalizeText(doc.title);
  const slug = normalizeText(doc.slug);
  if (!q || q.length < 2) return false;
  if (q === title || q === slug || title === q || slug === q) return true;
  if (title.includes(q) && q.length >= 4) return true;
  const words = String(doc.title || '').toLowerCase().split(/[^a-z0-9가-힣]+/).filter(Boolean);
  return words.some(word => {
    const w = normalizeText(word);
    if (!w || w.length < 3) return false;
    if (w === q || w.includes(q) || q.includes(w)) return true;
    const max = Math.max(q.length, w.length);
    const limit = max <= 5 ? 1 : 2;
    return distance(q, w) <= limit;
  });
}

async function bestDocForQuery(query) {
  const response = await fetch('/api/search?q=' + encodeURIComponent(query));
  const data = await response.json();
  return (data.results || [])[0] || null;
}

async function handleQuerySuggestion(button) {
  const query = button.dataset.querySuggestion || button.textContent || '';
  const isCorrection = button.querySelector('small')?.textContent?.includes('맞춤법') || button.textContent.includes('검색어를 찾으셨나요');
  closeSearchUi();
  const topDoc = await bestDocForQuery(query).catch(() => null);
  if (isCorrection && topDoc) {
    routeTo('/' + encodeURIComponent(topDoc.slug));
    return;
  }
  if (isVeryCloseToDoc(query, topDoc)) {
    routeTo('/' + encodeURIComponent(topDoc.slug));
    return;
  }
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = query;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.blur();
  } else {
    routeTo('/?q=' + encodeURIComponent(query));
  }
}

document.addEventListener('pointerdown', event => {
  if (event.target.closest('[data-suggestion-doc],[data-query-suggestion]')) {
    event.preventDefault();
  }
}, true);

document.addEventListener('click', event => {
  const docButton = event.target.closest('[data-suggestion-doc]');
  if (docButton) {
    event.preventDefault();
    event.stopPropagation();
    closeSearchUi();
    const slug = docButton.dataset.suggestionDoc;
    if (slug) routeTo('/' + encodeURIComponent(slug));
    return;
  }

  const queryButton = event.target.closest('[data-query-suggestion]');
  if (queryButton) {
    event.preventDefault();
    event.stopPropagation();
    handleQuerySuggestion(queryButton);
  }
}, true);

document.addEventListener('submit', event => {
  if (event.target && event.target.matches('#searchForm,#miniSearch')) closeSearchUi();
}, true);

document.addEventListener('click', event => {
  if (event.target.closest('#searchForm .primary-button,#miniSearch .primary-button')) closeSearchUi();
}, true);
