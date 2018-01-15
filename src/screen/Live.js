import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { View, FlatList, Alert, Image, Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../components/LoadingPage';
import Card from '../components/Card';
import WithAnimateOverlay from '../components/animations/LiveListAnimation';
import { getIsLoading, getStreamList, fetchLive, fetchLiveStop } from '../ducks/live';
import { generateStreamLink } from '../data/wowza';
import Storage from '../data/storage';
import assets from '../assets';
import styles from '../styles';
import CONSTANTS from '../constants';

class Live extends React.Component {
  static navigationOptions = {
    header: () => <View style={{ height: 0, backgroundColor: 'white', paddingTop: 22 }} />,
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    streamList: PropTypes.instanceOf(Immutable.List).isRequired,
    animateCards: PropTypes.func.isRequired,
    overlayOpacity: PropTypes.instanceOf(Animated.Value).isRequired,
    cardsOpacity: PropTypes.instanceOf(Animated.Value).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profilePicture: '',
      selectedId: null,
    };
  }

  async componentWillMount() {
    const { dispatch, isLoading } = this.props;
    if (isLoading) return;
    const userData = await Storage.getUser();
    const accessToken = await Storage.getToken();
    const profilePicture = await Storage.getUserPicture();
    const { id } = userData;
    dispatch(fetchLive({ id, accessToken }));
    this.setState({ profilePicture });
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;
    if (!isLoading) {
      this.setState({ loading: false });
    }
  }

  async goToWatchLive(broadcasterId, liveImage) {
    // props from animation
    const { animateCards } = this.props;
    this.setState({ selectedId: broadcasterId });
    const userData = await Storage.getUser();
    // const accessToken = await Storage.getToken();
    const { navigation, dispatch } = this.props;
    const { id, u_token: accessToken } = userData;
    try {
      // const broadcastDetail = await getBroadcastDetail(id, accessToken, broadcasterId);
      // if (broadcastDetail.message !== 'success') {
      //   throw new Error('Fail when fetching broadcast detail');
      // }
      animateCards(() => {
        navigation.navigate('WatchLive', {
          id,
          accessToken,
          liveImage,
          broadcasterId,
        });
      });
      dispatch(fetchLiveStop());
    } catch (error) {
      // Alert.alert(error);
      console.log(error);
    }
  }

  renderItem({ item }) {
    const { selectedId } = this.state;
    // props from animation
    const { cardsOpacity } = this.props;
    return (
      <Animated.View style={{ opacity: selectedId === item.get('id') ? 1 : cardsOpacity }}>
        <Card
          onPress={() => this.goToWatchLive(item.get('id'), item.get('liveImage'))}
          image={item.get('liveImage')}
          name={item.get('name')}
          viewCount={item.get('id')}
        />
      </Animated.View>
    );
  }

  render() {
    const { isLoading, streamList } = this.props;
    // props from animation
    const { overlayOpacity } = this.props;
    const { profilePicture } = this.state;
    const { loading } = this.state;

    if (isLoading && loading && !profilePicture) {
      return <Loading />;
    }
    const data = streamList.toArray();
    return (
      <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={{ flex: 1 }}>
        <View style={styles.home.header}>
          <Image source={assets.logo} style={styles.home.logo} resizeMode="contain" />
          <Image
            source={{ uri: profilePicture, width: 35, height: 35 }}
            style={styles.home.profile_picture}
          />
        </View>
        <Animated.View
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0, 0.9)',
            opacity: overlayOpacity,
          }}
        />
        <FlatList
          data={data}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.get('id')}
        />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state.liveReducer),
  streamList: getStreamList(state.liveReducer),
});

const AnimatedLive = WithAnimateOverlay(Live);
export default connect(mapStateToProps)(AnimatedLive);
