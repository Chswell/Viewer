import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const SaveLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}>
      <View
        style={{
          backgroundColor: 'rgb(14,13,13)',
          borderRadius: 10,
          padding: 10,
        }}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 15}}>Загрузка...</Text>
      </View>
    </View>
  );
};

export default SaveLoader;
