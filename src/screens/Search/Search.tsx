import { Layout } from '@components/Layout/Layout';
import { ProductShelf } from '@components/ProductShelf';
import { useSearch } from '@contexts/SearchContext/useSearch';
import { Icon, Input } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getSearchStyles } from './Search.styles';

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
    searchHistory,
    removeFromHistory,
    clearHistory,
    performSearch,
  } = useSearch();

  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        setSearchQuery(inputValue);
        performSearch(inputValue);
      } else {
        setSearchQuery('');
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, performSearch, setSearchResults, setSearchQuery]);

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
        containerStyle={{ backgroundColor: theme.colors.surface }}
        inputStyle={{ backgroundColor: theme.colors.surface }}
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
