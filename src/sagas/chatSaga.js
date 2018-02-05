import {
  put,
  actionChannel,
  call,
  fork,
  take,
  all,
  cancel,
  cancelled,
  select,
} from 'redux-saga/effects';
import { LOGIN_CHAT } from '../ducks/chat';
import listenToChat from './chatChannel';

function* watchChatLogin() {
  const { username, fullName, profilePicture } = yield take(LOGIN_CHAT);
  const chatUserLogin = yield call(listenToChat, username, fullName, profilePicture);
  try {
    while (true) {
      const data = yield take(chatUserLogin);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* watchChatSage() {
  const subscription = yield fork(watchChatLogin);
}
