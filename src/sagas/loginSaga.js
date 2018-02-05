import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import device from 'react-native-device-info';
import { actionCreators } from '../ducks/login';
import { didReceiveError, ERROR_TAG, ERROR_MESSAGE } from '../ducks/error';
import * as service from '../helpers/api';
import Storage from '../data/storage';
import CONSTANTS from '../constants';
import { loginChat } from '../ducks/chat';

const { ACTIVITY } = CONSTANTS;
const deviceOS = 'iOS';

export function* uploadDeviceSaga() {
  try {
    const userId = yield Storage.getUser();
    const accessToken = yield Storage.getToken();
    const deviceAgent = device.getUniqueID().replace(/[-]/gi, '');
    const uploadLastDeviceResponse = yield call(
      service.uploadLastDevice,
      userId.id,
      deviceAgent,
      deviceOS,
      accessToken,
    );
    if (uploadLastDeviceResponse.status !== 200) {
      throw new Error(ERROR_MESSAGE.DEVICE_FAIL);
    }
    const uploadLastDeviceJson = yield uploadLastDeviceResponse.json();
    if (uploadLastDeviceJson.message !== 'success') {
      throw new Error(ERROR_TAG.LOGIN_ERROR, ERROR_MESSAGE.DEVICE_FAIL);
    }
    try {
      const getServerInfo = yield service.getServerInfo();
      Storage.setServerInfo(getServerInfo);
    } catch (err) {
      yield put(didReceiveError(ERROR_TAG.LOC_STORAGE_ERROR, ERROR_MESSAGE.SERVER_INFO));
    }

    yield put(NavigationActions.navigate({
      routeName: 'Tutorial',
    }));
  } catch (err) {
    yield put(didReceiveError(ERROR_TAG.LOGIN_ERROR, ERROR_MESSAGE.DEVICE_FAIL));
  }
}

export function* reloginDeviceSaga() {
  try {
    const userId = yield Storage.getUser();
    const accessToken = yield Storage.getToken();
    const deviceAgent = device.getUniqueID().replace(/[-]/gi, '');
    const uploadLastDeviceResponse = yield call(
      service.uploadLastDevice,
      userId.id,
      deviceAgent,
      deviceOS,
      accessToken,
    );
    if (uploadLastDeviceResponse.status !== 200) {
      throw new Error(ERROR_MESSAGE.DEVICE_FAIL);
    }
    const uploadLastDeviceJson = yield uploadLastDeviceResponse.json();
    if (uploadLastDeviceJson.message !== 'success') {
      throw new Error(ERROR_TAG.LOGIN_ERROR, ERROR_MESSAGE.DEVICE_FAIL);
    }
    try {
      const getServerInfo = yield service.getServerInfo();
      Storage.setServerInfo(getServerInfo);
    } catch (err) {
      yield put(didReceiveError(ERROR_TAG.LOC_STORAGE_ERROR, ERROR_MESSAGE.SERVER_INFO));
    }

    yield put(NavigationActions.navigate({
      routeName: 'Home',
    }));

  } catch (err) {
    yield put(didReceiveError(ERROR_TAG.LOGIN_ERROR, ERROR_MESSAGE.DEVICE_FAIL));
  }
}

export default function* loginSaga({ payload }) {
  yield put(actionCreators.startLogin());
  try {
    let socialLoginResponse;
    if (payload.socialType === 'facebook') {
      socialLoginResponse = yield call(
        service.facebookLogin,
        payload.firstName,
        payload.lastName,
        payload.dateOfBirth,
        payload.gender,
        payload.email,
        payload.phoneNumber,
        payload.profilePic,
        payload.socialId,
      );
    } else if (payload.socialType === 'google') {
      socialLoginResponse = yield call(
        service.googleLogin,
        payload.firstName,
        payload.lastName,
        payload.dateOfBirth,
        payload.gender,
        payload.email,
        payload.phoneNumber,
        payload.profilePic,
        payload.socialId,
      );
    }
    const json = yield socialLoginResponse.json();
    const { data } = json;
    const { u_profile_pic } = data;
    const accessToken = data.u_token;
    const deviceAgent = device.getUniqueID();
    const [uploadLastDeviceResponse, sendTaskResponse] = [
      yield call(service.uploadLastDevice, data.id, deviceAgent, deviceOS, accessToken),
      yield call(service.sendTask, data.id, ACTIVITY.LOGIN, data.id, accessToken),
    ];
    if (uploadLastDeviceResponse.status !== 200) {
      throw new Error(ERROR_MESSAGE.DEVICE_FAIL);
    }
    if (sendTaskResponse.status !== 200) {
      throw new Error(ERROR_MESSAGE.TASK_FAILL);
    }
    const uploadLastDeviceJson = yield uploadLastDeviceResponse.json();
    const sendTaskJson = yield sendTaskResponse.json();
    const uploadLastDeviceData = uploadLastDeviceJson;
    const sendTaskData = sendTaskJson;
    if (uploadLastDeviceData.message !== 'success') {
      throw new Error(ERROR_MESSAGE.DEVICE_FAIL);
    }
    if (sendTaskData.message !== 'success') {
      throw new Error(ERROR_MESSAGE.TASK_FAILL);
    }
    try {
      const getServerInfo = yield service.getServerInfo();
      Storage.setServerInfo(getServerInfo);
    } catch (err) {
      yield put(didReceiveError(ERROR_TAG.LOC_STORAGE_ERROR, ERROR_MESSAGE.SERVER_INFO));
    }
    yield Storage.setUser(data);
    yield Storage.setToken(accessToken);
    yield Storage.setUserPicture(u_profile_pic);
    yield put(loginChat(data.u_nick_name, data.u_full_name, data.u_profile_pic));
    yield put(actionCreators.finishLogin(accessToken, data));
    yield put(NavigationActions.navigate({
      routeName: 'Tutorial',
    }));
  } catch (err) {
    console.warn(err.message, err.stack);
    yield put(didReceiveError(ERROR_TAG.LOGIN_ERROR, err.toString()));
  }
}
