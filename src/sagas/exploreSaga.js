import { take, put, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  FETCH_EXPLORE,
  fetchExploreStart,
  fetchExploreError,
  fetchExploreFinish,
} from '../ducks/explore';
import * as service from '../helpers/api';
import Storage from '../data/storage';

export function* exploreFetchTask() {
  while (true) {
    try {
      yield put(fetchExploreStart());
      const userData = yield call(Storage.getUser);
      const accessToken = yield call(Storage.getToken);
      const { id } = userData;
      const fetchExploreData = yield call(service.getExploreData, id, accessToken);
      if (fetchExploreData.message !== 'success') {
        throw new Error('not success call api');
      }
      const {
        image, nearby, tag, toprank,
      } = fetchExploreData;
      yield put(fetchExploreFinish(image, toprank, tag, nearby));
      yield call(delay, 15000);
    } catch (e) {
      yield put(fetchExploreError(e));
    }
  }
}

export default function* watcher() {
  const fetchStart = yield take(FETCH_EXPLORE);
  const fetchTask = yield fork(exploreFetchTask);
}
