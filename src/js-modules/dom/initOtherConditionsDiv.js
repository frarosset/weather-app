import {
  initDiv,
  initH3,
  initP,
  initUl,
  initLiAsChildInList,
} from "../../js-utilities/commonDomComponents.js";
import {
  setAnimation,
  precipIcons,
  uvindexIcons,
  solarRadiationIcon,
  astroIcons,
  moonphaseIcons,
} from "./animations.js";
import { format } from "date-fns";

const blockName = "weather-data-page";
const cssClass = {
  otherConditionsDiv: "other-conditions-div",
  otherConditionsList: "other-conditions-list",
  otherConditionLi: "other-condition-li",
  otherConditionH3: "other-condition-h3",
  otherConditionContent: "other-condition-content",
  otherConditionContentMany: "other-condition-content-many",
  otherConditionIconDiv: "other-condition-icon-div",
  otherConditionValueDiv: "other-condition-value-div",
  otherConditionValue: "other-condition-value",
  otherConditionValueUnit: "other-condition-value-unit",
  otherConditionIconWithValueDiv: "other-condition-icon-with-value-div",
  otherConditionIconWithValueValue: "other-condition-icon-with-value-value",
  otherConditionValueSmallDiv: "other-conditionvalue-small-div",
  otherConditionValueSmallPre: "other-condition-value-small-pre",
  otherConditionValueSmall: "other-condition-value-small",
  otherConditionValueSmallPost: "other-condition-value-small-post",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export function initOtherCurrentConditionsDiv(data) {
  return initOtherConditionsDiv(data.current, "");
}

function initOtherConditionsDiv(subdata, prestr) {
  const div = initDiv(getCssClass("otherConditionsDiv"));

  const otherConditionsList = initUl(getCssClass("otherConditionsList"));

  const otherConditionsDiv = [
    ["Precipitation", initPrecipitationContent],
    ["UV Index", initUvIndexContent],
    ["Solar Radiation", initSolarRadiationContent],
    ["Sunrise & Sunset", initSunriseAndSunsetContent],
    ["Moonrise & Moonset", initMoonriseAndMoonsetContent],
    ["Moonphase", initMoonPhaseContent],
  ];

  otherConditionsDiv.forEach(([title, callback]) => {
    const div = callback(subdata);

    if (subdata == null || div == null) return;

    const otherConditionLi = initLiAsChildInList(
      otherConditionsList,
      getCssClass("otherConditionLi")
    );
    const otherConditionH3 = initH3(
      getCssClass("otherConditionH3"),
      null,
      `${prestr} ${title}`
    );

    otherConditionLi.append(otherConditionH3, div);
  });

  div.append(otherConditionsList);

  return div;
}

// Init Specific Other Info Content

function initPrecipitationContent(subdata) {
  const precip = subdata.precipStr;
  const preciptype = subdata.preciptypeStr;
  const preciptypeIcon = subdata.preciptypeIconStr;
  const precipprob = subdata.precipprobStr;

  console.log(precip, preciptype, precipprob);

  if (precip == null) return null;

  const div = initDiv([getCssClass("otherConditionContent"), "precip"]);

  if (preciptype != null) {
    div.append(
      initValueSmall(preciptype),
      initIcon(precipIcons[preciptypeIcon])
    );
  }

  div.append(initValue(precip), initValueSmall(precipprob));

  return div;
}

function initUvIndexContent(subdata) {
  const uvIndex = subdata.uvindex;
  if (uvIndex == null) return null;

  const div = initDiv([getCssClass("otherConditionContent"), "uv-index"]);
  div.append(initIcon(uvindexIcons[`uv-index-${uvIndex}`]));
  return div;
}

function initSolarRadiationContent(subdata) {
  const solarRadiation = subdata.solarradiationStr;
  if (solarRadiation == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    "solar-radiation",
  ]);
  div.append(initIcon(solarRadiationIcon), initValue(solarRadiation));
  return div;
}

function initMoonPhaseContent(subdata) {
  const moonphase = subdata.moonphaseIconStr;
  if (moonphase == null) return null;
  const div = initDiv([getCssClass("otherConditionContent"), "moonphase"]);
  div.append(initIcon(moonphaseIcons[`${moonphase}`]));
  return div;
}

function initSunriseAndSunsetContent(subdata) {
  const sunrise = subdata.sunrise;
  const sunset = subdata.sunset;

  if (sunrise == null || sunset == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    getCssClass("otherConditionContentMany"),
    "sunrise-and-sunset",
  ]);

  div.append(
    initIconWithValue(astroIcons["sunrise"], format(sunrise, "HH:mm")),
    initIconWithValue(astroIcons["sunset"], format(sunset, "HH:mm"))
  );

  return div;
}

function initMoonriseAndMoonsetContent(subdata) {
  const moonrise = subdata.moonrise;
  const moonset = subdata.moonset;

  if (moonrise == null || moonset == null) return null;

  const div = initDiv([
    getCssClass("otherConditionContent"),
    getCssClass("otherConditionContentMany"),
    "sunriseAndSunset",
  ]);

  div.append(
    initIconWithValue(astroIcons["moonrise"], format(moonrise, "HH:mm")),
    initIconWithValue(astroIcons["moonset"], format(moonset, "HH:mm"))
  );

  return div;
}

// Helper functions

function initIcon(icon) {
  const div = initDiv(getCssClass("otherConditionIconDiv"));
  setAnimation(div, icon);
  return div;
}

function initValue(valStr) {
  const div = initDiv(getCssClass("otherConditionValueDiv"));

  const [value, ...units] = valStr.split(" ");

  div.append(
    initP(getCssClass("otherConditionValue"), null, value),
    initP(getCssClass("otherConditionValueUnit"), null, units)
  );

  div.classList.add(`x${Math.min(5, value.length)}`);

  return div;
}

function initIconWithValue(icon, value) {
  const dataDiv = initDiv(getCssClass("otherConditionIconWithValueDiv"));
  dataDiv.append(
    initIcon(icon),
    initP(getCssClass("otherConditionIconWithValueValue"), null, value)
  );
  return dataDiv;
}

function initValueSmall(valueStr, pretext = "", posttext = "") {
  const div = initDiv(getCssClass("otherConditionValueSmallDiv"));
  div.append(
    initP(getCssClass("otherConditionValueSmallPre"), null, pretext),
    initP(getCssClass("otherConditionValueSmall"), null, valueStr),
    initP(getCssClass("otherConditionValueSmallPost"), null, posttext)
  );
  return div;
}
