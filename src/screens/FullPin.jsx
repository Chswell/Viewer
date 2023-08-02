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
  Modal,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';
import Loading from '../components/Loading';
import {Dimensions} from 'react-native';
import Pinchable from 'react-native-pinchable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height / 1.5;

function FullPin({route}) {
  const [modalVisible, setModalVisible] = React.useState(false);
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
    <View style={{flex: 1}}>
      <View style={{flex: 2}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setModalVisible(!modalVisible)}>
          {fullImage.url && (
            <Image source={{uri: fullImage.url}} style={styles.pin} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.infoImage}>
        <Text style={styles.titleImage}>{fullImage.title}</Text>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View style={{flex: 1}}>
          <View
            style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
            <TouchableOpacity
              style={{marginTop: 15, marginLeft: 15}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={require('../../public/img/close.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
            <Pinchable>
              <Image
                source={{uri: fullImage.url}}
                style={{height: '100%', width: '100%'}}
                accessibilityLabel={'fullImage'}
                resizeMode={'contain'}
              />
            </Pinchable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pin: {
    flex: 1,
    width: null,
    marginBottom: -20,
  },
  infoImage: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleImage: {
    fontSize: 25,
  },
});

export default FullPin;
