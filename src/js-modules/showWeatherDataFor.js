import PubSub from "pubsub-js";
import getData from "./api-dependant/getData.js";
import { setLastLocation } from "../appData.js";

export function showWeatherDataFor(location) {
  PubSub.publish("RENDER FETCHING DATA", location);
  return getData(location)
    .then((dataObj) => {
      PubSub.publish("RENDER WEATHER DATA", dataObj);
      return dataObj;
    })
    .then((dataObj) => {
      setLastLocation(dataObj.location);
    })
    .catch((errorObj) => {
      PubSub.publish("RENDER ERROR PAGE", errorObj);
    });
}

export function showWeatherDataForCurrentPosition() {
  if (!navigator.geolocation) {
    const error = new Error("Geolocation is not supported by this browser.");
    PubSub.publish("RENDER ERROR PAGE", error);
    return;
  }

  PubSub.publish("RENDER LOCATING");

  const successCallback = (position) => {
    const location = `${position.coords.latitude},${position.coords.longitude}`;
    showWeatherDataFor(location);
  };

  const errorCallback = (errorObj) => {
    PubSub.publish("RENDER ERROR PAGE", errorObj);
  };

  const settings = {
    enableHighAccuracy: true,
    maximumAge: 60000,
    timeout: 10000,
  };

  navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback,
    settings
  );
}
