import {
  initDiv,
  initInput,
  initButton,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { showWeatherDataFor } from "../showWeatherDataFor.js";
import {
  showHomeLocation,
  getBookmarkedLocations,
  getHomeLocation,
  removeBookmarkedLocation,
} from "../../appData.js";
import { setAnimation, icons, forcePlayAnimation } from "./animations.js";
import { resetHomeLocation } from "../../appData.js";

const blockName = "select-location-page";
const cssClass = {
  searchDiv: "search-div",
  searchInput: "search-input",
  homeDiv: "home-div",
  homeButton: "home-btn",
  removeHomeButton: "remove-home-btn",
  bookmarkedDiv: "bookmarked-div",
  bookmarkedList: "bookmarked-list",
  bookmarkedBtn: "bookmarked-btn",
  removeBookmarkedButton: "remove-bookmarked-btn",
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
    initSearchDiv(),
    initHomeLocationDiv(),
    initBookmarkedLocationDiv()
  );

  return div;
}

function initSearchDiv() {
  const searchDiv = initDiv(getCssClass("searchDiv"));

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

  searchDiv.append(searchInput);

  return searchDiv;
}

function initHomeLocationDiv() {
  const div = initDiv(getCssClass("homeDiv"));

  const location = getHomeLocation();
  if (location !== null) {
    const removeBtn = initRemoveHomeButton(div);

    const btn = initButton(
      getCssClass("homeButton"),
      showHomeLocation,
      null,
      location
    );

    div.append(removeBtn, btn);
  }

  return div;
}

function initRemoveHomeButton(parentDiv) {
  const removeBtnCallback = () => {
    forcePlayAnimation(animation, -1);
    resetHomeLocation();
    resetContent(parentDiv);
  };

  const removeBtn = initButton(
    getCssClass("removeHomeButton"),
    removeBtnCallback
  );
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
      getCssClass("bookmarkedButton"),
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
    resetContent(parentDiv);
  };

  const removeBtn = initButton(
    getCssClass("removeBookmarkedButton"),
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
