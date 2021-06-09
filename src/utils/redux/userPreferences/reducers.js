import {
  immerInitialState,
  immerInjectState,
  immerMergeObject,
  immerSetValue,
} from '../immerHelper';

const initialState = {
  ...immerInitialState,
};

/**
 */

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'USER_PREFERENCES_INJECT_STATE':
      return immerInjectState(state, action.moreState);
    case 'USER_PREFERENCES_MERGE_OBJECT':
      return immerMergeObject(state, action.keyPath, action.mergeableData);
    case 'USER_PREFERENCES_SET_VALUE':
      return immerSetValue(state, action.keyPath, action.newValue);
    default:
  }
  return state;
}
