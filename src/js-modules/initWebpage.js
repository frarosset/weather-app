import renderSelectLocationPage from "./dom/renderSelectLocationPage.js";
import renderWeatherDataPage from "./dom/renderWeatherDataPage.js";
import renderErrorPage from "./dom/renderErrorPage.js";
import renderFetchingDataPage from "./dom/renderFetchingDataPage.js";
import renderLocatingPage from "./dom/renderLocatingPage.js";
import renderSettingsPage from "./dom/renderSettingsPage.js";
import { initAppData, showHomeLocation } from "../appData.js";
import PubSub from "pubsub-js";
import setCreditFooter from "../js-utilities/creditFooter.js";

export default function initWebpage() {
  initAppData();

  const main = document.createElement("main");
  subscribeToRender(main);

  document.body.appendChild(main);
  if (!showHomeLocation()) renderSelectLocationPage(main);

  // Add credit footer at the bottom
  setCreditFooter();
}

function subscribeToRender(div) {
  PubSub.subscribe("RENDER SELECT LOCATION DATA", (msg) => {
    console.log(msg);
    renderSelectLocationPage(div);
  });

  PubSub.subscribe("RENDER WEATHER DATA", (msg, data) => {
    console.log(
      msg,
      `[${data.formatTz(data.current.datetime, "EEE, d MMM yyyy, HH:mm")}, ${data.location}]`
    );
    renderWeatherDataPage(div, data);
  });

  PubSub.subscribe("RENDER ERROR PAGE", (msg, error) => {
    console.log(msg, `[${error.message}]`);
    renderErrorPage(div, error);
  });

  PubSub.subscribe("RENDER FETCHING DATA", (msg, locationStr) => {
    console.log(msg, `[${locationStr}]`);
    renderFetchingDataPage(div, locationStr);
  });

  PubSub.subscribe("RENDER LOCATING", (msg) => {
    console.log(msg);
    renderLocatingPage(div);
  });

  PubSub.subscribe("RENDER SETTINGS", (msg) => {
    console.log(msg);
    renderSettingsPage(div);
  });
}
