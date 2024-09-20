import { initDiv, initInput } from "../../js-utilities/commonDomComponents.js";
import getData from "../api-dependant/getData.js";

const blockName = "select-location-page";
const cssClass = {
  searchDiv: "search-div",
  searchInput: "search-input",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function renderSelectLocationPage(parentDiv) {
  // todo: clear current parentDiv;

  parentDiv.append(createSelectLocationPage());
}

export function createSelectLocationPage() {
  const div = initDiv(blockName);

  // Search div
  div.append(initSearchDiv());

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
      getData(location).then((dataObj) => console.log(dataObj));
    }
  });

  searchDiv.append(searchInput);

  return searchDiv;
}
