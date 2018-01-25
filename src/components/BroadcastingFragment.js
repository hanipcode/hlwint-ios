import React from 'react';
import { View, Text } from 'react-native';

class BroadcastingFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ backgroundColor: '#FFF' }}>
        <Text>DOOOOR</Text>
      </View>
    );
  }
}

export default BroadcastingFragment;
