import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import PinList from './PinList';
import FullPin from './FullPin';
import counter from '../store/counter';
import {Button} from 'react-native';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator();

export const Navigation = observer(() => {
  const [text, onChangeText] = React.useState('');
  const {numColumn} = counter;

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
                    onEndEditing={() => alert(text)}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Поиск"
                  />
                </View>
                <TouchableOpacity
                  style={{height: 35, width: 35}}
                  onPress={() => counter.setNumColumn()}>
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
