import { showWeatherDataFor } from "./js-modules/showWeatherDataFor.js";

const appData = {
  location: {
    home: null,
    bookmarked: [],
    last: "",
  },
};

// Functions related to location

export function setHomeLocation(str) {
  appData.location.home = str;
}

export function getHomeLocation() {
  return appData.location.home;
}

export function showHomeLocation() {
  const homeLocation = appData.location.home;
  if (homeLocation !== null) {
    showWeatherDataFor(homeLocation);
  }
}

export function resetHomeLocation() {
  appData.location.home = null;
}
