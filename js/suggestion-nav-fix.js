document.addEventListener('pointerdown', event => {
  const docButton = event.target.closest('[data-suggestion-doc]');
  if (!docButton) return;
  event.preventDefault();
  event.stopPropagation();
  const slug = docButton.dataset.suggestionDoc;
  if (slug) location.href = '/' + encodeURIComponent(slug);
}, true);
