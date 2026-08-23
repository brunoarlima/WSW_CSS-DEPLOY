# Aprendizados, Gotchas & Diretrizes Técnicas (React + Material-UI + CSS Customizado)

Este documento registra o histórico de desafios, causas-raiz, erros enfrentados, soluções definitivas e boas práticas descobertas durante o desenvolvimento do redesign visual e funcional do **NextyChat / WSW**.

---

## 1. Contexto Arquitetural da Aplicação

- **Stack Base**: SPA em **React** utilizando componentes e temas do **Material-UI (MUI v4)** estilizados originalmente via JSS (`makeStyles`).
- **Mecanismo de Customização**: O redesign é aplicado dinamicamente em runtime através de injeção de `<style id="custom-css-frontend">` e `<script id="custom-js-frontend">`.
- **Desafio Central**: Modificar profundamente o visual e a experiência (UX/UI) sem acesso direto aos arquivos fonte JSX/React do backend, garantindo que o Material-UI nativo não quebre em diferentes telas, modais e fluxos.

---

## 2. 📋 Histórico de Problemas, Causas-Raiz e Soluções

### 🛑 Caso 1: Vão cinza de ~56px abaixo da barra de digitação (Mobile / PWA)
- **Sintoma Visual**: No celular e no PWA, o campo de digitação (composer) ficava flutuando 56px acima do rodapé, deixando uma faixa cinza vazia embaixo.
- **O que deu errado**:
  - No WhaTicket / WSW original, a barra de abas (`BottomNavigation`) ficava fixa no rodapé da viewport com altura padrão de `56px`.
  - Para evitar que as mensagens ficassem escondidas atrás dessa barra, o código React/JSS original aplicava `height: calc(100% - 56px)` ou `paddingBottom: 56px` no container do ticket (`TicketsManager` / `mainPaper`).
  - No redesign, a `BottomNavigation` foi movida para o **topo** da tela como um *segmented control*. No entanto, o container do chat continuava subtraindo 56px na parte inferior.
- **Solução Definitiva**:
  1. **CSS (`09-mobile.css`)**: Forçar `height: 100% !important; max-height: 100% !important; padding-bottom: 0 !important; margin-bottom: 0 !important;` em toda a cadeia de elementos pais (`#custom-css-content`, `.MuiPaper-root`, `.MuiBox-root`, `#drawer-container`).
  2. **Flexbox**: Definir o container de mensagens (`#messagesList`) com `flex: 1 1 auto; min-height: 0; overflow-y: auto;` e o composer com `margin-top: auto; position: relative; bottom: 0;`.
  3. **JS (`04-mobile-fixes.js`)**: Rotina que limpa dinamicamente estilos inline residuais de `paddingBottom = 56px` que o React insere via prop `style`.

---

### 🛑 Caso 2: Vão em branco gigante no topo da tela mobile
- **Sintoma Visual**: Após aplicar `display: flex; flex-direction: column;` no `<main>`, surgiu um espaço em branco enorme empurrando as abas e o chat para o meio da tela.
- **O que deu errado**:
  - O layout do Material-UI insere um elemento vazio `<div class="jss860"></div>` (o `appBarSpacer` / `theme.mixins.toolbar`) logo no início do `<main>` para compensar a barra do topo de 48px.
  - Ao transformar o `<main>` em container Flexbox sem especificar `flex: 0 0 48px` para os filhos diretos, o navegador fez o espaçador vazio crescer dinamicamente (`flex-grow`), ocupando centenas de pixels livres.
- **Solução Definitiva**:
  - Travar rigidamente a altura do espaçador no CSS:
    ```css
    main#custom-css-content > div:first-child,
    main#custom-css-content > div[class*="jss860"],
    .appBarSpacer {
      height: 48px !important;
      min-height: 48px !important;
      max-height: 48px !important;
      flex: 0 0 48px !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    ```

---

### 🛑 Caso 3: Ícone de menu `☰` colado no nome do contato
- **Sintoma Visual**: No cabeçalho do atendimento, o botão com o ícone `☰` ficava colado diretamente ao lado do texto `(221) | #3377`, em vez de ficar no canto direito.
- **O que deu errado**:
  - O componente `CardHeader` do Material-UI renderizava o botão de ações inline dentro do fluxo de texto do título, sem propriedades de flexbox ou separação espacial.
- **Solução Definitiva**:
  - Aplicar `display: flex; justify-content: space-between; align-items: center; width: 100%;` no `.MuiCardHeader-root` e `.MuiCardHeader-title`.
  - Forçar `margin-left: auto !important;` no botão de ações/menu.

