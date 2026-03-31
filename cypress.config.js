const dotenv = require("dotenv");
dotenv.config();

const { defineConfig } = require("cypress");
const baseWebpackConfig = require("./webpack.config");
const addAccessibilityTasks = require("wick-a11y/accessibility-tasks");

/** Cypress component runner starts webpack-dev-server; avoid clashing with `npm run start:webpack` on 8080. */
const componentWebpackConfig = {
  ...baseWebpackConfig,
  devServer: {
    ...baseWebpackConfig.devServer,
    port: Number(
      process.env.CYPRESS_COMPONENT_WDS_PORT || 8787
    ),
  },
};

function setupNodeEvents(on, config) {
  addAccessibilityTasks(on);
  on("task", {
    log(message) {
      console.log(message);
      return null;
    },
    table(message) {
      console.table(message);
      return null;
    },
  });
  return config;
}

module.exports = defineConfig({
  projectId: "9cw2in",
  // Cypress 15: do not expose env() to browser code; wick-a11y uses Cypress.expose() fallbacks.
  allowCypressEnv: false,
  accessibilityFolder: "cypress/accessibility",
  expose: {
    generateReport: "detailed",
    enableAccessibilityVoice: false,
    API_URL:
      process.env.API_URL || "https://pure-sea-84829.herokuapp.com",
  },
  e2e: {
    baseUrl: "https://vskadorva.github.io/my-weather-app/",
    defaultCommandTimeout: 120000,
    setupNodeEvents,
  },
  component: {
    specPattern: [
      "src/components/**/*.cy.js",
      "cypress/component/wick-a11y/**/*.cy.js",
    ],
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: componentWebpackConfig,
    },
    defaultCommandTimeout: 120000,
    setupNodeEvents,
  },
});
