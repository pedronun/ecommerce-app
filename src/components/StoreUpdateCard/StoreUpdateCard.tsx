import { Card, Icon, Text } from '@design-system/components';
import { Animated, TouchableOpacity, View } from 'react-native';
import { getBaseStyles } from './StoreUpdateCard.styles';
import { getProfileStyles } from '../../screens/Profile/Profile.styles';
import { useAppUpdate } from '@hooks/useAppUpdate';
import { useEffect, useRef } from 'react';
import { useTheme } from '@design-system/theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const StoreUpdateCard: React.FC = () => {
  const { openStore, latestVersion, isLoading: isUpdateLoading, hasUpdate } = useAppUpdate();
  const updateAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getBaseStyles(theme);
  const profileStyles = getProfileStyles(theme, insets);

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
        profileStyles.section,
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
      <Card variant="outlined" style={profileStyles.card}>
        <TouchableOpacity style={profileStyles.settingItem} onPress={openStore} activeOpacity={0.7}>
          <View style={profileStyles.settingLeft}>
            <View style={[profileStyles.settingIconContainer, styles.updateIconBg]}>
              <Icon family="MaterialIcons" name="system-update" size={22} color="#FF9800" />
            </View>
            <View style={profileStyles.settingTextContainer}>
              <Text variant="body1" style={profileStyles.settingTitle}>
                Atualização disponível
              </Text>
              <Text variant="caption" style={profileStyles.settingDescription}>
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
