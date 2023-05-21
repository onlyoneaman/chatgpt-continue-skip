import { memoizedLocale } from "./util";

export const { version = "NOT_RECEIVED" } = chrome.runtime.getManifest();

export function errorTrack(error, triggerPoint = "GENERIC_ERROR") {
  const errData = {
    event: "ExecError",
    properties: {
      message: error.message,
      errCode: error.errCode,
      osLocale: window.navigator.language,
      locale: memoizedLocale("locale"),
      triggerPoint,
      version,
    },
  };

}
