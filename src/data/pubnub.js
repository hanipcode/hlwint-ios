import PubNub from 'pubnub';
import _ from 'lodash';

const config = {
  pubnub: {
    subscribeKey: 'sub-c-c4f748aa-0576-11e7-930d-02ee2ddab7fe',
    publishKey: 'pub-c-62f57f10-f1f5-4889-9c82-c4f387b2c3c9',
  },
};

const MESSAGE_TYPE = {
  MESSAGE_LIKE: 'like',
  MESSAGE_HEART: 'heart',
  COMMENT_MESSAGE: 'comment',
  CLOSED: 'closed',
};
let connection;
const presenceSubscriptions = new Set();

const messageSubscriptons = new Set();

const identifier = () =>
  Math.random()
    .toString(10)
    .slice(12);

export const connect = () => {
  if (connection) {
    return connection;
  }

  connection = new Promise((resolve, reject) => {
    const uuid = identifier();
    const options = Object.assign({}, config.pubnub, { uuid });

    const pubnub = new PubNub(options);

    const initialHandler = {
      status: (statusEvent) => {
        switch (statusEvent.category) {
          case 'PNConnectedCategory':
          case 'PNNetworkUpCategory':
            resolve(pubnub);
            break;
          case 'PNDisconnectedCategory':
          case 'PNNetworkDownCategory':
            reject(new Error('Received a network-down message'));
            break;
          default:
            return;
        }

        pubnub.removeListener(initialHandler);

        pubnub.addListener({
          message() {
            messageSubscriptons.forEach(handler => handler(...arguments));
          },
          presence() {
            presenceSubscriptions.forEach(handler => handler(...arguments));
          },
          status: (statusEvent) => {
            switch (statusEvent.category) {
              case 'PNDisconnectedCategory':
              case 'PNNetworkDownCategory':
                connect(); // reconnect
                break;
              case 'PNTimeoutCategory':
                console.log('Timeout');
                break;
            }
          },
        });
      },
    };

    pubnub.addListener(initialHandler);

    return handshake(pubnub)
      .then(() => resolve({ uuid, pubnub }))
      .catch(reject);
  });

  return connection;
};

export const disconnect = () => connect().then(({ pubnub }) => pubnub.stop());

const handshake = pubnub =>
  new Promise((resolve, reject) => {
    pubnub.time((status) => {
      if (status.error) {
        reject(new Error(`PubNub service failed to respond to time request: ${status.error}`));
      } else {
        resolve(pubnub);
      }
    });
  });

export const unsubscribe = (channel) => {
  console.log('nyoba unsub');
  connect().then(({ pubnub }) => {
    pubnub.unsubscribe({
      channels: [channel],
    });
  });
};

export const subscribe = (channel, presenceHandler, messageHandler) => {
  presenceSubscriptions.add(presenceHandler);

  messageSubscriptons.add(messageHandler);

  connect().then(({ pubnub }) => {
    pubnub.subscribe({
      channels: [channel],
      withPresence: true,
    });
  });

  return {
    unsubscribe: () => {
      presenceSubscriptions.delete(presenceHandler);

      messageSubscriptons.delete(messageHandler);
      return unsubscribe(channel);
    },
  };
};

export const participants = channel =>
  new Promise((resolve, reject) => {
    connect()
      .then(({ pubnub }) => {
        pubnub.hereNow(
          {
            channels: [channel],
            channelGroups: [],
            includeUUIDs: true,
            includeState: true,
          },
          (status, response) => {
            if (status.error) {
              reject(status.category);
            } else {
              resolve(response.channels[channel].occupants);
            }
          },
        );
      })
      .catch(reject);
  });

export const history = (channel, startTime) =>
  new Promise((resolve, reject) => {
    connect()
      .then(({ pubnub }) => {
        pubnub.history(
          {
            channel,
            start: startTime,
            count: 10,
          },
          (status, response) => {
            if (status.error) {
              reject(status.category);
            } else {
              resolve(response);
            }
          },
        );
      })
      .catch(reject);
  });

export const publishTypingState = (channel, userId, isTyping) =>
  connect().then(({ pubnub }) =>
    pubnub.setState({
      channels: [channel],
      state: { userId, isTyping },
    }));

export const publishMessage = (channel, message) =>
  new Promise((resolve, reject) => {
    connect()
      .then(({ pubnub }) =>
        pubnub.publish(
          {
            channel,
            message,
          },
          (status, response) => {
            if (status.error) {
              reject(status.category);
            } else {
              resolve();
            }
          },
        ))
      .catch(err => console.log(err));
  });

/*
 * SENDER OBject is :
 * sender: {
 *    id: int
 *    name: string
 *    avatar: string [url]
 * }
*/
export const publishComment = (broadcasterId, sender, text) =>
  new Promise((resolve, reject) => {
    connect()
      .then(({ pubnub }) =>
        pubnub.publish(
          {
            channel: broadcasterId,
            message: {
              type: MESSAGE_TYPE.COMMENT_MESSAGE,
              sender,
              text,
            },
          },
          (status, response) => {
            if (status.error) {
              reject(status.category);
            } else {
              resolve();
            }
          },
        ))
      .catch(err => console.log(err));
  });

export const publishHeart = (broadcasterId, sender) =>
  new Promise((resolve, reject) => {
    connect().then(({ pubnub }) =>
      pubnub.publish(
        {
          channel: broadcasterId,
          message: {
            type: MESSAGE_TYPE.MESSAGE_HEART,
            sender,
            text: '',
          },
        },
        (status, response) => {
          if (status.error) {
            reject(status.category);
          } else {
            resolve();
          }
        },
      ));
  });

export const publishCloseStream = (broadcasterId, sender) =>
  new Promise((resolve, reject) => {
    connect().then(({ pubnub }) =>
      pubnub.publish(
        {
          channel: broadcasterId,
          message: {
            type: MESSAGE_TYPE.CLOSED,
            sender,
          },
        },
        (status, response) => {
          if (status.error) {
            reject(status.category);
          } else {
            resolve();
          }
        },
      ));
  });
export const publishGift = (broadcasterId, sender, itemCount, itemName, itemImage) =>
  new Promise((resolve, reject) => {
    connect()
      .then(({ pubnub }) =>
        pubnub.publish(
          {
            channel: broadcasterId,
            message: {
              type: MESSAGE_TYPE.MESSAGE_LIKE,
              sender,
              text: '',
              item_count: itemCount,
              item_name: itemName,
              item_image: itemImage,
            },
          },
          (status, response) => {
            if (status.error) {
              console.log(status);
              reject(status.category);
            } else {
              console.log(
                'successed',
                response,
                broadcasterId,
                sender,
                itemCount,
                itemName,
                MESSAGE_TYPE.MESSAGE_LIKE,
              );

              resolve();
            }
          },
        ))
      .catch(err => console.log(err));
  });
