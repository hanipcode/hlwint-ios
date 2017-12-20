import { NavigationActions } from 'react-navigation';
import routeConfig from '../routeConfig';

// const AppNavigator = StackNavigator(routeConfig);

const initialState = routeConfig.router.getStateForAction(NavigationActions.init());

const navReducer = (state = initialState, action) => {
  const nextState = routeConfig.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;
