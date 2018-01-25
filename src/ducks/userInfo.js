import { Map, fromJS } from 'immutable';

// DATA FROM SERVER
/*
    "bot": 0,
    "data_usage": null,
    "id": 384,
    "u_account_status": "active",
    "u_biography": null,
    "u_city": "Pathein",
    "u_coins": 3620,
    "u_created_time": "2017-11-13 15:36:22",
    "u_date_of_birth": "null",
    "u_device_os": "android",
    "u_duration": "00:00:00",
    "u_email": "null",
    "u_facebook_id": "367599367030660",
    "u_fan_count": 0,
    "u_first_name": "Ko",
    "u_follower_count": 1,
    "u_full_name": "Ko Kyaw",
    "u_gender": "female",
    "u_google_id": "null",
    "u_income": 0,
    "u_ip_address": "119.2.52.244",
    "u_key_id": "91600",
    "u_larger_profile_pic": null,
    "u_last_device": "android test",
    "u_last_login_time": "2018-01-17 13:30:11",
    "u_last_name": "Kyaw",
    "u_nick_name": "ko384",
    "u_phone_number": "09",
    "u_profile_pic": "https://graph.facebook.com/367599367030660/picture?type=large",
    "u_reason_banned": "",
    "u_reward_status": 0,
    "u_token": "Nxnh8YrnscLLXTKOygyr13FNQuQEPH46MloyYnfXjQstwGWaUmyhz4zzmwzV",
    "u_type": 1,
*/
function convertToState(data) {
  return {
    id: data.id,
    coin: data.u_coins,
    fullName: data.u_full_name,
    gender: data.u_gender,
    profilePic: data.u_profile_pic,
  };
}

export const FETCH_USER_PROFILE = 'userInfo/fetchUserProfile';
export const SET_USER_PROFILE = 'userInfo/setUserProfile';

export function fetchUserProfile() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function setUserProfile(profileData) {
  return {
    type: SET_USER_PROFILE,
    profileData,
  };
}

const initialState = Map({
  profileData: Map({
    id: null,
    coin: 20,
    fullName: '',
    gender: '',
    profilePic: null,
  }),
});

export default function reducer(state = initialState, action) {
  if (action.type === SET_USER_PROFILE) {
    return state.set('profileData', fromJS(convertToState(action.profileData)));
  }
  return state;
}

export const getUserCoin = state => state.getIn(['profileData', 'coin']);
