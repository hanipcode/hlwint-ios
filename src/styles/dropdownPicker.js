import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pickerTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 7.5,
    borderBottomWidth: 13,
    borderLeftWidth: 7.5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#777',
    borderLeftColor: 'transparent',
  },
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'column-reverse',
    paddingTop: 10,
    paddingHorizontal: 0,
  },
  activeContainer: {
    flexDirection: 'row',
    width: 75,
    padding: 5,
    backgroundColor: '#FFF',
    marginTop: 7,
    borderRadius: 3,
    justifyContent: 'space-between',
  },
  option: {
    paddingTop: 5,
    marginBottom: 0,
    backgroundColor: '#FFF',
    borderRadius: 3,
    borderWidth: 1,
    width: 75,
  },
  optionItem: {
    flexGrow: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
});
