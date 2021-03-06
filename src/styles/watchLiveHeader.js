import { StyleSheet, Dimensions } from 'react-native';
import normalizeText from '../helpers/normalizeText';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    top: 32,
    left: 8,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  image: {
    backgroundColor: 'red',
    borderRadius: 17.5,
    position: 'absolute',
  },
  text: {
    marginLeft: 5,
    color: '#FFFFFFEE',
    fontWeight: '600',
    fontSize: normalizeText(10),
    paddingLeft: 38,
    alignSelf: 'flex-end',
    paddingRight: 12,
    paddingVertical: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  coinContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    marginLeft: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    paddingRight: 11,
  },
  coinImage: {
    height: 21.6,
    width: 21.5,
  },
  coinText: {
    color: '#FFEB3B',
    marginLeft: 6,
    fontSize: normalizeText(11),
  },
  viewerCount: {
    height: 21.6,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    marginLeft: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    paddingRight: 11,
  },
  viewText: {
    color: '#FFFFFFEE',
    fontWeight: '600',
    fontSize: normalizeText(13),
    marginLeft: 26,
  },
  viewImage: {
    height: 26.6,
    width: 23.6,
    position: 'absolute',
    marginLeft: -2,
  },
  streamInfo: {
    flexDirection: 'row',
    marginRight: 28,
  },
  close: {
    position: 'absolute',
    right: 0,
  },
  closeImage: {
    height: 35 / 1.618 / 1.618,
    width: 35 / 1.618 / 1.618,
    top: 6,
    right: 8 * 1.618,
  },
  viewerListHeader: {
    width: 32,
    height: 32,
    borderRadius: 18,
    backgroundColor: '#ddddddfa',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
  },
  viewerListHeaderText: {
    fontSize: normalizeText(9),
    color: '#777',
    fontWeight: '900',
  },
  viewerListFooter: {
    width: 35,
    height: 35,
    marginLeft: -17.5,
    borderRadius: 17.5,
    backgroundColor: '#ddddddfa',
  },
  viewerListItemCollapsed: {
    borderRadius: 16,
    marginLeft: -17.5,
  },
  viwerListItemExpanded: {
    borderRadius: 16,
    marginLeft: 3,
  },
  viewerList: {
    marginLeft: 32,
    marginRight: 10,
    marginTop: 0,
  },
});
