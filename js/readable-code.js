import './correction-top-doc.js?v=20260627_5';
import './course-back-fix.js?v=20260627_5';
import './stability-fix.js?v=20260627_5';
import './doc-load-fix.js?v=20260627_5';

function isHtml(text) {
  return /^\s*<!doctype html>/i.test(text || '') || /^\s*<html[\s>]/i.test(text || '');
}

function normalizeCodeBreaks(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, '  ')
    .replace(/[ \f\v]+/g, ' ')
    .replace(/\s*\{\s*/g, ' {\n')
    .replace(/\s*\}\s*/g, '\n}\n')
    .replace(/;[ \t]*/g, ';\n')
    .replace(/\)[ \t]*(function|if|for|while|const|let|var)\b/g, ')\n$1')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function prettyCode(text) {
  text = String(text || '').trim();
  if (!text || isHtml(text)) return text;

  const out = normalizeCodeBreaks(text);
  const lines = out.split('\n');
  let depth = 0;

  return lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';

    if (/^[}\])]/.test(trimmed)) depth = Math.max(0, depth - 1);
    const padded = '  '.repeat(depth) + trimmed;

    const withoutStrings = trimmed.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '');
    const opens = (withoutStrings.match(/[\{\[\(]/g) || []).length;
    const closes = (withoutStrings.match(/[\}\]\)]/g) || []).length;
    depth = Math.max(0, depth + opens - closes);

    return padded;
  }).join('\n');
}

function beautifyCodeBlocks(root = document, force = false) {
  root.querySelectorAll('pre.code-block code, textarea.editor-fallback').forEach(el => {
    if (!force && el.dataset.prettyDone) return;
    const value = el.tagName === 'TEXTAREA' ? el.value : el.textContent;
    const pretty = prettyCode(value);
    if (el.tagName === 'TEXTAREA') el.value = pretty;
    else el.textContent = pretty;
    el.dataset.prettyDone = '1';
  });
}

function applyReadability(button) {
  beautifyCodeBlocks(document, true);
  document.querySelectorAll('.code-block, .output-pre, .editor-fallback').forEach(el => {
    el.style.whiteSpace = 'pre-wrap';
    el.style.tabSize = '2';
    el.style.lineHeight = '1.62';
  });
  document.querySelectorAll('.doc-section p, .doc-section li').forEach(el => {
    el.style.lineHeight = '1.78';
    el.style.wordBreak = 'keep-all';
    el.style.overflowWrap = 'anywhere';
  });
  if (button) {
    const old = button.textContent;
    button.textContent = '가독성 교정 완료';
    setTimeout(() => { button.textContent = old; }, 1200);
  }
}

function ensureReadabilityButton() {
  const docBody = document.querySelector('.doc-view .doc-body');
  if (!docBody) return;

  let tools = docBody.querySelector('[data-readability-tools]');
  if (!tools) {
    tools = document.createElement('div');
    tools.className = 'run-row readability-tools';
    tools.dataset.readabilityTools = '1';
    tools.innerHTML = '<button class="ghost-button" type="button" data-readability-fix>가독성 교정</button><span class="status-text">코드 줄바꿈과 들여쓰기를 정리합니다.</span>';
    docBody.insertBefore(tools, docBody.firstElementChild || null);
  }

  const button = tools.querySelector('[data-readability-fix]');
  if (!button || button.dataset.bound) return;
  button.dataset.bound = '1';
  button.addEventListener('click', () => applyReadability(button));

  setTimeout(() => {
    if (!button.dataset.autoClicked) {
      button.dataset.autoClicked = '1';
      button.click();
    }
  }, 80);
}

function runReadabilityPass() {
  beautifyCodeBlocks(document);
  ensureReadabilityButton();
}

new MutationObserver(runReadabilityPass).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', runReadabilityPass);
setTimeout(runReadabilityPass, 120);
setTimeout(runReadabilityPass, 500);
setTimeout(runReadabilityPass, 1200);
