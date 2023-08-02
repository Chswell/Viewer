import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import PinList from './PinList';
import FullPin from './FullPin';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PinList"
          component={PinList}
          options={{title: 'Главная'}}
        />
        <Stack.Screen
          name="FullPin"
          component={FullPin}
          options={{title: 'Подробнее'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
