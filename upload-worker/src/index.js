export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    if (request.method !== 'POST') {
      return new Response('Método no permitido', { status: 405 });
    }
    const form = await request.formData();
    const file = form.get('file');
    if (!file) return new Response('No file', { status: 400 });

    const key = `videos/${Date.now()}-${file.name}`;
    await env.VIDEOS_BUCKET.put(key, file.stream(), {
      httpMetadata: { contentType: file.type }
    });

    return new Response(JSON.stringify({ key }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
