import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import styles from '../styles';
import { publishGift } from '../data/pubnub';
import Loading from './LoadingPage';
import CONSTANTS from '../constants';

class GiftBox extends React.Component {
  static propTypes = {
    giftList: PropTypes.shape({
      basic: PropTypes.array.isRequired,
      hot: PropTypes.array.isRequired,
      premium: PropTypes.array.isRequired,
    }).isRequired,
    broadcasterId: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      u_full_name: PropTypes.string.isRequired,
      u_profile_pic: PropTypes.string.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  async onGiftPress(gift) {
    const { broadcasterId, userInfo } = this.props;
    const { id, u_full_name, u_profile_pic } = userInfo;
    await publishGift(
      broadcasterId.toString(),
      {
        id,
        name: u_full_name,
        avatar: u_profile_pic,
      },
      1,
      gift.cs_itemname,
      gift.cs_image,
    );
  }

  goToIndex(toIndex) {
    const { index } = this.state;
    if (toIndex === index) return;
    this.setState({ index: toIndex });
    if (toIndex > index) {
      this.swiper.scrollBy(toIndex - index);
    }
    if (toIndex < index) {
      this.swiper.scrollBy(toIndex - index);
    }
  }

  render() {
    const { index } = this.state;
    const { giftList } = this.props;
    const { basic, hot, premium } = giftList;
    if (!basic || !hot || !premium) return <Loading backgroundColor="#FFF" />;
    return (
      <View style={styles.giftBox.container}>
        <View style={styles.giftBox.buttonContainer}>
          <TouchableHighlight
            style={index === 0 ? styles.giftBox.selected : styles.giftBox.button}
            onPress={() => this.goToIndex(0)}
          >
            <Text style={styles.giftBox.buttonText}>Hot</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={index === 1 ? styles.giftBox.selected : styles.giftBox.button}
            onPress={() => this.goToIndex(1)}
          >
            <Text style={styles.giftBox.buttonText}>Basic</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={index === 2 ? styles.giftBox.selected : styles.giftBox.button}
            onPress={() => this.goToIndex(2)}
          >
            <Text style={styles.giftBox.buttonText}>Premium</Text>
          </TouchableHighlight>
        </View>
        <Swiper
          loop={false}
          style={{ alignItems: 'center', justifyContent: 'center' }}
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          showsPagination={false}
          onIndexChanged={newIndex => this.setState({ index: newIndex })}
        >
          <ScrollView contentContainerStyle={styles.giftBox.giftBox}>
            {hot.map(gift => (
              <TouchableOpacity
                onPress={() => this.onGiftPress(gift)}
                style={styles.giftBox.giftImageContainer}
                key={gift.cs_itemname}
              >
                <Image
                  source={{
                    uri: `data:image/png;base64,${gift.cs_image}`,
                    height: 50,
                    width: 50,
                    cache: 'force-cache',
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.giftBox.text}>{gift.cs_itemname}</Text>
                <Text style={styles.giftBox.text}>{gift.cs_amount}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView contentContainerStyle={styles.giftBox.giftBox}>
            {basic.map(gift => (
              <TouchableOpacity
                onPress={() => this.onGiftPress(gift)}
                key={`basic${gift.cs_itemname}`}
                style={styles.giftBox.giftImageContainer}
              >
                <Image
                  source={{
                    uri: `data:image/png;base64,${gift.cs_image}`,
                    height: 50,
                    width: 50,
                    cache: 'force-cache',
                  }}
                  key={`basicimage${gift.cs_itemname}`}
                  resizeMode="contain"
                />
                <Text style={styles.giftBox.text}>{gift.cs_itemname}</Text>
                <Text style={styles.giftBox.text}>{gift.cs_amount}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView contentContainerStyle={styles.giftBox.giftBox}>
            {premium.map(gift => (
              <TouchableOpacity
                onPress={() => this.onGiftPress(gift)}
                key={`premium${gift.cs_itemname}`}
                style={styles.giftBox.giftImageContainer}
              >
                <Image
                  source={{
                    uri: `data:image/png;base64,${gift.cs_image}`,
                    height: 50,
                    width: 50,
                    cache: 'force-cache',
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.giftBox.text}>{gift.cs_itemname}</Text>
                <Text style={styles.giftBox.text}>{gift.cs_amount}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Swiper>
        <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={styles.giftBox.footerBox}>
          <View>
            <Text>Balance</Text>
            <Text>305</Text>
          </View>
          <View style={styles.picker.container}>
            <View style={styles.picker.activeContainer}>
              <Text>1</Text>
              <View style={styles.picker.pickerTriangle} />
            </View>
            <View style={styles.picker.option}>
              <TouchableHighlight style={styles.picker.optionItem}>
                <Text style={styles.picker.optionItemText}>2</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.picker.optionItem}>
                <Text style={styles.picker.optionItemText}>3</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.picker.optionItem}>
                <Text style={styles.picker.optionItemText}>4</Text>
              </TouchableHighlight>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={styles.giftBox.footerBox}>
          <View />
        </LinearGradient>
      </View>
    );
  }
}

export default GiftBox;
