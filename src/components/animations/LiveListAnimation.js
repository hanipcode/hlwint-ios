import React from 'react';
import { View, Animated } from 'react-native';

export default function WithHideCards(WrappedComponent) {
  return class AnimatedHome extends React.Component {
    static navigationOptions = {
      header: () => <View style={{ height: 0, backgroundColor: 'white', paddingTop: 22 }} />,
    };
    constructor(props) {
      super(props);
      this.state = {
        cardsOpacity: new Animated.Value(1),
        overlayOpacity: new Animated.Value(0),
      };
    }
    animateCards(callback) {
      const { cardsOpacity, overlayOpacity } = this.state;
      Animated.parallel([
        Animated.timing(cardsOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (callback) {
          callback();
        }
      });
    }
    render() {
      const { cardsOpacity, overlayOpacity } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          cardsOpacity={cardsOpacity}
          overlayOpacity={overlayOpacity}
          animateCards={callback => this.animateCards(callback)}
        />
      );
    }
  };
}
