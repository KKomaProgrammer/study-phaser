function cleanSlug(params) {
  return String(params?.slug || '').replace(/^\/+|\/+$/g, '');
}

export async function onRequestGet({ request, params }) {
  const slug = cleanSlug(params);
  const target = new URL('/api/docs', request.url);
  if (slug) target.searchParams.set('slug', slug);
  return Response.redirect(target.toString(), 302);
}
