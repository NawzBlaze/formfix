const https = require('https');

const HOST = 'formfix.pages.dev';
const BASE = `https://${HOST}`;
const KEY = '3da1c84b7a814355bf26031c19fd73f5';
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

const ALL_URLS = [
  `${BASE}`,
  `${BASE}/tools`,
  `${BASE}/about`,
  `${BASE}/contact`,
  `${BASE}/compress-image`,
  `${BASE}/compress-image-to-50kb`,
  `${BASE}/compress-image-to-20kb`,
  `${BASE}/passport-size-photo`,
  `${BASE}/passport-photo-compressor`,
  `${BASE}/photo-compressor`,
  `${BASE}/official-passport-photo-maker`,
  `${BASE}/merge-pdf`,
  `${BASE}/split-pdf`,
  `${BASE}/rotate-pdf`,
  `${BASE}/pdf-to-image`,
  `${BASE}/signature-maker`,
  `${BASE}/qr-code-generator`,
  `${BASE}/password-generator`,
  `${BASE}/resume-builder`,
  `${BASE}/background-remover`,
  `${BASE}/black-and-white`,
  `${BASE}/blur-image`,
  `${BASE}/circle-crop`,
  `${BASE}/crop-image`,
  `${BASE}/resize-image`,
  `${BASE}/watermark-image`,
  `${BASE}/photo-to-sketch`,
  `${BASE}/convert-image`,
  `${BASE}/image-to-pdf`,
  `${BASE}/image-to-text`,
  `${BASE}/text-to-handwriting`,
  `${BASE}/age-calculator`,
  `${BASE}/percentage-calculator`,
  `${BASE}/file-size-converter`,
  `${BASE}/resize-image-for-passport`,
  `${BASE}/resize-image-for-instagram`,
  `${BASE}/resize-image-for-linkedin`,
  `${BASE}/privacy`,
  `${BASE}/terms`,
  `${BASE}/blog/how-to-compress-image-to-20kb`,
  `${BASE}/blog/best-image-size-for-online-forms`,
  `${BASE}/blog/reduce-image-size-without-losing-quality`,
  `${BASE}/guides/how-to-compress-image-to-50kb`,
  `${BASE}/guides/how-to-compress-image-to-20kb`,
  `${BASE}/guides/passport-photo-specifications`,
  `${BASE}/guides/make-signature-transparent`,
  `${BASE}/guides/secure-pdf-merging-offline`,
  `${BASE}/guides/ocr-benefits-on-device`,
  `${BASE}/guides/generating-branded-qr-codes`,
];

function post(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const body = JSON.stringify(data);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 15000
    }, (res) => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => resolve({ status: res.statusCode, body: buf }));
    });
    req.on('error', e => reject(e.message));
    req.on('timeout', () => { req.destroy(); reject('timeout'); });
    req.write(body);
    req.end();
  });
}

function pingGet(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    https.get({
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      timeout: 10000
    }, (res) => {
      resolve({ status: res.statusCode, url: u.hostname });
    }).on('error', () => resolve({ status: 'error', url: u.hostname }));
  });
}

async function main() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: ALL_URLS
  };

  // IndexNow endpoints (all known participants)
  const indexNowEndpoints = [
    { name: 'Yandex', url: 'https://yandex.com/indexnow' },
    { name: 'Bing', url: 'https://www.bing.com/indexnow' },
    { name: 'IndexNow.org', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Naver', url: 'https://search.naver.com/ping/crawl' },
    { name: 'Seznam.cz', url: 'https://fulltext.search.seznam.cz/indexnow' },
  ];

  console.log('=== IndexNow Submissions ===');
  for (const ep of indexNowEndpoints) {
    try {
      const r = await post(ep.url, payload);
      const icon = (r.status === 200 || r.status === 202) ? 'OK' : 'FAIL';
      console.log(`[${icon}] ${ep.name}: ${r.status} - ${r.body.substring(0, 100)}`);
    } catch (e) {
      console.log(`[ERROR] ${ep.name}: ${e}`);
    }
  }

  // Sitemap pings
  console.log('\n=== Sitemap Pings ===');
  const pingUrls = [
    { name: 'Yandex', url: `https://webmaster.yandex.com/ping?sitemap=${BASE}/sitemap-index.xml` },
    { name: 'Bing (old)', url: `https://www.bing.com/ping?sitemap=${BASE}/sitemap-index.xml` },
    { name: 'Google (old)', url: `https://www.google.com/ping?sitemap=${BASE}/sitemap-index.xml` },
  ];
  for (const p of pingUrls) {
    const r = await pingGet(p.url);
    console.log(`[${r.status}] ${p.name}`);
  }

  // DuckDuckGo instant answer ping
  console.log('\n=== DuckDuckGo ===');
  const ddgUrl = `https://duckduckgo.com/yandex?ping=${BASE}/sitemap-index.xml`;
  const ddg = await pingGet(ddgUrl);
  console.log(`[${ddg.status}] DuckDuckGo`);

  console.log('\n=== Done ===');
  console.log(`Submitted ${ALL_URLS.length} URLs to ${indexNowEndpoints.length} IndexNow engines`);
}

main();
