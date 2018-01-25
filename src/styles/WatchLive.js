import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  gradientContainer: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
    position: 'absolute',
  },
  heartTouchableArea: {
    flex: 1,
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 0, 0, 0)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scaleX: -1 }],
  },
  loadingContainer: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  loadingContainerImage: {
    height,
  },
  refreshJump: {
    position: 'absolute',
    height: 85,
    width: 85,
  },
  close: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  closeImage: {
    height: 35 / 1.618 / 1.618,
    width: 35 / 1.618 / 1.618,
  },
});
