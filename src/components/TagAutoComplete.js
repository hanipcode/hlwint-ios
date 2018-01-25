import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, FlatList } from 'react-native';
import _ from 'lodash';
import ZawgyiText from './ZawgyiText';
import styles from '../styles';

class TagAutoComplete extends React.Component {
  static propTypes = {
    onTagListChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      tagList: [],
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
        <Text>{text === '' && 'Join The Fun #FunStream'}</Text>
        {_.map(words, (value, index) => {
          if (this.isHashtag(value)) {
            return (
              <Text key={`hash${value}${index}`} style={styles.autocomplete.tagText}>
                {value + ' '}
              </Text>
            );
          }
          return <Text key={'test'}>{value + ' '}</Text>;
        })}
      </Text>
    );
  }

  onChangeText(text) {
    const { tagList } = this.state;
    const newTagList = _.filter(text.split(' '), this.isHashtag);
    if (newTagList !== tagList) {
      this.setState({ text, tagList: newTagList });
      this.props.onTagListChange(newTagList);
    } else {
      this.setState({ text });
    }
  }

  /*
  eslint-enable
  */
  render() {
    const { text, tagList } = this.state;
    // const data = [...new Set(tagList)].splice(0, 2);
    return (
      <View style={styles.autocomplete.container}>
        <Text style={text === '' ? styles.autocomplete.placeholderText : styles.autocomplete.text}>
          {this.renderTextWithHastag()}
        </Text>
        <TextInput
          value={text}
          style={styles.autocomplete.input}
          autoGrow={false}
          multiline
          maxLength={48}
          onChangeText={text => this.onChangeText(text)}
        />
        <FlatList
          horizontal
          data={_.take(tagList, 2)}
          contentContainerStyle={styles.autocomplete.tagContainer}
          ListHeaderComponent={() => <Text style={{ color: '#FFF' }}>Tags : </Text>}
          renderItem={({ item }) => <ZawgyiText style={{ color: '#FFF' }}>{item}</ZawgyiText>}
        />
      </View>
    );
  }
}

export default TagAutoComplete;
