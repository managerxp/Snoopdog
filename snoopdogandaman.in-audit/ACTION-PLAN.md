# Action plan: snoopdogandaman.in

## Phase 1: Critical (today). One redeploy fixes items 1-4.

On the VPS:

```bash
cd ~/snoopdog && git pull
echo "VITE_SITE_URL=https://snoopdogandaman.in" > .env.production
./deploy/release.sh
sed 's/YOUR_DOMAIN/snoopdogandaman.in/g' deploy/nginx.conf | sudo tee /etc/nginx/sites-available/snoopdog >/dev/null
sudo cp deploy/nginx-security-headers.conf /etc/nginx/snippets/snoopdog-security-headers.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d snoopdogandaman.in -d www.snoopdogandaman.in
```

1. Push the verification tag in `index.html` to git first (needs a commit; not done yet).
2. Re-run certbot only if it asks; keep your existing certificate config.

Verify afterwards:

```bash
curl -sI https://snoopdogandaman.in/nonexistent-xyz | head -1   # expect 404
curl -s https://snoopdogandaman.in/sitemap.xml | head -2         # expect <?xml
curl -sI https://www.snoopdogandaman.in | head -1                # expect 301 to apex, no TLS error
```

## Phase 2: Search Console (same day)

3. Verify the property (HTML tag or DNS TXT) and submit `sitemap.xml`.
4. URL Inspection on `/`, then Request indexing for `/faq`, `/delivery`, `/contact`.

## Phase 3: Local (week 1-2)

5. Claim and complete the Google Business Profile; match NAP exactly; add the website link, hours, photos.
6. Ask for reviews; reply to them.

## Phase 4: Monitor

7. Re-run this audit after deploy. Run `/seo setup` first to get Core Web Vitals and crawl data.
