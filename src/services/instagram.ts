import { Alert, Linking, Platform, ToastAndroid, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Share, { Social } from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import {
  FACEBOOK_APP_ID,
  INSTAGRAM_HASHTAGS,
  INSTAGRAM_PACKAGE,
  INSTAGRAM_WEB,
  STORY_OUTPUT_HEIGHT,
  STORY_OUTPUT_WIDTH,
} from '../config/instagram';
import { colors } from '../theme/colors';

const PLAY_STORE = `https://play.google.com/store/apps/details?id=${INSTAGRAM_PACKAGE}`;
const PLAY_STORE_APP = `market://details?id=${INSTAGRAM_PACKAGE}`;

function avisar(mensagem: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensagem, ToastAndroid.LONG);
    return;
  }
  Alert.alert('Instagram', mensagem);
}

async function instagramInstalado() {
  try {
    const resultado = await Share.isPackageInstalled(INSTAGRAM_PACKAGE);
    return resultado.isInstalled;
  } catch {
    return Linking.canOpenURL('instagram://');
  }
}

function abrirLoja() {
  Linking.openURL(PLAY_STORE_APP).catch(() => Linking.openURL(PLAY_STORE));
}

function pedirInstagram(mensagem: string) {
  Alert.alert('Instagram', mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Abrir o site', onPress: () => Linking.openURL(INSTAGRAM_WEB) },
    { text: 'Abrir a loja', onPress: abrirLoja },
  ]);
}

export async function compartilharFeed() {
  Clipboard.setString(INSTAGRAM_HASHTAGS);
  avisar('Hashtags copiadas. Cole na legenda do post.');
  const instalado = await instagramInstalado();
  if (instalado) {
    await Linking.openURL('instagram://');
    return;
  }
  await Linking.openURL(INSTAGRAM_WEB);
}

export async function compartilharStory(view: React.RefObject<View | null>) {
  Clipboard.setString(INSTAGRAM_HASHTAGS);

  const instalado = await instagramInstalado();
  if (!instalado) {
    pedirInstagram(
      'O Instagram não está instalado neste celular. As hashtags foram copiadas.',
    );
    return;
  }

  if (!FACEBOOK_APP_ID) {
    Alert.alert(
      'Stories',
      'As hashtags foram copiadas. Para abrir a arte no Instagram, falta o Facebook App ID da Meta em src/config/instagram.ts.',
    );
    return;
  }

  const uri = await captureRef(view, {
    format: 'png',
    quality: 1,
    result: 'tmpfile',
    width: STORY_OUTPUT_WIDTH,
    height: STORY_OUTPUT_HEIGHT,
  });

  avisar(
    'Hashtags copiadas. No story, cole um texto se quiser que a hashtag seja pesquisável.',
  );

  try {
    await Share.shareSingle({
      social: Social.InstagramStories,
      appId: FACEBOOK_APP_ID,
      backgroundImage: uri,
      backgroundTopColor: colors.primary,
      backgroundBottomColor: colors.accent,
      useInternalStorage: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (/cancel|did not share/i.test(message)) {
      return;
    }
    if (/not installed/i.test(message)) {
      pedirInstagram(
        'O Instagram não está instalado neste celular. As hashtags foram copiadas.',
      );
      return;
    }
    Alert.alert('Instagram', 'Não foi possível abrir o story.');
  }
}
