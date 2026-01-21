import { EmptyCart } from '@components/EmptyCart';
import { FullCart } from '@components/FullCart';
import { Layout } from '@components/Layout/Layout';
import { useCart } from '@contexts/CartContext/useCart';

function Cart() {
  const { items } = useCart();

  return <Layout>{items.length === 0 ? <EmptyCart /> : <FullCart />}</Layout>;
}

export default Cart;
