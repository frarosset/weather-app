import {
  initDiv,
  initInput,
  initButton,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { showWeatherDataFor } from "../showWeatherDataFor.js";
import { showHomeLocation, getBookmarkedLocations } from "../../appData.js";

const blockName = "select-location-page";
const cssClass = {
  searchDiv: "search-div",
  searchInput: "search-input",
  homeDiv: "home-div",
  homeButton: "home-button",
  bookmarkedDiv: "bookmarked-div",
  bookmarkedList: "bookmarked-list",
  bookmarkedBtn: "bookmarked-btn",
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

  const btn = initButton(
    getCssClass("homeButton"),
    showHomeLocation,
    null,
    "Home"
  );

  div.append(btn);

  return div;
}

function initBookmarkedLocationDiv() {
  const div = initDiv(getCssClass("bookmarkedDiv"));

  const bookmarkedLocations = getBookmarkedLocations();
  const list = initDiv(getCssClass("bookmarkedList"));

  bookmarkedLocations.forEach((location) => {
    const btn = initButton(
      getCssClass("bookmarkedButton"),
      () => {
        showWeatherDataFor(location);
      },
      null,
      location
    );
    list.append(btn);
  });

  div.append(list);

  return div;
}
