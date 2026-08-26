# Âncoras de CSS

Catálogo dos alvos disponíveis para o CSS personalizado — geral ou por
empresa. Como usar as duas camadas está em
[Customizacao-CSS-JS.md](./Customizacao-CSS-JS.md).

> **Este arquivo é gerado.** Não edite à mão: rode
> `node frontend/scripts/lista-ancoras.js`. O texto explicativo mora no
> script, então regerar não apaga nada.

## Convenções

Três regras cobrem quase tudo — saber elas evita procurar no catálogo:

| Onde | Padrão |
|---|---|
| Página | `#custom-css-<nome-da-página>` no container |
| Modal | `.custom-css-modal` (todos) **+** `.custom-css-modal-<nome>` (aquele) |
| Tema | `body[data-theme="dark"]` / `[data-theme="light"]` |

Classe diz **onde**; atributo `data-*` diz **quando**. Para pintar só a
mensagem que falhou, não existe classe — existe `[data-status="pending"]`.

Para vencer o Material-UI às vezes é preciso `!important`, igual no CSS geral.

## Propriedades que o CSS pode mandar

Quase tudo aqui é só alvo de estilo, mas há um ponto em que o CSS **decide**:

| Propriedade | Onde | O que faz |
|---|---|---|
| `--ticket-actions-visiveis` | `.custom-css-ticket-actions` | quantas ações ficam na barra antes de o resto ir para o menu `⋯`. Sem ela, a barra mede o espaço sozinha |

```css
/* três ações na barra, o resto sempre no menu */
.custom-css-ticket-actions { --ticket-actions-visiveis: 3; }
```

Existe porque a medição automática roda **depois** de qualquer coisa que o
CSS faça, então quando ela erra não há como corrigir por fora. Valor inválido
ou ausente cai na medição normal.

## Atributos de estado

