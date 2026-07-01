// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.ionianems.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './out',
  changefreq: 'weekly',
  priority: 0.7,
  i18n: {
    locales: ['en', 'el', 'de'],
    defaultLocale: 'en',
  },
};
