import { Map, List, fromJS, Seq } from 'immutable';

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
      "broadcast_title": "bb",
      "first_name": "Khant",
      "id": 625,
      "larger_profile_pic": null,
      "last_name": "Soe",
      "location": "",
      "nick_name": "khant625",
      "profile_pic": "https://graph.facebook.com/371163280020749/picture?type=large",
      "tag": Array [],
      "type": 1,
      "view_count": 34,
    },
  ],
*/
export function convertToState(liveListJson) {
  return liveListJson.map(liveItem => ({
    id: liveItem.id,
    name: `${liveItem.first_name} ${liveItem.last_name}`,
    liveImage: liveItem.larger_profile_pic || liveItem.profile_pic,
    viewCount: liveItem.view_count,
    tags: liveItem.tag,
    location: liveItem.location,
    isOfficial: liveItem.type === 4,
    title: liveItem.broadcast_title,
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
// export const getStreamIds = (state) => {
//   const list = state.get('liveList');
//   const lazySeq = Seq(list);
//   return lazySeq.map(streamData => streamData.id);
// };
