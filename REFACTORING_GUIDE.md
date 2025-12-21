# 📋 Refatoração dos Componentes - Guia

## ✅ Componentes Já Refatorados

### 1. **Button** ✅
- `Button.types.ts` - Tipos e interfaces
- `Button.styles.ts` - Estilos e funções de estilo
- `Button.tsx` - Componente principal (limpo)

### 2. **Toast** ✅
- `Toast.types.ts` - Tipos e interfaces  
- `Toast.styles.ts` - Estilos e constantes
- `Toast.tsx` - Componente principal (refatorado)

## 🔧 Padrão de Refatoração

Cada componente deve ter **3 arquivos**:

```
ComponentName/
├── ComponentName.tsx        # Componente principal (lógica)
├── ComponentName.types.ts   # Tipos e interfaces
└── ComponentName.styles.ts  # Estilos e funções auxiliares
```

### Estrutura do `Component.types.ts`

```typescript
// Exports de tipos para uso externo
export type ComponentVariant = 'primary' | 'secondary';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface ComponentProps extends SomeBaseProps {
  // Props do componente
  variant?: ComponentVariant;
  size?: ComponentSize;
  onPress?: () => void;
}
```

### Estrutura do `Component.styles.ts`

```typescript
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// StyleSheet estático
export const styles = StyleSheet.create({
  container: {
    // estilos
  },
});

// Funções que retornam estilos dinâmicos
interface Theme {
  colors: Record<string, string>;
  spacing: Record<number, number>;
}

export const getVariantStyles = (variant: string, theme: Theme): ViewStyle => {
  // lógica de estilos
};
```

### Estrutura do `Component.tsx`

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ComponentProps } from './Component.types';
import { styles, getVariantStyles } from './Component.styles';

export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  ...props
}) => {
  const { theme } = useTheme();
  
  const dynamicStyles = getVariantStyles(variant, theme);
  
  return (
    <View style={[styles.container, dynamicStyles]}>
      {/* JSX */}
    </View>
  );
};
```

## 📝 Componentes Pendentes de Refatoração

### Avatar
**Problemas:** StyleSheet não usado, inline styles

**Ação:**
1. Remover import de StyleSheet
2. Mover estilos inline para constantes
3. Criar `Avatar.types.ts` e `Avatar.styles.ts`

### Badge  
**Problemas:** StyleSheet não usado, uso de `any`

**Ação:**
1. Remover import de StyleSheet
2. Substituir `any` por tipos específicos (Theme interface)
3. Criar `Badge.types.ts` e `Badge.styles.ts`

### BottomSheet
**Problemas:** Imports não usados, color literals

**Ação:**
1. Remover TouchableOpacity e ViewStyle não usados
2. Mover cor rgba para constante no styles
3. Criar `BottomSheet.types.ts` e `BottomSheet.styles.ts`

### Card
**Problemas:** StyleSheet não usado, uso de `any`

**Ação:**
1. Remover import de StyleSheet
2. Substituir `any` por Theme interface
3. Criar `Card.types.ts` e `Card.styles.ts`

### Chip
**Problemas:** StyleSheet não usado, uso de `any`

**Ação:**
1. Remover import de StyleSheet
2. Substituir todos os `any` por tipos específicos
3. Criar `Chip.types.ts` e `Chip.styles.ts`

### Input
**Problemas:** StyleSheet não usado

**Ação:**
1. Remover import de StyleSheet
2. Mover ViewStyles inline para constantes
3. Criar `Input.types.ts` e `Input.styles.ts`

### Skeleton
**Problemas:** StyleSheet não usado, inline styles, uso de `any`

**Ação:**
1. Remover import de StyleSheet
2. Substituir inline styles por constantes
3. Substituir `any` por Theme interface
4. Criar `Skeleton.types.ts` e `Skeleton.styles.ts`

### Text
**Problemas:** StyleSheet não usado, uso de `any`

**Ação:**
1. Remover import de StyleSheet
2. Substituir `any` por Theme interface
3. Criar `Text.types.ts` e `Text.styles.ts`

## 🎯 Checklist de Refatoração por Componente

Para cada componente:

- [ ] Criar `[Component].types.ts` com todos os tipos
- [ ] Criar `[Component].styles.ts` com estilos e helpers
- [ ] Atualizar `[Component].tsx` importando dos novos arquivos
- [ ] Remover imports não usados
- [ ] Substituir `any` por tipos específicos
- [ ] Mover inline styles para constantes
- [ ] Mover color literals para tokens
- [ ] Atualizar `index.ts` se necessário
- [ ] Executar `yarn lint` no componente
- [ ] Corrigir erros restantes

## 🔍 Comandos Úteis

```bash
# Lint de um componente específico
yarn lint src/design-system/components/Badge/

# Lint e fix automático
yarn lint:fix src/design-system/components/Badge/

# Ver apenas erros (sem warnings)
yarn lint --quiet

# Type check
yarn type-check
```

## 🚀 Exemplo Completo: Badge

### Badge.types.ts
```typescript
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}
```

### Badge.styles.ts
```typescript
import { ViewStyle, TextStyle } from 'react-native';

interface Theme {
  radius: { full: number };
  typography: {
    fontWeight: { semibold: string };
  };
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  spacing: Record<number, number>;
}

export const getSizeStyles = (size: BadgeSize, theme: Theme, dot: boolean): ViewStyle => {
  if (dot) {
    const dotSizes = {
      sm: { width: 8, height: 8 },
      md: { width: 10, height: 10 },
      lg: { width: 12, height: 12 },
    };
    return dotSizes[size];
  }

  const sizes = {
    sm: {
      paddingHorizontal: theme.spacing[1],
      paddingVertical: 2,
      minWidth: 18,
      minHeight: 18,
    },
    md: {
      paddingHorizontal: theme.spacing[2],
      paddingVertical: 4,
      minWidth: 22,
      minHeight: 22,
    },
    lg: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
      minWidth: 28,
      minHeight: 28,
    },
  };
  return sizes[size];
};

// ... outras funções
```

### Badge.tsx
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { BadgeProps } from './Badge.types';
import { getSizeStyles, getVariantStyles, getTextSizeStyles } from './Badge.styles';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
}) => {
  const { theme } = useTheme();

  const badgeStyle = {
    borderRadius: theme.radius.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...getSizeStyles(size, theme, dot),
    ...getVariantStyles(variant, theme),
  };

  if (dot) {
    return <View style={badgeStyle} />;
  }

  const textStyle = {
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeight.semibold,
    ...getTextSizeStyles(size, theme),
  };

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};
```

## 📊 Progresso

- ✅ Button (completo)
- ✅ Toast (completo)
- ⏳ Avatar (pendente)
- ⏳ Badge (pendente)
- ⏳ BottomSheet (pendente)
- ⏳ Card (pendente)
- ⏳ Chip (pendente)
- ⏳ Divider (OK, não precisa refatorar)
- ⏳ Input (pendente)
- ⏳ Skeleton (pendente)
- ⏳ Text (pendente)

## 🎓 Benefícios da Refatoração

1. **Organização** - Código mais limpo e separado por responsabilidade
2. **Manutenibilidade** - Fácil encontrar tipos, estilos e lógica
3. **Reutilização** - Funções de estilo podem ser compartilhadas
4. **Type Safety** - Tipos explícitos em vez de `any`
5. **Performance** - Estilos estáticos em StyleSheet
6. **Lint** - Código passa em todas as verificações

---

**Próximo passo:** Continue a refatoração seguindo este guia para os componentes restantes.

