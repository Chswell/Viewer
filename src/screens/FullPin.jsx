import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  TouchableOpacity,
  PermissionsAndroid,
  Share,
  Dimensions,
} from 'react-native';
import Pinchable from 'react-native-pinchable';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';

import Loading from '../components/Loading';
import {imageApi} from '../misc/ImageApi';
import SaveLoader from '../components/SaveLoader';
import {usersApi} from '../misc/usersApi';

function FullPin({route}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingImage, setIsLoadingImage] = React.useState(false);
  const [fullImage, setFullImage] = React.useState('');
  const [userInfo, setUserInfo] = React.useState({});

  const {id} = route.params;

  const onShare = async () => {
    try {
      await Share.share({
        message: `Сообщение получателю! Ссылка на фотографию - ${fullImage.url}`,
        url: fullImage.url,
        title: 'Пример отправки ссылки на фотографию',
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const fetchInfoImage = () => {
    setIsLoading(true);
    imageApi
      .getCurrentImage(id)
      .then(({data}) => {
        setFullImage(data.photo);
        usersApi
          .getCurrentUser(data.photo.user)
          .then(({data}) => {
            setUserInfo(data.user);
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchInfoImage();
  }, [id]);

  const checkAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    await PermissionsAndroid.request(permission);
  };

  const saveImageInDevice = async url => {
    try {
      await setIsLoadingImage(true);
      await checkAndroidPermission();
      let res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'jpg',
      }).fetch('GET', url);
      url = res.path();
      await CameraRoll.save(url, 'photo');
      await setIsLoadingImage(false);
    } catch (error) {
      alert(error);
    }
  };

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
        <View style={styles.buttonsPanel}>
          <TouchableOpacity
            style={styles.buttonItem}
            onPress={() => saveImageInDevice(fullImage.url)}>
            <Image
              source={require('../../public/img/download.png')}
              alt={'download'}
              style={{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonItem} onPress={onShare}>
            <Image
              source={require('../../public/img/share.png')}
              alt={'share'}
              style={{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity>
        </View>

        {userInfo && (
          <View style={styles.userInfoPanel}>
            <View style={styles.userMainInfo}>
              <View style={styles.avatar}>
                <Text style={styles.initials}>
                  {userInfo.first_name && userInfo.first_name[0]}
                  {userInfo.first_name && userInfo.last_name[0]}
                </Text>
              </View>
              <View style={styles.titleMainInfo}>
                <Text style={styles.titleImage}>
                  {fullImage.title.length > 25
                    ? fullImage.title.slice(0, 25)
                    : fullImage.title}
                </Text>
                <Text style={styles.fullName}>
                  by {userInfo.first_name} {userInfo.last_name}
                </Text>
              </View>
            </View>

            <View style={styles.country}>
              <Image
                source={require('../../public/img/location.png')}
                alt={'share'}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <Text>{userInfo.country}</Text>
            </View>
            <Text style={styles.email}>
              <Text style={{fontWeight: '800'}}>E-mail:</Text> {userInfo.email}
            </Text>
          </View>
        )}
        <Text style={styles.descImage}>{fullImage.description}</Text>
        {isLoadingImage && <SaveLoader />}
      </View>
      <Modal
        visible={modalVisible}
        transparent={false}
        onRequestClose={() => setModalVisible(!modalVisible)}
        statusBarTranslucent={true}
        animationType={'fade'}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            position: 'relative',
          }}>
          <TouchableOpacity
            style={{
              width: 40,
              position: 'absolute',
              zIndex: 1,
              top: 40,
              left: 20,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Image
              source={require('../../public/img/close.png')}
              style={{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity>
          <Pinchable>
            <Image
              source={{uri: fullImage.url}}
              style={{
                height: '100%',
                width: '100%',
              }}
              accessibilityLabel={'fullImage'}
              resizeMode={'contain'}
            />
          </Pinchable>
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
  titleMainInfo: {
    fontSize: 25,
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  buttonsPanel: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonItem: {
    height: 40,
    width: 40,
  },
  userInfoPanel: {
    flex: 3,
  },
  fullName: {},
  email: {},
  country: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  descImage: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  avatar: {
    backgroundColor: '#f5f0f0',
    width: Dimensions.get('window').width > 590 ? 70 : 45,
    borderRadius: 50,
    borderColor: '#6d7ee8',
    borderWidth: 3,
  },
  initials: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: Dimensions.get('window').width > 590 ? 30 : 15,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.27)',
  },
  userMainInfo: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  titleImage: {
    fontSize: 20,
  },
});

export default FullPin;