| Atributo | Onde | Valores |
|---|---|---|
| `data-aberto` | painel que o "+" abre no campo de digitação | `true` · `false` — antes o estado só existia como `display: none` inline |
| `data-acao` | cartão do template WABA | `editar-midia-local` — o botão que troca a mídia de exemplo do template |
| `data-acao-funil` | cartão do funil, no CRM v2 | `arquivar` · `reativar` |
| `data-ack` | balão da mensagem | 0–5, o código bruto de entrega do WhatsApp |
| `data-action` | botões do atendimento e do popup de encerramento | na barra: `resolve` · `return` · `transfer` · `schedule` · `task` · `delete` · `invite` · `call` · `files` · `flow` · `opportunity` · `summary` · `analyzer` · `contact-summary` · `accept-audio` · `external-chat-link` · `mais-acoes`. No popup de encerramento: `resolve-silent` (sem mensagem) · `resolve-message` (com mensagem) · `resolve-rating` (com avaliação) — os dois primeiros são idênticos no DOM, só o texto difere |
| `data-active` | item do menu lateral | `true` no item da tela aberta |
| `data-amqp-vazio` | aviso de monitor AMQP sem mensagem | `sem-fila` (nenhuma conexão da empresa passa por RabbitMQ) · `sem-mensagem` (passa, mas nada chegou) |
| `data-answer-from-ia` | sugestão de resposta com IA (barra e cartão sobre o campo, e a aba de Tokens de IA) | no bloco: `barra` · `cartao`. Dentro dele: `sugerir` · `melhorar` · `saldo` · `sugestao` · `texto` · `usar` · `nova` · `descartar`. Na aba do super: `ilimitado` · `abrir-recarga` · `recarga-pontos` · `recarga-observacao` |
| `data-apagada-por` | balão de mensagem apagada | quem apagou (o nome), ou `desconhecido` quando o registro não diz |
| `data-appbar` | botões da barra do topo | `menu` · `msgs` · `notifications` · `announcements` · `theme` · `lang` · `font` · `sound` · `ping` · `refresh` · `collapse` · `user` |
| `data-atrasada` | atividade do CRM (painel e cartão) | `true` quando o prazo passou — o único estado que pede ação agora |
| `data-audio` | gravador de áudio do campo de digitação | no bloco: `gravando` · `pausado`. Dentro dele: `player` · `pausar` · `continuar` |
| `data-auditoria` | cartão da oportunidade no quadro do CRM v2 | o status da auditoria daquela venda |
| `data-auditoria-acao` | botões da fila do auditor | `aprovar` · `reprovar` |
| `data-auditoria-propria` | cartão na fila do auditor | `sim` quando a venda é do próprio auditor — é o cartão que aparece com os botões desligados |
| `data-auditoria-status` | linha do histórico de auditoria | `APROVADA` · `REPROVADA` |
| `data-avatar` | avatar no balão | `contact` · `user` · `none` |
| `data-campo` | formulário de atividade do CRM | `tipo` · `responsavel` · `assunto` · `data` · `hora` · `duracao` |
| `data-campo-responsavel` | campo de responsável no modal da oportunidade | `true` — marca o campo que define de quem é a venda |
| `data-canal` | linha de canal na conciliação de conexões e pílula do monitor AMQP | a chave do grupo (`whatsapp`, `hub`, `instagramInc`, …) |
| `data-carregando` | barra da sugestão de IA | `true` enquanto a IA gera — é por ele que se estiliza o estado "Gerando sugestão…" |
| `data-channel` | cartão do ticket e ícone da conexão | o canal (`whatsapp`, `instagram`, `facebook`, …) |
| `data-channel-filter` | chips de filtro de canal, na página de Conexões | `all` ou a chave do canal. Junto vai `aria-pressed`, que diz se o filtro está ligado |
| `data-collapsed` | menu lateral | `true` quando recolhido |
| `data-conectado` | bloco de conexão do Google Calendar | `true` · `false` |
| `data-conexao` | escolha do tipo de conexão, ao criar uma nova | `sem-aparelho` · `oficial-app-proprio` · `oficial-portal` |
| `data-connection-action` | botões do cartão de conexão | `close-all` · `close-pending` · `templates` · `edit` · `delete` · `qrcode` · `profile` · `sip` · `sip-config` · `hybrid` · `proxy` · `rotate-ip` · `events` · `import-session` · `pair-code` · `passkey` · `reconnect` · `new-qr`. "Fechar Todos" e "Fechar Pendentes" são o mesmo botão no DOM — só o texto difere, e texto morre na troca de idioma |
| `data-connection-color` | etiqueta da conexão no cartão | `green` (hoje é o único valor emitido) |
| `data-connection-id` | cartão da conexão | o id da conexão |
| `data-connection-manual-review` | aviso no cartão da conexão | `true` quando o número está em revisão manual da Meta |
| `data-connection-status` | cartão da conexão | `connected` · `disconnected` · `qrcode` · `opening` · `error`. **É o estado como atributo**: antes ele existia só como cor do chip, e saber que uma conexão caiu exigia ler a cor computada ou o texto "Conectado" — cor muda com o tema e texto muda com o idioma. `PENDING` conta como `opening`; status desconhecido vira `error` |
| `data-deleted` | balão da mensagem | `true` quando apagada |
| `data-dia` | coluna do gráfico de logs do Pixel | a data daquele dia |
| `data-docker-aviso` | avisos do cadastro por app próprio | `numero-canonico` · `metodo-atendido` |
| `data-docker-bloqueio` | alerta de bloqueio no cadastro por app próprio | o tipo do bloqueio devolvido pela Meta |
| `data-docker-campo` | campos de desafio no cadastro por app próprio | `captcha` · `2fa` |
| `data-docker-cooldown` | alerta de espera no cadastro por app próprio | o tipo da espera imposta pela Meta |
| `data-docker-ddi` | campo de DDI no cadastro por app próprio | o DDI escolhido |
| `data-docker-desafio` | bloco do desafio no cadastro por app próprio | `captcha` · `2fa` |
| `data-docker-registro` | etapas do cadastro por app próprio | `numero` · `codigo` |
| `data-edited` | balão da mensagem | `contact` quando o contato editou |
| `data-elapsed-late` | tempo relativo no cartão do ticket | `true` · `false` — a regra simples de "está atrasado", para o CSS não precisar listar quais estados contam como atraso |
| `data-elapsed-status` | tempo relativo no cartão do ticket | `fresh` (até 30 min) · `warning` (até 60) · `late` (acima). Vem junto do `data-elapsed-late`, que é o mesmo em forma de sim/não |
| `data-email-account` | campos e botões do modal de conta de e-mail | `carregar-pastas` · `nova-pasta` · `novo-endereco` |
| `data-embed-bloqueado` | aviso do ticket incorporado quando ele não pode ser aberto | `true` — marca o quadro que explica o motivo em vez da conversa |
| `data-embed-motivo` | aviso do ticket incorporado que não pôde abrir | o motivo, para o CSS separar um do outro (o `data-embed-bloqueado` só diz QUE bloqueou) |
| `data-empresa` | linha da empresa na aba de Tokens de IA | o id dela |
| `data-endereco` | pílula de endereço aceito no modal de conta de e-mail | o endereço que a conta aceita (recebidos pelo destinatário, enviados pelo remetente) |
| `data-erro` | diálogo de erro da Meta | `mensagem` · `campos` · `alterna-bruto` (o botão que mostra a resposta crua da Meta) |
| `data-erro-conexao` | modal do Facebook nativo | `true` no bloco que explica a falha de conexão |
| `data-error` | balão da mensagem | `true` no balão rosa (a plataforma não processou) |
| `data-escopo` | bloco de conexão do Google Calendar | `operador` (cada um conecta a própria agenda) · `empresa` (uma conta para todos) |
| `data-excedente` | linha da empresa na conciliação de conexões | `true` quando ela usa mais conexões do que o plano permite |
| `data-favorite` | cartão do ticket e a estrela dele | `true` · `false` |
| `data-filter` | filtros da lista de atendimento | `scope` · `groups` · `closed` · `unread` · `queues` · `tags` · `users` · `connections` |
| `data-filtro-operador` | filtro de operador no quadro do CRM v2 | `true` — marca o campo |
| `data-filtro-tag` | filtro de etiqueta no quadro do CRM v2 | `true` — marca o campo |
| `data-flow-action` | botões do editor de fluxo | `logs` — abre o histórico de execução do fluxo |
| `data-flow-log-detail` | pilha de detalhe de uma falha do fluxo | o id do registro |
| `data-flow-log-row` | linha de falha do fluxo | o id do registro |
| `data-flow-logs-empty` | aviso de histórico de fluxo vazio | `true` |
| `data-flow-logs-level` | filtro de nível no histórico do fluxo | o nível (`warn`, `error`…) ou `all` |
| `data-flow-logs-list` | tabela de falhas do histórico do fluxo | `true` |
| `data-flow-logs-summary` | tabela de resumo do histórico do fluxo | `true` |
| `data-flow-logs-window` | filtro de janela de tempo no histórico do fluxo | quantas horas |
| `data-fromme` | balão e cartão | `true` quando saiu da plataforma |
| `data-gerenciar-grupos` | botão de gerenciar grupos de template, no cabeçalho de /waba-templates | sem valor — marca o botão que abre o gerenciador |
| `data-gravando` | campo de digitação | `sim` enquanto grava áudio · `nao` fora disso |
| `data-group` | cartão do ticket e CABEÇALHO da conversa aberta | `true` em conversa de grupo. No cabeçalho vale nos três lugares que usam a âncora `custom-css-ticket-header`: a conversa do frame da direita, o ticket em modal e o popup de espiar |
| `data-grupo` | linha de um grupo no gerenciador de grupos de template | o id do grupo |
| `data-grupos-do-template` | seletor de grupos no cartão do template | sem valor — marca o bloco que vincula o template aos grupos |
| `data-grupos-nao-lidos` | botão de trocar de visão | quantos grupos têm mensagem não lida (ausente quando zero) |
| `data-icon` | ícones do topo | `theme` · `status` · `refresh` |
| `data-ilimitado` | pílula de tokens da sugestão de IA (barra e cartão) | `true` na empresa que usa credencial própria e não gasta tokens |
| `data-import-state` | barra de andamento da importação de contatos | `enviando` (arquivo subindo, barra indeterminada) · `processando` (linhas sendo importadas) |
| `data-lane-type` | raia do funil | `IN_PROGRESS` · `WON` · `LOST` |
| `data-lista-de-grupos` | lista do gerenciador de grupos de template | sem valor — marca a lista inteira |
| `data-lugar` | pódio de vendas | `1` · `2` · `3` |
| `data-media-type` | balão da mensagem | `conversation` · `image` · `audio` · `video` · `document` · … |
| `data-mencao` | nome de quem foi marcado com @ | o identificador original (o número que aparecia antes) |
| `data-mencao-contato` | nome de quem foi marcado com @ | o id do contato. **Só existe quando o clique abre conversa privada** — some em grupo e no preview do ticket, então `[data-mencao-contato]` seleciona exatamente os clicáveis |
| `data-menu` | item do menu lateral | o identificador do item |
| `data-menu-group` | grupo do menu lateral | o identificador do grupo |
| `data-message-id` | balão da mensagem | o id da mensagem |
| `data-meta-plataforma` | cartão da conexão oficial nativa | `cloud_api` · `coex`. Ausente quando a conexão não é oficial nativa ou quando ainda não se sabe — a pergunta não se aplica |
| `data-metodo` | opções de método de cadastro do número | a chave do método |
| `data-midia` | prévia de mídia do template WABA | `local` (a que está sendo trocada) · `atual` (a que o template já tem) |
| `data-migracao-destino` | campo de empresa de destino, no modal de migração | sem valor — marca o campo que escolhe para onde migrar |
| `data-migracao-empresa` | linha da empresa no gerenciador | o id da empresa a migrar |
| `data-migracao-inventario` | conteúdo do modal de migração | o id da empresa |
| `data-migracao-tabela` | linha de tabela no inventário da migração | o nome da tabela |
| `data-migracao-teste` | resultado do teste antes de migrar | `ok` · `barrado` |
| `data-mode` | campo de digitação (na caixa externa **e** em `.custom-css-composer-field`) | `normal` · `signature` (assinar) · `internal` (nota interna) · `external` (só canal externo) |
| `data-monitoravel` | pílula de canal no monitor AMQP | `true` no canal que passa por fila e portanto pode aparecer no monitor |
| `data-motivo` | linha do histórico de remarketing | o motivo do registro |
| `data-nivel` | linha do histórico de remarketing | o nível do registro |
| `data-notification-action` | faixa de permissão de notificação | `enable` · `dismiss` |
| `data-novo-grupo` | campo de nome no gerenciador de grupos de template | sem valor — marca o campo de criar grupo |
| `data-operador` | foto do operador | o nome dele |
| `data-operator-id` | linha do ranking | o id do operador |
| `data-origem` | cartão do template WABA | quem criou (`bm`, `wsw`, `desconhecida`) |
| `data-origin` | balão da mensagem | `contact` · `user` (operador) · `app` (celular pareado) · `api` (bot/API) |
| `data-pasta` | caixa de seleção de pasta no modal de conta de e-mail | o caminho IMAP da pasta (ex.: `INBOX`, `INBOX.Comercial`) |
| `data-perfil-erro` | alerta do modal de perfil do número | sem valor — marca o aviso de falha ao carregar ou salvar o perfil |
| `data-permissao` | botões que dependem de permissão (painel do contato e barra de ações) | o estado da permissão daquele botão |
| `data-pixel-logs-day` | campo de dia na tela de logs do Pixel | `true` — marca o campo |
| `data-plataforma` | opções de plataforma no cadastro por app próprio | o id da plataforma |
| `data-produtos` | linha de produtos da oportunidade | quantos itens são |
| `data-queue-chatbot` | cartão do ticket | `true` quando a fila é de chatbot |
| `data-queue-color` | cartão do ticket | a cor da fila |
| `data-queue-id` | cartão do ticket | o id da fila |
| `data-quoted` | balão da mensagem | `true` quando é resposta a outra |
| `data-rascunho` | campo de digitação | `true` quando há texto não enviado — dá para avisar quem sai da conversa com resposta pela metade |
| `data-reconnect-path` | escolha de caminho de reconexão, na página de Conexões | `own` (app próprio) · `aini` |
| `data-reconnect-path-dialog` | diálogo que pergunta o caminho de reconexão | `true` |
| `data-remarketing` | controles da tela de logs de remarketing | `auto-atualizar` · `retencao` |
| `data-selecionando` | campo de digitação | `true` enquanto o modo de selecionar mensagens está ligado |
| `data-selected` | cartão do ticket | `true` no ticket aberto |
| `data-sincroniza-agenda` | opção de sincronizar com o Google Agenda (atividade do CRM e tarefa) | `true` · `false` |
| `data-sip` | widget do webphone minimizado | `abrir-teclado` |
| `data-status` | balão e cartão | no balão: `pending` · `sent` · `received` · `read` · `played`. No cartão: o status do ticket |
| `data-tag-color` | etiqueta | a cor dela |
| `data-tag-id` | etiqueta | o id dela |
| `data-tarefa` | linha de tarefa no resumo do contato, dentro do atendimento | o id da tarefa — a linha inteira abre a tarefa |
| `data-tem-sugestao` | barra da sugestão de IA | `true` quando já existe sugestão gerada — junto do `data-carregando`, cobre os três estados da barra |
| `data-template-groups` | seletor de grupos de template no modal da fila | sem valor — marca o campo que define quais grupos a fila usa |
| `data-testid` | prévias de mídia do template WABA | `previa-video` · `previa-documento` |
| `data-theme` | `<body>` | `dark` · `light` |
| `data-ticket-id` | cartão do ticket | o id |
| `data-ticket-name` | cartão do ticket | o nome do contato |
| `data-ticket-protocol` | cartão do ticket | o protocolo |
| `data-tipo` | atividade do CRM (painel e cartão) | `lembrete` · `reuniao` · `ligacao` · `email` · `visita` · `tarefa` |
| `data-total-servidor` | subtítulo da raia do Kanban | quantos cartões existem NO SERVIDOR naquela etapa — pode ser maior que os carregados na tela |
| `data-unread` | cartão do ticket | quantas mensagens não lidas |
| `data-user-color` | cartão do ticket | a cor do operador |
| `data-user-field` | campos do modal de usuário | o nome do campo (`webphoneTipo`, `webphoneAcaoDoBotao`…) |
| `data-user-section` | blocos do modal de usuário | `webphone-widget` · `webphone-nativo` |
| `data-user-status` | linha do usuário na tela de Usuários | `online` · `offline` · `inactive` |
| `data-webphone` | botão de chamada na barra de ações | o modo de webphone do operador |
| `data-window` | faixa da conversa (Meta) | estado da janela de 24h |

