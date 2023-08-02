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

function PinList() {
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
      <SafeAreaView style={{padding: 0, margin: 0}}>
        <StatusBar />
        <ScrollView style={{padding: 0, margin: 0}}>
          <Text>{errorImage}</Text>
          <View style={{padding: 0, margin: 0}}>
            {listImage.map(image => (
              <Image
                source={{uri: image.url}}
                style={styles.pin}
                key={image.id}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: null,
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default PinList;
