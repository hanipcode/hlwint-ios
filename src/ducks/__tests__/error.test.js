import { List, Map } from 'immutable';
import errorReducer, {
  RECEIVE_ERROR,
  ERROR_TAG,
  RESET_ERROR,
  didReceiveError,
  resetError,
  isError,
  getLastError,
} from '../error';

const initialState = Map({
  errorList: List(),
});
const payload = {
  tag: ERROR_TAG.LOGIN_ERROR,
  message: 'FAILED to initiate User Login',
};

describe('ERROR REDUCERS', () => {
  describe('ACTION CREATORS', () => {
    it('can generate action to create error', () => {
      const expectedAction = {
        type: RECEIVE_ERROR,
        payload,
      };
      expect(didReceiveError(payload.tag, payload.message)).toEqual(expectedAction);
    });
    it('can generate action to reset error', () => {
      const expectedAction = {
        type: RESET_ERROR,
      };
      expect(resetError()).toEqual(expectedAction);
    });
  });

  describe('REDUCER', () => {
    it('can produce error correctly', () => {
      const expectedState = List([
        Map({
          errorTag: payload.tag,
          errorMessage: payload.message,
        }),
      ]);
      const action = didReceiveError(payload.tag, payload.message);
      const currentState = errorReducer(initialState, action);
      const actionEmpty = { type: null };
      const currentStateWithoutAction = errorReducer(initialState, actionEmpty);
      expect(currentState.size).toEqual(1);
      expect(currentState).toEqual(expectedState);
      expect(currentStateWithoutAction).toEqual(initialState);
    });

    it('can reset the error', () => {
      const currentState = List([
        Map({
          errorTag: payload.tag,
          errorMessage: payload.message,
        }),
      ]);
      const action = resetError();
      const expectedState = errorReducer(currentState, action);
      expect(expectedState.get('errorList').size).toEqual(0);
      expect(expectedState).toEqual(initialState);
    });
  });

  describe('SELECTORS', () => {
    let currentState;
    beforeEach(() => {
      currentState = Map({
        errorList: List([
          Map({
            errorTag: payload.tag,
            errorMessage: payload.message,
          }),
        ]),
      });
    });
    it('can get wether there is an error or not', () => {
      const isErr = isError(currentState);
      const isInitialStateError = isError(initialState);
      expect(isErr).toBe(true);
      expect(isInitialStateError).toBe(false);
    });
    it('can get the newest error on the stack', () => {
      const expectedData = {
        tag: payload.tag,
        message: payload.message,
      };
      const errorData = getLastError(currentState);
      expect(errorData).toEqual(expectedData);
    });
  });
});
