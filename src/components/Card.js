import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CardAnimation from './animations/CardAnimation';
import styles from '../styles';
import assets from '../assets';

const Card = ({
  name, image, viewCount, onPress, animateCard,
}) => (
  <View style={styles.card.wrapper}>
    <TouchableOpacity
      onPress={() =>
        requestAnimationFrame(() => {
          animateCard(onPress);
        })
      }
      style={styles.card.container}
    >
      <Image style={styles.card.image} source={{ uri: image }} />
      <View style={styles.card.liveLabel}>
        <Text style={styles.card.liveLabelText}>LIVE</Text>
      </View>
      <View style={styles.card.infoContainer}>
        <Text style={styles.card.name}>{name}</Text>
        <View style={styles.card.countContainer}>
          <Image source={assets.eye} style={styles.card.eye} />
          <Text style={styles.card.viewCount}>{viewCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  viewCount: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  animateCard: PropTypes.func.isRequired,
};

export default CardAnimation(Card);
