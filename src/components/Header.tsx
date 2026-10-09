import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

const Header: React.FC = () => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.header}>
      {canGoBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.side}
          accessibilityLabel="Voltar"
        >
          <Icon name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}
      <Image
        source={require('../../assets/images/2026/Ingenia_2026.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.side} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 3,
    borderBottomColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  side: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    height: 92,
  },
});

export default Header;
