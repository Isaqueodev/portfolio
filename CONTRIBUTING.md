# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para este projeto! Este documento fornece diretrizes para contribuições.

## 📋 Código de Conduta

Este projeto adere aos princípios de:
- ✅ Respeito e inclusão
- ✅ Comunicação construtiva
- ✅ Colaboração aberta
- ✅ Foco na qualidade

## 🎯 Como Contribuir

### Reportar Bugs

Encontrou um bug? Abra uma [Issue](../../issues/new) com:

```markdown
**Descrição do Bug**
Descrição clara do problema

**Para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável, adicione screenshots

**Ambiente:**
 - OS: [ex: Windows 10]
 - Navegador: [ex: Chrome 96]
 - Versão: [ex: 1.0.0]

**Contexto Adicional**
Qualquer informação relevante
```

### Sugerir Features

Tem uma ideia? Abra uma [Issue](../../issues/new) com:

```markdown
**Problema a Resolver**
Descrição clara do problema que a feature resolve

**Solução Proposta**
Descrição da solução desejada

**Alternativas Consideradas**
Outras soluções que você considerou

**Contexto Adicional**
Screenshots, mockups, etc.
```

### Contribuir com Código

#### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork:

git clone https://github.com/seu-usuario/portfolio.git
cd portfolio
git remote add upstream https://github.com/original-usuario/portfolio.git
```

#### 2. Criar Branch

```bash
# Para features:
git checkout -b feature/nome-da-feature

# Para bugs:
git checkout -b fix/nome-do-bug

# Para documentação:
git checkout -b docs/nome-da-doc
```

#### 3. Fazer Mudanças

**Diretrizes de Código:**

✅ **HTML**
- Use HTML5 semântico
- Indentação: 4 espaços
- Sempre use atributos `alt` em imagens
- Adicione `aria-labels` quando apropriado
- IDs únicos por página

✅ **CSS**
- Use variáveis CSS (`:root`)
- Mobile-first quando possível
- Comentários para seções principais
- BEM naming convention (opcional)
- Evite `!important`
- Agrupe media queries por breakpoint

✅ **JavaScript**
- ES6+ syntax
- Const/let (não var)
- Funções descritivas
- Comentários JSDoc para funções complexas
- Debounce em event listeners
- Sempre trate errors

**Exemplo de código bem formatado:**

```javascript
/**
 * Inicializa o menu mobile com acessibilidade
 * @returns {void}
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) {
    console.warn('Mobile menu elements not found');
    return;
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isOpen);
  }

  menuToggle.addEventListener('click', toggleMenu);
}
```

#### 4. Testar

Antes de commitar, teste:

```bash
# ✅ Visual
- [ ] Layout não quebrou
- [ ] Cores seguem paleta
- [ ] Animações suaves

# ✅ Funcional
- [ ] Features funcionam em todos navegadores
- [ ] Mobile funciona
- [ ] Sem erros no console

# ✅ Acessibilidade
- [ ] Navegação por teclado funciona
- [ ] Contraste WCAG AA
- [ ] Screen reader friendly

# ✅ Performance
- [ ] Lighthouse score > 90
- [ ] Sem memory leaks
```

#### 5. Commit

Siga convenção de commits:

```bash
# Formato:
git commit -m "tipo(escopo): mensagem"

# Tipos:
feat:     Nova feature
fix:      Bug fix
docs:     Documentação
style:    Formatação (não afeta código)
refactor: Refatoração
perf:     Performance
test:     Testes
chore:    Manutenção

# Exemplos:
git commit -m "feat(hero): add particle animation effect"
git commit -m "fix(navbar): correct mobile menu z-index"
git commit -m "docs(readme): update installation steps"
git commit -m "style(css): improve code formatting"
git commit -m "perf(animations): debounce scroll listener"
```

#### 6. Push e Pull Request

```bash
# Push sua branch
git push origin feature/nome-da-feature

# Vá no GitHub e crie Pull Request

# Título do PR:
[Feature] Descrição clara

# Descrição do PR, inclua:
# - O que foi mudado
# - Por que foi mudado
# - Como testar
# - Screenshots (se visual)
# - Checklist de QA
```

**Template de Pull Request:**

```markdown
## 📝 Descrição

Breve descrição das mudanças

## 🎯 Motivação

Por que esta mudança é necessária?

## 🧪 Como Testar

1. Passo a passo para testar
2. ...

## 📸 Screenshots

Se aplicável, adicione screenshots

## ✅ Checklist

- [ ] Código segue style guide
- [ ] Testado em Chrome, Firefox, Safari
- [ ] Testado em mobile
- [ ] Acessibilidade verificada
- [ ] Documentação atualizada
- [ ] Sem console errors
- [ ] Lighthouse score > 90

## 🔗 Issues Relacionadas

Closes #123
```

### Code Review

Ao revisar PRs:

✅ **Seja Construtivo**
- Elogie o bom código
- Sugira melhorias educadamente
- Explique o "porquê" das sugestões

✅ **Verifique**
- Funcionalidade
- Acessibilidade
- Performance
- Código limpo e legível
- Testes passam

## 🎨 Style Guide

### Nomenclatura

**Classes CSS:**
```css
/* BEM opcional */
.block__element--modifier

