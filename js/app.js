const app = document.getElementById('app');
const esc = (value = '') => String(value).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const api = url => fetch(url).then(async response => {
  const text = await response.text();
  try { return JSON.parse(text); } catch { throw new Error('API가 JSON이 아닌 응답을 반환했습니다.'); }
});
const cleanPath = () => decodeURIComponent(location.pathname).replace(/^\/+|\/+$/g, '');

let editor = null;
let fallback = null;
let searchTimer = null;
let rendering = false;
let docsCache = null;
let categoriesCache = [];
const selectedCategories = new Set();

const COURSE_DEFS = [
  {
    id: '입문',
    title: '기본 입문 코스',
    icon: '✨',
    summary: 'Phaser 프로젝트가 시작되는 구조부터 Scene 생명주기, 에셋 로딩, 화면 배치까지 순서대로 익힙니다.',
    docs: ['new Phaser.Game(config)', 'GameConfig.type', 'GameConfig.width / height', 'scene: class / object / array', 'preload()', 'create()', 'update(time, delta)', 'this.add.image()', 'this.add.text()']
  },
  {
    id: '물리엔진',
    title: '물리엔진 코스',
    icon: '🧭',
    summary: 'Arcade Physics와 Matter Physics의 차이, body 제어, 충돌과 겹침 판정 흐름을 배웁니다.',
    docs: ['physics.arcade config', 'this.physics.add.sprite()', 'this.physics.add.staticGroup()', 'body.setVelocity()', 'body.setGravityY()', 'body.setBounce()', 'this.physics.add.collider()', 'this.physics.add.overlap()', 'Matter Physics 기본']
  },
  {
    id: '자주쓰는코드',
    title: '자주 쓰는 코드 코스',
    icon: '⚡',
    summary: '입력, 트윈, 타이머, 카메라, 사운드처럼 실제 제작 중 계속 반복해서 쓰는 코드를 모았습니다.',
    docs: ['setInteractive()', 'pointerdown / pointermove / pointerup', 'keyboard.createCursorKeys()', 'keyboard.addKey()', 'this.tweens.add()', 'this.time.delayedCall()', 'this.time.addEvent()', 'this.cameras.main', 'camera.startFollow()', 'this.sound.add()']
  }
];

function disposeEditor() {
  if (editor) {
    editor.dispose();
    editor = null;
  }
  fallback = null;
}

async function ensureData() {
  if (docsCache) return docsCache;
  const data = await api('/api/docs');
  docsCache = data.docs || [];
  categoriesCache = data.categories || [];
  return docsCache;
}

function byTitle(title) {
  return (docsCache || []).find(doc => doc.title === title);
}

function nav(extra = '') {
  return `<header class="top-nav">
    <div class="top-nav-inner">
      <a class="brand-link" href="/" data-nav aria-label="메인으로 돌아가기">
        <span class="brand-orb small-orb">P</span><span>Phaser Syntax Search</span>
      </a>
      ${extra}
      <a class="icon-home" href="/" data-nav title="메인으로 돌아가기" aria-label="메인으로 돌아가기">⌂</a>
    </div>
  </header>`;
}

function viewWrap(content, name = 'page') {
  return `<div class="view view-enter ${name}-view">${content}</div>`;
}

function courseCard(course) {
  return `<a class="course-card glass-card" href="/course/${encodeURIComponent(course.id)}" data-nav>
    <span class="course-icon">${course.icon}</span>
    <strong>${esc(course.title)}</strong>
    <p>${esc(course.summary)}</p>
    <small>${course.docs.length}개 문서로 구성</small>
  </a>`;
}

function docMiniCard(doc, className = 'result-card') {
  return `<a class="${className}" href="/${encodeURIComponent(doc.slug)}" data-nav>
    <div class="result-meta"><span class="badge">${esc(doc.category)}</span>${(doc.tags || []).slice(0, 2).map(tag => `<span class="tiny-tag">${esc(tag)}</span>`).join('')}</div>
    <h3>${esc(doc.title)}</h3>
    <p>${esc(doc.summary || '')}</p>
  </a>`;
}

