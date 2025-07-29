export const runtime = 'edge';
export const preferredRegion = ['iad1']; // 仅在美国东部执行

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.pathname + url.search;
  const target = `https://generativelanguage.googleapis.com${path}`;
  const headers = new Headers();

  if (req.headers.get('content-type'))
    headers.set('content-type', req.headers.get('content-type'));
  if (req.headers.get('authorization'))
    headers.set('authorization', req.headers.get('authorization'));
  if (url.searchParams.get('key'))
    headers.set('x-goog-api-key', url.searchParams.get('key'));

  const resp = await fetch(target, {
    method: req.method,
    headers,
    body: req.body,
  });
  return new Response(resp.body, {
    status: resp.status,
    headers: resp.headers,
  });
}
