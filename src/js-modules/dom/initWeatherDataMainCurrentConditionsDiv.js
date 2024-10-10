import { initDiv, initP } from "../../js-utilities/commonDomComponents.js";
import { setAnimation, weatherIcons } from "./animations.js";

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

export function initWeatherDataMainCurrentConditionsDiv(data) {
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
