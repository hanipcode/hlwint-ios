import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { getHeartIdList } from '../ducks/watchLive';
import Heart from './Heart';
import styles from '../styles';

class HeartContainer extends Component {
  static propTypes = {
    heartIdList: PropTypes.instanceOf(List).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { heartIdList } = this.props;
    if (heartIdList.size === 0) {
      return null;
    }
    return (
      <View style={styles.heartContainer.container} pointerEvents="none">
        {/* <Text style={{ color: '#FFF' }}>{heart.length}</Text> */}
        {heartIdList.map(heartItem => (
          <Heart
            key={heartItem}
            id={heartItem}
            // avatar={heartItem.avatar}
            // removeHeart={() => this.removeHeart(heartItem.id)}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  heartIdList: getHeartIdList(state.watchLiveReducer),
});

export default connect(mapStateToProps)(HeartContainer);
