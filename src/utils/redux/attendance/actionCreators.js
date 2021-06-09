export function attendanceAddArrayItemAtEnd (keyPath, itemValue) {
  return {
    itemValue,
    keyPath,
    type: 'ATTENDANCE_ADD_ARRAY_ITEM_AT_END',
  };
}

export function attendanceMergeObject (keyPath, mergeableData) {
  return {
    keyPath,
    mergeableData,
    type: 'ATTENDANCE_MERGE_OBJECT',
  };
}

export function attendanceSetValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'ATTENDANCE_SET_VALUE',
  };
}
