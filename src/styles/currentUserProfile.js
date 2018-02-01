import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 22,
    flex: 1,
  },
  header: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 4,
    backgroundColor: '#FFF',
  },
  headerImage: {
    borderRadius: 50,
    borderColor: '#FFFFFFaa',
    borderWidth: 2,
    marginBottom: 8,
  },
  nameText: {
    backgroundColor: 'transparent',
    fontSize: 22,
    color: '#FFF',
  },
  nickText: {
    backgroundColor: 'transparent',
    color: '#eee',
    fontWeight: '600',
  },
  headerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerFooterItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 20,
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nutImage: {
    width: 20,
    height: 20,
    marginBottom: 3,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 4,
  },
  bodyItem: {
    flex: 1,
    backgroundColor: '#FFF',
    maxHeight: 50,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bodyItemLast: {
    flex: 1,
    backgroundColor: '#FFF',
    maxHeight: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#ddd',
    borderBottomColor: '#ddd',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rightBodyGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyText: {
    color: '#777',
    fontWeight: '600',
  },
  rightInfo: {
    color: '#777',
    fontWeight: '600',
    fontSize: 12,
    marginRight: 4,
  },
});
