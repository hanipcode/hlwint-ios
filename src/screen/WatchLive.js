import React from 'react';
import { ActivityIndicator, View, Alert, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { generateStreamLink } from '../data/wowza';
import Storage from '../data/storage';
import * as service from '../helpers/api';
import { subscribe, publishHeart } from '../data/pubnub';
import styles from '../styles';
import { fetchLive } from '../ducks/live';
import { getIsShowGiftBox, toggleGiftBox } from '../ducks/watchLive';
import Loading from '../components/LoadingPage';
import HeartContainer from '../components/HeartContainer';
import CommentBox from '../components/ComentBox';
import GiftBox from '../components/GiftBox';
import GiftAnimator from '../components/GiftAnimator';

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
      subscription: null,
      userInfo: null,
      giftList: null,
    };
    this.onBuffer = this.onBuffer.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onError = this.onError.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    const serverInfo = await Storage.getServerInfo();
    const userInfo = await Storage.getUser();
    const accessToken = await Storage.getToken();
    const { id } = userInfo;
    const newSubscription = await subscribe(
      broadcasterId.toString(),
      p => this.presenceHandler(p),
      m => this.messageHandler(m),
    );
    const giftList = await this.prepareGiftList(id, accessToken);
    this.setState({
      serverInfo,
      subscription: newSubscription,
      userInfo,
      giftList,
    });
  }

  // componentWillUnmount() {
  //   const { subscription } = this.state;
  //   if (!subscription) return;
  //   subscription.unsubscribe();
  // }

  onLoadStart(e) {
    console.log('this load start');
    console.log(e);
    this.setState({
      buffer: true,
      paused: false,
    });
  }
  onProgress() {
    const { buffer } = this.state;
    console.log('this on progress');
    // console.log(e);
    if (buffer) {
      this.setState({
        buffer: false,
      });
    }
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

  async prepareGiftList(userId, accessToken) {
    const giftList = await service.getGiftList(userId, accessToken);
    return giftList;
  }

  messageHandler(handler) {
    if (!this.heartContainer) return;
    console.log('message');
    const { message } = handler;
    const { type, sender } = message;
    const { userInfo } = this.state;
    console.log(message);
    if (type === 'heart') {
      if (sender.id === userInfo.id) return;
      this.heartContainer.addHeart(sender);
    }
    if (type === 'like') {
      const { item_count, item_image, item_name } = message;
      const { id, name, avatar } = sender;
      
      requestAnimationFrame(() =>
        this.giftAnimator.addGiftItem(id, name, avatar, item_name, item_image));
    }
  }

  presenceHandler(handler) {
    console.log('presence');
    console.log(handler);
  }

  render() {
    const {
      buffer, paused, serverInfo, subscription, userInfo, giftList,
    } = this.state;
    const { navigation, isGiftBoxShowed } = this.props;
    const { params } = navigation.state;
    const { hash, broadcasterId, liveImage } = params;
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
          onProgress={this.onProgress} // Callback every ~250ms with currentTime
          onError={this.onError} // Callback when video cannot be loaded
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          paused={false}
          poster={liveImage}
          resizeMode="cover"
          repeat
          style={{ flex: 1, transform: [{ scaleX: -1 }] }}
        />
        <Image
          source={filter}
          resizeMode="cover"
          style={{
            opacity: 0.23,
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
        <GiftAnimator
          ref={(animator) => {
            this.giftAnimator = animator;
          }}
        />
        {!buffer && (
          <TouchableOpacity
            style={styles.watchLive.heartTouchableArea}
            onPress={() => this.onHeartAreaPress()}
          />
        )}
        <CommentBox userInfo={userInfo} broadcasterId={broadcasterId} />
        {isGiftBoxShowed && (
          <GiftBox giftList={giftList} broadcasterId={broadcasterId} userInfo={userInfo} />
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
  isGiftBoxShowed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isGiftBoxShowed: getIsShowGiftBox(state.watchLiveReducer),
});

export default connect(mapStateToProps)(WatchLive);
