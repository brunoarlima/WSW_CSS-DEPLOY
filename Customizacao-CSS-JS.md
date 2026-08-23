# Customização de CSS e JS

Duas camadas, uma geral e uma por empresa. As duas somam.

| Camada | Onde o superadmin edita | Vale para | Quando é aplicada |
|---|---|---|---|
| **Geral** | Configurações → Cores (`customCssFrontend` / `customJsFrontend`) | toda a plataforma | desde o carregamento da página, inclusive **login e cadastro** |
| **Da empresa** | modal da empresa → aba **Configurações** | só aquela empresa | **depois do login** |

---

## Camada geral

É a de sempre, sem mudança. Como carrega antes de existir usuário logado, ela
também veste as telas públicas (login, cadastro, recuperação de senha).

## Camada por empresa

No modal de edição da empresa, na aba **Configurações**, junto do Modo Híbrido
e do Modo Alternativo:

- **Usar o CSS personalizado geral** — ligado (padrão), a empresa herda o CSS
  geral. Desligado, ela fica com o layout original do painel.
- **CSS desta empresa** — CSS aplicado só para ela, depois do login.
- **JS desta empresa** — JS executado só para ela, depois do login.

### Por que não existe "desligar o JS geral"

JS não se desexecuta. Para uma empresa não rodar o JS geral, ele teria que
esperar o login para saber de quem se trata — e aí ele deixaria de rodar nas
telas de login e cadastro, que é onde parte dele existe. Então **o JS geral vale
para todas as empresas** e, por empresa, o JS apenas **soma**.

Quem quiser desfazer algo do JS geral em uma empresa faz isso pelo JS dela
(remover um listener, esconder um elemento, reverter um valor).

### Ordem de aplicação

```
<head>
  <style id="custom-css-frontend">   ← geral   (desligável por empresa)
  <style id="custom-css-company">    ← empresa (sempre depois, então vence empates)
<body>
  <script id="custom-js-frontend">   ← geral
  <script id="custom-js-company">    ← empresa
```

Empate de especificidade vai para o CSS da empresa, porque ele entra depois no
`<head>`. Regra mais específica continua ganhando das duas — para vencer o
Material-UI às vezes é preciso `!important`, igual no CSS geral.

### Detalhes que importam

- **Login e cadastro não mudam.** Ali ainda não se sabe qual é a empresa; o CSS
  daquelas telas é o geral e ponto.
- **Desligar o CSS geral não apaga nada.** O `<style>` continua no DOM com
  `media="not all"`. Sai da empresa (logout) e ele volta a valer na mesma aba.
- **O JS da empresa roda uma vez por carregamento.** Editar o campo e salvar só
  tem efeito no próximo carregamento da página — de novo, JS não se desexecuta.
- **JS com erro de sintaxe não é injetado.** É validado antes (`new Function`) e
  o erro aparece no console como `[custom-js-empresa]`, em vez de quebrar calado.
- **O JS da empresa roda dentro de um `try/catch`.** Um erro nele não sobe como
  exceção não tratada da aplicação.
- **Empresa criada antes desta versão continua igual.** A coluna nasce ligada.

### Âncoras disponíveis

O CSS por empresa usa as mesmas âncoras do CSS geral. Três regras cobrem quase
tudo:

| Onde | Padrão |
|---|---|
| Página | `#custom-css-<nome-da-página>` no container |
| Modal | `.custom-css-modal` (todos) **+** `.custom-css-modal-<nome>` (aquele) |
| Tema | `body[data-theme="dark"]` / `[data-theme="light"]` |

Classe diz **onde**; atributo `data-*` diz **quando**. Não existe classe para
"mensagem que falhou" — existe `.custom-css-msg-bubble[data-status="pending"]`.

📖 **O catálogo completo está em [Ancoras-CSS.md](./Ancoras-CSS.md)**: todas as
páginas, modais e âncoras específicas, mais os atributos de estado com o que
cada um significa. (Os totais ficam lá, e não aqui, porque lá eles se atualizam
sozinhos.)

Aquele arquivo é **gerado a partir do código** (`node
frontend/scripts/lista-ancoras.js`). Não é preferência de estilo: a lista
anterior era escrita à mão e chegou a ficar ~370 âncoras atrás do código,
enquanto continuava dizendo que estava completa — que é o pior jeito de uma
documentação envelhecer, porque quem lê acredita nela.

---

## Camada do Chat Externo (Modo Alternativo)

A página que o cliente final abre pelo link (`/chat/`) é um **HTML estático
próprio**, servido sem login. Ela não passa pelo React nem pelo caminho que
aplica as duas camadas acima — por isso tem um campo só dela.

