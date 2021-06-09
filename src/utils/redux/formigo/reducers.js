import immerProduce from 'immer';
import lodashGet from 'lodash.get';
import lodashSet from 'lodash.set';
import {arrayRemoveDuplicates, hasValue} from '../../helper';
import {
  immerAddArrayItemAtEnd,
  immerInitialState,
  immerInjectState,
  immerProduceState,
  immerSetValue,
} from '../immerHelper';
import {formatEnteredValue, formatValue} from './helper';

const initialStateFn = {
  getAttrValue (attribute) {
    return lodashGet(this, ['attr'].concat(attribute));
  },
  setAttrValue (attribute, value) {
    return lodashSet(this, ['attr'].concat(attribute), value);
  },
  setDraftJsEditorState (attribute, editorState) {
    const attributeKey = attribute.join('.');
    return lodashSet(this, ['draftJsEditorState', attributeKey], editorState);
  },
  setReadyValue (attribute, value) {
    const attributeKey = attribute.join('.');
    return lodashSet(this, ['ready', attributeKey], value);
  },
};

const initialState = {
  ...immerInitialState,
  ...initialStateFn,
  attr: {}, // valores de cada atributo
  awarnessErrors: {},
  backFormId: null,
  draftJsState: null,
  frontFormHasChanged: {}, // Formulários que foram modificados pelo usuário. Usa no <Link/> para acionar o <PreventToModal/>
  frontFormId: null,
  handFill: {}, // para determininar que algo foi preenchido automáticamente (resultado de endereço)
  inputErrors: {},
  loading: {}, // para determininar que algo está sendo processado no campo (suggests e busca de endereço)
  manualValidators: {}, // Validações com parametros flag (pick, add, remove) e value
  names: {},
  ready: {}, // para determinar que o campo está pronto pra carregar (após setagem de initValue e mask)
  serverErrors: {},
  submitErrors: {},
  submitErrorsId: null,
  validators: {}, // Validações convencionais, blur, submit
};

function inputAddValidator (state, attribute, itemValue) {
  const attributeKey = attribute.join('.');
  const keyPath = ['validators', attributeKey];
  return immerAddArrayItemAtEnd(state, keyPath, itemValue);
}

function inputMask (state, attribute, mask) {
  return immerProduceState(state, (proxyState) => {
    const attrValue = proxyState.getAttrValue(attribute);
    if (attrValue) {
      const maskedValue = formatEnteredValue(mask, attrValue);
      if (maskedValue) {
        proxyState.setAttrValue(attribute, maskedValue);
      }
    }
  });
}

function inputPrepare (state, attribute, initValue, mask) {
  return immerProduceState(state, (proxyState) => {
    const currentValue = proxyState.getAttrValue(attribute);
    if (mask) {
      const resolvedValue = currentValue || initValue;
      if (resolvedValue) {
        proxyState.setAttrValue(attribute, formatValue(mask, resolvedValue));
      }
    } else if (!hasValue(currentValue) && hasValue(initValue)) {
      proxyState.setAttrValue(attribute, initValue);
    }
    proxyState.setReadyValue(attribute, true);
  });
}

function inputResetErrors (state, attribute) {
  const attributeKey = attribute.join('.');
  return immerProduceState(state, (proxyState) => {
    delete proxyState.awarnessErrors[attributeKey];
    delete proxyState.inputErrors[attributeKey];
    delete proxyState.serverErrors[attributeKey];
    delete proxyState.submitErrors[attributeKey]; // Apaga pra facilitar a contagem no FormValidatorsMessage
  });
}