async function home() {
  disposeEditor();
  await ensureData();
  const popular = docsCache.filter(doc => doc.popular).slice(0, 10);
  const categoryButtons = categoriesCache.map(cat => `<button type="button" class="category-chip" data-category="${esc(cat.name)}">#${esc(cat.name)}</button>`).join('');
  app.innerHTML = viewWrap(`
    <main class="search-home">
      <section class="home-hero ai-surface">
        <div class="aurora-dot dot-a"></div><div class="aurora-dot dot-b"></div>
        <p class="kicker">PHASER SYNTAX ENGINE</p>
        <h1><span>Phaser</span> 문법 검색</h1>
        <p>문서 이름을 가장 먼저 찾고, 문서 내용·태그·카테고리는 후순위로 찾습니다. <b>#로더</b>, <b>#게임오브젝트</b>처럼 카테고리도 직접 입력할 수 있습니다.</p>
      </section>

      <section class="search-panel" id="searchPanel">
        <form id="searchForm" class="search-shell" autocomplete="off">
          <div class="search-main-row">
            <span class="search-icon">⌕</span>
            <input id="searchInput" placeholder="sprite, camera, #로더, 충돌, 타이머..." />
            <button class="primary-button">검색</button>
          </div>
          <div class="category-board" id="categoryBoard">
            <div class="board-head"><strong>카테고리 선택</strong><span>여러 개 선택 가능 · 선택할 때마다 자동 검색</span></div>
            <div class="category-grid">${categoryButtons}</div>
            <div class="selected-line" id="selectedLine"></div>
          </div>
        </form>
        <div id="suggestions" class="suggestion-popover" hidden></div>
      </section>

      <section class="home-section courses-section">
        <div class="section-title"><p class="kicker">LEARNING PATH</p><h2>기본 코스</h2><span>문법과 물리엔진, 자주 쓰는 코드를 코스에 맞춰 학습</span></div>
        <div class="course-grid">${COURSE_DEFS.map(courseCard).join('')}</div>
      </section>

      <section class="home-section frequent-section">
        <div class="section-title"><p class="kicker">POPULAR DOCS</p><h2>자주 사용하는 문법 문서</h2><span>프로젝트에서 가장 많이 다시 찾는 문서입니다.</span></div>
        <div class="frequent-grid">${popular.map(doc => docMiniCard(doc, 'frequent-card')).join('')}</div>
      </section>

      <section id="resultsArea" class="results-area"></section>
    </main>
  `, 'home');
  bindHomeSearch();
  await doSearch('', { initial: true });
}

function renderSelectedLine() {
  const el = document.getElementById('selectedLine');
  if (!el) return;
  const values = Array.from(selectedCategories);
  el.innerHTML = values.length ? values.map(cat => `<button type="button" class="selected-tag" data-remove-category="${esc(cat)}">#${esc(cat)} ×</button>`).join('') : '<span>카테고리를 선택하거나 검색창에 #카테고리를 입력하세요.</span>';
  document.querySelectorAll('[data-category]').forEach(btn => btn.classList.toggle('active', selectedCategories.has(btn.dataset.category)));
}

function bindHomeSearch() {
  const panel = document.getElementById('searchPanel');
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  if (!panel || !form || !input) return;
  renderSelectedLine();

  panel.addEventListener('focusin', () => {
    panel.classList.add('is-focused');
    renderSuggestions((docsCache || []).filter(doc => doc.popular).slice(0, 6));
  });
  panel.addEventListener('focusout', () => setTimeout(() => {
    if (!panel.contains(document.activeElement)) panel.classList.remove('is-focused');
  }, 90));

  form.addEventListener('submit', event => {
    event.preventDefault();
    doSearch(input.value);
  });
  input.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(input.value), 130);
  });

  form.addEventListener('click', event => {
    const categoryButton = event.target.closest('[data-category]');
    const removeButton = event.target.closest('[data-remove-category]');
    if (categoryButton) {
      const value = categoryButton.dataset.category;
      selectedCategories.has(value) ? selectedCategories.delete(value) : selectedCategories.add(value);
      renderSelectedLine();
      doSearch(input.value);
    }
    if (removeButton) {
      selectedCategories.delete(removeButton.dataset.removeCategory);
      renderSelectedLine();
      doSearch(input.value);
    }
  });
}

function renderSuggestions(list = []) {
  const box = document.getElementById('suggestions');
  if (!box) return;
  if (!list.length) {
    box.hidden = true;
    box.innerHTML = '';
    return;
  }
  box.hidden = false;
  box.innerHTML = `<div class="suggest-title">추천 검색어</div>${list.slice(0, 7).map(doc => `<a class="suggest-item" href="/${encodeURIComponent(doc.slug)}" data-nav><span>${esc(doc.title)}</span><small>${esc(doc.category)}</small></a>`).join('')}`;
}

