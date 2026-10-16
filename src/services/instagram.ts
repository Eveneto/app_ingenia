import { Alert, Linking, Platform, ToastAndroid, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import {
  INSTAGRAM_HASHTAGS,
  INSTAGRAM_PACKAGE,
  INSTAGRAM_WEB,
  STORY_OUTPUT_HEIGHT,
  STORY_OUTPUT_WIDTH,
} from '../config/instagram';

const PLAY_STORE = `https://play.google.com/store/apps/details?id=${INSTAGRAM_PACKAGE}`;
const PLAY_STORE_APP = `market://details?id=${INSTAGRAM_PACKAGE}`;
const APP_STORE = 'itms-apps://apps.apple.com/app/instagram/id389801252';

function avisar(mensagem: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensagem, ToastAndroid.LONG);
    return;
  }
  Alert.alert('Instagram', mensagem);
}

async function instagramInstalado() {
  try {
    return await Linking.canOpenURL('instagram://');
  } catch {
    return false;
  }
}

function abrirLoja() {
  if (Platform.OS === 'ios') {
    Linking.openURL(APP_STORE).catch(() => Linking.openURL(INSTAGRAM_WEB));
    return;
  }
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
  await Clipboard.setStringAsync(INSTAGRAM_HASHTAGS);
  avisar('Hashtags copiadas. Cole na legenda do post.');
  const instalado = await instagramInstalado();
  if (instalado) {
    await Linking.openURL('instagram://');
    return;
  }
  await Linking.openURL(INSTAGRAM_WEB);
}

export async function compartilharStory(view: React.RefObject<View | null>) {
  await Clipboard.setStringAsync(INSTAGRAM_HASHTAGS);

  const instalado = await instagramInstalado();
  if (!instalado) {
    pedirInstagram(
      'O Instagram não está instalado neste celular. As hashtags foram copiadas.',
    );
    return;
  }

  if (!(await Sharing.isAvailableAsync())) {
    Alert.alert(
      'Stories',
      'As hashtags foram copiadas, mas o compartilhamento não está disponível neste dispositivo.',
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
    'Hashtags copiadas. Escolha o Instagram na lista e cole um texto no story se quiser.',
  );

  try {
    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: 'Compartilhar no Instagram Stories',
      UTI: 'public.png',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (/cancel|did not share/i.test(message)) {
      return;
    }
    Alert.alert('Instagram', 'Não foi possível abrir o compartilhamento.');
  }
}
