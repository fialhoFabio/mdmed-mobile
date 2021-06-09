export function indexDataAddArrayItemAtBeginning (keyPath, itemValue) {
  return {
    itemValue,
    keyPath,
    type: 'INDEX_DATA_ADD_ARRAY_ITEM_AT_BEGINNING',
  };
}

export function indexDataInjectState (moreState) {
  return {
    moreState,
    type: 'INDEX_DATA_INJECT_STATE',
  };
}

export function indexDataMergeArray (keyPath, moreRows) {
  return {
    keyPath,
    moreRows,
    type: 'INDEX_DATA_MERGE_ARRAY',
  };
}

export function indexDataRemoveArrayItem (keyPath, index) {
  return {
    index,
    keyPath,
    type: 'INDEX_DATA_REMOVE_ARRAY_ITEM',
  };
}

export function indexDataSetValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'INDEX_DATA_SET_VALUE',
  };
}
