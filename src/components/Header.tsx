import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.header, isDarkMode && styles.headerDark]}>
      <Text style={[styles.headerText, isDarkMode && styles.headerTextDark]}>
        {title}
      </Text>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  headerTextDark: {
    color: '#ffffff',
  },
});

export default Header;
