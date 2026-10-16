import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SponsorsSection from '../components/SponsorsSection';
import { colors } from '../theme/colors';

const SponsorsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SponsorsSection />
      </ScrollView>
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
