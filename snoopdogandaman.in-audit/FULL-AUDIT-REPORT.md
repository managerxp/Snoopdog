# SEO audit: snoopdogandaman.in (2026-10-15)

Business type: local pet store (brick-and-mortar), Sri Vijaya Puram. Five pages.

**Scope and limits.** The claude-seo runtime was not set up (`/seo setup`), so this was done by hand with curl and by
reading the repo and a local build. No Core Web Vitals, crawl or Google API data. Scores are estimates.

**Live site health: ~55/100. The local build of this repo would score ~85+.** Almost everything below is "the server
is running an older deploy than the code in this repo".

## Critical

1. **Every URL returns the homepage with HTTP 200.** `/faq`, `/contact`, `/delivery`, `/privacy`, `/sitemap.xml`,
   `/llms.txt` and `/nonexistent-xyz` all return the same 62,298 bytes (verified byte-identical). Google sees five
   duplicate homepages plus infinite soft-404s, and the 404 page is never served. Cause: old nginx config with an
   SPA fallback and/or an old build. Repo `deploy/nginx.conf` uses `try_files $uri =404`, which is correct.
2. **No sitemap.** `/sitemap.xml` returns HTML. `robots.txt` live has no `Sitemap:` line (23 bytes).
3. **No canonical tags or og:image on the live site** (0 matches). The last build ran without `VITE_SITE_URL`.
   Local `dist/` has both.

## High

4. **www host has a broken certificate** (`https://www.snoopdogandaman.in` fails TLS name check). Run certbot with
   `-d snoopdogandaman.in -d www.snoopdogandaman.in` (DEPLOY.md step 5), then redirect www to the apex.
5. **No security headers live** (no HSTS, X-Content-Type-Options, CSP, Referrer-Policy). The repo ships a snippet;
   it is not installed on the server.
6. **Google verification not present** (tag is only in the local `index.html`, uncommitted).
7. **`/llms.txt` serves HTML** live (file exists in `public/`). Low ranking impact, but crawlers get junk.

## Medium

8. Local `dist/` pages have unique titles and canonicals (checked `/faq`); once deployed this resolves duplicate-content.
9. Homepage has 1 `<h1>`, 4 `<h2>`, 18 images, all with `alt` (the logo mark uses an empty alt, which is correct
   for decorative). Images are webp with srcset, width/height set, hero is `fetchpriority=high`. Good.
10. `PetStore` JSON-LD present with address, geo, hours, phone. Good. Add `url`, `image`, `priceRange` after
    `VITE_SITE_URL` is set (the repo notes the `url` field depends on it).

## Passing

HTTPS with 301 from http; gzip on; fast TTFB (~0.25s); lang `en-IN`; meta description; viewport; theme-color;
manifest; favicons; local-business schema; llms.txt authored; robots allows all.

## Local SEO (not checkable without Google data)

Claim and verify the Google Business Profile with the identical name, address and phone as the site
(Shop No. 03, First Floor, near Medical Bus Stop, Garacharama, 744105, +91 99332 14383). Ask customers for reviews.
Add the website URL to the profile. This will matter more than anything on-page for "pet store Sri Vijaya Puram".
