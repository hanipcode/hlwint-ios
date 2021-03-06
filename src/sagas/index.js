// import { takeEvery, takeLatest } from 'redux-saga';
import { takeEvery, takeLatest, fork, all } from 'redux-saga/effects';
import { USER_LOGIN, USER_ALREADY_LOGGEDIN } from '../ducks/login';
import loginSaga, { reloginDeviceSaga } from './loginSaga';
import liveSaga from './liveSaga';
import exploreSaga from './exploreSaga';
import watchPubnub from './watchLiveSaga';
import userInfoSaga from './userInfoSaga';
import watchChatSaga from './chatSaga';

export default function* rootSaga() {
  yield all([
    takeEvery(USER_LOGIN, loginSaga),
    takeEvery(USER_ALREADY_LOGGEDIN, reloginDeviceSaga),
    fork(liveSaga),
    fork(watchPubnub),
    fork(exploreSaga),
    fork(userInfoSaga),
    fork(watchChatSaga),
  ]);
}
