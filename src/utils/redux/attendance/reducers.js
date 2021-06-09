import {
  immerAddArrayItemAtEnd,
  immerInitialState,
  immerMergeObject,
  immerSetValue,
} from '../immerHelper';

const initialState = {
  ...immerInitialState,
  appointmentIndexData: null,
  isFinishModalOpen: false,
  medicalHistoryOpenData: null,
  medicalRecordQuestionCards: null,
  medicalRecordQuestionItems: null,
  shouldPostReceivable: false,
};

/**
 */

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'ATTENDANCE_ADD_ARRAY_ITEM_AT_END':
      return immerAddArrayItemAtEnd(state, action.keyPath, action.itemValue);
    case 'ATTENDANCE_MERGE_OBJECT':
      return immerMergeObject(state, action.keyPath, action.mergeableData);
    case 'ATTENDANCE_SET_VALUE':
      return immerSetValue(state, action.keyPath, action.newValue);
    default:
  }
  return state;
}
