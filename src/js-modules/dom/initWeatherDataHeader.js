import {
  initDiv,
  initP,
  initHeader,
  initH2,
  initButton,
} from "../../js-utilities/commonDomComponents.js";
import {
  isHomeLocation,
  setHomeLocation,
  resetHomeLocation,
  isInBookmarkedLocations,
  addBookmarkedLocation,
  removeBookmarkedLocation,
} from "../../appData.js";
import PubSub from "pubsub-js";
import { showWeatherDataForWithoutLoadingScreen } from "../showWeatherDataFor.js";
import { setAnimation, icons, forcePlayAnimation } from "./animations.js";

const blockName = "weather-data-page";
const cssClass = {
  header: "header",
  btnDiv: "btn-div",
  lastUpdateTime: "last-update-time",
  toggleHomeBtn: "toggle-home-btn",
  backBtn: "back-btn",
  refreshBtn: "refresh-btn",
  toggleBookmarkedBtn: "toggle-bookmarked-btn",
  dailyForecastP: "daily-forecast-p",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

let formatTz = null;

export function initWeatherDataHeader(data, formatTzFcn) {
  formatTz = formatTzFcn;
  const div = initPageHeader(data);
  formatTz = null;
  return div;
}

export function initWeatherDataHeaderNextDays(data, formatTzFcn) {
  formatTz = formatTzFcn;
  const div = initPageHeaderNextDays(data);
  formatTz = null;
  return div;
}

function initPageHeader(data) {
  const header = initHeader(getCssClass("header"));

  // Toggle back, home, bookmarked button
  const btnDiv = initDiv(getCssClass("btnDiv"));
  btnDiv.append(
    initBackButton("RENDER SELECT LOCATION DATA", null),
    initLastUpdateTime(data),
    initToggleHomeButton(data),
    initToggleBookmarkedButton(data),
    initRefreshButton(data)
  );

  // Info about location
  const locationDiv = initDiv(getCssClass("locationDiv"));
  const locationH2 = initH2(getCssClass("locationH2"), null, data.location);
  locationDiv.append(locationH2);

  header.append(btnDiv, locationDiv);

  return header;
}

function initPageHeaderNextDays(data) {
  const header = initHeader(getCssClass("header"));

  // Toggle back, home, bookmarked button
  const btnDiv = initDiv(getCssClass("btnDiv"));
  btnDiv.append(
    initBackButton("RENDER WEATHER DATA FROM NEXT DAYS", data),
    initDailyForecastP()
  );

  // Info about location
  const locationDiv = initDiv(getCssClass("locationDiv"));
  const locationH2 = initH2(getCssClass("locationH2"), null, data.location);
  locationDiv.append(locationH2);

  header.append(btnDiv, locationDiv);

  return header;
}

function initBackButton(pubSubToken, data) {
  const backBtnCallback = () => {
    forcePlayAnimation(animation, 1);
    PubSub.unsubscribe("RENDER WEATHER DATA IN NEXT DAYS");
    PubSub.publish(pubSubToken, data);
  };

  const backBtn = initButton(getCssClass("backBtn"), backBtnCallback);
  const animation = setAnimation(backBtn, icons.chevronLeft, false, false);

  backBtn.addEventListener("mouseenter", () => {
    forcePlayAnimation(animation, 1, "true");
  });

  return backBtn;
}

function initRefreshButton(data) {
  const refreshBtnCallback = () => {
    forcePlayAnimation(animation, 1);
    showWeatherDataForWithoutLoadingScreen(data.location).then(() => {
      animation.stop();
    });
  };

  const refreshBtn = initButton(getCssClass("refreshBtn"), refreshBtnCallback);
  const animation = setAnimation(refreshBtn, icons.refresh, true, false);

  return refreshBtn;
}

function initLastUpdateTime(data) {
  return initP(
    getCssClass("lastUpdateTime"),
    null,
    `${formatTz(data.current.datetime, "E d LLL, H:mm")}`
  );
}

function initDailyForecastP() {
  return initP(getCssClass("dailyForecastP"), null, "Daily forecast");
}

function initToggleHomeButton(data) {
  const toggleHomeBtnCallback = () => {
    if (isHomeLocation(data.location)) {
      forcePlayAnimation(animation, -1);
      resetHomeLocation();
    } else {
      forcePlayAnimation(animation, 1);
      setHomeLocation(data.location);
    }
  };

  const toggleHomeBtn = initButton(
    getCssClass("toggleHomeBtn"),
    toggleHomeBtnCallback
  );
  const animation = setAnimation(toggleHomeBtn, icons.heart, false, false);

  if (isHomeLocation(data.location)) {
    forcePlayAnimation(animation, 1);
  }

  toggleHomeBtn.addEventListener("mouseenter", () => {
    const direction = isHomeLocation(data.location) ? -1 : 1;
    forcePlayAnimation(animation, direction);
  });

  toggleHomeBtn.addEventListener("mouseleave", () => {
    const direction = isHomeLocation(data.location) ? 1 : -1;
    forcePlayAnimation(animation, direction);
  });
  return toggleHomeBtn;
}

function initToggleBookmarkedButton(data) {
  const toggleBookmarkedBtnCallback = () => {
    if (isInBookmarkedLocations(data.location)) {
      forcePlayAnimation(animation, -1);
      removeBookmarkedLocation(data.location);
    } else {
      forcePlayAnimation(animation, 1);
      addBookmarkedLocation(data.location);
    }
  };

  const toggleBookmarkedBtn = initButton(
    getCssClass("toggleBookmarkedBtn"),
    toggleBookmarkedBtnCallback
  );
  const animation = setAnimation(
    toggleBookmarkedBtn,
    icons.bookmark,
    false,
    false
  );

  if (isInBookmarkedLocations(data.location)) {
    forcePlayAnimation(animation, 1);
  }

  toggleBookmarkedBtn.addEventListener("mouseenter", () => {
    const direction = isInBookmarkedLocations(data.location) ? -1 : 1;
    forcePlayAnimation(animation, direction);
  });

  toggleBookmarkedBtn.addEventListener("mouseleave", () => {
    const direction = isInBookmarkedLocations(data.location) ? 1 : -1;
    forcePlayAnimation(animation, direction);
  });

  return toggleBookmarkedBtn;
}
