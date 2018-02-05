import React from 'react';
import { View, Text } from 'react-native';
import ChatEngineCore from 'chat-engine';
import typingIndicator from 'chat-engine-typing-indicator';
// import { MessageList, MessageEntry } from 'chat-engine-react-native';
import LoadingPage from '../components/LoadingPage';

const ChatEngine = ChatEngineCore.create({
  subscribeKey: 'sub-c-6f83427a-0967-11e8-be21-ca57643e6300',
  publishKey: 'pub-c-f1a02b91-cf7e-47c9-b429-dd4cecfc08a7',
});

class SingleChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: null,
      isLoading: true,
      me: null,
      invited: false,
    };
  }
  componentDidMount() {
    ChatEngine.connect('muhammad43');

    ChatEngine.on('$.ready', (data) => {
      const { me } = data;
      const chat = new ChatEngine.Chat('withGa10662');
      chat.plugin(typingIndicator({ timeout: 5000 }));
      chat.on('message', (payload) => {
        console.log('hai bosku');
      });
      this.setState({ chat, isLoading: false, me });
    });
  }
  componentDidUpdate() {
    if (this.state.chat && !this.state.invited) {
      const { chat } = this.state;
      console.log(ChatEngine.users);
      // chat.invite('ga10662');
      if (Object.keys(ChatEngine.global.users).length > 0) {
        console.log('akhirnya');
        console.log(ChatEngine.global.users, ChatEngine.global.users.ga10662);
        // chat.invite(ChatEngine.global.users.ga10662);
        // chat.emit('message', { text: 'Hai Bosku' });
      }
    }
  }
  render() {
    const { isLoading, chat, me } = this.state;
    return (
      <View style={{ paddingTop: 32 }}>
        {isLoading && <LoadingPage backgroundColor="#000" />}
        {!isLoading && (
          <View>
            <Text>Test</Text>
          </View>
        )}
      </View>
    );
  }
}

export default SingleChat;
