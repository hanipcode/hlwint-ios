import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import LinearGradient from 'react-native-linear-gradient';
import { getProfile, fetchUserProfile } from '../ducks/userInfo';
import LoadingPage from '../components/LoadingPage';
import assets from '../assets';
import styles from '../styles';
import CONSTANTS from '../constants';
import Storage from '../data/storage';

const resetToLogin = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Login',
    }),
  ],
});

// const resetToTerm = NavigationActions.reset({
//   index: 1,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'CurrentUserProfile',
//     }),
//     NavigationActions.navigate({
//       routeName: 'TermOfUse',
//     }),
//   ],
// });
class CurrentUserProfile extends React.Component {
  static propTypes = {
    userInfo: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserProfile());
  }

  async logout() {
    const { navigation } = this.props;
    await Storage.resetToken();
    navigation.dispatch(resetToLogin);
  }

  toTermOfUse() {
    const { navigation } = this.props;
    navigation.navigate('TermOfUse');
  }

  toPrivacyPolicy() {
    const { navigation } = this.props;
    navigation.navigate('PrivacyPolicy');
  }

  toRecharge() {
    const { navigation, userInfo } = this.props;
    navigation.navigate('Recharge', {
      userId: userInfo.get('id'),
    });
  }

  toIncome() {
    const { navigation, userInfo } = this.props;
    navigation.navigate('Income', {
      userId: userInfo.get('id'),
    });
  }
  render() {
    const { userInfo, navigation } = this.props;
    return (
      <View style={styles.currentUserProfile.container}>
        <LinearGradient style={styles.currentUserProfile.header} {...CONSTANTS.GRADIENTS_PROPS}>
          {!userInfo.get('profilePic') && <LoadingPage backgroundColor="rgba(0, 0, 0, 0.8)" />}
          {userInfo.get('profilePic') && (
            <Image
              source={{ uri: userInfo.get('profilePic'), width: 100, height: 100 }}
              style={styles.currentUserProfile.headerImage}
            />
          )}
          <TouchableOpacity
            style={styles.currentUserProfile.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={assets.back} />
          </TouchableOpacity>
          <Text style={styles.currentUserProfile.nameText}>{userInfo.get('fullName')}</Text>
          <Text style={styles.currentUserProfile.nickText}>@{userInfo.get('nickName')}</Text>
          <View style={styles.currentUserProfile.headerFooter}>
            <View style={styles.currentUserProfile.headerFooterItem}>
              <Text style={styles.currentUserProfile.countText}>
                {userInfo.get('followerCount')}
              </Text>
              <Text style={styles.currentUserProfile.text}>Follower</Text>
            </View>
            <View style={styles.currentUserProfile.headerFooterItem}>
              <Text style={styles.currentUserProfile.countText}>{userInfo.get('fanCount')}</Text>
              <Text style={styles.currentUserProfile.text}>Following</Text>
            </View>
            <View style={styles.currentUserProfile.headerFooterItem}>
              <Image source={assets.nutPlain} style={styles.currentUserProfile.nutImage} />
              <Text style={styles.currentUserProfile.text}>{userInfo.get('coin')}</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.currentUserProfile.body}>
          {/* <TouchableOpacity
            onPress={() => this.toIncome()}
            style={styles.currentUserProfile.bodyItem}
          >
            <Text style={styles.currentUserProfile.bodyText}>Income</Text>
            <View style={styles.currentUserProfile.rightBodyGroup}>
              <Text style={styles.currentUserProfile.rightInfo}>{userInfo.get('income')}</Text>
              <Text style={styles.currentUserProfile.bodyText}>></Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toRecharge()}
            style={styles.currentUserProfile.bodyItem}
          >
            <Text style={styles.currentUserProfile.bodyText}>Nuts</Text>
            <View style={styles.currentUserProfile.rightBodyGroup}>
              <Text style={styles.currentUserProfile.rightInfo}>{userInfo.get('coin')}</Text>
              <Text style={styles.currentUserProfile.bodyText}>></Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.toTermOfUse()}
            style={styles.currentUserProfile.bodyItem}
          >
            <Text style={styles.currentUserProfile.bodyText}>Term of Service</Text>
            <Text style={styles.currentUserProfile.bodyText}>></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toPrivacyPolicy()}
            style={styles.currentUserProfile.bodyItem}
          >
            <Text style={styles.currentUserProfile.bodyText}>Privacy Policy</Text>
            <Text style={styles.currentUserProfile.bodyText}>></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={styles.currentUserProfile.bodyItemLast}
          >
            <Text style={styles.currentUserProfile.bodyText}>Log Out</Text>
            <Text style={styles.currentUserProfile.bodyText}>></Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: getProfile(state.userInfoReducer),
});

export default connect(mapStateToProps)(CurrentUserProfile);
