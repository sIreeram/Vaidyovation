// Finishes GitHub login and hands the token back to Decap CMS
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const saved = (cookie.match(/oauth_state=([^;]+)/) || [])[1];
  if (!code || !state || state !== saved) return new Response('Invalid login state. Please try again.', { status: 400 });

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
  });
  const data = await res.json();
  const ok = !!data.access_token;
  const payload = JSON.stringify(ok ? { token: data.access_token, provider: 'github' } : { error: data.error || 'login failed' });
  const status = ok ? 'success' : 'error';
  const html = `<!doctype html><script>
(function(){
  function receive(e){
    window.opener.postMessage('authorization:github:${status}:' + ${JSON.stringify(payload)}, e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Set-Cookie': 'oauth_state=; Path=/; Max-Age=0' } });
}
