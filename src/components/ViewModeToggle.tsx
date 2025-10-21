import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

interface ViewModeToggleProps {
  currentMode: 'table' | 'list';
  onModeChange: (mode: 'table' | 'list') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  currentMode,
  onModeChange,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <TouchableOpacity
        style={[
          styles.button,
          currentMode === 'table' && styles.activeButton,
          isDarkMode && styles.buttonDark,
          currentMode === 'table' && isDarkMode && styles.activeButtonDark,
        ]}
        onPress={() => onModeChange('table')}>
        <Text
          style={[
            styles.buttonText,
            currentMode === 'table' && styles.activeButtonText,
            isDarkMode && styles.buttonTextDark,
            currentMode === 'table' && isDarkMode && styles.activeButtonTextDark,
          ]}>
          Tabela
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          currentMode === 'list' && styles.activeButton,
          isDarkMode && styles.buttonDark,
          currentMode === 'list' && isDarkMode && styles.activeButtonDark,
        ]}
        onPress={() => onModeChange('list')}>
        <Text
          style={[
            styles.buttonText,
            currentMode === 'list' && styles.activeButtonText,
            isDarkMode && styles.buttonTextDark,
            currentMode === 'list' && isDarkMode && styles.activeButtonTextDark,
          ]}>
          Lista
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
    margin: 16,
  },
  containerDark: {
    backgroundColor: '#333333',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#FF002E',
  },
  activeButtonDark: {
    backgroundColor: '#FF002E',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  buttonTextDark: {
    color: '#cccccc',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  activeButtonTextDark: {
    color: '#ffffff',
  },
});

export default ViewModeToggle;
