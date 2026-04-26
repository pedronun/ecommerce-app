import { EmptyCart } from '@components/EmptyCart';
import { FullCart } from '@components/FullCart';
import { Layout } from '@components/Layout/Layout';
import { useCart } from '@contexts/CartContext/useCart';
import { Skeleton } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { View } from 'react-native';

function CartSkeleton() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, padding: theme.spacing[4], gap: theme.spacing[4] }}>
      <Skeleton width="50%" height={28} style={{ marginBottom: theme.spacing[2] }} />
      {[1, 2, 3].map((i) => (
        <View key={i} style={{ flexDirection: 'row', gap: theme.spacing[3], alignItems: 'center' }}>
          <Skeleton
            variant="rectangular"
            width={80}
            height={80}
            style={{ borderRadius: theme.radius.sm }}
          />
          <View style={{ flex: 1, gap: theme.spacing[2] }}>
            <Skeleton width="80%" height={16} />
            <Skeleton width="40%" height={16} />
            <Skeleton width="30%" height={24} />
          </View>
        </View>
      ))}
    </View>
  );
}

function Cart() {
  const { items, isLoading } = useCart();

  return (
    <Layout>
      {isLoading ? <CartSkeleton /> : items.length === 0 ? <EmptyCart /> : <FullCart />}
    </Layout>
  );
}

export default Cart;
