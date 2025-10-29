import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/MenuScreen';
import ProgramacaoScreen from '../screens/ProgramacaoScreen';
import MapScreen from '../screens/MapScreen';
import SponsorsScreen from '../screens/SponsorsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerShown: false, // Usamos Header customizado
        }}
      >
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Programacao" component={ProgramacaoScreen} />
        <Stack.Screen name="Mapa" component={MapScreen} />
        <Stack.Screen name="Patrocinadores" component={SponsorsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
