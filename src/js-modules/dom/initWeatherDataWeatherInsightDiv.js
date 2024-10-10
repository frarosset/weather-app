import {
  initDiv,
  initH3,
  initP,
} from "../../js-utilities/commonDomComponents.js";

const blockName = "weather-data-page";
const cssClass = {
  weatherInsightDiv: "weather-insight-div",
  weatherInsightH3: "weather-insight-h3",
  weatherInsightP: "weather-insight-p",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

// Subdata might be, eg, data.days

export function initWeatherDataWeatherInsightDiv(str) {
  const div = initDiv(getCssClass("weatherInsightDiv"));

  const weatherInsightH3 = initH3(
    getCssClass("weatherInsightH3"),
    null,
    "Weather insight"
  );

  const weatherInsightP = initP(getCssClass("weatherInsightP"), null, str);

  div.append(weatherInsightH3, weatherInsightP);

  return div;
}
