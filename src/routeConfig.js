import { StackNavigator } from 'react-navigation';
import LoginPage from './screen/LoginPage';
import Tutorial from './screen/Tutorial';
import Home from './screen/HomeTabNavigator';
import WatchLive from './screen/WatchLive';
import CommentBox from './components/GiftAnimator';

export default StackNavigator({
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
});
