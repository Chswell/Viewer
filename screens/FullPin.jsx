import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

function FullPin() {
  const [listImage, setListImage] = React.useState([]);
  const [errorImage, setErrorImage] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://api.slingacademy.com/v1/sample-data/photos')
      .then(response => {
        setListImage(response.data.photos);
      })
      .catch(error => {
        setErrorImage(errorImage);
      });
  }, []);
  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ScrollView>
          <View>FullPin</View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

export default FullPin;
