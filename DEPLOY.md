# Deploying SnoopDog

A static, pre-rendered website: `npm run build` writes plain HTML, CSS and JS into `dist/`, and nginx serves it. There is
no backend, no database and no secrets. The same one-VPS pattern as FlowXP (`flowxp/DEPLOY.md`), minus PM2 and
Postgres. You need a Linux server with nginx, Node 22+, git, and a domain with DNS pointing at the server.

## How it is laid out

```
/var/www/snoopdog/
  releases/20261012-101500/   every deploy is a full copy of dist/
  releases/20261012-143000/
  current -> releases/20261012-143000     what nginx serves
```

A deploy builds the site, copies it to a new folder, and flips `current` in one step, so visitors never see a
half-copied site. A rollback flips it back to the previous folder. The last 5 releases are kept.

## 1. One-time server setup

```bash
sudo apt update && sudo apt install -y nginx git certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs

sudo mkdir -p /var/www/snoopdog/releases
sudo chown -R $USER:$USER /var/www/snoopdog          # the user who will run deploys

git clone <your repo> ~/snoopdog && cd ~/snoopdog
```

## 2. The domain setting

The domain is `snoopdogandaman.in`. Create `.env.production` in the repo root (it is gitignored):

```
VITE_SITE_URL=https://snoopdogandaman.in
```

With this set, the build adds canonical links, the share image (`og:image`), structured-data `url`, `dist/sitemap.xml`
and the sitemap line in `robots.txt`. Without it the site works, but none of those are emitted, because they need
absolute URLs. No secrets belong in this file; every `VITE_` value ends up in the public site.

## 3. First release

```bash
chmod +x deploy/release.sh
./deploy/release.sh          # npm ci, build, copy to releases/<time>, point "current" at it
```

## 4. nginx

Replace `YOUR_DOMAIN` with the real domain (without `www.`) while installing:

```bash
sed 's/YOUR_DOMAIN/snoopdogandaman.in/g' deploy/nginx.conf | sudo tee /etc/nginx/sites-available/snoopdog >/dev/null
sudo mkdir -p /etc/nginx/snippets
sudo cp deploy/nginx-security-headers.conf /etc/nginx/snippets/snoopdog-security-headers.conf
sudo ln -s /etc/nginx/sites-available/snoopdog /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 5. HTTPS

DNS first: an `A` record for the domain and for `www` pointing at the server. Then:

```bash
sudo certbot --nginx -d snoopdogandaman.in -d www.snoopdogandaman.in
```

certbot edits the nginx config for you and renews the certificate on a timer. Check it with
`sudo certbot renew --dry-run`.

## Updating the site

```bash
cd ~/snoopdog && git pull && ./deploy/release.sh
```

**Rollback** (the previous release, instantly):

```bash
./deploy/release.sh rollback
```

Run it again to step back further. Nothing is deleted until it falls out of the last 5.

## What to change in the code

- **Phone and WhatsApp number, hours, address, Instagram:** `src/site.js` only. After editing, deploy.
- **Images:** `public/images/`. Replaced images keep their name, so they are cached for 7 days.

## Caching

| Path | Cache | Why |
|---|---|---|
| `/assets/*`, `/static-loader-data/*` | 1 year, immutable | file names contain a content hash |
| `/images/*` | 7 days | names do not change when an image is replaced |
| pages, `robots.txt`, `sitemap.xml` | revalidate every time | a new release appears at once |

There is no CDN. If traffic ever outgrows the VPS, put Cloudflare in front; these headers already suit it.

## Checks after a deploy

```bash
curl -I https://snoopdogandaman.in/            # 200, with Content-Security-Policy and Strict-Transport-Security
curl -I https://snoopdogandaman.in/delivery    # 200 (served from delivery.html)
curl -I https://snoopdogandaman.in/nope        # 404, served with the SnoopDog 404 page
curl https://snoopdogandaman.in/sitemap.xml    # lists 5 pages
```

Then open the site on a phone, tap WhatsApp and Call, and open Directions.

## Monitoring and logs

- Access and error logs: `/var/log/nginx/access.log` and `error.log` (rotated by the system's logrotate).
- Add the homepage to a free uptime monitor (UptimeRobot or similar). There is no health endpoint because there is no app.
- The privacy page says the server may keep standard access logs. Keep it that way, or update the page.

## Security notes

- The headers are in `deploy/nginx-security-headers.conf`, explained line by line there. The policy allows inline
  scripts only because the pre-renderer writes two small ones into every page. That is fine while the site has no
  forms or user input; switch to nonces if that changes.
- Keep nginx and the OS patched (`sudo apt upgrade`). `npm audit` currently reports a moderate advisory in
  `react-router` with no fix released; it affects server-rendered redirects and error data this static site does not
  use. Re-check with `npm audit` every few months.
- Do not put anything private in the repo or in `.env.production`.

## Cost

A small VPS (the one you already pay for) and the domain name (yearly). Nothing else: certbot certificates are free,
and the site is a few hundred kilobytes.
