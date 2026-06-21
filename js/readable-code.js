import './correction-top-doc.js';
import './course-back-fix.js';

function isHtml(text) {
  return /^\s*<!doctype html>/i.test(text || '') || /^\s*<html[\s>]/i.test(text || '');
}

function prettyCode(text) {
  text = String(text || '').trim();
  if (!text || isHtml(text)) return text;

  let out = text
    .replace(/\s+/g, ' ')
    .replace(/\s*\{\s*/g, ' {\n')
    .replace(/\s*\}\s*/g, '\n}\n')
    .replace(/;\s*/g, ';\n')
    .replace(/,\s*/g, ',\n')
    .replace(/\)\s*function/g, ')\nfunction')
    .replace(/\)\s*if/g, ')\nif')
    .replace(/\)\s*for/g, ')\nfor')
    .replace(/\)\s*while/g, ')\nwhile')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const lines = out.split('\n');
  let depth = 0;
  out = lines.map(raw => {
    let line = raw.trim();
    if (!line) return '';
    if (line.startsWith('}')) depth = Math.max(0, depth - 1);
    const indented = '  '.repeat(depth) + line;
    if (line.endsWith('{')) depth++;
    return indented;
  }).join('\n');

  return out.replace(/\n{3,}/g, '\n\n').trim();
}

function formatExamples() {
  document.querySelectorAll('.code-block code').forEach(code => {
    const next = prettyCode(code.textContent);
    if (next && next !== code.textContent.trim()) code.textContent = next;
  });

  document.querySelectorAll('.editor-fallback').forEach(area => {
    const next = prettyCode(area.value);
    if (next && next !== area.value.trim()) area.value = next;
  });

  if (globalThis.monaco && globalThis.monaco.editor) {
    globalThis.monaco.editor.getModels().forEach(model => {
      if (model.__prettyDone) return;
      const next = prettyCode(model.getValue());
      if (next && next !== model.getValue().trim()) model.setValue(next);
      model.__prettyDone = true;
    });
  }
}

new MutationObserver(formatExamples).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', formatExamples);
setInterval(formatExamples, 600);