async function doSearch(query = '', options = {}) {
  const resultsArea = document.getElementById('resultsArea');
  if (!resultsArea) return;
  const categories = Array.from(selectedCategories);
  const url = `/api/search?q=${encodeURIComponent(query)}&categories=${encodeURIComponent(categories.join(','))}`;
  const data = await api(url);
  renderSuggestions(data.suggestions || []);
  const results = data.results || [];
  const filterText = [...categories, ...(data.activeCategories || []).filter(cat => !categories.includes(cat))];
  resultsArea.innerHTML = `
    <div class="results-head">
      <div><h2>${options.initial ? '검색 결과 미리보기' : '검색 결과'}</h2><p>${filterText.length ? filterText.map(x => '#' + x).join(' ') + ' 범위에서 검색 중' : '전체 문서에서 검색 중'}</p></div>
      <span>${results.length}개</span>
    </div>
    ${results.length ? results.map(doc => docMiniCard(doc)).join('') : '<div class="empty-state">결과가 없습니다. 다른 단어나 #카테고리로 검색해 보세요.</div>'}
  `;
}

async function coursePage(courseId = '') {
  disposeEditor();
  await ensureData();
  const all = COURSE_DEFS;
  const course = all.find(item => item.id === courseId) || null;
  if (!course) {
    app.innerHTML = viewWrap(nav() + `<main class="course-shell"><section class="section-title"><p class="kicker">COURSES</p><h1>기본 코스 전체</h1><span>원하는 흐름을 선택해 학습하세요.</span></section><div class="course-grid wide">${all.map(courseCard).join('')}</div></main>`, 'course');
    return;
  }
  const items = course.docs.map(byTitle).filter(Boolean);
  app.innerHTML = viewWrap(nav(`<a class="ghost-button" href="/course" data-nav>코스 전체</a>`) + `
    <main class="course-shell">
      <section class="course-hero ai-surface">
        <div class="course-icon big">${course.icon}</div>
        <p class="kicker">LEARNING PATH</p>
        <h1>${esc(course.title)}</h1>
        <p>${esc(course.summary)}</p>
      </section>
      <section class="course-timeline">
        ${items.map((doc, index) => `<a class="timeline-row" href="/${encodeURIComponent(doc.slug)}" data-nav>
          <span class="step-no">${String(index + 1).padStart(2, '0')}</span>
          <div><strong>${esc(doc.title)}</strong><p>${esc(doc.summary)}</p></div>
          <em>${esc(doc.category)}</em>
        </a>`).join('')}
      </section>
    </main>
  `, 'course');
}

