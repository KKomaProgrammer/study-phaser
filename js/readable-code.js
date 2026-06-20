const INDENT = '  ';
const KEYWORDS = new Set(['if', 'for', 'while', 'switch', 'catch', 'function']);

function maskStrings(source) {
  const store = [];
  const text = source.replace(/`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"/g, match => {
    const key = `__STR_${store.length}__`;
    store.push(match);
    return key;
  });
  return { text, store };
}

function unmaskStrings(source, store) {
  return source.replace(/__STR_(\d+)__/g, (_, i) => store[Number(i)] ?? '');
}

function readableJavaScript(source) {
  if (!source || source.includes('\n  ') || source.split('\n').length > 6) return source.trim();
  const { text, store } = maskStrings(source.trim());
  let out = '';
  let depth = 0;
  let token = '';

  function pushToken() {
    if (!token.trim()) return;
    const trimmed = token.trim();
    if (out && !out.endsWith('\n') && !out.endsWith(' ')) out += ' ';
    out += trimmed;
    token = '';
  }

  function newline(extra = 0) {
    out = out.replace(/[ \t]+$/g, '');
    if (!out.endsWith('\n')) out += '\n';
    out += INDENT.repeat(Math.max(0, depth + extra));
  }

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const prevWord = token.trim().split(/\s+/).pop() || '';

    if (ch === '{') {
      pushToken();
      out = out.replace(/[ \t]+$/g, '');
      out += ' {';
      depth++;
      newline();
    } else if (ch === '}') {
      pushToken();
      depth = Math.max(0, depth - 1);
      newline();
      out = out.replace(/[ \t]+$/g, '') + '}';
      if (text[i + 1] !== ';' && text[i + 1] !== ',' && text[i + 1] !== ')' && text[i + 1] !== '}') newline();
    } else if (ch === ';') {
      pushToken();
      out += ';';
      newline();
    } else if (ch === ',') {
      pushToken();
      out += ',';
      if (depth > 0) newline();
      else out += ' ';
    } else if (ch === '(') {
      token += ch;
      if (KEYWORDS.has(prevWord)) token = token.replace(/\s*\($/, ' (');
    } else {
      token += ch;
    }
  }
  pushToken();
  return unmaskStrings(out, store)
    .split('\n')
    .map(line => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function formatVisibleExamples(root = document) {
  root.querySelectorAll('.code-block code').forEach(code => {
    if (code.dataset.readableDone === '1') return;
    const text = code.textContent;
    if (!text.includes('<!doctype html>')) code.textContent = readableJavaScript(text);
    code.dataset.readableDone = '1';
  });
  root.querySelectorAll('.editor-fallback').forEach(area => {
    if (area.dataset.readableDone === '1') return;
    area.value = readableJavaScript(area.value);
    area.dataset.readableDone = '1';
  });
}

const observer = new MutationObserver(() => formatVisibleExamples());
observer.observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', () => formatVisibleExamples());
setInterval(() => formatVisibleExamples(), 700);
