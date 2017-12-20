import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { actionCreators } from '../../ducks/login';
import loginSaga from '../loginSaga';
import * as service from '../../helpers/api';

// jest.mock('../../helpers/api.js');
// import { getUserAgent } from 'react-native-device-info';

jest.mock('react-native-device-info', () => ({
  getUserAgent: jest.fn().mockImplementation(() => 'agent'),
}));

global.fetch = require('jest-fetch-mock');
// service.googleLogin = jest.fn().mockReturnValue({
//   json: jest.fn().mockReturnValue({
//     data: {
//       u_token: '',
//       id: '',
//     },
//   }),
// });

const payload = {
  firstName: 'test',
  lastName: 'name',
  dateOfBirth: '',
  gender: 'male',
  email: '',
  phoneNumber: '',
  profilePic: '',
  socialId: '',
  socialType: 'facebook',
};

function buildFetchMock(data) {
  return {
    status: 200,
    json: jest.fn().mockImplementation(() => ({
      data,
    })),
  };
}

describe('LOGIN SAGA', () => {
  const sagas = {};
  sagas.gen = cloneableGenerator(loginSaga)({ payload });
  const loginData = {
    id: '',
    u_token: '',
  };

  it('should wait a user to tap login facebook', () => {
    expect(sagas.gen.next().value).toEqual(put(actionCreators.startLogin()));
    expect(sagas.gen.next(buildFetchMock(loginData)).value).toEqual(call(
      service.facebookLogin,
      payload.firstName,
      payload.lastName,
      payload.dateOfBirth,
      payload.gender,
      payload.email,
      payload.phoneNumber,
      payload.profilePic,
      payload.socialId,
    ));
  });
  it('should be able to login with google as well', async () => {
    payload.socialType = 'google';
    sagas.gen = cloneableGenerator(loginSaga)({ payload });
    fetch.mockResponse(buildFetchMock(loginData));
    expect(sagas.gen.next().value).toEqual(put(actionCreators.startLogin()));
    expect(sagas.gen.next(buildFetchMock(loginData)).value).toEqual(call(
      service.googleLogin,
      payload.firstName,
      payload.lastName,
      payload.dateOfBirth,
      payload.gender,
      payload.email,
      payload.phoneNumber,
      payload.profilePic,
      payload.socialId,
    ));
  });
});
