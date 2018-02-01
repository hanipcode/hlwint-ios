import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  NetInfo,
  Vibration,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import BroadcastView from 'react-native-wowza-gocoder';
import Storage from '../data/storage';
import * as service from '../helpers/api';
import styles from '../styles';
import StreamStart from '../components/StreamStart';
import BroadcastingFragment from '../components/BroadcastingFragment';
import { getIsFrontCamera } from '../ducks/broadcast';

const SDK_LICENSE = 'GOSK-2A44-0100-A39E-8820-22BD';
const resetToLive = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Live',
    }),
  ],
});
const { height } = Dimensions.get('window');
const MIDDLE_HEIGHT = height / 2 + 10; // eslint-disable-line

/* IMPORT ANT
  NOTE THAT FOR STREAM INFORMATION WE REUSE MOST OF THE LOGIC FROM WATCH LIVE
  BECAUSE ESSENTIALLY INFORMATION FOR BROADCASTER AND WATCHER SHOULD BE IDENTICAL
  SO WE USE REDUCER AND SAGAS THAT USED FOR WATCH LIVE (watchLiveSaga)
  TO ALSO MAKE THE STREAM COMPONENT CONCISE AND NOT MIXED INFORMATION AND STREAMING LOGIC,
  WE SEPARATE THE INFORMATION COMPONENT (Header, COmment, etc) IN THE BroadcastingFragment Component
  AND THAT COMPONENT IS THE ONE THAT CONNECTED TO THE REDUCER;
*/
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
    isFrontCamera: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.defaultState = {
      wowzaUsername: null,
      wowzaPassword: null,
      wowzaHost: null,
      streamHash: null,
      streamTitle: '',
      userId: null,
      userToken: null,
      broadcasting: false,
      isInitiated: false,
      infoShowed: true,
      tagList: [],
    };
    this.state = this.defaultState;
    this.resetState = {
      streamHash: null,
      streamTitle: '',
      broadcasting: false,
      isInitiated: false,
      infoShowed: true,
      tagList: [],
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

  componentWillUnmount() {
    this.setState(this.defaultState);
  }

  onBroadcastStart() {
    console.log('Bcast start');
    Vibration.vibrate();
    Vibration.vibrate();
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
        this.setState(this.resetState);
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
      this.initBroadcastToServer().then(() => {
        this.setState({ isInitiated: true, broadcasting: true });
      });
    });
  }

  onTagListChange(tagList) {
    this.setState({ tagList });
  }

  dismisInfo() {
    this.setState({
      infoShowed: false,
    });
  }

  postTagToServer() {
    const { tagList, userId, userToken } = this.state;
    return Promise.all(tagList.map(tagName => service.createTag(userId, userToken, tagName)));
  }

  initBroadcastToServer() {
    const { userId, userToken, streamTitle } = this.state;
    return this.postTagToServer()
      .then((tagArr) => {
        console.log('nih', tagArr);
        const acceptedTagList = [];
        for (let i = 0; i < tagArr.length; i += 1) {
          acceptedTagList.push({ id: tagArr[i].data.id });
        }
        return acceptedTagList;
      })
      .then(acceptedTagList =>
        service.initBroadcast(userId, userToken, streamTitle, acceptedTagList))
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
      infoShowed,
      streamHash,
      userId,
      isInitiated,
    } = this.state;
    const { isFrontCamera } = this.props;
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
          frontCamera={isFrontCamera}
        />

        {infoShowed && (
          <StreamStart
            onLivePress={() => this.onLivePress()}
            onTitleChange={streamTitle => this.setState({ streamTitle })}
            onTagListChange={tagList => this.onTagListChange(tagList)}
          />
        )}
        {isInitiated && (
          <BroadcastingFragment broadcasterId={userId} onClose={() => this.onClose()} />
        )}
        {!isInitiated && (
          <Text style={styles.stream.close} onPress={() => this.onClose()}>
            X
          </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFrontCamera: getIsFrontCamera(state.broadcastReducer),
});

export default connect(mapStateToProps)(Stream);
