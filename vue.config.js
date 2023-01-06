const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.join(__dirname, "./src/assets/styles/mixins.less"),
        path.join(__dirname, "./src/assets/styles/variables.less"),
        path.resolve(__dirname, "./src/theme/style.less"),
      ],
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 8080,
    open: true, // vue项目启动时自动打开浏览器
    proxy: {
      "/api": {
        // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
        target: "http://124.220.0.103:3000", //目标地址，一般是指后台服务器地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
          "^/api": "",
        },
      },
    },
  },
});
