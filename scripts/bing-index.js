import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const API_KEY = 'c6f6631627884d658f89e1b3d6840787';
const HOST = 'formfix.pages.dev';

async function submitToBing() {
    console.log('🚀 Starting IndexNow submission for Bing...');
    
    // 1. Read sitemap
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    
    // 2. Extract URLs accurately
    const urlRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = urlRegex.exec(sitemap)) !== null) {
        urls.push(match[1]);
    }

    console.log(`📝 Found ${urls.length} URLs in sitemap.`);

    // 3. Prepare IndexNow payload
    const payload = {
        host: HOST,
        key: API_KEY,
        keyLocation: `https://${HOST}/${API_KEY}.txt`,
        urlList: urls
    };

    // 4. Send request to Bing
    try {
        const response = await fetch('https://www.bing.com/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('✅ Success! Bing has acknowledged the URL list.');
            console.log('Status:', response.status);
        } else {
            const error = await response.text();
            console.error('❌ Bing Submission Failed:', error);
        }
    } catch (err) {
        console.error('❌ Network Error:', err.message);
    }
}

submitToBing();
