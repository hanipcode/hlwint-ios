import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    backgroundColor: 'transparent',
    height,
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    maxHeight: 300,
    backgroundColor: 'rgba(255,255,255, 1)',
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
    paddingHorizontal: 5,
    marginHorizontal: 7.5,
    marginVertical: 4,
    alignSelf: 'flex-start',
    paddingVertical: 5,
  },
  giftImageContainerSelected: {
    alignItems: 'center',
    backgroundColor: '#7E57C233',
    paddingHorizontal: 5,
    marginHorizontal: 6,
    marginVertical: 4,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: '#311B9277',
    borderRadius: 5,
  },
  text: {
    width: 50,
    textAlign: 'center',
  },
  nutsIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  balanceBox: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  footerBox: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 40,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 7,
  },
  footerButton: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C62828',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    borderColor: '#00000088',
    height: 35,
    padding: 0,
  },
  disabledFooterButton: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    borderColor: '#ffffff77',
    height: 35,
    padding: 0,
  },
  footerButtonText: {
    color: '#fff',
    textShadowRadius: 1,
    textShadowOffset: { height: 1, width: 0 },
    textShadowColor: '#000',
  },
  balanceLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
  balanceCount: {
    color: '#FFEB3B',
    fontWeight: '600',
  },
});
