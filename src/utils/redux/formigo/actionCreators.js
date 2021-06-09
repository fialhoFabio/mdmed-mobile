export function formigoInjectState (moreState) {
  return {
    moreState,
    type: 'FORMIGO_INJECT_STATE',
  };
}

export function formigoInputMask (attribute, mask) {
  return {
    attribute,
    mask,
    type: 'FORMIGO_INPUT_MASK',
  };
}

export function formigoInputPrepare (attribute, initValue, mask) {
  return {
    attribute,
    initValue,
    mask,
    type: 'FORMIGO_INPUT_PREPARE',
  };
}

/**
 * Validators
 */

export function formigoInputAddValidator (attribute, itemValue) {
  return {
    attribute,
    itemValue,
    type: 'FORMIGO_INPUT_ADD_VALIDATOR',
  };
}

export function formigoInputResetErrors (attribute) {
  return {
    attribute,
    type: 'FORMIGO_INPUT_RESET_ERRORS',
  };
}

export function formigoInputResetValidators (attribute) {
  return {
    attribute,
    type: 'FORMIGO_INPUT_RESET_VALIDATORS',
  };
}

export function formigoInputSetServerErrors (errors, modelName) {
  return {
    errors,
    modelName,
    type: 'FORMIGO_INPUT_SET_SERVER_ERRORS',
  };
}

export function formigoInputValidate (attribute) {
  return {
    attribute,
    type: 'FORMIGO_INPUT_VALIDATE',
  };
}

export function formigoManualAddValidator (attribute, flag, validator) {
  return {
    attribute,
    flag,
    type: 'FORMIGO_MANUAL_ADD_VALIDATOR',
    validator,
  };
}

export function formigoManualResetValidators (attribute) {
  return {
    attribute,
    type: 'FORMIGO_MANUAL_RESET_VALIDATORS',
  };
}

export function formigoManualValidate (attribute, flag, value, resolve) {
  return {
    attribute,
    flag,
    resolve,
    type: 'FORMIGO_MANUAL_VALIDATE',
    value,
  };
}

export function formigoSubmitValidate (submitId) {
  return {
    submitId,
    type: 'FORMIGO_SUBMIT_VALIDATE',
  };
}

/**
 * Setters
 */

export function formigoAddArrayItemAtEnd (keyPath, itemValue, p) {
  return {
    itemValue,
    keyPath,
    preventHasChanged: p && p.preventHasChanged,
    type: 'FORMIGO_ADD_ARRAY_ITEM_AT_END',
  };
}

export function formigoMergeObject (keyPath, mergeableData, p) {
  return {
    keyPath,
    mergeableData,
    preventHasChanged: p && p.preventHasChanged,
    type: 'FORMIGO_MERGE_OBJECT',
  };
}

export function formigoProduceState (callback, p) {
  return {
    callback,
    preventHasChanged: p && p.preventHasChanged,
    type: 'FORMIGO_PRODUCE_STATE',
  };
}

export function formigoRemoveArrayItem (keyPath, index, p) {
  return {
    index,
    keyPath,
    preventHasChanged: p && p.preventHasChanged,
    type: 'FORMIGO_REMOVE_ARRAY_ITEM',
  };
}

export function formigoSetAuxValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'FORMIGO_SET_AUX_VALUE',
  };
}

export function formigoSetValue (keyPath, newValue, p) {
  return {
    keyPath,
    newValue,
    preventHasChanged: p && p.preventHasChanged,
    type: 'FORMIGO_SET_VALUE',
  };
}

/**
 *
 */

/**
 * @param {Array.<String>} attribute
 * @param {*} itemValue
 * @param {{preventHasChanged: Boolean}} p
 * @returns {*}
 */
export function formigoAttrAddArrayItem (attribute, itemValue, p = undefined) {
  return formigoAddArrayItemAtEnd(['attr'].concat(attribute), itemValue, p);
}

/**
 * @param {Array.<String>} attribute
 * @param {Number} index
 * @param {{preventHasChanged: Boolean}} p
 * @returns {*}
 */
export function formigoAttrRemoveArrayItem (attribute, index, p = undefined) {
  return formigoRemoveArrayItem(['attr'].concat(attribute), index, p);
}

/**
 * @param {Array.<String>} attribute
 * @param {Object} mergeableData
 * @param {{preventHasChanged: Boolean}} p
 * @returns {*}
 */
export function formigoAttrMergeObject (attribute, mergeableData, p = undefined) {
  return formigoMergeObject(['attr'].concat(attribute), mergeableData, p);
}

/**
 * @param {Array.<String>} attribute
 * @param {*} newValue
 * @param {{preventHasChanged: Boolean}} p
 * @returns {*}
 */
export function formigoAttrSetValue (attribute, newValue, p = undefined) {
  return formigoSetValue(['attr'].concat(attribute), newValue, p);
}

/**
 *
 */

export function formigoHandFillSetValue (attribute, newValue) {
  const attributeKey = attribute.join('.');
  return formigoSetAuxValue(['handFill', attributeKey], newValue);
}

export function formigoLoadingSetValue (attribute, newValue) {
  const attributeKey = attribute.join('.');
  return formigoSetAuxValue(['loading', attributeKey], newValue);
}
