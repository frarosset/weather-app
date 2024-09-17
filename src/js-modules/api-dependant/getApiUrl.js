// Visual Crossing API
// Link: https://www.visualcrossing.com/
// Documentation: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/

const apiKey = "FZ6JBW3LC4VQDCA7AWX594BNP";

const unitGroupDefault = "metric"; // us, metric, uk, base, todo: get units
const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export const getApiUrl = (location, unitGroup = unitGroupDefault) =>
  `${baseUrl}/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${apiKey}`;

// fix location: if location is '', the 'today' location is used instead and no error is thrown, so use ' ' instead
export const getApiUrlBasic = (location, unitGroup = unitGroupDefault) =>
  `${baseUrl}/${encodeURIComponent(location === "" ? " " : location)}/today?unitGroup=${unitGroup}&key=${apiKey}&include=current&elements=datetime,temp,conditions,icon`;

//&iconSet=icons2 // todo
