/*
    THIS REDUCER IS ONLY FOR BROADCAST SPESIFIC REDUCER,
    LIKE CAMERA POSITION (FRONT / REAR)
*/
import { Map } from 'immutable';

export const TOGGLE_CAMERA = 'broadcast/toggleCamera';

export function toggleCamera() {
  return {
    type: TOGGLE_CAMERA,
  };
}
const initialState = Map({
  isFrontCamera: false,
});

export default function reducer(state = initialState, action) {
  if (action.type === TOGGLE_CAMERA) {
    const isFrontCamera = state.get('isFrontCamera');
    return state.set('isFrontCamera', !isFrontCamera);
  }
  return state;
}

export const getIsFrontCamera = state => state.get('isFrontCamera');
