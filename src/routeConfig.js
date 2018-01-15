import { StackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native';
import LoginPage from './screen/LoginPage';
import Tutorial from './screen/Tutorial';
import Home from './screen/HomeTabNavigator';
import WatchLive from './screen/WatchLive';
import CommentBox from './components/GiftAnimator';

export default StackNavigator(
  {
    // CommentBox: {
    //   screen: CommentBox,
    // },
    Login: {
      screen: LoginPage,
    },
    Tutorial: {
      screen: Tutorial,
    },
    Home: {
      screen: Home,
    },
    WatchLive: {
      screen: WatchLive,
    },
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
    }),
  },
);
