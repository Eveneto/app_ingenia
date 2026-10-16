/**
 * App Ingenia - React Native App
 *
 * @format
 */

import React from 'react';
import { ActivityIndicator, StatusBar, useColorScheme, View } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [fontsLoaded] = useFonts({
    'MaterialIcons-Regular': require('@react-native-vector-icons/material-icons/fonts/MaterialIcons.ttf'),
    MaterialDesignIcons: require('@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.backgroundSoft,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
