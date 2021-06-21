import {useReducer} from 'react';
import {ACTIONS} from './actions';
import produce from 'immer';
import {immerInitialState, immerProduceState} from '../immerHelper';

const initialState = {
  ...immerInitialState,
  attr: {}, // valores de cada atributo
  awarnessErrors: {},
  serverErrors: {},
};

export default function useFormContextReducer () {
  return useReducer(reducer, initialState);
}

function setFormigoAttrValue (state, attribute, value) {
  return produce(state, (draft) => {
    draft.setIn(['attr'].concat(attribute), value);
  });
}

function inputSetServerErrors (state, errors, modelName) {
  return immerProduceState(state, (proxyState) => {
    Object.keys(errors).forEach((itemKey) => {
      const itemKeyParts = itemKey.split('.');
      switch (itemKeyParts[0]) {
        case 'awarness': {
          // Alertas em atributos multidimensionais: awarness.ModelName.name_level1.0.attribute_name
          const attributeKey = itemKey.replace('awarness.', '');
          proxyState.setIn(['awarnessErrors', attributeKey], errors[itemKey]);
          break;
        }
        case 'custom': {
          // Erros em atributos multidimensionais: custom.ModelName.name_level1.0.attribute_name
          const attributeKey = itemKey.replace('custom.', '');
          proxyState.setIn(['serverErrors', attributeKey], errors[itemKey]);
          break;
        }
        default: {
          const attributeKey = modelName + '.' + itemKey;
          proxyState.setIn(['serverErrors', attributeKey], errors[itemKey]);
        }
      }
    });
  });
}

function reducer (state, action) {
  switch (action.type) {
    case ACTIONS.SET_FORMIGO_ATTR_VALUE:
      return setFormigoAttrValue(state, action.payload.attribute, action.payload.value);
    case ACTIONS.FORMIGO_INPUT_SET_SERVER_ERRORS:
      return inputSetServerErrors(state, action.payload.attribute, action.payload.value);
    default:
      return state;
  }
}
