const { defineConfig } = require("cypress");
const webpackConfig = require('./webpack.config')

const setupNodeEvents = (on, config) => {
  // implement node event listeners here
  on('task', {
    log(message) {
      console.log(message)
      return null
    },
    table(message) {
      console.table(message)
      return null
    }
  })
}

module.exports = defineConfig({
  e2e: {
    "baseUrl" : "https://vskadorva.github.io/my-weather-app/",
    setupNodeEvents,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: webpackConfig,
    },
    setupNodeEvents,
  },
});
