// Visual Crossing API
// Link: https://www.visualcrossing.com/
// Documentation: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/

const apiKey = "FZ6JBW3LC4VQDCA7AWX594BNP";

const locationDefault = "London"; // todo: get location from ip
const unitGroupDefault = "metric"; // us, metric, uk, base, todo: get units
const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export const getApiUrl = (
  location = locationDefault,
  unitGroup = unitGroupDefault
) =>
  `${baseUrl}/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${apiKey}`;

export const getApiUrlBasic = (
  location = locationDefault,
  unitGroup = unitGroupDefault
) =>
  `${baseUrl}/${encodeURIComponent(location)}/today?unitGroup=${unitGroup}&key=${apiKey}&include=current&elements=datetime,temp,conditions,icon`;

//&iconSet=icons2 // todo
