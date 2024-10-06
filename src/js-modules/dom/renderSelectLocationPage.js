import {
  initDiv,
  initInput,
  initButton,
} from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import { showWeatherDataFor } from "../showWeatherDataFor.js";
import { showHomeLocation } from "../../appData.js";

const blockName = "select-location-page";
const cssClass = {
  searchDiv: "search-div",
  searchInput: "search-input",
  homeDiv: "home-div",
  homeButton: "home-button",
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
  div.append(initSearchDiv(), initHomeLocationDiv());

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
  const homeDiv = initDiv(getCssClass("homeDiv"));

  const homeBtn = initButton(
    getCssClass("homeButton"),
    showHomeLocation,
    null,
    "Home"
  );

  homeDiv.append(homeBtn);

  return homeDiv;
}