/* Ou descritivo simples */
.hero-title
.btn-primary
.project-card
```

**JavaScript:**
```javascript
// camelCase para variáveis e funções
const myVariable = true;
function myFunction() {}

// PascalCase para classes
class MyClass {}

// UPPER_CASE para constantes
const MAX_WIDTH = 1200;
```

### Indentação

- HTML: 4 espaços
- CSS: 2 espaços
- JS: 2 espaços

### Comentários

```html
<!-- ============================================
     SECTION NAME
     ============================================ -->
```

```css
/* ============================================
   SECTION NAME
   ============================================ */
```

```javascript
// ============================================
// SECTION NAME
// ============================================
```

## 🧪 Testes

### Checklist de Testes

Antes de submeter PR:

**Visual:**
```bash
✅ Chrome DevTools device emulation
✅ Firefox responsive design mode
✅ Safari (se possível)
✅ Real devices (se disponível)
```

**Acessibilidade:**
```bash
✅ Lighthouse accessibility score
✅ WAVE extension
✅ axe DevTools
✅ Keyboard navigation
✅ Screen reader test (NVDA/JAWS/VoiceOver)
```

**Performance:**
```bash
✅ Lighthouse performance score
✅ Network throttling (Fast 3G)
✅ No console errors
✅ No memory leaks
```

### Ferramentas Recomendadas

- **Lighthouse:** DevTools → Lighthouse
- **WAVE:** [Extension](https://wave.webaim.org/extension/)
- **axe DevTools:** [Extension](https://www.deque.com/axe/devtools/)
- **Contrast Checker:** [WebAIM](https://webaim.org/resources/contrastchecker/)

## 📚 Recursos

### Design
- [Material Design](https://material.io/design)
- [Fluent Design](https://www.microsoft.com/design/fluent/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Acessibilidade
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)

### Performance
- [Web.dev](https://web.dev/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)

## 🏆 Reconhecimento

Contribuidores serão listados em:
- README.md (seção Contributors)
- CHANGELOG.md (em releases)

Tipos de contribuição reconhecidos:
- 💻 Código
- 🎨 Design
- 📖 Documentação
- 🐛 Bug reports
- 💡 Ideias/Features
- 🌍 Traduções
- ♿ Acessibilidade

## 📞 Dúvidas?

- Abra uma [Discussion](../../discussions)
- Comente na Issue relacionada
- Entre em contato via email (veja README)

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

**Obrigado por contribuir! 🎉**

Cada contribuição, por menor que seja, faz diferença!
