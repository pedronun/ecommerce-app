import { useContext } from 'react';

import { SearchContextData } from './SearchContext.types';
import { SearchContext } from './SearchContext';

export function useSearch(): SearchContextData {
  const context = useContext(SearchContext);

  if (context === null) {
    throw new Error('useSearch deve ser usado dentro de um SearchProvider');
  }

  return context;
}
