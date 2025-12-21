# Theme System

Sistema de temas com persistência automática para a aplicação.

## 📦 Instalação

O sistema de temas requer o AsyncStorage para persistir a preferência do usuário:

```bash
yarn add @react-native-async-storage/async-storage
```

## 🚀 Uso Básico

### 1. Configure o ThemeProvider no App

```tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/design-system';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider initialMode="light">{/* Seu app aqui */}</ThemeProvider>
    </GestureHandlerRootView>
  );
}
```

### 2. Use o Hook useTheme nos Componentes

```tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme, Button, Text } from './src/design-system';

function SettingsScreen() {
  const { theme, mode, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing[4],
      }}
    >
      <Text variant="h2" style={{ marginBottom: theme.spacing[4] }}>
        Configurações
      </Text>

      <Text variant="body1" style={{ marginBottom: theme.spacing[2] }}>
        Tema atual: {mode === 'light' ? 'Claro' : 'Escuro'}
      </Text>

      <Button variant="primary" onPress={toggleTheme} leftIcon="🌓">
        Alternar Tema
      </Button>
    </View>
  );
}
```

## 🔧 API

### ThemeProvider Props

| Prop          | Tipo                | Padrão    | Descrição                                            |
| ------------- | ------------------- | --------- | ---------------------------------------------------- |
| `children`    | `ReactNode`         | -         | Componentes filhos                                   |
| `initialMode` | `'light' \| 'dark'` | `'light'` | Tema inicial (usado apenas se não houver tema salvo) |

### useTheme Hook

Retorna um objeto com as seguintes propriedades:

```typescript
{
  theme: Theme;           // Objeto com todas as configurações de tema
  mode: 'light' | 'dark'; // Modo de tema atual
  toggleTheme: () => void; // Função para alternar o tema
  isLoading: boolean;     // Indica se está carregando o tema salvo
}
```

### Theme Object

O objeto `theme` contém:

- **colors**: Todas as cores do design system
  - `primary`, `secondary`, `success`, `error`, `warning`, `info`
  - `background`, `surface`, `text`, `border`
  - E muitas outras...

- **spacing**: Sistema de espaçamento (0-32)
  - Baseado em múltiplos de 4px
  - Exemplo: `theme.spacing[4]` = 16px

- **typography**: Configurações de tipografia
  - `fontSizes`, `fontWeights`, `lineHeights`

- **borderRadius**: Valores de border radius
  - `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`

- **shadows**: Sistema de sombras (none, xs, sm, md, lg, xl)

## 💡 Exemplos

### Exemplo 1: Botão de Toggle de Tema

```tsx
function ThemeToggleButton() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" onPress={toggleTheme} leftIcon={mode === 'light' ? '🌙' : '☀️'}>
      {mode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
    </Button>
  );
}
```

### Exemplo 2: Componente com Estilo Baseado no Tema

```tsx
function ThemedCard({ title, description }) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        padding: theme.spacing[4],
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.sm,
      }}
    >
      <Text
        variant="h3"
        style={{
          color: theme.colors.text.primary,
          marginBottom: theme.spacing[2],
        }}
      >
        {title}
      </Text>
      <Text variant="body2" style={{ color: theme.colors.text.secondary }}>
        {description}
      </Text>
    </View>
  );
}
```

### Exemplo 3: Tela com Loading State

```tsx
function HomeScreen() {
  const { theme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <Text style={{ marginTop: theme.spacing[2] }}>Carregando tema...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Seu conteúdo aqui */}
    </View>
  );
}
```

## 🔄 Persistência

A persistência do tema é gerenciada automaticamente:

1. **Ao alternar o tema**: A preferência é salva no AsyncStorage com a chave `@theme_mode`
2. **Ao iniciar o app**: O tema salvo é carregado automaticamente
3. **Fallback**: Se não houver tema salvo, usa o `initialMode` do ThemeProvider

### Limpando o Tema Salvo (Debugging)

Se precisar resetar o tema durante o desenvolvimento:

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Em algum componente ou console de debug
await AsyncStorage.removeItem('@theme_mode');
```

## 🎨 Customização

Para adicionar novos temas ou modificar os existentes, edite o arquivo `theme.ts`:

```typescript
// src/design-system/theme/theme.ts

export const lightTheme: Theme = {
  colors: {
    // Customize suas cores aqui
  },
  // ...
};

export const darkTheme: Theme = {
  colors: {
    // Customize suas cores aqui
  },
  // ...
};
```

## ⚠️ Notas Importantes

1. **Sempre use o hook dentro do ThemeProvider**: O hook `useTheme()` só funciona dentro de componentes que estão envolvidos pelo `ThemeProvider`.

2. **Estado de Loading**: Use a propriedade `isLoading` para evitar flash de conteúdo com tema errado durante o carregamento inicial.

3. **Performance**: O tema é carregado uma única vez na inicialização. Mudanças de tema são instantâneas após o carregamento inicial.

4. **Compatibilidade**: Funciona tanto com Expo quanto com React Native CLI, desde que o AsyncStorage esteja instalado.
