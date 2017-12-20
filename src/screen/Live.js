import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { View, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../components/LoadingPage';
import Card from '../components/Card';
import { getIsLoading, getStreamList, fetchLive, fetchLiveStop } from '../ducks/live';
import { getBroadcastDetail } from '../helpers/api';
import { generateStreamLink } from '../data/wowza';
import Storage from '../data/storage';

class Live extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    streamList: PropTypes.instanceOf(Immutable.List).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentWillMount() {
    const { dispatch, isLoading } = this.props;
    if (isLoading) return;
    const userData = await Storage.getUser();
    const accessToken = await Storage.getToken();
    const { id } = userData;
    dispatch(fetchLive({ id, accessToken }));
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;
    if (!isLoading) {
      this.setState({ loading: false });
    }
  }

  async goToWatchLive(broadcasterId, liveImage) {
    const userData = await Storage.getUser();
    const accessToken = await Storage.getToken();
    const { navigation, dispatch } = this.props;
    const { id } = userData;
    try {
      const broadcastDetail = await getBroadcastDetail(id, accessToken, broadcasterId);
      if (broadcastDetail.message !== 'success') {
        throw new Error('Fail when fetching broadcast detail');
      }
      const { hash, b_user_id } = broadcastDetail.data;
      console.log(broadcastDetail);
      navigation.navigate('WatchLive', {
        hash,
        liveImage,
        broadcasterId: b_user_id,
      });
      dispatch(fetchLiveStop());
    } catch (error) {
      Alert.alert(error);
    }
  }

  renderItem({ item }) {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Card
          onPress={() => this.goToWatchLive(item.get('id'), item.get('liveImage'))}
          image={item.get('liveImage')}
          name={item.get('name')}
          viewCount={item.get('viewCount')}
        />
      </View>
    );
  }

  render() {
    const { isLoading, streamList } = this.props;
    const { loading } = this.state;
    if (isLoading && loading) {
      return <Loading />;
    }
    const data = streamList.toArray();
    return (
      <FlatList
        data={data}
        renderItem={item => this.renderItem(item)}
        keyExtractor={item => item.get('id')}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state.liveReducer),
  streamList: getStreamList(state.liveReducer),
});

export default connect(mapStateToProps)(Live);
