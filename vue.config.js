module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".js", ".vue", ".json"]
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/api/debug": {
        target: "http://10.0.17.102:8080/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "^/api/article/to/sentence": {
        target: "http://10.0.15.79:8060/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "^/api/predict": {
        target: " http://10.168.0.5:8080/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
