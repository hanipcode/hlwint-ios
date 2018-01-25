import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: height / 6,
    left: 0,
    right: 0,
    bottom: 0,
  },
  animatedView: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {},
  text: {
    color: '#FFF',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 12,
    fontWeight: '600',
  },
  profilePicture: {
    position: 'absolute',
    borderRadius: 14.5,
    left: 0,
  },
  countText: {
    width: 45,
    height: 45,
  },
  giftImageContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
