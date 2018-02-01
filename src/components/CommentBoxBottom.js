import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleGiftBox } from '../ducks/watchLive';
import styles from '../styles';
import assets from '../assets';

class CommentBoxBottom extends React.Component {
  static propTypes = {
    publishComment: PropTypes.func.isRequired,
    toggleGiftBox: PropTypes.func.isRequired,
    onSharePress: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  onChangeText(text) {
    this.setState({ text });
  }
  onSend() {
    const { publishComment } = this.props;
    const { text } = this.state;
    if (text.length === 0) return;
    publishComment(text);
    this.setState({ text: '' });
  }
  render() {
    const { text } = this.state;
    const { toggleGiftBox, onSharePress } = this.props;
    return (
      <View style={styles.commentBoxBottom.container}>
        <TouchableOpacity style={styles.commentBoxBottom.share} onPress={onSharePress}>
          <Image style={styles.commentBoxBottom.image} source={assets.share} />
        </TouchableOpacity>
        <TextInput
          style={styles.commentBoxBottom.input}
          onChangeText={newText => this.onChangeText(newText)}
          value={text}
          onSubmitEditing={() => this.onSend()}
        />
        <TouchableOpacity style={styles.commentBoxBottom.send} onPress={() => this.onSend()}>
          <Image style={styles.commentBoxBottom.image} source={assets.plane} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentBoxBottom.gift}
          onPress={() => requestAnimationFrame(() => toggleGiftBox())}
        >
          <Image style={styles.commentBoxBottom.giftImage} source={assets.sendGift} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default CommentBoxBottom;
