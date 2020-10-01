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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: statusBarHeight,
  },
  goBack: {
    width: headerHeight / 5,
    height: headerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactPhoto: {
    width: headerHeight - 20,
    height: headerHeight - 20,
    borderRadius: 50,
  },
  contactId: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  list: {
    width,
    height: height - headerHeight - statusBarHeight - 60,
  },
  message: {
    width,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  balloon: {
    padding: 12,
    borderRadius: 10,
  },
  inputArea: {
    width,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  input: {
    width: (width * 60) / 100,
    height: 40,
    borderColor: 'gainsboro',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#727bff',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
