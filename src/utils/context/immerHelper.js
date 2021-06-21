import immerProduce from 'immer';
import lodashGet from 'lodash.get';
import lodashSet from 'lodash.set';
import {arrayRemoveDuplicates} from '../helper';

export const immerInitialState = {
  getIn (keyPath) {
    return lodashGet(this, keyPath);
  },
  setIn (keyPath, value) {
    return lodashSet(this, keyPath, value);
  },
};

export function immerInjectState (state, moreState) {
  // return Object.freeze({...state, ...moreState}); // O objeto inicial nunca muda, o freeze ajuda na performance
  return immerProduce(state, (proxyState) => {
    Object.assign(proxyState, moreState);
  });
}

export function immerProduceState (state, cb) {
  return immerProduce(state, cb);
}

export function immerSetValue (state, keyPath, value) {
  return immerProduce(state, (proxyState) => {
    proxyState.setIn(keyPath, value);
  });
}

export function immerIncrementNumber (state, keyPath) {
  return immerProduce(state, (proxyState) => {
    const currentNumber = proxyState.getIn(keyPath) || 0;
    proxyState.setIn(keyPath, currentNumber + 1);
  });
}

/**
 */

export function immerMergeArray (state, keyPath, moreRows) {
  return immerProduce(state, (proxyState) => {
    const currentRows = proxyState.getIn(keyPath) || []; // Precisa do || [] só quando é objeto se resolve sozinho
    proxyState.setIn(keyPath, [...currentRows, ...moreRows]);
  });
}

export function immerMergeObject (state, keyPath, mergeableData) {
  return immerProduce(state, (proxyState) => {
    if (keyPath.length === 0) {
      Object.assign(proxyState, mergeableData);
    } else {
      const currentData = proxyState.getIn(keyPath); // Não precisa do || {} quando é objeto se resolve sozinho
      proxyState.setIn(keyPath, {...currentData, ...mergeableData});
    }
  });
}

/**
 */
export function immerAddArrayItemAtEnd (state, keyPath, itemValue) {
  return immerProduce(state, (proxyState) => {
    const newItems = proxyState.getIn(keyPath) || [];
    newItems.push(itemValue);
    proxyState.setIn(keyPath, arrayRemoveDuplicates(newItems));
  });
}

export function immerAddArrayItemAtBeginning (state, keyPath, itemValue) {
  return immerProduce(state, (proxyState) => {
    const newItems = proxyState.getIn(keyPath) || [];
    newItems.unshift(itemValue);
    proxyState.setIn(keyPath, arrayRemoveDuplicates(newItems));
  });
}

export function immerRemoveArrayItem (state, keyPath, index) {
  return immerProduce(state, (proxyState) => {
    // delete proxyState.getIn(keyPath)[index]; // delete mantem o registro vazio :(
    proxyState.getIn(keyPath).splice(index, 1);
  });
}

/**
 */

export function immerAddObjectItem (state, keyPath, itemKey, itemValue) {
  return immerMergeObject(state, keyPath, {[itemKey]: itemValue});
}

export function immerRemoveObjectItem (state, keyPath, itemKey) {
  return immerProduce(state, (proxyState) => {
    delete proxyState.getIn(keyPath)[itemKey]; // Não acontece o mesmo bug do array, de manter registro vazio
  });
}
