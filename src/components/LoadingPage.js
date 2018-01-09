import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';

const Loading = ({ backgroundColor }) => (
  <View style={{
 flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor,
}}>
    <ActivityIndicator size="large" />
  </View>
);

Loading.propTypes = {
  backgroundColor: PropTypes.string,
};

Loading.defaultProps = {
  backgroundColor: 'transparent',
};

export default Loading;
