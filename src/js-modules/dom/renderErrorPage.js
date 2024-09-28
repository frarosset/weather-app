import {
  initDiv,
  initP,
  initHeader,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { setAnimation, errorAnimation } from "./animations.js";

const blockName = "error-page";
const cssClass = {
  header: "header",
  errorDiv: "error-div",
  errorMsg: "error-msg",
  iconDiv: "icon-div",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderErrorPage(parentDiv, error) {
  const div = createErrorPage(error);
  resetContent(parentDiv);
  parentDiv.append(div);
}

export function createErrorPage(error) {
  const div = initDiv(blockName);
  div.append(initPageHeader(), initErrorMessageDiv(error));
  return div;
}

function initPageHeader() {
  const header = initHeader(getCssClass("header"));

  // todo: back

  return header;
}

function initErrorMessageDiv(error) {
  const div = initDiv(getCssClass("errorDiv"));

  const iconDiv = initDiv(getCssClass("iconDiv"));
  setAnimation(iconDiv, errorAnimation);

  const errorMsg = initP(getCssClass("errorMsg"), null, error.message);

  div.append(iconDiv, errorMsg);

  return div;
}
