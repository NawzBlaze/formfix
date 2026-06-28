const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'formfix.pages.dev';
const BASE = `https://${HOST}`;
const KEY = '3da1c84b7a814355bf26031c19fd73f5';
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

// Collect all URLs from dist/
function getAllUrls() {
  const urls = [];
  const distDir = path.join(__dirname, '../dist');
  
  function walk(dir, base) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) {
        walk(full, base);
      } else if (item.endsWith('.html') && !item.startsWith('_')) {
        let rel = path.relative(distDir, full).replace(/\\/g, '/');
        rel = rel.replace('/index.html', '').replace('.html', '');
        if (rel === '404') continue;
        urls.push(`${BASE}/${rel}`);
      }
    }
  }
  
  walk(distDir, BASE);
  return [...new Set(urls)];
}

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
        'User-Agent': 'FormFix/1.0 (IndexNow)'
      }
    }, (res) => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => resolve({ status: res.statusCode, body: buf, url }));
    });
    req.on('error', e => reject({ error: e.message, url }));
    req.write(body);
    req.end();
  });
}

function ping(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      headers: { 'User-Agent': 'FormFix/1.0' }
    }, (res) => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => resolve({ status: res.statusCode, body: buf, url }));
    }).on('error', e => reject({ error: e.message, url }));
  });
}

async function main() {
  const allUrls = getAllUrls();
  console.log(`\nFound ${allUrls.length} pages to submit\n`);

  const indexNowPayload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: allUrls
  };

  // 1. Yandex IndexNow (confirmed working)
  console.log('=== Yandex IndexNow ===');
  try {
    const r = await post('https://yandex.com/indexnow', indexNowPayload);
    console.log(`  Status: ${r.status} - ${r.body.substring(0, 100)}`);
  } catch (e) {
    console.log(`  Error: ${e.error || e.status}`);
  }

  // 2. Bing IndexNow
  console.log('=== Bing IndexNow ===');
  try {
    const r = await post('https://www.bing.com/indexnow', indexNowPayload);
    console.log(`  Status: ${r.status} - ${r.body.substring(0, 200)}`);
  } catch (e) {
    console.log(`  Error: ${e.error || e.status}`);
  }

  // 3. IndexNow.org API
  console.log('=== IndexNow.org API ===');
  try {
    const r = await post('https://api.indexnow.org/indexnow', indexNowPayload);
    console.log(`  Status: ${r.status} - ${r.body.substring(0, 200)}`);
  } catch (e) {
    console.log(`  Error: ${e.error || e.status}`);
  }

  // 4. Bing URL Submission (batch of 100)
  console.log('=== Bing URL Submission API ===');
  try {
    const r = await post(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?siteUrl=${BASE}`, {
      siteUrl: BASE,
      urlList: allUrls
    });
    console.log(`  Status: ${r.status} - ${r.body.substring(0, 200)}`);
  } catch (e) {
    console.log(`  Error: ${e.error || e.status}`);
  }

  // 5. Google Ping (sitemap)
  console.log('=== Google Sitemap Ping ===');
  try {
    const r = await ping(`https://www.google.com/ping?sitemap=${BASE}/sitemap-index.xml`);
    console.log(`  Status: ${r.status}`);
  } catch (e) {
    console.log(`  Error: ${e.error}`);
  }

  // 6. Bing Sitemap Ping
  console.log('=== Bing Sitemap Ping ===');
  try {
    const r = await ping(`https://www.bing.com/ping?sitemap=${BASE}/sitemap-index.xml`);
    console.log(`  Status: ${r.status}`);
  } catch (e) {
    console.log(`  Error: ${e.error}`);
  }

  // 7. Individual page pings to Google (1-by-1)
  console.log('\n=== Google URL Inspection (individual) ===');
  let googleOk = 0;
  for (const url of allUrls) {
    try {
      const r = await ping(`https://www.google.com/ping?url=${encodeURIComponent(url)}`);
      if (r.status === 200 || r.status === 202) googleOk++;
    } catch (e) {}
  }
  console.log(`  ${googleOk}/${allUrls.length} pages pinged`);

  // 8. Yandex individual page notification
  console.log('=== Yandex XML Sitemap ===');
  try {
    const r = await ping(`https://webmaster.yandex.com/ping?sitemap=${BASE}/sitemap-index.xml`);
    console.log(`  Status: ${r.status}`);
  } catch (e) {
    console.log(`  Error: ${e.error}`);
  }

  console.log('\n=== Summary ===');
  console.log(`Total pages: ${allUrls.length}`);
  console.log(`Sitemap: ${BASE}/sitemap-index.xml`);
  console.log(`IndexNow key: ${KEY}`);
  console.log(`Key file: ${KEY_LOCATION}`);
}

main().catch(console.error);
