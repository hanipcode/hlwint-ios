import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView, LayoutAnimation } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import styles from '../styles';
import assets from '../assets';
import { publishGift } from '../data/pubnub';
import Loading from './LoadingPage';
import DropdownPicker from './DropdownPicker';
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
    onSendPress: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectedCount: null,
      selectedGift: null,
      selectedType: null,
    };
    
  }

  onGiftPress(type, gift) {
    this.setState({ selectedGift: gift, selectedType: type });
  }
  

  async onSendPress() {
    const { selectedGift: gift } = this.state;
    const { broadcasterId, userInfo } = this.props;
    const { id, u_full_name, u_profile_pic } = userInfo;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.onSendPress();
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

  onGoToIndex(toIndex) {
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

  onDropdownChangeIndex(selectedCount) {
    this.setState({ selectedCount });
  }

  isGiftSelected(type, itemName) {
    const { selectedGift, selectedType } = this.state;
    if (!selectedGift || !selectedType) {
      return false;
    }
    if (type !== selectedType) return false;
    if (itemName !== selectedGift.cs_itemname) return false;
    return true;
  }
  // async prepareGiftList(userId, accessToken) {
  //   const giftList = await service.getGiftList(userId, accessToken);
  //   return giftList;
  // }
  render() {
    const { index, selectedCount, selectedGift, selectedType } = this.state;
    const { giftList } = this.props;
    const { basic, hot, premium } = giftList;
    if (!basic || !hot || !premium) return <Loading backgroundColor="#FFF" />;
    return (
      <View style={styles.giftBox.container}>
        <View style={styles.giftBox.buttonContainer}>
          <TouchableHighlight
            style={index === 0 ? styles.giftBox.selected : styles.giftBox.button}
            onPress={() => this.onGoToIndex(0)}
          >
            <Text style={styles.giftBox.buttonText}>Hot</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={index === 1 ? styles.giftBox.selected : styles.giftBox.button}
            onPress={() => this.onGoToIndex(1)}
          >
            <Text style={styles.giftBox.buttonText}>Basic</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={index === 2 ? styles.giftBox.selected : styles.giftBox.button}
            onPress={() => this.onGoToIndex(2)}
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
                onPress={() => this.onGiftPress('hot', gift)}
                style={this.isGiftSelected('hot', gift.cs_itemname) ? styles.giftBox.giftImageContainerSelected : styles.giftBox.giftImageContainer}
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
              onPress={() => this.onGiftPress('basic', gift)}
              style={this.isGiftSelected('basic', gift.cs_itemname) ? styles.giftBox.giftImageContainerSelected : styles.giftBox.giftImageContainer}
                key={`basic${gift.cs_itemname}`}
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
              onPress={() => this.onGiftPress('premium', gift)}
              style={this.isGiftSelected('premium', gift.cs_itemname) ? styles.giftBox.giftImageContainerSelected : styles.giftBox.giftImageContainer}
                key={`premium${gift.cs_itemname}`}
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
          <View style={styles.giftBox.balanceBox}>
            <Text style={styles.giftBox.balanceLabel}>Balance</Text>
            <Image source={assets.nut} style={styles.giftBox.nutsIcon} resizeMode="contain" />
            <Text style={styles.giftBox.balanceCount}>305</Text>
          </View>
          <DropdownPicker
            selected={selectedCount}
            onDropdownChange={selectedIndex => this.onDropdownChangeIndex(selectedIndex)}
          />
        </LinearGradient>
        <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={styles.giftBox.footerBox}>
          <TouchableHighlight style={styles.giftBox.footerButton}>
            <Text style={styles.giftBox.footerButtonText}>Recharge</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.giftBox.footerButton} onPress={() => this.onSendPress()}>
            <Text style={styles.giftBox.footerButtonText}>Send</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    );
  }
}

export default GiftBox;
