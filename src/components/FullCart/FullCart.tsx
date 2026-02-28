import { useCart } from '@contexts/CartContext/useCart';
import { Button, Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFullCartStyles } from './FullCart.styles';
import { useScrollToTop } from '@react-navigation/native';
import { useRef } from 'react';

function FullCart() {
  const { items, totalPrice, totalItems, removeFromCart, updateQuantity } = useCart();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getFullCartStyles(theme);
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleQuantityChange = (productId: number, quantity: number, increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="h3" style={styles.headerTitle}>
            Meu Carrinho
          </Text>
          <Text variant="body2" style={styles.headerSubtitle}>
            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
          </Text>
        </View>

        {/* Items List */}
        <View style={styles.itemsList}>
          {items.map((item) => (
            <View key={item.product.id} style={styles.itemCard}>
              <Image
                source={{ uri: item.product.images[0] }}
                style={styles.itemImage}
                resizeMode="cover"
              />

              <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                  <Text variant="body1" numberOfLines={2} style={styles.itemTitle}>
                    {item.product.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.product.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Icon
                      family="MaterialIcons"
                      name="close"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.itemFooter}>
                  <Text variant="h4" style={styles.itemPrice}>
                    {formatPrice(item.product.price)}
                  </Text>

                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.product.id, item.quantity, -1)}
                      style={styles.quantityBtn}
                    >
                      <Icon
                        family="MaterialIcons"
                        name="remove"
                        size={18}
                        color={theme.colors.text.primary}
                      />
                    </TouchableOpacity>

                    <Text variant="body1" style={styles.quantityText}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.product.id, item.quantity, 1)}
                      style={styles.quantityBtn}
                    >
                      <Icon
                        family="MaterialIcons"
                        name="add"
                        size={18}
                        color={theme.colors.text.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer with Summary and Checkout */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 90 }]}>
        {/* Summary Lines */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text variant="body2" style={styles.summaryLabel}>
              Subtotal
            </Text>
            <Text variant="body1" style={styles.summaryValue}>
              {formatPrice(totalPrice)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text variant="body2" style={styles.summaryLabel}>
              Frete
            </Text>
            <Text variant="body1" style={styles.summaryValueFree}>
              Grátis
            </Text>
          </View>
        </View>

        {/* Total and Checkout Button */}
        <View style={styles.totalRow}>
          <View>
            <Text variant="body2" style={styles.totalLabel}>
              Total
            </Text>
            <Text variant="h2" style={styles.totalPrice}>
              {formatPrice(totalPrice)}
            </Text>
          </View>
          <Button
            variant="primary"
            size="lg"
            onPress={() => Alert.alert('Em breve', 'Funcionalidade de checkout em desenvolvimento')}
          >
            Finalizar Compra
          </Button>
        </View>
      </View>
    </View>
  );
}

export default FullCart;
