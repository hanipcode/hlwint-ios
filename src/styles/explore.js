import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
  },
  roundImageContainer: {
    marginVertical: 3,
  },
  roundImage: {
    borderRadius: width / 8.8,
    marginHorizontal: width / 40,
  },
  headerText: {
    fontWeight: '300',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#777',
    paddingLeft: 8,
  },
  rectFlatList: {
    paddingLeft: 8,
  },
  rectImage: {
    marginHorizontal: 1,
  },
  tagContainer: {
    marginTop: 36,
    backgroundColor: '#f5f4f3',
    paddingVertical: 16,
  },
  tagItem: {
    borderRadius: 2,
    marginRight: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 2,
  },
});
