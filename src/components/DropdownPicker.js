import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Animated, Dimensions, LayoutAnimation } from 'react-native';
import _ from 'lodash';
import styles from '../styles';

const { height } = Dimensions.get('window');

class DropdownPicker extends React.Component {
  static propTypes = {
    selected: PropTypes.number,
    onDropdownChange: PropTypes.func,
  };

  static defaultProps = {
    selected: null,
    onDropdownChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      optionHeight: new Animated.Value(0),
      optionOpacity: new Animated.Value(0),
      expanded: false,
      selected: null,
    };
  }

  onActivePress() {
    const { optionHeight, optionOpacity, expanded } = this.state;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.parallel([
      Animated.timing(optionOpacity, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(optionHeight, {
        duration: 300,
        toValue: expanded ? 0 : -10,
        useNativeDriver: true,
      }),
    ]).start();
    this.setState({ expanded: !expanded });
  }

  onOptionPress(selected) {
    const { onDropdownChange } = this.props;
    this.setState({ selected });
    this.onActivePress();
    if (onDropdownChange) {
      onDropdownChange(selected);
    }
  }

  render() {
    const { optionHeight, optionOpacity, expanded } = this.state;
    const { selected: selectedInState } = this.state;
    const { selected } = this.props;

    return (
      <View style={styles.picker.container}>
        <TouchableOpacity
          onPress={() => this.onActivePress()}
          style={styles.picker.activeContainer}
        >
          <Text>{selected || selectedInState}</Text>
          <View style={styles.picker.pickerTriangle} />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.picker.option,
            !expanded && { height: 0 },
            {
              transform: [{ translateY: optionHeight }],
              opacity: optionOpacity,
            },
          ]}
        >
          {_.range(9, 0).map(value => (
            <TouchableOpacity
              style={styles.picker.optionItem}
              key={value}
              onPress={() => this.onOptionPress(value)}
            >
              <Text style={styles.picker.optionItemText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    );
  }
}

export default DropdownPicker;
