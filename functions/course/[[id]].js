function fallbackHtml() {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Phaser 문법 검색</title>
  <link rel="stylesheet" href="/css/styles.css" />
  <link rel="stylesheet" href="/css/overrides.css" />
  <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js"></script>
</head>
<body>
  <div id="app" class="app-root"><main class="boot-screen"><div class="brand-orb">P</div><p>Phaser 문법 검색기를 불러오는 중입니다</p></main></div>
  <script type="module" src="/js/app.js"></script>
  <script type="module" src="/js/readable-code.js"></script>
  <script type="module" src="/js/suggestion-nav-fix.js"></script>
</body>
</html>`;
}

export async function onRequest({ request, env }) {
  const url = new URL('/index.html', new URL(request.url).origin);
  let html = '';

  try {
    const response = await env.ASSETS.fetch(new Request(url.toString(), request));
    html = await response.text();
  } catch (_) {
    html = '';
  }

  if (!html || !html.trim()) html = fallbackHtml();

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
