import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  scrollViewContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
});
