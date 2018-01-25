import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { View, Text, Image, Animated, Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import assets from '../assets';
import styles from '../styles';
import ZawgyiText from './ZawgyiText';

const { width, height } = Dimensions.get('window');

const pop = new Sound('gift_sound.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    alert('hayolo error');
    console.log(error);
  }
});

class GiftAnimator extends Component {
  static propTypes = {
    activeGift: PropTypes.shape({}).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      rotationValue: new Animated.Value(0),
      scaleValue: new Animated.Value(0),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.activeGift === nextProps.activeGift && this.state === nextState) return false;
    return true;
  }

  componentWillUnmount() {
    pop.stop();
  }

  animate() {
    const { rotationValue, scaleValue } = this.state;
    Animated.sequence([
      Animated.timing(scaleValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.loop(Animated.timing(rotationValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    })).start();
  }

  render() {
    const { activeGift } = this.props;
    const { scaleValue, rotationValue } = this.state;
    if (!activeGift) return null;
    pop.stop(() => pop.play());
    this.animate();
    const rotationInterpolation = rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const rotationSprincleInterpolation = rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-36deg'],
    });
    return (
      <View style={styles.giftAnimator.container} pointerEvents="none">
        <Animated.View
          style={[
            styles.giftAnimator.animatedView,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Animated.Image
              source={assets.giftImageSprinkler}
              style={{
                position: 'absolute',
                height: 140,
                width: 140,
                transform: [{ rotate: rotationSprincleInterpolation }],
              }}
              resizeMode="contain"
            />
            <Animated.Image
              source={assets.giftImageGlitter}
              style={{
                position: 'absolute',
                height: 140,
                width: 140,
                transform: [{ rotate: rotationInterpolation }],
              }}
              resizeMode="contain"
            />
            <View style={styles.giftAnimator.giftImageContainer}>
              <Animated.Image
                source={{
                  uri: `data:image/png;base64,${activeGift.get('itemImage')}`,
                  height: 60,
                  width: 60,
                }}
                resizeMode="contain"
              />
              <Image
                source={assets.giftCountGroup[activeGift.get('count') - 1]}
                style={styles.giftAnimator.countText}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={{ alignItems: 'flex-start', justifyContent: 'flex-start', paddingRight: 12 }}
          >
            <Image
              source={assets.giftUserBar}
              style={{
                position: 'absolute',
                maxHeight: 28,
                width: null,
                left: 0,
                right: 0,
              }}
              resizeMode="stretch"
            />
            <Animated.Text style={styles.giftAnimator.textContainer}>
              <Image
                source={{
                  uri: activeGift.get('profilePicture'),
                  height: 28,
                  width: 28,
                }}
                style={styles.giftAnimator.profilePicture}
                resizeMode="stretch"
              />
              <Text style={{ paddingLeft: 12 }}>
                <ZawgyiText style={styles.giftAnimator.text}>{activeGift.get('name')}</ZawgyiText>
                <Text style={styles.giftAnimator.text}>Sent </Text>
                <ZawgyiText style={styles.giftAnimator.text}>
                  {activeGift.get('itemName')}
                </ZawgyiText>
              </Text>
            </Animated.Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default GiftAnimator;
