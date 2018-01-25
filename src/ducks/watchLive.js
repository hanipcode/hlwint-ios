import { Map, fromJS, List } from 'immutable';

export const FETCH_BROADCAST_DETAIL = 'watchLive/fetchBroadcastDetail';
export const SET_BROADCASTER_INFO = 'watchLive/setBroadcasterInfo';
export const SET_BROADCAST_HASH = 'watchLive/setBroadcastHash';
export const RESET_BROADCAST_STATE = 'watchLive/resetBroadcastState';
export const TOGGLE_GIFT_BOX = 'watchLive/toggleGiftBox';
export const HIDE_GIFT_BOX = 'watchLive/hideGiftBox';
export const SEND_GIFT = 'watchLive/sendGift';
export const PUBLISH_GIFT = 'watchLive/publishGift';
export const SET_ACTIVE_GIFT = 'watchLive/setActiveGift';
export const RESET_ACTIVE_GIFT = 'watchLive/resetActiveGift';
export const SET_GIFT = 'watchLive/setGift';
export const RESET_GIFT = 'watchLive/resetGift';
export const FETCH_GIFT = 'watchLive/fetchGift';
export const SUBSCRIBE_CHANNEL = 'watchLive/subscribeChannel';
export const UNSUBSCRIBE_CHANNEL = 'watchLive/unsubscribeChannel';
export const PUBLISH_HEART = 'watchLive/publishHeart';
export const ADD_HEART = 'watchLive/addHeart';
export const RESET_HEART = 'watchLive/resetHeart';
export const PUBLISH_COMMENT = 'watchLive/publishComment';
export const ADD_COMMENT = 'watchLive/addComment';
export const RESET_COMMENT = 'watchLive/resetComment';
export const FETCH_VIEWER_LIST = 'watchLive/fetchViewerList';
export const FETCH_VIEWER_LIST_FINISH = 'watchLive/fetchViewerListFinish';
export const RESET_VIEWER_LIST = 'watchLive/resetViewerList';
export const STOP_FETCH_VIEWER_LIST = 'watchLive/stopFetchViewerList';
export const SET_BROADCASTER_COIN = 'watchLive/';

export function fetchBroadcastDetail(broadcasterId) {
  return {
    type: FETCH_BROADCAST_DETAIL,
    broadcasterId,
  };
}

export function toggleGiftBox() {
  return {
    type: TOGGLE_GIFT_BOX,
  };
}

export function hideGiftBox() {
  return {
    type: HIDE_GIFT_BOX,
  };
}

export function subscribeBroadcaster(broadcasterId, userId) {
  return {
    type: SUBSCRIBE_CHANNEL,
    channel: broadcasterId,
    userId,
  };
}

export function unsubscribeBroadcaster(broadcasterId) {
  return {
    type: UNSUBSCRIBE_CHANNEL,
    channel: broadcasterId,
  };
}

export function publishComment(broadcasterId, sender, text) {
  return {
    type: PUBLISH_COMMENT,
    channel: broadcasterId,
    sender,
    text,
  };
}

export function addComment(sender, text) {
  return {
    type: ADD_COMMENT,
    sender,
    text,
  };
}

export function resetComment() {
  return {
    type: RESET_COMMENT,
  };
}

export function publishGift(channel, sender, itemCount, itemName, itemImage, itemId, giftPrice) {
  return {
    type: PUBLISH_GIFT,
    channel,
    sender,
    itemCount,
    itemName,
    itemImage,
    itemId,
    giftPrice,
  };
}

export function publishHeart(broadcasterId, sender) {
  return {
    type: PUBLISH_HEART,
    channel: broadcasterId,
    sender,
  };
}

export function addHeart(sender) {
  return {
    type: ADD_HEART,
    sender,
  };
}

export function resetHeart() {
  return {
    type: RESET_HEART,
  };
}

export function setGiftList(giftList) {
  return {
    type: SET_GIFT,
    giftList,
  };
}

export function resetGift() {
  return {
    type: RESET_GIFT,
  };
}

export function fetchViewer(broadcasterId) {
  return {
    type: FETCH_VIEWER_LIST,
    broadcasterId,
  };
}

export function fetchViewerFinish(viewerList) {
  return {
    type: FETCH_VIEWER_LIST_FINISH,
    viewerList,
  };
}

export function resetViewerList() {
  return {
    type: RESET_VIEWER_LIST,
  };
}

export function stopFetchViewer() {
  return {
    type: STOP_FETCH_VIEWER_LIST,
  };
}

export function setBroadcasterCoin(ammount) {
  return {
    type: SET_BROADCASTER_COIN,
    ammount,
  };
}

