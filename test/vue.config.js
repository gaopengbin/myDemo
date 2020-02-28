module.exports = {
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/add": {
        target: "http://localhost:3000/add",
        //changeOrigin: true,
        pathRewrite: {
          "^/add": ""
        }
      },
      "/del": {
        target: "http://localhost:3000/del",
        //changeOrigin: true,
        pathRewrite: {
          "^/del": ""
        }
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/login": {
        target: "http://yapi.demo.qunar.com/mock/83438/api/login",
        changeOrigin: true,
        pathRewrite: {
          "^/login": ""
        }
      }
    }
  },
  // rem 的配置
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            // 适配 375 屏幕, 设计图750中量出来的尺寸要 / 2
            // 配置成 37.5 是为了兼容 没有适配 rem 布局的第三方 ui 库
            remUnit: 75
          })
        ]
      },
      sass: {
        prependData: '@import"./src/assets/style/main.scss";'
      }
    }
  }
};
