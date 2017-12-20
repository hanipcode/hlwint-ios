import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import Storage from '../data/storage';
import styles from '../styles';
import AutoCompleteTag from './TagAutoComplete';
import Button from './Button';

class StreamInfo extends React.Component {
  static propTypes = {
    onLivePress: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      cover: null,
    };
  }
  async componentWillMount() {
    const userPicture = await Storage.getUserPicture();
    this.setState({
      cover: userPicture,
    });
  }
  render() {
    const { cover } = this.state;
    const { onLivePress, onTitleChange } = this.props;
    if (!cover) return null;
    return (
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        activeOpacity={0.9}
        style={styles.streamInfo.container}
      >
        <View style={styles.streamInfo.coverContainer}>
          <Image source={{ uri: cover, width: 100, height: 100 }} resizeMethod="cover" />
          <Text style={styles.streamInfo.coverText}>Cover</Text>
        </View>
        <TextInput
          style={styles.streamInfo.inputTitle}
          placeholder="Stream Title"
          placeholderTextColor="#FFF"
          onChangeText={text => onTitleChange(text)}
        />
        <View style={styles.streamInfo.tagContainer}>
          <AutoCompleteTag />
        </View>
        <Button
          onPress={() => onLivePress()}
          text="Start Live!"
          style={{ marginTop: 40, zIndex: 10000 }}
        />
      </TouchableOpacity>
    );
  }
}

export default StreamInfo;
