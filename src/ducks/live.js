import { Map, List, fromJS } from 'immutable';

export const FETCH_LIVE = 'fetch/fetchLive';
export const FETCH_LIVE_START = 'fetch/fetchLiveStart';
export const FETCH_LIVE_FINISH = 'fetch/fetchLiveFinish';
export const FETCH_LIVE_STOP = 'fetch/stopLiveFetch';

export function fetchLive(payload) {
  return {
    type: FETCH_LIVE,
    payload,
  };
}

export function fetchLiveStart() {
  return {
    type: FETCH_LIVE_START,
  };
}

export function fetchLiveFinish(payload) {
  return {
    type: FETCH_LIVE_FINISH,
    payload,
  };
}

export function fetchLiveStop() {
  return {
    type: FETCH_LIVE_STOP,
  };
}

const initialState = Map({
  isFetching: false,
  liveList: List(),
});

/*
  "live_lists": Array [
    Object {
      "first_name": "Ashoka",
      "id": 1314,
      "larger_profile_pic": null,
      "last_name": "Ashoka",
      "nick_name": "ashoka1314",
      "profile_pic": "https://graph.facebook.com/167476340512637/picture?type=large",
      "type": 1,
      "view_count": 11,
    },
  ],
*/
export function convertToState(liveListJson) {
  return liveListJson.map(liveItem => ({
    id: liveItem.id,
    name: `${liveItem.first_name} ${liveItem.last_name}`,
    liveImage: liveItem.larger_profile_pic || liveItem.profile_pic,
    viewCount: liveItem.view_count,
  }));
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIVE_START:
      return state.set('isFetching', true);
    case FETCH_LIVE_FINISH:
      return state.withMutations(currentState =>
        currentState.set('isFetching', false).set('liveList', fromJS(action.payload)));
    default:
      return state;
  }
}

// Converter

export const getIsLoading = state => state.get('isFetching');
export const getStreamList = state => state.get('liveList');
