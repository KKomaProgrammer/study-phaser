function isCorrectionSuggestion(element) {
  if (!element) return false;
  const text = element.textContent || '';
  const label = element.querySelector('small')?.textContent || '';
  return element.classList.contains('did-you-mean') || label.includes('맞춤법') || text.includes('이 검색어를 찾으셨나요') || text.includes('검색어를 찾으셨나요');
}

function queryFromCorrection(element) {
  return (element?.dataset?.querySuggestion || element?.querySelector('strong')?.textContent || element?.textContent || '').trim();
}

function setInputAndSearch(input, query) {
  if (!input || !query) return false;
  input.value = query;
  input.focus();
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return true;
}

function setInputAndRefreshWithoutFocus(input, query) {
  if (!input || !query) return false;
  input.value = query;
  input.blur();
  document.querySelectorAll('.search-panel').forEach(panel => panel.classList.remove('is-focused'));
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return true;
}

function applyCorrectionSearch(query) {
  const mainInput = document.getElementById('searchInput');
  if (setInputAndSearch(mainInput, query)) return;

  const miniInput = document.getElementById('miniInput');
  if (setInputAndSearch(miniInput, query)) return;

  const path = '/?q=' + encodeURIComponent(query);
  if (location.pathname + location.search !== path) history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function applyResultCorrectionAndRefresh(box, query) {
  box.remove();
  const mainInput = document.getElementById('searchInput');
  if (setInputAndRefreshWithoutFocus(mainInput, query)) return;

  const miniInput = document.getElementById('miniInput');
  if (setInputAndRefreshWithoutFocus(miniInput, query)) return;
}

document.addEventListener('pointerdown', event => {
  const box = event.target.closest('.did-you-mean,[data-query-suggestion]');
  if (!isCorrectionSuggestion(box)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}, true);

document.addEventListener('click', event => {
  const box = event.target.closest('.did-you-mean,[data-query-suggestion]');
  if (!isCorrectionSuggestion(box)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  const query = queryFromCorrection(box);
  if (box.classList.contains('did-you-mean')) {
    applyResultCorrectionAndRefresh(box, query);
    return;
  }
  applyCorrectionSearch(query);
}, true);
