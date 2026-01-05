import type { Product } from '@typings/product';

/**
 * Filtros de busca disponíveis
 */
export interface SearchFilters {
  /**
   * Categoria selecionada (ID)
   */
  categoryId?: number;

  /**
   * Faixa de preço mínima
   */
  minPrice?: number;

  /**
   * Faixa de preço máxima
   */
  maxPrice?: number;

  /**
   * Ordenação dos resultados
   */
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';
}

/**
 * Histórico de buscas
 */
export interface SearchHistoryItem {
  /**
   * Termo buscado
   */
  query: string;

  /**
   * Timestamp da busca
   */
  timestamp: number;
}

/**
 * Dados do contexto de busca
 */
export interface SearchContextData {
  /**
   * Termo de busca atual
   */
  searchQuery: string;

  /**
   * Define o termo de busca
   */
  setSearchQuery: (query: string) => void;

  /**
   * Produtos encontrados na busca
   */
  searchResults: Product[];

  /**
   * Define os resultados da busca
   */
  setSearchResults: (products: Product[]) => void;

  /**
   * Filtros ativos
   */
  filters: SearchFilters;

  /**
   * Atualiza os filtros
   */
  setFilters: (filters: SearchFilters) => void;

  /**
   * Limpa os filtros
   */
  clearFilters: () => void;

  /**
   * Indica se está carregando resultados
   */
  isLoading: boolean;

  /**
   * Define o estado de loading
   */
  setIsLoading: (loading: boolean) => void;

  /**
   * Histórico de buscas
   */
  searchHistory: SearchHistoryItem[];

  /**
   * Adiciona um termo ao histórico
   */
  addToHistory: (query: string) => void;

  /**
   * Remove um termo do histórico
   */
  removeFromHistory: (query: string) => void;

  /**
   * Limpa todo o histórico
   */
  clearHistory: () => void;

  /**
   * Limpa a busca atual
   */
  clearSearch: () => void;
}
