import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const canGoBack = navigation.canGoBack();
  const topInset = insets.top;

  const botaoMenu = (
    <TouchableOpacity
      onPress={() => setMenuAberto(true)}
      style={styles.side}
      accessibilityLabel="Abrir menu"
    >
      <Icon name="menu" size={26} color={colors.primary} />
    </TouchableOpacity>
  );

  const botaoVoltar = (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.side}
      accessibilityLabel="Voltar"
    >
      <Icon name="arrow-back" size={24} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.header, { paddingTop: topInset + 8 }]}>
      {canGoBack ? botaoVoltar : botaoMenu}
      <Image
        source={require('../../assets/images/2026/Ingenia_2026.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {canGoBack ? botaoMenu : <View style={styles.side} />}
      <SideMenu visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingBottom: 8,
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
