import { CreateUserRequest, User } from '@typings/user';

/**
 * Filtros de busca disponíveis
 */
export interface UserContextData {
  /**
   * Usuário logado
   */
  user: User | null;

  /**
   * Token de autenticação
   */
  token: string | null;

  /**
   * Indica se o usuário está logado
   */
  isLoggedIn: boolean;

  /**
   * Indica se está carregando
   */
  isLoading: boolean;

  /**
   * Realiza o login
   */
  login: (email: string, password: string) => Promise<{ access_token: string; user: User }>;

  /**
   * Realiza o logout
   */
  logout: () => Promise<void>;

  /**
   * Obtém o usuário logado
   */
  getUser: () => Promise<null | undefined>;

  /**
   * Cria um novo usuário
   */
  createUser: (user: CreateUserRequest) => Promise<User>;
}
