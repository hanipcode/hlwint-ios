import React from 'react';
import {
  ActivityIndicator,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Seq, List } from 'immutable';
import Video from 'react-native-video';
import AnimatedGradient, { presetColors } from 'react-native-animated-linear-gradient';
import { generateStreamLink } from '../data/wowza';
import Storage from '../data/storage';
import * as service from '../helpers/api';
import { subscribe } from '../data/pubnub';
import styles from '../styles';
import { fetchLive, getStreamList } from '../ducks/live';
import {
  getIsShowGiftBox,
  toggleGiftBox,
  subscribeBroadcaster,
  unsubscribeBroadcaster,
  publishHeart,
  resetHeart,
  resetComment,
} from '../ducks/watchLive';
import HeartContainer from '../components/HeartContainer';
import CommentBox from '../components/ComentBox';
import GiftBox from '../components/GiftBox';
import GiftAnimator from '../components/GiftAnimator';
import WatchLiveSwipeAnimation from '../components/animations/WatchLiveSwipe';
import Header from '../components/WatchLiveHeader';
import assets from '../assets';
import CONSTANTS from '../constants';

const filter = require('../assets/beauty.png');

/*
* Timed Out Algorithm
* if isBuffer => let timer to be initiated
* check seconds
* if it more than 3 seconds, probably error: disconnect
*/

// TODO: REMOVE DUMMY
// const dummyVideo = 'http://www.streambox.fr/playlists/test_001/stream.m3u8';
const data = [
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
  {
    image: 'http://via.placeholder.com/350x150',
  },
];
const resetToLive = NavigationActions.reset({
  index: 0,
  actions: [{ routeName: 'Live' }],
});

const resetToNextStream = params =>
  NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({
        routeName: 'Live',
      }),
      NavigationActions.navigate({
        routeName: 'WatchLive',
        params,
      }),
    ],
  });

