import "./index.css";
import getUnit from "./js-modules/api-dependant/getUnit.js";
import getData from "./js-modules/api-dependant/getData.js";

// temporary code

console.log(getUnit("temp", "base"));
console.log(getUnit("visibility", "us"));

getData("Rome");
getData("New York"); // encoding space needed
getData(""); // error: missing location
getData("xyz"); // error: location not found
