import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const SaveLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{backgroundColor: '#00000022', borderRadius: 10, padding: 10}}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 15}}>Загрузка...</Text>
      </View>
    </View>
  );
};

export default SaveLoader;
