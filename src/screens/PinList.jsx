import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {observer} from 'mobx-react-lite';

import Loading from '../components/Loading';
import NumColStore from '../store/numColStore';
import SearchTextStore from '../store/searchTextStore';

const PinList = observer(({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [listImage, setListImage] = React.useState([]);
  const [numColumn, setNumColumn] = React.useState(1);
  const {searchText} = SearchTextStore;

  const fetchImages = () => {
    setIsLoading(true);
    axios
      .get('https://api.slingacademy.com/v1/sample-data/photos')
      .then(response => {
        NumColStore.numColumn ? setNumColumn(1) : setNumColumn(2);
        if (searchText) {
          const newData = response.data.photos.filter(function (item) {
            const itemData = item.description
              ? item.description.toUpperCase()
              : ''.toUpperCase();
            const textData = searchText.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setListImage(newData);
        } else {
          setListImage(response.data.photos);
        }
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ItemView = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FullPin', {id: item.id})}
        style={{
          flex: 1,
        }}>
        <Image
          source={{uri: item.url, cache: 'only-if-cached'}}
          style={styles.pinOneColumn}
        />
      </TouchableOpacity>
    );
  };

  React.useEffect(fetchImages, [
    NumColStore.numColumn,
    SearchTextStore.searchText,
  ]);

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
        renderItem={ItemView}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
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
