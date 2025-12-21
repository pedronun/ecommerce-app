/**
 * Contexto de Tema
 * Gerencia o tema (light/dark) da aplicação com persistência usando AsyncStorage
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme } from './theme';
import { SplashScreen } from '../components/SplashScreen';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
  /**
   * Mostrar SplashScreen enquanto carrega o tema
   * @default true
   */
  showSplash?: boolean;
  /**
   * Duração mínima da SplashScreen em ms
   * @default 2000
   */
  minSplashDuration?: number;
  /**
   * Customização da SplashScreen
   */
  splashConfig?: {
    backgroundColor?: string;
    iconColor?: string;
  };
}

const THEME_STORAGE_KEY = '@theme_mode';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'light',
  showSplash = true,
  minSplashDuration = 2000,
  splashConfig,
}) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(showSplash);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  // Carrega o tema salvo ao iniciar o app
  useEffect(() => {
    const loadTheme = async () => {
      const startTime = Date.now();

      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setMode(savedTheme);
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
      } finally {
        // Garante duração mínima da splash screen
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minSplashDuration - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
          if (showSplash) {
            // Pequeno delay adicional para a animação de saída
            setTimeout(() => {
              setShowSplashScreen(false);
            }, 500);
          }
        }, remainingTime);
      }
    };

    loadTheme();
  }, [minSplashDuration, showSplash]);

  const toggleTheme = async () => {
    try {
      const newMode = mode === 'light' ? 'dark' : 'light';
      setMode(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  // Mostra SplashScreen enquanto carrega
  if (showSplash && showSplashScreen) {
    return (
      <SplashScreen
        backgroundColor={splashConfig?.backgroundColor || theme.colors.primary[500]}
        iconColor={splashConfig?.iconColor || '#FFFFFF'}
        onAnimationEnd={() => {
          if (!isLoading) {
            setShowSplashScreen(false);
          }
        }}
      />
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
