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
import {observer} from 'mobx-react-lite';
import counter from '../store/counter';

const PinList = observer(({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [listImage, setListImage] = React.useState([]);
  const [errorImage, setErrorImage] = React.useState([]);
  const [numColumn, setNumColumn] = React.useState(1);

  const fetchImages = () => {
    setIsLoading(true);
    axios
      .get('https://api.slingacademy.com/v1/sample-data/photos')
      .then(response => {
        setListImage(response.data.photos);
        counter.numColumn ? setNumColumn(1) : setNumColumn(2);
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchImages, [counter.numColumn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.imgContainer}>
      <FlatList
        numColumns={numColumn}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchImages} />
        }
        data={listImage}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FullPin', {id: item.id})}
            style={{
              flex: 1,
            }}>
            <Image source={{uri: item.url}} style={styles.pinOneColumn} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pinOneColumn: {
    width: null,
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  pinDoubleColumn: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: null,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default PinList;
