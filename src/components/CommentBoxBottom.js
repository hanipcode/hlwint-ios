import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleGiftBox } from '../ducks/watchLive';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles';

class CommentBoxBottom extends React.Component {
  static propTypes = {
    publishComment: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
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
    const { dispatch } = this.props;
    return (
      <View style={styles.commentBoxBottom.container}>
        <Text style={styles.commentBoxBottom.share}>Share</Text>
        <TextInput
          style={styles.commentBoxBottom.input}
          onChangeText={newText => this.onChangeText(newText)}
          value={text}
          onSubmitEditing={() => this.onSend()}
        />
        <Text style={styles.commentBoxBottom.send} onPress={() => this.onSend()}>
          Send
        </Text>
        <Text style={styles.commentBoxBottom.gift} onPress={() => dispatch(toggleGiftBox())}>
          Gift
        </Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(CommentBoxBottom);
