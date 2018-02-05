import React from 'react';
import { View, Text, Image, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import constants from '../constants';
import * as service from '../helpers/api';
import Storage from '../data/storage';
import LoadingPage from '../components/LoadingPage';
import styles from '../styles';
import assets from '../assets';

const resetToLive = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Live',
    }),
  ],
});

class ViewerLiveEnded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      followLoading: false,
    };
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { userId } = state.params;
    const currentUser = await Storage.getUser();
    const token = await Storage.getToken();
    const { id } = currentUser;
    service
      .getOtherUserProfile(id, token, userId)
      .then((userData) => {
        this.setState({ userData: userData.data });
      })
      .catch((error) => {
        const userDataError = {
          first_name: "Can't connect",
          last_name: 'to User',
          profile_pic: constants.PLACEHOLDER_URI,
          follower_count: 0,
          fan_count: 0,
        };
        this.setState({ userData: userDataError });
      });
  }

  async followUnfollow() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { userId } = state.params;
    const currentUser = await Storage.getUser();
    const token = await Storage.getToken();
    const { id } = currentUser;
    const { userData } = this.state;
    this.setState({ followLoading: true });
    try {
      const follow = await service.addOrRemoveFollowing(id, token, userId);
      if (/success/.test(follow.message)) {
        userData.following = userData.following === 'true' ? 'false' : 'true';
      }
      this.setState({ userData, followLoading: false });
    } catch (err) {
      Alert.alert('follow user failed, please try again');
      this.setState({ followLoading: false });
    }
  }

  render() {
    const { navigation } = this.props;
    const { userData, followLoading } = this.state;
    return (
      <LinearGradient style={styles.viewerLiveEnded.container} {...constants.GRADIENTS_PROPS}>
        {userData && (
          <View style={styles.viewerLiveEnded.labelContainer}>
            <Text style={styles.viewerLiveEnded.label}>Live Ended</Text>
            <Image
              style={styles.viewerLiveEnded.profilePicture}
              source={{ uri: userData.profile_pic, height: 100, width: 100 }}
            />
            <Text style={styles.viewerLiveEnded.nameText}>
              {`${userData.first_name} `}
              {userData.last_name}
            </Text>
            <Text style={styles.viewerLiveEnded.nickText}>{`@${userData.nick_name}`}</Text>
          </View>
        )}
        {userData && (
          <View style={styles.viewerLiveEnded.bottomContainer}>
            <View style={styles.viewerLiveEnded.followContainer}>
              <View style={styles.viewerLiveEnded.followContainerItem}>
                <Text style={styles.viewerLiveEnded.followLabel}>Follower</Text>
                <Text style={styles.viewerLiveEnded.countText}>{userData.follower_count}</Text>
              </View>
              <View
                style={[
                  styles.viewerLiveEnded.followContainerItem,
                  styles.viewerLiveEnded.followContainerItemRight,
                ]}
              >
                <Text style={styles.viewerLiveEnded.followLabel}>Following</Text>
                <Text style={styles.viewerLiveEnded.countText}>{userData.fan_count}</Text>
              </View>
            </View>
            {userData.following === 'false' && (
              <TouchableHighlight
                style={styles.viewerLiveEnded.button}
                onPress={() => this.followUnfollow()}
                underlayColor="#D81B60"
              >
                <View style={styles.viewerLiveEnded.buttonContainer}>
                  <Image
                    source={assets.follow}
                    style={{ width: 25, height: 25, marginRight: 10 }}
                  />
                  <Text style={styles.viewerLiveEnded.buttonText}>Follow</Text>
                  {followLoading && <LoadingPage backgroundColor="rgba(0,0,0, 0.1)" />}
                </View>
              </TouchableHighlight>
            )}
            {userData.following === 'true' && (
              <TouchableHighlight
                style={styles.viewerLiveEnded.buttonDisabled}
                onPress={() => this.followUnfollow()}
                underlayColor="#777"
              >
                <View style={styles.viewerLiveEnded.buttonContainer}>
                  <Image
                    source={assets.following}
                    style={{ width: 25, height: 25, marginRight: 10 }}
                  />
                  <Text style={styles.viewerLiveEnded.buttonText}>Followed</Text>
                  {followLoading && <LoadingPage backgroundColor="rgba(0,0,0, 0.1)" />}
                </View>
              </TouchableHighlight>
            )}
          </View>
        )}
        {!userData && <LoadingPage backgroundColor="rgba(0, 0, 0, 0.8)" />}
        <TouchableOpacity
          style={styles.viewerLiveEnded.closeContainer}
          onPress={() => requestAnimationFrame(() => navigation.dispatch(resetToLive))}
        >
          <Image
            source={assets.close}
            style={{ width: 20, height: 20, padding: 5 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

export default ViewerLiveEnded;
