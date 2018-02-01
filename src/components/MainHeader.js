import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CONSTANTS from '../constants';
import assets from '../assets';
import styles from '../styles';

const MainHeader = ({ profilePicture, onProfilePress }) => (
  <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={styles.home.header}>
    <Image source={assets.logo_white} style={styles.home.logo} resizeMode="contain" />
    {profilePicture && (
      <TouchableOpacity onPress={() => onProfilePress()} style={styles.home.profile_picture}>
        <Image
          source={{ uri: profilePicture || CONSTANTS.PLACEHOLDER_URI, width: 32, height: 32 }}
          style={styles.home.profilePictureImage}
        />
      </TouchableOpacity>
    )}
  </LinearGradient>
);

MainHeader.propTypes = {
  profilePicture: PropTypes.string,
  onProfilePress: PropTypes.func.isRequired,
};

MainHeader.defaultProps = {
  profilePicture: null,
};

export default MainHeader;
