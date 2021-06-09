import {formatDate, formatDateHour} from '../../luxon';
import {
  formatCnpj,
  formatCpf,
  formatCurrency,
  formatFloat,
  formatPhoneNumber,
  formatZipCode,
  MASK_CNPJ,
  MASK_CPF,
  MASK_CURRENCY,
  MASK_DATE,
  MASK_DATE_HOUR,
  MASK_HOUR,
  MASK_FLOAT,
  MASK_PHONE_NUMBER,
  MASK_ZIP_CODE,
} from '../../masks';
import {
  isValidCnpj,
  isValidCpf,
  isValidCurrency,
  isValidDate,
  isValidDateHour,
  isValidHour,
  isValidPhoneNumber,
  isValidZipCode,
} from '../../validators';

/**
 * Formata valor digitado no campo, pode conter erros e deve ser validado
 *
 * @param {String} mask
 * @param {String} value
 *
 * @returns {String}
 */
export function formatEnteredValue (mask, value) {
  if (!value) return value;
  switch (mask) {
    case MASK_CNPJ:
      return isValidCnpj(value) ? formatCnpj(value) : null;
    case MASK_CPF:
      return isValidCpf(value) ? formatCpf(value) : null;
    case MASK_CURRENCY:
      return isValidCurrency(value) ? formatCurrency(value) : null;
    case MASK_DATE: {
      const formattedLength = 12; // Quantidade de caracteres do campo quando formatado
      return isValidDate(value) && value.length !== formattedLength ? formatDate(value) : null;
    }
    case MASK_DATE_HOUR: {
      const formattedLength = 16; // Quantidade de caracteres do campo quando formatado
      return isValidDateHour(value) && value.length !== formattedLength ? formatDateHour(value) : null;
    }
    case MASK_HOUR: {
      if (isValidHour(value, 'allowInt')) {
        if (value >= 0 && value <= 9) {
          return '0' + parseInt(value) + ':00';
        } else if (value >= 10 && value <= 23) {
          return value + ':00';
        }
      }
      return null;
    }
    case MASK_PHONE_NUMBER:
      // pt_br
      return isValidPhoneNumber(value) ? formatPhoneNumber(value) : null;
    case MASK_ZIP_CODE:
      // pt_br
      return isValidZipCode(value) ? formatZipCode(value) : null;
    default:
      return value;
  }
}

/**
 * Formata valor inicial, espera-se o valor correto, geralmente do banco de dados
 *
 * @param {String} mask
 * @param {String} value
 *
 * @returns {String}
 */
export function formatValue (mask, value) {
  if (!value) return value;
  switch (mask) {
    case MASK_CNPJ:
      return formatCnpj(value);
    case MASK_CPF:
      return formatCpf(value);
    case MASK_CURRENCY:
      return formatCurrency(value);
    case MASK_FLOAT:
      return formatFloat(value);
    case MASK_DATE:
      return formatDate(value);
    case MASK_DATE_HOUR:
      return formatDateHour(value);
    case MASK_PHONE_NUMBER:
      // pt_br
      return formatPhoneNumber(value);
    case MASK_ZIP_CODE:
      // pt_br
      return formatZipCode(value);
    default:
      return value;
  }
}

/**
 * Obtém o caminho de um objeto aninhado em dotted notation
 * {eu: {nao: {sei: 'o que to fazendo'}}} > eu.nao.sei
 * Era usado pra obter os custom errors, mas agora eles já vem dotted notation do servidor
 */
export function nestedObjectKeyify (objectValue, accumulator = []) {
  if (!Array.isArray(objectValue) && Object(objectValue) === objectValue) {
    return Object.entries(objectValue).flatMap(([itemKey, itemValue]) => {
      return nestedObjectKeyify(itemValue, [...accumulator, itemKey]);
    });
  }
  return accumulator.join('.');
}
