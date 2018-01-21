import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 55,
    marginTop: 60,
    resizeMode: 'contain',
    marginBottom: 150,
  },
  loginButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderRadius: 150,
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    height,
    width,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  facebookLogin: {
    position: 'absolute',
    bottom: 65,
  },
  facebookLoginImage: {
    width: width / 1.618 + 40,
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 25,
  },
});
