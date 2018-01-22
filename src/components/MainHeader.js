import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CONSTANTS from '../constants';
import assets from '../assets';
import styles from '../styles';

const MainHeader = ({ profilePicture }) => (
  <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={styles.home.header}>
    <Image source={assets.logo_white} style={styles.home.logo} resizeMode="contain" />
    {profilePicture && (
      <Image
        source={{ uri: profilePicture || CONSTANTS.PLACEHOLDER_URI, width: 32, height: 32 }}
        style={styles.home.profile_picture}
      />
    )}
  </LinearGradient>
);

MainHeader.propTypes = {
  profilePicture: PropTypes.string,
};

MainHeader.defaultProps = {
  profilePicture: null,
};

export default MainHeader;
