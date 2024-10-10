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
  hourlyForecastDiv: "hourly-forecasts-div",
  hourlyForecastH3: "hourly-forecasts-h3",
  hourlyForecastList: "hourly-forecasts-list",
  hourForecastLi: "hour-forecasts-li",
  hourForecastHour: "hour-forecasts-hour",
  hourForecastTemp: "hour-forecasts-temp",
  hourForecastIconDiv: "hour-forecasts-icon-div",
  hourForecastPrecipProb: "hour-forecasts-precip-prob",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

let formatTz = null;

export function initWeatherDataHourlyDiv(data, formatTzFcn) {
  formatTz = formatTzFcn;
  const div = initHourlyDiv(data, "");
  formatTz = null;
  return div;
}

function initHourlyDiv(data) {
  const div = initDiv(getCssClass("hourlyForecastDiv"));

  const hourlyForecastH3 = initH3(
    getCssClass("hourlyForecastH3"),
    null,
    "Hourly forecast"
  );

  const hourlyForecastList = initOl(getCssClass("hourlyForecastList"));

  allowHorizontalScrollThroughMouseScroll(hourlyForecastList);

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
