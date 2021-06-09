// import YiiTranslate from 'yiit/translate';

import {
  isSafeInteger,
  isValidCnpj,
  isValidCpf,
  isValidCurrency,
  isValidDate,
  isValidDateHour,
  isValidEmail,
  isValidFloat,
  isValidHour,
  isValidPhoneNumber,
  isValidZipCode,
} from '../../../utils/validators';
import {hasValue, stripTags} from '../../../utils/helper';

function resolveDateHourError (value) {
  const dateHourParts = value.split(' ');
  if (!isValidDate(dateHourParts[0])) {
    return ''; // YiiTranslate.flag('feedbackFormValidatorDateInvalid')
  } else if (!dateHourParts[1]) {
    return ''; // YiiTranslate.flag('feedbackFormValidatorDateHourIncomplete')
  } else if (!isValidHour(dateHourParts[1])) {
    return ''; // YiiTranslate.flag('feedbackFormValidatorHourInvalid')
  } else {
    return ''; // YiiTranslate.flag('feedbackUnknownError')
  }
}

export function comboBoxSelectedOnlyValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute, dataListItemDescriptionAttribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    const attrValueDescription = getAttrValue(dataListItemDescriptionAttribute);
    return attrValueDescription && !hasValue(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorSelectedOnly')
  };
}

export function cnpjValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidCnpj(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorCnpjInvalid')
  };
}

export function cpfValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidCpf(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorCpfInvalid')
  };
}

export function currencyValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidCurrency(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorCurrencyInvalid')
  };
}

export function dateValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidDate(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorDateInvalid')
  };
}

export function dateHourValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidDateHour(attrValue) ? resolveDateHourError(attrValue) : null;
  };
}

export function emailValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidEmail(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorEmailInvalid')
  };
}

export function floatValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidFloat(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorFloatInvalid')
  };
}

export function hourValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidHour(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorHourInvalid')
  };
}

export function integerValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isSafeInteger(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorIntegerInvalid')
  };
}

export function passwordRepeatValidator (callerProps) {
  return (getAttrValue) => {
    const {newAttribute, repeatAttribute} = callerProps;
    const newPassword = getAttrValue(newAttribute);
    const repeatPassword = getAttrValue(repeatAttribute);
    if (newPassword && repeatPassword && newPassword !== repeatPassword) {
      return ''; // YiiTranslate.flag('feedbackFormValidatorRepeatPasswordError')
    }
    return null;
  };
}

export function phoneValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidPhoneNumber(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorPhoneInvalid')
  };
}

export function zipCodeValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue && !isValidZipCode(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorZipCodeInvalid')
  };
}

/**
 * Draft.js
 */

export function draftJsMaxLengthValidator (callerProps) {
  return (getAttrValue) => {
    const {htmlAttribute, maxLength} = callerProps;
    const htmlValue = getAttrValue(htmlAttribute);
    const textPlainValue = stripTags(htmlValue);
    const textPlainLength = textPlainValue ? textPlainValue.trim().length : 0;
    console.log('textPlainValue', textPlainValue);
    return textPlainLength > maxLength
      ? '' // YiiTranslate.flag('feedbackFormValidatorMaxLengthDraftJsError') + ': ' + textPlainLength + '/' + maxLength
      : null;
  };
}

/**
 * MIN/MAX
 */

export function maxSizeValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute, maxSize} = callerProps;
    const attrValue = getAttrValue(attribute);
    const size = attrValue ? (Array.isArray(attrValue) ? attrValue : Object.keys(attrValue)).length : 0;
    return size > maxSize ? '' : null; // YiiTranslate.flag('feedbackFormValidatorMaxSizeSelectionError') + ': ' + maxSize
  };
}

export function minSizeValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute, minSize} = callerProps;
    const attrValue = getAttrValue(attribute);
    const size = attrValue ? (Array.isArray(attrValue) ? attrValue : Object.keys(attrValue)).length : 0;
    return size < minSize ? '' : null; // YiiTranslate.flag('feedbackFormValidatorMinSizeSelectionError') + ': ' + minSize
  };
}

/**
 * REQUIRED
 */

export function checkRequiredValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute, checkValue} = callerProps;
    const attrValue = getAttrValue(attribute);
    return attrValue != checkValue ? '' : null; // YiiTranslate.flag('feedbackFormValidatorRequired')
  };
}

export function descriptionRequiredValidator (callerProps) {
  return (getAttrValue) => {
    const {dataListItemDescriptionAttribute} = callerProps;
    const attrValue = getAttrValue(dataListItemDescriptionAttribute);
    return !hasValue(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorRequired')
  };
}

export function minSizeOneRequiredValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    const size = attrValue ? attrValue.length : 0;
    return size === 0 ? '' : null; // YiiTranslate.flag('feedbackFormValidatorRequired')
  };
}

export function requiredValidator (callerProps) {
  return (getAttrValue) => {
    const {attribute} = callerProps;
    const attrValue = getAttrValue(attribute);
    return !hasValue(attrValue) ? '' : null; // YiiTranslate.flag('feedbackFormValidatorRequired')
  };
}
