import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Loading from '../components/Loading';

function FullPin({route}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [fullImage, setFullImage] = React.useState('');
  const [errorImage, setErrorImage] = React.useState();

  const {id} = route.params;

  const fetchImage = () => {
    setIsLoading(true);
    axios
      .get(`https://api.slingacademy.com/v1/sample-data/photos/${id}`)
      .then(({data}) => {
        setFullImage(data.photo);
      })
      .catch(error => {
        setErrorImage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchImage, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ScrollView>
          <View>
            {fullImage.url && (
              <Image source={{uri: fullImage.url}} style={styles.pin} />
            )}
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
    marginBottom: 10,
  },
});

export default FullPin;
