import { Map } from 'immutable';

export const TOGGLE_GIFT_BOX = 'watchLive/toggleGiftBox';

export function toggleGiftBox() {
  return {
    type: TOGGLE_GIFT_BOX,
  };
}

const initialState = Map({
  isShowGiftBox: false,
});

export default function reducer(state = initialState, action) {
  const isShowGiftBox = state.get('isShowGiftBox');
  if (action.type === TOGGLE_GIFT_BOX) {
    return state.set('isShowGiftBox', !isShowGiftBox);
  }
  return state;
}

export const getIsShowGiftBox = state => state.get('isShowGiftBox');
