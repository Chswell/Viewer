import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import ThemeStore from '../store/themeStore';
import darkMode from '../styles/darkMode';

const Loading = () => {
  return (
    <View
      style={
        ThemeStore.theme === 'light'
          ? styles.contentLoader
          : darkMode.contentLoader
      }>
      <ActivityIndicator size="large" />
      <Text style={{marginTop: 15}}>Загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Loading;
