export interface SplashScreenProps {
  /**
   * Callback executado quando a animação termina
   */
  onAnimationEnd?: () => void;

  /**
   * Cor de fundo da splash screen
   * @default '#0066FF'
   */
  backgroundColor?: string;

  /**
   * Cor do ícone/logo
   * @default '#FFFFFF'
   */
  iconColor?: string;

  /**
   * Mostrar o logo
   * @default true
   */
  showLogo?: boolean;

  /**
   * Duração mínima de exibição (ms)
   * @default 3000
   */
  minDuration?: number;
}
