import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import SelectDropdown from 'react-native-select-dropdown';

import PinList from './PinList';
import FullPin from './FullPin';
import LogoTitle from '../components/LogoTitle';

import NumColStore from '../store/toggleColStore';
import SearchTextStore from '../store/searchTextStore';
import LimitImageStore from '../store/limitImageStore';

const Stack = createNativeStackNavigator();

export const Navigation = observer(() => {
  const [text, setText] = React.useState('');
  const {numColumn} = NumColStore;
  const optionsLimitImage = [10, 30, 50, 100];
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}>
        <Stack.Screen
          name="PinList"
          component={PinList}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 35}}>
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
                  onPress={() => NumColStore.setNumColumn()}>
                  <Image
                    source={
                      numColumn
                        ? require('../../public/img/dashboard.png')
                        : require('../../public/img/card.png')
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
