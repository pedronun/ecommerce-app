/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from './EmptyCart.styles';
import { View } from 'react-native';

function EmptyCart() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.emptyStateContainer}>
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.surface }]}>
        <Icon
          family="MaterialCommunityIcons"
          name="cart-outline"
          size={80}
          color={theme.colors.text.hint}
        />
      </View>

      <Text variant="h2" style={[styles.title, { color: theme.colors.text.primary }]}>
        Seu carrinho está vazio
      </Text>

      <Text variant="body1" style={[styles.description, { color: theme.colors.text.secondary }]}>
        Adicione produtos ao seu carrinho para continuar com a compra
      </Text>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        Continuar Comprando
      </Button>
    </View>
  );
}

export default EmptyCart;
