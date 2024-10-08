import {
  initDiv,
  initP,
  initHeader,
  initH1,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { setAnimation, locatingAnimation } from "./animations.js";

const blockName = "locating-page";
const cssClass = {
  header: "header",
  h1: "h1",
  locatingDiv: "locating-div",
  locatingMsg: "locating-msg",
  iconDiv: "icon-div",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderLocatingPage(parentDiv, locationStr) {
  const div = createLocatingPage(locationStr);
  resetContent(parentDiv);
  parentDiv.append(div);
}

export function createLocatingPage() {
  const div = initDiv(blockName);
  div.append(initPageHeader(), initLocatingDiv());
  return div;
}

function initPageHeader() {
  const header = initHeader(getCssClass("header"));

  const h1 = initH1(getCssClass("h1"), null, "WEATHER APP");

  header.append(h1);

  return header;
}

function initLocatingDiv() {
  const div = initDiv(getCssClass("locatingDiv"));

  const iconDiv = initDiv(getCssClass("iconDiv"));
  setAnimation(iconDiv, locatingAnimation);

  const fetchDataMsg = initP(
    getCssClass("locatingMsg"),
    null,
    `Getting the current position`
  );

  div.append(iconDiv, fetchDataMsg);

  return div;
}
