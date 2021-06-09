import {isTypeOfSafeNumber} from './validators';

const dblClickTimeout = {
  count: 0,
  id: null,
};

export function addZ (n) {
  return n < 10 ? '0' + n : '' + n;
}

export function arrayRemoveDuplicates (arrayValue) {
  return arrayValue.filter((value, index) => {
    return arrayValue.indexOf(value) === index;
  });
}

/*
function arrayRemoveDuplicates (array) {
  // Muito mais veloz em cenários com poucos registros duplicados (é o caso aqui, sempre 1)
  return [...new Set(array)]; // Set não permite valores duplicados
}
*/

export function arrayRemoveEmpty (arrayValue) {
  return arrayValue.filter((value) => {
    return hasValue(value);
  });
}

export function capitalize (value) {
  const newValue = value.toLowerCase().replace(/(^\w)|(\s+\w)/g, (letter) => {
    return letter.toUpperCase();
  });
  return newValue
    .replace(findAllRegExp('D\'a'), 'D\'A')
    .replace(findAllRegExp('D\'e'), 'D\'E')
    .replace(findAllRegExp('D\'i'), 'D\'I')
    .replace(findAllRegExp('D\'o'), 'D\'O')
    .replace(findAllRegExp('D\'u'), 'D\'U')
    .replace(findAllRegExp(' Da '), ' da ')
    .replace(findAllRegExp(' Das '), ' das ')
    .replace(findAllRegExp(' De '), ' de ')
    .replace(findAllRegExp(' Der '), ' der ')
    .replace(findAllRegExp(' Do '), ' do ')
    .replace(findAllRegExp(' Dos '), ' dos ')
    .replace(findAllRegExp(' E '), ' e ')
    .replace(findAllRegExp(' Van '), ' van ')
    .replace(findAllRegExp(' Von '), ' von ')
    .replace(findAllRegExp(' S.a'), ' S.A')
    .replace(findAllRegExp(' S/a'), ' S.A')
    .replace(findAllRegExp(' S/A'), ' S.A');
}

/**
 * Composes single-argument functions from right to left.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing functions from right to
 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
 */
export function compose (...funcs) {
  return (arg) => funcs.reduceRight((composed, f) => f(composed), arg);
}

export function emptyChar (value, char = '-') {
  return hasValue(value) && value !== false ? value : char;
}

// noinspection JSUnusedGlobalSymbols
export function emptyCharWhenZero (value, char = '-') {
  const isZero = value === '0' || value === 0 || value === false;
  return hasValue(value) && !isZero ? value : char;
}

export function findAllRegExp (value) {
  const newValue = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  return new RegExp(newValue, 'g'); // g modifier is used to perform a global match (find all matches rather than stopping after the first match)
}

