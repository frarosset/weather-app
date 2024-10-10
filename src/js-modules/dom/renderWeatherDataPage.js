import {
  initDiv,
  initP,
  initHeader,
  initH2,
  initH3,
  initH4,
  initUl,
  initOl,
  initLiAsChildInList,
  initButton,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import {
  setAnimation,
  weatherIcons,
  icons,
  forcePlayAnimation,
} from "./animations.js";
import { initOtherCurrentConditionsDiv } from "./initOtherConditionsDiv.js";
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
  alertsDiv: "alerts-div",
  alertsIconDiv: "alerts-icon-div",
  alertsH3: "alerts-h3",
  alertsList: "alerts-list",
  alertLi: "alert-li",
  alertHeader: "alert-header",
  alertH4: "alert-h4",
  alertDateP: "alert-date-p",
  alertDescrP: "alert-descr-p",
  alertOpenLinkBtn: "alert-open-link-btn",
  weatherInsightDiv: "weather-insight-div",
  weatherInsightH3: "weather-insight-h3",
  weatherInsightP: "weather-insight-p",
  hourlyForecastDiv: "hourly-forecasts-div",
  hourlyForecastH3: "hourly-forecasts-h3",
  hourlyForecastList: "hourly-forecasts-list",
  hourForecastLi: "hour-forecasts-li",
  hourForecastHour: "hour-forecasts-hour",
  hourForecastTemp: "hour-forecasts-temp",
  hourForecastIconDiv: "hour-forecasts-icon-div",
  hourForecastPrecipProb: "hour-forecasts-precip-prob",
  dailyForecastDiv: "daily-forecasts-div",
  dailyForecastH3: "daily-forecasts-h3",
  dailyForecastList: "daily-forecasts-list",
  dayForecastLi: "day-forecasts-li",
  dayForecastDay: "day-forecasts-day",
  dayForecastDate: "day-forecasts-date",
  dayForecastTempHigh: "day-forecasts-temp-high",
  dayForecastTempLow: "day-forecasts-temp-low",
  dayForecastIconDiv: "day-forecasts-icon-div",
  dayForecastPrecipProb: "day-forecasts-precip-prob",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

let formatTz = null;
let formatRelativeTz = null;

export default function renderWeatherDataPage(parentDiv, data) {
  formatTz = data.formatTz;
  formatRelativeTz = data.formatRelativeTz;
  const div = createWeatherDataPage(data);
  div.classList.toggle("night", !data.current.isDay);
  applyDynamicBackground(`--${blockName}-bg`, data);
  resetContent(parentDiv);
  parentDiv.append(div);
  formatTz = null;
  formatRelativeTz = null;
}

export function createWeatherDataPage(data) {
  const div = initDiv(blockName);

  div.append(initPageHeader(data), initMainCurrentConditionsDiv(data));

  const alertDiv = initAlertsDiv(data);
  if (alertDiv != null) {
    div.append(alertDiv);
  }

  div.append(
    initWeatherInsightDiv(data),
    initNext24HoursDiv(data),
    initNextDaysDiv(data),
    initOtherCurrentConditionsDiv(data)
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
    forcePlayAnimation(animation, 1);
  });

  // backBtn.addEventListener("mouseleave", () => {
  //   forcePlayAnimation(animation, -1);
  // });

  return backBtn;
}

