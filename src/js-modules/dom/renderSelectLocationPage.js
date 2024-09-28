import { initDiv, initInput } from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";
import getData from "../api-dependant/getData.js";
import PubSub from "pubsub-js";

const blockName = "select-location-page";
const cssClass = {
  searchDiv: "search-div",
  searchInput: "search-input",
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
      PubSub.publish("RENDER FETCHING DATA", location);
      getData(location)
        .then((dataObj) => {
          searchInput.value = "";
          PubSub.publish("RENDER WEATHER DATA", dataObj);
        })
        .catch((errorObj) => {
          searchInput.value = "";
          PubSub.publish("RENDER ERROR PAGE", errorObj);
        });
    }
  });

  searchDiv.append(searchInput);

  return searchDiv;
}
