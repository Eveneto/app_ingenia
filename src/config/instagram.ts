import { colors } from '../theme/colors';

export const INSTAGRAM_HASHTAGS =
  '#Ingenia2026 #POLIUPE #Engenharia #Recife';

export const INSTAGRAM_PACKAGE = 'com.instagram.android';

export const INSTAGRAM_WEB = 'https://www.instagram.com/';

/**
 * App ID do app criado em developers.facebook.com.
 * O Instagram exige esse valor para receber a arte no story.
 * Veja o README.
 */
export const FACEBOOK_APP_ID = '';

/** Seção completa de Instagram na tela inicial. */
export const MOSTRAR_SECAO_INSTAGRAM = false;

/** O botão de story fica oculto até o Facebook App ID estar configurado. */
export const MOSTRAR_STORY = false;

/**
 * Arte final 1080×1920. Enquanto for null, o app usa o card de exemplo.
 * Quando o PNG chegar:
 * export const STORY_ART = require('../../assets/images/2026/story-ingenia.png');
 */
export const STORY_ART: number | null = null;

export const STORY_OUTPUT_WIDTH = 1080;
export const STORY_OUTPUT_HEIGHT = 1920;

export const STORY_LAYOUT_WIDTH = 360;
export const STORY_LAYOUT_HEIGHT = 640;

const STORY_SCALE = STORY_LAYOUT_WIDTH / STORY_OUTPUT_WIDTH;

export const storySafeArea = {
  top: 250 * STORY_SCALE,
  bottom: 320 * STORY_SCALE,
  horizontal: 80 * STORY_SCALE,
};

export const storyColors = {
  background: colors.primaryDark,
  accent: colors.accent,
  text: colors.textOnDark,
  plate: '#000000',
};
