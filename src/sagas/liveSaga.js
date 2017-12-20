import { delay } from 'redux-saga';
import { put, call, fork, take, cancel } from 'redux-saga/effects';
import {
  FETCH_LIVE,
  fetchLiveStart,
  fetchLiveFinish,
  convertToState,
  FETCH_LIVE_STOP,
} from '../ducks/live';
import { didReceiveError, ERROR_TAG, ERROR_MESSAGE } from '../ducks/error';
import * as service from '../helpers/api';
// TODO: Remove Dummy
// import * as dummy from '../helpers/dummyGenerator';

export function* liveSaga(payload) {
  while (true) {
    try {
      yield put(fetchLiveStart());
      const { id, accessToken } = payload;
      const liveFetchData = yield call(service.liveDataRetrieval, id, accessToken);
      if (liveFetchData.message !== 'success') {
        throw new Error(ERROR_MESSAGE.LIVE_FETCH);
      }
      const liveList = convertToState(liveFetchData.live_lists);
      yield put(fetchLiveFinish(liveList));
      yield call(delay, 10000);
    } catch (error) {
      yield put(didReceiveError(ERROR_TAG.LIVE_FETCH_ERROR, error.message));
    }
  }
}

export default function* watcher() {
  while (true) {
    const { payload } = yield take(FETCH_LIVE);
    const liveSagaTask = yield fork(liveSaga, payload);
    yield take(FETCH_LIVE_STOP);
    yield cancel(liveSagaTask);
  }
}
