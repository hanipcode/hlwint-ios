import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    borderRadius: 10,
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
    marginLeft: 5,
    fontSize: 14,
  },
  content: {
    marginTop: 3,
    flexShrink: 1,
    flexWrap: 'wrap',
    color: '#FFF',
  },
});
