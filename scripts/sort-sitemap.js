const fs = require('fs');
const path = require('path');

// Read the sitemap file
const sitemapPath = path.join(__dirname, '../public/sitemap-0.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// Parse and sort URLs
const urlRegex = /<url>([\s\S]*?)<\/url>/g;
const urls = [];
let match;

while ((match = urlRegex.exec(sitemap)) !== null) {
  urls.push(match[0]);
}

// Sort URLs in natural alphanumeric order
urls.sort((a, b) => {
  const locA = a.match(/<loc>(.*?)<\/loc>/)?.[1] || '';
  const locB = b.match(/<loc>(.*?)<\/loc>/)?.[1] || '';
  return locA.localeCompare(locB, undefined, { numeric: true, sensitivity: 'base' });
});

// Format each URL entry on a single line
const formattedUrls = urls.map(url => {
  // Extract the loc and lastmod values
  const locMatch = url.match(/<loc>(.*?)<\/loc>/);
  const lastmodMatch = url.match(/<lastmod>(.*?)<\/lastmod>/);
  
  const loc = locMatch ? locMatch[1] : '';
  const lastmod = lastmodMatch ? lastmodMatch[1] : '';
  
  let formatted = '<url>';
  formatted += `<loc>${loc}</loc>`;
  if (lastmod) {
    formatted += `<lastmod>${lastmod}</lastmod>`;
  }
  formatted += '</url>';
  
  return formatted;
});

// Rebuild the sitemap with sorted URLs
const header = sitemap.substring(0, sitemap.indexOf('<url>'));
const footer = '</urlset>';
const sortedSitemap = header + formattedUrls.join('\n') + '\n' + footer;

// Write back the sorted sitemap
fs.writeFileSync(sitemapPath, sortedSitemap);

console.log('Sitemap sorted alphabetically');
