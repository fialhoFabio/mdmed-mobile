import {stripNonNumber} from './helper';
import {
  MAX_VALID_YEAR,
  MIN_VALID_YEAR,
  parseDateLuxon,
  parseDateHourLuxon,
  parseHourLuxon,
  parseStringLuxon,
} from './luxon';

/**
 * @param {*} value .
 * @returns {Boolean}
 */
export function isSafeInteger (value) {
  if (isSafeNumeric(value)) {
    if (typeof value === 'string' && value.indexOf('.') !== -1) return false; // 100.00 é um integer valido, não pode
    return Number.isInteger(+value);
    // return (value % 1) === 0;
  }
  return false;
}

/**
 * @param {*} value .
 * @returns {Boolean}
 */
export function isSafeNumeric (value) {
  if (isTypeOfSafeNumber(value)) return true;
  if (typeof value === 'string') {
    // As strings no formato 0x539; 0x539; 0o2471 (02471 no php); 0b10100111001; 1337e0
    // NÃO SÃO consideradas válidas, isso casa com o comportamento do isNumeric do PHP
    // return !Number.isNaN(Number(value)); // Dessa forma as string seriam consideradas váldias
    // A expressão regular é pra validar as strings que começam com zero, ou negativo: 01314000 /^-?\d+\.?\d*$/
    const regex = /^-?\d+\.?\d*$/;
    return Number(value).toString() === value || regex.test(value);
  }
  return false;
}

export function isTypeOfSafeNumber (value) {
  if (typeof value === 'number') {
    // Previne as cagalhada do tipo 1e+24 (ultrapassa maximo) -7.7e+76 (ultrapassa mínimo)
    // Para ve-los impresso: value.toLocaleString('fullwide', {useGrouping: false})
    return value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER;
  }
  return false;
}

export function isValidCnpj (value) {
  // tira fora tudo o que não for número
  const cnpj = stripNonNumber(value);

  if (cnpj.length != 14) {
    return false;
  }

  // LINHA 10 - Elimina CNPJs invalidos conhecidos
  if (cnpj === '00000000000000'
    || cnpj === '11111111111111'
    || cnpj === '22222222222222'
    || cnpj === '33333333333333'
    || cnpj === '44444444444444'
    || cnpj === '55555555555555'
    || cnpj === '66666666666666'
    || cnpj === '77777777777777'
    || cnpj === '88888888888888'
    || cnpj === '99999999999999') {
    return false;
  }
  // Valida DVs LINHA 23 -
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substr(0, tamanho);
  const digitos = cnpj.substr(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) {
    return false;
  }
  tamanho += 1;
  numeros = cnpj.substr(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  return resultado == digitos.charAt(1);
}

export function isValidCpf (value) {
  // tira fora tudo o que não for número
  const cpf = stripNonNumber(value);
  if (cpf.length !== 11
    || cpf === '00000000000'
    || cpf === '11111111111'
    || cpf === '22222222222'
    || cpf === '33333333333'
    || cpf === '44444444444'
    || cpf === '55555555555'
    || cpf === '66666666666'
    || cpf === '77777777777'
    || cpf === '88888888888'
    || cpf === '99999999999') {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto != parseInt(cpf.charAt(9))) {
    return false;
  }
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  return resto === parseInt(cpf.charAt(10));
}

export function isValidCurrency (value) {
  if (value === false) return false;
  if (!value) return true; // sem valor TEM QUE SER CONSIDERADO VÁLIDO, não seja burro
  if (typeof value === 'number' || typeof value === 'string') {
    const regex = /^\d+(?:\.\d{3})*,\d{2}$/;
    return isSafeInteger(value) || regex.test(value);
  }
  return false;
}

export function isValidDate (value) {
  // pt_br
  if (value === 0) return false;
  if (value === false) return false;
  if (!value) return true; // sem valor TEM QUE SER CONSIDERADO VÁLIDO, não seja burro
  if (typeof value !== 'string') return false;
  const valueLuxon = parseDateLuxon(value);
  return valueLuxon.isValid && valueLuxon.year > MIN_VALID_YEAR && valueLuxon.year < MAX_VALID_YEAR;
}

export function isValidDateHour (value) {
  // pt_br
  if (value === 0) return false;
  if (value === false) return false;
  if (!value) return true; // sem valor TEM QUE SER CONSIDERADO VÁLIDO, não seja burro
  if (typeof value !== 'string') return false;
  const valueLuxon = parseDateHourLuxon(value);
  return valueLuxon.isValid && valueLuxon.year > MIN_VALID_YEAR && valueLuxon.year < MAX_VALID_YEAR;
}

export function isValidStringDateTime (value) {
  if (value === 0) return false;
  if (value === false) return false;
  if (!value) return true; // sem valor TEM QUE SER CONSIDERADO VÁLIDO, não seja burro
  if (typeof value !== 'string') return false;
  if (value.length < 10) return false; // Tem que ter ao menos o tamaho de uma data 07/09/1976 / 1976-09-07
  const valueLuxon = parseStringLuxon(value);
  return valueLuxon.isValid && valueLuxon.year > MIN_VALID_YEAR && valueLuxon.year < MAX_VALID_YEAR;
}

export function isValidEmail (value) {
  if (value === 0) return false;
  if (value === false) return false;
  if (!value) return true; // sem valor TEM QUE SER CONSIDERADO VÁLIDO, não seja burro
  if (typeof value !== 'string') return false;
  const newValue = value.trim();
  const regex = /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
  return regex.test(newValue);
}

export function isValidFloat (value) {
  // Só valida strings de inputs
  if (value === false) return false;
  if (!value) return true; // sem valor TEM QUE SER CONSIDERADO VÁLIDO, não seja burro
  if (isTypeOfSafeNumber(value)) return true;
  if (typeof value === 'string') {
    const regex = /^-?\d+,?\d*$/;
    return isSafeInteger(value) || regex.test(value);
  }
  return false;
}

export function isValidHour (value, mode = '') {
  if (value === 0) return false;
  if (value === false) return false;
  if (!value) return true; // sem valor TEM QUE SER CONSIDERADO VÁLIDO, não seja burro
  if (mode === 'allowInt' && isSafeInteger(value) && value >= 0 && value <= 23) return true; // Um número entre 0 e 23 é considerádo válido, o blur completa com :00
  if (typeof value !== 'string') return false;
  const valueLuxon = parseHourLuxon(value);
  return valueLuxon.isValid;
}

export function isValidPhoneNumber (value) {
  // pt_br
  const resolvedValue = stripNonNumber(value);
  return isSafeInteger(resolvedValue) && (resolvedValue.length === 10 || resolvedValue.length === 11);
}

export function isValidZipCode (value) {
  // pt_br
  const resolvedValue = stripNonNumber(value);
  return isSafeInteger(resolvedValue) && (resolvedValue.length === 7 || resolvedValue.length === 8); // cep pode começar com zero
}
