import React from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList } from 'react-native';
import _ from 'lodash';

class ZawgyiText extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { children } = nextProps;
    if (this.props.children === children) return false;
    return true;
  }

  isNotAlphanumeric(word) {
    return !/[a-z0-9]/.test(word);
  }

  render() {
    const { children, style } = this.props;
    const zawgyiStyle = [
      {
        fontFamily: 'Zawgyi-One',
      },
      style,
    ];
    const normalStyle = [
      {
        fontFamily: 'System',
      },
      style,
    ];
    return (
      <Text>
        {_.map(children.split(' '), (word, index) => (
          <Text key={word + index} style={this.isNotAlphanumeric(word) ? zawgyiStyle : normalStyle}>
            {word}{' '}
          </Text>
        ))}
      </Text>
    );
  }
}

export default ZawgyiText;
