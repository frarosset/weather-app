import { showWeatherDataFor } from "./js-modules/showWeatherDataFor.js";

const appData = {
  location: {
    home: null,
    bookmarked: [],
    last: "",
  },
};

// Local storage
function saveToLocalStorage() {
  localStorage.setItem("appData", JSON.stringify(appData));
}

function getFromLocalStorage() {
  const jsonStr = localStorage.getItem("appData");
  Object.assign(appData, JSON.parse(jsonStr));
}

export function initAppData() {
  getFromLocalStorage();

  addBookmarkedLocation("sydney");
  addBookmarkedLocation("rome");
  addBookmarkedLocation("dubai");
}

// Functions related to location

export function setHomeLocation(str) {
  appData.location.home = str;
  saveToLocalStorage();
}

export function getHomeLocation() {
  return appData.location.home;
}

export function showHomeLocation() {
  const location = appData.location.home;
  if (location !== null) {
    showWeatherDataFor(location);
  }
}

export function resetHomeLocation() {
  appData.location.home = null;
  saveToLocalStorage();
}

// Functions related to last location

export function setLastLocation(str) {
  appData.location.last = str;
  saveToLocalStorage();
}

export function getLastLocation() {
  return appData.location.last;
}

export function showLastLocation() {
  const location = appData.location.last;
  if (location !== null) {
    showWeatherDataFor(location);
  }
}

export function resetLastLocation() {
  appData.location.last = null;
  saveToLocalStorage();
}

// Functions related to bookmarked locations

export function addBookmarkedLocation(str) {
  const bookmarkedSet = new Set(appData.location.bookmarked);
  bookmarkedSet.add(str);
  appData.location.bookmarked = [...bookmarkedSet].sort();
  saveToLocalStorage();
}

export function removeBookmarkedLocation(str) {
  const bookmarkedSet = new Set(appData.location.bookmarked);
  bookmarkedSet.delete(str);
  appData.location.bookmarked = [...bookmarkedSet].sort();
  saveToLocalStorage();
}

export function getBookmarkedLocations() {
  return appData.location.bookmarked;
}

export function resetBookmarkedLocations() {
  appData.location.bookmarked = [];
  saveToLocalStorage();
}
