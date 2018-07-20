import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';

export const history = createHistory();

const initialStoreState = {};
const enhancers = [];
const middlewares = [
  thunk,
  routerMiddleware(history),
];

if (process.env.NODE_ENV !== 'production') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    console.log('[setup] ✓ Enabling Redux DevTools Extension');
    enhancers.push(devToolsExtension());
  }

  console.log('[setup] ✓ Enabling state logger');
  const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: (state) => state,
    predicate: (getState, action) => {
      const state = getState();
      return state.debug.logs.enabled;
    },
  });
  middlewares.push(loggerMiddleware);
}

const composedEnhancers = compose(
  persistState(['debug'], { key: process.env.APP_NAME }),
  applyMiddleware(...middlewares),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialStoreState,
  composedEnhancers
);

export default store;
