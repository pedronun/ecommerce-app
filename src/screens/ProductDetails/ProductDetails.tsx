import { Layout } from '@components/Layout/Layout';
import { useCart } from '@contexts/index';
import { Badge, Button, Card, Chip, Divider, Skeleton, Text } from '@design-system/components';
import { useToast } from '@design-system/components/Toast';
import { useTheme } from '@design-system/theme/ThemeContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getProductBySlug } from '@services/product';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@typings/product';
import { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { styles } from './ProductDetails.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH;

function ProductDetails() {
  const { slug } = useRoute<RouteProp<{ ProductDetails: { slug: string } }>>().params;
  const { theme } = useTheme();
  const { show: showToast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const carouselRef = useRef<ICarouselInstance>(null);
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery<Product, Error>({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
    staleTime: 1000 * 60 * 5, // 5 minutos - dados considerados frescos
    gcTime: 1000 * 60 * 30, // 30 minutos - tempo em cache após não ser usado
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setIsAddingToCart(true);
      await addToCart(product);
      showToast({
        type: 'success',
        message: 'Produto adicionado ao carrinho!',
        duration: 3000,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Erro ao adicionar produto ao carrinho',
        duration: 3000,
      });
      console.error('Erro ao adicionar ao carrinho:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <ScrollView style={styles.container}>
          <Skeleton
            width={SCREEN_WIDTH}
            height={IMAGE_HEIGHT}
            style={{ marginBottom: theme.spacing[4] }}
          />
          <View style={[styles.content, { padding: theme.spacing[4] }]}>
            <Skeleton width="80%" height={32} style={{ marginBottom: theme.spacing[2] }} />
            <Skeleton width="40%" height={40} style={{ marginBottom: theme.spacing[4] }} />
            <Skeleton width="100%" height={20} style={{ marginBottom: theme.spacing[2] }} />
            <Skeleton width="100%" height={20} style={{ marginBottom: theme.spacing[2] }} />
            <Skeleton width="60%" height={20} />
          </View>
        </ScrollView>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <View style={[styles.centerContainer, { padding: theme.spacing[4] }]}>
          <Text variant="h3" style={{ color: theme.colors.text.secondary }}>
            Produto não encontrado
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View>
          <Carousel
            ref={carouselRef}
            width={SCREEN_WIDTH}
            height={IMAGE_HEIGHT}
            data={product.images}
            onSnapToItem={(index) => setSelectedImageIndex(index)}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.mainImage} resizeMode="cover" />
            )}
            pagingEnabled
            snapEnabled
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          />

          {product.images.length > 1 && (
            <View
              style={[
                styles.imageIndicators,
                { backgroundColor: theme.colors.overlay, borderRadius: theme.radius.full },
              ]}
            >
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        selectedImageIndex === index
                          ? theme.colors.primary
                          : theme.colors.text.disabled,
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={[styles.content, { padding: theme.spacing[4] }]}>
          <Chip
            variant="primary"
            style={{ alignSelf: 'flex-start', marginBottom: theme.spacing[3] }}
          >
            {product.category.name}
          </Chip>
          <Text variant="h2" style={{ marginBottom: theme.spacing[3] }}>
            {product.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text
              variant="h1"
              style={{ color: theme.colors.primary, marginBottom: theme.spacing[4] }}
            >
              {formatPrice(product.price)}
            </Text>
            <Badge variant="success">Em estoque</Badge>
          </View>

          <View style={{ gap: theme.spacing[3], marginBottom: theme.spacing[6] }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
            </Button>
            <Button variant="outline" size="lg" fullWidth>
              Comprar Agora
            </Button>
          </View>

          <View style={{ marginBottom: theme.spacing[4] }}>
            <Text variant="h4" style={{ marginBottom: theme.spacing[2] }}>
              Descrição
            </Text>
            <Text variant="body1" style={{ color: theme.colors.text.secondary, lineHeight: 24 }}>
              {product.description}
            </Text>
          </View>

          <Divider style={{ marginVertical: theme.spacing[4] }} />

          <Card
            variant="outlined"
            style={{
              padding: theme.spacing[4],
              backgroundColor: theme.colors.surface,
            }}
          >
            <Text variant="h4" style={{ marginBottom: theme.spacing[3] }}>
              Informações do Produto
            </Text>
            <View style={{ gap: theme.spacing[2] }}>
              <View style={styles.infoRow}>
                <Text variant="body2" style={{ color: theme.colors.text.secondary }}>
                  ID:
                </Text>
                <Text variant="body2">{product.id}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text variant="body2" style={{ color: theme.colors.text.secondary }}>
                  Categoria:
                </Text>
                <Text variant="body2">{product.category.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text variant="body2" style={{ color: theme.colors.text.secondary }}>
                  Criado em:
                </Text>
                <Text variant="body2">
                  {new Date(product.creationAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text variant="body2" style={{ color: theme.colors.text.secondary }}>
                  Atualizado em:
                </Text>
                <Text variant="body2">
                  {new Date(product.updatedAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
}

export default ProductDetails;
