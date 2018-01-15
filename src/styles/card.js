import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    width,
    height: height / 1.618 / 1.618,
    padding: 4,
    paddingHorizontal: 4,
  },
  container: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
    overflow: 'hidden',
  },
  infoContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  name: {
    color: '#FFFFFFFA',
    fontWeight: '900',
    fontSize: 20,
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  eye: {
    height: 20,
    width: 20,
  },
  viewCount: {
    color: '#FFF',
    marginLeft: 5,
  },
  liveLabel: {
    alignSelf: 'center',
    width: width / 4,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFB300',
    marginTop: 3,
    borderWidth: 2,
    // borderBottomWidth: 2,
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    borderColor: '#FFFFFFa0',
  },
  liveLabelText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
