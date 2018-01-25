// import { takeEvery, takeLatest } from 'redux-saga';
import { takeEvery, takeLatest, fork, all } from 'redux-saga/effects';
import { USER_LOGIN, USER_ALREADY_LOGGEDIN } from '../ducks/login';
import loginSaga, { uploadDeviceSaga } from './loginSaga';
import liveSaga from './liveSaga';
import exploreSaga from './exploreSaga';
import watchPubnub from './watchLiveSaga';
import userInfoSaga from './userInfoSaga';

export default function* rootSaga() {
  yield all([
    takeEvery(USER_LOGIN, loginSaga),
    takeEvery(USER_ALREADY_LOGGEDIN, uploadDeviceSaga),
    fork(liveSaga),
    fork(watchPubnub),
    fork(exploreSaga),
    fork(userInfoSaga),
  ]);
}
