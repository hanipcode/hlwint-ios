import { StyleSheet, Dimensions } from 'react-native';
import normalizeText from '../helpers/normalizeText';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    width,
    height: width / 1.45,
    paddingHorizontal: 1,
  },
  wrapperLast: {
    width,
    height: width / 1.45,
    paddingHorizontal: 1,
  },
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.25,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
    overflow: 'hidden',
  },

  countContainer: {
    height: 40,
    flexDirection: 'row',
  },
  countHolder: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
  },
  viewCount: {
    color: '#FFF',
    position: 'absolute',
    right: 41,
    fontSize: normalizeText(9),
    top: normalizeText(height / 33),
    fontWeight: '900',
  },
  nameContainer: {
    marginTop: 6,
    marginLeft: 10,
    width: width / 2,
    flexWrap: 'nowrap',
  },
  nameText: {
    fontSize: normalizeText(11),
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 2,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
  },
  notMovingTitle: {
    fontSize: normalizeText(14),
    color: '#FFF',
    backgroundColor: 'transparent',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
  bottomHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 70,
    paddingLeft: 8,
    paddingBottom: 10,
  },
  topHolder: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    minHeight: 75,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tagTextContainer: {
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  locationImage: {
    height: normalizeText(15),
    width: normalizeText(15),
    resizeMode: 'contain',
  },
  locationText: {
    fontSize: normalizeText(12),
    backgroundColor: 'transparent',
    color: '#FFF',
    marginLeft: 1,
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '600',
  },
});
