import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Share } from 'react-native';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import styles from '../styles';
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
  getBroadcastHash,
  getGiftList,
  getActiveGift,
  resetGift,
  publishGift,
  getCommentList,
  publishComment,
  setBroadcasterInfo,
} from '../ducks/watchLive';
import WatchLiveHeader from './WatchLiveHeader';
import Storage from '../data/storage';
import GiftAnimator from './GiftAnimator';
import HeartContainer from './HeartContainer';
import CommentBox from './CommentBox';
import { toggleCamera } from '../ducks/broadcast';

class BroadcastingFragment extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    activeGift: PropTypes.instanceOf(Map).isRequired,
    viewerList: PropTypes.instanceOf(List).isRequired,
    broadcasterInfo: PropTypes.instanceOf(List).isRequired,
    commentList: PropTypes.instanceOf(List).isRequired,
    giftList: PropTypes.instanceOf(Map).isRequired,
    broadcasterCoin: PropTypes.number.isRequired,
    broadcasterId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
  }

  async componentWillMount() {
    const { dispatch, broadcasterId } = this.props;
    const userData = await Storage.getUser();
    const { u_full_name, u_profile_pic, u_gender } = userData;
    this.setState({ userData });
    dispatch(subscribeBroadcaster(broadcasterId, broadcasterId));
    dispatch(setBroadcasterInfo(u_full_name, u_profile_pic, u_gender));
    dispatch(fetchViewer(broadcasterId));
  }

  onCameraPress() {
    const { dispatch } = this.props;
    dispatch(toggleCamera());
  }

  async onSharePress() {
    const { userData } = this.state;
    const { u_full_name } = userData;
    const url = 'http://hlwintlive.com';
    const message = `${u_full_name} video chat room, provide rich and wonderful video show. here you can chat, make friends, and get reward`;
    Share.share({
      title: 'Hlwintlive Broadcasting App',
      message,
      url,
    });
  }

  publishComment(text) {
    const { dispatch } = this.props;
    const { userData } = this.state;
    const { id, u_full_name, u_profile_pic } = userData;
    const sender = {
      id,
      name: u_full_name,
      avatar: u_profile_pic,
    };
    dispatch(publishComment(id, sender, text));
  }

  render() {
    const {
      viewerList,
      activeGift,
      broadcasterInfo,
      commentList,
      broadcasterCoin,
      onClose,
      giftList,
    } = this.props;
    return (
      <View style={styles.broadcastingFragment.container}>
        <WatchLiveHeader
          viewerList={viewerList}
          broadcasterInfo={broadcasterInfo}
          broadcasterCoin={broadcasterCoin}
          onClosePress={() => onClose()}
          isShowed
        />
        {giftList.size > 0 && <GiftAnimator activeGift={activeGift} />}
        <HeartContainer />
        <CommentBox
          commentList={commentList}
          isBroadcaster
          onCameraPress={() => this.onCameraPress()}
          onSharePress={() => this.onSharePress()}
          onSendCommentPress={text => this.publishComment(text)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  viewerList: getViewerList(state.watchLiveReducer),
  broadcasterInfo: getBroadcasterInfo(state.watchLiveReducer),
  broadcasterCoin: getBroadcasterCoin(state.watchLiveReducer),
  activeGift: getActiveGift(state.watchLiveReducer),
  commentList: getCommentList(state.watchLiveReducer),
  giftList: getGiftList(state.watchLiveReducer),
});

export default connect(mapStateToProps)(BroadcastingFragment);
