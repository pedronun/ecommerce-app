import { useCart } from '@contexts/useCart';
import { Button, Card, Divider, Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './FullCart.styles';

function FullCart() {
  const { theme } = useTheme();
  const { items, totalPrice, totalItems, removeFromCart, updateQuantity } = useCart();
  const insets = useSafeAreaInsets();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleIncreaseQuantity = (productId: number, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsList}>
          {items.map((item, index) => (
            <View key={item.product.id}>
              <Card style={styles.itemCard}>
                <View style={styles.itemContent}>
                  <Image
                    source={{ uri: item.product.images[0] }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />

                  <View style={styles.productInfo}>
                    <Text
                      variant="body1"
                      numberOfLines={2}
                      style={[styles.productTitle, { color: theme.colors.text.primary }]}
                    >
                      {item.product.title}
                    </Text>

                    <Text
                      variant="h4"
                      style={[styles.productPrice, { color: theme.colors.primary }]}
                    >
                      {formatPrice(item.product.price)}
                    </Text>

                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        onPress={() => handleDecreaseQuantity(item.product.id, item.quantity)}
                        style={[
                          styles.quantityButton,
                          {
                            backgroundColor: theme.colors.surface,
                            borderColor: theme.colors.border,
                          },
                        ]}
                      >
                        <Icon
                          family="MaterialIcons"
                          name="remove"
                          size={20}
                          color={theme.colors.text.primary}
                        />
                      </TouchableOpacity>

                      <Text
                        variant="body1"
                        style={[styles.quantityText, { color: theme.colors.text.primary }]}
                      >
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        onPress={() => handleIncreaseQuantity(item.product.id, item.quantity)}
                        style={[
                          styles.quantityButton,
                          {
                            backgroundColor: theme.colors.surface,
                            borderColor: theme.colors.border,
                          },
                        ]}
                      >
                        <Icon
                          family="MaterialIcons"
                          name="add"
                          size={20}
                          color={theme.colors.text.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.product.id)}
                    style={styles.removeButton}
                  >
                    <Icon
                      family="MaterialIcons"
                      name="delete-outline"
                      size={24}
                      color={theme.colors.error}
                    />
                  </TouchableOpacity>
                </View>
              </Card>

              {index < items.length - 1 && <View style={styles.itemSeparator} />}
            </View>
          ))}
        </View>

        <Card style={styles.summaryCard}>
          <Text variant="h3" style={[styles.summaryTitle, { color: theme.colors.text.primary }]}>
            Resumo do Pedido
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text variant="body1" style={{ color: theme.colors.text.secondary }}>
              Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
            </Text>
            <Text variant="body1" style={{ color: theme.colors.text.primary }}>
              {formatPrice(totalPrice)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="body1" style={{ color: theme.colors.text.secondary }}>
              Frete
            </Text>
            <Text variant="body1" style={{ color: theme.colors.success }}>
              Grátis
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text variant="h4" style={{ color: theme.colors.text.primary }}>
              Total
            </Text>
            <Text variant="h3" style={{ color: theme.colors.primary }}>
              {formatPrice(totalPrice)}
            </Text>
          </View>
        </Card>
      </ScrollView>

      <View
        style={[
          styles.checkoutContainer,
          {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
            paddingBottom: Math.max(insets.bottom, 16) + 60, // 60px é aproximadamente a altura da TabBar
          },
        ]}
      >
        <Button variant="primary" size="lg" fullWidth style={styles.checkoutButton}>
          {`Fechar Pedido - ${formatPrice(totalPrice)}`}
        </Button>
      </View>
    </View>
  );
}

export default FullCart;
