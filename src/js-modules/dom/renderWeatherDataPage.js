import { initDiv, initP } from "../../js-utilities/commonDomComponents.js";

const blockName = "weather-data-page";
const cssClass = {
  mainCurrentConditions: "main-current-condition-div",
  mainLocationDiv: "main-location-div",
  mainLocationP: "main-location-p",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderWeatherDataPage(parentDiv, data) {
  // todo: clear current parentDiv;

  parentDiv.append(createWeatherDataPage(data));
}

export function createWeatherDataPage(data) {
  const div = initDiv(blockName);

  div.append(initMainCurrentConditionsDiv(data));

  return div;
}

function initMainCurrentConditionsDiv(data) {
  const div = initDiv(getCssClass("mainCurrentConditions"));

  // Info about location
  const locationDiv = initDiv(getCssClass("mainLocationDiv"));
  const locationP = initP("mainLocationP", null, data.location);
  locationDiv.append(locationP);

  // todo: back, like, units, temp, icon, mintemp, maxtemp, feels like

  div.append(locationDiv);

  return div;
}
