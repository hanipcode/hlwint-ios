import React from 'react';
import { View, Animated, StyleSheet, PanResponder } from 'react-native';

export default function withSwipeAnimation(WrappedComponent) {
  return class WithSwipe extends React.Component {
    static navigationOptions = {
      header: () => <View style={{ height: 0, backgroundColor: 'white', paddingTop: 22 }} />,
    };
    constructor(props) {
      super(props);
      this.state = {
        moveY: new Animated.Value(0),
      };
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gesture) => {
          if (gesture.dy > 20 || gesture.dy < -20) return true;
          return false;
        },
        onMoveShouldSetPanResponder: (evt, gesture) => {
          if (gesture.dy > 20 || gesture.dy < -20) return true;
          return false;
        },
        onPanResponderMove: (evt, gesture) => this.onResponderMove(evt, gesture),
        onPanResponderRelease: (evt, gesture) => this.onResponderRelease(evt, gesture),
      });
    }
    onResponderMove(evt, gesture) {
      // console.log(gesture.dy);
      // this.setState({ moveY: gesture.dy });
      const { moveY } = this.state;
      moveY.setValue(gesture.dy);
    }
    onResponderRelease(evt, gesture) {
      const { moveY } = this.state;
      const distance = gesture.dy;
      if (distance < -150 && this.wrappedComponent.onSwipeUp) {
        this.wrappedComponent.onSwipeUp();
      }
      if (distance > 150 && this.wrappedComponent.onSwipeDown) {
        this.wrappedComponent.onSwipeDown();
      }
      Animated.timing(moveY, {
        duration: 100,
        toValue: 0,
      }).start(() => {});
    }
    render() {
      const { moveY } = this.state;
      return (
        <Animated.View
          style={{ flex: 1, backgroundColor: '#111', transform: [{ translateY: moveY }] }}
          // onStartShouldSetResponder={() => true}
          // onMoveShouldSetResponder={() => true}
          // onResponderMove={evt => this.onResponderMove(evt)}
          // onResponderRelease={() => alert('jedar jeder')}
          // onResponderGrant={() => alert('jedar jeder')}
          {...this._panResponder.panHandlers}
        >
          <WrappedComponent
            ref={(component) => {
              this.wrappedComponent = component;
            }}
            {...this.props}
          />
        </Animated.View>
      );
    }
  };
}
