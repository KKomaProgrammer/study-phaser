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
  return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
}
