import React from 'react';
import {
  View,
  Alert,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Keyboard,
  Share,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Seq, List, Map } from 'immutable';
import Video from 'react-native-video';
import AnimatedGradient, { presetColors } from 'react-native-animated-linear-gradient';
import { generateStreamLink } from '../data/wowza';
import Storage from '../data/storage';
import styles from '../styles';
import { getStreamList, fetchLive } from '../ducks/live';
import {
  getIsShowGiftBox,
  toggleGiftBox,
  subscribeBroadcaster,
  unsubscribeBroadcaster,
  publishHeart,
  getViewerList,
  fetchViewer,
  getBroadcasterInfo,
  getBroadcasterCoin,
  fetchBroadcastDetail,
  getGiftList,
  getActiveGift,
  resetGift,
  publishGift,
  getCommentList,
  publishComment,
  getHeartIdList,
  addHeart,
  hideGiftBox,
  resetBroadcastState,
  getBroadcastEnded,
  resetBroadcastEnded,
} from '../ducks/watchLive';
import HeartContainer from '../components/HeartContainer';
import CommentBox from '../components/CommentBox';
import GiftBox from '../components/GiftBox';
import GiftAnimator from '../components/GiftAnimator';
import WatchLiveSwipeAnimation from '../components/animations/WatchLiveSwipe';
import Header from '../components/WatchLiveHeader';
import assets from '../assets';
import { getUserCoin } from '../ducks/userInfo';
// import CONSTANTS from '../constants';

const filter = require('../assets/beauty.png');

