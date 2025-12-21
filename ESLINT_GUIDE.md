# 🔍 ESLint e Prettier - Guia de Configuração

## 📦 Pacotes Instalados

### ESLint
- `eslint` - Linter principal
- `@typescript-eslint/eslint-plugin` - Regras TypeScript
- `@typescript-eslint/parser` - Parser TypeScript

### React/React Native
- `eslint-plugin-react` - Regras React
- `eslint-plugin-react-hooks` - Regras Hooks
- `eslint-plugin-react-native` - Regras React Native

### Prettier
- `prettier` - Formatador de código
- `eslint-config-prettier` - Desabilita regras conflitantes
- `eslint-plugin-prettier` - Integra Prettier com ESLint

## 🚀 Scripts Disponíveis

```bash
# Verificar problemas de linting
yarn lint

# Corrigir automaticamente problemas
yarn lint:fix

# Formatar código
yarn format

# Verificar formatação (CI)
yarn format:check

# Verificar tipos TypeScript
yarn type-check

# Validar tudo (types + lint + format)
yarn validate
```

## ⚙️ Configuração

### .eslintrc.js

Arquivo principal de configuração do ESLint com:
- ✅ Suporte a TypeScript
- ✅ Regras React/React Native
- ✅ Integração com Prettier
- ✅ Regras customizadas para Design System

### .prettierrc

Configuração do Prettier:
- Semi-colons: Sim
- Aspas simples: Sim
- Largura de linha: 100
- Tab width: 2 espaços
- Trailing commas: ES5

## 📋 Regras Principais

### React Native
```javascript
'react-native/no-unused-styles': 'error',        // Estilos não usados
'react-native/split-platform-components': 'warn', // Separar código iOS/Android
'react-native/no-inline-styles': 'warn',         // Evitar estilos inline
```

### TypeScript
```javascript
'@typescript-eslint/no-explicit-any': 'warn',    // Evitar 'any'
'@typescript-eslint/no-unused-vars': 'error',    // Variáveis não usadas
```

### Geral
```javascript
'no-console': ['warn', { allow: ['warn', 'error'] }], // Só warn e error
'no-debugger': 'error',                          // Sem debugger em produção
'prefer-const': 'error',                         // Preferir const
```

### Design System (regras específicas)
```javascript
// src/design-system/**
'@typescript-eslint/no-explicit-any': 'error',   // Mais restritivo
'react-native/no-color-literals': 'error',       // Usar tokens de cor
```

## 🎯 Uso no VS Code

### Extensões Recomendadas

O arquivo `.vscode/extensions.json` recomenda:
- ESLint
- Prettier
- TypeScript
- Error Lens
- Code Spell Checker

### Configuração Automática

O arquivo `.vscode/settings.json` configura:
- ✅ Formatação automática ao salvar
- ✅ Fix do ESLint ao salvar
- ✅ Prettier como formatador padrão

## 🔧 Troubleshooting

### ESLint não está funcionando?

```bash
# Reinstalar dependências
yarn install

# Verificar versão do Node
node --version  # Deve ser >= 20.19.4

# Limpar cache do ESLint
rm -rf node_modules/.cache
```

### Conflitos entre ESLint e Prettier?

```bash
# Verificar se eslint-config-prettier está instalado
yarn list eslint-config-prettier

# Deve estar sempre por último no extends
```

### Muitos erros de uma vez?

```bash
# Corrigir automaticamente o que for possível
yarn lint:fix

# Ver apenas erros críticos
yarn lint --quiet
```

## 📝 Exemplos de Uso

### Desabilitar regra em arquivo específico

```typescript
/* eslint-disable react-native/no-inline-styles */
// Código aqui
/* eslint-enable react-native/no-inline-styles */
```

### Desabilitar regra em linha específica

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();
```

### Ignorar arquivo inteiro

Adicione no `.eslintignore`:
```
src/generated/*.ts
```

## 🎨 Integração com Pre-commit

O hook pre-commit já verifica:
1. Mudanças no Design System
2. Documentação atualizada

Para adicionar validação de linting:

```bash
# .husky/pre-commit
yarn lint
yarn type-check
```

## 📊 Níveis de Severidade

- `error` (🔴) - Bloqueia commit/build
- `warn` (🟡) - Aviso, não bloqueia
- `off` (⚪) - Desabilitado

## 🔍 Regras Customizadas por Contexto

### Design System
- Mais restritivo
- Sem `any`
- Cores devem usar tokens

### Exemplos/Demo
- Permite inline styles
- Permite console.log
- Menos restritivo

### Configurações
- Permite require()
- Permite console.log

## 🎓 Boas Práticas

### ✅ Faça
- Execute `yarn lint:fix` antes de commitar
- Use `yarn validate` antes de fazer PR
- Configure seu editor para formatar ao salvar
- Corrija warnings gradualmente

### ❌ Evite
- Desabilitar regras globalmente
- Ignorar muitos arquivos
- Fazer commit com erros de linting
- Usar `// eslint-disable` em excesso

## 📚 Recursos

- [ESLint Docs](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier Docs](https://prettier.io/docs/en/)
- [React Native ESLint](https://github.com/Intellicode/eslint-plugin-react-native)

---

**Status:** ✅ Configurado e pronto para uso!

Execute `yarn lint` para verificar seu código agora.

