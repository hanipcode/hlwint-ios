import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: height / 4,
    left: 0,
    right: 0,
    bottom: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  coverContainer: {
    marginBottom: 20,
  },
  coverText: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: '#FFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  tagContainer: {
    alignSelf: 'stretch',
  },
  inputTitle: {
    alignSelf: 'stretch',
    maxHeight: 100,
    marginHorizontal: 30,
    marginBottom: 15,
    flexWrap: 'wrap',
    padding: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  button: {
    marginTop: 30,
    borderColor: 'transparent',
    backgroundColor: '#B71C1C',
    width: width - width / 8,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    paddingLeft: width / 32,
  },
});