Exemplo — destacar mensagem não entregue e nota interna:

```css
.custom-css-msg-bubble[data-status="pending"] { opacity: .6; }
.custom-css-msg-bubble[data-origin="api"]     { border-left: 2px solid #888; }
[data-mode="private"] textarea                { background: #fffbe6; }
```

## Páginas

97 telas, uma âncora cada, no container:

```
custom-css-ai                         custom-css-amqp-messages              custom-css-announcement-history
custom-css-announcements              custom-css-appbar                     custom-css-atendimento-report
custom-css-atendimentos               custom-css-audit-logs                 custom-css-bot-files
custom-css-calls-report               custom-css-campaign-report            custom-css-campaigns
custom-css-campaigns-config           custom-css-chats                      custom-css-companies
custom-css-company-report             custom-css-connections                custom-css-contact-list-items
custom-css-contact-lists              custom-css-contact-permissao-chamada  custom-css-contacts
custom-css-contacts-duplicates        custom-css-content                    custom-css-dashboard
custom-css-dashboard-legado           custom-css-docker-registro            custom-css-email-accounts
custom-css-emails                     custom-css-facebook-erro              custom-css-financeiro
custom-css-flow-categories            custom-css-flow-default               custom-css-flow-whatsapp
custom-css-flow-whatsapp-title        custom-css-flowbuilder-config         custom-css-flowbuilders
custom-css-forgotpassword             custom-css-google-calendar            custom-css-gpt-analyzer
custom-css-group-management           custom-css-helps                      custom-css-instagram-posts
custom-css-integrations               custom-css-kanban                     custom-css-kanban-filas
custom-css-kanban-grupos              custom-css-kanban-team                custom-css-login
custom-css-menu-suspenso              custom-css-messages-backup            custom-css-mikweb
custom-css-oportunidade-funil         custom-css-oportunidades              custom-css-pipeline
custom-css-pixel-logs                 custom-css-products                   custom-css-prompts
custom-css-propostas                  custom-css-queue-categories           custom-css-queues
custom-css-quick-messages             custom-css-ratings                    custom-css-ratings-report
custom-css-remarketing-logs           custom-css-reports                    custom-css-reports-group-tickets
custom-css-reports-research           custom-css-reports-tickets            custom-css-reports-tickets-duration
custom-css-reports-tickets-duration-detail custom-css-sales-ranking              custom-css-schedules
custom-css-services                   custom-css-settings                   custom-css-shell
custom-css-short-links                custom-css-signup                     custom-css-sip-ramais
custom-css-sistema-postgres           custom-css-sistema-redis              custom-css-subscription
custom-css-survey                     custom-css-tags                       custom-css-task-agenda
custom-css-thirdpart                  custom-css-ticket-embed               custom-css-ticket-embed-blocked
custom-css-ticket-embed-error         custom-css-todolist                   custom-css-translation-manager
custom-css-typebot                    custom-css-user-whatsapps             custom-css-users
custom-css-visitors-live              custom-css-waba-templates             custom-css-webhook-config
custom-css-webhooks
```

