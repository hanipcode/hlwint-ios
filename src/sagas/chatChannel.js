import { eventChannel, END, buffers } from 'redux-saga';
import ChatEngineCore from 'chat-engine';

const ChatEngine = ChatEngineCore.create({
  subscribeKey: 'sub-c-6f83427a-0967-11e8-be21-ca57643e6300',
  publishKey: 'pub-c-f1a02b91-cf7e-47c9-b429-dd4cecfc08a7',
});

let ChatEngineConnection = null;
let currentUsername = null;

export default function listenToChat(username, fullName, profilePicture) {
  return eventChannel((emitter) => {
    ChatEngine.connect(username, {
      signedOnTime: new Date().getTime(),
      lastOnline: new Date(),
      fullName,
      profilePicture,
    });
    ChatEngine.on('$.ready', (data) => {
      ChatEngineConnection = ChatEngine;
      currentUsername = username;
      // console.log(ChatEngine.global.users.prototype); // eslint-disable-line
      emitter(ChatEngine.chats);
      // const chat = new ChatEngine.Chat('tutorial');
      // chat.on('$.connected', () => {
      //   console.log('yiihaa connected');
      //   emitter('connected bosku');
      // });
      // chat.emit('message', { text: `${username} said HI BRO!!!` });
      // chat.on('message', (payload) => {
      //   emitter(payload);
      // });

      // const withGa = new ChatEngine.Chat('MuhammadWithGa', true);
      // const otherUser = ChatEngine.global.users.ga10662;
      // alert(otherUser);
      // withGa.invite(otherUser);
      // withGa.emit('message', { text: 'JEDERRRRRRR uwuwuwuwu' });

      data.me.direct.on('$.invite', (payload) => {
        const privChat = new ChatEngine.Chat(payload.data.channel);
        console.log('you has been invited');
        privChat.on('message', (payload) => {
          console.log('messaged uwuwuwu');
          emitter(payload);
        });
      });
    });

    return () => {
      console.log('chat di close');
    };
  });
}

export function chatWithUser(userTarget) {
  return eventChannel((emitter) => {
    if (!ChatEngineConnection) {
      alert('jeder');
      emitter(END);
    }
    console.log(currentUsername);
    const withUserTarget = new ChatEngine.Chat(`${currentUsername}With${userTarget}${Math.random(1000)}`);
    return () => {
      console.log('private chat di close');
    };
  });
}
