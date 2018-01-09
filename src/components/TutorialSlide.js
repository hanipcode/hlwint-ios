import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Image, TouchableHighlight, Text, View } from 'react-native';
import StyleManager from '../styles';
import CONFIG from '../constants';

const styles = StyleManager.tutorial;

const TutorialSlide = ({
  slideImage, slideText, isLast, onPress,
}) => (
  <LinearGradient style={styles.container} {...CONFIG.GRADIENTS_PROPS}>
    <Image source={slideImage} style={styles.image} />
    <Image source={slideText} style={styles.textImage} />
    {isLast && (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableHighlight>
    )}
    <View style={styles.textImageBg} />
  </LinearGradient>
);

TutorialSlide.propTypes = {
  slideImage: PropTypes.number.isRequired,
  slideText: PropTypes.number.isRequired,
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
};
TutorialSlide.defaultProps = {
  isLast: false,
  onPress: () => false,
};

export default TutorialSlide;
