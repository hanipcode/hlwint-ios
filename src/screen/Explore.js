import React from 'react';
import { View, Text, Easing, Animated } from 'react-native';

class Explore extends React.Component {
  static transitionConfig = {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>Explore</Text>
      </View>
    );
  }
}

export default Explore;
