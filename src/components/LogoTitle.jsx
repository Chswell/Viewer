import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LogoTitle = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{height: 55, width: 120}}
      onPress={() => navigation.navigate('PinList')}>
      <Image
        style={{height: 55, width: 120}}
        resizeMode="cover"
        source={require('../../public/img/logo.png')}
        alt={'Viewer'}
      />
    </TouchableOpacity>
  );
};

export default LogoTitle;
