import {
  initDiv,
  initInput,
  initButton,
  initHeader,
  initH1,
} from "../../js-utilities/commonDomComponents.js";
import {
  resetContent,
  deleteElement,
} from "../../js-utilities/commonDomUtilities.js";
import {
  showWeatherDataFor,
  showWeatherDataForCurrentPosition,
} from "../showWeatherDataFor.js";
import {
  showHomeLocation,
  getBookmarkedLocations,
  getHomeLocation,
  removeBookmarkedLocation,
} from "../../appData.js";
import { setAnimation, icons, forcePlayAnimation } from "./animations.js";
import { resetHomeLocation } from "../../appData.js";
import PubSub from "pubsub-js";

const blockName = "select-location-page";
const cssClass = {
  header: "header",
  h1: "h1",
  settingsBtn: "settings-btn",
  searchDiv: "search-div",
  searchInput: "search-input",
  searchIcon: "search-icon",
  homeDivCnt: "home-div-cnt",
  homeDiv: "home-div",
  homeBtn: "home-btn",
  currentLocationDivCnt: "current-location-div-cnt",
  currentLocationDiv: "current-location-div",
  currentLocationIcon: "current-location-icon",
  currentLocationBtn: "current-location-btn",
  removeHomeBtn: "remove-home-btn",
  bookmarkedDiv: "bookmarked-div",
  bookmarkedList: "bookmarked-list",
  bookmarkedBtn: "bookmarked-btn",
  removeBookmarkedBtn: "remove-bookmarked-btn",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderSelectLocationPage(parentDiv) {
  const div = createSelectLocationPage();
  resetContent(parentDiv);
  parentDiv.append(div);
}

export function createSelectLocationPage() {
  const div = initDiv(blockName);

  // Search div
  div.append(
    initPageHeader(),
    initSearchDiv(),
    initCurrentLocationLocationDiv(),
    initHomeLocationDiv(),
    initBookmarkedLocationDiv()
  );

  return div;
}

function initPageHeader() {
  const header = initHeader(getCssClass("header"));

  const h1 = initH1(getCssClass("h1"), null, "WEATHER APP");
  header.append(h1, initSettingsButton());

  return header;
}

function initSettingsButton() {
  const settingsBtnCallback = () => {
    forcePlayAnimation(animation, 1);
    PubSub.publish("RENDER SETTINGS");
  };

  const settingsBtn = initButton(
    getCssClass("settingsBtn"),
    settingsBtnCallback
  );
  const animation = setAnimation(settingsBtn, icons.settings, false, false);

  settingsBtn.addEventListener("mouseenter", () => {
    forcePlayAnimation(animation, 1);
  });

  settingsBtn.addEventListener("mouseleave", () => {
    forcePlayAnimation(animation, -1);
  });

  return settingsBtn;
}

function initSearchDiv() {
  const searchDiv = initDiv(getCssClass("searchDiv"));

  const searchIcon = initDiv(getCssClass("searchIcon"));
  setAnimation(searchIcon, icons.search, false, false);

  const searchInput = initInput(
    getCssClass("searchInput"),
    getCssClass("searchInput"),
    "searchInput",
    "Search",
    true,
    "Search for a location"
  );
  searchInput.type = "search";

  searchInput.addEventListener("change", (e) => {
    const location = e.currentTarget.value;
    if (location !== "") {
      showWeatherDataFor(location).finally(() => {
        searchInput.value = "";
      });
    }
  });

  searchDiv.append(searchIcon, searchInput);

  return searchDiv;
}

function initCurrentLocationLocationDiv() {
  const divCnt = initDiv(getCssClass("currentLocationDivCnt"));

  if (navigator.geolocation) {
    const div = initDiv(getCssClass("currentLocationDiv"));
    const currentLocationIcon = initDiv(getCssClass("currentLocationIcon"));
    setAnimation(currentLocationIcon, icons.explore, false, false);

    const btn = initButton(
      getCssClass("currentLocationBtn"),
      showWeatherDataForCurrentPosition,
      null,
      "Your current location"
    );

    div.append(currentLocationIcon, btn);
    divCnt.append(div);
  }

  return divCnt;
}

function initHomeLocationDiv() {
  const divCnt = initDiv(getCssClass("homeDivCnt"));

  const location = getHomeLocation();
  if (location !== null) {
    const div = initDiv(getCssClass("homeDiv"));
    const removeBtn = initRemoveHomeButton(div);

    const btn = initButton(
      getCssClass("homeBtn"),
      showHomeLocation,
      null,
      location
    );

    div.append(removeBtn, btn);
    divCnt.append(div);
  }

  return divCnt;
}

function initRemoveHomeButton(parentDiv) {
  const removeBtnCallback = () => {
    forcePlayAnimation(animation, -1);
    resetHomeLocation();
    deleteElement(parentDiv);
  };

  const removeBtn = initButton(getCssClass("removeHomeBtn"), removeBtnCallback);
  const animation = setAnimation(removeBtn, icons.heart, false, false);
  forcePlayAnimation(animation, 1);

  removeBtn.addEventListener("mouseenter", () => {
    forcePlayAnimation(animation, -1);
  });

  removeBtn.addEventListener("mouseleave", () => {
    forcePlayAnimation(animation, 1);
  });

  return removeBtn;
}

function initBookmarkedLocationDiv() {
  const list = initDiv(getCssClass("bookmarkedList"));

  const bookmarkedLocations = getBookmarkedLocations();

  bookmarkedLocations.forEach((location) => {
    const div = initDiv(getCssClass("bookmarkedDiv"));

    const removeBtn = initRemoveBookmarkedButton(div, location);

    const btn = initButton(
      getCssClass("bookmarkedBtn"),
      () => {
        showWeatherDataFor(location);
      },
      null,
      location
    );

    div.append(removeBtn, btn);
    list.append(div);
  });

  return list;
}

function initRemoveBookmarkedButton(parentDiv, location) {
  const removeBtnCallback = () => {
    forcePlayAnimation(animation, -1);
    removeBookmarkedLocation(location);
    deleteElement(parentDiv);
  };

  const removeBtn = initButton(
    getCssClass("removeBookmarkedBtn"),
    removeBtnCallback
  );
  const animation = setAnimation(removeBtn, icons.bookmark, false, false);
  forcePlayAnimation(animation, 1);

  removeBtn.addEventListener("mouseenter", () => {
    forcePlayAnimation(animation, -1);
  });

  removeBtn.addEventListener("mouseleave", () => {
    forcePlayAnimation(animation, 1);
  });

  return removeBtn;
}
