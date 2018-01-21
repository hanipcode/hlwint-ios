import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView, Text } from 'react-native';

class TermOfUse extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentUri: 'http://hlwintlive.com/user_agreement/webview/mm',
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
          style={{ marginTop: -75 }}
          startInLoadingState
          bounces={false}
          scrollEnabled
        />
        <Text
          style={{
            fontSize: 14,
            left: 0,
            right: 0,
            position: 'absolute',
            height: 60,
            paddingTop: 28,
            paddingLeft: 4,
            color: '#777',
            fontWeight: '600',
            backgroundColor: '#FFF',
          }}
          onPress={() => navigation.goBack()}
        >
          {'← BACK'}
        </Text>
      </View>
    );
  }
}

export default TermOfUse;
