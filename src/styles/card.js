import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    width: width / 2,
    height: width / 2,
    padding: 10,
  },
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#aaa',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    position: 'absolute',
    backgroundColor: '#fcfcfc',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
});
