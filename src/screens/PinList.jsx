import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  Button,
  Dimensions,
} from 'react-native';
import {observer} from 'mobx-react-lite';

import Loading from '../components/Loading';
import {imageApi} from '../misc/ImageApi';

import ToggleColStore from '../store/toggleColStore';
import SearchTextStore from '../store/searchTextStore';
import LimitImageStore from '../store/limitImageStore';

const PinList = observer(({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [listImage, setListImage] = React.useState([]);
  const [numColumn, setNumColumn] = React.useState(1);
  const {searchText} = SearchTextStore;
  const {limitImage} = LimitImageStore;
  const {toggleColumn} = ToggleColStore;
  const fetchImages = () => {
    setIsLoading(true);
    imageApi
      .getListImages(limitImage)
      .then(response => {
        ToggleColStore.toggleColumn ? setNumColumn(1) : setNumColumn(2);
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

  React.useEffect(fetchImages, [
    toggleColumn,
    searchText,
    limitImage,
    numColumn,
  ]);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.imgContainer}>
      {listImage.length > 0 && listImage ? (
        <FlatList
          numColumns={numColumn}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchImages} />
          }
          data={listImage}
          renderItem={ItemView}
        />
      ) : (
        <Text style={styles.emptyList}>Ничего не найдено</Text>
      )}
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
    height: Dimensions.get('window').width > 590 ? 400 : 250,
    borderRadius: 10,
    margin: 10,
  },
  pinDoubleColumn: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: null,
    height: Dimensions.get('window').width > 590 ? 400 : 200,
    borderRadius: 10,
    margin: 10,
  },
  emptyList: {
    fontSize: 40,
    flex: 1,
    width: 200,
    height: 200,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default PinList;
