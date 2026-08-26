# 🎨 WSW Redesign — Boilerplate Modular de Customização (CSS & JS)

Este repositório fornece a estrutura base, ferramentas de compilação modular e scripts de deploy automatizado para personalização visual (**CSS**) e comportamental (**JS**) da plataforma **WSW / Whaticket SaaS**.

---

## 📑 Sumário

- [Visão Geral & Arquitetura](#-visão-geral--arquitetura)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Como Desenvolver](#-como-desenvolver)
  - [1. Escrevendo Módulos CSS (`src/css/`)](#1-escrevendo-módulos-css-srccss)
  - [2. Escrevendo Módulos JavaScript (`src/js/`)](#2-escrevendo-módulos-javascript-srcjs)
- [Compilação & Build](#-compilação--build)
- [Deploy Automatizado](#-deploy-automatizado)
  - [Opção A: Deploy Isolado por Empresa (Recomendado)](#opção-a-deploy-isolado-por-empresa-recomendado)
  - [Opção B: Deploy Global (Todas as Empresas)](#opção-b-deploy-global-todas-as-empresas)
- [Boas Práticas & Armadilhas do Material-UI (React)](#-boas-práticas--armadilhas-do-material-ui-react)
- [Documentação de Suporte](#-documentação-de-suporte)

---

## 🚀 Visão Geral & Arquitetura

A plataforma suporta customização em **duas camadas complementares**:
1. **Camada Geral**: Aplicada globalmente para toda a plataforma e telas públicas (Login, Cadastro).
2. **Camada por Empresa**: Aplicada exclusivamente após a autenticação da empresa selecionada, sobrepondo ou somando às regras gerais.

Para entender a fundo como a plataforma injeta e prioriza estilos e scripts, consulte [Customizacao-CSS-JS.md](./Customizacao-CSS-JS.md).

---

## 📁 Estrutura do Repositório

```text
├── src/
│   ├── css/
│   │   └── 00-tokens.css          # Design tokens, cores, temas light/dark
│   └── js/
│       └── 00-main.js             # Ponto de entrada JS, observers e scripts
├── Ancoras-CSS_V2.md              # Catálogo completo de seletores e atributos data-*
├── Customizacao-CSS-JS.md         # Guia de arquitetura de customização da plataforma
├── APRENDIZADOS-E-DIRETRIZES.md   # Template para documentação de casos e armadilhas
├── bash.example.md                # Exemplo do comando cURL para deploy por empresa
├── build.js                       # Compilador e validador modular
├── deploy.js                      # Pipeline de deploy (empresa e global)
├── deploy.sh                      # Atalho para build + deploy
├── package.json                   # Dependências e scripts npm
├── wsw-redesign.css               # CSS final compilado (gerado automaticamente)
└── wsw-redesign.js                # JS final compilado dentro de IIFE segura
```

---

## 🛠️ Como Desenvolver

### 1. Escrevendo Módulos CSS (`src/css/`)

Em vez de criar um único arquivo CSS gigante, divida as estilizações em módulos dentro de `src/css/` usando prefixos numéricos de ordenação:

- `00-tokens.css`: Variáveis globais (`:root` e `body[data-theme="dark"]`).
- `01-base.css`: Resets, tipografia e scrollbars.
- `02-appbar.css`: Barra superior (topbar), notificações e perfil.
- `03-sidebar.css`: Menu lateral expandido/recolhido.
- `04-tickets.css`: Listagem de atendimentos, cards e filtros.
- `05-chat.css`: Balões de mensagens, notas internas e anexos.

> 💡 **Dica de Seletores**: Consulte o [Ancoras-CSS_V2.md](./Ancoras-CSS_V2.md) para encontrar os seletores fixos (ex: `#custom-css-tickets`, `.custom-css-ticket-item`, `[data-action="resolve"]`). Evite usar classes dinâmicas geradas pelo Material-UI (`.jss123`).

---

### 2. Escrevendo Módulos JavaScript (`src/js/`)

Os scripts em `src/js/` são concatenados e encapsulados automaticamente em uma **IIFE segura** (`(function() { 'use strict'; ... })();`) com validação de sintaxe pré-deploy.

#### 🛡️ Regras de Ouro para JS no React (Material-UI):
1. **Nunca destrua nós nativos do React**: Não utilize `innerHTML = ''` ou `replaceChild` em elementos gerenciados pelo ciclo de reconciliação do React Fiber.
2. **Checagem de conexão**: Antes de manipular qualquer elemento, valide `if (!el || !el.isConnected) return;`.
3. **Debounce em MutationObservers**: Use sempre um debounce (ex: 50–100ms) para aguardar o React estabilizar o DOM antes de executar manipulações.
4. **Isolamento com `try...catch`**: Envolva rotinas em blocos defensivos para evitar que falhas silenciosas quebrem a árvore principal da interface.

---

## 🔨 Compilação & Build

Para concatenar e validar os arquivos de `src/css/` e `src/js/`:

```bash
npm run build
# ou
node build.js
```

O script irá:
1. Ler e ordenar todos os arquivos de `src/css/` -> Gerando `wsw-redesign.css`.
2. Ler e concatenar todos os arquivos de `src/js/` -> Gerando `wsw-redesign.js`.
3. Executar uma análise de sintaxe via JavaScript Engine antes de salvar.

---

## 🚀 Deploy Automatizado (Via cURL Inspecionado)

O deploy não depende de endpoints públicos de terceiros nem de chaves de API externas. Ele funciona capturando a **chamada de rede interna** que o próprio navegador faz quando um administrador logado salva as alterações no painel.

---

### 🔑 Passo a Passo: Como Obter o Comando cURL para o `bash.md`

Siga o passo a passo abaixo no seu navegador para capturar a requisição autenticada:

1. **Acesse o Menu**: No painel da plataforma com usuário administrador, navegue até **Configurações → Empresas**.
2. **Selecione a Empresa de Teste**: Escolha uma empresa destinada exclusivamente para testes (recomendamos manter uma empresa isolada para validar as customizações com segurança).
3. **Abra as Configurações**: Clique no botão de editar da empresa e selecione a aba **Configurações** dentro do modal.
4. **Identifique o ID da Empresa**: Observe o ID numérico da empresa (ex: `122` ou `/companies/122`).
5. **Abra o DevTools**: Pressione a tecla `F12` (ou `Ctrl + Shift + I`) no seu teclado e selecione a aba **Network (Rede)**.
6. **Dispare a Requisição**: Clique no botão **Salvar** dentro do modal da empresa.
7. **Localize a Chamada**: Na lista de requisições da aba Network, localize a chamada correspondente (o nome da requisição será exatamente o **ID da empresa**, por exemplo `122`).
8. **Copie como cURL**: Clique com o **botão direito do mouse** sobre essa requisição → **Copy** (Copiar) → **Copy as cURL (bash)** (Copiar como cURL (bash)).
9. **Cole no `bash.md`**: Crie um arquivo chamado `bash.md` na raiz do projeto e cole o comando copiado (veja o modelo em [bash.example.md](./bash.example.md)).

> [!WARNING]
> ### 🛡️ AVISO CRÍTICO DE SEGURANÇA & PRIVACIDADE
> - **Não aconselhamos o uso indiscriminado desta funcionalidade em ambientes de terceiros ou máquinas públicas.** Embora seja uma ferramenta extremamente prática e perfeitamente viável para desenvolvedores e administradores em um ambiente local e seguro, seu uso requer **total consciência e responsabilidade**.
> - **Cookies e Tokens Privados**: O comando copiado contém seu token JWT de autenticação (`authorization: Bearer ...`) e cookies de sessão (`cf_clearance`, `jrt`). Quem possuir essas credenciais terá acesso administrativo temporário à sua plataforma.
> - **NUNCA versione o `bash.md`**: O arquivo `bash.md` já está incluído no `.gitignore` para proteção. **Jamais remova-o do `.gitignore` nem suba credenciais ou cURL para nenhum repositório público ou compartilhado.**
> - **Recomendação**: Use em ambiente particular/local e, após finalizar as alterações, sinta-se à vontade para deletar o arquivo `bash.md`.

---

### Opção A: Deploy Isolado por Empresa (Padrão e Recomendado)

Injeta o CSS e JS compilados exclusivamente na empresa alvo indicada na URL do cURL (`PUT /companies/:id`), ativando `useCustomCss: true` sem impactar as demais instâncias:

```bash
npm run deploy
# ou
./deploy.sh
```

*O script realiza o build automaticamente, lê o `bash.md`, substitui os campos `customCss`, `customJs` e `useCustomCss: true` no payload JSON e dispara a atualização para a empresa.*

---

### Opção B: Deploy Global (Todas as Empresas)

Aplica o redesign para todas as empresas da plataforma e para as telas públicas (Login e Cadastro), atualizando os endpoints centrais `/settings/customCssFrontend` e `/settings/customJsFrontend`:

```bash
npm run deploy:global
# ou
node deploy.js --global
```

*O script reutiliza automaticamente os headers de autenticação e a URL base já salvos em `bash.md`. Não é necessário digitar tokens ou URLs adicionais.*

> 💡 **Nota sobre expiração**: Se o token de sessão expirar (erro HTTP 401 ou 403), basta salvar novamente qualquer item no painel do navegador, copiar o novo cURL e colar no `bash.md`.

---

## ⚠️ Boas Práticas & Armadilhas do Material-UI (React)

- **Cuidado com `!important`**: O Material-UI injeta estilos com alta especificidade via `<style data-jss>`. Para sobrescrever determinados componentes, pode ser necessário o uso comedido de `!important`.
- **Modais e Overlays**: Modais renderizam via React Portals diretamente em `document.body`. Use `.custom-css-modal` e `.MuiDialog-root` para estilizá-los sem quebrar a centralização nativa.
- **Registro de Casos**: Sempre que solucionar um bug complexo do Material-UI ou React, registre no template em [APRENDIZADOS-E-DIRETRIZES.md](./APRENDIZADOS-E-DIRETRIZES.md).

---

## 📚 Documentação de Suporte

- 📖 [Customizacao-CSS-JS.md](./Customizacao-CSS-JS.md): Explicação detalhada da arquitetura de duas camadas.
- 🎯 [Ancoras-CSS_V2.md](./Ancoras-CSS_V2.md): Guia de seletores, classes e atributos de estado da plataforma.
- 📝 [APRENDIZADOS-E-DIRETRIZES.md](./APRENDIZADOS-E-DIRETRIZES.md): Histórico e template de registro de armadilhas.
- 🤖 [AGENTS.md](./AGENTS.md): Diretrizes para agentes de inteligência artificial pareados no projeto.

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [ISC](./package.json).
