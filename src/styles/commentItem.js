import { StyleSheet } from 'react-native';
import normalizeText from '../helpers/normalizeText';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    borderRadius: normalizeText(28),
    marginBottom: 8,
    marginLeft: 8,
    paddingRight: 30 / 1.618 / 1.618,
    alignSelf: 'flex-start',
  },
  image: {
    width: normalizeText(25),
    height: normalizeText(25),
    resizeMode: 'cover',
    borderRadius: normalizeText(14),
    borderWidth: 1,
    borderColor: '#FFFFFFaa',
    marginRight: 8,
  },
  name: {
    color: '#EF9A9A',
    fontWeight: '600',
    fontSize: normalizeText(11),
  },
  content: {
    marginTop: normalizeText(3),
    flexShrink: 1,
    paddingTop: normalizeText(2),
    paddingBottom: normalizeText(1),
    flexWrap: 'wrap',
    color: '#FFF',
    fontSize: normalizeText(11),
  },
});