const resetToLiveEnded = params =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'ViewerLiveEnded', params })],
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
      serverInfo: null,
      userInfo: null,
    };
    this.onBuffer = this.onBuffer.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onError = this.onError.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onSendGiftPress = this.onSendGiftPress.bind(this);
  }

  async componentWillMount() {
    const { navigation, dispatch } = this.props;
    const { params } = navigation.state;
    const { broadcasterId, accessToken } = params;
    const serverInfo = await Storage.getServerInfo();
    const userInfo = await Storage.getUser();
    const { id } = userInfo;
    dispatch(fetchBroadcastDetail(broadcasterId.toString()));
    dispatch(subscribeBroadcaster(broadcasterId.toString(), id));
    dispatch(fetchViewer(broadcasterId.toString()));
    this.setState({
      serverInfo,
      userInfo,
    });
  }

  componentWillUnmount() {
    const { navigation, dispatch } = this.props;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    dispatch(unsubscribeBroadcaster(broadcasterId));
    dispatch(resetBroadcastState());
    dispatch(hideGiftBox());
    // dispatch(fetchLive())
  }

  onClosePress() {
    const { navigation, dispatch } = this.props;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    const endedParams = {
      userId: broadcasterId,
    };
    navigation.dispatch(resetToLiveEnded(endedParams));
    // dispatch(unsubscribeBroadcaster(broadcasterId));
    // dispatch(resetBroadcastState());
    // dispatch(hideGiftBox());
  }

  onLoadStart(e) {
    this.setState({
      buffer: true,
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
    // Alert.alert('Yah videonya error');
    // navigation.dispatch(resetToLive);
    this.onClosePress();
  }
  onBuffer(e) {
    console.log('onBuffer');
    this.setState({
      buffer: e.isBuffering,
    });
  }

  onSendGiftPress(channel, sender, itemCount, itemName, itemImage, itemId, giftPrice) {
    const { dispatch } = this.props;
    dispatch(publishGift(channel, sender, itemCount, itemName, itemImage, itemId, giftPrice));
  }

  onSendCommentPress(text) {
    const { dispatch, navigation } = this.props;
    const { userInfo } = this.state;
    const { params } = navigation.state;
    const { broadcasterId } = params;
    const { id, u_profile_pic, u_full_name } = userInfo;
    const sender = {
      id,
      name: u_full_name,
      avatar: u_profile_pic,
    };
    dispatch(publishComment(broadcasterId, sender, text));
  }

  onGiftIconPress() {
    const { dispatch } = this.props;
    Keyboard.dismiss();
    dispatch(toggleGiftBox());
  }
  onHeartAreaPress() {
    const { navigation, dispatch, isGiftBoxShowed } = this.props;
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
    requestAnimationFrame(() => Keyboard.dismiss());
    if (isGiftBoxShowed) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(toggleGiftBox());
    }
  }
  onSharePress() {
    const { broadcasterInfo } = this.props;
    const url = 'http://hlwintlive.com';
    const message = `${broadcasterInfo.get('name')} video chat room, provide rich and wonderful video show. here you can chat, make friends, and get reward`;
    Share.share({
      title: 'Hlwintlive Broadcasting App',
      message,
      url,
    });
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

  render() {
    const {
      buffer, serverInfo, userInfo, screenLoading,
    } = this.state;

    const {
      navigation,
      isGiftBoxShowed,
      viewerList,
      broadcasterInfo,
      broadcasterCoin,
      giftList,
      commentList,
      activeGift,
      userCoin,
    } = this.props;

    const { params } = navigation.state;
    const { broadcasterId, liveImage, streamName } = params;
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Header
          isShowed={!screenLoading}
          onClosePress={() => this.onClosePress()}
          viewerList={viewerList}
          broadcasterInfo={broadcasterInfo}
          broadcasterCoin={broadcasterCoin}
        />
        {serverInfo && (
          <Video
            ref={(vid) => {
              this.vid = vid;
            }}
            source={{ uri: generateStreamLink(serverInfo, streamName) }}
            onLoadStart={this.onLoadStart} // Callback when video starts to load
            onProgress={this.onProgress} // Callback every ~250ms with currentTime
            onError={this.onError} // Callback when video cannot be loaded
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            paused={false}
            poster={liveImage}
            // playInBackground // Audio continues to play when app entering background.
            playWhenInactive // [iOS] Video continues to play when control or notification center are shown.
            resizeMode="cover"
            repeat
            style={styles.watchLive.video}
          />
        )}
        <Image source={filter} resizeMode="cover" blurRadius={5} style={styles.watchLive.filter} />
        {buffer &&
          !screenLoading && (
            <View style={styles.watchLive.loadingOverlay}>
              <View style={styles.watchLive.gradientContainer}>
                <AnimatedGradient customColors={presetColors.sunrise} speed={300} />
              </View>
              <View style={styles.watchLive.loadingOverlay} />
              <Image
                source={assets.refreshJumpWhite}
                style={styles.watchLive.refreshJump}
                resizeMode="contain"
              />
            </View>
          )}
        {!screenLoading && <HeartContainer />}

        {!buffer && (
          <TouchableWithoutFeedback activeOpacity={0.8} onPress={() => this.onHeartAreaPress()}>
            <View style={styles.watchLive.heartTouchableArea} />
          </TouchableWithoutFeedback>
        )}
        {!screenLoading && (
          <CommentBox
            onSendCommentPress={text => this.onSendCommentPress(text)}
            commentList={commentList}
            onGiftIconPress={() => this.onGiftIconPress()}
            onSharePress={() => this.onSharePress()}
          />
        )}

        {giftList.size !== 0 &&
          isGiftBoxShowed && (
            <GiftBox
              onSendGiftPress={this.onSendGiftPress}
              broadcasterId={broadcasterId}
              userInfo={userInfo}
              giftList={giftList}
              userCoin={userCoin}
            />
          )}
        {!screenLoading && (
          <GiftAnimator
            ref={(animator) => {
              this.giftAnimator = animator;
            }}
            activeGift={activeGift}
          />
        )}
        {(screenLoading || giftList.size === 0 ) && (
          <View style={styles.watchLive.loadingContainer}>
            <Image
              source={{ uri: liveImage, height: 400, width: 400 }}
              style={styles.watchLive.loadingContainerImage}
              resizeMode="cover"
              blurRadius={2}
            />
            <View style={styles.watchLive.loadingOverlay} />
            <Image
              source={assets.refreshJumpWhite}
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
        streamName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  isGiftBoxShowed: PropTypes.bool.isRequired,
  giftList: PropTypes.instanceOf(Map).isRequired,
  activeGift: PropTypes.instanceOf(Map).isRequired,
  viewerList: PropTypes.instanceOf(List).isRequired,
  streamList: PropTypes.instanceOf(List).isRequired,
  broadcasterInfo: PropTypes.instanceOf(List).isRequired,
  commentList: PropTypes.instanceOf(List).isRequired,
  broadcasterCoin: PropTypes.number.isRequired,
  userCoin: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  streamList: getStreamList(state.liveReducer),
  isGiftBoxShowed: getIsShowGiftBox(state.watchLiveReducer),
  viewerList: getViewerList(state.watchLiveReducer),
  giftList: getGiftList(state.watchLiveReducer),
  broadcasterInfo: getBroadcasterInfo(state.watchLiveReducer),
  broadcasterCoin: getBroadcasterCoin(state.watchLiveReducer),
  activeGift: getActiveGift(state.watchLiveReducer),
  commentList: getCommentList(state.watchLiveReducer),
  userCoin: getUserCoin(state.userInfoReducer),
});

const WatchLiveAnimated = WatchLiveSwipeAnimation(WatchLive);
export default connect(mapStateToProps)(WatchLiveAnimated);
