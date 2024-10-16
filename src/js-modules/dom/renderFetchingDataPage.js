import {
  initDiv,
  initP,
  initHeader,
  initH1,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { setAnimation, fetchingAnimation } from "./animations.js";

const blockName = "fetching-page";
const cssClass = {
  header: "header",
  h1: "h1",
  fetchingDataDiv: "fetching-data-div",
  fetchingDataMsg: "fetching-data-msg",
  iconDiv: "icon-div",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderFetchingDataPage(parentDiv, locationStr) {
  const div = createFetchingDataPage(locationStr);
  resetContent(parentDiv);
  parentDiv.append(div);
}

export function createFetchingDataPage(locationStr) {
  const div = initDiv(blockName);
  div.append(initPageHeader(), initFetchingDataDiv(locationStr));
  return div;
}

function initPageHeader() {
  const header = initHeader(getCssClass("header"));

  const h1 = initH1(getCssClass("h1"), null, "WEATHER APP");

  header.append(h1);

  return header;
}

function initFetchingDataDiv(locationStr) {
  const div = initDiv(getCssClass("fetchingDataDiv"));

  const iconDiv = initDiv(getCssClass("iconDiv"));
  setAnimation(iconDiv, fetchingAnimation);

  const fetchDataMsg = initP(
    getCssClass("fetchingDataMsg"),
    null,
    `Fetching data for '${locationStr}'`
  );

  div.append(iconDiv, fetchDataMsg);

  return div;
}
