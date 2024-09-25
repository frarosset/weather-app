import {
  initDiv,
  initH3,
  initUl,
  initLiAsChildInList,
} from "../../js-utilities/commonDomComponents.js";
import { setAnimation, uvindexIcons } from "./animations.js";

const blockName = "weather-data-page";
const cssClass = {
  otherConditionsDiv: "other-conditions-div",
  otherConditionsList: "other-conditions-list",
  otherConditionLi: "other-condition-li",
  otherConditionH3: "other-condition-h3",
  uvIndexIconDiv: "uv-index-icon-div",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export function initOtherCurrentConditionsDiv(data) {
  return initOtherConditionsDiv(data.current, "");
}

function initOtherConditionsDiv(subdata, prestr) {
  const div = initDiv(getCssClass("otherConditionsDiv"));

  const otherConditionsList = initUl(getCssClass("otherConditionsList"));

  const otherConditionsDiv = [["UV Index", initUvIndexContent]];

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

function initUvIndexContent(subdata) {
  const uvIndex = subdata.uvindex;
  if (uvIndex == null) return null;
  const div = initDiv(getCssClass("uvIndexIconDiv"));
  setAnimation(div, uvindexIcons[`uv-index-${uvIndex}`]);
  return div;
}
