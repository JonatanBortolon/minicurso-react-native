import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
const statusBarHeight = Constants.statusBarHeight;
const headerHeight = 80;

const styles = StyleSheet.create({
  App: {
    width,
    height,
    backgroundColor: '#fff',
  },
  header: {
    width,
    height: statusBarHeight + headerHeight,
    backgroundColor: '#727bff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: statusBarHeight,
  },
  profilePhoto: {
    width: headerHeight - 20,
    height: headerHeight - 20,
    borderRadius: 50,
  },
  profileId: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  list: {
    width,
    height: height - statusBarHeight - headerHeight,
  },
  contact: {
    width,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
  },
  contactPhoto: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  contactId: {
    fontSize: 13,
    textAlign: 'center',
  },
  addButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#727bff',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: (width * 80) / 100,
    height: (height * 80) / 100,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  input: {
    width: (width * 60) / 100,
    height: 40,
    paddingHorizontal: 12,
    borderColor: 'gainsboro',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default styles;
