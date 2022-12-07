const UglifyJsPlugin=require('uglifyjs-webpack-plugin')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/Vue-chat/'
    : '/' ,
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
  
    configureWebpack:{
      plugins:[
        require('unplugin-element-plus/webpack')({

        }),
          //代码压缩
        new UglifyJsPlugin({
          uglifyOptions:{
            compress:{
              drop_debugger:true,
              drop_console:true,
              pure_funcs:['console.log']
            }
          },
          sourceMap:false,
          parallel:true
        })
      ],
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
   
    parallel: require('os').cpus().length > 1,// 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
      open: process.platform === 'darwin',
      disableHostCheck: true,
      port:8081,
      https: false,
      hotOnly: false,
      
     before: app => {}
    },
    
    // 第三方插件配置
    pluginOptions: {
     // ...
    }
   }
  