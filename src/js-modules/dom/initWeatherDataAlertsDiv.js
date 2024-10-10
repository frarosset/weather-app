import {
  initDiv,
  initH3,
  initP,
  initUl,
  initLiAsChildInList,
  initH4,
  initHeader,
  initButton,
} from "../../js-utilities/commonDomComponents.js";
import { setAnimation, icons, forcePlayAnimation } from "./animations.js";

const blockName = "weather-data-page";
const cssClass = {
  alertsDiv: "alerts-div",
  alertsIconDiv: "alerts-icon-div",
  alertsH3: "alerts-h3",
  alertsList: "alerts-list",
  alertLi: "alert-li",
  alertHeader: "alert-header",
  alertH4: "alert-h4",
  alertDateP: "alert-date-p",
  alertDescrP: "alert-descr-p",
  alertOpenLinkBtn: "alert-open-link-btn",
};
const getCssClass = (element) => `${blockName}__${cssClass[element]}`;

let formatRelativeTz = null;

export function initWeatherDataAlertsDiv(data) {
  formatRelativeTz = data.formatRelativeTz;
  const div = initAlertsDiv(data, "");
  formatRelativeTz = null;
  return div;
}
function initAlertsDiv(data) {
  if (data.alerts.length == 0) return null;

  const div = initDiv(getCssClass("alertsDiv"));

  const alertsIconDiv = initDiv(getCssClass("alertsIconDiv"));
  setAnimation(alertsIconDiv, icons.alert);
  const alertsH3 = initH3(getCssClass("alertsH3"), null, "Alerts");

  const alertsList = initUl(getCssClass("alertsList"));

  data.alerts.forEach((alert) => {
    const alertLi = initLiAsChildInList(alertsList, getCssClass("alertLi"));

    alertLi.classList.add("clamp");
    const clampBtnCallback = () => {
      alertLi.classList.toggle("clamp");
    };
    alertLi.addEventListener("click", clampBtnCallback);

    const alertH4 = initH4(getCssClass("alertH4"), null, alert.event);

    const alertHeading = initHeader(getCssClass("alertHeader"));
    alertHeading.append(alertH4);

    const alertDateStr = `${formatRelativeTz(alert.onset, data.current.datetime)} ➜ ${formatRelativeTz(alert.ends, data.current.datetime)}`;
    const alertDateP = initP(getCssClass("alertDateP"), null, alertDateStr);
    const alertDescrP = initP(
      getCssClass("alertDescrP"),
      null,
      alert.description
    );

    alertLi.append(alertHeading, alertDateP, alertDescrP);

    if (alert.link != null) {
      const alertOpenLinkBtnCallback = () => {
        forcePlayAnimation(animation, 1);
        window.open(alert.link);
      };

      const alertOpenLinkBtn = initButton(
        getCssClass("alertOpenLinkBtn"),
        alertOpenLinkBtnCallback
      );
      const animation = setAnimation(
        alertOpenLinkBtn,
        icons.chevronRight,
        false,
        false
      );

      alertOpenLinkBtn.addEventListener("mouseenter", () => {
        forcePlayAnimation(animation, 1, "true");
      });

      alertHeading.append(alertOpenLinkBtn);
    }
  });

  div.append(alertsIconDiv, alertsH3, alertsList);

  return div;
}
