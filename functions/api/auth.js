// Starts GitHub login for the CMS (Cloudflare Pages Function)
export async function onRequestGet({ request, env }) {
  const origin = new URL(request.url).origin;
  const state = crypto.randomUUID();
  const url = 'https://github.com/login/oauth/authorize?' + new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${origin}/api/callback`,
    scope: 'repo,user',
    state,
  });
  return new Response(null, {
    status: 302,
    headers: { Location: url, 'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax` },
  });
}
