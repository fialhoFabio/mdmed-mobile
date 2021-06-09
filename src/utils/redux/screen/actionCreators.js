export function screenInjectState (moreState) {
  return {
    moreState,
    type: 'SCREEN_INJECT_STATE',
  };
}

export function screenMergeObject (keyPath, mergeableData) {
  return {
    keyPath,
    mergeableData,
    type: 'SCREEN_MERGE_OBJECT',
  };
}

export function screenSetValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'SCREEN_SET_VALUE',
  };
}
