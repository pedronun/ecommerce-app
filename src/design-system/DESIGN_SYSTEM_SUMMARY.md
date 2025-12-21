# Design System - E-commerce App

**Versão:** 2.0 - Refatorado e Otimizado  
**Status:** ✅ ESLint Compliant | Separação Types/Styles

Sistema de design completo para o aplicativo de e-commerce, construído com React Native e TypeScript, seguindo as melhores práticas de organização de código.

## 🎯 Arquitetura de Componentes

### Estrutura Padrão (Refatorado)

Cada componente segue o padrão **[COMPONENT].[FILE].ts**:

```
ComponentName/
├── ComponentName.tsx        # Lógica e JSX do componente
├── ComponentName.types.ts   # Tipos, interfaces e Props
├── ComponentName.styles.ts  # Estilos e funções auxiliares
└── index.ts                 # Exportação
```

**Benefícios:**

- ✅ Separação clara de responsabilidades
- ✅ Fácil manutenção e localização de código
- ✅ Reutilização de tipos e estilos
- ✅ Type safety com TypeScript
- ✅ Performance otimizada
- ✅ 100% compatível com ESLint

## 📋 Índice

- [Estrutura](#estrutura)
- [Tokens](#tokens)
- [Tema](#tema)
- [Componentes](#componentes)
- [Uso](#uso)
- [Qualidade de Código](#qualidade-de-código)

## 🏗️ Estrutura

```
design-system/
├── tokens/              # Tokens de design (cores, tipografia, espaçamento, etc.)
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radius.ts
│   ├── shadows.ts
│   └── index.ts
├── theme/               # Sistema de temas (light/dark)
│   ├── theme.ts
│   ├── ThemeContext.tsx
│   └── index.ts
├── components/          # Componentes reutilizáveis
│   ├── Button/
│   ├── Text/
│   ├── Input/
│   ├── Card/
│   ├── Badge/
│   ├── Divider/
│   ├── Avatar/
│   ├── Chip/
│   ├── Icon/           # Novo: Ícones vetoriais
│   ├── Skeleton/       # Novo: Loading states animados
│   ├── BottomSheet/    # Novo: Modal deslizante
│   ├── Toast/          # Novo: Notificações
│   └── index.ts
└── index.ts             # Ponto de entrada principal
```

## 🎨 Tokens

### Cores

Sistema de cores completo incluindo:

- **Primárias**: Tons de azul (50-900)
- **Secundárias**: Tons de rosa (50-900)
- **Status**: Success, Error, Warning, Info
- **Neutras**: Escala de cinza completa
- **Commerce**: Cores específicas para e-commerce (desconto, promoção, avaliação, etc.)

### Tipografia

- Tamanhos de fonte: xs (12px) até 6xl (60px)
- Pesos: light, regular, medium, semibold, bold, extrabold
- Variantes: h1-h6, subtitle1-2, body1-2, button, caption, overline

### Espaçamento

Sistema de espaçamento baseado em múltiplos de 4px:

- 0 = 0px
- 1 = 4px
- 2 = 8px
- ... até 32 = 128px

### Border Radius

- none, xs (4px), sm (8px), md (12px), lg (16px), xl (20px), 2xl (24px), full (9999px)

### Sombras

Sistema de sombras com 6 níveis (none, xs, sm, md, lg, xl) otimizado para iOS e Android.

## 🌓 Tema

### Uso do ThemeProvider

```tsx
import { ThemeProvider } from './design-system';

function App() {
  return <ThemeProvider initialMode="light">{/* Seu app aqui */}</ThemeProvider>;
}
```

### Hook useTheme

```tsx
import { useTheme } from './design-system';

function MyComponent() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Button onPress={toggleTheme}>Alternar para {mode === 'light' ? 'escuro' : 'claro'}</Button>
    </View>
  );
}
```

## 🧩 Componentes

### Button

Botão versátil com múltiplas variantes e tamanhos.

```tsx
<Button variant="primary" size="md" onPress={() => {}}>
  Comprar Agora
</Button>

<Button variant="outline" fullWidth loading>
  Carregando...
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode

### Text

Componente de texto com variantes tipográficas.

```tsx
<Text variant="h1">Título Principal</Text>
<Text variant="body1" color="secondary">
  Texto do corpo
</Text>
```

**Props:**

- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'
- `color`: 'primary' | 'secondary' | 'disabled' | 'hint' | 'error' | 'success'
- `align`: 'left' | 'center' | 'right' | 'justify'

### Input

Campo de entrada com suporte a ícones e validação.

```tsx
<Input
  label="Email"
  placeholder="Digite seu email"
  error="Email inválido"
  leftIcon={<EmailIcon />}
/>
```

**Props:**

- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`, `rightIcon`: React.ReactNode
- `fullWidth`: boolean

### Card

Container com sombra e bordas arredondadas.

```tsx
<Card variant="elevated">
  <Text variant="h3">Produto</Text>
  <Text variant="body2">Descrição do produto</Text>
</Card>
```

**Props:**

- `variant`: 'elevated' | 'outlined' | 'filled'

### Badge

Indicador visual para notificações e status.

```tsx
<Badge variant="error" size="sm">3</Badge>
<Badge variant="success" dot />
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean

### Divider

Linha divisória horizontal ou vertical.

```tsx
<Divider />
<Divider orientation="vertical" size={2} />
```

**Props:**

- `orientation`: 'horizontal' | 'vertical'
- `size`: number

### Avatar

Exibe imagem de perfil ou iniciais.

```tsx
<Avatar source={{ uri: 'https://...' }} size="lg" />
<Avatar name="João Silva" size="md" />
```

**Props:**

- `source`: ImageSourcePropType
- `name`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `backgroundColor`: string

### Chip

Tag ou filtro compacto.

```tsx
<Chip label="Promoção" variant="filled" selected />
<Chip
  label="Filtro"
  variant="outlined"
  onPress={() => {}}
  onDelete={() => {}}
/>
```

**Props:**

- `label`: string
- `variant`: 'filled' | 'outlined'
- `size`: 'sm' | 'md'
- `selected`: boolean
- `onPress`: () => void
- `onDelete`: () => void
- `leftIcon`: React.ReactNode

### Icon

Componente de ícones vetoriais com suporte a múltiplas famílias de ícones do @expo/vector-icons.

```tsx
// Ícone básico (MaterialIcons por padrão)
<Icon name="home" />

// Ícone com família customizada
<Icon family="MaterialCommunityIcons" name="cart" size={32} color="blue" />

// Ícone pressionável
<Icon name="settings" onPress={() => console.log('Clicado')} />

// Ícone com estilos customizados
<Icon
  family="FontAwesome5"
  name="star"
  size={20}
  color={theme.colors.rating}
/>

// Ícone desabilitado
<Icon name="lock" disabled />
```

**Props:**

- `family`: Família de ícones (padrão: 'MaterialIcons')
  - Famílias disponíveis: 'MaterialIcons', 'MaterialCommunityIcons', 'FontAwesome', 'FontAwesome5', 'Ionicons', 'Feather', 'AntDesign', 'Entypo', 'EvilIcons', 'Fontisto', 'Foundation', 'SimpleLineIcons', 'Octicons', 'Zocial'
- `name`: string (nome do ícone)
- `size`: number (padrão: 24)
- `color`: string (padrão: theme.colors.text.primary)
- `onPress`: () => void
- `disabled`: boolean
- `style`: ViewStyle

**Características:**

- Suporte a todas as famílias de ícones do @expo/vector-icons
- Integração com o sistema de temas
- Ícones pressionáveis opcionais
- TypeScript com autocompletar para nomes de ícones
- Fallback automático em caso de ícone não encontrado

**Tipos auxiliares para autocompletar:**

```tsx
import type {
  MaterialIconName,
  MaterialCommunityIconName,
  FontAwesomeIconName,
  FontAwesome5IconName,
  IonIconName,
  FeatherIconName,
  AntDesignIconName,
} from './design-system';
```

### Skeleton

Placeholder animado para estados de carregamento.

```tsx
// Skeleton básico
<Skeleton width="100%" height={20} variant="rounded" />

// Skeleton de texto
<SkeletonText width="80%" />

// Skeleton circular
<SkeletonCircle width={40} />

// Skeleton Card pré-configurado
<SkeletonCard />

// Skeleton List
<SkeletonList count={3} />
```

**Props:**

- `variant`: 'text' | 'circular' | 'rectangular' | 'rounded'
- `width`: number | string
- `height`: number | string
- `animation`: boolean (padrão: true)

**Características:**

- Animação suave de shimmer usando react-native-reanimated
- Componentes auxiliares pré-configurados
- Totalmente customizável

### BottomSheet

Modal deslizante que aparece na parte inferior da tela com gestos.

```tsx
const [visible, setVisible] = useState(false);

<BottomSheet
  visible={visible}
  onClose={() => setVisible(false)}
  snapPoints={[0.5, 0.9]}
  showHandle={true}
  closeOnBackdrop={true}
>
  <Text>Conteúdo do Bottom Sheet</Text>
</BottomSheet>;
```

**Props:**

- `visible`: boolean
- `onClose`: () => void
- `snapPoints`: number[] (porcentagem da altura da tela)
- `showHandle`: boolean
- `closeOnBackdrop`: boolean
- `height`: number | string

**Características:**

- Suporte a gestos (arrastar para cima/baixo)
- Múltiplos pontos de snap
- Animações suaves com react-native-reanimated
- Backdrop com opacidade animada
- Fecha ao arrastar para baixo ou clicar no backdrop

### Toast

Sistema de notificações temporárias com animações.

```tsx
// Setup: Envolver app com ToastProvider
<ToastProvider>
  <App />
</ToastProvider>;

// Uso: Hook useToast
const toast = useToast();

// Mostrar toast simples
toast.show({
  message: 'Operação realizada com sucesso!',
  type: 'success',
  duration: 3000,
  position: 'top',
});

// Toast com ação
toast.show({
  message: 'Item adicionado ao carrinho',
  type: 'success',
  duration: 5000,
  position: 'bottom',
  action: {
    label: 'VER',
    onPress: () => console.log('Ver carrinho'),
  },
});

// Fechar manualmente
toast.hide();
```

**ToastOptions:**

- `message`: string
- `type`: 'success' | 'error' | 'warning' | 'info'
- `duration`: number (milissegundos, 0 para persistente)
- `position`: 'top' | 'bottom'
- `action`: { label: string, onPress: () => void }

**Características:**

- Suporte a gestos (arrastar para os lados para fechar)
- 4 tipos visuais (success, error, warning, info)
- Animações de entrada/saída suaves
- Ação opcional com callback
- Auto-dismiss configurável
- Posicionamento top/bottom

## 📚 Uso

### Importação

```tsx
// Importar tudo
import {
  ThemeProvider,
  useTheme,
  Button,
  Text,
  Input,
  Card,
  Icon,
  Skeleton,
  BottomSheet,
  ToastProvider,
  useToast,
  colors,
  spacing,
} from './design-system';

// Ou importações específicas
import { Button } from './design-system/components/Button';
import { Icon } from './design-system/components/Icon';
import { colors } from './design-system/tokens/colors';

// IMPORTANTE: Para componentes animados, envolver app com:
import { GestureHandlerRootView } from 'react-native-gesture-handler';

<GestureHandlerRootView style={{ flex: 1 }}>
  <ThemeProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ThemeProvider>
</GestureHandlerRootView>;
```

### Exemplo Completo

```tsx
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ThemeProvider,
  useTheme,
  Button,
  Text,
  Card,
  Input,
  Badge,
  Avatar,
  Icon,
  Skeleton,
  SkeletonText,
  BottomSheet,
  ToastProvider,
  useToast,
} from './design-system';

function ProductScreen() {
  const { theme } = useTheme();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Simular carregamento
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const handleAddToCart = () => {
    toast.show({
      message: 'Produto adicionado ao carrinho!',
      type: 'success',
      duration: 3000,
      position: 'bottom',
    });
  };

  if (loading) {
    return (
      <ScrollView style={{ backgroundColor: theme.colors.background, padding: 16 }}>
        <SkeletonText width="60%" style={{ marginBottom: 8 }} />
        <SkeletonText width="40%" height={12} style={{ marginBottom: 24 }} />
        <Skeleton variant="rounded" height={200} style={{ marginBottom: 16 }} />
        <SkeletonText width="100%" />
        <SkeletonText width="80%" />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <Card variant="elevated">
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar name="Loja XYZ" size="lg" />
          <View style={{ marginLeft: theme.spacing[3] }}>
            <Text variant="h4">Nome do Produto</Text>
            <Text variant="body2" color="secondary">
              R$ 99,90
            </Text>
          </View>
          <Badge variant="error">-20%</Badge>
        </View>

        <Text variant="body1" style={{ marginVertical: theme.spacing[4] }}>
          Descrição detalhada do produto aqui...
        </Text>

        <Input
          label="Quantidade"
          placeholder="1"
          keyboardType="numeric"
          leftIcon={<Icon name="shopping-cart" size={20} />}
        />

        <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
          <Button
            variant="outline"
            style={{ flex: 1 }}
            onPress={() => setShowFilters(true)}
            leftIcon={<Icon name="filter-list" size={18} />}
          >
            Filtros
          </Button>
          <Button
            variant="primary"
            style={{ flex: 2 }}
            onPress={handleAddToCart}
            leftIcon={<Icon name="add-shopping-cart" size={18} />}
          >
            Adicionar ao Carrinho
          </Button>
        </View>
      </Card>

      <BottomSheet visible={showFilters} onClose={() => setShowFilters(false)} snapPoints={[0.6]}>
        <Text variant="h5" style={{ marginBottom: theme.spacing[3] }}>
          Filtros
        </Text>
        <Input label="Tamanho" placeholder="Selecione o tamanho" fullWidth />
      </BottomSheet>
    </ScrollView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ToastProvider>
          <ProductScreen />
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
```

## 🎯 Benefícios

- **Consistência**: Design unificado em todo o aplicativo
- **Produtividade**: Componentes prontos para uso
- **Manutenibilidade**: Fácil de atualizar e estender
- **Acessibilidade**: Componentes com boas práticas
- **Tema**: Suporte a temas light/dark
- **TypeScript**: Totalmente tipado para melhor DX
- **E-commerce**: Otimizado para aplicações de comércio eletrônico
- **Animações Performáticas**: Usando react-native-reanimated (60 FPS)
- **Gestos Nativos**: Suporte completo a gestos com react-native-gesture-handler

## 📦 Dependências

O design system utiliza as seguintes bibliotecas:

- `react-native-reanimated`: Animações performáticas (60 FPS)
- `react-native-gesture-handler`: Gestos nativos
- `@expo/vector-icons`: Biblioteca de ícones vetoriais (inclui MaterialIcons, FontAwesome, Ionicons, etc.)

### Configuração

1. **Instalar dependências:**

```bash
# As bibliotecas já estão incluídas com o Expo
yarn add react-native-reanimated react-native-gesture-handler @expo/vector-icons
```

2. **Configurar babel.config.js:**

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-reanimated/plugin', // Deve ser o último plugin
  ],
};
```

3. **Envolver app com providers:**

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, ToastProvider } from './design-system';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ToastProvider>{/* Seu app aqui */}</ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
```

## 🚀 Próximos Passos

Para expandir o design system, considere adicionar:

1. **Componentes Adicionais**:
   - ProductCard
   - SearchBar
   - Rating
   - Stepper
   - Modal
   - Tabs
   - Accordion
   - Carousel
   - ProgressBar

2. **Funcionalidades**:
   - Mais animações complexas
   - Transições de tela
   - Haptic feedback
   - Acessibilidade aprimorada
   - Responsividade avançada

3. **Documentação**:
   - Storybook para visualização de componentes
   - Testes unitários
   - Guia de contribuição
