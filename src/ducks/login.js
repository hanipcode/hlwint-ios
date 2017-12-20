import { Map, fromJS } from 'immutable';
// import * as Service from '../helpers/api';

// CONSTANTS
export const USER_FINISH_LOGIN = 'login/finishLogin';
export const USER_ALREADY_LOGGEDIN = 'login/alreadyLoggedIn';
export const USER_LOGIN = 'login/userLogin';
export const USER_LOGOUT = 'login/userLogout';
export const USER_START_LOGIN = 'login/startLogin';
export const USER_START_LOGOUT = 'login/startLogout';

// ACTION CREATOR
export function startLogin() {
  return {
    type: USER_START_LOGIN,
  };
}

export function startLogout() {
  return {
    type: USER_START_LOGOUT,
  };
}

export function reLogin() {
  return {
    type: USER_ALREADY_LOGGEDIN,
  };
}

function login(
  firstName,
  lastName,
  dateOfBirth,
  gender,
  email,
  phoneNumber,
  profilePic,
  socialId,
  socialType,
) {
  return {
    type: USER_LOGIN,
    payload: {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      profilePic,
      socialId,
      socialType,
    },
  };
}

function finishLogin(accessToken, userData) {
  return {
    type: USER_FINISH_LOGIN,
    accessToken,
    userData,
  };
}

function logout() {
  return {
    type: USER_LOGOUT,
  };
}

export const actionCreators = {
  login,
  logout,
  startLogin,
  startLogout,
  finishLogin,
};

// REDUCER
const initialState = Map({
  accessToken: null,
  userData: Map(),
  isFetching: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_START_LOGIN:
      return state.set('isFetching', true);
    case USER_START_LOGOUT:
      return state.set('isFetching', true);
    case USER_FINISH_LOGIN:
      return state.withMutations(currentState =>
        currentState
          .set('accessToken', action.accessToken)
          .set('userData', fromJS(action.userData))
          .set('isFetching', false));
    case USER_LOGOUT:
      return state.withMutations(currentState =>
        currentState
          .set('accessToken', null)
          .set('userData', Map())
          .set('isFetching', false));
    case USER_ALREADY_LOGGEDIN:
      return state.set('isFetching', true);
    default:
      return state;
  }
}

// SELECTORS

export const selectUserId = state => state.get('userData').toJs();
export const selectAccessToken = state => state.get('accessToken');
export const selectIsLoading = state => state.get('isFetching');
