import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles';

class CommentBoxBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text,
    };
  }
  onChangeText(text) {
    const { text } = this.state;
    this.setState({ text });
  }
  render() {
    const { text } = this.state;
    return (
      <View style={styles.commentBoxBottom.container}>
        <Text style={styles.commentBoxBottom.share}>Share</Text>
        <TextInput
          style={styles.commentBoxBottom.input}
          onChangeText={newText => this.onChangeText(newText)}
          value={text}
        />
        <Text style={styles.commentBoxBottom.send}>Send</Text>
        <Text style={styles.commentBoxBottom.gift}>Gift</Text>
      </View>
    );
  }
}

export default CommentBoxBottom;