---

### 🛑 Caso 4: Tags do ticket espremidas e coladas
- **Sintoma Visual**: Os chips de tags (`ADHFG`, `CADASTRO OK`, `1º CONTATO`) ficavam visualmente colados horizontalmente e verticalmente, difíceis de clicar e ler.
- **O que deu errado**:
  - O container estava com `gap: 4px` muito reduzido e os chips com altura mínima de 18px e sem margem de segurança.
- **Solução Definitiva**:
  - Aumentar o respiro do container para `padding: 6px 12px` e `gap: 6px 8px`.
  - Chips calibrados com `height: 22px`, `border-radius: 6px`, `font-size: 0.65rem`, `font-weight: 700` e espaçamento no botão de exclusão `✕`.

---

### 🛑 Caso 5: Botão de limpar todas as tags de uma vez no Autocomplete
- **Sintoma Visual**: No campo de tags do ticket, o Material-UI renderizava um botão com `✕` no final do input (`.MuiAutocomplete-clearIndicator` / `.MuiAutocomplete-endAdornment`). Ao clicar nele sem querer, todas as tags do atendimento eram apagadas instantaneamente.
- **O que deu errado**:
  - Comportamento padrão do `MuiAutocomplete` (`multiple={true}`) que adiciona o `clearIndicator` para resetar o valor do formulário. Em um chat de atendimento, limpar todas as tags com um clique acidental é perigoso para os operadores.
- **Solução Definitiva**:
  - Ocultar e desativar permanentemente o botão via CSS:
    ```css
    .custom-css-ticket-tags .MuiAutocomplete-clearIndicator,
    .custom-css-ticket-tags .MuiAutocomplete-endAdornment,
    .custom-css-ticket-tags button[aria-label="Clear"] {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    ```

---

### 🛑 Caso 6: Botão de ações do cabeçalho com ícone cru e descentralizado
- **Sintoma Visual**: O botão de abrir as ações do ticket no mobile exibia um ícone cru de hambúrguer com seta (`d="M3 18..."`) e ficava flutuando no meio do cabeçalho logo após o número do protocolo, em vez de ficar na extremidade direita.
- **O que deu errado**:
  - 1. O container `.MuiCardHeader-root` ocupava largura dinâmica indefinida empurrando o container do botão (`div.jss1121` com 98px de largura) sem fixar no extremo direito.
  - 2. A substituição do SVG por JavaScript era sobrescrita pelo React quando o estado do componente mudava (re-render nativo).
