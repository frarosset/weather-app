import {
  initDiv,
  initP,
  initHeader,
  initButton,
  initH1,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import {
  setAnimation,
  icons,
  forcePlayAnimation,
  errorAnimation,
} from "./animations.js";
import PubSub from "pubsub-js";

const blockName = "error-page";
const cssClass = {
  header: "header",
  h1: "h1",
  errorDiv: "error-div",
  errorMsg: "error-msg",
  iconDiv: "icon-div",
  backBtn: "back-btn",
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

  const h1 = initH1(getCssClass("h1"), null, "WEATHER APP");

  header.append(initBackButton(), h1);

  return header;
}

function initBackButton() {
  const backBtnCallback = () => {
    forcePlayAnimation(animation, 1);
    PubSub.publish("RENDER SELECT LOCATION DATA");
  };

  const backBtn = initButton(getCssClass("backBtn"), backBtnCallback);
  const animation = setAnimation(backBtn, icons.chevronLeft, false, false);

  backBtn.addEventListener("mouseenter", () => {
    forcePlayAnimation(animation, 1);
  });

  backBtn.addEventListener("mouseleave", () => {
    forcePlayAnimation(animation, -1);
  });

  return backBtn;
}

function initErrorMessageDiv(error) {
  const div = initDiv(getCssClass("errorDiv"));

  const iconDiv = initDiv(getCssClass("iconDiv"));
  setAnimation(iconDiv, errorAnimation);

  const errorMsg = initP(getCssClass("errorMsg"), null, error.message);

  div.append(iconDiv, errorMsg);

  return div;
}
