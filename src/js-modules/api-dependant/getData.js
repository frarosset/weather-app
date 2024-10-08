// Visual Crossing API
// Link: https://www.visualcrossing.com/
// Documentation: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
//                https://www.visualcrossing.com/resources/documentation/weather-api/how-to-load-weather-data-in-javascript/

import { getApiUrl, getApiUrlBasic } from "./getApiUrl.js";
import processResponseData from "./processResponseData.js";
import { getUnits } from "../../appData.js";

const unitGroupDefault = "metric"; // us, metric, uk, base

export default function getData(location, full = true) {
  let unitGroup = getUnits();

  if (unitGroup == null) unitGroup = unitGroupDefault;

  const apiUrl = full
    ? getApiUrl(location, unitGroup)
    : getApiUrlBasic(location, unitGroup);

  return fetch(apiUrl, { mode: "cors" })
    .then(function (response) {
      if (!response.ok) {
        return handleError(response); //returns a Promise that throws an Error when resolved
      }
      return response.json(); //returns a Promise
    })
    .then(function (responseObj) {
      const dataObj = processResponseData(responseObj, unitGroup, full);
      console.log("FETCHED:", responseObj, "PROCESSED:", dataObj);
      return dataObj;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
}

// Error handling ---------------------------------------------------------------------------

function handleError(response) {
  const errorData = {
    status: response.status,
    text: response.statusText,
    message: "",
  };

  const throwError = (errorData) => {
    const err = new Error(errorData.message);
    err.status = errorData.status;
    err.text = errorData.text;
    err.message = errorData.message;
    throw err;
  };

  if (response.text) {
    //additional error information
    return response.text().then((errorMessage) => {
      errorData.message = errorMessage;
      //errorMessage now returns the response body which includes the full error message
      throwError(errorData);
    });
  } else {
    // no additional error information
    return Promise.resolve().then(() => {
      throwError(errorData);
    });
  }
}
