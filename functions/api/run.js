const TARGET_URL = 'https://www.mycompiler.io/exec/run/nodejs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export async function onRequest({ request }) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (request.method !== 'POST') {
    return json({
      error: 'POST 요청만 지원합니다.'
    }, 405);
  }

  try {
    const body = await request.json();
    const rawCode = typeof body.code === 'string' ? body.code : '';
    const code = normalizeCode(rawCode);
    const stdin = typeof body.stdin === 'string' ? body.stdin : '';
    const files = isPlainObject(body.files) ? body.files : {};

    if (!code.trim()) {
      return json({
        error: '실행할 code가 비어 있습니다.'
      }, 400);
    }

    if (code.length > 120000) {
      return json({
        error: '코드가 너무 깁니다. 120,000자 이하로 줄여 주세요.'
      }, 413);
    }

    const requestBody = {
      code,
      stdin,
      files
    };

    const upstream = await fetch(TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const text = await upstream.text();
    const data = parseUpstreamResponse(text);

    return json({
      payload: typeof data.payload === 'string' ? data.payload : '',
      files: Array.isArray(data.files) ? data.files : []
    }, upstream.ok ? 200 : upstream.status);
  } catch (error) {
    return json({
      error: error && error.message ? error.message : '실행 중 알 수 없는 오류가 발생했습니다.'
    }, 500);
  }
}

function normalizeCode(code) {
  if (code.includes('\\n') && !code.includes('\n')) {
    return code.replaceAll('\\n', '\n');
  }

  return code;
}

function isPlainObject(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value);
}

function parseUpstreamResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {
      payload: text,
      files: []
    };
  }
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
