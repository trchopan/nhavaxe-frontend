process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_AUTHOR = require("./package.json").author;
process.env.VUE_APP_TITLE = "Kênh Tin Tức Nhà và Xe";

module.exports = {
  configureWebpack: {
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js"
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].minify = false;
      return args;
    });
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      if (extractCSSPlugin) {
        extractCSSPlugin.tap(() => [
          {
            filename: "[name].css",
            chunkFilename: "[name].css"
          }
        ]);
      }
    }
  }
};
