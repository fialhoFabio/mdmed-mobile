export function chatAddObjectItem (keyPath, itemKey, itemValue) {
  return {
    itemKey,
    itemValue,
    keyPath,
    type: 'CHAT_ADD_OBJECT_ITEM',
  };
}

export function chatMergeArray (keyPath, moreRows) {
  return {
    keyPath,
    moreRows,
    type: 'CHAT_MERGE_ARRAY',
  };
}

export function chatSetValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'CHAT_SET_VALUE',
  };
}
