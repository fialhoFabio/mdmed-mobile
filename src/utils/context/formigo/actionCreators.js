import {ACTIONS} from './actions';

export function formigoSetAttrValue (attribute, value) {
  return {
    payload: {attribute, value},
    type: ACTIONS.SET_FORMIGO_ATTR_VALUE,
  };
}

export function formigoSetAttrErrors (attribute, value) {
  return {
    payload: {attribute, value},
    type: ACTIONS.SET_FORMIGO_ATTR_ERRORS,
  };
}

export function formigoInputSetServerErrors (errors, modelName) {
  return {
    errors,
    modelName,
    type: 'FORMIGO_INPUT_SET_SERVER_ERRORS',
  };
}
