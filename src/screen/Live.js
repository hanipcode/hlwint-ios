import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../components/LoadingPage';
import Card from '../components/Card';
import MainHeader from '../components/MainHeader';
import { getIsLoading, getStreamList, fetchLive, fetchLiveStop } from '../ducks/live';
import Storage from '../data/storage';

class Live extends React.Component {
  static navigationOptions = {
    header: () => <View style={{ height: 0, backgroundColor: 'white', paddingTop: 22 }} />,
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    streamList: PropTypes.instanceOf(Immutable.List).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profilePicture: null,
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
    this.setState({ profilePicture, loading: false });
  }

  async goToWatchLive(broadcasterId, liveImage, streamName) {
    const userData = await Storage.getUser();
    // const accessToken = await Storage.getToken();
    const { navigation, dispatch } = this.props;
    const { id, u_token: accessToken } = userData;
    try {
      navigation.navigate('WatchLive', {
        id,
        accessToken,
        liveImage,
        broadcasterId,
        streamName,
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderItem({ item, index }) {
    const { streamList } = this.props;
    const tagText = item
      .get('tags')
      .map(tag => tag.get('t_name'))
      .join(' ');
    return (
      <Card
        onPress={() =>
          this.goToWatchLive(item.get('id'), item.get('liveImage'), item.get('streamName'))
        }
        image={item.get('liveImage')}
        name={item.get('name')}
        viewCount={item.get('viewCount')}
        tags={tagText}
        title={item.get('title')}
        location={item.get('location')}
        isOfficial={item.get('isOfficial')}
      />
    );
  }

  render() {
    const { isLoading, streamList } = this.props;
    // props from animation
    const { navigation } = this.props;
    const { profilePicture } = this.state;
    const { loading } = this.state;
    const data = streamList.toArray();

    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <MainHeader
          onProfilePress={() => navigation.navigate('CurrentUserProfile')}
          profilePicture={profilePicture}
        />

        <FlatList
          data={data}
          contentContainerStyle={{
            paddingTop: 1,
            paddingBottom: 43,
          }}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.get('id')}
        />
        {isLoading &&
          loading &&
          !profilePicture && <Loading backgroundColor="rgba(0, 0, 0, 0.8)" />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state.liveReducer),
  streamList: getStreamList(state.liveReducer),
});

export default connect(mapStateToProps)(Live);
