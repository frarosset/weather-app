// Visual Crossing API
// Link: https://www.visualcrossing.com/
// Documentation: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
//                https://www.visualcrossing.com/resources/documentation/weather-api/how-to-load-weather-data-in-javascript/

import { getApiUrl, getApiUrlBasic } from "./getApiUrl.js";
import processResponseData from "./processResponseData.js";

const locationDefault = "London"; // todo: get location from ip
const unitGroupDefault = "metric"; // us, metric, uk, base

export default function getData(
  location = locationDefault,
  unitGroup = unitGroupDefault,
  full = true
) {
  const apiUrl = full
    ? getApiUrl(location, unitGroup)
    : getApiUrlBasic(location, unitGroup);

  console.log(apiUrl);

  fetch(apiUrl, { mode: "cors" })
    .then(function (response) {
      if (!response.ok) {
        return handleError(response); //returns a Promise that throws an Error when resolved
      }
      return response.json(); //returns a Promise
    })
    .then(function (responseObj) {
      console.log(responseObj);
      const dataObj = processResponseData(responseObj, unitGroup, full);
      console.log(dataObj);
    })
    .catch(function (error) {
      console.log(error);
      // todo: handle error
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
