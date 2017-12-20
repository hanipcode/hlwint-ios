import React from 'react';
import { ActivityIndicator, View, Alert, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { BlurView, VibrancyView } from 'react-native-blur';
import { generateStreamLink } from '../data/wowza';
import Storage from '../data/storage';
import { subscribe, publishHeart } from '../data/pubnub';
import styles from '../styles';
import { fetchLive } from '../ducks/live';
import Loading from '../components/LoadingPage';
import HeartContainer from '../components/HeartContainer';

const filter = require('../assets/beauty.png');

/*
* Timed Out Algorithm
* if isBuffer => let timer to be initiated
* check seconds
* if it more than 3 seconds, probably error: disconnect
*/

// TODO: REMOVE DUMMY
// const dummyVideo = 'http://www.streambox.fr/playlists/test_001/stream.m3u8';

const resetToLive = NavigationActions.reset({
  index: 0,
  actions: [{ routeName: 'Home' }],
});

class WatchLive extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: <Text onPress={() => navigation.dispatch(resetToLive)}>Back</Text>,
  });
  constructor(props) {
    super(props);
    this.state = {
      buffer: false,
      paused: true,
      serverInfo: null,
      subscribption: null,
      userInfo: null,
    };
    this.onBuffer = this.onBuffer.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onError = this.onError.bind(this);
    this.onPlaybackStalled = this.onPlaybackStalled.bind(this);
  }

  async componentWillMount() {
    const { subscribption } = this.state;
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    const serverInfo = await Storage.getServerInfo();
    const userInfo = await Storage.getUser();
    const newSubscription = await subscribe(
      broadcasterId.toString(),
      p => this.presenceHandler(p),
      m => this.messageHandler(m),
    );
    console.log(newSubscription);
    this.setState({ serverInfo, subscription: newSubscription, userInfo });
  }
  componentWillUnmount() {
    const { subscription } = this.state;
    if (!subscription) return;
    subscription.unsubscribe();
  }

  onLoadStart(e) {
    console.log('this load start');
    console.log(e);
    this.setState({
      buffer: true,
      paused: false,
    });
  }
  onLoad(e) {
    console.log('this on load');
    console.log(e);
  }
  onProgress(e) {
    console.log('this on progress');
    // console.log(e);
  }
  onEnd(e) {
    console.log('onEnd');
    console.log(e);
  }
  onError(e) {
    const { navigation } = this.props;
    console.log('onError');
    console.log(e);
    Alert.alert('Yah videonya error');
    navigation.goBack(null);
  }
  onBuffer(e) {
    console.log('onBuffer');
    console.log(e);
    this.setState({
      buffer: e.isBuffering,
    });
  }
  onTimedMetadata(e) {
    console.log('onTimedMetadata');
    console.log(e);
  }
  onPlaybackStalled(e) {
    const { navigation } = this.props;
    console.log('onPlaybackStalled');
    console.log(e);
    Alert.alert('Videonya Ended');
    navigation.goBack(null);
  }
  onPlaybackRateChange(e) {
    console.log('playbackratechange');
    console.log(e);
  }
  onBack() {
    const { dispatch, navigation } = this.props;
    navigation.goBack(null);
    dispatch(fetchLive());
  }

  async onHeartAreaPress() {
    const { navigation } = this.props;
    const { userInfo } = this.state;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    const { id, u_profile_pic, u_full_name } = userInfo;
    const sender = {
      id,
      name: u_full_name,
      avatar: u_profile_pic,
    };
    await publishHeart(broadcasterId, sender);
    this.heartContainer.addHeart(sender);
  }

  messageHandler(handler) {
    console.log('message');
    console.log(handler);
    const { message } = handler;
    const { type, sender } = message;
    if (type === 'heart') {
      this.heartContainer.addHeart(sender);
    }
  }

  presenceHandler(handler) {
    console.log('presence');
    console.log(handler);
  }

  render() {
    const {
      buffer, paused, serverInfo, subscription,
    } = this.state;
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { hash, broadcasterId, liveImage } = params;
    console.log(subscription);
    if (!serverInfo) {
      return <Loading />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Video
          ref={(vid) => {
            this.vid = vid;
          }}
          source={{ uri: generateStreamLink(serverInfo, hash, broadcasterId) }}
          onLoadStart={this.onLoadStart} // Callback when video starts to load
          onLoad={this.onLoad} // Callback when video loads
          onProgress={this.onProgress} // Callback every ~250ms with currentTime
          onEnd={this.onEnd} // Callback when playback finishes
          onError={this.onError} // Callback when video cannot be loaded
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onTimedMetadata={this.onTimedMetadata}
          onPlaybackStalled={this.onPlaybackStalled}
          onPlaybackRateChange={this.onPLaybackRateChange}
          paused={paused}
          poster={liveImage}
          muted={false}
          resizeMode="cover"
          playInBackground
          playWhenInactive
          repeat
          style={{ flex: 1, transform: [{ scaleX: -1 }] }}
          progressUpdateInterval={850}
        />
        <Image
          source={filter}
          resizeMode="cover"
          style={{
            maxWidth: 200,
            opacity: 0.25,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {buffer && (
          <View style={styles.watchLive.loadingOverlay}>
            <ActivityIndicator />
          </View>
        )}
        {!buffer && (
          <HeartContainer
            ref={(heartContainer) => {
              this.heartContainer = heartContainer;
            }}
          />
        )}
        {!buffer && (
          <TouchableOpacity
            style={styles.watchLive.heartTouchableArea}
            onPress={() => this.onHeartAreaPress()}
          />
        )}
      </View>
    );
  }
}

WatchLive.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        hash: PropTypes.string.isRequired,
        broadcasterId: PropTypes.number.isRequired,
        liveImage: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WatchLive);
