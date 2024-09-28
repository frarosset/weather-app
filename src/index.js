import "./index.css";
import renderSelectLocationPage from "./js-modules/dom/renderSelectLocationPage.js";
import renderWeatherDataPage from "./js-modules/dom/renderWeatherDataPage.js";
import renderErrorPage from "./js-modules/dom/renderErrorPage.js";
import renderFetchingDataPage from "./js-modules/dom/renderFetchingDataPage.js";
import PubSub from "pubsub-js";
// temporary code
import { freezeAllAnimations } from "./js-modules/dom/animations.js";

renderSelectLocationPage(document.body);

const resultsDiv = document.createElement("div");
document.body.appendChild(resultsDiv);

PubSub.subscribe("RENDER WEATHER DATA", (msg, data) => {
  console.log(msg, `[${data.current.datetime}, ${data.location}]`);
  renderWeatherDataPage(resultsDiv, data);
});

PubSub.subscribe("RENDER ERROR PAGE", (msg, error) => {
  console.log(msg, `[${error.message}]`);
  renderErrorPage(resultsDiv, error);
});

PubSub.subscribe("RENDER FETCHING DATA", (msg, locationStr) => {
  console.log(msg, `[${locationStr}]`);
  renderFetchingDataPage(resultsDiv, locationStr);
});

freezeAllAnimations();
