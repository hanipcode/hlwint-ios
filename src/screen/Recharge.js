import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CONSTANTS from '../constants';

class TermOfUse extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    const { navigation } = props;
    const { userId } = navigation.state.params;
    this.state = {
      currentUri: `https://dashboard.imliveapp.com/api/ml/payment/${userId}`,
    };
  }
  render() {
    const { currentUri } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: currentUri }}
          ref={(webviewComponent) => {
            this.webviewComponent = webviewComponent;
          }}
          style={{ marginTop: 60 }}
          startInLoadingState
          bounces={false}
          scrollEnabled
        />
        <LinearGradient
          {...CONSTANTS.GRADIENTS_PROPS}
          style={{
            left: 0,
            right: 0,
            position: 'absolute',
            height: 60,
            paddingTop: 28,
            paddingLeft: 4,
          }}
        >
          <Text
            style={{
              fontSize: 14,

              color: '#FFF',
              fontWeight: '600',
              backgroundColor: 'transparent',
            }}
            onPress={() => navigation.goBack(null)}
          >
            {'← BACK'}
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

export default TermOfUse;
