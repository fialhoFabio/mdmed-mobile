export function userPreferencesInjectState (moreState) {
  return {
    moreState,
    type: 'USER_PREFERENCES_INJECT_STATE',
  };
}

export function userPreferencesMergeObject (keyPath, mergeableData) {
  return {
    keyPath,
    mergeableData,
    type: 'USER_PREFERENCES_MERGE_OBJECT',
  };
}

export function userPreferencesSetValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'USER_PREFERENCES_SET_VALUE',
  };
}