class WatchLive extends React.Component {
  static navigationOptions = {
    header: () => <View style={{ height: 0, backgroundColor: 'white', paddingTop: 22 }} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      buffer: false,
      screenLoading: true,
      paused: true,
      serverInfo: null,
      subscription: null,
      userInfo: null,
      hash: null,
      giftList: null,
    };
    this.onBuffer = this.onBuffer.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onError = this.onError.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  async componentWillMount() {
    const { navigation, dispatch } = this.props;
    const { params } = navigation.state;
    const { broadcasterId, accessToken } = params;
    const serverInfo = await Storage.getServerInfo();
    const userInfo = await Storage.getUser();
    const { id } = userInfo;
    const broadcastDetail = await service.getBroadcastDetail(id, accessToken, broadcasterId);
    const { data } = broadcastDetail;
    const { hash } = data;
    dispatch(subscribeBroadcaster(broadcasterId.toString(), id));

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
      hash,
      giftList,
    });
  }

  onClosePress() {
    const { navigation, dispatch } = this.props;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    dispatch(unsubscribeBroadcaster(broadcasterId));
    navigation.goBack();
  }

  onLoadStart(e) {
    this.setState({
      buffer: true,
      paused: false,
    });
  }
  onProgress() {
    const { buffer, screenLoading } = this.state;
    // console.log(e);
    if (buffer) {
      this.setState({
        buffer: false,
      });
    }
    if (!buffer && screenLoading) {
      this.setState({
        screenLoading: false,
      });
    }
  }
  onError(e) {
    const { navigation } = this.props;
    Alert.alert('Yah videonya error');
    navigation.dispatch(resetToLive);
  }
  onBuffer(e) {
    console.log('onBuffer');
    this.setState({
      buffer: e.isBuffering,
    });
  }

  onHeartAreaPress() {
    const { navigation, dispatch } = this.props;
    const { userInfo } = this.state;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    const { id, u_profile_pic, u_full_name } = userInfo;

    const sender = {
      id,
      name: u_full_name,
      avatar: u_profile_pic,
    };
    dispatch(publishHeart(broadcasterId, sender));
  }

  /* SWIPE UP AND DOWN CALLBACK FROM ANIMATION */
  async onSwipeDown() {
    const userInfo = await Storage.getUser();
    if (!userInfo) return;

    const { navigation, streamList, dispatch } = this.props;
    const { params } = navigation.state;
    const { accessToken, broadcasterId } = params;
    const { id } = userInfo;
    const streamSeq = Seq(streamList);
    if (streamSeq.size === 1) {
      return;
    }

    const currentIndex = streamSeq.findKey(streamData => streamData.get('id') === broadcasterId);
    // const filteredStream = streamSeq.filter(streamData => streamData.id !== id);
    let previousStreamIndex = currentIndex - 1;
    if (previousStreamIndex < 0) {
      previousStreamIndex = streamSeq.size - 1;
    }
    const previousStream = streamSeq.get(previousStreamIndex);
    const liveImage = previousStream.get('liveImage');
    const previousBroadcasterId = previousStream.get('id');
    const nextParam = {
      id,
      accessToken,
      liveImage,
      broadcasterId: previousBroadcasterId,
    };
    navigation.dispatch(resetToNextStream(nextParam));
  }

  async onSwipeUp() {
    const userInfo = await Storage.getUser();
    if (!userInfo) return;

    const { navigation, streamList, dispatch } = this.props;
    const { params } = navigation.state;
    const { accessToken, broadcasterId } = params;
    const { id } = userInfo;
    const streamSeq = Seq(streamList);
    if (streamSeq.size === 1) {
      return;
    }

    const currentIndex = streamSeq.findKey(streamData => streamData.get('id') === broadcasterId);
    // const filteredStream = streamSeq.filter(streamData => streamData.id !== id);
    let nextStreamIndex = currentIndex + 1;
    if (nextStreamIndex === streamSeq.size) {
      nextStreamIndex = 0;
    }
    const nextStream = streamSeq.get(nextStreamIndex);
    const liveImage = nextStream.get('liveImage');
    const nextBroadcasterId = nextStream.get('id');
    const nextParam = {
      id,
      accessToken,
      liveImage,
      broadcasterId: nextBroadcasterId,
    };
    navigation.dispatch(resetToNextStream(nextParam));
  }
  /* END OF SWIPE UP AND DOWN CALLBACK FROM ANIMATION */

  async prepareGiftList(userId, accessToken) {
    const giftList = await service.getGiftList(userId, accessToken);
    return giftList;
  }

  messageHandler(handler) {
    if (!this.heartContainer) return;
    const { dispatch } = this.props;
    const { message } = handler;
    const { type, sender } = message;
    const { userInfo } = this.state;
    if (!userInfo) return;
    if (type === 'heart') {
      if (sender.id === userInfo.id) return;
    }
    if (type === 'like') {
      const { item_count, item_image, item_name } = message;
      const { id, name, avatar } = sender;
      this.giftAnimator.addGiftItem(id, name, avatar, item_name, item_image);
    }
  }

  presenceHandler(handler) {
    console.log('presence');
    console.log(handler);
  }

  render() {
    const {
      buffer,
      paused,
      serverInfo,
      subscription,
      userInfo,
      screenLoading,
      hash,
      giftList,
    } = this.state;
    const { navigation, isGiftBoxShowed } = this.props;
    const { params } = navigation.state;
    const { broadcasterId, liveImage } = params;
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }} >
        <Header onClosePress={() => this.onClosePress()} viewerList={data} />
        {serverInfo &&
          hash && (
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
              playInBackground // Audio continues to play when app entering background.
              playWhenInactive // [iOS] Video continues to play when control or notification center are shown.
              resizeMode="cover"
              repeat
              style={{ flex: 1, transform: [{ scaleX: -1 }] }}
            />
          )}
        <Image
          source={filter}
          resizeMode="cover"
          style={{
            opacity: 0.13,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {buffer &&
          !screenLoading && (
            <View style={styles.watchLive.loadingOverlay}>
              <View style={styles.watchLive.gradientContainer}>
                <AnimatedGradient customColors={presetColors.sunrise} speed={300} />
              </View>
              <Image
                source={assets.refreshJump}
                style={styles.watchLive.refreshJump}
                resizeMode="contain"
              />
            </View>
          )}

        <HeartContainer />
        <GiftAnimator
          ref={(animator) => {
            this.giftAnimator = animator;
          }}
        />
        {!buffer && (
          <TouchableWithoutFeedback activeOpacity={0.8} onPress={() => this.onHeartAreaPress()}>
            <View style={styles.watchLive.heartTouchableArea} />
          </TouchableWithoutFeedback>
        )}
        {userInfo && <CommentBox userInfo={userInfo} broadcasterId={broadcasterId} />}
        {isGiftBoxShowed &&
          giftList && (
            <GiftBox
              onSendPress={() => navigation.dispatch(toggleGiftBox())}
              broadcasterId={broadcasterId}
              userInfo={userInfo}
              giftList={giftList}
            />
          )}
        {(screenLoading || !giftList) && (
          <View style={styles.watchLive.loadingContainer}>
            <Image
              source={{ uri: liveImage, height: 400, width: 400 }}
              style={styles.watchLive.loadingContainerImage}
              resizeMode="cover"
              blurRadius={2}
            />
            <Image
              source={assets.refreshJump}
              style={styles.watchLive.refreshJump}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    );
  }
}

WatchLive.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        accessToken: PropTypes.string.isRequired,
        broadcasterId: PropTypes.number.isRequired,
        liveImage: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  isGiftBoxShowed: PropTypes.bool.isRequired,
  streamList: PropTypes.instanceOf(List).isRequired,
};

const mapStateToProps = state => ({
  isGiftBoxShowed: getIsShowGiftBox(state.watchLiveReducer),
  streamList: getStreamList(state.liveReducer),
});

const WatchLiveAnimated = WatchLiveSwipeAnimation(WatchLive);
export default connect(mapStateToProps)(WatchLiveAnimated);
