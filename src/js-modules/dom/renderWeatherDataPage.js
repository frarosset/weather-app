import { initDiv, initP } from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { setAnimation, weatherIcons } from "./animations.js";
import { initWeatherDataHeader } from "./initWeatherDataHeader.js";
import { initWeatherDataOtherConditionsDiv } from "./initWeatherDataOtherConditionsDiv.js";
import { initWeatherDataAlertsDiv } from "./initWeatherDataAlertsDiv.js";
import { initWeatherDataWeatherInsightDiv } from "./initWeatherDataWeatherInsightDiv.js";
import { initWeatherDataHourlyDiv } from "./initWeatherDataHourlyDiv.js";
import { initWeatherDataDailyDiv } from "./initWeatherDataDailyDiv.js";
import applyDynamicBackground from "../dynamic-background/applyDynamicBackground.js";

const blockName = "weather-data-page";
const cssClass = {
  currentConditions: "current-condition-div",
  locationDiv: "location-div",
  locationH2: "location-h2",
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

  div.append(
    initWeatherDataHeader(data, formatTz),
    initMainCurrentConditionsDiv(data)
  );

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
