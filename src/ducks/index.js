import { combineReducers } from 'redux';
import navReducer from './rootNavigator';
import loginReducer from './login';
import errorReducer from './error';
import liveReducer from './live';
import watchLiveReducer from './watchLive';
import exploreReducer from './explore';
import userInfoReducer from './userInfo';
import broadcastReducer from './broadcast';

const reducers = combineReducers({
  nav: navReducer,
  loginReducer,
  errorReducer,
  liveReducer,
  watchLiveReducer,
  exploreReducer,
  userInfoReducer,
  broadcastReducer,
});

export default reducers;
