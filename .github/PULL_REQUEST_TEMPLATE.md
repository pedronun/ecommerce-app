---
name: Pull Request - Design System
about: Template para PRs que modificam o Design System
title: "[COMPONENT/TOKEN/THEME] "
labels: design-system
---

## 📝 Descrição

Descreva as mudanças feitas no Design System.

## 🎯 Tipo de Mudança

- [ ] 🎨 Novo componente
- [ ] 🔧 Modificação de componente existente
- [ ] 🎭 Atualização de token (cores, espaçamento, etc)
- [ ] 🌓 Mudança de tema
- [ ] 📚 Apenas documentação
- [ ] 🐛 Correção de bug

## ✅ Checklist Obrigatório

### Código
- [ ] Código TypeScript sem erros
- [ ] Linter sem warnings
- [ ] Componente testado em light mode
- [ ] Componente testado em dark mode
- [ ] Props devidamente tipadas
- [ ] Usa tokens do design system

### Documentação (OBRIGATÓRIO)
- [ ] **`DESIGN_SYSTEM_SUMMARY.md` atualizado**
- [ ] Exemplos de código atualizados
- [ ] Props documentadas
- [ ] Características listadas

### Exportações
- [ ] Componente exportado em `components/index.ts`
- [ ] Tipos exportados
- [ ] Re-exportado em `design-system/index.ts`

### Testes
- [ ] Testado em iOS (simulador ou device)
- [ ] Testado em Android (emulador ou device)
- [ ] Sem erros no console
- [ ] Performance adequada (sem lags)

## 📸 Screenshots/GIFs

<!-- Adicione screenshots ou GIFs demonstrando as mudanças -->

### Light Mode
<!-- Screenshot aqui -->

### Dark Mode
<!-- Screenshot aqui -->

## 🔄 Breaking Changes

- [ ] Esta PR contém breaking changes
- [ ] Documentei os breaking changes no corpo do PR
- [ ] Atualizei a versão no package.json (seguindo semver)

<!-- Se sim, descreva quais são os breaking changes e como migrar -->

## 📋 Arquivos Modificados

### Design System
- `src/design-system/...` - descrição

### Documentação
- `src/design-system/DESIGN_SYSTEM_SUMMARY.md` - descrição

### Exemplos (se aplicável)
- `src/examples/...` - descrição

## 🧪 Como Testar

1. Checkout desta branch: `git checkout [branch-name]`
2. Instale dependências: `yarn install`
3. Inicie o app: `yarn start`
4. Teste o componente/mudança em...

## 📝 Observações Adicionais

<!-- Qualquer informação adicional relevante -->

---

## ⚠️ Lembrete para Revisores

Ao revisar este PR, verifique:
- ✅ DESIGN_SYSTEM_SUMMARY.md foi atualizado?
- ✅ Código segue padrões do projeto?
- ✅ Props estão documentadas?
- ✅ Exemplos funcionam?
- ✅ Sem duplicação de código?

