import { put, call, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';
import { fetchLive, fetchLiveFinish, fetchLiveStart, FETCH_LIVE } from '../../ducks/live';
import { didReceiveError, ERROR_MESSAGE, ERROR_TAG } from '../../ducks/error';
import * as service from '../../helpers/api';
import liveSagaWatcher, { liveSaga } from '../liveSaga';

jest.mock('../../helpers/api.js');

const payload = {
  id: 0,
  accessToken: 'token',
};

describe('LIVE SAGA', () => {
  const data = {};
  data.gen = cloneableGenerator(liveSaga)(payload);

  describe('FETCH LIVE', () => {
    it('can indicate a live fetching is started', () => {
      const tested = data.gen.next().value;
      expect(tested).toEqual(put(fetchLiveStart()));
    });

    it('can indicate calling api', () => {
      const tested = data.gen.next().value;
      expect(tested).toEqual(call(service.liveDataRetrieval, payload.id, payload.accessToken));
    });

    describe('fetching api failed', () => {
      data.clone = data.gen.clone();

      it('can fire the error message', () => {
        const tested = data.gen.next({ message: 'fail ' }).value;
        expect(tested).toEqual(put(didReceiveError(ERROR_TAG.LIVE_FETCH_ERROR, ERROR_MESSAGE.LIVE_FETCH)));
      });
    });

    describe('fetching api success', () => {
      it('start live', () => {
        const tested = data.clone.next(fetchLiveStart()).value;
        expect(tested).toEqual(put(fetchLiveStart()));
      });

      it('can indicate calling api', () => {
        const returnPayload = { message: 'success', live_lists: [] };
        const tested = data.clone.next(returnPayload).value;
        expect(tested).toEqual(call(service.liveDataRetrieval, payload.id, payload.accessToken));
      });

      it('can indicate success', () => {
        const returnPayload = { message: 'success', live_lists: [] };
        const tested = data.clone.next(returnPayload).value;
        expect(tested).toEqual(put(fetchLiveFinish(returnPayload.live_lists)));
      });

      it('then delayed for a 10 seconds', () => {
        const tested = data.clone.next().value;
        expect(tested).toEqual(call(delay, 10000));
      });
    });
  });
});

describe('Live Saga Watcher', () => {
  const data = liveSagaWatcher({ payload });

  it('can capture fetch live action', () => {
    const tested = data.next().value;
    expect(tested).toEqual(take(FETCH_LIVE));
  });
  it('call init the live saga', () => {
    const tested = data.next(fetchLive(payload)).value;
    expect(tested).toEqual(call(liveSaga, payload));
  });
});
