import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react-lite';

import PinList from './PinList';
import FullPin from './FullPin';
import NumColStore from '../store/numColStore';
import SearchTextStore from '../store/searchTextStore';

const Stack = createNativeStackNavigator();

export const Navigation = observer(() => {
  const [text, setText] = React.useState('');
  const {numColumn} = NumColStore;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PinList"
          component={PinList}
          options={{
            headerTitle: `Главная`,
            headerRight: () => (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 40}}>
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
                        ? require(`../../public/img/card.png`)
                        : require(`../../public/img/dashboard.png`)
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
          options={{title: 'Подробнее'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
