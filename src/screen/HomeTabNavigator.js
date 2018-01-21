import { TabNavigator } from 'react-navigation';
import LiveNavigator from './LiveAndWatchNavigator';
import Explore from './Explore';
import Stream from './Stream';
import HomeTabBar from '../components/HomeTabBar';

const AppTabNavigator = TabNavigator(
  {
    Live: {
      screen: LiveNavigator,
    },
    Stream: {
      screen: Stream,
    },
    Explore: {
      screen: Explore,
    },
  },
  {
    lazy: true,
    tabBarComponent: HomeTabBar,
  },
);

// const TabNavigatorWithRoot = props => (
//   <AppTabNavigator
//     navigation={addNavigationHelpers({
//       dispatch: props.dispatch,
//       state: props.nav,
//     })}
//   />
// );
// TabNavigatorWithRoot.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// // };
// const mapStateToProps = state => ({
//   nav: state.nav,
// });
export default AppTabNavigator;
