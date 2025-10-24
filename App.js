import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BluetoothScreen from './src/screens/BluetoothScreen';
import SensorReadings from './src/screens/SensorReadings';
import HomeScreen  from './src/screens/dash';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Bluetooth" component={BluetoothScreen} />
        <Stack.Screen name="SensorReadings" component={SensorReadings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
