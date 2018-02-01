import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { List } from 'immutable';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import CommentItem from './CommentItem';
import CommentBoxBottom from './CommentBoxBottom';
import CommentBoxBottomBroadcaster from './CommentBoxBottomBroadcaster';

const { height } = Dimensions.get('window');
const KEYBOARD_HEIGHT = height / 1.618 + 22;

class CommentBox extends React.Component {
  static propTypes = {
    commentList: PropTypes.instanceOf(List).isRequired,
    onSendCommentPress: PropTypes.func.isRequired,
    onGiftIconPress: PropTypes.func,
    isBroadcaster: PropTypes.bool,
    onCameraPress: PropTypes.func,
    onSharePress: PropTypes.func.isRequired,
  };
  static defaultProps = {
    onGiftIconPress: null,
    isBroadcaster: false,
    onCameraPress: null,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.commentList === nextProps.commentList || nextProps.commentList.size < 5) return;
    this.scroll.scrollToEnd();
  }
  renderItem({ item: comment }) {
    return (
      <CommentItem
        name={comment.getIn(['sender', 'name'])}
        avatar={comment.getIn(['sender', 'avatar'])}
        content={comment.get('text')}
      />
    );
  }
  render() {
    const {
      commentList,
      onSendCommentPress,
      onGiftIconPress,
      isBroadcaster,
      onCameraPress,
      onSharePress,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.commentBox.container} pointerEvents="box-none">
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={KEYBOARD_HEIGHT}>
            <View
              style={{ height: height / 4, backgroundColor: 'transparent', marginRight: 80 }}
              pointerEvents="box-none"
            >
              <FlatList
                contentContainerStyle={styles.commentBox.scrollViewContainer}
                contentOffset={{ x: 0, y: 0 }}
                style={{ flex: 1 }}
                ref={(scrollView) => {
                  this.scroll = scrollView;
                }}
                pointerEvents="auto"
                data={commentList.toArray()}
                renderItem={item => this.renderItem(item)}
                keyExtractor={(item, index) => `${item.id}index${index}`}
              />
            </View>
            {!isBroadcaster && (
              <CommentBoxBottom
                publishComment={text => onSendCommentPress(text)}
                toggleGiftBox={() => onGiftIconPress()}
                onSharePress={onSharePress}
              />
            )}
            {isBroadcaster && (
              <CommentBoxBottomBroadcaster
                publishComment={text => onSendCommentPress(text)}
                onCameraPress={onCameraPress}
                onSharePress={onSharePress}
              />
            )}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CommentBox;
