/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://royalwaterdamagefortmyers.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
    additionalSitemaps: [],
  },
  exclude: ["/api/*"],
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    // Higher priority for important pages
    let priority = 0.7;
    let changefreq = "weekly";
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/emergency") {
      priority = 0.95;
      changefreq = "daily";
    } else if (
      path.startsWith("/services/") &&
      path.split("/").length === 3
    ) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (
      path.startsWith("/locations/") &&
      path.split("/").length === 3
    ) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (
      path.startsWith("/services/") &&
      path.split("/").length === 4
    ) {
      priority = 0.75;
      changefreq = "monthly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.8;
      changefreq = "monthly";
    }
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
