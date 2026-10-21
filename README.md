# Vaidyovation: Illuminating Medical Innovation
Astro + Decap CMS, hosted on Cloudflare Pages.

## Run locally
    npm install && npm run dev

## Cloudflare Pages
Framework: Astro | Build: `npm run build` | Output: `dist` | Env var: `NODE_VERSION=20`

## CMS login (/admin)
1. Replace `YOUR-SITE.pages.dev` in `public/admin/config.yml` and `YOUR_GITHUB_USERNAME` with real values.
2. GitHub > Settings > Developer settings > OAuth Apps > New:
   Homepage `https://YOUR-SITE.pages.dev`, Callback `https://YOUR-SITE.pages.dev/api/callback`.
3. Cloudflare Pages > Settings > Variables and Secrets: add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, then redeploy.
4. Add the author as a collaborator (write access) on the repo.

## Newsletter
Set `BUTTONDOWN` username in `src/pages/index.astro`.

## Likes & comments (giscus)
1. Repo must be **public**; enable Settings > General > Features > Discussions.
2. Install the app: https://github.com/apps/giscus (grant access to this repo).
3. https://giscus.app: enter repo, pick Announcements category, copy `data-repo-id` and `data-category-id` into `src/components/Comments.astro`.

## Listen voice
Picks an Indian-English female voice available on the reader's device.
