import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MovingText from './animations/MovingText';
import ZawgyiText from './ZawgyiText';
import styles from '../styles';
import assets from '../assets';
import constants from '../constants';

const Card = ({
  name, image, viewCount, isOfficial, tags, title, location, onPress, isLast,
}) => (
  <View style={isLast ? styles.card.wrapperLast : styles.card.wrapper}>
    <TouchableOpacity
      onPress={() => requestAnimationFrame(() => onPress())}
      style={styles.card.container}
    >
      <Image
        style={styles.card.image}
        source={{ uri: image || constants.PLACEHOLDER_URI }}
        resizeMode="cover"
      />
      <LinearGradient
        style={styles.card.topHolder}
        colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0)']}
      >
        <View style={styles.card.nameContainer}>
          <ZawgyiText style={styles.card.nameText}>{name}</ZawgyiText>
          <ZawgyiText style={styles.card.notMovingTitle}>{title}</ZawgyiText>
        </View>
        <View style={styles.card.countContainer}>
          <Image style={styles.card.countHolder} source={assets.view_count_holder} />
          <Text style={styles.card.viewCount}> {viewCount}</Text>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
        style={styles.card.bottomHolder}
      >
        {tags.length > 50 && (
          <MovingText width={tags.length * 5} size={15} color="#FFF">
            {tags}
          </MovingText>
        )}
        {tags.length <= 50 && <Text style={styles.card.tagTextContainer}>{tags}</Text>}
        <View style={styles.card.locationContainer}>
          <Image source={assets.location_icon} style={styles.card.locationImage} />
          <Text style={styles.card.locationText}>{location}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  viewCount: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  isOfficial: PropTypes.bool.isRequired,
};

Card.defaultProps = {
  image: null,
};

export default Card;
