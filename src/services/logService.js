//import Raven from "raven-js"; // For this Create account on: https://sentry.io/welcome/

// function init() {
//   // Raven.config("ADD YOUR OWN API KEY", {
//   //   release: "1-0-0",
//   //   environment: "development-test"
//   // }).install();
// }

// function log(error) {
//   // Raven.captureException(error);
// }

function init() {}

function log(error) {
  console.error(error);
}

export default {
  init,
  log,
};
