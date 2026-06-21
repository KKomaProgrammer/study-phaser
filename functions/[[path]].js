export async function onRequest({ request, env }) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    return env.ASSETS.fetch(request);
  }

  const assetResponse = await env.ASSETS.fetch(request);
  if (assetResponse.status !== 404) {
    return assetResponse;
  }

  const indexUrl = new URL('/index.html', url.origin);
  const indexResponse = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  let html = await indexResponse.text();
  const originalPath = JSON.stringify(url.pathname + url.search + url.hash);
  html = html.replace('<head>', `<head><script>window.__SPA_INITIAL_PATH__=${originalPath};history.replaceState(null,'',window.__SPA_INITIAL_PATH__);</script>`);

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
