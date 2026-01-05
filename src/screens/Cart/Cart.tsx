import { EmptyCart } from '@components/EmptyCart';
import { FullCart } from '@components/FullCart';
import { Layout } from '@components/Layout/Layout';
import { useCart } from '@contexts/CartContext/useCart';
import { View } from 'react-native';
import { styles } from './Cart.styles';

function Cart() {
  const { items } = useCart();

  return (
    <Layout>
      <View style={styles.container}>{items.length === 0 ? <EmptyCart /> : <FullCart />}</View>
    </Layout>
  );
}

export default Cart;
