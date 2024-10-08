import {
  initDiv,
  initButton,
  initHeader,
  initH1,
  initH2,
  initFieldset,
  initRadioItem,
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
  unitsFieldset: "units-fieldset",
  unitsItem: "units-item",
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

  const h2 = initH2(getCssClass("settingsDiv"), null, "Settings");

  div.append(h2, initUnitSystem());

  return div;
}

function initUnitSystem() {
  const fieldset = initFieldset(getCssClass("unitsFieldset"), "Units");

  const units = [
    ["metric", "Metric"],
    ["uk", "United Kingdom"],
    ["us", "United States"],
  ];

  units.forEach(([value, label]) => {
    fieldset.append(
      initRadioItem(getCssClass("unitsItem"), "units", value, label)
    );
  });

  return fieldset;
}
