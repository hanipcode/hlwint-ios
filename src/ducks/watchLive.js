import { Map } from 'immutable';

export const TOGGLE_GIFT_BOX = 'watchLive/toggleGiftBox';
export const SEND_GIFT = 'watchLive/sendGift';
export const SET_USER_COIN = 'watchLive/setUserCoin';

export function toggleGiftBox() {
  return {
    type: TOGGLE_GIFT_BOX,
  };
}

export function setUserCoin(ammount) {
  return {
    type: SET_USER_COIN,
    ammount,
  };
}

const initialState = Map({
  isShowGiftBox: false,
  userCoin: null,
  broadcasterCoin: null,
  viewers: null,
});

export default function reducer(state = initialState, action) {
  const isShowGiftBox = state.get('isShowGiftBox');
  if (action.type === TOGGLE_GIFT_BOX) {
    return state.set('isShowGiftBox', !isShowGiftBox);
  } else if (action.type === SET_USER_COIN) {
    return state.set('userCoin', action.ammount);
  }
  return state;
}

export const getIsShowGiftBox = state => state.get('isShowGiftBox');
export const getUserCoin = state => state.get('userCoin');
