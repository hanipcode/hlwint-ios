
import { Alert } from 'react-native';
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
import { delay, buffers } from 'redux-saga';
import { NavigationActions } from 'react-navigation';
import pubnubEventChannel from './eventChannel';
import {
  SUBSCRIBE_CHANNEL,
  PUBLISH_HEART,
  UNSUBSCRIBE_CHANNEL,
  FETCH_VIEWER_LIST,
  addHeart,
  STOP_FETCH_VIEWER_LIST,
  getGiftList,
  fetchViewerFinish,
  resetViewerList,
  setBroadcasterCoin,
  FETCH_BROADCAST_DETAIL,
  setBroadcastHash,
  setBroadcasterInfo,
  resetBroadcastState,
  resetHeart,
  setGiftList,
  hideGiftBox,
  SEND_GIFT,
  setActiveGift,
  resetActiveGift,
  sendGift,
  PUBLISH_GIFT,
  addComment,
  PUBLISH_COMMENT,
  getBroadcasterCoin,
  resetComment,
  setBroadcastEnded,
} from '../ducks/watchLive';
import { publishHeart, publishGift, publishComment } from '../data/pubnub';
import * as service from '../helpers/api';
import Storage from '../data/storage';
import { fetchUserProfile } from '../ducks/userInfo';

// function listenSendGift() {
//   const giftChannel = yield;
// }

// export default function* watcher() {
//   while (true) {}
// }

function* giftAnimationQueue() {
  const giftAnimationChannel = yield actionChannel(SEND_GIFT, buffers.expanding(10));
  while (true) {
    try {
      const {
        name, profilePicture, count, itemName,
      } = yield take(giftAnimationChannel);
      const currentState = yield select();
      const giftList = getGiftList(currentState.watchLiveReducer);
      if (giftList.size === 0) {
        throw new Error('Gift List is not yet loaded');
      }
      const unionGiftList = giftList
        .get('hot')
        .concat(giftList.get('basic'))
        .concat(giftList.get('premium'));
      const itemImage = unionGiftList
        .filter(gift => gift.get('cs_itemname') === itemName)
        .get(0)
        .get('cs_image');
      yield put(setActiveGift(name, profilePicture, count, itemName, itemImage));
      yield call(delay, 3000);
      yield put(resetActiveGift());
    } catch (error) {
      console.log(error);
    }
  }
}

function* watchPublishGift() {
  while (true) {
    try {
      const {
        channel, sender, itemCount, itemName, itemImage, itemId, giftPrice,
      } = yield take(PUBLISH_GIFT);
      const userData = yield call(Storage.getUser);
      const accessToken = yield call(Storage.getToken);
      const { id } = userData;
      const income = giftPrice * itemCount;
      const publishGiftData = yield call(
        service.sendGift,
        id,
        accessToken,
        id,
        channel,
        itemId,
        itemCount,
        income,
      );
      if (publishGiftData.message !== 'success') {
        throw new Error('error while send gift shop');
      }
      const currentState = yield select();
      const broadcasterCoin = getBroadcasterCoin(currentState.watchLiveReducer);
      const newBroadcasterCoin = parseInt(broadcasterCoin, 10) + income;
      yield all([
        put(fetchUserProfile()),
        put(setBroadcasterCoin(newBroadcasterCoin)),
        fork(publishGift, channel, sender, itemCount, itemName),
      ]);
    } catch (err) {
      console.log(err);
    }
  }
}

function* watchPublishComment() {
  while (true) {
    const { channel, sender, text } = yield take(PUBLISH_COMMENT);
    yield fork(publishComment, channel, sender, text);
  }
}

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
    yield all([
      fork(watchPublishHeart),
      fork(watchPublishGift),
      fork(giftAnimationQueue),
      fork(watchPublishComment),
    ]);
    try {
      while (true) {
        const message = yield take(subscribedChannel);
        const { type, sender, text } = message;
        if (type === 'heart') {
          if (sender.id.toString() !== userId.toString()) {
            yield put(addHeart(sender));
          }
        }
        if (type === 'like') {
          const { item_count, item_image, item_name } = message;
          const { id, name, avatar } = sender;
          yield put(sendGift(name, avatar, item_count, item_name, item_image));
        }
        if (type === 'comment') {
          yield put(addComment(sender, text));
        }
        if (type === 'closed') {
          Alert.alert('Current Stream Has Ended');
          yield put(NavigationActions.navigate({
            routeName: 'ViewerLiveEnded',
            params: { userId: channel },
          }));
          // yield put(setBroadcastEnded(true, 'Broadcaster has ended the stream'));
        }
      }
    } finally {
      if (yield cancelled()) {
        yield subscribedChannel.close();
        yield all([
          put(resetActiveGift()),
          put(resetHeart()),
          put(resetBroadcastState()),
          put(resetComment()),
        ]);
      }
    }
  }
}

function* viewerListRefresh(broadcasterId) {
  while (true) {
    try {
      console.log('mulai');
      const viewerListData = yield call(service.getViewerList, broadcasterId);
      if (viewerListData.message !== 'success') {
        throw new Error('Failed retrieving viewerList');
      }
      yield put(fetchViewerFinish(viewerListData.data));
      yield put(setBroadcasterCoin(viewerListData.broadcaster_coin));
      yield call(delay, 10000);
    } catch (error) {
      console.log(error);
    } finally {
      if (yield cancelled()) {
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

function* watchGiftList() {
  try {
    const userData = yield call(Storage.getUser);
    const { id } = userData;
    const accessToken = yield call(Storage.getToken);
    const giftList = yield call(service.getGiftList, id, accessToken);
    yield put(setGiftList(giftList));
  } catch (e) {
    console.log(e);
  }
}

function* broadcastDetailTask() {
  const { broadcasterId } = yield take(FETCH_BROADCAST_DETAIL);
  try {
    console.log('disini');
    yield put(resetBroadcastState());
    const userData = yield call(Storage.getUser);
    const accessToken = yield call(Storage.getToken);
    const { id } = userData;
    const userProfileData = yield call(service.getOtherUserProfile, id, accessToken, broadcasterId);
    const joinLiveData = yield call(service.joinLive, id, accessToken, broadcasterId);
    if (
      userProfileData.message !== 'success' ||
      joinLiveData.message !== 'success'
    ) {
      console.log(userProfileData, joinLiveData);
      throw new Error('ERROR broadcast detail');
    }
    const {
      profile_pic, first_name, last_name, gender,
    } = userProfileData.data;
    const fullName = `${first_name} ${last_name}`;
    yield all([
      put(setBroadcasterInfo(fullName, profile_pic, gender)),
      put(fetchUserProfile()),
    ]);
    yield put(resetHeart());
    yield put(resetActiveGift());
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      yield put(resetBroadcastState());
      yield put(hideGiftBox());
    }
  }
}

export default function* watchLiveSaga() {
  while (true) {
    const subscription = yield fork(watchPubnub);
    const viewerList = yield fork(viewerListTask);
    const giftList = yield fork(watchGiftList);
    const broadcastDetail = yield fork(broadcastDetailTask);
    const { channel } = yield take(UNSUBSCRIBE_CHANNEL);
    if (channel) {
      yield cancel(subscription);
      yield cancel(viewerList);
      yield cancel(broadcastDetail);
      yield cancel(giftList);
    }
  }
}
