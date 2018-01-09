import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Animated, Dimensions } from 'react-native';
import Sound from 'react-native-sound';

const { width } = Dimensions.get('window');
const pop = new Sound('gift_sound.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    alert('hayolo error');
    console.log(error);
  }
});

class GiftAnimator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageScale: new Animated.Value(0),
      viewTranslateX: new Animated.Value(-80),
      giftQueue: [],
      isShowing: false,
    };
  }
  addGiftItem(id, name, avatar, itemName, itemImage) {
    const item = this.buildGiftItem(id, name, avatar, itemName, itemImage);
    const { giftQueue } = this.state;
    const timer = this.state.giftQueue.length * 3000;
    const newGiftQueue = giftQueue.filter((_, index) => index !== 0);
    setTimeout(() => {
      newGiftQueue.push(item);
      this.setState({ giftQueue: newGiftQueue });
    }, timer);
  }

  buildGiftItem(id, name, avatar, itemName, itemImage) {
    return {
      id,
      name,
      avatar,
      itemName,
      itemImage,
      imageScale: new Animated.Value(0),
      viewTranslateX: new Animated.Value(0),
    };
  }
  animateItem(id) {
    const { giftQueue } = this.state;
    if (giftQueue.length === 0) return;
    const { imageScale, viewTranslateX } = this.state.giftQueue[0];
    Animated.sequence([
      Animated.timing(imageScale, {
        duration: 100,
        useNativeDriver: true,
        toValue: 0,
      }),
      Animated.timing(viewTranslateX, {
        duration: 100,
        useNativeDriver: true,
        toValue: 0,
      }),
      Animated.parallel([
        Animated.spring(imageScale, {
          tension: 3,
          useNativeDriver: true,
          friction: 1,
          toValue: 1,
        }),
        Animated.spring(viewTranslateX, {
          tension: 2,
          useNativeDriver: true,
          friction: 1,
          toValue: (width - 300) / 2 * -1,
        }),
      ]),
    ]).start(() => {});

    pop.stop(() => {
      pop.play(() => {
        this.setState({ giftQueue: giftQueue.filter((_, index) => index !== 0) });
      });
    });
  }
  render() {
    const { imageScale, viewTranslateX, giftQueue } = this.state;
    if (giftQueue.length === 0) return null;
    const gift = giftQueue[0];
    this.animateItem();
    return (
      <View
        style={{
          alignSelf: 'stretch',
          alignItems: 'flex-end',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          maxWidth: 300,
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateX: gift.viewTranslateX }, { translateY: -120 }],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Animated.Image
            source={{ uri: `data:image/png;base64,${gift.itemImage}`, height: 80, width: 80 }}
            resizeMode="contain"
            style={{
              transform: [{ scale: gift.imageScale }],
            }}
          />
          <Animated.Text
            style={{
              transform: [{ scale: gift.imageScale }],
              alignSelf: 'stretch',
              marginVertical: 5,
              padding: 5,
              paddingHorizontal: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <Image
              source={{
                uri: gift.avatar,
                height: 25,
                width: 25,
              }}
              style={{
                position: 'absolute',
                transform: [{ translateY: 3 }, { translateX: 10 }],
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: '#FFF',
                backgroundColor: 'transparent',
                textAlign: 'center',
                alignSelf: 'stretch',
                fontSize: 12,
                position: 'absolute',
                top: 20,
              }}
            >
              {gift.name}
            </Text>
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

export default GiftAnimator;
