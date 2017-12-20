import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actionCreators, selectAccessToken, reLogin, selectIsLoading } from '../ducks/login';
import { getLastError, didReceiveError, ERROR_TAG, ERROR_MESSAGE } from '../ducks/error';
import withError from '../helpers/errorHandler';
import AssetManager from '../assets';
import StylesManager from '../styles';
import Storage from '../data/storage';
import Loading from '../components/LoadingPage';

const styles = StylesManager.login;

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // navigation: PropTypes.shape({
    //   navigate: PropTypes.func.isRequired,
    // }).isRequired,
    isFetching: PropTypes.bool.isRequired,
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

  onFacebookLogin(error, result) {
    if (error) {
      alert(`Login Has Error${result.error}`);
    } else if (result.canceled) {
      alert('login is canceled');
    } else {
      this.setState({ isLoading: true });
      AccessToken.getCurrentAccessToken().then(() => {
        this.buildUserProfileRequest();
      });
    }
  }

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
    const { isFetching } = this.props;
    console.log(isFetching);
    if (isLoading || isFetching) {
      return <Loading />;
    }
    return (
      <LinearGradient
        style={styles.container}
        colors={['#D81B60', '#E91E63', '#f44336']}
        locations={[0, 0.2, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <Image source={AssetManager.logo} style={styles.logo} />
        <LoginButton
          readPermissions={['public_profile', 'email']}
          style={styles.loginButton}
          onLoginFinished={(error, result) => this.onFacebookLogin(error, result)}
        />
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