- **Solução Definitiva**:
  - **CSS ([src/css/05-ticket-header.css](file:///home/adminbruno/Projetos/css_wsw/src/css/05-ticket-header.css))**:
    - Travar `.MuiCardHeader-root` com `max-width: calc(100% - 44px) !important;` e colocar o container do botão com `margin-left: auto !important; margin-right: 0 !important;`.
    - **Máscara SVG CSS Pura (`-webkit-mask-image`)**: Oculta o `<svg>` interno e desenha os 3 pontinhos (`⋮`) no pseudo-elemento `.MuiIconButton-label::before` via CSS puro. Isso é 100% imune a re-renders do React, não pisca e herda a cor do tema automaticamente!

---

### 🛑 Caso 7: Divs irmãs vazias inflando a largura do container de ações (98px)
- **Sintoma Visual**: Mesmo aplicando `margin-left: auto`, o botão de 3 pontinhos permanecia afastado ~64px da borda direita da tela. No DevTools, o container `div.jss1089` media `98 x 50px`.
- **O que deu errado**:
  - O Material-UI renderizava 4 elementos filhos irmãos vazios (`<div class="jss1093"></div>`, `<div class="jss1120"></div>`) logo após o botão, que funcionavam como células flex vazias reservando espaço à direita.
- **Solução Definitiva**:
  - **CSS**: Ocultar todos os elementos irmãos não-botão dentro do container com `display: none !important; width: 0 !important;`.
  - **JS**: Rotina que varre `parent.children` e oculta nós vazios, travando `parent.style.maxWidth = '40px'`.

---

### 🛑 Caso 8: Menu popover de ações mobile desformatado e desalinhado
- **Sintoma Visual**: A barra vertical dropdown de ações que abre no mobile (`custom-css-ticket-actions-menu`) renderizava uma tira branca alta e crua, com ícones desalinhados e switch de áudio quebrado no meio da lista.
- **Solução Definitiva**:
  - **Container**: Fundo `var(--surface-bg)`, efeito `backdrop-filter: blur(12px)`, cantos arredondados de `14px`, sombra `0 12px 32px rgba(0,0,0,0.15)` e borda delicada.
  - **Itens & Ícones**: Quadrados arredondados de `38x38px` perfeitamente centralizados, com micro-animação de escala (`scale(1.08)`) e cores contextuais no hover (verde para Resolver, laranja para Devolver, azul para Transferir e vermelho para Deletar).
  - **Switch**: Mini switch proporcional de `32x20px` centralizado.

---

### 🛑 Caso 9: Sobreposição do menu dropdown em cima do botão de 3 pontinhos
- **Sintoma Visual / Usabilidade**: O menu popover de ações abria sobrepondo o botão de 3 pontinhos do cabeçalho. Com isso, o primeiro item (`resolve`) ficava exatamente na posição do botão, levando operadores a clicarem nele achando que estavam fechando o menu.
- **Solução Definitiva**:
  - **Posicionamento Abaixo do Botão (`top: 150px !important;`)**: O popover foi deslocado verticalmente para abrir logo abaixo do botão de 3 pontinhos, deixando o botão no cabeçalho 100% visível.
  - **Feedback Intuitivo**: Como o botão de 3 pontinhos permanece visível acima do dropdown, o operador entende intuitivamente que para fechar basta clicar nos 3 pontinhos ou fora do menu, mantendo o ícone original da ação.

---

## 3. 💡 Armadilhas & Gotchas do Material-UI (React)

1. **Classes Hash Dinâmicas (`.jss123`, `.jss849`)**:
   - ⚠️ *Risco*: As classes `.jssXXX` são geradas pelo compilador JSS do Material-UI. Em atualizações ou builds diferentes, os números mudam.
   - ✅ *Regra*: Sempre priorize âncoras fixas da plataforma (`.custom-css-*`, `#custom-css-*`), atributos `[data-*]` ou seletores semânticos do MUI (`.MuiPaper-root`, `.MuiAppBar-root`, `.MuiCardHeader-title`).
2. **Conflito entre Flexbox e `min-height: 0`**:
   - ⚠️ *Gotcha*: No Flexbox, elementos filhos com `overflow: auto` (como a lista de mensagens `#messagesList`) **não rolam** se os containers pais não tiverem `min-height: 0` explícito.
   - ✅ *Regra*: Sempre que um container flex filho tiver rolagem, adicione `min-height: 0 !important;` em toda a cadeia de pais.
3. **Viewport em PWA vs Navegador Mobile (`100vh` vs `100dvh` vs `safe-area-inset`)**:
   - ⚠️ *Gotcha*: No iOS Safari e Chrome Mobile, `100vh` inclui a barra de endereços (causando rolagem dupla). No PWA instalado (standalone), a barra não existe.
   - ✅ *Regra*: Utilizar `height: 100%` com `100dvh` e adicionar `env(safe-area-inset-bottom)` no composer para suportar a barra de navegação por gestos de iPhones e Androids modernos:
     ```css
     padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px)) !important;
     ```
4. **Sobrescrita de Inline Styles do React**:
   - ⚠️ *Gotcha*: Estilos colocados pelo React direto na prop `style={{ ... }}` têm precedência sobre classes CSS normais.
   - ✅ *Regra*: No CSS, use `!important`. No JavaScript, utilize `MutationObserver` para limpar propriedades como `paddingBottom: '56px'` quando o componente renderizar.

---

## 4. 🏗️ Boas Práticas do Projeto

| Área | Prática Recomendada |
|---|---|
| **Arquitetura** | Sempre editar arquivos modulares em `src/css/` e `src/js/`. Nunca editar os bundles gerados diretamente. |
| **Tokens de Cores** | Utilizar variáveis CSS (`var(--brand-primary)`, `var(--surface-bg)`, etc.) para suporte automático a Light/Dark mode. |
| **Validação** | O `build.js` valida a sintaxe do JavaScript antes de gerar o bundle, prevenindo que código quebrado chegue à API. |
| **Git & Commits** | **NUNCA** commitar automaticamente antes que a alteração seja testada e validada visualmente no ambiente. |

---

> 📌 **Como atualizar este documento**: Sempre que um novo comportamento inesperado for identificado e corrigido, documente aqui o **Sintoma**, a **Causa-Raiz** e a **Solução Técnica** aplicada.