async function docPage(slug) {
  disposeEditor();
  const data = await api('/api/docs?slug=' + encodeURIComponent(slug));
  const d = data.doc;
  if (!d) {
    await home();
    return;
  }
  app.innerHTML = viewWrap(nav(`<form class="mini-search" id="miniSearch"><span>⌕</span><input id="miniInput" placeholder="문서 검색" /></form>`) + `
    <main class="doc-shell">
      <article class="doc-main">
        <section class="doc-hero ai-surface">
          <p class="kicker">${esc(d.category)}</p>
          <h1>${esc(d.title)}</h1>
          <p>${esc(d.summary)}</p>
          <div class="doc-tags">${(d.tags || []).map(tag => `<span class="tiny-tag">${esc(tag)}</span>`).join('')}</div>
        </section>
        <section class="doc-body">
          ${(d.sections || []).map(section => `<section class="doc-section"><h2>${esc(section.heading)}</h2>${(section.paragraphs || []).map(p => `<p>${esc(p)}</p>`).join('')}${section.code ? `<pre class="code-block"><code>${esc(section.code)}</code></pre>` : ''}${section.list ? `<ul>${section.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</section>`).join('')}
          <section class="code-lab">
            <div class="code-lab-head"><div><h2>작은 Monaco Editor</h2><p>서버 요청 없이 브라우저 안에서 바로 실행합니다. 문서의 일부처럼 작게 배치했습니다.</p></div><span class="local-badge">LOCAL</span></div>
            <div id="ed" class="editor-frame"><textarea class="editor-fallback">${esc(d.code || '')}</textarea></div>
            <div class="stdin-row"><label for="stdinBox">입력값 stdin</label><textarea id="stdinBox" placeholder="필요하면 입력값을 적으세요."></textarea></div>
            <div class="run-row"><button id="run" class="primary-button" type="button">사이트에서 실행</button><button id="resetCode" class="ghost-button" type="button">예제 복원</button><span id="st" class="status-text">로컬 실행 대기 중</span></div>
            <pre id="out" class="output-pre">결과가 여기에 표시됩니다.</pre>
          </section>
        </section>
      </article>
      <aside class="related-sidebar">
        <div class="related-card"><h2>연관된 문서</h2><div class="related-list">${(data.related || []).map(r => `<a class="related-link" href="/${encodeURIComponent(r.slug)}" data-nav><strong>${esc(r.title)}</strong><small>${esc(r.summary)}</small></a>`).join('')}</div></div>
      </aside>
    </main>
  `, 'doc');
  bindDoc(d);
}

function bindDoc(doc) {
  const mini = document.getElementById('miniSearch');
  if (mini) {
    mini.addEventListener('submit', event => {
      event.preventDefault();
      const q = document.getElementById('miniInput').value.trim();
      go('/?q=' + encodeURIComponent(q));
    });
  }
  fallback = document.querySelector('.editor-fallback');
  loadEditor(doc.code || 'console.log("Phaser");');
  document.getElementById('run').addEventListener('click', runLocal);
  document.getElementById('resetCode').addEventListener('click', () => {
    if (editor) editor.setValue(doc.code || '');
    else fallback.value = doc.code || '';
    document.getElementById('st').textContent = '예제를 복원했습니다';
  });
}

function loadEditor(code) {
  if (!window.require) return;
  window.require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' } });
  window.require(['vs/editor/editor.main'], () => {
    const el = document.getElementById('ed');
    if (!el || !fallback) return;
    fallback.remove();
    editor = monaco.editor.create(el, {
      value: code,
      language: 'javascript',
      theme: 'vs-dark',
      fontSize: 12,
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on',
      padding: { top: 10, bottom: 10 }
    });
  });
}

function formatValue(value) {
  if (typeof value === 'string') return value;
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}

function runLocal() {
  const output = document.getElementById('out');
  const status = document.getElementById('st');
  const stdin = document.getElementById('stdinBox')?.value || '';
  const code = editor ? editor.getValue() : (fallback ? fallback.value : '');
  const lines = [];
  const fakeConsole = {
    log: (...args) => lines.push(args.map(formatValue).join(' ')),
    warn: (...args) => lines.push('[warn] ' + args.map(formatValue).join(' ')),
    error: (...args) => lines.push('[error] ' + args.map(formatValue).join(' '))
  };
  try {
    status.textContent = '브라우저 내부에서 실행 중';
    const result = Function('stdin', 'console', '"use strict";\n' + code)(stdin, fakeConsole);
    if (result !== undefined) lines.push('return: ' + formatValue(result));
    output.textContent = lines.join('\n') || '출력 없음';
    status.textContent = '완료 · 서버 요청 없음';
  } catch (error) {
    output.textContent = `${error.name}: ${error.message}`;
    status.textContent = '오류 발생';
  }
}

async function render() {
  if (rendering) return;
  rendering = true;
  const route = cleanPath();
  try {
    if (!route) await home();
    else if (route === 'course') await coursePage('');
    else if (route.startsWith('course/')) await coursePage(route.split('/').slice(1).join('/'));
    else await docPage(route);
    requestAnimationFrame(() => app.querySelector('.view')?.classList.add('view-ready'));
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (!route && q) {
      const input = document.getElementById('searchInput');
      if (input) input.value = q;
      await doSearch(q);
    }
  } catch (error) {
    app.innerHTML = viewWrap(`<main class="error-screen"><h1>화면을 불러오지 못했습니다</h1><p>${esc(error.message)}</p><a class="primary-button" href="/" data-nav>메인으로 돌아가기</a></main>`, 'error');
  } finally {
    rendering = false;
  }
}

function go(url) {
  const next = new URL(url, location.origin);
  if (next.pathname === location.pathname && next.search === location.search) return;
  const current = app.querySelector('.view');
  const move = () => {
    history.pushState({}, '', next.pathname + next.search);
    render();
  };
  if (current) {
    current.classList.add('view-exit');
    setTimeout(move, 170);
  } else move();
}

document.addEventListener('click', event => {
  const link = event.target.closest('[data-nav]');
  if (!link) return;
  event.preventDefault();
  go(link.getAttribute('href'));
});
window.addEventListener('popstate', render);
render();
