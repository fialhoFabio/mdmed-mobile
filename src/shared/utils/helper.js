import {jsonParse} from '../../utils/helper';
import {formatDbDate} from '../../utils/luxon';
import {formatZipCode} from '../../utils/masks';

export function getAddressDescription (addressData) {
  if (!addressData) return null;
  const addressParts = [];
  if (addressData.line1) {
    addressParts.push(addressData.line1 + (addressData.number ? ', ' + addressData.number : ''));
  }
  if (addressData.complement) {
    addressParts.push(addressData.complement);
  }
  if (addressData.line2) {
    addressParts.push(addressData.line2);
  }
  if (addressData.zip_code) {
    addressParts.push(formatZipCode(addressData.zip_code));
  }
  if (addressData.city_desc) {
    addressParts.push(addressData.city_desc);
  }
  return addressParts.join(' - ');
}

export function jsonTagRowsToString (jsonValue) {
  const values = jsonParse(jsonValue);
  return tagRowsToString(values);
}

export function resolveMaxHour (hourA, hourB) {
  if (hourB) {
    return parseInt(hourB) > parseInt(hourA) ? hourB : hourA;
  }
  return hourA;
}

export function resolveMinHour (hourA, hourB) {
  if (hourB) {
    return parseInt(hourB) < parseInt(hourA) ? hourB : hourA;
  }
  return hourA;
}

export function resolveApiUrl (path) {
  // Faço esse tratamento aqui por que ainda não arrumamos o servidor pra redirecionar o www.mdmed para
  // mdmed, mas mesmo depois que o servidor cuidar disso não custa nada deixar aqui também.
  const hostName = window.location.hostname.replace('www.', '');
  if (hostName.indexOf('api') === -1) {
    switch (hostName) {
      case 'homolog.mdmed.clinic':
      case 'homolog.mdmed.local':
        return '//' + hostName.replace('homolog.', 'homologapi.') + path;
      default:
        // mdmed.clinic
        // mdmed.local
        return '//api.' + hostName + path;
    }
  } else {
    return path;
  }
}

export function resolveMenuUrl (url) {
  let resolvedUrl = url;
  if (url.indexOf('/medical-records/index') !== -1 || url.indexOf('/scheduler/index') !== -1) {
    resolvedUrl += '/' + formatDbDate(Date.now());
  }
  return resolvedUrl;
}

export function tagRowsToString (values) {
  const flatValues = values.reduce((accumulator, data) => {
    return accumulator.concat(data.name);
  }, []);
  return flatValues.join(', ');
}
