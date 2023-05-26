const HotHashWebpackPlugin = require("hot-hash-webpack-plugin");
const WebpackBar = require("webpackbar");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Vue-chat/" : "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // 生产环境配置
    if (process.env.NODE_ENV === "production") {
      config.output.filename("./js/[name].[chunkhash:8].js");
      config.output.chunkFilename("./js/[name].[chunkhash:8].js");
      config.plugin("extract-css").tap((args) => [
        {
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].css",
        },
      ]);
      config
        .plugin("hotHash")
        .use(HotHashWebpackPlugin, [{ version: "1.0.0" }]);
      config.plugin("webpackBar").use(WebpackBar);

      config.optimization
        .minimize(true)
        .minimizer("terser")
        .tap((args) => {
          let { terserOptions } = args[0];
          terserOptions.compress.drop_console = true;
          terserOptions.compress.drop_debugger = true;
          return args;
        });
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: "common",
            chunks: "all",
            minSize: 1,
            minChunks: 2,
            priority: 1,
          },
          vendor: {
            name: "chunk-libs",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      });
    }
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,

  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    disableHostCheck: true,
    port: 8081,
    https: false,
    hotOnly: false,
  },
};
