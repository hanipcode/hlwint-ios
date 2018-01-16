import { Map, fromJS, List } from 'immutable';

export const TOGGLE_GIFT_BOX = 'watchLive/toggleGiftBox';
export const SEND_GIFT = 'watchLive/sendGift';
export const SET_USER_COIN = 'watchLive/setUserCoin';
export const SET_GIFT = 'watchLive/setGift';
export const RESET_GIFT = 'watchLive/resetGift';
export const FETCH_GIFT = 'watchLive/fetchGift';
export const SUBSCRIBE_CHANNEL = 'watchLive/subscribeChannel';
export const UNSUBSCRIBE_CHANNEL = 'watchLive/unsubscribeChannel';
export const PUBLISH_HEART = 'watchLive/publishHeart';
export const ADD_HEART = 'watchLive/addHeart';

export function toggleGiftBox() {
  return {
    type: TOGGLE_GIFT_BOX,
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

export function setUserCoin(ammount) {
  return {
    type: SET_USER_COIN,
    ammount,
  };
}

export function insertGiftList(giftList) {
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

const initialState = Map({
  isShowGiftBox: false,
  userCoin: null,
  broadcasterCoin: null,
  viewers: null,
  giftList: null,
  heartList: List(),
});

export default function reducer(state = initialState, action) {
  if (action.type === TOGGLE_GIFT_BOX) {
    const isShowGiftBox = state.get('isShowGiftBox');
    return state.set('isShowGiftBox', !isShowGiftBox);
  } else if (action.type === SET_USER_COIN) {
    return state.set('userCoin', action.ammount);
  } else if (action.type === SET_GIFT) {
    return state.set('giftList', fromJS(action.giftList));
  } else if (action.type === RESET_GIFT) {
    return state.set('giftList', null);
  } else if (action.type === ADD_HEART) {
    return state.update('heartList', heartList => heartList.push(fromJS(action.sender)));
  }
  return state;
}

export const getIsShowGiftBox = state => state.get('isShowGiftBox');
export const getUserCoin = state => state.get('userCoin');
export const getHeartIdList = state => state.get('heartList').map((_, index) => index);
