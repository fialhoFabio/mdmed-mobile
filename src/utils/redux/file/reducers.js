import {
  immerAddArrayItemAtBeginning,
  immerInitialState,
  immerMergeObject,
  immerProduceState,
  immerSetValue,
  immerRemoveArrayItem,
  immerRemoveObjectItem,
} from '../immerHelper';

const initialState = {
  ...immerInitialState,
  progressRows: null,
  rows: null,
  storageUsageQuantity: null,
};

/**
 */

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'FILE_ADD_ARRAY_ITEM_AT_BEGINNING':
      return immerAddArrayItemAtBeginning(state, action.keyPath, action.itemValue);
    case 'FILE_MERGE_OBJECT':
      return immerMergeObject(state, action.keyPath, action.mergeableData);
    case 'FILE_PRODUCE_STATE':
      return immerProduceState(state, action.callback);
    case 'FILE_REMOVE_ARRAY_ITEM':
      return immerRemoveArrayItem(state, action.keyPath, action.index);
    case 'FILE_REMOVE_OBJECT_ITEM':
      return immerRemoveObjectItem(state, action.keyPath, action.itemKey);
    case 'FILE_SET_VALUE':
      return immerSetValue(state, action.keyPath, action.newValue);
    default:
  }
  return state;
}
