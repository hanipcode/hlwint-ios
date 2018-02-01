import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, StyleSheet, Dimensions, Image } from 'react-native';
import assets from '../assets';

const { width, height } = Dimensions.get('window');

const Loading = ({ backgroundColor }) => (
  <View
    style={{
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    }}
  >
    <View
      style={{
        backgroundColor: 'transparent',
        width: width / 1.618 / 1.618,
        height: height / 1.618 / 1.618 / 1.618,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <ActivityIndicator size="small" /> */}
      <Image source={assets.refreshJump} style={{ width: 50, height: 50 }} />
    </View>
  </View>
);

Loading.propTypes = {
  backgroundColor: PropTypes.string,
};

Loading.defaultProps = {
  backgroundColor: 'transparent',
};

export default Loading;
