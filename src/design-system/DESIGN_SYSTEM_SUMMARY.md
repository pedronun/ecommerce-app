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
│   ├── TabBar/         # Novo: Barra de navegação flutuante
│   ├── Carousel/       # Carrossel horizontal com autoplay e dots
│   ├── SplashScreen/   # Novo: Tela de carregamento inicial
│   ├── UpdateScreen/   # Novo: Tela de atualização de app
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

O ThemeProvider agora possui:

- **Persistência automática** usando AsyncStorage
- **SplashScreen animada integrada** exibida durante o carregamento
- **Restauração automática** do tema ao abrir o app

```tsx
import { ThemeProvider } from './design-system';

function App() {
  return (
    <ThemeProvider
      initialMode="light"
      showSplash={true}
      minSplashDuration={2000}
      splashConfig={{
        backgroundColor: '#0066FF',
        iconColor: '#FFFFFF',
      }}
    >
      {/* Seu app aqui */}
    </ThemeProvider>
  );
}
```

**Características:**

- **Persistência automática**: A escolha do tema é salva no AsyncStorage
- **Restauração ao iniciar**: O tema salvo é carregado automaticamente ao abrir o app
- **SplashScreen integrada**: Animação customizada exibida durante o carregamento
- **Estado de carregamento**: Propriedade `isLoading` para gerenciar o carregamento inicial
- **Animações avançadas**: Círculos expansivos, pulso e rotação com Reanimated

### Hook useTheme

```tsx
import { useTheme } from './design-system';

function MyComponent() {
  const { theme, mode, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Button onPress={toggleTheme}>Alternar para {mode === 'light' ? 'escuro' : 'claro'}</Button>
    </View>
  );
}
```

**Retorno do hook:**

- `theme`: Objeto com todas as configurações de tema (cores, espaçamentos, etc.)
- `mode`: Modo atual ('light' ou 'dark')
- `toggleTheme`: Função para alternar entre os temas (persiste automaticamente)
- `isLoading`: Boolean indicando se o tema está sendo carregado do storage

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

Sistema de notificações temporárias baseado em **event emitter** (singleton). Não requer Provider nem hook — basta montar `<Toast />` uma vez e chamar `toast.show()` de qualquer lugar do app.

**Setup — montar uma única vez no App.tsx:**

```tsx
import { Toast } from '@design-system/components';

function App() {
  return (
    <ThemeProvider>
      {/* resto dos providers */}
      <NavigationContainer>
        <StackRoutes />
        <Toast /> {/* posicionado absolutamente, não afeta o layout */}
      </NavigationContainer>
    </ThemeProvider>
  );
}
```

**Uso — singleton `toast` de qualquer arquivo:**

```tsx
import { toast } from '@design-system/components';
// ou importação direta:
import { toast } from '@design-system/components/Toast/Toast.types';

// Toast simples
toast.show({
  message: 'Produto adicionado ao carrinho!',
  type: 'success',
});

// Toast com título e duração customizada
toast.show({
  title: 'Sem conexão',
  message: 'Verifique sua rede e tente novamente.',
  type: 'warning',
  duration: 5000,
});

// Fechar manualmente
toast.hide();
```

**`ToastOptions`:**

| Prop       | Tipo                                          | Padrão   | Descrição                     |
| ---------- | --------------------------------------------- | -------- | ----------------------------- |
| `message`  | `string`                                      | —        | Texto principal (obrigatório) |
| `title`    | `string`                                      | `""`     | Título opcional acima da msg  |
| `type`     | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Define cor e ícone do toast   |
| `duration` | `number`                                      | `3500`   | Auto-dismiss em milissegundos |

**Características:**

- **Sem Provider**: padrão event emitter via `mitt` — `toast.show()` emite, `<Toast />` escuta e anima
- **4 tipos visuais**: success, error, warning, info — cores via `theme` (respeita light/dark)
- **Barra indicadora lateral**: variante `light` do token de cor para contraste
- **Animações com `useAnimatedStyle`**: slide + fade, 220ms, executados na UI thread
- **Toque para fechar**: o componente responde a `onPress` chamando `hide`
- **Auto-dismiss**: timer reiniciado a cada `show`, cancelado no `hide`
- **Intercalação suave**: se um toast estiver visível ao receber um novo, anima saída → troca de payload → anima entrada

