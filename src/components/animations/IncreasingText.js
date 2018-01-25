import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class IncreasingText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputValue: props.value,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { value } = this.props;
  //   const { value: nextValue } = nextProps;
  // }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    const { value: nextValue } = nextProps;
    clearInterval(this.increaseInterval);
    this.increaseInterval = setInterval(() => {
      const { outputValue } = this.state;
      if (nextValue === outputValue) {
        clearInterval(this.increaseInterval);
        return;
      }
      if (nextValue > outputValue) {
        this.setState({ outputValue: outputValue + 1 });
      } else if (nextValue < outputValue) {
        this.setState({ outputValue: outputValue - 1 });
      }
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.increaseInterval);
  }

  render() {
    const { outputValue } = this.state;
    return <Text {...this.props}>{outputValue}</Text>;
  }
}

IncreasingText.propTypes = {
  value: PropTypes.number,
};

IncreasingText.defaultProps = {
  value: 0,
};

export default IncreasingText;
