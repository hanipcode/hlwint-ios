import { combineReducers } from 'redux';
import navReducer from './rootNavigator';
import loginReducer from './login';
import errorReducer from './error';
import liveReducer from './live';
import watchLiveReducer from './watchLive';

const reducers = combineReducers({
  nav: navReducer,
  loginReducer,
  errorReducer,
  liveReducer,
  watchLiveReducer,
});

export default reducers;
