import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: 'red' },
  broadcastPreview: {
    flexGrow: 1,
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  recordButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    color: '#333',
  },
  close: {
    position: 'absolute',
    top: 23,
    right: 10,
    padding: 10,
    fontSize: 21,
    color: '#FFF',
    textShadowColor: '#000',
    backgroundColor: 'transparent',
    textShadowOffset: { width: 2, height: 2 },
  },
});
