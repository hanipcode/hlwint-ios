import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as service from '../helpers/api';
import Storage from '../data/storage';
import styles from '../styles';
import assets from '../assets';
import constants from '../constants';

const ROUND_ICON_BG_COLOR = ['#FBC02D', '#ECEFF1', '#F57C00'];

class OtherUserProfile extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        targetId: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      topFanData: null,
    };
  }

  async componentWillMount() {
    const userData = await Storage.getUser();
    const token = await Storage.getToken();
    const { id } = userData;
    service.getOtherUserProfile(id, token, 43).then((response) => {
      if (response.message !== 'success') {
        throw new Error('Failed to fetch user');
      }
      console.log(response.data);
      this.setState({ profileData: response.data });
    });
    service.getTopFan(43).then((response) => {
      this.setState({ topFanData: response.fans });
      console.log(response);
    });
  }

  renderItem({ item: fanItem, index }) {
    return (
      <View>
        <Image
          source={{ uri: fanItem.avatar, width: 40, height: 40 }}
          style={styles.otherUserProfile.fanProfileImage}
        />
        <View
          style={{
            backgroundColor: ROUND_ICON_BG_COLOR[index],
            height: 20,
            width: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          <Text style={styles.otherUserProfile.nickText}>{index + 1}</Text>
        </View>
      </View>
    );
  }

  render() {
    console.disableYellowBox = true;
    const { profileData, topFanData } = this.state;
    return (
      <View>
        <ScrollView>
          <View style={styles.otherUserProfile.container}>
            <View style={styles.otherUserProfile.topWrapper}>
              <Image
                source={{
                  uri: profileData.profile_pic || constants.PLACEHOLDER_URI,
                  width: 400,
                  height: 400,
                }}
                resizeMode="cover"
                style={styles.otherUserProfile.profilePicture}
              />
              <LinearGradient
                {...constants.GRADIENT_TOP_OVERLAY}
                style={styles.otherUserProfile.topTextHolder}
              >
                <Image source={assets.back} style={styles.otherUserProfile.backImage} />
                <View style={styles.otherUserProfile.textContainer}>
                  <Text style={styles.otherUserProfile.nameText}>
                    {profileData.first_name} {profileData.last_name}
                  </Text>
                  <Text style={styles.otherUserProfile.nickText}>@{profileData.nick_name}</Text>
                </View>
              </LinearGradient>
              <LinearGradient
                {...constants.GRADIENT_BOTTOM_OVERLAY}
                style={styles.otherUserProfile.bottomFansHolder}
              >
                {topFanData && <Text style={styles.otherUserProfile.nameText}>{'Top\nFan'}</Text>}
                {topFanData && (
                  <FlatList
                    data={topFanData.slice(0, 3)}
                    renderItem={item => this.renderItem(item)}
                    horizontal
                  />
                )}
              </LinearGradient>
            </View>
            <View style={styles.otherUserProfile.followContainer}>
              <View style={styles.otherUserProfile.followItem}>
                <Text style={styles.otherUserProfile.countText}>{profileData.follower_count}</Text>
                <Text style={styles.otherUserProfile.countLabel}>Follower</Text>
              </View>
              <View style={styles.otherUserProfile.followItem}>
                <Text style={styles.otherUserProfile.countText}>{profileData.fan_count}</Text>
                <Text style={styles.otherUserProfile.countLabel}>Following</Text>
              </View>
            </View>
            <View style={styles.otherUserProfile.detailContainer}>
              <View style={styles.otherUserProfile.detailContainerItem}>
                <Text style={styles.otherUserProfile.detailContainerLabel}>Send</Text>
                <View style={styles.otherUserProfile.detailContainerText}>
                  <Text>
                    {profileData.send_coin_count}
                    <Image style={styles.otherUserProfile.nutsIcon} source={assets.nutPlain} />
                  </Text>
                </View>
              </View>
              <View style={styles.otherUserProfile.detailContainerItem}>
                <Text style={styles.otherUserProfile.detailContainerLabel}>City</Text>
                <View style={styles.otherUserProfile.detailContainerText}>
                  <Text>{profileData.city}</Text>
                </View>
              </View>
              <View style={styles.otherUserProfile.detailContainerItem}>
                <Text style={styles.otherUserProfile.detailContainerLabel}>Hlwint ID</Text>
                <View style={styles.otherUserProfile.detailContainerText}>
                  <Text>{profileData.nick_name}</Text>
                </View>
              </View>
              <View style={styles.otherUserProfile.detailContainerItem}>
                <Text style={styles.otherUserProfile.detailContainerLabel}>Bio</Text>
                <Text style={styles.otherUserProfile.detailContainerTextLast}>
                  {profileData.biography}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.otherUserProfile.footer}>
          <TouchableHighlight style={styles.otherUserProfile.footerButtonFollow}>
            <Text style={styles.otherUserProfile.footerButtonText}>Follow</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.otherUserProfile.footerButtonMessage}>
            <Text style={styles.otherUserProfile.footerButtonText}>Message</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default OtherUserProfile;
