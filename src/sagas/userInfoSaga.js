import { take, call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { FETCH_USER_PROFILE, setUserProfile } from '../ducks/userInfo';
import * as service from '../helpers/api';
import Storage from '../data/storage';

function* fetchUserData() {
  try {
    const userData = yield call(Storage.getUser);
    const accessToken = yield call(Storage.getToken);
    const { id } = userData;
    const userProfileData = yield call(service.getUserProfile, id, accessToken);
    if (userProfileData.message !== 'success') {
      throw new Error('failed when get user data');
    }
    yield fork(Storage.setUser, userProfileData.data);
    yield put(setUserProfile(userProfileData.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchUserInfo() {
  yield takeLatest(FETCH_USER_PROFILE, fetchUserData);
}
