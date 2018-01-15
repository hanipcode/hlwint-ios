import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Heart from './Heart';
import styles from '../styles';

class HeartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: [],
      lastId: 0,
    };
  }

  componentDidMount() {
    const { heart } = this.state;
  }

  addHeart(sender) {
    const { heart, lastId } = this.state;
    const { avatar } = sender;
    const nextId = lastId + 1;
    heart.push({
      id: nextId,
      avatar,
    });
    this.setState({ heart, lastId: nextId });
  }

  removeHeart(id) {
    const { heart } = this.state;
    this.setState({ heart: heart.filter(heartItem => heartItem.id !== id) });
  }

  render() {
    const { heart } = this.state;
    if (!heart) {
      return null;
    }
    return (
      <View>
        <View style={styles.heartContainer.container}>
          <Text>{heart.length}</Text>
          {heart.map(heartItem => (
            <Heart
              key={heartItem.id}
              id={heartItem.id}
              avatar={heartItem.avatar}
              removeHeart={() => requestAnimationFrame(() => this.removeHeart(heartItem.id))}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default HeartContainer;
