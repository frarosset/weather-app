import {
  initDiv,
  initH3,
  initP,
  initUl,
  initLiAsChildInList,
} from "../../js-utilities/commonDomComponents.js";
import {
  setAnimation,
  uvindexIcons,
  solarRadiationIcon,
  moonphaseIcons,
} from "./animations.js";

const blockName = "weather-data-page";
const cssClass = {
  otherConditionsDiv: "other-conditions-div",
  otherConditionsList: "other-conditions-list",
  otherConditionLi: "other-condition-li",
  otherConditionH3: "other-condition-h3",
  otherConditionContent: "other-condition-content",
  otherConditionIconDiv: "other-condition-icon-div",
  otherConditionValueDiv: "other-condition-value-div",
  otherConditionValue: "other-condition-value",
  otherConditionValueUnit: "other-condition-value-unit",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export function initOtherCurrentConditionsDiv(data) {
  return initOtherConditionsDiv(data.current, "");
}

function initOtherConditionsDiv(subdata, prestr) {
  const div = initDiv(getCssClass("otherConditionsDiv"));

  const otherConditionsList = initUl(getCssClass("otherConditionsList"));

  const otherConditionsDiv = [
    ["UV Index", initUvIndexContent],
    ["Solar Radiation", initSolarRadiationContent],
    ["Moonphase", initMoonPhaseContent],
  ];

  otherConditionsDiv.forEach(([title, callback]) => {
    const div = callback(subdata);

    if (subdata == null) return;

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

function initUvIndexContent(subdata) {
  const uvIndex = subdata.uvindex;
  if (uvIndex == null) return null;

  const div = initDiv(getCssClass("otherConditionContent", "uv-index"));
  div.append(initIcon(uvindexIcons[`uv-index-${uvIndex}`]));
  return div;
}

function initSolarRadiationContent(subdata) {
  const solarRadiation = subdata.solarradiationStr;
  if (solarRadiation == null) return null;

  const div = initDiv(getCssClass("otherConditionContent", "solar-radiation"));
  div.append(initIcon(solarRadiationIcon), initValue(solarRadiation));
  return div;
}

function initMoonPhaseContent(subdata) {
  const moonphase = subdata.moonphaseIconStr;
  if (moonphase == null) return null;
  const div = initDiv(getCssClass("otherConditionContent", "moonphase"));
  div.append(initIcon(moonphaseIcons[`${moonphase}`]));
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

  return div;
}
