import React from 'react';
import { View, Image, Text, Animated, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import assets from '../assets';
import CONSTANTS from '../constants';
import styles from '../styles';

const { width } = Dimensions.get('window');

class HomeTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayTranslateX: new Animated.Value(0),
    };
  }

  moveOverlay(index) {
    const { overlayTranslateX } = this.state;
    Animated.timing(overlayTranslateX, {
      toValue: index > 0 ? 0 : width / 2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  goToRoute(name) {
    const { navigationState, navigation } = this.props;
    const { navigate } = navigation;
    const { index } = navigationState;

    this.moveOverlay(index);
    navigate(name);
  }

  render() {
    const { overlayTranslateX } = this.state;
    return (
      <LinearGradient style={styles.tabBar.container} {...CONSTANTS.GRADIENTS_PROPS}>
        <Animated.View
          style={[
            styles.tabBar.backgroundOverlay,
            { transform: [{ translateX: overlayTranslateX }] },
          ]}
        />
        <TouchableOpacity style={styles.tabBar.buttonText} onPress={() => this.goToRoute('Live')}>
          <Text style={styles.tabBar.text}>Live</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.goToRoute('Stream')}>
          <Image source={assets.broadcast_button} style={styles.tabBar.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.goToRoute('Explore')}
          style={styles.tabBar.buttonText}
        >
          <Text style={styles.tabBar.text}>Explore</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

export default HomeTabBar;
