import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import type { Product } from '@typings/product';
import { getSearch as getSearchService } from '@services/search';

import type { SearchContextData, SearchFilters, SearchHistoryItem } from './SearchContext.types';

const SEARCH_HISTORY_KEY = '@ecommerce:search-history';
const MAX_HISTORY_ITEMS = 10;

export const SearchContext = createContext<SearchContextData | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const loadHistory = useCallback(async () => {
    try {
      const storedHistory = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);

      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory) as SearchHistoryItem[];
        setSearchHistory(parsedHistory);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico de busca:', error);
    }
  }, []);

  const saveHistory = useCallback(async (history: SearchHistoryItem[]) => {
    try {
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Erro ao salvar histórico de busca:', error);
    }
  }, []);

  const addToHistory = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      try {
        const normalizedQuery = query.trim().toLowerCase();

        setSearchHistory((prevHistory) => {
          const filteredHistory = prevHistory.filter(
            (item) => item.query.toLowerCase() !== normalizedQuery
          );

          const newHistory = [
            {
              query: query.trim(),
              timestamp: Date.now(),
            },
            ...filteredHistory,
          ].slice(0, MAX_HISTORY_ITEMS);

          saveHistory(newHistory);
          return newHistory;
        });
      } catch (error) {
        console.error('Erro ao adicionar ao histórico:', error);
      }
    },
    [saveHistory]
  );

  const removeFromHistory = useCallback(
    async (query: string) => {
      try {
        setSearchHistory((prevHistory) => {
          const newHistory = prevHistory.filter((item) => item.query !== query);
          saveHistory(newHistory);
          return newHistory;
        });
      } catch (error) {
        console.error('Erro ao remover do histórico:', error);
      }
    },
    [saveHistory]
  );

  const clearHistory = useCallback(async () => {
    try {
      setSearchHistory([]);
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    clearFilters();
  }, [clearFilters]);

  const performSearch = useCallback(
    async (query: string) => {
      try {
        setIsLoading(true);
        setSearchQuery(query);
        const results = await getSearchService(query);
        setSearchResults(results);
        addToHistory(query);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory]
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        filters,
        setFilters,
        clearFilters,
        isLoading,
        setIsLoading,
        searchHistory,
        addToHistory,
        removeFromHistory,
        clearHistory,
        clearSearch,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
