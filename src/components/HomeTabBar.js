import React from 'react';
import { View, Image, Text, Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import assets from '../assets';
import styles from '../styles';

class HomeTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      closeOpacity: new Animated.Value(0),
      closeTranslate: new Animated.Value(80),
      menuOpacity: new Animated.Value(1),
      menuTranslate: new Animated.Value(0),
      itemOpacity: new Animated.Value(0),
      itemTranslate: new Animated.Value(0),
      itemScale: new Animated.Value(0),
    };
  }

  onActivePress() {
    const {
      expanded,
      closeOpacity,
      closeTranslate,
      menuOpacity,
      menuTranslate,
      itemOpacity,
      itemTranslate,
      itemScale,
    } = this.state;
    //  This is  a complex animation serialization
    Animated.parallel([
      // first doing cross fading of close and menu icon
      // need to translate because of the damn touchable can't be clicked
      // if stacked
      Animated.sequence([
        Animated.timing(closeTranslate, {
          toValue: expanded ? 80 : 0,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(closeOpacity, {
          toValue: expanded ? 0 : 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(menuTranslate, {
          toValue: expanded ? 0 : 80,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(menuOpacity, {
          toValue: expanded ? 1 : 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // then animate the item
      Animated.timing(itemTranslate, {
        toValue: expanded ? 0 : 10,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(itemOpacity, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(itemScale, {
        toValue: expanded ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    this.setState({ expanded: !expanded });
  }

  goToRoute(name) {
    const { navigation } = this.props;
    const { navigate } = navigation;
    this.onActivePress();
    navigate(name);
  }

  render() {
    const {
      closeOpacity,
      menuOpacity,
      itemOpacity,
      itemTranslate,
      itemScale,
      closeTranslate,
      menuTranslate,
    } = this.state;
    const { navigationState, navigation } = this.props;
    const { index } = navigationState;
    const { navigate } = navigation;
    return (
      <View style={styles.tabBar.container} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.tabBar.imageContainer,
            { opacity: menuOpacity, transform: [{ translateX: menuTranslate }] },
          ]}
          pointerEvents="box-none"
        >
          <TouchableOpacity onPress={() => this.onActivePress()}>
            <View style={styles.tabBar.imageStyle}>
              <Image resizeMode="contain" source={assets.menu} style={styles.tabBar.image} />
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.tabBar.imageContainer,
            styles.tabBar.close,
            { opacity: closeOpacity, transform: [{ translateX: closeTranslate }] },
          ]}
        >
          <TouchableOpacity onPress={() => this.onActivePress()}>
            <View style={styles.tabBar.imageStyle}>
              <Image resizeMode="contain" source={assets.close} style={styles.tabBar.imageClose} />
            </View>
          </TouchableOpacity>
        </Animated.View>
        {index !== 0 && (
          <Animated.View
            style={[
              styles.tabBar.imageContainer,
              {
                opacity: itemOpacity,
                transform: [{ translateY: itemTranslate }, { scale: itemScale }],
              },
            ]}
          >
            <View style={styles.tabBar.imageStyle}>
              <TouchableOpacity onPress={() => this.goToRoute('Live')}>
                <Image resizeMode="contain" source={assets.home} style={styles.tabBar.image} />
              </TouchableOpacity>
            </View>
            <Text style={styles.tabBar.label}>Home</Text>
          </Animated.View>
        )}
        {index !== 1 && (
          <Animated.View
            style={[
              styles.tabBar.imageContainer,
              {
                opacity: itemOpacity,
                transform: [{ translateY: itemTranslate }, { scale: itemScale }],
              },
            ]}
          >
            <View style={styles.tabBar.imageStyle}>
              <TouchableOpacity onPress={() => this.goToRoute('Stream')}>
                <Image resizeMode="contain" source={assets.live} style={styles.tabBar.image} />
              </TouchableOpacity>
            </View>
            <Text style={styles.tabBar.label}>Live</Text>
          </Animated.View>
        )}
        {index !== 2 && (
          <Animated.View
            style={[
              styles.tabBar.imageContainer,
              {
                opacity: itemOpacity,
                transform: [{ translateY: itemTranslate }, { scale: itemScale }],
              },
            ]}
          >
            <View style={styles.tabBar.imageStyle}>
              <TouchableOpacity onPress={() => this.goToRoute('Explore')}>
                <Image resizeMode="contain" source={assets.world} style={styles.tabBar.image} />
              </TouchableOpacity>
            </View>
            <Text style={styles.tabBar.label}>Explore</Text>
          </Animated.View>
        )}
      </View>
    );
  }
}

export default HomeTabBar;
