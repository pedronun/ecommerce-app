import { Layout } from '@components/Layout/Layout';
import { Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { AppNavigationProp } from '@typings/navigation';
import { getCategories } from '@services/category';
import { useQuery } from '@tanstack/react-query';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getMenuStyles } from './Menu.styles';
import { useRef } from 'react';

function Menu() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getMenuStyles(theme, insets);
  const navigation = useNavigation<AppNavigationProp>();
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const handleCategoryPress = (categoryId: number, categoryName: string) => {
    // Navega para a tela de produtos da categoria
    navigation.navigate('CategoryProducts', { categoryId, categoryName });
  };

  const renderSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <View key={item} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonSubtitle} />
          </View>
        </View>
      ))}
    </>
  );

  return (
    <Layout>
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            Menu
          </Text>
          <Text variant="body1" style={styles.subtitle}>
            Explore nossas categorias de produtos
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {isLoading && renderSkeleton()}

          {!isLoading && (!categories || categories.length === 0) && (
            <View style={styles.emptyContainer}>
              <Icon
                family="MaterialIcons"
                name="category"
                size={64}
                color={theme.colors.text.disabled}
                style={styles.emptyIcon}
              />
              <Text variant="body1" style={styles.emptyText}>
                Nenhuma categoria encontrada
              </Text>
              <Text variant="caption" style={styles.emptyDescription}>
                Não foi possível carregar as categorias no momento
              </Text>
            </View>
          )}

          {!isLoading &&
            categories &&
            categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id, category.name)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryContent}>
                  <View style={styles.categoryImageWrapper}>
                    {category.image ? (
                      <Image
                        source={{ uri: category.image }}
                        style={styles.categoryImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <Icon
                        family="MaterialIcons"
                        name="category"
                        size={40}
                        color={theme.colors.primary}
                      />
                    )}
                  </View>

                  <View style={styles.categoryInfo}>
                    <Text variant="body1" style={styles.categoryName}>
                      {category.name}
                    </Text>
                    <Text variant="caption" style={styles.categorySlug}>
                      #{category.slug}
                    </Text>
                  </View>

                  <Icon
                    family="MaterialIcons"
                    name="chevron-right"
                    size={24}
                    color={theme.colors.text.secondary}
                    style={styles.categoryArrow}
                  />
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Menu;
