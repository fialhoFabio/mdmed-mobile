import {immerInjectState} from '../immerHelper';

const initialState = {};

export default function reducer (state = initialState, action = '') {
  switch (action.type) {
    case 'FROZEN_INJECT_STATE':
      return immerInjectState(state, action.moreState);
    default:
  }
  return state;
}
