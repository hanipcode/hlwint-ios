import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import { publishComment, subscribe } from '../data/pubnub';
import CommentItem from './CommentItem';
import CommentBoxBottom from './CommentBoxBottom';

class CommentBox extends React.Component {
  static propTypes = {
    broadcasterId: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      u_profile_pic: PropTypes.string.isRequired,
      u_full_name: PropTypes.string.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      subscription: null,
      userInfo: null,
    };
  }
  async componentWillMount() {
    const { subscription } = this.state;
    const { broadcasterId, userInfo } = this.props;
    const newSubscription = await subscribe('43', null, message => this.messageHandler(message));
    await this.setState({
      userInfo,
      subscription: newSubscription,
    });
    // setInterval(() => {
    //   comments.push({
    //     id: comments.length + 1,
    //     name: `Nama Ste ${comments.length + 1}`,
    //     image: `https://robohash.org/21${comments.length}`,
    //     content: 'Lorem lorem ipsum ?',
    //   });
    //   this.setState({ comments }, () => this.scroll.scrollToEnd());
    // }, 31000);
  }

  pushComment(sender, text) {
    const { id, name, avatar } = sender;
    const { comments } = this.state;
    comments.push({
      id,
      name,
      image: avatar,
      content: text,
    });
    this.setState({ comments }, () => requestAnimationFrame(() => this.scroll.scrollToEnd()));
  }

  messageHandler(handler) {
    console.log('new comment');
    console.log(handler);
    const { message } = handler;
    const { type, sender, text } = message;
    if (type !== 'comment') return;
    this.pushComment(sender, text);
  }

  render() {
    const { comments } = this.state;
    return (
      <View style={styles.commentBox.container}>
        <View style={{ height: 200 }}>
          <ScrollView
            contentContainerStyle={styles.commentBox.scrollViewContainer}
            contentOffset={{ x: 0, y: 1 }}
            ref={(scrollView) => {
              this.scroll = scrollView;
            }}
          >
            {comments.map(comment => (
              <CommentItem
                key={comment.id}
                name={comment.name}
                avatar={comment.image}
                content={comment.content}
              />
            ))}
          </ScrollView>
          <LinearGradient
            style={styles.commentBox.darkOverlay}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
        <CommentBoxBottom />
      </View>
    );
  }
}

export default CommentBox;
