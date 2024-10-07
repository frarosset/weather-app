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
