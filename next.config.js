const sitemap = require("nextjs-sitemap-generator");
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups.shared.enforce = true;
    }

    sitemap({
      baseUrl: "https://civil.problemspotter.com",
      pagesDirectory: __dirname + "/pages",
      targetDirectory: "public/",
    });
    // if (isServer) {
    //   require("./utils/generateSiteMap");
    // }
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    return config;
  },
  images: {
    domains: ["my-server-problemspotter.herokuapp.com"],
  },
  i18n: {
    locales: ["en", "nl", "hi"],
    defaultLocale: "en",
  },
};
