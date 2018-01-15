import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text } from 'react-native';
import styles from '../styles';

const Button = ({
  onPress, text, style, textStyle,
}) => (
  <TouchableHighlight style={[styles.button.container, style]} onPress={onPress}>
    <Text style={[styles.button.buttonText, textStyle]}>{text}</Text>
  </TouchableHighlight>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  textStyle: PropTypes.shape({}),
};

Button.defaultProps = {
  style: {},
  textStyle: {},
};

export default Button;
