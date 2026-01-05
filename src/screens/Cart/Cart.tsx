import { EmptyCart } from '@components/EmptyCart';
import { FullCart } from '@components/FullCart';
import { Layout } from '@components/Layout/Layout';
import { useCart } from '@contexts/CartContext/useCart';
import { View } from 'react-native';
import { getCartStyles } from './Cart.styles';
import { useTheme } from '@design-system/theme/ThemeContext';

function Cart() {
  const { items } = useCart();
  const { theme } = useTheme();
  const styles = getCartStyles(theme);

  return (
    <Layout>
      <View style={styles.container}>{items.length === 0 ? <EmptyCart /> : <FullCart />}</View>
    </Layout>
  );
}

export default Cart;
