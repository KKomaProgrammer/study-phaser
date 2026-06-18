const TARGET_URL = 'https://www.mycompiler.io/exec/run/nodejs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost({ request }) {
  try {
    const body = await request.json();
    const code = typeof body.code === 'string' ? body.code : '';
    const stdin = typeof body.stdin === 'string' ? body.stdin : '';
    const files = body.files && typeof body.files === 'object' && !Array.isArray(body.files) ? body.files : {};

    if (!code.trim()) return json({ error: '실행할 code가 비어 있습니다.' }, 400);
    if (code.length > 120000) return json({ error: '코드가 너무 깁니다. 120,000자 이하로 줄여 주세요.' }, 413);

    const upstream = await fetch(TARGET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ code, stdin, files })
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { payload: text, files: [] };
    }

    return json({
      payload: typeof data.payload === 'string' ? data.payload : '',
      files: Array.isArray(data.files) ? data.files : []
    }, upstream.ok ? 200 : upstream.status);
  } catch (error) {
    return json({ error: error.message || '실행 중 알 수 없는 오류가 발생했습니다.' }, 500);
  }
}

export function onRequest() {
  return json({ error: 'POST 요청만 지원합니다.' }, 405);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
