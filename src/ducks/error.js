import { Map, List } from 'immutable';

export const ERROR_TAG = {
  LOGIN_ERROR: 'ERROR_INITIALIZE_LOGIN',
  LOC_STORAGE_ERROR: 'ERROR_LOCAL_STORAGE',
  LIVE_FETCH_ERROR: 'ERROR_LIVE_FETCH',
};
export const ERROR_MESSAGE = {
  DEVICE_FAIL: 'Error when trying to connect to server, code: DFL',
  TASK_FAILL: 'Error when trying to connect to server, code: TFL',
  STORAGE_FAIL: 'Error when trying to reach the storage',
  LIVE_FETCH_FAIL: 'Error when getting list of live stream',
  LIVE_FETCH: 'Error Fetch Data not return Success Message',
  SERVER_INFO: 'Error fetch data from server info',
};

export const RECEIVE_ERROR = 'error/receive';
export const RESET_ERROR = 'error/reset';

export function didReceiveError(tag, message) {
  return {
    type: RECEIVE_ERROR,
    payload: {
      tag,
      message,
    },
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}

const initialState = Map({
  errorList: List(),
});
// Map({
//   errorTag: null,
//   errorMessage: null,
// })

const errorReducer = (state = initialState, action) => {
  if (action.type === RECEIVE_ERROR) {
    const { payload } = action;
    if (!state.get('errorList')) return state;
    return state.get('errorList').push(new Map({
      errorTag: payload.tag,
      errorMessage: payload.message,
    }));
  } else if (action.type === RESET_ERROR) {
    return initialState;
  }
  return state;
};

// selectors
export function isError(state) {
  return state.get('errorList').size > 0;
}

export function getLastError(state) {
  const errorList = state.get('errorList', null);
  if (!errorList) return null;
  const errorState = state.get('errorList').get(0);
  if (!errorState) {
    return null;
  }
  return {
    tag: errorState.get('errorTag'),
    message: errorState.get('errorMessage'),
  };
}

export default errorReducer;
