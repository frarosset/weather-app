import { initDiv } from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import {
  initWeatherDataHeader,
  initWeatherDataHeaderNextDays,
} from "./initWeatherDataHeader.js";
import {
  initWeatherDataMainCurrentConditionsDiv,
  initWeatherDataMainDailyConditionsDiv,
} from "./initWeatherDataMainCurrentConditionsDiv.js";
import { initWeatherDataOtherConditionsDiv } from "./initWeatherDataOtherConditionsDiv.js";
import { initWeatherDataAlertsDiv } from "./initWeatherDataAlertsDiv.js";
import { initWeatherDataWeatherInsightDiv } from "./initWeatherDataWeatherInsightDiv.js";
import { initWeatherDataHourlyDiv } from "./initWeatherDataHourlyDiv.js";
import { initWeatherDataDailyDiv } from "./initWeatherDataDailyDiv.js";
import applyDynamicBackground from "../dynamic-background/applyDynamicBackground.js";
import PubSub from "pubsub-js";

const blockName = "weather-data-page";
const tokenNameRenderFromNextDays = "RENDER WEATHER DATA FROM NEXT DAYS";
const tokenNameRenderInNextDays = "RENDER WEATHER DATA IN NEXT DAYS";

export default function renderWeatherDataPage(parentDiv, data) {
  const div = createWeatherDataPage(data);
  div.classList.toggle("night", !data.current.isDay);
  applyDynamicBackground(`--${blockName}-bg`, data);
  resetContent(parentDiv);
  parentDiv.append(div);

  PubSub.subscribe(tokenNameRenderInNextDays, (msg, dayIdx) => {
    PubSub.unsubscribe(tokenNameRenderInNextDays);
    console.log(`${msg} [${dayIdx}]`);
    renderWeatherDataPageNextDays(div, data, dayIdx);
  });
}

export function renderWeatherDataPageFromNextDays(oldDiv, data) {
  const div = createWeatherDataPage(data);
  div.classList.add(...oldDiv.classList);
  div.classList.remove("daily");
  oldDiv.replaceWith(div);

  PubSub.subscribe(tokenNameRenderInNextDays, (msg, dayIdx) => {
    PubSub.unsubscribe(tokenNameRenderInNextDays);
    console.log(`${msg} [${dayIdx}]`);
    renderWeatherDataPageNextDays(div, data, dayIdx);
  });
}

export function renderWeatherDataPageNextDays(oldDiv, data, dayIdx) {
  const div = createWeatherDataPageNextDays(data, dayIdx);
  div.classList.add(...oldDiv.classList);
  div.classList.add("daily");
  oldDiv.replaceWith(div);

  PubSub.subscribe(tokenNameRenderInNextDays, (msg, dayIdx) => {
    console.log(`${msg} [${dayIdx}] / from next days`);
    updateWeatherDataPageNextDays(div, data, dayIdx);
  });

  PubSub.subscribe(tokenNameRenderFromNextDays, (msg, data) => {
    PubSub.unsubscribe(tokenNameRenderFromNextDays);
    console.log(`${msg}`);
    renderWeatherDataPageFromNextDays(div, data);
  });
}

export function createWeatherDataPage(data) {
  const div = initDiv(blockName);

  const header = initWeatherDataHeader(data, data.formatTz);
  const content = [initWeatherDataMainCurrentConditionsDiv(data)];

  const alertDiv = initWeatherDataAlertsDiv(data);
  if (alertDiv != null) {
    content.push(alertDiv);
  }

  content.push(
    initWeatherDataWeatherInsightDiv(data.descriptionWeek),
    initWeatherDataHourlyDiv(data.next24Hours, data.formatTz, true),
    initWeatherDataDailyDiv(data.days, data.formatTz),
    initWeatherDataOtherConditionsDiv(data.current, data.formatTz)
  );

  div.append(header, ...content);

  return div;
}

export function createWeatherDataPageNextDays(data, dayIdx) {
  const div = initDiv(blockName);

  div.append(
    initWeatherDataHeaderNextDays(data, data.formatTz), // not to be updated
    initWeatherDataDailyDiv(data.days, data.formatTz), // not to be updated
    initWeatherDataMainDailyConditionsDiv(
      data.days[dayIdx],
      data.formatTz,
      dayIdx === 0
    ),
    initWeatherDataWeatherInsightDiv(data.days[dayIdx].descriptionStr),
    initWeatherDataHourlyDiv(data.days[dayIdx].hours, data.formatTz),
    initWeatherDataOtherConditionsDiv(data.days[dayIdx], data.formatTz)
  );

  return div;
}

export function updateWeatherDataPageNextDays(div, data, dayIdx) {
  const divChildren = div.children;

  divChildren[2].replaceWith(
    initWeatherDataMainDailyConditionsDiv(
      data.days[dayIdx],
      data.formatTz,
      dayIdx === 0
    )
  );
  divChildren[3].replaceWith(
    initWeatherDataWeatherInsightDiv(data.days[dayIdx].descriptionStr)
  );
  divChildren[4].replaceWith(
    initWeatherDataHourlyDiv(data.days[dayIdx].hours, data.formatTz)
  );
  divChildren[5].replaceWith(
    initWeatherDataOtherConditionsDiv(data.days[dayIdx], data.formatTz)
  );
}
