import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderBottomColor: '#Fff',
  },
  text: {
    fontSize: 18,
    position: 'absolute',
    left: width / 18,
    right: width / 18,
    flex: 1,
    marginTop: 3,
    alignSelf: 'stretch',
    flexGrow: 1,
    textAlign: 'center',
    color: '#FFF',
    flexWrap: 'wrap',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    maxHeight: 100,
    overflow: 'visible',
  },
  input: {
    maxHeight: 100,
    color: 'transparent',
    margin: 0,
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    // paddingHorizontal: width / 16,
    marginHorizontal: width / 18,
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10,
  },
  placeholderText: {
    fontSize: 18,
    position: 'absolute',
    left: width / 18,
    right: width / 18,
    flex: 1,
    marginTop: 3,
    alignSelf: 'stretch',
    flexGrow: 1,
    textAlign: 'center',
    color: '#FFF',
    flexWrap: 'wrap',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    maxHeight: 100,
    overflow: 'visible',
  },
  tagText: {
    color: 'red',
  },
  tagContainer: {
    marginHorizontal: width / 18,
    marginTop: 2,
  },
});
