import { StackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native';
import LoginPageNavigator from './screen/LoginPageNavigator';
import Tutorial from './screen/Tutorial';
import Home from './screen/HomeTabNavigator';
import PrivacyPolicy from './screen/PrivacyPolicy';
import TermOfUse from './screen/TermOfUse';
import CurrentUserProfile from './screen/CurrentUserProfile';
import Recharge from './screen/Recharge';
import Income from './screen/Income';

export default StackNavigator(
  {
    // CommentBox: {
    //   screen: CommentBox,
    // },
    // TermOfUse: {
    //   screen: TermOfUse,
    // },
    // PrivacyPolicy: {
    //   screen: PrivacyPolicy,
    // },

    Login: {
      screen: LoginPageNavigator,
    },
    Tutorial: {
      screen: Tutorial,
    },
    Home: {
      screen: Home,
    },
    CurrentUserProfile: {
      screen: CurrentUserProfile,
    },
    TermOfUse: {
      screen: TermOfUse,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    Recharge: {
      screen: Recharge,
    },
    Income: {
      screen: Income,
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
    headerMode: 'none',
  },
);
