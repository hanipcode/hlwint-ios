import { Map, List, fromJS } from 'immutable';
import liveReducer, {
  FETCH_LIVE,
  FETCH_LIVE_START,
  FETCH_LIVE_FINISH,
  FETCH_LIVE_STOP,
  fetchLiveStart,
  fetchLiveFinish,
  fetchLiveStop,
  fetchLive,
  getIsLoading,
  getStreamList,
  convertToState,
} from '../live';

const payloadToken = {
  accessToken: 'token',
  id: 0,
};

const payloadReturn = [
  {
    first_name: 'Ashoka',
    id: 1314,
    larger_profile_pic: null,
    last_name: 'Ashoka',
    nick_name: 'ashoka1314',
    profile_pic: 'https://graph.facebook.com/167476340512637/picture?type=large',
    type: 1,
    view_count: 11,
  },
];

describe('LIVE REDUCER', () => {
  describe('ACTION CREATORS', () => {
    it('can fire live start action for the saga to run', () => {
      const expectedAction = {
        type: FETCH_LIVE,
        payload: payloadToken,
      };
      expect(fetchLive(payloadToken)).toEqual(expectedAction);
    });
    it('can make action to indicate live start loading', () => {
      const expectedAction = {
        type: FETCH_LIVE_START,
      };
      expect(fetchLiveStart()).toEqual(expectedAction);
    });

    it('can make action to indicate live ended', () => {
      const expectedAction = {
        type: FETCH_LIVE_FINISH,
        payload: payloadReturn,
      };
      expect(fetchLiveFinish(payloadReturn)).toEqual(expectedAction);
    });

    it('can stop the live fetch', () => {
      const expectedAction = {
        type: FETCH_LIVE_STOP,
      };
      expect(fetchLiveStop()).toEqual(expectedAction);
    });
  });

  describe('REDUCERS', () => {
    it('can convert to proper desired state before inserting into state', () => {
      const json = payloadReturn;
      const expectedState = [
        {
          id: 1314,
          name: `${payloadReturn[0].first_name} ${payloadReturn[0].last_name}`,
          liveImage: payloadReturn[0].profile_pic,
          viewCount: payloadReturn[0].view_count,
        },
      ];
      expect(convertToState(json)).toEqual(expectedState);
    });

    it('can indicate login correctly when live fetch start', () => {
      const initialState = Map({
        isFetching: false,
        liveList: List(),
      });
      const expectedState = Map({
        isFetching: true,
        liveList: List(),
      });
      const action = fetchLiveStart();
      const currentState = liveReducer(initialState, action);
      expect(currentState).toEqual(expectedState);
    });

    it('can get the data after live fetch ended', () => {
      const initialState = Map({
        isFetching: true,
        liveList: List(),
      });
      const expectedState = Map({
        isFetching: false,
        liveList: fromJS(payloadReturn),
      });
      const action = fetchLiveFinish(payloadReturn);
      const currentState = liveReducer(initialState, action);
      expect(currentState).toEqual(expectedState);
    });
  });

  describe('SELECTORS', () => {
    const currentState = Map({
      isFetching: true,
      liveList: List(),
    });

    it('can get loading state', () => {
      const testedSelect = getIsLoading(currentState);
      expect(testedSelect).toEqual(true);
    });

    it('can get live list', () => {
      const testedSelect = getStreamList(currentState);
      expect(testedSelect).toEqual(List());
    });
  });
});
