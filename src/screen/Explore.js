import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Image, FlatList, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
  getIsFetching,
  getTopFollower,
  getTopTags,
  getTopRank,
  getOfficialImage,
  fetchExplore,
} from '../ducks/explore';
import MainHeader from '../components/MainHeader';
import styles from '../styles';
import constants from '../constants';

const { width } = Dimensions.get('window');

function LightenDarkenColor(col, amt) {
  let usePound = false;

  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);
  if (num.toString().length < 8) num += 413012;
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

class Explore extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    topFollower: PropTypes.instanceOf(List).isRequired,
    officialImage: PropTypes.string.isRequired,
    topTags: PropTypes.instanceOf(List).isRequired,
    topRank: PropTypes.instanceOf(List).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchExplore());
  }

  renderRoundImageItem({ item }) {
    return (
      <Image
        source={{ uri: item.get('u_profile_pic'), width: width / 4.65, height: width / 4.65 }}
        style={styles.explore.roundImage}
      />
    );
  }

  renderRectImageItem({ item }) {
    return (
      <Image
        source={{ uri: item.get('u_profile_pic'), width: width / 3, height: width / 3 }}
        style={styles.explore.rectImage}
      />
    );
  }

  renderTagsItem({ item }) {
    return (
      <View
        style={[
          styles.explore.tagItem,
          { backgroundColor: LightenDarkenColor(item.get('t_color_code'), 15) },
        ]}
      >
        <Text style={styles.explore.tagText}>{item.get('t_name')}</Text>
      </View>
    );
  }

  render() {
    const {
      topFollower, topRank, topTags, officialImage,
    } = this.props;
    return (
      <View style={styles.explore.container}>
        <MainHeader />
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <Image
            source={{ uri: officialImage || constants.PLACEHOLDER_URI, width, height: 120 }}
            resizeMethod="cover"
          />
          <Text style={styles.explore.headerText}>Top Rank</Text>
          <View style={styles.explore.roundImageContainer}>
            <FlatList
              data={topRank.toArray()}
              renderItem={item => this.renderRoundImageItem(item)}
              keyExtractor={item => item.get('id')}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text style={styles.explore.headerText}>Top Follower</Text>
          <View style={styles.explore.roundImageContainer}>
            <FlatList
              data={topFollower.toArray()}
              contentContainerStyle={styles.explore.rectFlatList}
              renderItem={item => this.renderRectImageItem(item)}
              keyExtractor={item => item.get('id')}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.explore.tagContainer}>
            <FlatList
              data={topTags.toArray()}
              contentContainerStyle={styles.explore.rectFlatList}
              renderItem={item => this.renderTagsItem(item)}
              keyExtractor={item => item.get('id')}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state.exploreReducer),
  topFollower: getTopFollower(state.exploreReducer),
  topTags: getTopTags(state.exploreReducer),
  topRank: getTopRank(state.exploreReducer),
  officialImage: getOfficialImage(state.exploreReducer),
});

export default connect(mapStateToProps)(Explore);