**Arquitetura interna:**

```
toast.show()  ──►  toastEmitter.emit("show")
                         │
                   <Toast /> escuta via useEffect
                         │
                   setVisible(true) + runAnimation()
```

**⚠️ Regra de importação — sem ciclo:**

`Toast.tsx` importa `Icon` e `Text` **diretamente** (`'../Icon'`, `'../Text'`), nunca pelo barrel `@design-system/components`, evitando o ciclo:

```
Toast/index.ts → Toast.tsx → components/index.ts → Toast/index.ts
```

---

## 🪝 Hooks de Aplicativo

### useAppUpdate

Hook para verificar e gerenciar atualizações de versão do aplicativo nas lojas (App Store / Google Play).

```tsx
import { useAppUpdate } from '@hooks/useAppUpdate';

function MyScreen() {
  const { hasUpdate, isLoading, latestVersion, currentVersion, openStore, checkUpdate } =
    useAppUpdate();

  if (!isLoading && hasUpdate) {
    return (
      <TouchableOpacity onPress={openStore}>
        <Text>Versão {latestVersion} disponível — Atualizar</Text>
      </TouchableOpacity>
    );
  }
}
```

**Retorno:**

| Propriedade      | Tipo                  | Descrição                                          |
| ---------------- | --------------------- | -------------------------------------------------- |
| `hasUpdate`      | `boolean`             | `true` se a versão da loja é maior que a instalada |
| `isLoading`      | `boolean`             | `true` enquanto a checagem está em andamento       |
| `latestVersion`  | `string \| null`      | Versão mais recente disponível na loja             |
| `currentVersion` | `string`              | Versão atualmente instalada no dispositivo         |
| `openStore`      | `() => Promise<void>` | Abre a App Store (iOS) ou Play Store (Android)     |
| `checkUpdate`    | `() => Promise<void>` | Força uma nova checagem manualmente                |

**Características:**

- Compara versões com `semver.lt` para precisão semântica
- `currentVersion` memoizado com `useMemo` (não recalcula por render)
- `openStore` aguarda a Promise de `VersionCheck.getAppStoreUrl/getPlayStoreUrl` antes de chamar `Linking.openURL`
- Checagem automática ao montar o componente via `useEffect`

**Dependências:** `react-native-device-info`, `react-native-version-check`, `semver`

---

### TabBar

Barra de navegação flutuante com efeito de elevação, ideal para navegação principal do app.

```tsx
const [activeTab, setActiveTab] = useState('home');

const tabs = [
  { key: 'home', label: 'Início', icon: 'home' },
  { key: 'search', label: 'Buscar', icon: 'search' },
  { key: 'cart', label: 'Carrinho', icon: 'shopping-cart', badge: 3 },
  { key: 'profile', label: 'Perfil', icon: 'person' },
];

<TabBar items={tabs} activeKey={activeTab} onTabPress={(key) => setActiveTab(key)} />;

// TabBar sem labels
<TabBar items={tabs} activeKey={activeTab} onTabPress={setActiveTab} showLabels={false} />;

// TabBar com cores customizadas
<TabBar
  items={tabs}
  activeKey={activeTab}
  onTabPress={setActiveTab}
  activeColor="#FF5722"
  inactiveColor="#9E9E9E"
/>;

// TabBar com ícones de diferentes famílias
const tabsCustom = [
  { key: 'home', label: 'Início', icon: 'home', iconFamily: 'MaterialIcons' },
  { key: 'search', label: 'Buscar', icon: 'magnify', iconFamily: 'MaterialCommunityIcons' },
  { key: 'cart', label: 'Carrinho', icon: 'shopping-bag', iconFamily: 'Feather', badge: 5 },
  { key: 'profile', label: 'Perfil', icon: 'user', iconFamily: 'Feather' },
];
```

**Props:**

- `items`: TabBarItem[] - Array de itens da tab bar
  - `key`: string - Identificador único
  - `label`: string - Texto exibido
  - `icon`: string - Nome do ícone
  - `iconFamily`: string (opcional) - Família do ícone (MaterialIcons por padrão)
  - `badge`: number (opcional) - Número a exibir no badge
