import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header, { createHeaderScrollHandler } from '../components/Header';
import SponsorsSection from '../components/SponsorsSection';
import { colors } from '../theme/colors';

const SponsorsScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header scrollY={scrollY} />
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={createHeaderScrollHandler(scrollY)}
      >
        <SponsorsSection />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSponsors,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default SponsorsScreen;
