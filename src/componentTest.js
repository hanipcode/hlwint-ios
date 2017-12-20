/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './screen/LoginPage';
import Tutorial from './screen/Tutorial';

// create a component
class TestComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tutorial />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});

export default TestComponent;
