import { Map, fromJS } from 'immutable';
import loginReducer, { actionCreators } from '../login';

// prepare mocking
jest.unmock('../../helpers/api.js');
const initialState = Map({
  accessToken: null,
  userData: null,
  isFetching: false,
});

const accessToken = '12500ABTEST';
const userData = {
  firstName: 'Ko',
  lastName: 'Kyaw',
  gender: 'male',
  dateOfBirth: null,
  email: null,
  phoneNumber: '08',
  profilePic: 'https://graph.facebook.com/367599367030660/picture?type=large',
  city: 'Yangon',
  facebookId: '367599367030660',
};

describe('LOGIN Reducers', () => {
  describe('ACTION CREATORS', () => {
    it('should be able to initiate login', () => {
      const expectedAction = {
        type: 'login/userLogin',
        payload: {},
      };
      expect(actionCreators.login()).toEqual(expectedAction);
    });
    it('should be able to create login action', () => {
      const expectedAction = {
        type: 'login/finishLogin',
        accessToken,
        userData,
      };
      expect(actionCreators.finishLogin(accessToken, userData)).toEqual(expectedAction);
    });

    it('should be able to create logout actiion', () => {
      const expectedAction = {
        type: 'login/userLogout',
      };
      expect(actionCreators.logout()).toEqual(expectedAction);
    });
    it('should be able to make start login action', () => {
      const expectedAction = {
        type: 'login/startLogin',
      };
      expect(actionCreators.startLogin()).toEqual(expectedAction);
    });
    it('should be able to make start logout action', () => {
      const expectedAction = {
        type: 'login/startLogout',
      };
      expect(actionCreators.startLogout()).toEqual(expectedAction);
    });
  });

  describe('REDUCERS', () => {
    it('should be able to get inital reducer correctly', () => {
      const currentState = loginReducer(initialState, {});
      expect(currentState).toEqual(initialState);
    });

    it('Should be able to return state correctly when user login', () => {
      const startState = Map({
        accessToken: null,
        userData: null,
        isFetching: true,
      });
      const expectedState = Map({
        accessToken,
        userData: fromJS(userData),
        isFetching: false,
      });
      const loginAction = actionCreators.finishLogin(accessToken, userData);
      const currentState = loginReducer(startState, loginAction);
      expect(currentState).toEqual(expectedState);
    });

    it('should be able to return state correctly when user logout', () => {
      const startState = Map({
        accessToken,
        userData,
        isFetching: true,
      });
      const expectedState = Map({
        accessToken: null,
        userData: Map(),
        isFetching: false,
      });
      const logoutAction = actionCreators.logout();
      const currentState = loginReducer(startState, logoutAction);
      expect(currentState).toEqual(expectedState);
    });

    it('should be able to indicate LOADING when login started', () => {
      const startState = Map({
        isFetching: false,
      });
      const loginStart = actionCreators.startLogin();
      const currentState = loginReducer(startState, loginStart);
      expect(currentState.get('isFetching')).toEqual(true);
    });

    it('should be able to indicate LOADING when logout started', () => {
      const startState = Map({
        isFetching: false,
      });
      const logoutStart = actionCreators.startLogout();
      const currentState = loginReducer(startState, logoutStart);
      expect(currentState.get('isFetching')).toEqual(true);
    });
  });
});
