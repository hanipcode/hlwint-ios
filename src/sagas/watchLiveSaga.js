import { put, actionChannel, call, fork, take, all, cancel, cancelled } from 'redux-saga/effects';
import pubnubEventChannel from './eventChannel';
import { delay } from 'redux-saga';
import {
  SUBSCRIBE_CHANNEL,
  PUBLISH_HEART,
  UNSUBSCRIBE_CHANNEL,
  FETCH_VIEWER_LIST,
  addHeart,
  RESET_VIEWER_LIST,
  STOP_FETCH_VIEWER_LIST,
  fetchViewerFinish,
  resetViewerList,
} from '../ducks/watchLive';
import { publishHeart } from '../data/pubnub';
import * as service from '../helpers/api';

// function listenSendGift() {
//   const giftChannel = yield;
// }

// export default function* watcher() {
//   while (true) {}
// }

function* watchPublishHeart() {
  while (true) {
    const { channel, sender } = yield take(PUBLISH_HEART);
    yield put(addHeart(sender));
    yield fork(publishHeart, channel, sender);
  }
}

function* watchPubnub() {
  while (true) {
    const { channel, userId } = yield take(SUBSCRIBE_CHANNEL);
    const subscribedChannel = yield call(pubnubEventChannel, channel);
    yield all([yield fork(watchPublishHeart)]);
    try {
      while (true) {
        const message = yield take(subscribedChannel);
        const { type, sender } = message;
        if (type === 'heart') {
          if (sender.id !== userId) {
            yield put(addHeart(sender));
          }
        }
      }
    } finally {
      if (yield cancelled()) {
        yield subscribedChannel.close();
      }
    }
  }
}

function* viewerListRefresh(broadcasterId) {
  while (true) {
    try {
      const viewerListData = yield call(service.getViewerList, broadcasterId);
      if (viewerListData.message !== 'success') {
        throw new Error('Failed retrieving viewerList');
      }
      yield put(fetchViewerFinish(viewerListData.data));
      yield call(delay, 10000);
    } catch (error) {
      console.log(error);
    } finally {
      if (yield cancelled()) {
        console.log('goro goro cancel');
        yield put(resetViewerList());
      }
    }
  }
}

function* viewerListTask() {
  const { broadcasterId } = yield take(FETCH_VIEWER_LIST);
  const viewerListRefreshTask = yield fork(viewerListRefresh, broadcasterId);
  yield take(STOP_FETCH_VIEWER_LIST);
  yield cancel(viewerListRefreshTask);
}

export default function* watchLiveSaga() {
  while (true) {
    const subscription = yield fork(watchPubnub);
    const viewerList = yield fork(viewerListTask);
    const { channel } = yield take(UNSUBSCRIBE_CHANNEL);
    if (channel) {
      yield cancel(subscription);
      yield cancel(viewerList);
    }
  }
}
