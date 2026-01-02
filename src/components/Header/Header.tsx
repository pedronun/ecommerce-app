import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@design-system/theme/ThemeContext';
import { createStyles } from './Header.styles';

export const Header: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection} />
      <View style={styles.centerSection}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="shopping-cart" size={24} color="#FFFFFF" />
        </View>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.notificationButton} disabled={false} activeOpacity={0.7}>
          <MaterialIcons name="notifications" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
