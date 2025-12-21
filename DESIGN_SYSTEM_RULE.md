# 🚨 REGRA IMPORTANTE - Design System

## ⚠️ Atenção Desenvolvedores!

**Toda mudança no Design System DEVE incluir atualização da documentação.**

### 📋 Regra Obrigatória

```
❌ PROIBIDO: Commit de código do Design System sem documentação
✅ OBRIGATÓRIO: Sempre atualizar DESIGN_SYSTEM_SUMMARY.md junto
```

### 📁 Arquivos Afetados

Se você modificar qualquer arquivo em:

```
src/design-system/
├── components/   → Atualizar DESIGN_SYSTEM_SUMMARY.md
├── tokens/       → Atualizar DESIGN_SYSTEM_SUMMARY.md
└── theme/        → Atualizar DESIGN_SYSTEM_SUMMARY.md
```

### ✅ Como Fazer Certo

```bash
# 1. Modifique o componente
vim src/design-system/components/Button/Button.tsx

# 2. OBRIGATÓRIO: Atualize a documentação
vim src/design-system/DESIGN_SYSTEM_SUMMARY.md

# 3. Commit os dois juntos
git add src/design-system/components/Button/Button.tsx
git add src/design-system/DESIGN_SYSTEM_SUMMARY.md
git commit -m "feat(button): adiciona nova prop variant"
```

### 🔴 Consequências de Não Seguir

- ❌ PR será rejeitado
- ❌ Commit será revertido
- ❌ Documentação ficará desatualizada
- ❌ Outros desenvolvedores não saberão das mudanças
- ❌ Projeto perde qualidade

### 📚 Recursos

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia completo de contribuição
- [.github/DEVELOPMENT_CHECKLIST.md](./.github/DEVELOPMENT_CHECKLIST.md) - Checklist detalhado

### 🤖 Automação

Um hook de git pre-commit foi configurado para verificar automaticamente.

Se você tentar fazer commit sem atualizar a documentação:
```
❌ ERRO: Mudanças detectadas no Design System!
📝 Você modificou arquivos do Design System mas não atualizou a documentação.
```

### 💡 Dica

**Configure o hook para ativar:**
```bash
# Dê permissão de execução ao hook
chmod +x .husky/pre-commit

# Instale o husky (se não estiver instalado)
yarn add -D husky
npx husky install
```

---

**Esta regra é inegociável e existe para manter a qualidade do projeto.**

