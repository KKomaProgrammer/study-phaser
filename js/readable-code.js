import './correction-top-doc.js?v=20260627_6';
import './course-back-fix.js?v=20260627_6';
import './stability-fix.js?v=20260627_6';
import './doc-load-fix.js?v=20260627_6';

function removeReadabilityTools() {
  document.querySelectorAll('[data-readability-tools], [data-readability-fix]').forEach(element => element.remove());
}

new MutationObserver(removeReadabilityTools).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', removeReadabilityTools);
setTimeout(removeReadabilityTools, 120);
setTimeout(removeReadabilityTools, 600);
