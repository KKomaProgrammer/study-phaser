const TARGET = 'https://www.mycompiler.io/exec/run/nodejs';
const HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type'
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: HEADERS });
}
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}
export async function onRequestPost({ request }) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = String(body.code || '').slice(0, 20000);
    const stdin = String(body.stdin || '').slice(0, 8000);
    const files = body.files && typeof body.files === 'object' ? body.files : {};
    const upstream = await fetch(TARGET, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code, stdin, files })
    });
    const text = await upstream.text();
    try {
      const data = JSON.parse(text);
      return json({ payload: String(data.payload || ''), files: Array.isArray(data.files) ? data.files : [] }, upstream.status);
    } catch {
      return json({ payload: text, files: [] }, upstream.status);
    }
  } catch (error) {
    return json({ payload: '실행 요청 실패: ' + (error && error.message ? error.message : String(error)), files: [] }, 500);
  }
}
