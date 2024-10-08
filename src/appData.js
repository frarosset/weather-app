import { showWeatherDataFor } from "./js-modules/showWeatherDataFor.js";
import { freezeAllAnimations } from "./js-modules/dom/animations.js";

const defaultUnits = "metric";
const defaultAnimations = false;

const appData = {
  location: {
    home: null,
    bookmarked: [],
    last: null,
  },
  units: defaultUnits,
  animations: defaultAnimations,
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
  freezeAllAnimations(appData.animations);
}

// Functions related to location

export function setHomeLocation(str) {
  appData.location.home = str;
  saveToLocalStorage();
}

export function getHomeLocation() {
  return appData.location.home;
}

export function isHomeLocation(str) {
  return str === appData.location.home;
}

export function showHomeLocation() {
  const location = appData.location.home;
  if (location !== null) {
    showWeatherDataFor(location);
    return true;
  }
  return false;
}

export function resetHomeLocation() {
  setHomeLocation(null);
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
    return true;
  }
  return false;
}

export function resetLastLocation() {
  setLastLocation(null);
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

export function isInBookmarkedLocations(str) {
  return appData.location.bookmarked.includes(str);
}

// Functions related to units

export function setUnits(str) {
  appData.units = str;
  saveToLocalStorage();
}

export function getUnits() {
  return appData.units;
}

export function isUnits(str) {
  return str === appData.units;
}

export function resetUnits() {
  setUnits(defaultUnits);
}

// Functions related to animations (enabled/disabled)

export function setAnimations(val) {
  appData.animations = val;
  freezeAllAnimations(val);
  saveToLocalStorage();
}

export function getAnimations() {
  return appData.animations;
}

export function isAnimations(val) {
  return val === appData.animations;
}

export function resetAnimations() {
  setAnimations(defaultAnimations);
}
