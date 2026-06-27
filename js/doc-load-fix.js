const docFixEsc = value => String(value ?? '').replace(/[&<>"']/g, match => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[match]));
const docFixNorm = value => decodeURIComponent(String(value ?? '')).toLowerCase().replace(/[._()\/:'"]/g, ' ').replace(/\s+/g, ' ').trim();

function currentDocSlug() {
  const path = decodeURIComponent(location.pathname).replace(/^\/+|\/+$/g, '');
  if (!path) return '';
  if (path === 'popular' || path === 'course' || path.startsWith('course/')) return '';
  if (path.startsWith('api/') || path.startsWith('js/') || path.startsWith('css/') || path.startsWith('assets/')) return '';
  if (/\.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|json|txt|map|wasm|xml|webmanifest)$/i.test(path)) return '';
  return path;
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function findDoc(docs, slug) {
  const wanted = docFixNorm(slug);
  return docs.find(doc => doc.slug === slug || docFixNorm(doc.slug) === wanted || docFixNorm(doc.title) === wanted) || null;
}

function isBrokenDocumentScreen() {
  const app = document.getElementById('app');
  if (!app) return false;
  if (app.querySelector('.doc-view .doc-hero h1')) return false;
  return !!app.querySelector('.boot-screen,.loading-screen,.error-screen,.home-view,.empty-state') || !app.querySelector('.view');
}

function renderRecoveredDoc(doc, docs) {
  const app = document.getElementById('app');
  if (!app || !doc) return;
  const related = docs.filter(item => item.slug !== doc.slug && item.category === doc.category).slice(0, 5);
  const popular = docs.filter(item => item.popular).slice(0, 7);
  const sidebar = `<aside id="siteSidebar" class="site-sidebar"><div class="sidebar-brand"><span class="brand-orb mini-orb">P</span><strong>탐색 메뉴</strong></div><section class="side-section open"><div class="side-section-head"><a href="/popular" data-nav><span>자주 보는 문서</span></a><button type="button">⌄</button></div><div class="side-section-body"><div>${popular.map(item => `<a class="side-link" href="/${encodeURIComponent(item.slug)}" data-nav><span>${docFixEsc(item.title)}</span><small>${docFixEsc(item.category)}</small></a>`).join('')}</div></div></section></aside>`;
  const sections = (doc.sections || []).map(section => `<section class="doc-section"><h2>${docFixEsc(section.heading)}</h2>${(section.paragraphs || []).map(text => `<p>${docFixEsc(text)}</p>`).join('')}${section.list ? `<ul>${section.list.map(item => `<li>${docFixEsc(item)}</li>`).join('')}</ul>` : ''}${section.code ? `<pre class="code-block"><code>${docFixEsc(section.code)}</code></pre>` : ''}</section>`).join('');
  const relatedHtml = related.map(item => `<a class="related-link" href="/${encodeURIComponent(item.slug)}" data-nav><strong>${docFixEsc(item.title)}</strong><small>${docFixEsc(item.summary || '')}</small></a>`).join('');
  app.innerHTML = `<div class="view doc-view view-ready"><header class="top-nav"><div class="top-nav-inner"><a class="brand-link" href="/" data-nav><span class="brand-orb small-orb">P</span><span>Phaser 문법 검색</span></a><div class="nav-extra"></div><a class="icon-home" href="/" data-nav title="메인으로 돌아가기">⌂</a></div></header><div class="page-layout">${sidebar}<main class="page-content"><main class="doc-shell"><article class="doc-main"><section class="doc-hero ai-surface"><h1>${docFixEsc(doc.title)}</h1><p>${docFixEsc(doc.summary || '')}</p><div class="doc-tags"><span class="badge">${docFixEsc(doc.category || '')}</span>${(doc.tags || []).map(tag => `<span class="tiny-tag">${docFixEsc(tag)}</span>`).join('')}</div></section><section class="doc-body">${sections}<section class="code-lab"><div class="code-lab-head"><div><h2>예제 코드</h2><p>문서 로드 복구 화면입니다. 새로고침 후에도 문서를 표시합니다.</p></div><span class="local-badge">RECOVERED</span></div><div id="ed" class="editor-frame"><textarea class="editor-fallback">${docFixEsc(doc.code || '')}</textarea></div></section></section></article><aside class="related-sidebar"><div class="related-card"><h2>연관된 문서</h2><div class="related-list">${relatedHtml}</div></div></aside></main></main></div></div>`;
}

async function recoverDocumentLoad() {
  const slug = currentDocSlug();
  if (!slug || !isBrokenDocumentScreen()) return;
  const data = await fetchJson('/api/docs').catch(() => null);
  const docs = Array.isArray(data?.docs) ? data.docs : [];
  const doc = findDoc(docs, slug);
  if (doc) renderRecoveredDoc(doc, docs);
}

setTimeout(recoverDocumentLoad, 700);
setTimeout(recoverDocumentLoad, 1800);
setTimeout(recoverDocumentLoad, 3500);
window.addEventListener('popstate', () => setTimeout(recoverDocumentLoad, 400));
document.addEventListener('click', event => {
  if (event.target.closest('[data-nav]')) setTimeout(recoverDocumentLoad, 700);
});