## Modais

174 modais. Todos carregam também `custom-css-modal`, então
`.custom-css-modal { border-radius: 12px; }` pega os 174 de uma vez.

```
custom-css-modal-advanced-search                  custom-css-modal-agenda
custom-css-modal-amqp-message                     custom-css-modal-announcement
custom-css-modal-announcement-alert               custom-css-modal-announcements-popover
custom-css-modal-botfile                          custom-css-modal-botfile-url
custom-css-modal-bulk-extra-fields                custom-css-modal-calendar-config
custom-css-modal-calls-report                     custom-css-modal-campaign
custom-css-modal-change-password                  custom-css-modal-change-plan
custom-css-modal-chat                             custom-css-modal-chat-messages
custom-css-modal-color-picker                     custom-css-modal-companies
custom-css-modal-company                          custom-css-modal-confirmation
custom-css-modal-contact                          custom-css-modal-contact-list
custom-css-modal-contact-list-item                custom-css-modal-contact-list-items
custom-css-modal-contact-modal-ticket             custom-css-modal-contact-send
custom-css-modal-contact-summary                  custom-css-modal-contacts
custom-css-modal-crm-funil                        custom-css-modal-crm-importar
custom-css-modal-crm-metas                        custom-css-modal-crm-motivo-perda
custom-css-modal-crm-quem-acessa                  custom-css-modal-crm-raia
custom-css-modal-cross-domain-meta-oauth          custom-css-modal-dashboard-settings
custom-css-modal-docker-code                      custom-css-modal-docker-perfil
custom-css-modal-email-account                    custom-css-modal-email-compose
custom-css-modal-erro-meta                        custom-css-modal-espiar-conversa
custom-css-modal-facebook-aini                    custom-css-modal-facebook-queue
custom-css-modal-file-upload                      custom-css-modal-file-upload-hub
custom-css-modal-flow-add-audio                   custom-css-modal-flow-add-img
custom-css-modal-flow-add-text                    custom-css-modal-flow-add-video
custom-css-modal-flow-asaas                       custom-css-modal-flow-away
custom-css-modal-flow-button                      custom-css-modal-flow-carousel
custom-css-modal-flow-category                    custom-css-modal-flow-close
custom-css-modal-flow-close-quick                 custom-css-modal-flow-condition
custom-css-modal-flow-contact                     custom-css-modal-flow-external-chat-link
custom-css-modal-flow-http-request                custom-css-modal-flow-internal
custom-css-modal-flow-interval                    custom-css-modal-flow-ixc
custom-css-modal-flow-location                    custom-css-modal-flow-logs
custom-css-modal-flow-menu                        custom-css-modal-flow-new-flow
custom-css-modal-flow-new-gpt                     custom-css-modal-flow-new-typebot
custom-css-modal-flow-oportunidade                custom-css-modal-flow-pixel
custom-css-modal-flow-question                    custom-css-modal-flow-queue
custom-css-modal-flow-randomizer                  custom-css-modal-flow-remove-tag
custom-css-modal-flow-rodizio                     custom-css-modal-flow-single-block
custom-css-modal-flow-tag                         custom-css-modal-flow-template
custom-css-modal-flow-user                        custom-css-modal-flow-variable
custom-css-modal-flow-wbh                         custom-css-modal-flow-whats-app
custom-css-modal-flowbuilder                      custom-css-modal-fluxo-recuperar
custom-css-modal-fluxo-restaurar                  custom-css-modal-forward-message
custom-css-modal-grupo-criar                      custom-css-modal-grupo-editar
custom-css-modal-grupo-entrar                     custom-css-modal-grupo-info
custom-css-modal-grupo-membros                    custom-css-modal-grupo-participantes
custom-css-modal-hybrid-mode                      custom-css-modal-import-progress
custom-css-modal-import-session                   custom-css-modal-information
custom-css-modal-instagram-aini                   custom-css-modal-invite-operators
custom-css-modal-invoices                         custom-css-modal-kanban
custom-css-modal-kanban-team                      custom-css-modal-lista-por-aniversario
custom-css-modal-lista-por-conexao                custom-css-modal-lista-por-grupo
custom-css-modal-lista-por-tag                    custom-css-modal-message-options-menu
custom-css-modal-meta-embedded-signup             custom-css-modal-meta-sip
custom-css-modal-migracao-empresa                 custom-css-modal-migrate-tickets
custom-css-modal-modal-users                      custom-css-modal-new-ticket-modal-ticket
custom-css-modal-new-ticket-modal-ticket-alternativa custom-css-modal-new-ticket-modal-ticket-official
custom-css-modal-newticket                        custom-css-modal-oportunidades
custom-css-modal-paircode                         custom-css-modal-passkey-pair
custom-css-modal-pontos-de-iamanager              custom-css-modal-product
custom-css-modal-prompt                           custom-css-modal-proposta-config
custom-css-modal-proxy-diagnostic                 custom-css-modal-qrcode
custom-css-modal-queue                            custom-css-modal-queue-category
custom-css-modal-quick-message                    custom-css-modal-rating
custom-css-modal-ratings-report                   custom-css-modal-rcs
custom-css-modal-remarketing-log                  custom-css-modal-sales-goals
custom-css-modal-schedule                         custom-css-modal-service
custom-css-modal-short-link                       custom-css-modal-sip-dialer
custom-css-modal-sip-receiver                     custom-css-modal-sistema-postgres
custom-css-modal-sistema-redis                    custom-css-modal-socket-disconnect
custom-css-modal-subscription                     custom-css-modal-tag
custom-css-modal-tag-contacts                     custom-css-modal-tarefa-comentarios
custom-css-modal-tarefa-compartilhar              custom-css-modal-task
custom-css-modal-telegram-aini                    custom-css-modal-template-groups
custom-css-modal-ticket                           custom-css-modal-ticket-files
custom-css-modal-ticket-files-preview             custom-css-modal-ticket-resumo
custom-css-modal-tiktok                           custom-css-modal-transfer-carteira
custom-css-modal-transfer-ticket-modal-custom     custom-css-modal-translation-manager
custom-css-modal-two-factor-setup                 custom-css-modal-user
custom-css-modal-usuario-fechar-tickets           custom-css-modal-usuario-transferir-tickets
custom-css-modal-waba-template                    custom-css-modal-waba-template-excluir
custom-css-modal-waba-template-json               custom-css-modal-waba-template-midia-local
custom-css-modal-waba-template-new                custom-css-modal-wabatemplate-preview
custom-css-modal-webchat                          custom-css-modal-webhook
custom-css-modal-whatsapp                         custom-css-modal-whatsapp-docker
custom-css-modal-whatsmeow-events                 custom-css-modal-whatsmeow-sip
```

