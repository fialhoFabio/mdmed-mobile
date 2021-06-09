import {stripNonNumber, strToNumeric} from './helper';
import {isCommandKey} from './keyMap';
import {
  isSafeInteger,
  isSafeNumeric,
  isValidPhoneNumber,
  isValidZipCode,
} from './validators';

export const MASK_CNPJ = 'cnpj';
export const MASK_CPF = 'cpf';
export const MASK_CURRENCY = 'currency';
export const MASK_DATE = 'date';
export const MASK_DATE_HOUR = 'dateHour';
export const MASK_FLOAT = 'float';
export const MASK_HOUR = 'hour';
export const MASK_INTEGER = 'integer';
export const MASK_NEGATIVE_FLOAT = 'negativeFloat';
export const MASK_NEGATIVE_INTEGER = 'negativeInteger';
export const MASK_PHONE_NUMBER = 'phoneNumber';
export const MASK_ZIP_CODE = 'zipCode';

export function formatCnpj (value) {
  if (isSafeNumeric(value)) {
    const resolvedValue = value.toString();
    if (resolvedValue.length <= 14 && resolvedValue.length > 3) {
      const zeroFillValue = ('00000000000000' + resolvedValue).slice(-14);
      return zeroFillValue.substr(0, 2)
        + '.' + zeroFillValue.substr(2, 3)
        + '.' + zeroFillValue.substr(5, 3)
        + '/' + zeroFillValue.substr(8, 4)
        + '-' + zeroFillValue.substr(12, 2);
    }
    return value;
  }
  if (typeof value === 'object') return null;
  return value;
}

export function formatCpf (value) {
  if (isSafeNumeric(value)) {
    const resolvedValue = value.toString();
    if (resolvedValue.length <= 11 && resolvedValue.length > 3) {
      const zeroFillValue = ('00000000000' + resolvedValue).slice(-11);
      return zeroFillValue.substr(0, 3)
        + '.' + zeroFillValue.substr(3, 3)
        + '.' + zeroFillValue.substr(6, 3)
        + '-' + zeroFillValue.substr(9, 2);
    }
  }
  if (typeof value === 'object') return null;
  return value;
}

export function formatCurrency (value) {
  // pt_br
  if (typeof value === 'number' || typeof value === 'string') {
    if (isSafeNumeric(value)) {
      return formatNumber(value, 2, ',', '.');
    } else {
      const resolvedValue = strToNumeric(value);
      return isSafeNumeric(resolvedValue) ? formatNumber(resolvedValue, 2, ',', '.') : value;
    }
  }
  if (typeof value === 'object') return null;
  return value;
}

export function formatFileSize (bytes, decimals = null, si = true) {
  if (bytes === null) return null;
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  let newBytes = bytes;
  do {
    newBytes /= thresh;
    ++u;
  } while (Math.abs(newBytes) >= thresh && u < units.length - 1);
  const decimalsDefault = bytes > 1000000 ? 1 : 0;
  const value = decimals === null
    ? parseFloat(newBytes.toFixed(decimalsDefault)) // parseFloat denovo pra tirar o .0
    : newBytes.toFixed(decimals);
  return value + ' ' + units[u];
}

export function formatFloat (value) {
  // pt_br
  if (isSafeNumeric(value)) {
    const resolvedValue = value.toString();
    return resolvedValue.replace('.', ',');
  }
  if (typeof value === 'object') return null;
  return value;
}

export function formatInteger (value) {
  // pt_br
  if (isSafeNumeric(value)) {
    const resolvedValue = value.toString();
    return formatNumber(resolvedValue, 0, '', '.');
  }
  if (typeof value === 'object') return null;
  return value;
}

export function formatNumber (value, decimals = 2, decPoint = '.', thousandsSep = ',') {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://crestidg.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +     bugfix by: Howard Yeend
  // *     example 1: number_format(1234.5678, 2, '.', '');
  // *     returns 1: 1234.57
  if (isSafeNumeric(value)) {
    let n = value;
    const s = n < 0 ? '-' : '';
    const i = parseInt(n = Math.abs(+n || 0).toFixed(decimals)) + '';
    const j = i.length > 3 ? i.length % 3 : 0;
    return s
      + (j ? i.substr(0, j) + thousandsSep : '')
      + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep)
      + (decimals ? decPoint + Math.abs(n - i).toFixed(decimals).slice(2) : '');
  }
  if (typeof value === 'object') return null;
  return value;
}

export function formatPhoneNumber (value) {
  // pt_br
  if (isSafeInteger(value)) {
    const resolvedValue = value.toString();
    if (resolvedValue.length === 10) {
      return resolvedValue.substr(0, 2)
        + ' ' + resolvedValue.substr(2, 4)
        + '-' + resolvedValue.substr(6, 4);
    } else if (resolvedValue.length === 11) {
      return resolvedValue.substr(0, 2)
        + ' ' + resolvedValue.substr(2, 5)
        + '-' + resolvedValue.substr(7, 4);
    } else if (resolvedValue.length === 12) {
      return '+' + resolvedValue.substr(0, 2)
        + ' ' + resolvedValue.substr(2, 2)
        + ' ' + resolvedValue.substr(4, 4)
        + '-' + resolvedValue.substr(8, 4);
    } else if (resolvedValue.length === 13) {
      return '+' + resolvedValue.substr(0, 2)
        + ' ' + resolvedValue.substr(2, 2)
        + ' ' + resolvedValue.substr(4, 5)
        + '-' + resolvedValue.substr(9, 4);
    }
    return value;
  }
  if (typeof value === 'object') return null;
  return value;
}

