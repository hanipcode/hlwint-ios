import { StyleSheet, Dimensions } from 'react-native';
import normalizeText from '../helpers/normalizeText';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height / 12,
  },
  labelContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: normalizeText(32),
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  nameText: {
    fontSize: normalizeText(18),
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
  },
  nickText: {
    fontSize: normalizeText(12),
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  bottomContainer: {
    flex: 5,
  },
  followContainer: {
    marginTop: 22,
    flexDirection: 'row',
  },
  followContainerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#FFF',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  followContainerItemRight: {
    borderLeftWidth: 1,
  },
  followLabel: {
    fontSize: normalizeText(16),
    backgroundColor: 'transparent',
    fontWeight: '600',
    color: '#FFF',
  },
  countText: {
    backgroundColor: 'transparent',
    color: '#FFF',
    fontSize: normalizeText(18),
    marginTop: 8,
  },
  profilePicture: {
    borderRadius: 50,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#FFFFFFAA',
  },
  button: {
    position: 'absolute',
    bottom: height / 12,
    alignSelf: 'center',
    backgroundColor: '#EC407A',
    paddingVertical: 6,
    paddingHorizontal: width / 8,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonDisabled: {
    position: 'absolute',
    bottom: height / 12,
    alignSelf: 'center',
    backgroundColor: '#aaa',
    paddingVertical: 6,
    paddingHorizontal: width / 8,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonText: {
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeContainer: {
    position: 'absolute',
    top: height / 16,
    right: 10,
  },
});