- `activeKey`: string - Key da tab ativa
- `onTabPress`: (key: string) => void - Callback ao pressionar uma tab
- `showLabels`: boolean (padrão: true) - Mostrar/ocultar labels
- `activeColor`: string (opcional) - Cor customizada para item ativo
- `inactiveColor`: string (opcional) - Cor customizada para item inativo
- `style`: ViewStyle (opcional) - Estilos adicionais

**Características:**

- **Efeito flutuante**: Posicionada com margem do fundo e laterais com sombra grande
- **Animações suaves**: Transições animadas ao mudar de tab usando Animated API
- **Badge support**: Exibe contadores com formatação automática (99+)
- **Integração com tema**: Usa cores, espaçamentos e sombras do design system
- **Ícones flexíveis**: Suporte a múltiplas famílias de ícones
- **Responsiva**: Tabs se ajustam automaticamente ao espaço disponível
- **Customizável**: Cores e estilos podem ser personalizados
- **Acessível**: Feedback visual claro para tab ativa

### Carousel

Carrossel horizontal com suporte a autoplay, indicadores (dots) e snap por slide. Ideal para banners na Home ou galerias.

```tsx
// Banners com imagens (ex.: bloco da API Home)
const bannerBlock = homeData?.blocks?.find((b) => b.images?.length);

<Carousel
  data={bannerBlock?.images ?? []}
  keyExtractor={(img) => img.documentId}
  renderItem={(img) => (
    <Image
      source={{ uri: img.url }}
      style={{ width: SCREEN_WIDTH, height: 180 }}
      resizeMode="cover"
    />
  )}
  autoplay={bannerBlock?.autoplay ?? true}
  autoplayInterval={(bannerBlock?.interval ?? 4) * 1000}
  showDots={true}
/>;

// Carrossel genérico com itens customizados
<Carousel
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={(item) => (
    <Card>
      <Text>{item.title}</Text>
    </Card>
  )}
  autoplay
  autoplayInterval={5000}
  showDots
/>;
```

**Props:**

- `data`: T[] - Lista de itens
- `renderItem`: (item: T, index: number) => ReactNode - Renderização de cada slide
- `keyExtractor`: (item: T, index: number) => string - Chave única por item
- `autoplay`: boolean (padrão: false) - Rotação automática
- `autoplayInterval`: number (padrão: 4000) - Intervalo em ms
- `showDots`: boolean (padrão: true) - Exibir indicadores de página
- `slideWidth`: number (padrão: largura da tela) - Largura de cada slide
- `gap`: number (padrão: 0) - Espaço entre slides
- `onSlideChange`: (index: number) => void - Callback ao mudar de slide
- `style`, `contentContainerStyle`: ViewStyle - Estilos opcionais

**Características:**

- Snap suave por slide (FlatList com snapToInterval)
- Dots integrados ao tema (primary / border)
- Autoplay com intervalo configurável
- Compatível com dados da API Home (blocks com images, autoplay, interval)

### SplashScreen

Tela de carregamento inicial com animações sofisticadas e feedback visual.

```tsx
// Uso básico
<SplashScreen onAnimationEnd={() => console.log('Animação finalizada')} />

// Com customização
<SplashScreen
  backgroundColor="#0066FF"
  iconColor="#FFFFFF"
  showLogo={true}
  minSplashDuration={3000}
  onAnimationEnd={() => setAppReady(true)}
/>
```

**Props:**

- `onAnimationEnd`: () => void - Callback executado quando a animação termina
- `backgroundColor`: string (padrão: '#0066FF') - Cor de fundo
- `iconColor`: string (padrão: '#FFFFFF') - Cor do ícone/logo
- `showLogo`: boolean (padrão: true) - Mostrar o logo
- `minSplashDuration`: number (padrão: 4000) - Duração mínima de exibição (ms)

**Características:**

- **Animações sofisticadas**: Círculos expansivos, pulso, rotação e fade
- **Barra de progresso animada**: Feedback visual do carregamento
- **Totalmente customizável**: Cores, duração e logo configuráveis
- **Performance otimizada**: Usa react-native-reanimated para 60 FPS
- **Integração com tema**: Funciona perfeitamente com ThemeProvider

### UpdateScreen

Tela de atualização de app com animações e feedback de progresso em tempo real. **Este componente é independente do ThemeProvider** para evitar conflitos de contexto durante atualizações OTA.

