import {
  immerAddObjectItem,
  immerMergeArray,
  immerInitialState,
  immerSetValue,
} from '../immerHelper';

const initialState = {
  ...immerInitialState,
  contacts: [],
  messages: null, // inicia null pra identificar quando ainda não foi injetado
  name: null,
  unreadConversations: {},
};

/**
 */

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'CHAT_ADD_OBJECT_ITEM':
      return immerAddObjectItem(state, action.keyPath, action.itemKey, action.itemValue);
    case 'CHAT_MERGE_ARRAY':
      return immerMergeArray(state, action.keyPath, action.moreRows);
    case 'CHAT_SET_VALUE':
      return immerSetValue(state, action.keyPath, action.newValue);
    default:
  }
  return state;
}
