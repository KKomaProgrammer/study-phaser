function isCorrectionSuggestion(element) {
  if (!element) return false;
  const text = element.textContent || '';
  const label = element.querySelector('small')?.textContent || '';
  return element.classList.contains('did-you-mean') || label.includes('맞춤법') || text.includes('이 검색어를 찾으셨나요') || text.includes('검색어를 찾으셨나요');
}

function closeCorrectionSearchUi() {
  document.querySelectorAll('.suggestion-popover,.mini-suggestion-popover').forEach(box => {
    box.hidden = true;
    box.innerHTML = '';
  });
  document.querySelectorAll('#searchInput,#miniInput').forEach(input => input.blur());
  document.querySelectorAll('.search-panel').forEach(panel => panel.classList.remove('is-focused'));
}

function moveCorrectionToDocument(slug) {
  const path = '/' + encodeURIComponent(slug);
  if (location.pathname !== path) history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

async function openTopDocumentForCorrection(query) {
  closeCorrectionSearchUi();
  const res = await fetch('/api/search?q=' + encodeURIComponent(query));
  const data = await res.json();
  const first = (data.results || [])[0];
  if (first && first.slug) moveCorrectionToDocument(first.slug);
}

document.addEventListener('pointerdown', event => {
  const box = event.target.closest('.did-you-mean,[data-query-suggestion]');
  if (!isCorrectionSuggestion(box)) return;
  event.preventDefault();
  event.stopPropagation();
}, true);

document.addEventListener('click', event => {
  const box = event.target.closest('.did-you-mean,[data-query-suggestion]');
  if (!isCorrectionSuggestion(box)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  openTopDocumentForCorrection(box.dataset.querySuggestion || box.textContent || '');
}, true);
