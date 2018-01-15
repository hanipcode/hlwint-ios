import React from 'react';
import { Animated, View, Dimensions } from 'react-native';

const { height: pageHeight } = Dimensions.get('window');

export default function generateAnimation(WrappedComponent) {
  return class CardAnimation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toMid: new Animated.Value(0),
      };
    }
    animateCard(callback) {
      const { toMid } = this.state;
      this.rootAnim.measure((fx, fy, width, height, px, positionY) => {
        // console.log(fx, fy, width, height, px, py);
        Animated.timing(toMid, {
          duration: 300,
          toValue: pageHeight / 2 - height / 2 - positionY,
          useNativeDriver: true,
        }).start(() => {});

        if (callback !== null) {
          callback();
        }
      });
    }
    render() {
      const { toMid } = this.state;
      return (
        <View
          ref={(rootAnim) => {
            this.rootAnim = rootAnim;
          }}
        >
          <Animated.View style={{ transform: [{ translateY: toMid }] }}>
            <WrappedComponent
              {...this.props}
              animateCard={callback => this.animateCard(callback)}
            />
          </Animated.View>
        </View>
      );
    }
  };
}
