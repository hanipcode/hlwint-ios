import { Map, List, fromJS } from 'immutable';

export const FETCH_EXPLORE = 'explore/fetchExploreData';
export const FETCH_EXPLORE_START = 'explore/fetchExploreFetching';
export const FETCH_EXPLORE_FINISH = 'explore/fetchExploreFinish';
export const FETCH_EXPLORE_STOP = 'explore/fetchExploreStop';
export const FETCH_EXPLORE_ERROR = 'explore/fetchExploreError';

export function fetchExplore() {
  return {
    type: FETCH_EXPLORE,
  };
}

export function fetchExploreStart() {
  return {
    type: FETCH_EXPLORE_START,
  };
}

export function fetchExploreFinish(officialImage, topRank, topTags, topFollower) {
  return {
    type: FETCH_EXPLORE_FINISH,
    officialImage,
    topRank,
    topTags,
    topFollower,
  };
}

export function fetchExploreError(error) {
  return {
    type: FETCH_EXPLORE_ERROR,
    error,
  };
}

/* API DATA
    Object {
  "image": "https://dashboard.imliveapp.com/public/mlive_img/mlive.png",
  "message": "success",
  "nearby": Array [
    Object {
      "id": 3018,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/1583112471734457/picture?type=large",
    },
    Object {
      "id": 4112,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/1668681356530530/picture?type=large",
    },
    Object {
      "id": 1768,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/1737245439621574/picture?type=large",
    },
    Object {
      "id": 3194,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/2018473215104706/picture?type=large",
    },
    Object {
      "id": 2085,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/1972688356314634/picture?type=large",
    },
    Object {
      "id": 52,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/362155060911834/picture?type=large",
    },
    Object {
      "id": 16,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/1602460376480950/picture?type=large",
    },
    Object {
      "id": 70,
      "live": 0,
      "u_profile_pic": "https://dashboard.imliveapp.com/public/mlive_img/13_23_5970_profile.png",
    },
    Object {
      "id": 27,
      "live": 0,
      "u_profile_pic": "https://graph.facebook.com/395585250857991/picture?type=large",
    },
    Object {
      "id": 1823,
      "live": 0,
      "u_profile_pic": "https://dashboard.imliveapp.com/public/mlive_img/09_54_401823_profile.png",
    },
  ],
  "tag": Array [
    Object {
      "id": 8,
      "t_color_code": "#975565",
      "t_count": 58,
      "t_name": "#shorttrip",
      "t_status": "active",
    },
    Object {
      "id": 151,
      "t_color_code": "#de6429",
      "t_count": 56,
      "t_name": "#singing",
      "t_status": "active",
    },
    Object {
      "id": 2,
      "t_color_code": "#958882",
      "t_count": 56,
      "t_name": "#singing",
      "t_status": "active",
    },
    Object {
      "id": 4,
      "t_color_code": "#778766",
      "t_count": 54,
      "t_name": "#funtime",
      "t_status": "active",
    },
    Object {
      "id": 24,
      "t_color_code": "#778766",
      "t_count": 54,
      "t_name": "#popmusic",
      "t_status": "active",
    },
    Object {
      "id": 16,
      "t_color_code": "#009848",
      "t_count": 52,
      "t_name": "#party",
      "t_status": "active",
    },
    Object {
      "id": 21,
      "t_color_code": "#009848",
      "t_count": 51,
      "t_name": "#happyweekend",
      "t_status": "active",
    },
    Object {
      "id": 1,
      "t_color_code": "#CCAAEE",
      "t_count": 51,
      "t_name": "#beautytips",
      "t_status": "active",
    },
    Object {
      "id": 7,
      "t_color_code": "#958882",
      "t_count": 50,
      "t_name": "#nightout",
      "t_status": "active",
    },
    Object {
      "id": 18,
      "t_color_code": "#975565",
      "t_count": 50,
      "t_name": "#beyourvalentine",
      "t_status": "active",
    },
  ],
  "toprank": Array [
    Object {
      "id": 7397,
      "live": 0,
      "rank": "9265",
      "u_profile_pic": "https://dashboard.imliveapp.com/public/mlive_img/16_46_397397_profile.png",
    },
    Object {
      "id": 3018,
      "live": 0,
      "rank": "4471",
      "u_profile_pic": "https://graph.facebook.com/1583112471734457/picture?type=large",
    },
    Object {
      "id": 973,
      "live": 0,
      "rank": "2240",
      "u_profile_pic": "https://graph.facebook.com/933924376762581/picture?type=large",
    },
    Object {
      "id": 287,
      "live": 0,
      "rank": "1080",
      "u_profile_pic": "https://dashboard.imliveapp.com/public/mlive_img/10_30_25287_profile.png",
    },
    Object {
      "id": 2494,
      "live": 0,
      "rank": "641",
      "u_profile_pic": "https://graph.facebook.com/460452244350459/picture?type=large",
    },
    Object {
      "id": 7462,
      "live": 0,
      "rank": "545",
      "u_profile_pic": "https://dashboard.imliveapp.com/public/mlive_img/18_09_037462_profile.png",
    },
    Object {
      "id": 3194,
      "live": 0,
      "rank": "472",
      "u_profile_pic": "https://graph.facebook.com/2018473215104706/picture?type=large",
    },
    Object {
      "id": 3861,
      "live": 0,
      "rank": "407",
      "u_profile_pic": "https://dashboard.imliveapp.com/public/mlive_img/19_52_363861_profile.png",
    },
    Object {
      "id": 1282,
      "live": 0,
      "rank": "400",
      "u_profile_pic": "https://graph.facebook.com/382061405577546/picture?type=large",
    },
    Object {
      "id": 1871,
      "live": 0,
      "rank": "362",
      "u_profile_pic": "https://graph.facebook.com/1946487648959127/picture?type=large",
    },
  ],
}
*/

/*
  NEARBY == TOP FOLLOWER
  TOPRANK = TOP RANK
  The api still inconsistent
*/

const initialState = Map({
  officialImage: null,
  topFollower: List(),
  topRank: List(),
  topTags: List(),
  isFetching: false,
  error: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXPLORE_START:
      return state.withMutations(currentState =>
        currentState.set('isFetching', true).set('error', null));
    case FETCH_EXPLORE_FINISH:
      return state.withMutations(currentState =>
        currentState
          .set('officialImage', action.officialImage)
          .set('topFollower', fromJS(action.topFollower))
          .set('topRank', fromJS(action.topRank))
          .set('topTags', fromJS(action.topTags))
          .set('isFetching', false));
    case FETCH_EXPLORE_ERROR:
      return state.withMutations(currentState =>
        currentState.set('error', action.error).set('isFetching', false));
    default:
      return state;
  }
}

export const getOfficialImage = state => state.get('officialImage');
export const getTopFollower = state => state.get('topFollower');
export const getTopTags = state => state.get('topTags');
export const getTopRank = state => state.get('topRank');
export const getIsFetching = state => state.get('isFetching');