```tsx
// Uso básico
<UpdateScreen progress={0.5} status="UPDATING" />

// Com customização
<UpdateScreen
  progress={0.75}
  status="UPDATING"
  backgroundColor="#2196F3"
  iconColor="#FFFFFF"
  updatingText="Baixando atualização..."
  checkingText="Verificando novas versões..."
/>

// Integração com HotUpdater (não precisa de ThemeProvider!)
import { HotUpdater } from '@hot-updater/react-native';
import { UpdateScreen } from '@design-system/components/UpdateScreen';

export default HotUpdater.wrap({
  baseURL: "https://...",
  updateStrategy: "appVersion",
  updateMode: "auto",
  fallbackComponent: ({ progress, status }) => (
    <UpdateScreen progress={progress} status={status} />
  ),
})(App);
```

**Props:**

- `progress`: number (0 a 1) - Progresso da atualização (obrigatório)
- `status`: string - Status da atualização (obrigatório)
- `backgroundColor`: string (padrão: '#0066FF') - Cor de fundo
- `iconColor`: string (padrão: '#FFFFFF') - Cor do ícone e textos
- `updatingText`: string (padrão: 'Atualizando...') - Texto personalizado para status "UPDATING"
- `checkingText`: string (padrão: 'Verificando atualização...') - Texto personalizado para status "CHECKING"

**Características:**

- **Animações avançadas**: Círculos expansivos, pulso no ícone e barra de progresso animada
- **Feedback em tempo real**: Mostra percentual e progresso visual da atualização
- **Design consistente**: Segue o mesmo padrão visual da SplashScreen
- **Independente do tema**: Não usa ThemeProvider para evitar loops infinitos durante atualizações OTA
- **Performance otimizada**: Animações com react-native-reanimated (60 FPS)
- **Customizável**: Cores e textos totalmente personalizáveis
- **Ideal para OTA Updates**: Perfeitamente integrado com soluções como HotUpdater

**Estados:**

- **CHECKING**: Verificando se há atualizações disponíveis (sem progresso)
- **UPDATING**: Baixando e instalando atualização (com barra de progresso e %)

**⚠️ Nota Importante:**

Este componente **não utiliza o ThemeProvider** internamente. Isso é intencional para evitar conflitos quando usado como `fallbackComponent` em wrappers de atualização OTA, onde ter múltiplos ThemeProviders aninhados pode causar loops infinitos na SplashScreen.

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
  Toast,
  toast,
  TabBar,
  colors,
  spacing,
} from './design-system';

// Ou importações específicas
import { Button } from './design-system/components/Button';
import { Icon } from './design-system/components/Icon';
import { TabBar } from './design-system/components/TabBar';
import { colors } from './design-system/tokens/colors';

// IMPORTANTE: Para componentes animados, envolver app com:
import { GestureHandlerRootView } from 'react-native-gesture-handler';

<GestureHandlerRootView style={{ flex: 1 }}>
  <ThemeProvider>
    <App />
    <Toast /> {/* montar uma vez, fora da árvore de rotas se preferir */}
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
  Toast,
  toast,
  TabBar,
  SplashScreen,
  UpdateScreen,
} from './design-system';

function ProductScreen() {
  const { theme } = useTheme();
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
        <ProductScreen />
        <Toast />
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

3. **Configurar providers e montar o Toast:**

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, Toast } from './design-system';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        {/* Seu app aqui */}
        <Toast />
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

---

**Changelog:**

- **v2.4** (2026-04-24): Toast migrado para padrão event emitter puro — removidos `ToastProvider`/`useToast`, componente `<Toast />` agora é standalone e controlado pelo singleton `toast.show/hide()`; `getToastColors` refatorado para função `(type, theme)`; ciclo de dependência corrigido; `useAnimatedStyle` aplicado corretamente; Hook `useAppUpdate` adicionado; seção de atualização na tela Profile com animação `Animated.timing`
- **v2.3** (2026-02-10): Adicionado componente Carousel para banners e galerias na Home
- **v2.2** (2026-01-22): Adicionado componente UpdateScreen para telas de atualização OTA
- **v2.1** (2024-12-24): Adicionado componente TabBar com efeito flutuante
