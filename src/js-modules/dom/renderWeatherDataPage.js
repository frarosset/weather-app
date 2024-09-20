import {
  initDiv,
  initP,
  initHeader,
  initH2,
} from "../../js-utilities/commonDomComponents.js";

const blockName = "weather-data-page";
const cssClass = {
  header: "header",
  currentConditions: "current-condition-div",
  locationDiv: "location-div",
  locationH2: "location-h2",
  conditionsP: "conditions-p",
  tempP: "temp-p",
  iconP: "icon-p",
  feelsLikeP: "feels-like-p",
  highLowTempP: "high-low-temp-p",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderWeatherDataPage(parentDiv, data) {
  // todo: clear current parentDiv;

  parentDiv.append(createWeatherDataPage(data));
}

export function createWeatherDataPage(data) {
  const div = initDiv(blockName);

  div.append(initPageHeader(data), initMainCurrentConditionsDiv(data));

  return div;
}

function initPageHeader(data) {
  const header = initHeader(getCssClass("header"));

  // Info about location
  const locationDiv = initDiv(getCssClass("locationDiv"));
  const locationH2 = initH2("locationH2", null, data.location);
  locationDiv.append(locationH2);

  // todo: back, like

  header.append(locationDiv);

  return header;
}

function initMainCurrentConditionsDiv(data) {
  const div = initDiv(getCssClass("currentConditions"));

  const conditionsP = initP("conditionsP", null, data.current.conditionsStr);
  const tempP = initP("tempP", null, data.current.tempStr);
  const iconP = initP("iconP", null, data.current.icon);
  const feelsLikeP = initP(
    "feelsLikeP",
    null,
    `Feels like ${data.current.feelslikeStr}`
  );
  const highLowTempP = initP(
    "highLowTempP",
    null,
    `High: ${data.days[0].tempmaxStr} - Low: ${data.days[0].tempminStr}`
  );

  div.append(conditionsP, tempP, iconP, feelsLikeP, highLowTempP);

  return div;
}
