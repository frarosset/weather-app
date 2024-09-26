import "./index.css";
import renderSelectLocationPage from "./js-modules/dom/renderSelectLocationPage.js";
import renderWeatherDataPage from "./js-modules/dom/renderWeatherDataPage.js";
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

freezeAllAnimations();
