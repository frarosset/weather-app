import {
  initDiv,
  initP,
  initHeader,
  initH2,
  initH3,
  initH4,
  initUl,
  initLiAsChildInList,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { setAnimation, weatherIcons, icons } from "./animations.js";

const blockName = "weather-data-page";
const cssClass = {
  header: "header",
  currentConditions: "current-condition-div",
  locationDiv: "location-div",
  locationH2: "location-h2",
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
  alertH4: "alert-h4",
  alertDateP: "alert-date-p",
  alertDescrP: "alert-descr-p",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderWeatherDataPage(parentDiv, data) {
  resetContent(parentDiv);

  parentDiv.append(createWeatherDataPage(data));
}

export function createWeatherDataPage(data) {
  const div = initDiv(blockName);

  div.append(initPageHeader(data), initMainCurrentConditionsDiv(data));

  const alertDiv = initAlertsDiv(data);
  if (alertDiv != null) {
    div.append(alertDiv);
  }

  return div;
}

function initPageHeader(data) {
  const header = initHeader(getCssClass("header"));

  // Info about location
  const locationDiv = initDiv(getCssClass("locationDiv"));
  const locationH2 = initH2(getCssClass("locationH2"), null, data.location);
  locationDiv.append(locationH2);

  // todo: back, like

  header.append(locationDiv);

  return header;
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

    const alertH4 = initH4(getCssClass("alertH4"), null, alert.event);
    const alertDateStr = `${alert.onset} - ${alert.ends}`;
    const alertDateP = initP(getCssClass("alertDateP"), null, alertDateStr);
    const alertDescrP = initP(
      getCssClass("alertDescrP"),
      null,
      alert.description
    );

    alertLi.append(alertH4, alertDateP, alertDescrP);
    alertLi.addEventListener("click", () => window.open(alert.link));
  });

  div.append(alertsIconDiv, alertsH3, alertsList);

  return div;
}
