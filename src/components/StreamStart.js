import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import Storage from '../data/storage';
import styles from '../styles';
import AutoCompleteTag from './TagAutoComplete';
import Button from './Button';

class StreamStart extends React.Component {
  static propTypes = {
    onLivePress: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onTagListChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      cover: null,
      tagList: [],
    };
  }
  async componentWillMount() {
    const userPicture = await Storage.getUserPicture();
    this.setState({
      cover: userPicture,
    });
  }
  onTagListChange(tagList) {
    const { onTagListChange } = this.props;
    this.setState({ tagList });
    onTagListChange(tagList);
  }
  onTitleChange(title) {
    const { onTitleChange } = this.props;
    onTitleChange(title);
  }
  render() {
    const { cover, tagList } = this.state;
    const { onLivePress } = this.props;
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
        <View style={styles.streamInfo.tagContainer}>
          <AutoCompleteTag
            onTagListChange={newTagList => this.onTagListChange(newTagList)}
            onTitleChange={title => this.onTitleChange(title)}
          />
        </View>
        <Button
          onPress={() => onLivePress()}
          text="Start Live!"
          style={styles.streamInfo.button}
          textStyle={styles.streamInfo.buttonText}
        />
      </TouchableOpacity>
    );
  }
}

export default StreamStart;
