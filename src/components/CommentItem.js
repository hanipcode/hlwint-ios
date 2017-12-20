import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Sound from 'react-native-sound';
import styles from '../styles';

const pop = new Sound('pop.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    alert('hayolo error');
    console.log(error);
  }
});

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    pop.stop(() => {
      // pop.play(() => {});
    });
  }

  render() {
    const { avatar, name, content } = this.props;
    return (
      <View style={styles.commentItem.container}>
        <Image source={{ uri: avatar, width: 100, height: 100 }} style={styles.commentItem.image} />
        <Text style={styles.commentItem.content}>
          <Text style={styles.commentItem.name}>{name}: </Text>
          {content}
        </Text>
      </View>
    );
  }
}

CommentItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default CommentItem;
