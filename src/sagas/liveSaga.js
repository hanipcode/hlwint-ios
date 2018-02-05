import { delay } from 'redux-saga';
import { put, call, fork, take, cancel } from 'redux-saga/effects';
import _ from 'lodash';
import {
  FETCH_LIVE,
  fetchLiveStart,
  fetchLiveFinish,
  convertToState,
  FETCH_LIVE_STOP,
} from '../ducks/live';
import { didReceiveError, ERROR_TAG, ERROR_MESSAGE } from '../ducks/error';
import * as service from '../helpers/api';
import { getWowzaIdList } from '../data/wowza';
// TODO: Remove Dummy
// import * as dummy from '../helpers/dummyGenerator';

export function* liveSaga(payload) {
  while (true) {
    try {
      yield put(fetchLiveStart());
      const { id, accessToken } = payload;
      const liveFetchData = yield call(service.liveDataRetrieval, id, accessToken);
      // const wowzaData = yield call(getWowzaIdList);
      if (liveFetchData.message !== 'success') {
        throw new Error(ERROR_MESSAGE.LIVE_FETCH);
      }
      // separate user that have under 10 view count, meaning that fake viewer isn't completely loaded
      const filterByViewCount = _.filter(liveFetchData.live_lists, (liveItem) => {
        if (liveItem.view_count > 9) return true;
        return false;
      });
      // // first intersect data from wowza with data from our server
      // const intersectedData = _.intersectionBy(wowzaData, filterByViewCount, 'id');

      // // then fill the data from wowza with info from our server, because data from wowza only
      // // contain stream name and user id
      // const filledIntersectedData = _.map(intersectedData, (wowzaItem) => {
      //   const gettedIndex = _.findIndex(
      //     liveFetchData.live_lists,
      //     serverItem => serverItem.id === wowzaItem.id,
      //   );
      //   return {
      //     ...wowzaItem,
      //     ...liveFetchData.live_lists[gettedIndex],
      //   };
      // });

      const liveList = convertToState(filterByViewCount);
      yield put(fetchLiveFinish(liveList));
      yield call(delay, 15000);
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
