import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const darkMode = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#242526',
  },
  pinOneColumn: {
    width: null,
    height: Dimensions.get('window').width > 590 ? 400 : 250,
    borderRadius: 10,
    margin: 10,
  },
  pinDoubleColumn: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: null,
    height: Dimensions.get('window').width > 590 ? 400 : 200,
    borderRadius: 10,
    margin: 10,
  },
  emptyList: {
    fontSize: 40,
    flex: 1,
    width: 200,
    height: 200,
    alignSelf: 'center',
    textAlign: 'center',
  },
  // FullPin
  pin: {
    flex: 1,
    width: null,
    marginBottom: -20,
  },
  infoImage: {
    flex: 1,
    padding: 20,
    backgroundColor: '#242526',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleMainInfo: {
    fontSize: 25,
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  buttonsPanel: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonItem: {
    height: 40,
    width: 40,
  },
  userInfoPanel: {
    flex: 3,
  },
  fullName: {},
  email: {},
  country: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  descImage: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  avatar: {
    backgroundColor: '#3c3e3f',
    height: Dimensions.get('window').width > 590 ? 70 : 45,
    width: Dimensions.get('window').width > 590 ? 70 : 45,
    borderRadius: 50,
    borderColor: '#2b346c',
    borderWidth: 3,
  },
  initials: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: Dimensions.get('window').width > 590 ? 30 : 15,
    fontWeight: '800',
    color: '#ccc',
  },
  userMainInfo: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  titleImage: {
    fontSize: 20,
  },
  touchableClose: {
    width: 40,
    position: 'absolute',
    zIndex: 1,
    top: 40,
    left: 20,
  },
  contentModal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    position: 'relative',
  },
  contentLoader: {
    backgroundColor: '#242526',
  },
});

export default darkMode;
