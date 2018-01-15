import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList, LayoutAnimation } from 'react-native';
import styles from '../styles';
import assets from '../assets';

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
    let count = viewerList.length;
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
          source={{ uri: item.image, width: 35, height: 35 }}
          resizeMode="cover"
        />
      </View>
    );
  }
  render() {
    const { onClosePress, viewerList } = this.props;
    const { expanded } = this.state;
    let data = [];
    if (!expanded) {
      data = viewerList.slice(0, 3);
    } else {
      data = viewerList;
    }
    return (
      <View style={styles.watchLiveHeader.container}>
        <View style={styles.watchLiveHeader.infoContainer}>
          <Image
            style={styles.watchLiveHeader.image}
            source={{ uri: 'http://via.placeholder.com/350x150', width: 35, height: 35 }}
          />
          <Text style={styles.watchLiveHeader.text}>John Doe</Text>
        </View>
        <View style={styles.watchLiveHeader.streamInfo}>
          <View style={styles.watchLiveHeader.coinContainer}>
            <Image
              style={styles.watchLiveHeader.coinImage}
              source={assets.nutPlain}
              resizeMode="contain"
            />
            <Text style={styles.watchLiveHeader.coinText}>218695</Text>
          </View>
          {/* <View style={styles.watchLiveHeader.viewerCount}>
            <Image
              source={assets.eye}
              style={styles.watchLiveHeader.viewImage}
              resizeMode="stretch"
            />
            <Text style={styles.watchLiveHeader.viewText}>100000</Text>
          </View> */}
          <FlatList
            data={data}
            horizontal
            style={styles.watchLiveHeader.viewerList}
            renderItem={item => this.renderItem(item)}
            ListHeaderComponent={() => this.renderHeader()}
            // ListFooterComponent={() => this.renderFooter()}
            inverted
          />
        </View>
        <TouchableOpacity onPress={() => onClosePress()} style={styles.watchLiveHeader.close}>
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
  onClosePress: PropTypes.func,
  profilePicture: PropTypes.string,
  coin: PropTypes.number,
  viewCount: PropTypes.number,
};

export default WatchLiveHeader;
