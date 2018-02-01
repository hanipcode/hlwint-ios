import { eventChannel, END, buffers } from 'redux-saga';
import { subscribe } from '../data/pubnub';

export default function listenToPubnubChannel(channelId) {
  return eventChannel((emitter) => {
    function messageHandler(handler) {
      const { message } = handler;
      emitter(message);
    }
    const subscription = subscribe(channelId, () => false, messageHandler);
    return () => {
      console.log('unsubscribe di listen');
      subscription.unsubscribe();
    };
  }, buffers.expanding(10));
}
