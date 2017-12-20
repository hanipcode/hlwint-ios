import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text } from 'react-native';
import styles from '../styles';

const Button = ({ onPress, text, style }) => (
  <TouchableHighlight style={[styles.button.container, style]} onPress={onPress}>
    <Text style={styles.button.buttonText}>{text}</Text>
  </TouchableHighlight>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

Button.defaultProps = {
  style: {},
};

export default Button;
