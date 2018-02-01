import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    paddingTop: height / 24,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  logo: {
    height: 32.5,
  },
  listContainer: {
    paddingTop: 60,
  },
  profile_picture: {
    position: 'absolute',
    right: 12,
    top: height / 24 + 2,
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: '#FFFFFFaa',
  },
  profilePictureImage: {
    borderRadius: 17.5,
  },
});
