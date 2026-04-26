import { Card, Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { useAppUpdate } from '@hooks/useAppUpdate';
import { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { getBaseStyles } from './StoreUpdateCard.styles';

export const StoreUpdateCard: React.FC = () => {
  const { openStore, latestVersion, isLoading: isUpdateLoading, hasUpdate } = useAppUpdate();
  const updateAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const styles = getBaseStyles(theme);

  useEffect(() => {
    if (!isUpdateLoading && hasUpdate) {
      Animated.parallel([
        Animated.timing(updateAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [hasUpdate, isUpdateLoading, updateAnim]);

  if (!hasUpdate) return null;

  return (
    <Animated.View
      style={[
        styles.section,
        {
          opacity: updateAnim,
          transform: [
            {
              translateY: updateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-12, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Card variant="outlined">
        <TouchableOpacity style={styles.settingItem} onPress={openStore} activeOpacity={0.7}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, styles.updateIconBg]}>
              <Icon family="MaterialIcons" name="system-update" size={22} color="#FF9800" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text variant="body1" style={styles.settingTitle}>
                Atualização disponível
              </Text>
              <Text variant="caption" style={styles.settingDescription}>
                Versão v{latestVersion ?? '0.0.0'} disponível
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={openStore} activeOpacity={0.7}>
            <Text variant="caption" style={styles.updateActionText}>
              Atualizar
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Card>
    </Animated.View>
  );
};
