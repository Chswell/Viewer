import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import FullPin from './FullPin';
import Loading from '../components/Loading';

function PinList({navigation}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [listImage, setListImage] = React.useState([]);
  const [errorImage, setErrorImage] = React.useState([]);

  const fetchImages = () => {
    setIsLoading(true);
    axios
      .get('https://api.slingacademy.com/v1/sample-data/photos')
      .then(response => {
        setListImage(response.data.photos);
      })
      .catch(error => {
        setErrorImage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchImages, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SafeAreaView style={{padding: 0, margin: 0}}>
        <StatusBar />

        <Text>{errorImage}</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchImages} />
          }
          data={listImage}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('FullPin', {id: item.id})}>
                <Image source={{uri: item.url}} style={styles.pin} />
              </TouchableOpacity>
            </View>
          )}
        />
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
    marginLeft: 10,
    marginRight: 10,
  },
});

export default PinList;
