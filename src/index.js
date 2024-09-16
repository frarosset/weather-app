import "./index.css";
import {
  getApiUrl,
  getApiUrlBasic,
} from "./js-modules/api-specific/getApiUrl.js";
import getUnit from "./js-modules/api-specific/getUnit.js";

// temporary code
console.log(getApiUrl("Rome"));
console.log(getApiUrlBasic("New York"));

console.log(getUnit("temp", "base"));
console.log(getUnit("visibility", "us"));
