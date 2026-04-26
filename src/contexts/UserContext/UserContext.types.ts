import { CreateUserRequest, User } from '@typings/user';

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
   * Indica se o app está carregando a sessão salva (hidratação inicial)
   */
  isLoading: boolean;

  /**
   * Indica se um request de login ou cadastro está em andamento
   */
  isAuthPending: boolean;

  /**
   * Realiza o login
   */
  login: (email: string, password: string) => Promise<{ access_token: string; user: User }>;

  /**
   * Realiza o logout
   */
  logout: () => Promise<void>;

  /**
   * Obtém e atualiza os dados do usuário logado
   */
  getUser: () => Promise<void>;

  /**
   * Cria um novo usuário
   */
  createUser: (user: CreateUserRequest) => Promise<User>;
}
