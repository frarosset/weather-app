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
  const location = appData.location.home;
  if (location !== null) {
    showWeatherDataFor(location);
  }
}

export function resetHomeLocation() {
  appData.location.home = null;
}

// Functions related to last

export function setLastLocation(str) {
  appData.location.last = str;
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
}
