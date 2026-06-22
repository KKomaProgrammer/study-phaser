function showLoadError(reason = '') {
  const app = document.getElementById('app');
  if (!app) return;
  if (app.querySelector('.view')) return;
  const message = reason || '사이트를 불러오는 중 문제가 발생했습니다.';
  app.innerHTML = `<main class="error-screen">
    <div class="brand-orb">!</div>
    <h1>로드가 지연되었습니다</h1>
    <p>${message}</p>
    <div class="run-row">
      <button class="primary-button" type="button" data-reload-page>새로고침</button>
      <button class="ghost-button" type="button" data-go-home>메인으로</button>
    </div>
  </main>`;
}

function clearInvisibleViews() {
  document.querySelectorAll('.view:not(.view-exit)').forEach(view => {
    view.style.opacity = '1';
    view.style.transform = 'none';
  });
}

function stillLoading() {
  const app = document.getElementById('app');
  return !!app && !!app.querySelector(':scope > .boot-screen, :scope > .loading-screen');
}

setInterval(clearInvisibleViews, 700);
requestAnimationFrame(clearInvisibleViews);

setTimeout(() => {
  clearInvisibleViews();
  if (stillLoading()) {
    showLoadError('API 응답이 늦거나 실패해서 로딩 화면이 계속 유지되었습니다.');
  }
}, 9000);

window.addEventListener('error', event => {
  clearInvisibleViews();
  if (stillLoading()) showLoadError(event.message || '스크립트 실행 중 오류가 발생했습니다.');
});

window.addEventListener('unhandledrejection', event => {
  clearInvisibleViews();
  const reason = event.reason?.message || String(event.reason || '비동기 로드 중 오류가 발생했습니다.');
  if (stillLoading()) showLoadError(reason);
});

document.addEventListener('click', event => {
  if (event.target.closest('[data-reload-page]')) {
    location.reload();
    return;
  }
  if (event.target.closest('[data-go-home]')) {
    location.href = '/';
  }
});
