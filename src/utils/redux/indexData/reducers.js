import {
  immerAddArrayItemAtBeginning,
  immerInitialState,
  immerInjectState,
  immerMergeArray,
  immerRemoveArrayItem,
  immerSetValue,
} from '../immerHelper';

const initialState = {
  ...immerInitialState,
  filterHash: null,
  isLoading: false,
  outerIndex: {},
  pageNumber: 0,
};

/**
 */

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'INDEX_DATA_ADD_ARRAY_ITEM_AT_BEGINNING':
      return immerAddArrayItemAtBeginning(state, action.keyPath, action.itemValue);
    case 'INDEX_DATA_INJECT_STATE':
      return immerInjectState(state, action.moreState);
    case 'INDEX_DATA_MERGE_ARRAY':
      return immerMergeArray(state, action.keyPath, action.moreRows);
    case 'INDEX_DATA_REMOVE_ARRAY_ITEM':
      return immerRemoveArrayItem(state, action.keyPath, action.index);
    case 'INDEX_DATA_SET_VALUE':
      return immerSetValue(state, action.keyPath, action.newValue);
    default:
  }
  return state;
}
