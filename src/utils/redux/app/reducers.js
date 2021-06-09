import {
  immerInitialState,
  immerInjectState,
  immerSetValue,
} from '../immerHelper';

export const initialState = {
  ...immerInitialState,
  feedback: null, // object
  hasPreventToModal: false,
  isFetching: false,
  isHiddenFetching: false,
  isInvalidState: false,
  isModalOpen: false,
  isPushMenuOpen: false,
  isRouteFetching: false,
  preventTo: null, // object
  promptPrintData: null, // object
  shouldReload: false,
  urlFetching: null, // logs apenas
};

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'ROUTE_FETCH_SET_ABORT_STATE':
    case 'ROUTE_FETCH_SET_COMPLETE_STATE':
    case 'ROUTE_FETCH_SET_ERROR_STATE':
    case 'ROUTE_FETCH_SET_START_STATE':
    case 'FETCH_SET_ABORT_STATE':
    case 'FETCH_SET_COMPLETE_STATE':
    case 'FETCH_SET_ERROR_STATE':
    case 'FETCH_SET_START_STATE':
      return immerInjectState(state, action.state);
    case 'APP_SET_VALUE':
      return immerSetValue(state, action.keyPath, action.newValue);
    default:
  }
  return state;
}
