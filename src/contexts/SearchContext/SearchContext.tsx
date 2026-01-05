import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import type { Product } from '@typings/product';

import type { SearchContextData, SearchFilters, SearchHistoryItem } from './SearchContext.types';

/**
 * Chave para armazenar o histórico de busca no AsyncStorage
 */
const SEARCH_HISTORY_KEY = '@ecommerce:search-history';

/**
 * Número máximo de itens no histórico
 */
const MAX_HISTORY_ITEMS = 10;

/**
 * Contexto de busca
 */
export const SearchContext = createContext<SearchContextData>({} as SearchContextData);

/**
 * Provider do contexto de busca
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  /**
   * Carrega o histórico de busca do AsyncStorage
   */
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

  /**
   * Salva o histórico de busca no AsyncStorage
   */
  const saveHistory = useCallback(async (history: SearchHistoryItem[]) => {
    try {
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Erro ao salvar histórico de busca:', error);
    }
  }, []);

  /**
   * Adiciona um termo ao histórico de busca
   */
  const addToHistory = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      try {
        const normalizedQuery = query.trim().toLowerCase();

        setSearchHistory((prevHistory) => {
          // Remove o termo se já existir
          const filteredHistory = prevHistory.filter(
            (item) => item.query.toLowerCase() !== normalizedQuery
          );

          // Adiciona o novo termo no início
          const newHistory = [
            {
              query: query.trim(),
              timestamp: Date.now(),
            },
            ...filteredHistory,
          ].slice(0, MAX_HISTORY_ITEMS); // Limita o tamanho do histórico

          saveHistory(newHistory);
          return newHistory;
        });
      } catch (error) {
        console.error('Erro ao adicionar ao histórico:', error);
      }
    },
    [saveHistory]
  );

  /**
   * Remove um termo do histórico
   */
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

  /**
   * Limpa todo o histórico de busca
   */
  const clearHistory = useCallback(async () => {
    try {
      setSearchHistory([]);
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  }, []);

  /**
   * Limpa os filtros de busca
   */
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  /**
   * Limpa a busca atual
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    clearFilters();
  }, [clearFilters]);

  /**
   * Carrega o histórico ao montar o componente
   */
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
