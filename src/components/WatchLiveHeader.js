import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList, LayoutAnimation } from 'react-native';
import { List, Map } from 'immutable';
import ZawgyiText from './ZawgyiText';
import styles from '../styles';
import assets from '../assets';
import CONSTANTS from '../constants';
import IncreasingText from './animations/IncreasingText';

class WatchLiveHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  onExpandPress() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ expanded: !this.state.expanded });
  }
  renderHeader() {
    const { viewerList } = this.props;
    let count = viewerList.size;
    if (count > 3) {
      count -= 3;
    }
    return (
      <TouchableOpacity
        onPress={() => this.onExpandPress()}
        style={styles.watchLiveHeader.viewerListHeader}
      >
        <Text style={styles.watchLiveHeader.viewerListHeaderText}>+{count}</Text>
      </TouchableOpacity>
    );
  }
  renderFooter() {
    return (
      <View style={styles.watchLiveHeader.viewerListFooter}>
        <Text>-</Text>
      </View>
    );
  }
  renderItem({ item }) {
    const { expanded } = this.state;
    return (
      <View>
        <Image
          style={
            expanded
              ? styles.watchLiveHeader.viwerListItemExpanded
              : styles.watchLiveHeader.viewerListItemCollapsed
          }
          source={{
            uri: item.get('profilePicture') || CONSTANTS.PLACEHOLDER_URI,
            width: 32,
            height: 32,
          }}
          resizeMode="cover"
        />
      </View>
    );
  }

  excerptName(name) {
    if (name.length < 16) return name;
    return `${name.substring(0, 16)}...`;
  }

  render() {
    const {
      onClosePress, viewerList, broadcasterCoin, broadcasterInfo, isShowed,
    } = this.props;
    const { expanded } = this.state;
    let data = [];
    if (!expanded) {
      data = viewerList.take(3);
    } else {
      data = viewerList;
    }
    return (
      <View style={styles.watchLiveHeader.container}>
        {isShowed && (
          <View style={styles.watchLiveHeader.streamInfo}>
            <View style={styles.watchLiveHeader.infoContainer}>
              <Image
                style={styles.watchLiveHeader.image}
                source={{
                  uri: broadcasterInfo.get('profilePicture') || CONSTANTS.PLACEHOLDER_URI,
                  width: 35,
                  height: 35,
                }}
              />
              <Text style={styles.watchLiveHeader.text}>
                <ZawgyiText style={styles.watchLiveHeader.nameText}>
                  {this.excerptName(broadcasterInfo.get('name'))}
                </ZawgyiText>
              </Text>
            </View>
            <FlatList
              data={data.toArray()}
              horizontal
              style={styles.watchLiveHeader.viewerList}
              renderItem={item => this.renderItem(item)}
              ListHeaderComponent={() => this.renderHeader()}
              showsHorizontalScrollIndicator={false}
              // ListFooterComponent={() => this.renderFooter()}
              inverted
            />
          </View>
        )}
        {isShowed && (
          <View style={styles.watchLiveHeader.coinContainer}>
            <Image
              style={styles.watchLiveHeader.coinImage}
              source={assets.nutPlain}
              resizeMode="contain"
            />
            {/* <Text style={styles.watchLiveHeader.coinText}>{broadcasterCoin}</Text> */}
            <IncreasingText style={styles.watchLiveHeader.coinText} value={broadcasterCoin} />
          </View>
        )}
        <TouchableOpacity
          onPress={() => requestAnimationFrame(() => onClosePress())}
          style={styles.watchLiveHeader.close}
        >
          <Image
            source={assets.close}
            resizeMode="contain"
            style={styles.watchLiveHeader.closeImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

WatchLiveHeader.propTypes = {
  onClosePress: PropTypes.func.isRequired,
  broadcasterInfo: PropTypes.instanceOf(Map).isRequired,
  broadcasterCoin: PropTypes.number.isRequired,
  viewerList: PropTypes.instanceOf(List).isRequired,
  isShowed: PropTypes.bool.isRequired,
};

export default WatchLiveHeader;
