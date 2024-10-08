import renderSelectLocationPage from "./dom/renderSelectLocationPage.js";
import renderWeatherDataPage from "./dom/renderWeatherDataPage.js";
import renderErrorPage from "./dom/renderErrorPage.js";
import renderFetchingDataPage from "./dom/renderFetchingDataPage.js";
import renderLocatingPage from "./dom/renderLocatingPage.js";
import renderSettingsPage from "./dom/renderSettingsPage.js";
import { initAppData, showHomeLocation, setAnimations } from "../appData.js";
import PubSub from "pubsub-js";

export default function initWebpage() {
  initAppData();

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

  PubSub.subscribe("RENDER LOCATING", (msg) => {
    console.log(msg);
    renderLocatingPage(resultsDiv);
  });

  PubSub.subscribe("RENDER SETTINGS", (msg) => {
    console.log(msg);
    renderSettingsPage(resultsDiv);
  });

  if (!showHomeLocation()) renderSelectLocationPage(resultsDiv);

  setAnimations(true);
}
