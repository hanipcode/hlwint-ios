import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles';

class TagAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  isHashtag(word) {
    return word[0] === '#';
  }
  /*
  eslint-disable
  */
  renderTextWithHastag() {
    const { text } = this.state;
    const words = text.split(' ');
    return (
      <Text>
        {text === '' && 'Your Stream description and #Tags'}
        {words.map((value, index) => {
          if (this.isHashtag(value)) {
            return (
              <Text key={`hash${value}${index}`} style={{ color: 'red' }}>
                {value}
              </Text>
            );
          }
          return <Text key={'test'}>{value} </Text>;
        })}
      </Text>
    );
  }
  /*
  eslint-enable
  */
  render() {
    const { text } = this.state;
    return (
      <View style={styles.autocomplete.container}>
        <Text style={styles.autocomplete.text}>{this.renderTextWithHastag()}</Text>
        <TextInput
          value={text}
          style={styles.autocomplete.input}
          autoGrow={false}
          multiline
          onChangeText={(text) => {
            this.setState({ text });
          }}
        />
      </View>
    );
  }
}

export default TagAutoComplete;
