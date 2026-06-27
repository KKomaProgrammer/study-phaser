function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
      'access-control-allow-origin': '*'
    }
  });
}

function cleanSlug(params) {
  const raw = params?.slug;
  if (Array.isArray(raw)) return raw.join('/').replace(/^\/+|\/+$/g, '');
  return String(raw || '').replace(/^\/+|\/+$/g, '');
}

export async function onRequestGet({ request, params }) {
  const slug = cleanSlug(params);
  const target = new URL('/api/docs', request.url);
  if (slug) target.searchParams.set('slug', slug);

  try {
    const response = await fetch(target.toString(), {
      headers: { accept: 'application/json' },
      cf: { cacheTtl: 0, cacheEverything: false }
    });
    const text = await response.text();
    if (text && text.trim()) {
      return new Response(text, {
        status: response.status,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'access-control-allow-origin': '*'
        }
      });
    }
    return json({ doc: null, related: [], error: 'empty upstream response', slug }, 502);
  } catch (error) {
    return json({ doc: null, related: [], error: String(error?.message || error), slug }, 500);
  }
}
