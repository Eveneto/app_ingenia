import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';
import { colors } from '../theme/colors';
import SideMenu from './SideMenu';

const LOGO_EXPANDED = 72;
const LOGO_COLLAPSED = 36;
const PAD_EXPANDED = 10;
const PAD_COLLAPSED = 4;
const COLLAPSE_DISTANCE = 72;

type HeaderProps = {
  scrollY?: Animated.Value;
};

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const canGoBack = navigation.canGoBack();
  const topInset = insets.top;
  const fallbackScrollY = useRef(new Animated.Value(0)).current;
  const progress = scrollY ?? fallbackScrollY;

  const logoHeight = progress.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE],
    outputRange: [LOGO_EXPANDED, LOGO_COLLAPSED],
    extrapolate: 'clamp',
  });

  const padBottom = progress.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE],
    outputRange: [PAD_EXPANDED, PAD_COLLAPSED],
    extrapolate: 'clamp',
  });

  const padTop = progress.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE],
    outputRange: [topInset + PAD_EXPANDED, topInset + PAD_COLLAPSED],
    extrapolate: 'clamp',
  });

  const elevation = progress.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE],
    outputRange: [2, 6],
    extrapolate: 'clamp',
  });

  const shadowOpacity = progress.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE],
    outputRange: [0.08, 0.16],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          paddingTop: padTop,
          paddingBottom: padBottom,
          elevation,
          shadowOpacity,
          zIndex: 20,
        },
      ]}
    >
      <View style={styles.left}>
        {canGoBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.side}
            accessibilityLabel="Voltar"
          >
            <Icon name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : null}
        <Animated.Image
          source={require('../../assets/images/2026/Ingenia_2026.png')}
          style={[styles.logo, { height: logoHeight }]}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        onPress={() => setMenuAberto(true)}
        style={styles.side}
        accessibilityLabel="Abrir menu"
      >
        <Icon name="menu" size={26} color={colors.primary} />
      </TouchableOpacity>

      <SideMenu visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </Animated.View>
  );
};

export function createHeaderScrollHandler(scrollY: Animated.Value) {
  return Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingLeft: 16,
    paddingRight: 8,
    borderBottomWidth: 3,
    borderBottomColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  side: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    maxWidth: '55%',
  },
});

export default Header;
