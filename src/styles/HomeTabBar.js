import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    flex: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  buttonImage: {
    position: 'absolute',
    width: 50,
    resizeMode: 'contain',
    top: -40,
    left: -width / 2 - 25,
  },
  backgroundOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.225)',
    top: 0,
    bottom: 0,
    left: 0,
    right: width / 2,
  },
  text: {
    color: '#FFFFFFF0',
    fontWeight: '600',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, .5)',
  },
});
