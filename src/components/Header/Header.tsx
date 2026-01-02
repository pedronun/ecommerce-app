import { useTheme } from '@design-system/theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyles } from './Header.styles';

export const Header: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = createStyles(theme);
  const canGoBack = navigation.canGoBack();

  const isInsideTabNavigator = useNavigationState((state) => {
    if (state.type === 'tab') {
      return true;
    }

    const currentRoute = state.routes[state.index];
    if (currentRoute.state?.type === 'tab') {
      return true;
    }

    return false;
  });

  const handleBackPress = () => {
    if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {canGoBack && !isInsideTabNavigator && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>
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
