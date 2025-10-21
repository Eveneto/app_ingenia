import React from 'react';
import {
  StyleSheet,
  Image,
  useColorScheme,
  View,
} from 'react-native';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.header, isDarkMode && styles.headerDark]}>
      <Image
        source={require('../../assets/images/logo-ingenia-2025-semfundo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerDark: {
    backgroundColor: '#333333',
    borderBottomColor: '#555555',
  },
  logo: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },
});

export default Header;
