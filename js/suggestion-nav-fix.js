document.addEventListener('pointerdown', event => {
  const docButton = event.target.closest('[data-suggestion-doc]');
  if (!docButton) return;
  event.preventDefault();
}, true);

document.addEventListener('click', event => {
  const docButton = event.target.closest('[data-suggestion-doc]');
  if (!docButton) return;
  event.preventDefault();
  event.stopPropagation();
  const slug = docButton.dataset.suggestionDoc;
  if (!slug) return;
  const target = '/' + encodeURIComponent(slug);
  if (location.pathname !== target) history.pushState(null, '', target);
  window.dispatchEvent(new PopStateEvent('popstate'));
}, true);
