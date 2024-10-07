import renderSelectLocationPage from "./dom/renderSelectLocationPage.js";
import renderWeatherDataPage from "./dom/renderWeatherDataPage.js";
import renderErrorPage from "./dom/renderErrorPage.js";
import renderFetchingDataPage from "./dom/renderFetchingDataPage.js";
import { initAppData, showHomeLocation } from "../appData.js";
import PubSub from "pubsub-js";
// temporary code
import { freezeAllAnimations } from "./dom/animations.js";

export default function initWebpage() {
  initAppData();

  // renderSelectLocationPage(document.body);

  const resultsDiv = document.createElement("div");
  document.body.appendChild(resultsDiv);

  PubSub.subscribe("RENDER SELECT LOCATION DATA", (msg) => {
    console.log(msg);
    renderSelectLocationPage(resultsDiv);
  });

  PubSub.subscribe("RENDER WEATHER DATA", (msg, data) => {
    console.log(
      msg,
      `[${data.formatTz(data.current.datetime, "EEE, d MMM yyyy, HH:mm")}, ${data.location}]`
    );
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

  if (!showHomeLocation()) renderSelectLocationPage(resultsDiv);

  freezeAllAnimations();
}