export function formatZipCode (value) {
  // pt_br
  if (isSafeInteger(value)) {
    const resolvedValue = value.toString();
    if (resolvedValue.length <= 8 && resolvedValue.length > 3) {
      const zeroFillValue = ('00000000' + value).slice(-8);
      return zeroFillValue.substr(0, 5) + '-' + zeroFillValue.substr(5, 3);
    }
    return value;
  }
  if (typeof value === 'object') return null;
  return value;
}

export function getPasteFn (mask) {
  const pasteFn = {
    phoneNumber: (value) => {
      const cleanValue = stripNonNumber(value);
      return isValidPhoneNumber(cleanValue) ? cleanValue : null;
    },
    zipCode: (value) => {
      const cleanValue = stripNonNumber(value);
      return isValidZipCode(cleanValue) ? cleanValue : null;
    },
  };
  return pasteFn[mask];
}

export function getMaskFn (mask) {
  const masksFn = {
    cnpj: (e, value) => {
      if (isSafeNumeric(e.key) || isCommandKey(e)) {
        if (value) {
          let maskedValue = value;
          if (maskedValue.length === 2 || maskedValue.length === 6) {
            maskedValue += '.';
          } else if (maskedValue.length === 10) {
            maskedValue += '/';
          } else if (maskedValue.length === 15) {
            maskedValue += '-';
          }
          if (maskedValue != value) {
            return maskedValue;
          }
        }
      } else {
        e.preventDefault();
      }
      return value;
    },
    cpf: (e, value) => {
      if (isSafeNumeric(e.key) || isCommandKey(e)) {
        if (value) {
          let maskedValue = value;
          if (maskedValue.length === 3 || maskedValue.length === 7) {
            maskedValue += '.';
          } else if (maskedValue.length === 11) {
            maskedValue += '-';
          }
          if (maskedValue != value) {
            return maskedValue;
          }
        }
      } else {
        e.preventDefault();
      }
      return value;
    },
    currency: (e) => {
      if (!(isSafeNumeric(e.key) || isCommandKey(e) || e.key === ',' || e.key === '.')) {
        e.preventDefault();
      }
    },
    date: (e, value) => {
      if (isSafeNumeric(e.key) || isCommandKey(e)) {
        if (value) {
          let maskedValue = value;
          if (maskedValue.length === 2 || maskedValue.length === 5) {
            maskedValue += '/';
          }
          if (maskedValue != value) {
            return maskedValue;
          }
        }
      } else {
        e.preventDefault();
      }
      return value;
    },
    dateHour: (e, value) => {
      if (isSafeNumeric(e.key) || isCommandKey(e)) {
        if (value) {
          let maskedValue = value;
          if (maskedValue.length === 2 || maskedValue.length === 5) {
            maskedValue += '/';
          } else if (maskedValue.length === 10) {
            maskedValue += ' ';
          } else if (maskedValue.length === 13) {
            maskedValue += ':';
          }
          if (maskedValue != value) {
            return maskedValue;
          }
        }
      } else {
        e.preventDefault();
      }
      return value;
    },
    float: (e) => {
      if (!(isSafeNumeric(e.key) || isCommandKey(e) || e.key === ',')) {
        e.preventDefault();
      }
    },
    hour: (e, value) => {
      if (isSafeNumeric(e.key) || isCommandKey(e)) {
        if (value) {
          let maskedValue = value;
          if (maskedValue.length === 1 && maskedValue > 2) {
            maskedValue = '0' + maskedValue + ':';
          } else if (maskedValue.length === 2) {
            maskedValue += ':';
          }
          if (maskedValue != value) {
            return maskedValue;
          }
        }
      } else {
        e.preventDefault();
      }
      return value;
    },
    integer: (e) => {
      if (!(isSafeNumeric(e.key) || isCommandKey(e))) {
        e.preventDefault();
      }
    },
    negativeFloat: (e) => {
      if (!(isSafeNumeric(e.key) || isCommandKey(e) || e.key === ',' || e.key === '-')) {
        e.preventDefault();
      }
    },
    negativeInteger: (e) => {
      if (!(isSafeNumeric(e.key) || isCommandKey(e) || e.key === '-')) {
        e.preventDefault();
      }
    },
    phoneNumber: (e, value) => {
      if (isSafeNumeric(e.key) || isCommandKey(e)) {
        if (value) {
          let maskedValue = value;
          if (maskedValue.length === 2) {
            maskedValue += ' ';
          } else if (maskedValue.length === 7) {
            maskedValue += '-';
          } else if (maskedValue.length === 12) {
            const numericValue = stripNonNumber(maskedValue);
            maskedValue = numericValue.substr(0, 2) + ' ' + numericValue.substr(2, 5) + '-' + numericValue.substr(7, 4);
          }
          if (maskedValue != value) {
            return maskedValue;
          }
        }
      } else {
        e.preventDefault();
      }
      return value;
    },
    zipCode: (e, value) => {
      if (isSafeNumeric(e.key) || isCommandKey(e)) {
        if (value) {
          let maskedValue = value;
          if (maskedValue.length === 5) {
            maskedValue += '-';
          }
          if (maskedValue !== value) {
            return maskedValue;
          }
        }
      } else {
        e.preventDefault();
      }
      return value;
    },
  };
  return masksFn[mask];
}
