import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';
import { useAppUpdateCheck } from '../hooks/useAppUpdateCheck';
import { colors } from '../theme/colors';
import PressableScale from './motion/PressableScale';

const AppUpdateBanner: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { info, visible, obrigatorio, dismiss, download } = useAppUpdateCheck();
  const slide = useRef(new Animated.Value(80)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      return;
    }
    slide.setValue(80);
    fade.setValue(0);
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(slide, {
        toValue: 0,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, fade, slide]);

  if (!info) {
    return null;
  }

  const canDownload = info.apk_disponivel === true;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => {
        if (!obrigatorio) {
          dismiss();
        }
      }}
    >
      <View style={styles.root} pointerEvents="box-none">
        <Animated.View style={[styles.overlay, { opacity: fade }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (!obrigatorio) {
                dismiss();
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="Fechar aviso de atualização"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              marginBottom: Math.max(insets.bottom, 16) + 12,
              paddingBottom: 16,
              transform: [{ translateY: slide }],
              opacity: fade,
            },
          ]}
        >
          {!obrigatorio ? (
            <TouchableOpacity
              onPress={dismiss}
              style={styles.close}
              accessibilityLabel="Dispensar atualização"
              hitSlop={12}
            >
              <Icon name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}

          <Text style={styles.title}>
            {info.titulo_atualizacao || 'Nova versão disponível'}
          </Text>
          <Text style={styles.message}>
            {info.mensagem_atualizacao ||
              'Há uma atualização do aplicativo. Baixe a nova versão.'}
          </Text>
          {info.versao ? (
            <Text style={styles.version}>Versão {info.versao}</Text>
          ) : null}

          <PressableScale
            onPress={download}
            disabled={!canDownload}
            style={[styles.downloadBtn, !canDownload && styles.downloadDisabled]}
          >
            <Icon name="file-download" size={20} color={colors.textOnDark} />
            <Text style={styles.downloadText}>
              {canDownload ? 'Baixar atualização' : 'APK indisponível'}
            </Text>
          </PressableScale>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 33, 78, 0.28)',
  },
  sheet: {
    marginHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
    paddingRight: 36,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  version: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 14,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  downloadDisabled: {
    opacity: 0.45,
  },
  downloadText: {
    color: colors.textOnDark,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default AppUpdateBanner;
