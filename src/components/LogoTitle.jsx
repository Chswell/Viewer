import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ThemeStore from '../store/themeStore';
import darkMode from '../styles/darkMode';

const LogoTitle = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{height: 55, width: 120}}
      onPress={() => navigation.navigate('PinList')}>
      <Image
        style={{height: 55, width: 120}}
        resizeMode="cover"
        source={
          ThemeStore.theme === 'light'
            ? require('../../public/img/logo.png')
            : require('../../public/img/logoLight.png')
        }
        alt={'Viewer'}
      />
    </TouchableOpacity>
  );
};

export default LogoTitle;
