import {combineReducers} from 'redux';

import app from './app/reducers';
import attendance from './attendance/reducers';
import chat from './chat/reducers';
import file from './file/reducers';
import formigo from './formigo/reducers';
import frozen from './frozen/reducers';
import indexData from './indexData/reducers';
import notification from './notification/reducers';
import scheduler from './scheduler/reducers';
import scheduling from './scheduling/reducers';
import screen from './screen/reducers';
import userPreferences from './userPreferences/reducers';

const reducer = combineReducers({
  app,
  attendance,
  chat,
  file,
  formigo,
  frozen,
  indexData,
  notification,
  scheduler,
  scheduling,
  screen,
  userPreferences,
});

const reducerWithResetHandler = (state, action) => {
  let handledState = state;
  if (action.type === 'APP_RESET_STATE') {
    handledState = undefined;
  }
  return reducer(handledState, action);
};

export default reducerWithResetHandler;
