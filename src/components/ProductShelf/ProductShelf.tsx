import { useCart } from '@contexts/CartContext/useCart';
import { Button, Icon, Skeleton, toast } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@typings/navigation';
import { formatCurrency } from '@utils/formatCurrency';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { getBaseStyles, getCompactContentStyles, getVariantStyles } from './ProductShelf.styles';
import { ProductShelfProps } from './ProductShelf.types';

export const ProductShelf: React.FC<ProductShelfProps> = ({
  product,
  variant = 'default',
  onPress,
  onFavorite,
  isFavorite = false,
  showAddToCart = true,
  showFavoriteButton = true,
  showCategory = true,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart();
  const navigation = useNavigation<AppNavigationProp>();
  const baseStyles = getBaseStyles(theme);
  const variantStyles = getVariantStyles(variant, theme);
  const compactStyles = getCompactContentStyles(theme);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const productInCart = isInCart(product.id);
  const currentQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.show({
      type: 'success',
      message: 'Produto adicionado ao carrinho!',
      duration: 3000,
    });
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      updateQuantity(product.id, 0);
      toast.show({
        type: 'info',
        message: 'Produto removido do carrinho',
        duration: 3000,
      });
    }
  };

  const renderImage = () => {
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '';

    return (
      <View style={[baseStyles.imageContainer, variantStyles.imageContainer]}>
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            )}
            <Image
              source={{ uri: imageUrl }}
              style={[baseStyles.image, variantStyles.image]}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          </>
        ) : (
          <View
            style={[
              baseStyles.image,
              variantStyles.image,
              {
                backgroundColor: theme.colors.background,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <Icon name="image" size={48} color={theme.colors.text.disabled} />
          </View>
        )}

        {showFavoriteButton && variant !== 'compact' && (
          <TouchableOpacity
            style={baseStyles.favoriteButton}
            onPress={onFavorite}
            activeOpacity={0.7}
          >
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={20}
              color={isFavorite ? theme.colors.error : theme.colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderContent = () => {
    const isCompact = variant === 'compact';
    const contentStyle = isCompact ? compactStyles.content : baseStyles.content;
    const titleStyle = isCompact ? compactStyles.title : baseStyles.title;
    const descriptionStyle = isCompact ? compactStyles.description : baseStyles.description;
    const priceStyle = isCompact ? compactStyles.price : baseStyles.price;

    return (
      <View style={contentStyle}>
        {/* Categoria */}
        {showCategory && product.category && !isCompact && (
          <View style={baseStyles.categoryContainer}>
            <Text style={baseStyles.categoryText}>{product.category.name}</Text>
          </View>
        )}

        {/* Título */}
        <Text style={titleStyle} numberOfLines={isCompact ? 2 : 3}>
          {product.title}
        </Text>

        {/* Descrição - apenas em variantes não compactas */}
        {!isCompact && variant === 'featured' && (
          <Text style={descriptionStyle} numberOfLines={2}>
            {product.description}
          </Text>
        )}

        {/* Preço */}
        <View style={baseStyles.priceContainer}>
          <Text style={priceStyle}>{formatCurrency(product.price)}</Text>
        </View>

        {/* Botões de ação */}
        {!isCompact && (
          <View style={baseStyles.footer}>
            {showAddToCart && !productInCart && (
              <Button
                variant="primary"
                size="sm"
                style={{ flex: 1 }}
                onPress={handleAddToCart}
                leftIcon={<Icon name="add-shopping-cart" size={16} color="#FFF" />}
              >
                Adicionar
              </Button>
            )}

            {showAddToCart && productInCart && (
              <View style={baseStyles.quantityContainer}>
                <TouchableOpacity
                  onPress={handleDecreaseQuantity}
                  style={[
                    baseStyles.quantityButton,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Icon name={'remove'} size={18} color={theme.colors.text.primary} />
                </TouchableOpacity>

                <View style={baseStyles.quantityTextContainer}>
                  <Text style={[baseStyles.quantityText, { color: theme.colors.text.primary }]}>
                    {currentQuantity}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={handleIncreaseQuantity}
                  style={[
                    baseStyles.quantityButton,
                    {
                      backgroundColor: theme.colors.primary,
                      borderColor: theme.colors.primary,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Icon name="add" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            )}

            {variant === 'featured' && (
              <Button variant="outline" size="sm" onPress={() => onPress?.()}>
                Ver Detalhes
              </Button>
            )}
          </View>
        )}
        {isCompact && showFavoriteButton && (
          <TouchableOpacity
            onPress={() => onFavorite?.()}
            activeOpacity={0.7}
            style={{ position: 'absolute', top: theme.spacing[2], right: theme.spacing[2] }}
          >
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={20}
              color={isFavorite ? theme.colors.error : theme.colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const containerStyle = [baseStyles.container, variantStyles.container, style];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => navigation.navigate('ProductDetails', { slug: product.slug })}
      activeOpacity={0.8}
      {...(props as TouchableOpacityProps)}
    >
      {renderImage()}
      {renderContent()}
    </TouchableOpacity>
  );
};
