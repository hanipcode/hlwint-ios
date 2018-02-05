import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#f5f5f5',
  },
  topWrapper: {
    height: height / 2,
    justifyContent: 'space-between',
  },
  profilePicture: {
    ...StyleSheet.absoluteFillObject,
    height: height / 2,
  },
  topTextHolder: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 8,
    alignItems: 'center',
    minHeight: 45,
  },
  backImage: {
    top: 12,
    position: 'absolute',
  },
  textContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginRight: 8,
  },
  nickText: {
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
  },
  bottomFansHolder: {
    flexDirection: 'row',
    minHeight: 45,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 8,
  },
  fanProfileImage: {
    borderRadius: 20,
    marginRight: 5,
    marginTop: 2,
  },
  followContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  followItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 18,
  },
  countLabel: {
    color: '#777',
  },
});
