import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import styles from '../styles';
import assets from '../assets';
import DropdownPicker from './DropdownPicker';
import CONSTANTS from '../constants';
import { publishGift } from '../ducks/watchLive';
import IncreasingText from './animations/IncreasingText';

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
    isShowed: PropTypes.bool.isRequired,
    userCoin: PropTypes.number.isRequired,
    onSendGiftPress:PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectedCount: 1,
      selectedGift: null,
      selectedType: null,
    };
  }

  onGiftPress(type, gift) {
    this.setState({ selectedGift: gift, selectedType: type });
  }

  onSendPress() {
    const { selectedGift: gift, selectedCount } = this.state;
    const { broadcasterId, userInfo, onSendGiftPress } = this.props;
    const { id, u_full_name, u_profile_pic } = userInfo;
    if (!gift || !selectedCount) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // this.props.onSendPress();
    const sender = {
      id,
      name: u_full_name,
      avatar: u_profile_pic,
    };
    onSendGiftPress(
      broadcasterId.toString(),
      sender,
      selectedCount,
      gift.get('cs_itemname'),
      gift.get('cs_image'),
      gift.get('id'),
      gift.get('cs_amount'),
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
    if (itemName !== selectedGift.get('cs_itemname')) return false;
    return true;
  }

  render() {
    const { isShowed, userCoin } = this.props;
    const {
      index, selectedCount, selectedGift, selectedType,
    } = this.state;
    const { giftList } = this.props;
    const hot = giftList.get('hot');
    const basic = giftList.get('basic');
    const premium = giftList.get('premium');
    // const { basic, hot, premium } = giftList;
    // if (!basic || !hot || !premium) return <Loading backgroundColor="#FFF" />;
    return (
      <View style={styles.giftBox.screen} pointerEvents="box-none">
        <View style={isShowed ? styles.giftBox.container : { height: 0 }} pointerEvents="box-none">
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
            <ScrollView pointerEvents="box-none" contentContainerStyle={styles.giftBox.giftBox}>
              {hot.map(gift => (
                <TouchableOpacity
                  onPress={() => this.onGiftPress('hot', gift)}
                  style={
                    this.isGiftSelected('hot', gift.get('cs_itemname'))
                      ? styles.giftBox.giftImageContainerSelected
                      : styles.giftBox.giftImageContainer
                  }
                  key={gift.get('cs_itemname')}
                >
                  <Image
                    source={{
                      uri: `data:image/png;base64,${gift.get('cs_image')}`,
                      height: 50,
                      width: 50,
                      cache: 'force-cache',
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.giftBox.text}>{gift.get('cs_itemname')}</Text>
                  <Text style={styles.giftBox.text}>{gift.get('cs_amount')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView pointerEvents="box-none" contentContainerStyle={styles.giftBox.giftBox}>
              {basic.map(gift => (
                <TouchableOpacity
                  onPress={() => this.onGiftPress('basic', gift)}
                  style={
                    this.isGiftSelected('basic', gift.get('cs_itemname'))
                      ? styles.giftBox.giftImageContainerSelected
                      : styles.giftBox.giftImageContainer
                  }
                  key={`basic${gift.get('cs_itemname')}`}
                >
                  <Image
                    source={{
                      uri: `data:image/png;base64,${gift.get('cs_image')}`,
                      height: 50,
                      width: 50,
                      cache: 'force-cache',
                    }}
                    key={`basicimage${gift.get('cs_itemname')}`}
                    resizeMode="contain"
                  />
                  <Text style={styles.giftBox.text}>{gift.get('cs_itemname')}</Text>
                  <Text style={styles.giftBox.text}>{gift.get('cs_amount')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView pointerEvents="box-none" contentContainerStyle={styles.giftBox.giftBox}>
              {premium.map(gift => (
                <TouchableOpacity
                  onPress={() => this.onGiftPress('premium', gift)}
                  style={
                    this.isGiftSelected('premium', gift.get('cs_itemname'))
                      ? styles.giftBox.giftImageContainerSelected
                      : styles.giftBox.giftImageContainer
                  }
                  key={`premium${gift.get('cs_itemname')}`}
                >
                  <Image
                    source={{
                      uri: `data:image/png;base64,${gift.get('cs_image')}`,
                      height: 50,
                      width: 50,
                      cache: 'force-cache',
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.giftBox.text}>{gift.get('cs_itemname')}</Text>
                  <Text style={styles.giftBox.text}>{gift.get('cs_amount')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Swiper>
          <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={styles.giftBox.footerBox}>
            <View style={styles.giftBox.balanceBox}>
              <Text style={styles.giftBox.balanceLabel}>Balance</Text>
              <Image source={assets.nut} style={styles.giftBox.nutsIcon} resizeMode="contain" />
              <IncreasingText style={styles.giftBox.balanceCount} value={userCoin} /> 
            </View>
            {isShowed && (
              <DropdownPicker
                selected={selectedCount}
                onDropdownChange={selectedIndex => this.onDropdownChangeIndex(selectedIndex)}
              />
            )}
          </LinearGradient>
          <LinearGradient {...CONSTANTS.GRADIENTS_PROPS} style={styles.giftBox.footerBox}>
            <TouchableHighlight style={styles.giftBox.footerButton}>
              <Text style={styles.giftBox.footerButtonText}>Recharge</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.giftBox.footerButton}
              onPress={() => this.onSendPress()}
            >
              <Text style={styles.giftBox.footerButtonText}>Send</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default GiftBox;
