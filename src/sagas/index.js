// import { takeEvery, takeLatest } from 'redux-saga';
import { takeEvery, takeLatest, fork } from 'redux-saga/effects';
import { USER_LOGIN, USER_ALREADY_LOGGEDIN } from '../ducks/login';
import loginSaga, { uploadDeviceSaga } from './loginSaga';
import liveSaga from './liveSaga';

export default function* rootSaga() {
  yield takeEvery(USER_LOGIN, loginSaga);
  yield takeEvery(USER_ALREADY_LOGGEDIN, uploadDeviceSaga);
  yield fork(liveSaga);
}