**Campo:** `Companies.chatCss`. Editado em *Empresas → Configurações →
CSS do Chat Externo*.

### Por que é um campo separado, e não o `customCss`

O `customCss` é escrito contra o DOM da plataforma — `.custom-css-msg-bubble`,
`.ticket-preview`, as classes do Material-UI. **Nada disso existe naquela
página**, que tem marcação própria.

Servir o mesmo blob nas duas telas não levaria a customização junto: levaria só
o efeito colateral das regras **amplas** — `body`, `*`, `font-family`, resets —
que casariam onde não deviam. Na prática, quem já tem CSS salvo veria a página
do cliente final mudar de aparência sozinha ao subir a versão, sem ter pedido
nada.

Campo separado significa que **nada muda até alguém escrever algo ali**.

### Âncoras da página

| Âncora | O quê |
|---|---|
| `.custom-css-chat-app` | a tela inteira |
| `.custom-css-chat-header` | o topo |
| `.custom-css-chat-avatar` / `-title` / `-subtitle` | foto, nome e linha de status |
| `.custom-css-chat-banner` | a faixa de aviso (conversa encerrada) |
| `.custom-css-chat-messages` | a área de conversa |
| `.custom-css-chat-row` | cada mensagem |
| `.custom-css-chat-bubble` | o balão |
| `.custom-css-chat-meta` | hora e checks |
| `.custom-css-chat-media` / `-doc` / `-caption` | imagem/áudio/vídeo, anexo e legenda |
| `.custom-css-chat-date-divider` | o divisor de data |
| `.custom-css-chat-composer` | a barra de digitação |
| `.custom-css-chat-input` / `-mic` / `-send` | campo, microfone e botão de enviar |
| `.custom-css-chat-screen` | a tela de carregando/erro |
| `.custom-css-chat-lightbox` | a imagem ampliada |

Atributos na `.custom-css-chat-row`:

| Atributo | Valores |
|---|---|
| `data-autor` | `contato` (o visitante) · `atendente` |
| `data-media-type` | `text` · `image` · `audio` · `video` · `doc` |
| `data-status` | `sent` · `received` · `pending` · `failed` |

> ⚠️ **Atenção com `out`/`in`.** As classes originais da página continuam lá,
> mas ali `out` é a mensagem do **visitante** — o inverso do `fromMe` do resto
> da plataforma. Use `data-autor`, que não tem essa inversão.

Exemplo:

```css
.custom-css-chat-header { background: #101014; }
.custom-css-chat-row[data-autor="atendente"] .custom-css-chat-bubble {
  background: #1f6feb;
  color: #fff;
}
.custom-css-chat-row[data-status="failed"] .custom-css-chat-bubble {
  outline: 1px solid #d33;
}
```

### Como chega até lá

Vem no `GET /external-chat/:companyId/:uuid/config`, que a página já chamava —
sem endpoint novo, herdando o gate de `alternativeMode` e o rate limit que já
protegem essa rota. É aplicado num `<style id="custom-css-chat">` no fim do
`<head>`, via `textContent` (nunca `innerHTML`), pelo mesmo motivo das outras
camadas: não há como sair de um `</style>` para um `<script>`.

**Só CSS.** A página é aberta por clientes finais, fora do painel; JS
customizado ali é outra classe de risco e não entrou.

---

## Endpoint

`GET /companies/customization` — exige login comum (não é rota de superadmin).
Devolve a customização **da empresa do token**, então não há como pedir a de
outra:

```json
{ "useCustomCss": true, "customCss": "", "customJs": "" }
```

## Arquivos

| Papel | Caminho |
|---|---|
| Colunas | `backend/src/database/migrations/20260803000001-add-custom-css-js-to-Companies.ts` |
| Model | `backend/src/models/Company.ts` |
| Endpoint | `backend/src/controllers/CompanyCustomizationController.ts` |
| Aplicação no front | `frontend/src/components/CompanyCustomization/index.js` |
| Camada geral | `frontend/src/App.js` |
| Edição (superadmin) | `frontend/src/components/CompanyModal/index.js` (aba Configurações) |
| Coluna do Chat Externo | `backend/src/database/migrations/20260803000008-add-chatCss-to-Companies.ts` |
| Entrega ao Chat Externo | `backend/src/controllers/ExternalChatController.ts` (`getConfig`) |
| Página do Chat Externo | `frontend/public/chat/index.html` |
| Catálogo de âncoras | `docs/Ancoras-CSS.md` (gerado) |
| Gerador do catálogo | `frontend/scripts/lista-ancoras.js` |
