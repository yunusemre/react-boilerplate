import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import debug from './Debug';

const rootReducer = combineReducers({
  routing: routerReducer,
  debug,
});

export default rootReducer;
