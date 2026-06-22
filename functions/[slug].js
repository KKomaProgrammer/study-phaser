function spaShell(request, env) {
  const url = new URL('/404.html', new URL(request.url).origin);
  return env.ASSETS.fetch(new Request(url.toString(), request)).then(async response => {
    const html = await response.text();
    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store'
      }
    });
  });
}

export async function onRequest({ request, env, params }) {
  const slug = String(params.slug || '');
  if (!slug || slug.includes('.')) return env.ASSETS.fetch(request);
  return spaShell(request, env);
}
