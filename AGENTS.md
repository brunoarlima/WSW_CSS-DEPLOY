# Diretrizes do Projeto: WSW Redesign

Este repositório gerencia o redesign visual (CSS) e os aprimoramentos de interface (JS) do WSW.

---

## 1. Regras Fundamentais para Agentes

1. **Idioma**: Sempre responda em **português do Brasil**.
2. **Validação antes do Commit**: **NUNCA** faça `git commit` ou `git push` automaticamente sem que o usuário tenha testado e aprovado explicitamente o resultado em produção/ambiente de teste.
3. **Estrutura Modular**: **NUNCA** edite diretamente os arquivos gerados `wsw-redesign.css` e `wsw-redesign.js`. Sempre edite os módulos individuais em `src/css/` e `src/js/`.
4. **Isolamento de Repositório (Zero Ações no Original)**: **NUNCA** faça commits, pushes ou qualquer alteração no repositório remoto original. Todas as modificações devem ser mantidas exclusivamente locais até que o novo repositório receba o projeto e o usuário autorize o primeiro commit/push.

---

## 2. Estrutura Modular do Projeto

```text
src/
├── css/
│   └── 00-tokens.css          # Cores, Design System e Variáveis Light/Dark
└── js/
    └── 00-main.js             # Inicialização, MutationObserver e scripts customizados
```

> **Nota**: Novos módulos de CSS e JS devem ser criados dentro de `src/css/` e `src/js/` seguindo prefixos numéricos (ex: `01-base.css`, `02-appbar.css`) para garantir a ordem correta de concatenação pelo `build.js`.

---

## 3. Comandos e Automação

- **Compilar Módulos**: `npm run build` ou `node build.js`
  - Concatena os arquivos de `src/css/` gerando `wsw-redesign.css`.
  - Concatena os arquivos de `src/js/` gerando `wsw-redesign.js` dentro de uma IIFE segura e valida a sintaxe.
- **Deploy Isolado por Empresa (Padrão)**: `npm run deploy` ou `./deploy.sh`
  - Compila os módulos e lê o comando cURL em `bash.md` (ou utiliza as variáveis do `.env` como fallback).
  - Atualiza exclusivamente a empresa especificada com os novos `customCss`, `customJs` e `useCustomCss: true`.
- **Deploy Global (Todas as Empresas)**: `npm run deploy:global` ou `node deploy.js --global`
  - Envia para os endpoints globais `/settings/customCssFrontend` e `/settings/customJsFrontend`.

---

## 4. Diretrizes de CSS & Design

- **Material-UI Safe**: Nunca alterar posições estruturais globais que possam quebrar modais ou grids nativos do Material-UI.
- **Tokens de Cor**: Utilizar as variáveis definidas em `00-tokens.css`.
- **Mobile & PWA**: Garantir `height: 100%` com `flex: 1 1 auto` e `env(safe-area-inset-bottom)` para evitar que sobrem espaços vazios.

---

## 5. Base de Conhecimento, Âncoras & Gotchas

Consulte a documentação de suporte:
- [Customizacao-CSS-JS.md](./Customizacao-CSS-JS.md): Arquitetura das camadas de customização geral e por empresa.
- [Ancoras-CSS_V2.md](./Ancoras-CSS_V2.md): Catálogo completo e atualizado de âncoras e seletores da plataforma.
- [APRENDIZADOS-E-DIRETRIZES.md](./APRENDIZADOS-E-DIRETRIZES.md): Histórico e template para registro de armadilhas do MUI/React e soluções definitivas.

