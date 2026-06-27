function cleanSlug(params) {
  const raw = params?.slug;
  if (Array.isArray(raw)) return raw.join('/').replace(/^\/+|\/+$/g, '');
  return String(raw || '').replace(/^\/+|\/+$/g, '');
}

export async function onRequestGet({ request, params }) {
  const slug = cleanSlug(params);
  const target = new URL('/api/docs', request.url);
  if (slug) target.searchParams.set('slug', slug);

  return Response.redirect(target.toString(), 302);
}
