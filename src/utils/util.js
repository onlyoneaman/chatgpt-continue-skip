import { i18nMap } from "./i18n";

export const memoizedLocale = memoize(getLocaleForPrime);

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fetchDomNode(elements) {
  for (element of elements) {
    const { selector, xpath } = element;
    let domNode;
    if (!xpath) {
      domNode = document.querySelector(selector);
    }

    if (!domNode && xpath) {
      domNode = document.evaluate(
        element.selector,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    }

    if (domNode) {
      return {
        ...element,
        domNode,
      };
    }
  }
}

export function getInnerText(domNode, type) {
  return domNode.innerText;
}

export async function setInnerText(domNode, type, text) {

  domNode.innerText = text;
  await sleep(500);
}

function getLocaleForPrime() {
  const scripts = document.querySelectorAll('script[type="text/template"]');

  const regEx = new RegExp('(?<="locale":")(.*?)(?=")');

  for (script of scripts) {
    const eachScriptInnerText = script.innerText;

    const locale = eachScriptInnerText.match(regEx);

    if (locale) {
      return locale[0];
    }
  }
}

export function syncLocalData(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], function (items) {
      resolve(JSON.parse(items.data));
    });
  });
}

function memoize(callback) {
  let memoHash = {};
  return (param) => {
    if (memoHash[param]) {
      return memoHash[param];
    } else {
      memoHash[param] = callback();
      return memoHash[param];
    }
  };
}

// this is for just for analytics purpose
export function getCountryAndState() {
  return fetch("https://ipapi.co/json/");
}

export function translateLocale(skipEventKey) {
  const fallbackLocale = "en_US";
  const locale = memoizedLocale("locale");

  if (i18nMap[locale]) {
    if (i18nMap[locale][skipEventKey]) {
      return {
        translatedText: i18nMap[locale][skipEventKey],
        localeFound: true,
        keyFound: true,
        locale,
      };
    } else {
      return {
        translatedText: i18nMap[fallbackLocale][skipEventKey],
        localeFound: true,
        keyFound: false,
        locale,
      };
    }
  } else {
    return {
      translatedText: i18nMap[fallbackLocale][skipEventKey],
      localeFound: false,
      keyFound: false,
      locale,
    };
  }
}
