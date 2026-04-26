import { Layout } from '@components/Layout/Layout';
import { ProductShelf } from '@components/ProductShelf';
import { Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@typings/navigation';
import { getProductsByCategory } from '@services/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getCategoryProductsStyles } from './CategoryProducts.styles';

const LIMIT = 20;

function CategoryProducts() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getCategoryProductsStyles(theme, insets);
  const route = useRoute<RouteProp<RootStackParamList, 'CategoryProducts'>>();

  const { categoryId, categoryName } = route.params;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: ({ pageParam = 0 }) =>
      getProductsByCategory({
        categoryId,
        limit: LIMIT,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      // Se a última página retornou menos produtos que o limite, não há mais páginas
      if (lastPage.length < LIMIT) {
        return undefined;
      }
      // Calcula o próximo offset baseado no total de páginas
      return allPages.length * LIMIT;
    },
    initialPageParam: 0,
  });

  // Concatena todos os produtos de todas as páginas
  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page) ?? [];
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text variant="h2" style={styles.title}>
          {categoryName}
        </Text>
        {!isLoading && products && (
          <Text variant="caption" style={styles.subtitle}>
            {products.length} {products.length === 1 ? 'produto' : 'produtos'}
          </Text>
        )}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon
        family="MaterialIcons"
        name="inventory-2"
        size={64}
        color={theme.colors.text.disabled}
        style={styles.emptyIcon}
      />
      <Text variant="h3" style={styles.emptyTitle}>
        Nenhum produto encontrado
      </Text>
      <Text variant="body2" style={styles.emptyDescription}>
        Não há produtos disponíveis nesta categoria no momento.
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Icon
        family="MaterialIcons"
        name="error-outline"
        size={64}
        color={theme.colors.error}
        style={styles.errorIcon}
      />
      <Text variant="h3" style={styles.errorTitle}>
        Erro ao carregar produtos
      </Text>
      <Text variant="body2" style={styles.errorDescription}>
        Não foi possível carregar os produtos desta categoria.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRefresh} activeOpacity={0.7}>
        <Text style={styles.retryButtonText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <View key={item} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonPrice} />
            <View style={styles.skeletonCategory} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.container}>
          {renderHeader()}
          {renderSkeleton()}
        </View>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <View style={styles.container}>
          {renderHeader()}
          {renderError()}
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        {renderHeader()}
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <ProductShelf product={item} style={{ width: '100%' }} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}

export default CategoryProducts;
