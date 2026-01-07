// next-sitemap.config.js
module.exports = {
  siteUrl: "https://allenhaydenjohnson.com",
  exclude: [],
  generateRobotsTxt: true,
  changefreq: null,
  priority: null,
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    // This can be used to add and sort additional paths
    return [];
  },
};
