import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Header from '../components/Header';
import ViewModeToggle from '../components/ViewModeToggle';
import TableView from '../components/TableView';
import ListView from '../components/ListView';
import { ViewMode } from '../types/Event';

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Header title="INGENIA 2025" />
      
      <View style={styles.dateContainer}>
        <Text style={[styles.dateText, isDarkMode && styles.dateTextDark]}>
          29 de Outubro, 2025
        </Text>
        <Text style={[styles.subtitleText, isDarkMode && styles.subtitleTextDark]}>
          Semana Universitária - Escola Politécnica
        </Text>
      </View>

      <ViewModeToggle 
        currentMode={viewMode} 
        onModeChange={setViewMode} 
      />
      
      <View style={styles.content}>
        {viewMode === 'table' ? (
          <TableView events={[]} />
        ) : (
          <ListView events={[]} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  dateContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  dateTextDark: {
    color: '#ffffff',
  },
  subtitleText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  subtitleTextDark: {
    color: '#cccccc',
  },
  content: {
    flex: 1,
  },
});

export default HomeScreen;
