import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
    resizeMode: 'cover',
  },
  textImage: {
    position: 'absolute',
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 10,
  },
  button: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'stretch',
    padding: 15,
    paddingHorizontal: 60,
    marginHorizontal: 5,
    bottom: 65,
    backgroundColor: '#e74c3c',
    borderWidth: 1,
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
});