## Âncoras específicas, por área

Partes de tela com alvo próprio — o balão da mensagem, o cartão do funil, a
barra de ações. Âncora usada em mais de uma área aparece em todas.

| Área | Âncoras |
|---|---|
| `AmqpMessages` | `.custom-css-amqp-vazio` |
| `Annoucements` | `.custom-css-btn-open-form` |
| `AnswerFromIABar` | `.custom-css-answer-from-ia` · `.custom-css-answer-from-ia-actions` · `.custom-css-answer-from-ia-bar` · `.custom-css-answer-from-ia-card` · `.custom-css-answer-from-ia-header` · `.custom-css-answer-from-ia-points` · `.custom-css-answer-from-ia-text` · `.custom-css-button` · `.custom-css-button-answer-from-ia-dismiss` · `.custom-css-button-answer-from-ia-improve` · `.custom-css-button-answer-from-ia-regenerate` · `.custom-css-button-answer-from-ia-suggest` · `.custom-css-button-answer-from-ia-toggle` · `.custom-css-button-answer-from-ia-use` |
| `AnswerFromIASettings` | `.custom-css-button` · `.custom-css-button-answer-from-ia-save` · `.custom-css-page` · `.custom-css-page-answer-from-ia` |
| `App` | `.custom-css-dark` |
| `AtendimentoReport` | `.custom-css-atendimento-report-pdf` |
| `AtividadesDaOportunidade` | `.custom-css-atividade` · `.custom-css-atividade-link` · `.custom-css-atividade-prazo` · `.custom-css-atividades` · `.custom-css-atividades-agenda` · `.custom-css-atividades-criar` · `.custom-css-atividades-form` · `.custom-css-atividades-historico` |
| `AvatarOperador` | `.custom-css-avatar-operador` |
| `BarraDeAcoes` | `.custom-css-ticket-actions-overflow` · `.custom-css-ticket-actions-overflow-menu` |
| `BloqueioDeEspera` | `.custom-css-bloqueio-espera` |
| `ButtonWithSpinner` | `.custom-css-btn-confirm` |
| `Campaigns` | `.custom-css-btn-open-form` |
| `Chat` | `.custom-css-page-title` |
| `ConciliacaoConexoes` | `.custom-css-conciliacao-conexoes` |
| `ConfirmationModal` | `.custom-css-btn-cancel` · `.custom-css-btn-confirm` |
| `Connections` | `.custom-css-connection-card` · `.custom-css-connection-filters` · `.custom-css-connection-manual-review` · `.custom-css-connection-meta` · `.custom-css-connection-platform` · `.custom-css-reconnect-path-dialog` |
| `ContactDrawer` | `.custom-css-contact-drawer` |
| `ContactListItems` | `.custom-css-btn-open-form` |
| `Contacts` | `.custom-css-btn-open-form` · `.custom-css-contacts-import-progress` · `.custom-css-contacts-table` |
| `ContactsDuplicates` | `.custom-css-contacts-duplicates-search` · `.custom-css-contacts-duplicates-search-clear` |
| `ContactsStats` | `.custom-css-contacts-stats` · `.custom-css-contacts-stats-toggle` |
| `ContactTag` | `.custom-css-contact-tag` |
| `CrmPipelineSelect` | `.custom-css-user-modal-funis` |
| `CrmV2Auditoria` | `.custom-css-crm-auditoria` · `.custom-css-crm-auditoria-card` · `.custom-css-crm-auditoria-conteudo` · `.custom-css-crm-auditoria-historico` · `.custom-css-crm-auditoria-historico-card` · `.custom-css-crm-auditoria-tabs` |
| `CrmV2Board` | `.custom-css-crm-board` · `.custom-css-crm-board-card` · `.custom-css-crm-board-nova` · `.custom-css-crm-board-raia` · `.custom-css-crm-board-raia-sem-etapa` · `.custom-css-crm-board-raias` · `.custom-css-crm-board-refresh` · `.custom-css-crm-card-auditoria` · `.custom-css-crm-motivo-perda` |
| `CrmV2Funis` | `.custom-css-crm-funil` · `.custom-css-crm-funil-modal` · `.custom-css-crm-funis` · `.custom-css-crm-funis-novo` · `.custom-css-crm-importar` · `.custom-css-crm-importar-modal` · `.custom-css-crm-quem-acessa` · `.custom-css-crm-quem-acessa-modal` · `.custom-css-crm-raia` · `.custom-css-crm-raia-modal` |
| `CrmV2Ranking` | `.custom-css-crm-metas-modal` · `.custom-css-crm-ranking` · `.custom-css-crm-ranking-linha` · `.custom-css-crm-ranking-metas` |
| `DashboardNew` | `.custom-css-dash-card` |
| `EmailAccountModal` | `.custom-css-email-account-enderecos` |
| `FlowBuilder` | `.custom-css-btn-open-form` |
| `FlowBuilderConfig` | `.custom-css-flowbuilder-actions` · `.custom-css-flowbuilder-actions-search` |
| `FlowCategories` | `.custom-css-btn-open-form` |
| `GoogleCalendarConexao` | `.custom-css-google-calendar-conexao` |
| `GroupManagement` | `.custom-css-btn-open-form` |
| `helpers` | `.custom-css-composer-field` · `.custom-css-mencao` |
| `Kanban` | `.custom-css-kanban-board` · `.custom-css-kanban-btn-empty-lanes` · `.custom-css-kanban-btn-filters` · `.custom-css-kanban-btn-refresh` · `.custom-css-kanban-btn-tag-filter` · `.custom-css-kanban-card` · `.custom-css-kanban-col` · `.custom-css-kanban-col-body` · `.custom-css-kanban-col-header` · `.custom-css-kanban-col-title` · `.custom-css-kanban-filters` · `.custom-css-kanban-lanes` · `.custom-css-kanban-search` · `.custom-css-kanban-stat-card` · `.custom-css-kanban-stats` · `.custom-css-page-title` |
| `KanbanFilas` | `.custom-css-kanban-filas-board` · `.custom-css-kanban-filas-btn-empty-lanes` · `.custom-css-kanban-filas-btn-filters` · `.custom-css-kanban-filas-btn-refresh` · `.custom-css-kanban-filas-card` · `.custom-css-kanban-filas-col` · `.custom-css-kanban-filas-col-body` · `.custom-css-kanban-filas-col-header` · `.custom-css-kanban-filas-col-title` · `.custom-css-kanban-filas-filters` · `.custom-css-kanban-filas-lanes` · `.custom-css-kanban-filas-search` · `.custom-css-kanban-filas-stat-card` · `.custom-css-kanban-filas-stats` · `.custom-css-page-title` |
| `KanbanGrupos` | `.custom-css-kanban-grupos-board` · `.custom-css-kanban-grupos-btn-empty-lanes` · `.custom-css-kanban-grupos-btn-filters` · `.custom-css-kanban-grupos-btn-refresh` · `.custom-css-kanban-grupos-card` · `.custom-css-kanban-grupos-col` · `.custom-css-kanban-grupos-col-body` · `.custom-css-kanban-grupos-col-header` · `.custom-css-kanban-grupos-col-title` · `.custom-css-kanban-grupos-filters` · `.custom-css-kanban-grupos-lanes` · `.custom-css-kanban-grupos-search` · `.custom-css-kanban-grupos-stat-card` · `.custom-css-kanban-grupos-stats` · `.custom-css-page-title` |
| `KanbanTeam` | `.custom-css-kanban-team-board` · `.custom-css-kanban-team-btn-empty-lanes` · `.custom-css-kanban-team-btn-filters` · `.custom-css-kanban-team-btn-refresh` · `.custom-css-kanban-team-btn-tag-filter` · `.custom-css-kanban-team-card` · `.custom-css-kanban-team-col` · `.custom-css-kanban-team-col-body` · `.custom-css-kanban-team-col-header` · `.custom-css-kanban-team-col-title` · `.custom-css-kanban-team-filters` · `.custom-css-kanban-team-lanes` · `.custom-css-kanban-team-search` · `.custom-css-kanban-team-stat-card` · `.custom-css-kanban-team-stats` · `.custom-css-page-title` |
| `layout` | `.custom-css-appbar-menu` · `.custom-css-dark` · `.custom-css-greeting` · `.custom-css-greeting-company` · `.custom-css-greeting-duedate` · `.custom-css-greeting-name` · `.custom-css-icon` · `.custom-css-logo` · `.custom-css-menu-group` · `.custom-css-menu-item` · `.custom-css-sidebar` · `.custom-css-topbar-actions` |
| `Login` | `.custom-css-login-card` · `.custom-css-login-logo` |
| `MainHeader` | `.custom-css-page-header` |
| `MessageInputCustom` | `.custom-css-composer` · `.custom-css-composer-extras` · `.custom-css-composer-field` |
| `MessageInputCustomHub` | `.custom-css-composer` · `.custom-css-composer-extras` · `.custom-css-composer-field` |
| `MessagesList` | `.custom-css-conversation-bar` · `.custom-css-conversation-bar-active` · `.custom-css-conversation-bar-btn-template` · `.custom-css-conversation-bar-expired` · `.custom-css-conversation-bar-human-agent` · `.custom-css-conversation-bar-text` · `.custom-css-messages` · `.custom-css-msg-bubble` |
| `MessagesListGhost` | `.custom-css-messages` · `.custom-css-msg-bubble` |
| `MessagesSearchBar` | `.custom-css-msg-search` · `.custom-css-msg-search-btn-close` · `.custom-css-msg-search-btn-nav` · `.custom-css-msg-search-counter` · `.custom-css-msg-search-icon` · `.custom-css-msg-search-input` · `.custom-css-msg-search-nav` |
| `OportunidadesModal` | `.custom-css-oportunidade-btn-proposta` · `.custom-css-oportunidade-responsavel` |
| `Pipeline` | `.custom-css-dash-card` · `.custom-css-page-title` · `.custom-css-pipeline-board` · `.custom-css-pipeline-btn-customize` · `.custom-css-pipeline-btn-refresh` · `.custom-css-pipeline-btn-stats` · `.custom-css-pipeline-card` · `.custom-css-pipeline-card-content` · `.custom-css-pipeline-card-header` · `.custom-css-pipeline-customize-modal` · `.custom-css-pipeline-filters` · `.custom-css-pipeline-lane` · `.custom-css-pipeline-lane-body` · `.custom-css-pipeline-lane-empty` · `.custom-css-pipeline-lane-header` · `.custom-css-pipeline-lane-sem-etapa` · `.custom-css-pipeline-lane-title` · `.custom-css-pipeline-lanes` · `.custom-css-pipeline-search` · `.custom-css-pipeline-stats` |
| `PixelLogs` | `.custom-css-pixel-logs-day` |
| `PlansManager` | `.custom-css-plano-erro` |
| `PodioDeVendas` | `.custom-css-podio` · `.custom-css-podio-fileira` |
| `PontosDeIAManager` | `.custom-css-button` · `.custom-css-button-answer-from-ia-credit` · `.custom-css-pontos-de-ia` |
| `Products` | `.custom-css-btn-open-form` |
| `ProdutosDaOportunidade` | `.custom-css-oportunidade-produto-item` · `.custom-css-oportunidade-produtos` · `.custom-css-oportunidade-produtos-itens` · `.custom-css-oportunidade-produtos-restantes` · `.custom-css-oportunidade-produtos-total` |
| `Prompts` | `.custom-css-btn-open-form` |
| `PropostaConfigModal` | `.custom-css-proposta-config-btn-logo` · `.custom-css-proposta-config-modal` |
| `Propostas` | `.custom-css-page-title` · `.custom-css-propostas-btn-config` · `.custom-css-propostas-btn-delete` · `.custom-css-propostas-btn-download` · `.custom-css-propostas-btn-enviar` · `.custom-css-propostas-btn-pdf` · `.custom-css-propostas-search` · `.custom-css-propostas-table` |
| `ProximaAtividade` | `.custom-css-crm-proxima-atividade` · `.custom-css-crm-proxima-atividade-prazo` |
| `PushPermissionBanner` | `.custom-css-notification-banner` |
| `QueueCategories` | `.custom-css-btn-open-form` |
| `QueueModal` | `.custom-css-queue-chatbot` |
| `Queues` | `.custom-css-btn-open-form` |
| `QuickMessages` | `.custom-css-btn-open-form` |
| `Ratings` | `.custom-css-btn-open-form` |
| `RelatorioVendas` | `.custom-css-relatorio-vendas` · `.custom-css-relatorio-vendas-csv` · `.custom-css-relatorio-vendas-filtros` · `.custom-css-relatorio-vendas-linha` · `.custom-css-relatorio-vendas-origem` · `.custom-css-relatorio-vendas-perdas` · `.custom-css-relatorio-vendas-produto` · `.custom-css-relatorio-vendas-tabela` · `.custom-css-relatorio-vendas-totais` · `.custom-css-relatorio-vendas-truncado` · `.custom-css-relatorio-vendas-vendedor` · `.custom-css-relatorio-vendas-visao-geral` |
| `RemarketingLogs` | `.custom-css-btn-refresh` |
| `SalesRanking` | `.custom-css-page-title` |
| `Schedules` | `.custom-css-btn-open-form` |
| `Services` | `.custom-css-btn-open-form` |
| `Settings` | `.custom-css-setting-menu-type` · `.custom-css-settings-crm-versao` |
| `ShortLinks` | `.custom-css-btn-open-form` |
| `Signup` | `.custom-css-signup-card` · `.custom-css-signup-logo` |
| `Tags` | `.custom-css-btn-open-form` |
| `TagsContainer` | `.custom-css-ticket-tags` |
| `TagsStats` | `.custom-css-tags-stats` · `.custom-css-tags-stats-toggle` |
| `ThirdPart` | `.custom-css-ai-provider` · `.custom-css-google-calendar-config` |
| `Ticket` | `.custom-css-ticket` |
| `TicketActionButtonsCustom` | `.custom-css-ticket-actions` |
| `TicketActionButtonsCustomMobile` | `.custom-css-ticket-actions-menu` |
| `TicketHeader` | `.custom-css-ticket-header` |
| `TicketListItemCustom` | `.custom-css-ticket-item` |
| `TicketListItemCustomGroup` | `.custom-css-ticket-item` |
| `TicketsCustom` | `.custom-css-chat-empty` · `.custom-css-chat-empty-image` |
| `TicketsListCustom` | `.custom-css-ticket-list` |
| `TicketsListGroup` | `.custom-css-ticket-list` |
| `TicketsManagerTabs` | `.custom-css-grupos-nao-lidos` · `.custom-css-ticket-search` · `.custom-css-ticket-tabs` · `.custom-css-tickets` · `.custom-css-tickets-toolbar` · `.custom-css-tickets-toolbar-buttons` · `.custom-css-tickets-toolbar-search` |
| `Title` | `.custom-css-page-title` |
| `Users` | `.custom-css-btn-open-form` |
| `WABATemplates` | `.custom-css-template-groups-modal` · `.custom-css-waba-template-autoria` |
| `Webhook` | `.custom-css-btn-open-form` |

## Não achou o que queria

Inspecione o elemento no navegador: se ele tiver uma classe `custom-css-*`,
ela está aqui. Se não tiver, o alvo ainda não existe — peça, porque depender
das classes do Material-UI (`.MuiPaper-root`, `.jss123`) quebra na próxima
atualização da biblioteca.

Totais: 97 páginas · 174 modais · 260 específicas · 140 atributos.
