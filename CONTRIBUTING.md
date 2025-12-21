# 🤝 Guia de Contribuição

Obrigado por contribuir com o projeto E-commerce App! Este guia ajudará você a manter a consistência e qualidade do código.

## 📋 Regras de Desenvolvimento

### 🎨 Atualizações no Design System

**IMPORTANTE:** Sempre que modificar componentes, tokens ou temas do Design System, você **DEVE** atualizar a documentação correspondente.

#### Checklist Obrigatório para Mudanças no Design System:

- [ ] Componente/Token/Tema modificado no código
- [ ] `src/design-system/DESIGN_SYSTEM_SUMMARY.md` atualizado
- [ ] Exemplos atualizados (se aplicável)
- [ ] Props/Interfaces atualizadas no código
- [ ] Testes validados (se existirem)
- [ ] Sem erros de linting

#### Arquivos que Requerem Atualização de Documentação:

Ao modificar arquivos em:

```
src/design-system/
├── tokens/           → Atualizar seção "Tokens" no DESIGN_SYSTEM_SUMMARY.md
├── theme/            → Atualizar seção "Tema" no DESIGN_SYSTEM_SUMMARY.md
└── components/       → Atualizar seção "Componentes" no DESIGN_SYSTEM_SUMMARY.md
```

#### Exemplo de Fluxo de Trabalho:

```bash
# 1. Criar branch para feature
git checkout -b feature/update-button-component

# 2. Fazer alterações no componente
# Editar: src/design-system/components/Button/Button.tsx

# 3. OBRIGATÓRIO: Atualizar documentação
# Editar: src/design-system/DESIGN_SYSTEM_SUMMARY.md

# 4. Atualizar exemplos (se necessário)
# Editar: src/examples/*

# 5. Verificar mudanças
git status

# 6. Commit incluindo código E documentação
git add src/design-system/components/Button/Button.tsx
git add src/design-system/DESIGN_SYSTEM_SUMMARY.md
git commit -m "feat: adiciona nova variante ao Button

- Adiciona variante 'success' ao componente Button
- Atualiza documentação no DESIGN_SYSTEM_SUMMARY.md
- Adiciona exemplo de uso"

# 7. Push
git push origin feature/update-button-component
```

## 🔍 Padrões de Código

### TypeScript

- ✅ Sempre use TypeScript
- ✅ Defina interfaces para todas as props
- ✅ Use tipos específicos, evite `any`
- ✅ Exporte tipos junto com componentes

### Componentes

- ✅ Um componente por arquivo
- ✅ Use React.FC para componentes funcionais
- ✅ Documente props com comentários JSDoc
- ✅ Mantenha componentes pequenos e focados

### Nomenclatura

- ✅ PascalCase para componentes: `Button.tsx`
- ✅ camelCase para funções e variáveis: `handleClick`
- ✅ UPPER_CASE para constantes: `MAX_WIDTH`
- ✅ kebab-case para arquivos CSS/estilos

## 📝 Convenção de Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Apenas documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adiciona testes
- `chore`: Tarefas de manutenção

### Exemplos:

```bash
feat(button): adiciona variante success
fix(input): corrige validação de email
docs(design-system): atualiza documentação do Badge
style(card): ajusta espaçamento interno
refactor(theme): simplifica lógica do ThemeContext
```

## 🧪 Testes

Antes de fazer commit:

```bash
# Verificar erros de TypeScript
yarn tsc --noEmit

# Executar linter
yarn lint

# Rodar testes (quando implementados)
yarn test
```

## 📚 Atualizando Documentação

### DESIGN_SYSTEM_SUMMARY.md

Este arquivo deve sempre estar sincronizado com o código. Ao fazer alterações:

1. **Localizar a seção correta** do componente/token alterado
2. **Atualizar propriedades** (adicionar, remover ou modificar)
3. **Atualizar exemplos de código** se a API mudou
4. **Adicionar notas** sobre breaking changes (se aplicável)

### Estrutura da Documentação:

````markdown
### [NomeDoComponente]

[Descrição breve]

```tsx
// Exemplo de uso atualizado
<Component prop="valor" />
```
````

**Props:**

- `prop1`: tipo - descrição
- `prop2`: tipo - descrição

```

## ⚠️ Breaking Changes

Se sua mudança quebra compatibilidade:

1. Marque no commit: `feat(button)!: remove prop antiga`
2. Documente no corpo do commit o que mudou
3. Atualize o changelog
4. Atualize a versão no package.json (seguir semver)

## 🚫 Evite

- ❌ Commits sem atualizar documentação
- ❌ Mudar props sem atualizar interfaces TypeScript
- ❌ Adicionar dependências pesadas sem discussão
- ❌ Código duplicado
- ❌ Commits com erros de linting
- ❌ Console.logs em produção

## ✅ Checklist Antes do Commit

```

□ Código funciona corretamente
□ TypeScript sem erros
□ Linter sem warnings
□ Documentação atualizada
□ Exemplos funcionam
□ Commit message segue convenção
□ Props documentadas
□ Mudanças testadas

```

## 🤝 Revisão de Código

Ao revisar PRs, verifique:

- ✅ Documentação foi atualizada?
- ✅ Código segue os padrões?
- ✅ Não há código duplicado?
- ✅ Testes adequados (quando aplicável)?
- ✅ Breaking changes estão documentadas?

## 📞 Dúvidas?

Se tiver dúvidas sobre como contribuir:

1. Leia a documentação existente
2. Veja exemplos de commits anteriores
3. Abra uma issue para discussão

---

**Lembre-se:** Documentação é parte do código! Um componente sem documentação é um componente incompleto.

```
