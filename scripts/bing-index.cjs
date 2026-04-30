const https = require('https');
const fs = require('fs');
const path = require('path');

const host = 'formfix.pages.dev';
const key = '87a9561b84c24e7587a9561b84c24e75';
const keyLocation = `https://${host}/${key}.txt`;

// Function to recursively find all astro files and turn them into URLs
function getAllPages(dirPath, baseUrl, arrayOfUrls) {
  const files = fs.readdirSync(dirPath);

  arrayOfUrls = arrayOfUrls || [];

  files.forEach(function(file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfUrls = getAllPages(filePath, baseUrl, arrayOfUrls);
    } else {
      if (file.endsWith('.astro')) {
        // Skip dynamic routes, 404, and partials
        if (!file.includes('[') && !file.startsWith('_') && file !== '404.astro') {
          let relativePath = path.relative(path.join(__dirname, '../src/pages'), filePath);
          let urlPath = relativePath.replace(/\\/g, '/').replace('.astro', '');
          
          if (urlPath === 'index') urlPath = '';
          
          arrayOfUrls.push(`${baseUrl}/${urlPath}`);
        }
      }
    }
  });

  return arrayOfUrls;
}

const pagesDir = path.join(__dirname, '../src/pages');
const allUrls = getAllPages(pagesDir, `https://${host}`, []);

// Add some known dynamic ones or special cases if needed
allUrls.push(`https://${host}/tools`);

const data = JSON.stringify({
  host: host,
  key: key,
  keyLocation: keyLocation,
  urlList: allUrls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

console.log(`🚀 Scanning project... Found ${allUrls.length} pages.`);
console.log(`📡 Notifying Bing/IndexNow for all pages...`);

const req = https.request(options, (res) => {
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log(`✅ SUCCESS! All ${allUrls.length} pages have been submitted to Bing.`);
    console.log('Bing will start crawling them shortly.');
  } else {
    console.error(`❌ Failed to notify IndexNow. Status: ${res.statusCode}`);
  }
});

req.on('error', (error) => {
  console.error('❌ Error sending IndexNow request:', error);
});

req.write(data);
req.end();
