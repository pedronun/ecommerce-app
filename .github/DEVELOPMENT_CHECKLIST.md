# 📝 Checklist de Desenvolvimento - Design System

Use este checklist ao trabalhar com o Design System.

## ✅ Antes de Começar

- [ ] Branch criada a partir de `main`
- [ ] Dependências atualizadas (`yarn install`)
- [ ] Ambiente de desenvolvimento funcionando
- [ ] Node.js versão 23.8.0 ativa (`nvm use`)

## 🎨 Ao Criar/Modificar Componente

### Código
- [ ] Componente criado em `src/design-system/components/[Nome]/`
- [ ] Arquivo principal: `[Nome].tsx`
- [ ] Arquivo de exportação: `index.ts`
- [ ] Interface TypeScript definida: `[Nome]Props`
- [ ] Props documentadas com JSDoc
- [ ] Componente usa `useTheme()` quando necessário
- [ ] Estilos seguem tokens do design system

### Documentação (OBRIGATÓRIO)
- [ ] **`DESIGN_SYSTEM_SUMMARY.md` atualizado**
  - [ ] Seção do componente adicionada/atualizada
  - [ ] Exemplo de código incluído
  - [ ] Props documentadas
  - [ ] Características listadas
- [ ] Exemplo criado/atualizado em `src/examples/`
- [ ] Comentários no código (se lógica complexa)

### Exportações
- [ ] Componente exportado em `components/index.ts`
- [ ] Tipos exportados em `components/index.ts`
- [ ] Re-exportado em `design-system/index.ts`

## 🎯 Ao Modificar Tokens

### Código
- [ ] Token atualizado em `src/design-system/tokens/`
- [ ] Tipos TypeScript atualizados
- [ ] Consistência com outros tokens verificada

### Documentação (OBRIGATÓRIO)
- [ ] **`DESIGN_SYSTEM_SUMMARY.md` atualizado**
  - [ ] Seção de tokens atualizada
  - [ ] Novos valores documentados
  - [ ] Exemplos de uso atualizados
- [ ] Tema light/dark atualizado (se aplicável)

## 🌓 Ao Modificar Tema

### Código
- [ ] `theme.ts` atualizado
- [ ] `lightTheme` e `darkTheme` consistentes
- [ ] Tipos TypeScript corretos

### Documentação (OBRIGATÓRIO)
- [ ] **`DESIGN_SYSTEM_SUMMARY.md` atualizado**
  - [ ] Seção de tema atualizada
  - [ ] Mudanças documentadas
  - [ ] Exemplos de uso corretos

## 🧪 Testes e Validação

- [ ] App inicia sem erros (`yarn start`)
- [ ] Componente renderiza corretamente
- [ ] Tema light funciona
- [ ] Tema dark funciona
- [ ] Sem erros de TypeScript (`yarn tsc --noEmit`)
- [ ] Sem warnings de linter
- [ ] Props requeridas validadas
- [ ] Props opcionais testadas
- [ ] Edge cases verificados

## 📱 Testes em Dispositivos

- [ ] Testado em simulador iOS (ou físico)
- [ ] Testado em emulador Android (ou físico)
- [ ] Comportamento em diferentes tamanhos de tela
- [ ] Animações fluidas (60 FPS)
- [ ] Gestos funcionando corretamente

## 📝 Antes do Commit

### Arquivos Modificados
- [ ] Código do componente/token/tema
- [ ] **`DESIGN_SYSTEM_SUMMARY.md` (OBRIGATÓRIO)**
- [ ] Exemplos (se aplicável)
- [ ] `index.ts` de exportações

### Qualidade
- [ ] Sem `console.log` ou debug code
- [ ] Sem código comentado desnecessário
- [ ] Imports organizados
- [ ] Código formatado
- [ ] Sem erros de linting

### Commit
- [ ] Mensagem segue convenção (feat/fix/docs/etc)
- [ ] Descrição clara do que mudou
- [ ] Referência a issue (se aplicável)
- [ ] Inclui documentação no commit

## 🚀 Antes do Push

- [ ] Branch atualizada com `main` (se necessário)
- [ ] Conflitos resolvidos
- [ ] Build sem erros
- [ ] README atualizado (se mudanças estruturais)

## 📋 Exemplo de Commits Válidos

✅ **CORRETO:**
```bash
git add src/design-system/components/Button/Button.tsx
git add src/design-system/DESIGN_SYSTEM_SUMMARY.md
git commit -m "feat(button): adiciona variante success"
```

❌ **INCORRETO:**
```bash
git add src/design-system/components/Button/Button.tsx
git commit -m "feat(button): adiciona variante success"
# Faltou atualizar DESIGN_SYSTEM_SUMMARY.md!
```

## 🔴 Regra de Ouro

> **Nenhuma mudança no Design System deve ser commitada sem atualizar o `DESIGN_SYSTEM_SUMMARY.md`**

Se você modificou:
- Um componente → Atualize a seção do componente
- Um token → Atualize a seção de tokens
- Um tema → Atualize a seção de tema
- Uma prop → Atualize a documentação da prop
- Um exemplo → Verifique se exemplo está no SUMMARY

---

## 📞 Dúvidas?

Se não tiver certeza se precisa atualizar a documentação:
- **Resposta:** Sim, provavelmente precisa!
- Quando em dúvida, atualize.
- É melhor ter documentação extra do que faltando.

**Documentação = Parte do Código!**

