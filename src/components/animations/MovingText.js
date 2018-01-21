import React from 'react';
import PropTypes, { string, number } from 'prop-types';
import { View, Text, Animated, Dimensions } from 'react-native';
import constants from '../../constants';

const { width } = Dimensions.get('window');

class MovingText extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    children: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
  };
  static defaultProps = {
    width,
    color: '#000',
    size: 14,
  };
  constructor(props) {
    super(props);
    this.state = {
      textTranslateX: new Animated.Value(0),
    };
  }
  componentDidMount() {
    const { textTranslateX } = this.state;
    const { width: propWidth, children } = this.props;
    let toLeft;
    if (typeof children === String) {
      toLeft = children.length;
    } else {
      toLeft = -100;
    }
    Animated.loop(Animated.timing(textTranslateX, {
      toValue: toLeft,
      duration: 7000,
      useNativeDriver: true,
    })).start();
  }

  render() {
    const {
      children, width: propWidth, color, size,
    } = this.props;
    const { textTranslateX } = this.state;
    return (
      <View
        style={{
          width: propWidth,
          overflow: 'hidden',
          backgroundColor: 'blue',
        }}
      >
        <Animated.Text
          style={{
            flexWrap: 'nowrap',
            width,
            transform: [{ translateX: textTranslateX }],
            color,
            textShadowColor: 'rgba(0, 0, 0, 0.9)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
            fontWeight: '600',
            fontSize: size,
            backgroundColor: 'transparent',
          }}
        >
          {children}
        </Animated.Text>
      </View>
    );
  }
}

export default MovingText;