function initRefreshButton(data) {
  const refreshBtnCallback = () => {
    showWeatherDataForWithoutLoadingScreen(data.location);
  };

  const refreshBtn = initButton(getCssClass("refreshBtn"), refreshBtnCallback);
  const animation = setAnimation(refreshBtn, icons.refresh, false, false);

  refreshBtn.addEventListener("mouseenter", () => {
    forcePlayAnimation(animation, 1);
  });

  // refreshBtn.addEventListener("mouseleave", () => {
  //   forcePlayAnimation(animation, -1);
  // });

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

function initAlertsDiv(data) {
  if (data.alerts.length == 0) return null;

  const div = initDiv(getCssClass("alertsDiv"));

  const alertsIconDiv = initDiv(getCssClass("alertsIconDiv"));
  setAnimation(alertsIconDiv, icons.alert);
  const alertsH3 = initH3(getCssClass("alertsH3"), null, "Alerts");

  const alertsList = initUl(getCssClass("alertsList"));

  data.alerts.forEach((alert) => {
    const alertLi = initLiAsChildInList(alertsList, getCssClass("alertLi"));

    alertLi.classList.add("clamp");
    const clampBtnCallback = () => {
      alertLi.classList.toggle("clamp");
    };
    alertLi.addEventListener("click", clampBtnCallback);

    const alertH4 = initH4(getCssClass("alertH4"), null, alert.event);

    const alertHeading = initHeader(getCssClass("alertHeader"));
    alertHeading.append(alertH4);

    const alertDateStr = `${formatRelativeTz(alert.onset, data.current.datetime)} ➜ ${formatRelativeTz(alert.ends, data.current.datetime)}`;
    const alertDateP = initP(getCssClass("alertDateP"), null, alertDateStr);
    const alertDescrP = initP(
      getCssClass("alertDescrP"),
      null,
      alert.description
    );

    alertLi.append(alertHeading, alertDateP, alertDescrP);

    if (alert.link != null) {
      const alertOpenLinkBtnCallback = () => {
        forcePlayAnimation(animation, 1);
        window.open(alert.link);
      };

      const alertOpenLinkBtn = initButton(
        getCssClass("alertOpenLinkBtn"),
        alertOpenLinkBtnCallback
      );
      const animation = setAnimation(
        alertOpenLinkBtn,
        icons.chevronRight,
        false,
        false
      );

      alertOpenLinkBtn.addEventListener("mouseenter", () => {
        forcePlayAnimation(animation, 1);
      });

      alertHeading.append(alertOpenLinkBtn);
    }
  });

  div.append(alertsIconDiv, alertsH3, alertsList);

  return div;
}

function initWeatherInsightDiv(data) {
  const div = initDiv(getCssClass("weatherInsightDiv"));

  const weatherInsightH3 = initH3(
    getCssClass("weatherInsightH3"),
    null,
    "Weather insight"
  );

  const weatherInsightP = initP(
    getCssClass("weatherInsightP"),
    null,
    data.descriptionWeek
  );

  div.append(weatherInsightH3, weatherInsightP);

  return div;
}

function initNext24HoursDiv(data) {
  const div = initDiv(getCssClass("hourlyForecastDiv"));

  const hourlyForecastH3 = initH3(
    getCssClass("hourlyForecastH3"),
    null,
    "Hourly forecast"
  );

  const hourlyForecastList = initOl(getCssClass("hourlyForecastList"));

  // Allow horizontal scrolling through mouse scroll
  hourlyForecastList.addEventListener("wheel", horizontalScrollCallback);

  data.next24Hours.forEach((hourForecast, idx) => {
    const hourForecastLi = initLiAsChildInList(
      hourlyForecastList,
      getCssClass("hourForecastLi")
    );

    const hourForecastHour = initP(
      getCssClass("hourForecastHour"),
      null,
      idx === 0 ? "Now" : formatTz(hourForecast.datetime, "H:mm")
    );

    const hourForecastTemp = initP(
      getCssClass("hourForecastTemp"),
      null,
      hourForecast.tempStr
    );

    const hourForecastIconDiv = initDiv(getCssClass("hourForecastIconDiv"));
    setAnimation(hourForecastIconDiv, weatherIcons[hourForecast.icon]);

    const hourForecastPrecipProb = initP(
      getCssClass("hourForecastPrecipProb"),
      null,
      hourForecast.precipprob > 0 ? hourForecast.precipprobStr : ""
    );

    hourForecastLi.append(
      hourForecastHour,
      hourForecastTemp,
      hourForecastIconDiv,
      hourForecastPrecipProb
    );
  });

  div.append(hourlyForecastH3, hourlyForecastList);

  return div;
}

function initNextDaysDiv(data) {
  const div = initDiv(getCssClass("dailyForecastDiv"));

  const dailyForecastH3 = initH3(
    getCssClass("dailyForecastH3"),
    null,
    "Daily forecast"
  );

  const dailyForecastList = initOl(getCssClass("dailyForecastList"));

  // Allow horizontal scrolling through mouse scroll
  dailyForecastList.addEventListener("wheel", horizontalScrollCallback);

  data.days.forEach((dayForecast, idx) => {
    const dayForecastLi = initLiAsChildInList(
      dailyForecastList,
      getCssClass("dayForecastLi")
    );

    const dayForecastDay = initP(
      getCssClass("dayForecastDay"),
      null,
      idx === 0 ? "Today" : formatTz(dayForecast.datetime, "E")
    );

    const dayForecastDate = initP(
      getCssClass("dayForecastDate"),
      null,
      idx === 0 ? "" : formatTz(dayForecast.datetime, "d LLL")
    );

    const dayForecastTempHigh = initP(
      getCssClass("dayForecastTempHigh"),
      null,
      dayForecast.tempmaxStr
    );

    const dayForecastTempLow = initP(
      getCssClass("dayForecastTempLow"),
      null,
      dayForecast.tempminStr
    );

    const dayForecastIconDiv = initDiv(getCssClass("dayForecastIconDiv"));
    setAnimation(dayForecastIconDiv, weatherIcons[dayForecast.icon]);

    const dayForecastPrecipProb = initP(
      getCssClass("dayForecastPrecipProb"),
      null,
      dayForecast.precipprob > 0 ? dayForecast.precipprobStr : ""
    );

    dayForecastLi.append(
      dayForecastDay,
      dayForecastDate,
      dayForecastTempHigh,
      dayForecastTempLow,
      dayForecastIconDiv,
      dayForecastPrecipProb
    );
  });

  div.append(dailyForecastH3, dailyForecastList);

  return div;
}

// Helper functions

function horizontalScrollCallback(e) {
  const noScrollLeft = e.currentTarget.scrollLeft === 0 && e.deltaY < 0;
  const noScrollRight =
    e.currentTarget.scrollLeft === e.currentTarget.scrollWidth && e.deltaY > 0;

  if (noScrollLeft || noScrollRight) {
    return;
  }

  e.currentTarget.scrollLeft += e.deltaY;
  e.preventDefault();
}