function inputResetValidators (state, attribute) {
  const attributeKey = attribute.join('.');
  return immerProduceState(state, (proxyState) => {
    delete proxyState.validators[attributeKey];
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

function inputValidate (state, attribute) {
  const attributeKey = attribute.join('.');
  const inputValidators = state.validators[attributeKey];
  if (!inputValidators) return state;
  const getAttrValue = (keyPath) => state.getAttrValue(keyPath);
  return immerProduceState(state, (proxyState) => {
    const errorMessages = [];
    inputValidators.forEach((validatorData) => {
      const errorMessage = validatorData.run(getAttrValue);
      if (errorMessage) errorMessages.push(errorMessage);
    });
    if (errorMessages.length > 0) {
      proxyState.setIn(['inputErrors', attributeKey], errorMessages);
    }
  });
}

function manualAddValidator (state, attribute, flag, validator) {
  const attributeKey = attribute.join('.');
  const keyPath = ['manualValidators', attributeKey, flag];
  return immerSetValue(state, keyPath, validator);
}

function manualResetValidators (state, attribute) {
  const attributeKey = attribute.join('.');
  return immerProduceState(state, (proxyState) => {
    delete proxyState.manualValidators[attributeKey];
  });
}

function manualValidate (state, attribute, flag, value, resolve) {
  const attributeKey = attribute.join('.');
  const manualValidator = state.manualValidators[attributeKey][flag];
  if (!manualValidator) return state;
  const getAttrValue = (keyPath) => state.getAttrValue(keyPath);
  const errorMessage = manualValidator(getAttrValue, value);
  resolve(errorMessage);
  return state;
}

function submitValidate (state, submitId) {
  const getAttrValue = (keyPath) => state.getAttrValue(keyPath);
  return immerProduceState(state, (proxyState) => {
    // Limpar sempre a porra toda pra evitar efeitos colaterais
    // Para quando tem mais de um formulários na tela (baixa múltipla, modais que abrem por cima de outro form)
    // Por exemplo: se não resetar, e houver um erro no form de baixo, o modal vai considerar o erro e não vai permitir o envio
    // proxyState.setIn(['awarnessErrors'], {}); Não reseta no submit, porque o check de ciência precisa estar na tela pro servidor entender que pode passar sem validar
    proxyState.setIn(['inputErrors'], {});
    proxyState.setIn(['serverErrors'], {});
    proxyState.setIn(['submitErrors'], {});
    // Usa no FormValidatorsMessage, pra apresentar os erros apenas no form que está sendo enviado
    proxyState.setIn(['submitErrorsId'], submitId);
    Object.keys(state.validators).forEach((attributeKey) => {
      const inputValidators = state.validators[attributeKey];
      if (inputValidators) {
        const errorMessages = [];
        inputValidators.forEach((validatorData) => {
          if (validatorData.submitId === submitId) {
            const errorMessage = validatorData.run(getAttrValue);
            if (errorMessage) errorMessages.push(errorMessage);
          }
        });
        if (errorMessages.length > 0) {
          // submitErrors só é alimentado ao clicar no botão submit
          // Não usa o inputErrors pro SubmitDecorator não ser "incomodado" antes de apertar o submit
          proxyState.setIn(['submitErrors', attributeKey], errorMessages);
          // Também adiciona o inputErrors pra indicar os erros os campos
          proxyState.setIn(['inputErrors', attributeKey], errorMessages);
        }
      }
    });
  });
}

/**
 */

function formigoAddArrayItemAtEnd (state, keyPath, itemValue, preventHasChanged) {
  return immerProduce(state, (proxyState) => {
    const newItems = proxyState.getIn(keyPath) || [];
    newItems.push(itemValue);
    proxyState.setIn(keyPath, arrayRemoveDuplicates(newItems));
    if (!preventHasChanged && proxyState.frontFormId) {
      // console.log('formigoAddArrayItemAtEnd', proxyState.frontFormId, keyPath);
      proxyState.frontFormHasChanged[proxyState.frontFormId] = true;
    }
  });
}

function formigoMergeObject (state, keyPath, mergeableData, preventHasChanged) {
  return immerProduce(state, (proxyState) => {
    if (keyPath.length === 0) {
      Object.assign(proxyState, mergeableData);
    } else {
      const currentData = proxyState.getIn(keyPath); // Não precisa do || {} quando é objeto se resolve sozinho
      proxyState.setIn(keyPath, {...currentData, ...mergeableData});
    }
    if (!preventHasChanged && proxyState.frontFormId) {
      // console.log('formigoMergeObject', proxyState.frontFormId, keyPath);
      proxyState.frontFormHasChanged[proxyState.frontFormId] = true;
    }
  });
}

function formigoProduceState (state, cb, preventHasChanged) {
  return immerProduce(state, (proxyState) => {
    cb(proxyState);
    if (!preventHasChanged && proxyState.frontFormId) {
      // console.log('formigoProduceState', proxyState.frontFormId);
      proxyState.frontFormHasChanged[proxyState.frontFormId] = true;
    }
  });
}

function formigoRemoveArrayItem (state, keyPath, index, preventHasChanged) {
  return immerProduce(state, (proxyState) => {
    proxyState.getIn(keyPath).splice(index, 1);
    if (!preventHasChanged && proxyState.frontFormId) {
      // console.log('formigoRemoveArrayItem', proxyState.frontFormId, keyPath);
      proxyState.frontFormHasChanged[proxyState.frontFormId] = true;
    }
  });
}

function formigoSetValue (state, keyPath, value, preventHasChanged) {
  return immerProduce(state, (proxyState) => {
    proxyState.setIn(keyPath, value);
    if (!preventHasChanged && proxyState.frontFormId) {
      // console.log('formigoSetValue', preventHasChanged, proxyState.frontFormId, keyPath, value);
      proxyState.frontFormHasChanged[proxyState.frontFormId] = true;
    }
  });
}

function formigoSetAuxValue (state, keyPath, value) {
  return immerProduce(state, (proxyState) => {
    proxyState.setIn(keyPath, value);
  });
}

/**
  */

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'FORMIGO_INJECT_STATE':
      return immerInjectState(state, action.moreState);
    case 'FORMIGO_INPUT_MASK':
      return inputMask(state, action.attribute, action.mask);
    case 'FORMIGO_INPUT_PREPARE':
      return inputPrepare(state, action.attribute, action.initValue, action.mask);
    // Validators
    case 'FORMIGO_INPUT_ADD_VALIDATOR':
      return inputAddValidator(state, action.attribute, action.itemValue);
    case 'FORMIGO_INPUT_RESET_ERRORS':
      return inputResetErrors(state, action.attribute);
    case 'FORMIGO_INPUT_RESET_VALIDATORS':
      return inputResetValidators(state, action.attribute);
    case 'FORMIGO_INPUT_SET_SERVER_ERRORS':
      return inputSetServerErrors(state, action.errors, action.modelName);
    case 'FORMIGO_INPUT_VALIDATE':
      return inputValidate(state, action.attribute);
    case 'FORMIGO_MANUAL_ADD_VALIDATOR':
      return manualAddValidator(state, action.attribute, action.flag, action.validator);
    case 'FORMIGO_MANUAL_RESET_VALIDATORS':
      return manualResetValidators(state, action.attribute);
    case 'FORMIGO_MANUAL_VALIDATE':
      return manualValidate(state, action.attribute, action.flag, action.value, action.resolve);
    case 'FORMIGO_SUBMIT_VALIDATE':
      return submitValidate(state, action.submitId);
    // Seters
    case 'FORMIGO_ADD_ARRAY_ITEM_AT_END':
      return formigoAddArrayItemAtEnd(state, action.keyPath, action.itemValue, action.preventHasChanged);
    case 'FORMIGO_MERGE_OBJECT':
      return formigoMergeObject(state, action.keyPath, action.mergeableData, action.preventHasChanged);
    case 'FORMIGO_PRODUCE_STATE':
      return formigoProduceState(state, action.callback, action.preventHasChanged);
    case 'FORMIGO_REMOVE_ARRAY_ITEM':
      return formigoRemoveArrayItem(state, action.keyPath, action.index, action.preventHasChanged);
    case 'FORMIGO_SET_AUX_VALUE':
      return formigoSetAuxValue(state, action.keyPath, action.newValue);
    case 'FORMIGO_SET_VALUE':
      return formigoSetValue(state, action.keyPath, action.newValue, action.preventHasChanged);
    default:
  }
  return state;
}
