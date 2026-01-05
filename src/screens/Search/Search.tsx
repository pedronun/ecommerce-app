import { Layout } from '@components/Layout/Layout';
import { ProductShelf } from '@components/ProductShelf';
import { useSearch } from '@contexts/SearchContext/useSearch';
import { Icon, Input } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { Product } from '@typings/product';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getSearchStyles } from './Search.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Majestic Mountain Graphic T-Shirt',
    slug: 'majestic-mountain-graphic-t-shirt',
    price: 44,
    description: 'Elevate your wardrobe with this stylish black t-shirt.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: ['https://i.imgur.com/QkIa5tT.jpeg', 'https://i.imgur.com/jb5Yu0h.jpeg'],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 2,
    title: 'Classic Red Pullover Hoodie',
    slug: 'classic-red-pullover-hoodie',
    price: 10,
    description: 'Elevate your casual wardrobe with our Classic Red Pullover Hoodie.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: ['https://i.imgur.com/1twoaDy.jpeg', 'https://i.imgur.com/FDwQgLy.jpeg'],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 3,
    title: 'Classic Heather Gray Hoodie',
    slug: 'classic-heather-gray-hoodie',
    price: 69,
    description: 'Stay cozy and stylish with our Classic Heather Gray Hoodie.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: ['https://i.imgur.com/cHddUCu.jpeg', 'https://i.imgur.com/CFOjAgK.jpeg'],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 5,
    title: 'Classic Black Hooded Sweatshirt',
    slug: 'classic-black-hooded-sweatshirt',
    price: 79,
    description: 'Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: ['https://i.imgur.com/cSytoSD.jpeg', 'https://i.imgur.com/WwKucXb.jpeg'],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 6,
    title: 'Classic Comfort Fit Joggers',
    slug: 'classic-comfort-fit-joggers',
    price: 25,
    description: 'Discover the perfect blend of style and comfort.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: ['https://i.imgur.com/ZKGofuB.jpeg', 'https://i.imgur.com/GJi73H0.jpeg'],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
];

function Search() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getSearchStyles(theme, insets);
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  } = useSearch();

  const [inputValue, setInputValue] = useState(searchQuery);

  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        setSearchQuery(query);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const normalizedQuery = query.toLowerCase();
        const results = mockProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(normalizedQuery) ||
            product.description.toLowerCase().includes(normalizedQuery) ||
            product.category.name.toLowerCase().includes(normalizedQuery)
        );

        setSearchResults(results);

        if (query.trim()) {
          addToHistory(query);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory, setIsLoading, setSearchQuery, setSearchResults]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        performSearch(inputValue);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, performSearch, setSearchResults]);

  const handleClearSearch = () => {
    setInputValue('');
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSelectHistory = (query: string) => {
    setInputValue(query);
  };

  const renderSearchInput = () => (
    <View style={styles.searchContainer}>
      <Input
        placeholder="Buscar produtos..."
        value={inputValue}
        onChangeText={setInputValue}
        leftIcon={<Icon name="search" size={20} color={theme.colors.text.secondary} />}
        rightIcon={
          inputValue ? (
            <TouchableOpacity onPress={handleClearSearch} activeOpacity={0.7}>
              <Icon name="close" size={20} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          ) : undefined
        }
        autoFocus={false}
        returnKeyType="search"
        onSubmitEditing={() => {
          if (inputValue.trim()) {
            performSearch(inputValue);
          }
        }}
        containerStyle={{ backgroundColor: '#FFFFFF' }}
        inputStyle={{ backgroundColor: '#FFFFFF' }}
      />
    </View>
  );

  const renderHistory = () => {
    if (searchHistory.length === 0) return null;

    return (
      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Buscas recentes</Text>
          <TouchableOpacity
            style={styles.clearHistoryButton}
            onPress={clearHistory}
            activeOpacity={0.7}
          >
            <Text style={styles.clearHistoryText}>Limpar tudo</Text>
          </TouchableOpacity>
        </View>

        {searchHistory.map((item, index) => (
          <TouchableOpacity
            key={`${item.query}-${index}`}
            style={styles.historyItem}
            onPress={() => handleSelectHistory(item.query)}
            activeOpacity={0.7}
          >
            <View style={styles.historyItemLeft}>
              <Icon name="history" size={20} color={theme.colors.text.secondary} />
              <Text style={styles.historyItemText} numberOfLines={1}>
                {item.query}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.historyItemRemove}
              onPress={() => removeFromHistory(item.query)}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              activeOpacity={0.7}
            >
              <Icon name="close" size={18} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Icon name="search" size={64} color={theme.colors.text.disabled} />
      </View>
      <Text style={styles.emptyTitle}>
        {searchQuery ? 'Nenhum produto encontrado' : 'O que você está procurando?'}
      </Text>
      <Text style={styles.emptyDescription}>
        {searchQuery
          ? 'Tente buscar com outros termos ou explore nossas categorias.'
          : 'Digite no campo acima para buscar produtos, categorias ou marcas.'}
      </Text>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={{ marginTop: theme.spacing[3], color: theme.colors.text.secondary }}>
        Buscando produtos...
      </Text>
    </View>
  );

  const renderResults = () => {
    if (isLoading) {
      return renderLoading();
    }

    if (searchQuery && searchResults.length === 0) {
      return renderEmpty();
    }

    if (searchResults.length === 0) {
      return null;
    }

    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {searchResults.length}{' '}
            {searchResults.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </Text>
          {searchQuery && (
            <Text style={styles.resultsQuery}>Buscando por &quot;{searchQuery}&quot;</Text>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        >
          {searchResults.map((product) => (
            <ProductShelf key={product.id} product={product} variant="compact" />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderContent = () => {
    if (!searchQuery && searchResults.length === 0) {
      return (
        <ScrollView>
          {renderHistory()}
          {searchHistory.length === 0 && renderEmpty()}
        </ScrollView>
      );
    }

    return renderResults();
  };

  return (
    <Layout>
      <View style={styles.container}>
        {renderSearchInput()}
        {renderContent()}
      </View>
    </Layout>
  );
}

export default Search;
