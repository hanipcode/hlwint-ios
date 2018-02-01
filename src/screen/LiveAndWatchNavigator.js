import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Live from './Live';
import WatchLive from './WatchLive';
import ViewerLiveEnded from './ViewerLiveEnded';

export default StackNavigator(
  {
    Live: {
      screen: Live,
    },
    WatchLive: {
      screen: WatchLive,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    ViewerLiveEnded: {
      screen: ViewerLiveEnded,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
      containerStyle: {
        height: 0,
      },
    }),
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      opacity: 1,
    },
  },
);
