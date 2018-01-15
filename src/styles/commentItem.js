import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 8,
    marginLeft: 8,
    paddingRight: 30 / 1.618 / 1.618,
    alignSelf: 'flex-start',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFF',
    marginRight: 10,
  },
  name: {
    color: '#E53935',
    fontWeight: '600',
    marginLeft: 30 / 1.618 / 1.618,
    fontSize: 14,
  },
  content: {
    marginTop: 3,
    flexShrink: 1,
    paddingVertical: 30 / 1.618 / 1.618 / 1.618 / 1.618,
    flexWrap: 'wrap',
    color: '#FFF',
  },
});
