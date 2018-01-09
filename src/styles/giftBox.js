import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 300,
    backgroundColor: '#FFF',
  },
  giftBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E53935',
  },
  selected: {
    flex: 1,
    padding: 10,
    backgroundColor: '#C62828',
  },
  buttonText: {
    color: '#FFF',
  },
  giftImageContainer: {
    alignItems: 'center',
    margin: 11,
  },
  text: {
    width: 50,
    textAlign: 'center',
  },
  footerBox: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 40,
  },
});
