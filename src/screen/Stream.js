import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, Alert, Animated, Dimensions, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import BroadcastView from 'react-native-wowza-gocoder';
import Storage from '../data/storage';
import * as service from '../helpers/api';
import styles from '../styles';
import StreamStart from '../components/StreamStart';

const SDK_LICENSE = 'GOSK-2A44-0100-A39E-8820-22BD';
const resetToLive = NavigationActions.reset({
  index: 0,
  actions: [{ routeName: 'Live' }],
});
const { height } = Dimensions.get('window');
const MIDDLE_HEIGHT = height / 2 + 10; // eslint-disable-line

class Stream extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      wowzaUsername: null,
      wowzaPassword: null,
      wowzaHost: null,
      streamHash: null,
      streamTitle: '',
      userId: null,
      userToken: null,
      broadcasting: false,
      opacityAnimated: new Animated.Value(0),
      count: 3,
      infoShowed: true,
    };
  }

  async componentWillMount() {
    const serverInfo = await Storage.getServerInfo();
    const userData = await Storage.getUser();
    const token = await Storage.getToken();
    const { id } = userData;
    const { ip_address, password, username } = serverInfo;

    this.setState({
      wowzaUsername: username,
      wowzaPassword: password,
      wowzaHost: ip_address,
      userId: id,
      userToken: token,
    });
  }

  onBroadcastStart() {
    console.log('Bcast start');
    Alert.alert('yuhu');
  }

  onBroadcastFail() {
    console.log('Bcast fail');
  }

  onBroadcastStatusChange() {
    console.log('Bcast status change');
  }

  onBroadcastEventReceive() {
    console.log('Bcast event receive');
  }

  onBroadcastErrorReceive() {
    console.log('Bcast error receive');
  }

  onBroadcastVideoEncoded() {
    console.log('Bcast encoded');
  }

  onBroadcastStop() {
    console.log('Bcast stop');
  }

  onClose() {
    const { navigation } = this.props;
    const { broadcasting } = this.state;
    if (broadcasting) {
      this.endBroadcast().then(() => {
        navigation.dispatch(resetToLive);
      });
    } else {
      navigation.dispatch(resetToLive);
    }
  }

  onLivePress() {
    const { streamTitle } = this.state;
    Keyboard.dismiss();
    if (streamTitle === '' || streamTitle === ' ') {
      Alert.alert("Stream Title can't be empty");
      return;
    }
    this.dismisInfo();
    // end broadcast first then start broadcast
    this.endBroadcast().then(() => {
      this.initBroadcastToServer().then(() => {});
    });
  }

  dismisInfo() {
    this.setState({
      infoShowed: false,
    });
  }

  initBroadcastToServer() {
    const { userId, userToken, streamTitle } = this.state;
    return service
      .initBroadcast(userId, userToken, streamTitle)
      .then((streamData) => {
        const { hash } = streamData.data;
        this.setState({
          streamHash: `${hash}-${userId}`,
        });
        console.log(`${hash}-${userId} ${streamData.data.hash}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  endBroadcast() {
    const { userId, userToken } = this.state;
    return service.endBroadcast(userId, userToken);
  }

  render() {
    const {
      wowzaHost,
      wowzaPassword,
      wowzaUsername,
      broadcasting,
      count,
      opacityAnimated,
      infoShowed,
      streamHash,
    } = this.state;
    const { navigation } = this.props;

    if (wowzaHost == null || wowzaPassword == null || wowzaUsername == null) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={styles.stream.container}>
        <BroadcastView
          hostAddress={wowzaHost}
          username={wowzaUsername}
          password={wowzaPassword}
          broadcastName={streamHash}
          sdkLicenseKey={SDK_LICENSE}
          broadcasting={broadcasting}
          port={1935}
          sizePreset={3}
          applicationName="live"
          style={styles.stream.broadcastPreview}
          onBroadcastStart={this.onBroadcastStart}
          onBroadcastFail={this.onBroadcastFail}
          onBroadcastStatusChange={this.onBroadcastStatusChange}
          onBroadcastEventReceive={this.onBroadcastEventReceive}
          onBroadcastErrorReceive={this.onBroadcastErrorReceive}
          onBroadcastVideoEncoded={this.onBroadcastVideoEncoded}
          onBroadcastStop={this.onBroadcastStop}
          frontCamera
        />

        {infoShowed && (
          <StreamStart
            onLivePress={() => this.onLivePress()}
            onTitleChange={streamTitle => this.setState({ streamTitle })}
          />
        )}

        <Text style={styles.stream.close} onPress={() => this.onClose()}>
          X
        </Text>
      </View>
    );
  }
}

export default Stream;
