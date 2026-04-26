import { useContext } from 'react';

import { UserContextData } from './UserContext.types';
import { UserContext } from './UserContext';

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }

  return context;
}
