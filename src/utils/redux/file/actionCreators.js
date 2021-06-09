export function fileAddArrayItemAtBeginning (keyPath, itemValue) {
  return {
    itemValue,
    keyPath,
    type: 'FILE_ADD_ARRAY_ITEM_AT_BEGINNING',
  };
}

export function fileMergeObject (keyPath, mergeableData) {
  return {
    keyPath,
    mergeableData,
    type: 'FILE_MERGE_OBJECT',
  };
}

export function fileProduceState (callback) {
  return {
    callback,
    type: 'FILE_PRODUCE_STATE',
  };
}

export function fileRemoveArrayItem (keyPath, index) {
  return {
    index,
    keyPath,
    type: 'FILE_REMOVE_ARRAY_ITEM',
  };
}

export function fileRemoveObjectItem (keyPath, itemKey) {
  return {
    itemKey,
    keyPath,
    type: 'FILE_REMOVE_OBJECT_ITEM',
  };
}

export function fileSetValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'FILE_SET_VALUE',
  };
}
