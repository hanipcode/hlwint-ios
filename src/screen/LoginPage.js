import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actionCreators, selectAccessToken, reLogin, selectIsLoading } from '../ducks/login';
import error, { getLastError, didReceiveError, ERROR_TAG, ERROR_MESSAGE } from '../ducks/error';
import withError from '../helpers/errorHandler';
import AssetManager from '../assets';
import StylesManager from '../styles';
import Storage from '../data/storage';
import Loading from '../components/LoadingPage';
import constants from '../constants';
import normalizeText from '../helpers/normalizeText';

const styles = StylesManager.login;

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
  };

  static navigationOptions = {
    header: () => <View style={{ height: 0, backgroundColor: 'white', paddingTop: 22 }} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.graphRequestCallback.bind(this);
  }

  async componentWillMount() {
    const { dispatch } = this.props;
    try {
      const accessToken = await Storage.getToken();
      if (accessToken) {
        this.setState({ isLoading: true });
        dispatch(reLogin());
      }
    } catch (error) {
      console.error(error.message, error.stack);
      dispatch(didReceiveError(ERROR_TAG.LOC_STORAGE_ERROR, ERROR_MESSAGE.STORAGE_FAIL));
    }
  }

  onLoginButtonPress() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          alert('login is canceled');
        } else {
          this.setState({ isLoading: true });
          AccessToken.getCurrentAccessToken().then(() => {
            this.buildUserProfileRequest();
          });
        }
      })
      .catch((err) => {
        alert(`Login Has Error${err}`);
      });
  }

  // onFacebookLogin(error, result) {
  //   if (error) {
  //   } else if (result.canceled) {
  //     alert('login is canceled');
  //   } else {
  //     this.setState({ isLoading: true });
  //     AccessToken.getCurrentAccessToken().then(() => {
  //       this.buildUserProfileRequest();
  //     });
  //   }
  // }

  buildUserProfileRequest() {
    const userProfileRequest = new GraphRequest(
      '/me?fields=id,name,age_range,gender,first_name,last_name,email',
      null,
      this.graphRequestCallback.bind(this),
    );
    new GraphRequestManager().addRequest(userProfileRequest).start();
  }

  graphRequestCallback(error, result) {
    const { dispatch } = this.props;
    if (error) {
      console.log('user canceled');
    } else {
      const {
        first_name, last_name, gender, id, email,
      } = result;
      const profile_picture = `https://graph.facebook.com/${id}/picture?type=large`; // eslint-disable-line camelcase
      dispatch(actionCreators.login(
        first_name,
        last_name,
        null,
        gender,
        email,
        null,
        profile_picture,
        id,
        'facebook',
      ));
    }
  }

  render() {
    const { isLoading } = this.state;
    const { isFetching, navigation } = this.props;
    console.log(isFetching);

    return (
      <LinearGradient style={styles.container} {...constants.GRADIENTS_PROPS}>
        <View style={styles.backgroundImageContainer}>
          <Image source={AssetManager.home_bg} style={styles.backgroundImage} resizeMode="cover" />
        </View>
        <View style={styles.backgroundOverlay} />
        <Image source={AssetManager.logo} style={styles.logo} />
        <TouchableOpacity onPress={() => this.onLoginButtonPress()} style={styles.facebookLogin}>
          <Image
            source={AssetManager.facebook_login}
            style={styles.facebookLoginImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ textAlign: 'center', color: '#777', fontSize: normalizeText(12) }}>
            By continuing, you agree to our {'\n'}
            <Text style={{ fontWeight: '900' }} onPress={() => navigation.navigate('TermOfUse')}>
              Term of services{' '}
            </Text>
            and
            <Text
              style={{ fontWeight: '900' }}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              {' '}
              Privacy Policy
            </Text>
          </Text>
        </View>
        {(isLoading || isFetching) && <Loading backgroundColor="rgba(0, 0, 0, 0.8)" />}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  error: getLastError(state.errorReducer),
  accessToken: selectAccessToken(state.loginReducer),
  isFetching: selectIsLoading(state.loginReducer),
});

export default connect(mapStateToProps)(withError(Login));
