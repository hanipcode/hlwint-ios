import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, FlatList, Dimensions } from 'react-native';
import { List } from 'immutable';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import CommentItem from './CommentItem';
import CommentBoxBottom from './CommentBoxBottom';

const { height } = Dimensions.get('window');

class CommentBox extends React.Component {
  static propTypes = {
    commentList: PropTypes.instanceOf(List).isRequired,
    onSendCommentPress: PropTypes.func.isRequired,
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
    const { commentList, onSendCommentPress } = this.props;
    return (
      <View style={styles.commentBox.container} pointerEvents="box-none">
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
        <CommentBoxBottom publishComment={text => onSendCommentPress(text)} />
      </View>
    );
  }
}

export default CommentBox;
