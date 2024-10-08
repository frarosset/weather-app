import {
  initDiv,
  initButton,
  initHeader,
  initH1,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { setAnimation, icons, forcePlayAnimation } from "./animations.js";
import PubSub from "pubsub-js";

const blockName = "settings-page";
const cssClass = {
  header: "header",
  h1: "h1",
  backBtn: "back-btn",
  settingsDiv: "settings-div",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderSelectLocationPage(parentDiv) {
  const div = createSelectLocationPage();
  resetContent(parentDiv);
  parentDiv.append(div);
}

export function createSelectLocationPage() {
  const div = initDiv(blockName);

  div.append(initPageHeader(), initSettingsDiv());

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

function initSettingsDiv() {
  const div = initDiv(getCssClass("settingsDiv"));

  div.textContent = "Settings";

  return div;
}
