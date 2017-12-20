import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Dimensions, Image } from 'react-native';
import assetManager from '../assets';

const { heartGroup } = assetManager;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  heart: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 0,
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#6427d1',
  },
  leftHeart: {
    transform: [{ rotate: '-45deg' }],
    left: 5,
  },
  rightHeart: {
    transform: [{ rotate: '45deg' }],
    right: 5,
  },
});

class Heart extends React.Component {
  static propTypes = {
    removeHeart: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      heartPosition: new Animated.Value(0),
      rightPosition: new Animated.Value(-10),
      opacityValue: new Animated.Value(0),
      scaleValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const {
      heartPosition, rightPosition, opacityValue, scaleValue,
    } = this.state;
    const { removeHeart } = this.props;
    Animated.loop(
      Animated.sequence([
        Animated.timing(rightPosition, {
          toValue: Math.random() * 40 - (Math.random() * 50 + 10),
          duration: 2000,
        }),
        Animated.timing(rightPosition, {
          toValue: -20,
          duration: 2000,
        }),
      ]),

      {
        iterations: 100,
      },
    ).start();
    Animated.parallel([
      Animated.spring(opacityValue, {
        delay: 1000,
        toValue: 100,
        stiffness: 5,
        damping: 6,
        restDisplacementThreshold: 30,
        restSpeedThreshold: 1,
      }),

      Animated.timing(scaleValue, {
        delay: 200,
        toValue: 100,
        duration: 1000,
      }),

      Animated.timing(heartPosition, {
        toValue: height + 10,
        duration: 5000 - Math.random() * 1000,
      }),
    ]).start(() => removeHeart());
  }

  rainbowColor(numOfSteps, step) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    const {
      heartPosition, rightPosition, opacityValue, scaleValue,
    } = this.state;
    const { id, avatar } = this.props;
    const opacityInterpolated = opacityValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0.8, 0.2],
    });
    const scaleInterpolated = scaleValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0.5, 0.9],
    });
    return (
      <Animated.View
        {...this.props}
        style={[
          styles.heart,
          {
            bottom: heartPosition,
            right: rightPosition,
            opacity: opacityInterpolated,
            transform: [{ scale: scaleInterpolated }],
          },
        ]}
      >
        <Image source={heartGroup[id % 7]} resizeMode="contain" />
        {/* <Image source={{ uri: avatar, height: 30, width: 30 }} resizeMode="cover" style={{ borderRadius: 15, overflow: 'hidden', position: 'absolute', top: -8, right: 4}} /> */}
      </Animated.View>
    );
  }
}

export default Heart;
