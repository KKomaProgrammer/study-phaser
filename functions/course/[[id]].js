export async function onRequest({ request, env }) {
  const url = new URL('/404.html', new URL(request.url).origin);
  const response = await env.ASSETS.fetch(new Request(url.toString(), request));
  const html = await response.text();
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
