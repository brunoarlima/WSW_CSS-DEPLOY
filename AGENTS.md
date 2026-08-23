# Diretrizes do Projeto: NextyChat / WSW Redesign

Este repositório gerencia o redesign visual (CSS) e os aprimoramentos de interface (JS) do NextyChat / WSW.

---

## 1. Regras Fundamentais para Agentes

1. **Idioma**: Sempre responda em **português do Brasil**.
2. **Validação antes do Commit**: **NUNCA** faça `git commit` ou `git push` automaticamente sem que o usuário tenha testado e aprovado explicitamente o resultado em produção/ambiente de teste.
3. **Estrutura Modular**: **NUNCA** edite diretamente os arquivos gerados `nextychat-redesign.css` e `nextychat-redesign.js`. Sempre edite os módulos individuais em `src/css/` e `src/js/`.

---

## 2. Estrutura Modular do Projeto

```text
src/
├── css/
│   ├── 00-tokens.css          # Cores, Design System e Variáveis Light/Dark
│   ├── 01-base.css            # Scrollbar minimalista e resets base
│   ├── 02-appbar.css          # Topbar, Logo no menu, Ping e Gaveta retrátil do topo
│   ├── 03-sidebar.css         # Menu lateral (expandido e recolhido)
│   ├── 04-tickets-list.css    # Toolbar, abas, busca e cards de atendimento
│   ├── 05-ticket-header.css   # Cabeçalho do chat, ações rápidas e gaveta do ticket
│   ├── 06-ticket-tags.css     # Abas mobile (segmented) e tags do atendimento
│   ├── 07-contact-drawer.css  # Sidebar lateral do contato (docked no desktop, overlay no mobile)
│   ├── 08-chat.css            # Área de mensagens, balões in/out e notas internas
│   ├── 09-composer.css        # Barra de digitação (input, botões, anexo)
│   └── 10-mobile.css          # Otimizações mobile/PWA (100% altura, sem vão de 56px)
└── js/
    ├── 00-brand-logo.js       # SVG em alta resolução e injeção da logo
    ├── 01-topbar.js           # Organização dos ícones do topo e gaveta retrátil
    ├── 02-ticket-actions.js   # Ações rápidas e gaveta retrátil do atendimento
    ├── 03-ticket-header.js    # Alinhamento do botão de menu/ações no cabeçalho
    ├── 04-mobile-fixes.js     # Normalização de altura e layout mobile/PWA
    └── 05-main.js             # Inicialização, MutationObserver e eventos globais
```

---

## 3. Comandos e Automação

- **Compilar Módulos**: `npm run build` ou `node build.js`
  - Concatena os arquivos de `src/css/` gerando `nextychat-redesign.css`.
  - Concatena os arquivos de `src/js/` gerando `nextychat-redesign.js` dentro de uma IIFE segura e valida a sintaxe.
- **Deploy na API**: `npm run deploy` ou `./deploy.sh`
  - Executa o build automaticamente antes de enviar o CSS e JS para a API do NextyChat.

---

## 4. Diretrizes de CSS & Design

- **Material-UI Safe**: Nunca alterar posições estruturais globais que possam quebrar modais ou grids nativos do Material-UI.
- **Tokens de Cor**: Utilizar as variáveis definidas em `00-tokens.css` (paleta Chatwoot Light e Dark).
- **Mobile & PWA**: Garantir `height: 100%` com `flex: 1 1 auto` e `env(safe-area-inset-bottom)` para evitar que sobrem espaços vazios (como a antiga reserva de 56px da BottomNavigation).

---

## 5. Base de Conhecimento & Gotchas

Consulte o arquivo [APRENDIZADOS-E-DIRETRIZES.md](./APRENDIZADOS-E-DIRETRIZES.md) para o catálogo completo de:
- Erros enfrentados e causas-raiz (ex: vãos no mobile, appBarSpacers do Material-UI, classes `.jss` dinâmicas).
- Soluções definitivas e comportamentos específicos do React/MUI v4.