export function setBroadcasterInfo(broadcasterName, broadcasterProfilePicture, broadcasterGender) {
  return {
    type: SET_BROADCASTER_INFO,
    broadcasterName,
    broadcasterProfilePicture,
    broadcasterGender,
  };
}

export function setBroadcastHash(hash) {
  return {
    type: SET_BROADCAST_HASH,
    hash,
  };
}

export function resetBroadcastState() {
  return {
    type: RESET_BROADCAST_STATE,
  };
}

export function sendGift(name, profilePicture, count, itemName, itemImage) {
  return {
    type: SEND_GIFT,
    name,
    profilePicture,
    count,
    itemName,
    itemImage,
  };
}

export function setActiveGift(name, profilePicture, count, itemName, itemImage) {
  return {
    type: SET_ACTIVE_GIFT,
    name,
    profilePicture,
    count,
    itemName,
    itemImage,
  };
}

export function resetActiveGift() {
  return {
    type: RESET_ACTIVE_GIFT,
  };
}

const initialState = Map({
  isShowGiftBox: false,
  broadcasterInfo: Map({
    name: '',
    profilePicture: null,
    gender: '',
  }),
  broadcastHash: null,
  broadcasterCoin: 0,
  viewers: List(),
  giftList: List(),
  heartList: List(),
  commentList: List(),
  activeGift: null,
});

export default function reducer(state = initialState, action) {
  if (action.type === TOGGLE_GIFT_BOX) {
    const isShowGiftBox = state.get('isShowGiftBox');
    return state.set('isShowGiftBox', !isShowGiftBox);
  } else if (action.type === HIDE_GIFT_BOX) {
    return state.set('isShowGiftBox', false);
  } else if (action.type === SET_BROADCASTER_INFO) {
    return state.set(
      'broadcasterInfo',
      Map({
        name: action.broadcasterName,
        profilePicture: action.broadcasterProfilePicture,
        gender: action.broadcasterGender,
      }),
    );
  } else if (action.type === SET_BROADCAST_HASH) {
    return state.set('broadcastHash', action.hash);
  } else if (action.type === RESET_BROADCAST_STATE) {
    return state.withMutations(currentState =>
      currentState
        .set(
          'broadcasterInfo',
          Map({
            name: '',
            profilePicture: null,
            gender: '',
          }),
        )
        .set('broadcasterCoin', 0)
        .set('broadcastHash', null));
  } else if (action.type === SET_BROADCASTER_COIN) {
    return state.set('broadcasterCoin', action.ammount);
  } else if (action.type === SET_GIFT) {
    return state.set('giftList', fromJS(action.giftList));
  } else if (action.type === RESET_GIFT) {
    return state.set('giftList', null);
  } else if (action.type === SET_ACTIVE_GIFT) {
    return state.set(
      'activeGift',
      Map({
        name: action.name,
        profilePicture: action.profilePicture,
        count: action.count,
        itemName: action.itemName,
        itemImage: action.itemImage,
      }),
    );
  } else if (action.type === RESET_ACTIVE_GIFT) {
    return state.set('activeGift', null);
  } else if (action.type === ADD_HEART) {
    return state.update('heartList', heartList => heartList.push(fromJS(action.sender)));
  } else if (action.type === RESET_HEART) {
    return state.set('heartList', List());
  } else if (action.type === ADD_COMMENT) {
    const newComment = Map({
      sender: fromJS(action.sender),
      text: action.text,
    });
    return state.update('commentList', commentList => commentList.push(newComment));
  } else if (action.type === RESET_COMMENT) {
    return state.set('commentList', List());
  } else if (action.type === FETCH_VIEWER_LIST_FINISH) {
    return state.set('viewers', fromJS(action.viewerList));
  } else if (action.type === RESET_VIEWER_LIST) {
    return state.set('viewers', List());
  }
  return state;
}

export const getIsShowGiftBox = state => state.get('isShowGiftBox');
export const getGiftList = state => state.get('giftList');
export const getHeartIdList = state => state.get('heartList').map((_, index) => index);
export const getCommentList = state => state.get('commentList');
export const getViewerList = state =>
  state.get('viewers').map(viewerData =>
    Map({
      id: viewerData.get('id'),
      profilePicture: viewerData.get('u_profile_pic'),
    }));
export const getBroadcasterCoin = state => state.get('broadcasterCoin');
export const getBroadcasterInfo = state => state.get('broadcasterInfo');
export const getBroadcasterProfilePicture = state =>
  state.getIn(['broadcasterInfo', 'profilePicture']);
export const getBroadcasterName = state => state.getIn(['broadcasterInfo', 'name']);
export const getBroadcasterGender = state => state.getIn(['broadcasterInfo', 'gender']);
export const getBroadcastHash = state => state.get('broadcastHash');
export const getActiveGift = state => state.get('activeGift');
