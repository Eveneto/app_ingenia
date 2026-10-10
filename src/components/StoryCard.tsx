import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  INSTAGRAM_HASHTAGS,
  STORY_ART,
  STORY_LAYOUT_HEIGHT,
  STORY_LAYOUT_WIDTH,
  storyColors,
  storySafeArea,
} from '../config/instagram';

const StoryCard: React.FC = () => {
  if (STORY_ART) {
    return (
      <View style={styles.frame} collapsable={false}>
        <Image source={STORY_ART} style={styles.art} resizeMode="cover" />
      </View>
    );
  }

  return (
    <View style={styles.frame} collapsable={false}>
      <View style={[styles.band, styles.bandTop]} />
      <View style={styles.safe}>
        <View style={styles.logoPlate}>
          <Image
            source={require('../../assets/images/2026/Ingenia_2026.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="INGENIA 2026"
          />
        </View>
        <Text style={styles.date}>21 a 23 de outubro de 2026</Text>
        <Text style={styles.place}>
          Escola Politécnica da Universidade de Pernambuco
        </Text>
        <Text style={styles.hashtags}>{INSTAGRAM_HASHTAGS}</Text>
      </View>
      <View style={[styles.band, styles.bandBottom]} />
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    width: STORY_LAYOUT_WIDTH,
    height: STORY_LAYOUT_HEIGHT,
    backgroundColor: storyColors.background,
  },
  art: {
    width: '100%',
    height: '100%',
  },
  band: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: storyColors.accent,
  },
  bandTop: {
    top: 0,
  },
  bandBottom: {
    bottom: 0,
  },
  safe: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: storySafeArea.top,
    paddingBottom: storySafeArea.bottom,
    paddingHorizontal: storySafeArea.horizontal,
  },
  logoPlate: {
    backgroundColor: storyColors.plate,
    marginBottom: 28,
    paddingVertical: 8,
  },
  logo: {
    width: '100%',
    height: 120,
  },
  date: {
    color: storyColors.accent,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  place: {
    color: storyColors.text,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    marginTop: 12,
  },
  hashtags: {
    color: storyColors.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 22,
  },
});

export default StoryCard;
