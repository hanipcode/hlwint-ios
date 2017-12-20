import { TabNavigator } from 'react-navigation';
import Live from './Live';
import Explore from './Explore';
import Stream from './Stream';

const AppTabNavigator = TabNavigator(
  {
    Live: {
      screen: Live,
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
