import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

const Card = ({
  name, image, viewCount, onPress,
}) => (
  <View style={styles.card.wrapper}>
    <TouchableOpacity onPress={onPress} style={styles.card.container}>
      <Image style={styles.card.image} source={{ uri: image }} />
      <View style={styles.card.infoContainer}>
        <Text style={styles.card.name}>{name}</Text>
        <Text style={styles.card.viewCount}>{viewCount}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  viewCount: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Card;
