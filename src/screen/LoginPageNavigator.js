import { StackNavigator } from 'react-navigation';
import LoginPage from './LoginPage';
import TermOfUse from './TermOfUse';
import PrivacyPolicy from './PrivacyPolicy';

export default StackNavigator(
  {
    Login: {
      screen: LoginPage,
      navigationOptions: {
        header: null,
      },
    },
    TermOfUse: {
      screen: TermOfUse,
      navigationOptions: {
        header: null,
      },
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
  },
);
