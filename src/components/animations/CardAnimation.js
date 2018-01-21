import React from 'react';
import { Animated, View, Dimensions } from 'react-native';

const { height: pageHeight, width: pageWidth } = Dimensions.get('window');

export default function generateAnimation(WrappedComponent) {
  return class CardAnimation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toMid: new Animated.Value(0),
        toMidX: new Animated.Value(0),
        scaleImageX: new Animated.Value(1),
        scaleImageY: new Animated.Value(1),
        isAnimating: false,
      };
    }
    resetState() {
      this.setState({
        toMid: new Animated.Value(0),
        toMidX: new Animated.Value(0),
        scaleImageX: new Animated.Value(1),
        scaleImageY: new Animated.Value(1),
        isAnimating: false,
      });
    }
    animateCard(callback) {
      const {
        toMid, scaleImageX, scaleImageY, toMidX,
      } = this.state;
      this.setState({ isAnimating: true });
      this.rootAnim.measure((fx, fy, width, height, positionX, positionY) => {
        // console.log(fx, fy, width, height, px, py);
        Animated.parallel([
          Animated.timing(toMid, {
            duration: 300,
            toValue: pageHeight / 2 - height / 2 - positionY,
            useNativeDriver: true,
          }),
          Animated.timing(toMidX, {
            duration: 300,
            toValue: pageWidth / 2 - width / 2 - positionX,
            useNativeDriver: true,
          }),
          Animated.timing(scaleImageY, {
            duration: 400,
            toValue: pageHeight / height,
            useNativeDriver: true,
          }),
          Animated.timing(scaleImageX, {
            duration: 400,
            toValue: pageWidth / width,
            useNativeDriver: true,
          }),
        ]).start(() => this.resetState());

        if (callback !== null) {
          callback();
        }
      });
    }
    render() {
      const {
        toMid, toMidX, scaleImageY, scaleImageX, isAnimating,
      } = this.state;
      return (
        <View
          ref={(rootAnim) => {
            this.rootAnim = rootAnim;
          }}
        >
          <Animated.View
            style={{
              transform: [
                { translateY: toMid },
                { translateX: toMidX },
                { scaleX: scaleImageX },
                { scaleY: scaleImageY },
              ],
            }}
          >
            <WrappedComponent
              {...this.props}
              animateCard={callback => this.animateCard(callback)}
              isAnimating={isAnimating}
            />
          </Animated.View>
        </View>
      );
    }
  };
}
