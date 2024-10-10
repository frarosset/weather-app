import {
  initDiv,
  initP,
  initHeader,
  initH2,
  initButton,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import {
  setAnimation,
  weatherIcons,
  icons,
  forcePlayAnimation,
} from "./animations.js";
import { initWeatherDataOtherConditionsDiv } from "./initWeatherDataOtherConditionsDiv.js";
import { initWeatherDataAlertsDiv } from "./initWeatherDataAlertsDiv.js";
import { initWeatherDataWeatherInsightDiv } from "./initWeatherDataWeatherInsightDiv.js";
import { initWeatherDataHourlyDiv } from "./initWeatherDataHourlyDiv.js";
import { initWeatherDataDailyDiv } from "./initWeatherDataDailyDiv.js";
import applyDynamicBackground from "../dynamic-background/applyDynamicBackground.js";
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

const blockName = "weather-data-page";
const cssClass = {
  header: "header",
  currentConditions: "current-condition-div",
  locationDiv: "location-div",
  locationH2: "location-h2",
  btnDiv: "btn-div",
  lastUpdateTime: "last-update-time",
  toggleHomeBtn: "toggle-home-btn",
  backBtn: "back-btn",
  refreshBtn: "refresh-btn",
  toggleBookmarkedBtn: "toggle-bookmarked-btn",
  conditionsP: "conditions-p",
  tempP: "temp-p",
  iconDiv: "icon-div",
  feelsLikeP: "feels-like-p",
  highLowTempP: "high-low-temp-p",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

let formatTz = null;

export default function renderWeatherDataPage(parentDiv, data) {
  formatTz = data.formatTz;
  const div = createWeatherDataPage(data);
  div.classList.toggle("night", !data.current.isDay);
  applyDynamicBackground(`--${blockName}-bg`, data);
  resetContent(parentDiv);
  parentDiv.append(div);
  formatTz = null;
}

export function createWeatherDataPage(data) {
  const div = initDiv(blockName);

  div.append(initPageHeader(data), initMainCurrentConditionsDiv(data));

  const alertDiv = initWeatherDataAlertsDiv(data);
  if (alertDiv != null) {
    div.append(alertDiv);
  }

  div.append(
    initWeatherDataWeatherInsightDiv(data.descriptionWeek),
    initWeatherDataHourlyDiv(data.next24Hours, formatTz),
    initWeatherDataDailyDiv(data.days, formatTz),
    initWeatherDataOtherConditionsDiv(data.current, formatTz)
  );

  return div;
}

function initPageHeader(data) {
  const header = initHeader(getCssClass("header"));

  // Toggle back, home, bookmarked button
  const btnDiv = initDiv(getCssClass("btnDiv"));
  btnDiv.append(
    initBackButton(),
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

function initBackButton() {
  const backBtnCallback = () => {
    forcePlayAnimation(animation, 1);
    PubSub.publish("RENDER SELECT LOCATION DATA");
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

function initMainCurrentConditionsDiv(data) {
  const div = initDiv(getCssClass("currentConditions"));

  const conditionsP = initP(
    getCssClass("conditionsP"),
    null,
    data.current.conditionsStr
  );
  const tempP = initP(getCssClass("tempP"), null, data.current.tempStr);
  const iconDiv = initDiv(getCssClass("iconDiv"));
  setAnimation(iconDiv, weatherIcons[data.current.icon]);

  const feelsLikeP = initP(
    getCssClass("feelsLikeP"),
    null,
    `Feels like ${data.current.feelslikeStr}`
  );
  const highLowTempP = initP(
    getCssClass("highLowTempP"),
    null,
    `High: ${data.days[0].tempmaxStr} - Low: ${data.days[0].tempminStr}`
  );

  div.append(conditionsP, tempP, iconDiv, feelsLikeP, highLowTempP);

  return div;
}
