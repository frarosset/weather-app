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
import {
  isUnits,
  setUnits,
  getAnimations,
  setAnimations,
} from "../../appData.js";
import PubSub from "pubsub-js";

const blockName = "settings-page";
const cssClass = {
  header: "header",
  h1: "h1",
  h2: "h2",
  backBtn: "back-btn",
  unitsFieldset: "units-fieldset",
  unitsItem: "units-item",
  enableAnimationsItem: "enable-animations-item",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderSelectLocationPage(parentDiv) {
  const div = createSelectLocationPage();
  resetContent(parentDiv);
  parentDiv.append(div);
}

export function createSelectLocationPage() {
  const div = initDiv(blockName);

  div.append(
    initPageHeader(),
    initH2(getCssClass("h2"), null, "Settings"),
    initUnitSystem(),
    initEnableAnimations()
  );

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

  //   backBtn.addEventListener("mouseleave", () => {
  //     forcePlayAnimation(animation, -1);
  //   });

  return backBtn;
}

function initUnitSystem() {
  const fieldset = initFieldset(getCssClass("unitsFieldset"), "Units");

  const unitsArr = [
    ["metric", "Metric"],
    ["uk", "United Kingdom"],
    ["us", "United States"],
  ];

  unitsArr.forEach(([value, label]) => {
    const item = initRadioItem(getCssClass("unitsItem"), "units", value, label);

    if (isUnits(value)) {
      item.input.checked = true;
    }

    item.addEventListener("change", () => {
      if (item.input.checked) {
        setUnits(item.input.value);
      }
    });

    fieldset.append(item);
  });

  return fieldset;
}

function initEnableAnimations() {
  const item = initRadioItem(
    getCssClass("enableAnimationsItem"),
    "animations",
    "enabled",
    "Enable animations",
    "checkbox"
  );

  item.input.checked = getAnimations();

  item.addEventListener("change", () => {
    setAnimations(item.input.checked);
  });

  return item;
}
