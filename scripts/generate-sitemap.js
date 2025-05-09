const fs = require('fs');
const path = require('path');

const baseUrl = 'https://buzzyconversions.com';

// Define your routes and their metadata
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: '/pdf-tools',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    url: '/image-tools',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    url: '/tools',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/pricing',
    changefreq: 'monthly',
    priority: 0.7
  }
];

// Generate sitemap XML
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route.url}</loc>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join('')}
</urlset>`;

  // Ensure the public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write sitemap to public directory
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap(); 