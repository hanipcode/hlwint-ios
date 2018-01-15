import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, FlatList } from 'react-native';
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
    };
    this.publishComment = this.publishComment.bind(this);
  }
  async componentWillMount() {
    const { broadcasterId } = this.props;
    const newSubscription = await subscribe(broadcasterId.toString(), null, message =>
      this.messageHandler(message));
    await this.setState({
      subscription: newSubscription,
    });
  }

  componentWillUnmount() {
    const { subscription } = this.state;
    if (subscription) {
      subscription.unsubscribe();
    }
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
    const { message } = handler;
    const { type, sender, text } = message;
    if (type !== 'comment') return;
    this.pushComment(sender, text);
  }

  publishComment(text) {
    const { broadcasterId, userInfo } = this.props;
    const { id, u_profile_pic, u_full_name } = userInfo;
    const sender = {
      id,
      name: u_full_name,
      avatar: u_profile_pic,
    };
    publishComment(broadcasterId.toString(), sender, text);
  }
  renderItem({ item: comment }) {
    return <CommentItem name={comment.name} avatar={comment.image} content={comment.content} />;
  }
  render() {
    const { comments } = this.state;
    return (
      <View style={styles.commentBox.container} pointerEvents="box-none">
        <View
          style={{ height: 200, backgroundColor: 'transparent', marginRight: 80 }}
          pointerEvents="box-none"
        >
          <FlatList
            contentContainerStyle={styles.commentBox.scrollViewContainer}
            contentOffset={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
            ref={(scrollView) => {
              this.scroll = scrollView;
            }}
            pointerEvents="auto"
            data={comments}
            renderItem={item => this.renderItem(item)}
            keyExtractor={(item, index) => `${item.id}index${index}`}
          />
        </View>
        <CommentBoxBottom publishComment={this.publishComment} />
      </View>
    );
  }
}

export default CommentBox;
