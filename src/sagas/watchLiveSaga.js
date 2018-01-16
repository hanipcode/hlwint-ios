import { put, actionChannel, call, fork, take, all, cancel, cancelled } from 'redux-saga/effects';
import pubnubEventChannel from './eventChannel';
import {
  SUBSCRIBE_CHANNEL,
  PUBLISH_HEART,
  UNSUBSCRIBE_CHANNEL,
  addHeart,
} from '../ducks/watchLive';
import { publishHeart } from '../data/pubnub';

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
        subscribedChannel.close();
      }
    }
  }
}

export default function* watchLiveSaga() {
  while (true) {
    const subscription = yield fork(watchPubnub);
    const { channel } = yield take(UNSUBSCRIBE_CHANNEL);
    if (channel) {
      yield cancel(subscription);
    }
  }
}
