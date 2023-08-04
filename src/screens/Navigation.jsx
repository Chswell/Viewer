import React from 'react';
import {
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import SelectDropdown from 'react-native-select-dropdown';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PinList from './PinList';
import FullPin from './FullPin';
import LogoTitle from '../components/LogoTitle';

import SearchTextStore from '../store/searchTextStore';
import LimitImageStore from '../store/limitImageStore';
import ToggleColStore from '../store/toggleColStore';
import ThemeStore from '../store/themeStore';

const Stack = createNativeStackNavigator();

export const Navigation = observer(() => {
  const [text, setText] = React.useState('');
  const {toggleColumn} = ToggleColStore;
  const optionsLimitImage = [10, 30, 50, 100];
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTintColor: ThemeStore.theme === 'light' ? '#f0f1fa' : '#18191a',
          statusBarColor: ThemeStore.theme === 'light' ? '#a9abbe' : '#18191a',
          navigationBarColor:
            ThemeStore.theme === 'light' ? '#f0f1fa' : '#18191a',
          headerStyle: {
            backgroundColor: ThemeStore.theme === 'light' ? '#fff' : '#18191a',
          },
        }}>
        <Stack.Screen
          name="PinList"
          component={PinList}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 35}}>
                {Dimensions.get('window').width > 400 && (
                  <SelectDropdown
                    buttonStyle={{width: 160, borderRadius: 20}}
                    buttonTextStyle={{fontSize: 15}}
                    defaultButtonText={'Кол-во элементов'}
                    data={optionsLimitImage}
                    onSelect={selectedItem => {
                      LimitImageStore.setLimitImage(selectedItem);
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                )}
                <View>
                  <TextInput
                    style={{
                      height: 40,
                      width: 150,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                    }}
                    onEndEditing={() => SearchTextStore.setSearchText(text)}
                    onChangeText={setText}
                    value={text}
                    placeholder="Поиск"
                  />
                </View>
                <TouchableOpacity
                  style={{height: 35, width: 35}}
                  onPress={() => {
                    ToggleColStore.setToggleColumn();
                  }}>
                  <Image
                    source={
                      toggleColumn
                        ? ThemeStore.theme === 'light'
                          ? require('../../public/img/dashboard.png')
                          : require('../../public/img/dashboardLight.png')
                        : ThemeStore.theme === 'light'
                        ? require('../../public/img/card.png')
                        : require('../../public/img/cardLight.png')
                    }
                    style={{height: 35, width: 35}}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="FullPin"
          component={FullPin}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
