import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import { FETCH_LIVE, FETCH_LIVE_START, FETCH_LIVE_FINISH } from './ducks/live';

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};
    /* eslint-disable */
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    /* eslint-enable */
    return newState;
  },
  collapsed: (_, action) => {
    if (action.type === FETCH_LIVE) return true;
    if (action.type === FETCH_LIVE_START) return true;
    if (action.type === FETCH_LIVE_FINISH) return true;
    return false;
  },
});

export default logger;
