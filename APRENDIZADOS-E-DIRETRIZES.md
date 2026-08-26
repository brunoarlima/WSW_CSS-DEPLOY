# Histórico de Aprendizados, Diagnósticos & Diretrizes Técnicas

Este documento serve para registrar o histórico de desafios, causas-raiz, erros enfrentados, soluções definitivas e boas práticas descobertas durante o desenvolvimento do redesign visual e funcional do **WSW**.

---

## 1. 📋 Modelo de Registro de Caso

Utilize o template abaixo para documentar novos aprendizados, bugs resolvidos ou peculiaridades encontradas na plataforma:

```markdown
### 🛑 Caso X: [Título descritivo do problema / comportamento]
- **Sintoma Visual / Comportamento**: O que estava acontecendo visualmente ou funcionalmente.
- **O que deu errado (Causa-Raiz)**: Por que o erro ocorria (ex: conflito com React Fiber, classes MUI dinâmicas, etc.).
- **Solução Definitiva ([arquivo-de-origem](./caminho/do/arquivo))**:
  - Explicação da solução adotada.
  - Regras de CSS ou abordagens JS aplicadas para resolver de forma permanente.
```

---

## 2. 💡 Diretrizes Gerais & Armadilhas Conhecidas

1. **Classes Hash Dinâmicas (`.jssXXX`)**:
   - ⚠️ *Risco*: Classes `.jssXXX` mudam entre builds ou renderizações.
   - ✅ *Regra*: Sempre priorize âncoras fixas da plataforma (`.custom-css-*`, `#custom-css-*`), atributos `[data-*]` ou seletores semânticos do MUI (`.MuiPaper-root`, `.MuiAppBar-root`, `.MuiCardHeader-title`).

2. **Reconciliação do React Fiber & Manipulação DOM**:
   - ⚠️ *Risco*: Fazer `appendChild`, `innerHTML = ...` ou remover nós controlados pelo React pode causar conflitos de reconciliação e crash de tela branca (*White Screen of Death*).
   - ✅ *Regra*: Sempre utilize abordagens passivas (CSS puro, pseudo-elementos `::before`/`::after`, `-webkit-mask-image` ou atributos `data-*` em containers raiz com validação de `node.isConnected`).

---

## 3. 📚 Histórico de Casos Documentados

*(Adicione novos casos registrados abaixo conforme o desenvolvimento avançar)*
