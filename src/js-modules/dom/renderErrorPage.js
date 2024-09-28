import { initP } from "../../js-utilities/commonDomComponents.js";
import { resetContent } from "../../js-utilities/commonDomUtilities.js";

export default function renderErrorPage(parentDiv, error) {
  const div = createErrorPage(error);
  resetContent(parentDiv);
  parentDiv.append(div);
}

export function createErrorPage(error) {
  return initP("error", "", error.message);
}
