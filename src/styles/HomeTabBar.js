import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  imageContainer: {
    flexDirection: 'row-reverse',
    margin: 5,
    alignItems: 'center',
  },
  image: {
    height: 28,
    width: 28,
  },
  imageClose: {
    height: 20,
    width: 20,
  },
  imageStyle: {
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
  },
  label: {
    flexShrink: 1,
    paddingHorizontal: 12.5,
    paddingVertical: 4,
    borderRadius: 12.5,
    marginRight: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    color: '#FFF',
  },
  close: {
    position: 'absolute',
    right: 0,
  },
});
