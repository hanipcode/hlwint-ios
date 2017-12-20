import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  coverContainer: {
    marginTop: 50,
    marginBottom: 50,
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
    marginHorizontal: 30,
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
});