export function firstLetterUpperCase (value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

// noinspection JSUnusedGlobalSymbols
export function getFirstPhoneData (json) {
  const phoneRows = jsonParse(json);
  if (!phoneRows) return null;
  return phoneRows[0];
}

export function getFirstMobilePhoneData (json) {
  const jsonData = jsonParse(json);
  if (!jsonData) return null;
  const filteredPhones = jsonData.filter((phoneData) => {
    return phoneData.type == 0; // TODO YIIT
  });
  return filteredPhones[0];
}

export function getFormUrlQueryString (formDom) {
  const elementsLength = formDom.elements.length;
  let count = 0;
  const urlParams = {};
  for (let i = 0; i < elementsLength; i++) {
    const element = formDom.elements[i];
    const datasetType = element.dataset.type;
    let resolvedValue = null;
    switch (element.type) {
      case 'text':
        if (datasetType !== 'skip-url-query-string') {
          resolvedValue = element.value;
        }
        break;
      case 'radio':
        if (element.checked) {
          resolvedValue = element.value;
        }
        break;
      case 'hidden':
        if (datasetType === 'check-group-values' || datasetType === 'json-value') {
          // Ao enviar um objeto o queryStringStringify cuida de converter em parametro [1,2]
          resolvedValue = jsonParse(element.value);
        }
        break;
      default:
    }
    if (resolvedValue) {
      urlParams[element.name] = resolvedValue;
      count++;
    }
  }
  if (count === 0) return null;
  return queryStringStringify(urlParams);
}

export function getFullWindowLocationPathnameAndSearch () {
  return window.location.pathname + window.location.search;
}

export function getIsFirefoxBrowser () {
  return typeof InstallTrigger !== 'undefined';
}

export function getIsIeBrowser () {
  return !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
}

// noinspection JSUnusedGlobalSymbols
export function getIsMobile () {
  // 480 telefone mais largo, 896 telefone mais comprido, horizontal
  // iPhone XR: 414 x 896
  // Samsung Galaxy Note 5: 480 x 853
  return window.innerWidth <= 480 || (window.innerWidth <= 896 && window.innerWidth > window.innerHeight);
}

export function getIsTablet () {
  // O ipad Pro deitado tem 1366 os demais 1024
  return !!navigator.userAgent.match(/iPad/i) || window.innerWidth <= 800; // 800 Samsung Galaxy Tab 10
}

export function getSequenceOptions (firstNumber, lastNumber) {
  const options = [];
  if (firstNumber > lastNumber) {
    for (let i = firstNumber; i >= lastNumber; i--) {
      options.push({id: i, label: i.toString()});
    }
  } else {
    for (let i = firstNumber; i <= lastNumber; i++) {
      options.push({id: i, label: i.toString()});
    }
  }
  return options;
}

export function handleDblClick (dblClickCallback, singleClickCallback, delay = 400) {
  dblClickTimeout.count++;
  if (dblClickTimeout.count === 1) {
    dblClickTimeout.id = setTimeout(() => {
      dblClickTimeout.count = 0;
      if (singleClickCallback) {
        singleClickCallback.call();
      }
    }, delay);
  } else if (dblClickTimeout.count === 2) {
    clearTimeout(dblClickTimeout.id);
    dblClickTimeout.count = 0;
    dblClickCallback.call();
  }
}

export function hasValue (value) {
  const hasNoValue = value === null || typeof value === 'undefined' || (typeof value === 'string' && value.trim() === '');
  return !hasNoValue;
}

export function isOutsideClick (e, dom, extraHeight = 0) {
  if (dom === null) {
    return true;
  }
  const componentOffset = dom.getBoundingClientRect();
  /*
   console.log(
   '1º', e.clientX < componentOffset.left,
   '2º', e.clientX > componentOffset.left + componentOffset.width,
   '3º', e.clientY < componentOffset.top,
   '4º', e.clientY > componentOffset.top + componentOffset.height + extraHeight,
   e.clientY, componentOffset.top, componentOffset.height
   );
   */
  return (e.clientX < componentOffset.left
    || e.clientX > componentOffset.left + componentOffset.width
    || e.clientY < componentOffset.top
    || e.clientY > componentOffset.top + componentOffset.height + extraHeight);
}

export function isValidImageMimeType (mimeType) {
  return mimeType === 'image/jpeg' || mimeType === 'image/jpg' || mimeType === 'image/png';
}

export function isValidPdfMimeType (mimeType) {
  return mimeType === 'application/pdf';
}

export function jsonParse (value) {
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  return value;
}

/**
 * Quando um elemento está por cima de outro, o de cima com um clique e o debaixo tem um duplo clique
 * Ao clicar no de cima não se quer que o debaixo seja acionado no segundo clique
 */
export function preventDblClick (e, delay = 400) {
  // Quando um elemento está por cima de outro, o de cima com um clique e o debaixo tem um duplo clique
  // Ao clicar no de cima não se quer que o debaixo seja acionado no segundo clique
  const targetStyle = e.currentTarget.style;
  targetStyle.pointerEvents = 'none';
  setTimeout(() => {
    targetStyle.pointerEvents = 'auto';
  }, delay);
}

export function queryStringParse (locationSearch) {
  const search = locationSearch.substr(1);
  const json = '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}';
  return jsonParse(json) || {};
}

export function queryStringStringify (obj) {
  const objectKeys = Object.keys(obj);
  if (objectKeys.length === 0) return '';
  // o location.search adicona "?" automaticamente, mas se usarmos em outro lugar tem que lembrar de por
  // Então é melhor deixar aqui por padrão já que o location.search não duplica, caso exista
  return '?' + objectKeys.reduce((accumulator, k) => {
    let resolvedValue = '';
    const value = obj[k];
    if (hasValue(value)) {
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          resolvedValue = '[' + value + ']';
        } else {
          resolvedValue = JSON.stringify(value).replace(findAllRegExp('"'), '');
        }
      } else {
        resolvedValue = encodeURIComponent(value);
      }
    }
    accumulator.push(k + '=' + resolvedValue);
    return accumulator;
  }, []).join('&');
}

export function stripNonNumber (value) {
  let resolvedValue;
  if (typeof value === 'number') {
    resolvedValue = isTypeOfSafeNumber(value)
      ? value.toString()
      : value.toLocaleString('fullwide', {useGrouping: false});
  } else if (typeof value === 'string') {
    resolvedValue = value;
  }
  return resolvedValue ? resolvedValue.replace(/\D/g, '') : '';
}

export function stripTags (value) {
  if (typeof value === 'string') {
    return value.replace(/(<([^>]+)>)/ig, '')
      .replace(findAllRegExp('&nbsp;'), ' ')
      .replace(findAllRegExp('  '), ' ');
  }
  return value;
}

export function strToNumeric (value) {
  // pt_br
  if (typeof value === 'string') {
    return value.replace(findAllRegExp('.'), '').replace(',', '.');
  }
  return value;
}

export function uniqueId (length = 16) {
  return Math.random().toString(20).substr(2, length);
}
