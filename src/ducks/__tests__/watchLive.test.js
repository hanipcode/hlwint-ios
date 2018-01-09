import { Map } from 'immutable';
import watchLive, { getIsShowGiftBox, toggleGiftBox, TOGGLE_GIFT_BOX } from '../watchLive';

describe('WATCH LIVE REDUCER', () => {
  describe('action creator', () => {
    it('can produce show gift box action', () => {
      const action = toggleGiftBox();
      const expectedAction = {
        type: TOGGLE_GIFT_BOX,
      };
      expect(action).toEqual(expectedAction);
    });
  });
  describe('reducer', () => {
    it('can toggle gift box', () => {
      const initialState = Map({
        isShowGiftBox: false,
      });
      const action = toggleGiftBox();
      const expectedState = Map({
        isShowGiftBox: true,
      });
      const state = watchLive(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('action creators', () => {
    it('can get wether the gift box is showing', () => {
      const state = Map({
        isShowGiftBox: true,
      });
      expect(getIsShowGiftBox(state)).toEqual(true);
    });
  });
});
