import React, { useLayoutEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';
import { colors } from '../theme/colors';

const INSCRICAO_URL = 'https://www.serdigital.com.br/ingenia/2026/safetyarea/';

const DESTINOS = [
  { screen: 'Menu', label: 'Início', icon: 'home' },
  { screen: 'Programacao', label: 'Programação', icon: 'event-note' },
  { screen: 'Mapa', label: 'Mapa', icon: 'map' },
  { screen: 'Patrocinadores', label: 'Patrocinadores', icon: 'star' },
] as const;

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(width * 0.82, 320);
  const translateX = useRef(new Animated.Value(drawerWidth)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    if (!visible) {
      return;
    }
    translateX.setValue(drawerWidth);
    backdrop.setValue(0);
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdrop, drawerWidth, translateX, visible]);

  const close = (after?: () => void) => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: drawerWidth,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onClose();
        after?.();
      }
    });
  };

  const irPara = (screen: string) => {
    close(() => {
      if (route.name !== screen) {
        navigation.navigate(screen);
      }
    });
  };

  const abrirInscricao = () => {
    close(() => {
      Linking.openURL(INSCRICAO_URL);
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => close()}
    >
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: backdrop }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => close()}
            accessibilityLabel="Fechar menu"
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.drawer,
            {
              width: drawerWidth,
              paddingTop: insets.top + 16,
              paddingBottom: Math.max(insets.bottom, 16),
              transform: [{ translateX }],
            },
          ]}
        >
          <View style={styles.drawerHeader}>
            <Image
              source={require('../../assets/images/2026/Ingenia_2026.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="INGENIA 2026"
            />
            <TouchableOpacity
              onPress={() => close()}
              style={styles.closeButton}
              accessibilityLabel="Fechar menu"
            >
              <Icon name="close" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.dates}>21 a 23 de outubro de 2026</Text>

          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
          >
            {DESTINOS.map(item => {
              const ativo = route.name === item.screen;
              return (
                <TouchableOpacity
                  key={item.screen}
                  style={[styles.item, ativo && styles.itemAtivo]}
                  onPress={() => irPara(item.screen)}
                  activeOpacity={0.75}
                >
                  <Icon
                    name={item.icon}
                    size={22}
                    color={ativo ? colors.accent : colors.primary}
                  />
                  <Text style={[styles.itemText, ativo && styles.itemTextAtivo]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.inscricao}
            onPress={abrirInscricao}
            activeOpacity={0.85}
          >
            <Icon name="how-to-reg" size={20} color={colors.textOnDark} />
            <Text style={styles.inscricaoText}>Inscrições</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 33, 78, 0.45)',
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.background,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    elevation: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    flex: 1,
    height: 64,
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dates: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 2,
    marginBottom: 4,
  },
  itemAtivo: {
    backgroundColor: colors.backgroundSoft,
    borderRightWidth: 4,
    borderRightColor: colors.accent,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  itemTextAtivo: {
    color: colors.accent,
  },
  inscricao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    backgroundColor: colors.accent,
    paddingVertical: 14,
  },
  inscricaoText: {
    color: colors.textOnDark,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

export default SideMenu;
