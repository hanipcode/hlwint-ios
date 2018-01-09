import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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
  share: {
    backgroundColor: 'blue',
  },
  send: {
    backgroundColor: 'blue',
    marginRight: 5,
  },
  gift: {
    backgroundColor: 'blue',
  },
  space: {
    flex: 2,
    backgroundColor: 'blue',
  },
});
