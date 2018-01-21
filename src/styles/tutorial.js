import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: height / 1.618,
    top: height / 1.618 / 1.618 / 1.618 / 1.618,
    left: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  textImage: {
    position: 'absolute',
    bottom: height / 1.618 / 1.618 / 1.618 / 1.618,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 10,
  },
  button: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    width: width / 1.618,
    paddingVertical: 10,
    marginHorizontal: 5,
    top: height / 1.618 / 1.618 / 1.618 / 1.618 / 1.618 / 1.618,
    backgroundColor: '#C62828',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
  },
  textImageBg: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  paginationStyle: {
    color: '#FFF',
    marginBottom: 100,
  },
});
