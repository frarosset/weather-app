import {
  initA,
  initImg,
  initP,
  initFooter,
} from "../../js-utilities/commonDomComponents.js";
import apiCreditImg from "../../assets/PoweredByVC-WeatherLogo-RoundedRect.png";

const blockName = "main-footer";
const cssClass = {
  apiCredit: "api-credit",
  apiCreditImg: "api-credit-img",
  imgCredit: "img-credit",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

export default function initMainFooter() {
  const footer = initFooter(blockName);

  // Add api and image credit
  footer.append(initApiCredit(), initImageCredit());

  return footer;
}

function initApiCredit() {
  const apiCreditDiv = initA(
    getCssClass("apiCredit"),
    "https://www.visualcrossing.com",
    null,
    "",
    "",
    "_blank"
  );

  const img = initImg(
    getCssClass("apiCreditImg"),
    apiCreditImg,
    "Powered by Visual Crossing Weather"
  );

  apiCreditDiv.append(img);

  return apiCreditDiv;
}

function initImageCredit() {
  const imgCreditP = initP(getCssClass("imgCredit"));

  imgCreditP.innerHTML = `Animated weather icons from 
    ${getAnchorStr("Meteoicons - Animated weather icons", "https://github.com/basmilius/weather-icons")}; some of these have been edited, too.
    Icons from
    ${getAnchorStr("useAnimations", "https://useanimations.com/index.html")}.
    Loading screen images derived from 
    ${getAnchorStr("LottieFiles", "https://lottiefiles.com/free-animation/looped-404-error-animation-YdIFC4QjMw")}.`;

  return imgCreditP;
}

function getAnchorStr(label, link) {
  return `<a href="${link}" target="_blank">${label}</a>`;
}
