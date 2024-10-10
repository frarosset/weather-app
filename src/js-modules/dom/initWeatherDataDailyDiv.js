import {
  initDiv,
  initH3,
  initP,
  initLiAsChildInList,
  initOl,
} from "../../js-utilities/commonDomComponents.js";
import { allowHorizontalScrollThroughMouseScroll } from "../../js-utilities/commonDomUtilities.js";
import { setAnimation, weatherIcons } from "./animations.js";

const blockName = "weather-data-page";
const cssClass = {
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

// Subdata might be, eg, data.days

export function initWeatherDataDailyDiv(subdata, formatTzFcn) {
  formatTz = formatTzFcn;
  const div = initDailyDiv(subdata, "");
  formatTz = null;
  return div;
}

function initDailyDiv(subdata) {
  const div = initDiv(getCssClass("dailyForecastDiv"));

  const dailyForecastH3 = initH3(
    getCssClass("dailyForecastH3"),
    null,
    "Daily forecast"
  );

  const dailyForecastList = initOl(getCssClass("dailyForecastList"));

  // Allow horizontal scrolling through mouse scroll
  allowHorizontalScrollThroughMouseScroll(dailyForecastList);

  subdata.forEach((dayForecast, idx) => {
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
