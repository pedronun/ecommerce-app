import { View } from 'react-native';

import { Button, Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { HomeErrorProps } from './HomeError.types';

export const HomeError: React.FC<HomeErrorProps> = ({ onRetry }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.spacing[8],
        gap: theme.spacing[5],
        marginBottom: theme.spacing[32],
      }}
    >
      <View
        style={{
          width: 88,
          height: 88,
          borderRadius: theme.radius.full,
          backgroundColor: `${theme.colors.error}1A`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          family="MaterialCommunityIcons"
          name="wifi-off"
          size={40}
          color={theme.colors.error}
        />
      </View>

      <View style={{ alignItems: 'center', gap: theme.spacing[2] }}>
        <Text variant="h3" align="center">
          Ops, algo deu errado
        </Text>
        <Text variant="body1" align="center" color={theme.colors.text.secondary}>
          Não conseguimos carregar o conteúdo. Verifique sua conexão e tente novamente.
        </Text>
      </View>

      <Button variant="primary" size="md" onPress={onRetry}>
        Tentar novamente
      </Button>
    </View>
  );
};
