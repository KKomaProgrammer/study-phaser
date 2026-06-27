import './correction-top-doc.js';
import './course-back-fix.js';
import './stability-fix.js';
import './doc-load-fix.js';

function isHtml(text) {
  return /^\s*<!doctype html>/i.test(text || '') || /^\s*<html[\s>]/i.test(text || '');
}
//
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
    .replace(/\)\s*const/g, ')\nconst')
    .replace(/\)\s*let/g, ')\nlet')
    .replace(/\)\s*var/g, ')\nvar')
    .replace(/\{\n\s*\}/g, '{}')
    .replace(/\n{3,}/g, '\n\n');

  const lines = out.split('\n');
  let depth = 0;
  return lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (/^[}\])]/.test(trimmed)) depth = Math.max(0, depth - 1);
    const padded = '  '.repeat(depth) + trimmed;
    const opens = (trimmed.match(/[\{\[\(]/g) || []).length;
    const closes = (trimmed.match(/[\}\]\)]/g) || []).length;
    depth = Math.max(0, depth + opens - closes);
    return padded;
  }).join('\n');
}

function beautifyCodeBlocks(root = document) {
  root.querySelectorAll('pre.code-block code, textarea.editor-fallback').forEach(el => {
    if (el.dataset.prettyDone) return;
    const value = el.tagName === 'TEXTAREA' ? el.value : el.textContent;
    const pretty = prettyCode(value);
    if (el.tagName === 'TEXTAREA') el.value = pretty;
    else el.textContent = pretty;
    el.dataset.prettyDone = '1';
  });
}

new MutationObserver(() => beautifyCodeBlocks()).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', () => beautifyCodeBlocks());
setTimeout(() => beautifyCodeBlocks(), 500);
