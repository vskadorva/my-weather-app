const { defineConfig } = require("cypress");
const webpackConfig = require('./webpack.config')
module.exports = defineConfig({
  e2e: {
    "baseUrl" : "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: webpackConfig,
    },
  },
});
