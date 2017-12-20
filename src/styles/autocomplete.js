import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderBottomColor: '#Fff',
  },
  text: {
    position: 'absolute',
    flex: 1,
    marginTop: 3,
    paddingHorizontal: 5,
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
    padding: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
});
