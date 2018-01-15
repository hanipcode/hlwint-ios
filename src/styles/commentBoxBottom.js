import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flexGrow: 70,
    paddingHorizontal: 15,
    marginVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 50,
    color: '#FFF',
  },
  share: {},
  send: {
    marginRight: 5,
  },
  gift: {},
  image: {
    maxWidth: 32,
    height: 32,
  },
  giftImage: {
    maxWidth: 32.5,
    height: 65,
    marginBottom: 35,
  },
  space: {
    flex: 2,
    backgroundColor: 'blue',
  },
});
