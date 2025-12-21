# Icon Component - Guia de Uso

Componente de ícones vetoriais integrado com `@expo/vector-icons`, parte do Design System.

## 📦 Instalação

O componente já está incluído no Design System. A biblioteca `@expo/vector-icons` vem automaticamente com o Expo.

## 🎯 Uso Básico

```tsx
import { Icon } from './src/design-system';

// Ícone simples (MaterialIcons por padrão)
<Icon name="home" />

// Ícone com tamanho e cor customizados
<Icon name="shopping-cart" size={32} color="#2196F3" />
```

## 🎨 Famílias de Ícones

O componente suporta todas as famílias de ícones do `@expo/vector-icons`:

### MaterialIcons (padrão)

```tsx
<Icon name="home" />
<Icon name="shopping-cart" />
<Icon name="settings" />
```

### MaterialCommunityIcons

```tsx
<Icon family="MaterialCommunityIcons" name="cart" />
<Icon family="MaterialCommunityIcons" name="account" />
<Icon family="MaterialCommunityIcons" name="heart-outline" />
```

### FontAwesome5

```tsx
<Icon family="FontAwesome5" name="star" />
<Icon family="FontAwesome5" name="user" />
<Icon family="FontAwesome5" name="credit-card" />
```

### Ionicons

```tsx
<Icon family="Ionicons" name="heart" />
<Icon family="Ionicons" name="cart-outline" />
<Icon family="Ionicons" name="person-circle" />
```

### Feather

```tsx
<Icon family="Feather" name="settings" />
<Icon family="Feather" name="shopping-bag" />
<Icon family="Feather" name="user" />
```

### AntDesign

```tsx
<Icon family="AntDesign" name="like1" />
<Icon family="AntDesign" name="home" />
<Icon family="AntDesign" name="shoppingcart" />
```

### Outras Famílias

- `FontAwesome`
- `Entypo`
- `EvilIcons`
- `Fontisto`
- `Foundation`
- `SimpleLineIcons`
- `Octicons`
- `Zocial`

## 🎯 Props

| Prop       | Tipo         | Padrão                      | Descrição                    |
| ---------- | ------------ | --------------------------- | ---------------------------- |
| `family`   | `IconFamily` | `'MaterialIcons'`           | Família de ícones            |
| `name`     | `string`     | -                           | Nome do ícone (obrigatório)  |
| `size`     | `number`     | `24`                        | Tamanho em pixels            |
| `color`    | `string`     | `theme.colors.text.primary` | Cor do ícone                 |
| `onPress`  | `() => void` | -                           | Callback ao pressionar       |
| `disabled` | `boolean`    | `false`                     | Se o ícone está desabilitado |
| `style`    | `ViewStyle`  | -                           | Estilos adicionais           |
| `testID`   | `string`     | -                           | ID para testes               |

## 💡 Exemplos

### Ícone Pressionável

```tsx
<Icon name="settings" onPress={() => console.log('Configurações')} />
```

### Ícone com Tema

```tsx
import { useTheme } from './src/design-system';

function MyComponent() {
  const { theme } = useTheme();

  return <Icon name="star" color={theme.colors.warning} size={28} />;
}
```

### Ícone Desabilitado

```tsx
<Icon name="lock" disabled />
```

### Ícone em Botão

```tsx
import { Button, Icon } from './src/design-system';

<Button variant="primary" leftIcon={<Icon name="add-shopping-cart" size={18} />}>
  Adicionar ao Carrinho
</Button>;
```

### Ícone em Input

```tsx
import { Input, Icon } from './src/design-system';

<Input label="Email" placeholder="Digite seu email" leftIcon={<Icon name="email" size={20} />} />;
```

### Lista de Ícones

```tsx
const menuItems = [
  { icon: 'home', label: 'Início' },
  { icon: 'shopping-cart', label: 'Carrinho' },
  { icon: 'person', label: 'Perfil' },
];

return (
  <View>
    {menuItems.map((item) => (
      <View key={item.icon} style={styles.menuItem}>
        <Icon name={item.icon} size={24} />
        <Text>{item.label}</Text>
      </View>
    ))}
  </View>
);
```

## 🔍 TypeScript

O componente possui tipos completos para autocompletar:

```tsx
import type {
  IconFamily,
  MaterialIconName,
  MaterialCommunityIconName,
  FontAwesomeIconName,
  FontAwesome5IconName,
  IonIconName,
  FeatherIconName,
  AntDesignIconName,
} from './src/design-system';

// Tipos para autocompletar nomes de ícones
const iconName: MaterialIconName = 'home';
const communityIcon: MaterialCommunityIconName = 'cart';
```

## 🎨 Integração com Design System

O componente está totalmente integrado com o sistema de temas:

```tsx
import { ThemeProvider, Icon } from './src/design-system';

export default function App() {
  return (
    <ThemeProvider initialMode="light">
      {/* Cor automática do tema */}
      <Icon name="home" />

      {/* Ou cor customizada */}
      <Icon name="shopping-cart" color="#2196F3" />
    </ThemeProvider>
  );
}
```

## 📚 Recursos

- [Expo Vector Icons Directory](https://icons.expo.fyi/) - Catálogo completo de ícones disponíveis
- [Material Icons](https://fonts.google.com/icons) - Ícones do Google Material Design
- [Material Design Icons](https://materialdesignicons.com/) - Community Icons
- [FontAwesome Icons](https://fontawesome.com/icons) - Ícones FontAwesome

## ⚠️ Notas

- Por padrão, usa `MaterialIcons` se nenhuma família for especificada
- Se um ícone não for encontrado, exibe um ícone de fallback (`help-outline`)
- Ícones pressionáveis são automaticamente envolvidos em `Pressable`
- A propriedade `disabled` adiciona opacidade de 50%
