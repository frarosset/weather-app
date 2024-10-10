import { initDiv } from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { initWeatherDataHeader } from "./initWeatherDataHeader.js";
import { initWeatherDataMainCurrentConditionsDiv } from "./initWeatherDataMainCurrentConditionsDiv.js";
import { initWeatherDataOtherConditionsDiv } from "./initWeatherDataOtherConditionsDiv.js";
import { initWeatherDataAlertsDiv } from "./initWeatherDataAlertsDiv.js";
import { initWeatherDataWeatherInsightDiv } from "./initWeatherDataWeatherInsightDiv.js";
import { initWeatherDataHourlyDiv } from "./initWeatherDataHourlyDiv.js";
import { initWeatherDataDailyDiv } from "./initWeatherDataDailyDiv.js";
import applyDynamicBackground from "../dynamic-background/applyDynamicBackground.js";

const blockName = "weather-data-page";

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
    initWeatherDataMainCurrentConditionsDiv(data)
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
