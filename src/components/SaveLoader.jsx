import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ThemeStore from '../store/themeStore';
import darkMode from '../styles/darkMode';

const SaveLoader = () => {
  return (
    <View
      style={
        ThemeStore.theme === 'light'
          ? styles.positionLoader
          : darkMode.positionLoader
      }>
      <View
        style={
          ThemeStore.theme === 'light' ? styles.viewLoader : darkMode.viewLoader
        }>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 15}}>Загрузка...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  positionLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  viewLoader: {
    backgroundColor: 'rgb(217,209,209)',
    borderRadius: 10,
    padding: 10,
  },
});

export default SaveLoader;
