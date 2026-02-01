export interface UpdateScreenProps {
  /**
   * Progresso da atualização (0 a 1)
   */
  progress: number;

  /**
   * Status da atualização
   */
  status: string;

  /**
   * Cor de fundo da tela
   * @default '#0066FF'
   */
  backgroundColor?: string;

  /**
   * Cor do ícone e textos
   * @default '#FFFFFF'
   */
  iconColor?: string;

  /**
   * Texto personalizado para o status "UPDATING"
   * @default 'Atualizando...'
   */
  updatingText?: string;

  /**
   * Texto personalizado para o status "CHECKING"
   * @default 'Verificando atualização...'
   */
  checkingText?: string;
}
