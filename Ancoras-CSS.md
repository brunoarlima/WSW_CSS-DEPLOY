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

## Atributos de estado

| Atributo | Onde | Valores |
|---|---|---|
| `data-ack` | balão da mensagem | 0–5, o código bruto de entrega do WhatsApp |
| `data-action` | botões do atendimento | `resolve` · `return` · `transfer` · `schedule` · `task` · `delete` · `invite` · `call` · `files` · `flow` · `opportunity` · `summary` · `analyzer` · `contact-summary` · `accept-audio` · `external-chat-link` · `mais-acoes` |
| `data-active` | item do menu lateral | `true` no item da tela aberta |
| `data-appbar` | botões da barra do topo | `menu` · `msgs` · `notifications` · `announcements` · `theme` · `lang` · `font` · `sound` · `ping` · `refresh` · `collapse` · `user` |
| `data-avatar` | avatar no balão | `contact` · `user` · `none` |
| `data-channel` | cartão do ticket e ícone da conexão | o canal (`whatsapp`, `instagram`, `facebook`, …) |
| `data-collapsed` | menu lateral | `true` quando recolhido |
| `data-connection-color` | etiqueta da conexão no cartão | `green` (hoje é o único valor emitido) |
| `data-deleted` | balão da mensagem | `true` quando apagada |
| `data-edited` | balão da mensagem | `contact` quando o contato editou |
| `data-error` | balão da mensagem | `true` no balão rosa (a plataforma não processou) |
| `data-filter` | filtros da lista de atendimento | `scope` · `groups` · `closed` · `unread` · `queues` · `tags` · `users` · `connections` |
| `data-fromme` | balão e cartão | `true` quando saiu da plataforma |
| `data-group` | cartão do ticket | `true` em conversa de grupo |
| `data-grupos-nao-lidos` | botão de trocar de visão | quantos grupos têm mensagem não lida (ausente quando zero) |
| `data-icon` | ícones do topo | `theme` · `status` · `refresh` |
| `data-lane-type` | raia do funil | `IN_PROGRESS` · `WON` · `LOST` |
| `data-lugar` | pódio de vendas | `1` · `2` · `3` |
| `data-media-type` | balão da mensagem | `conversation` · `image` · `audio` · `video` · `document` · … |
| `data-menu` | item do menu lateral | o identificador do item |
| `data-menu-group` | grupo do menu lateral | o identificador do grupo |
| `data-message-id` | balão da mensagem | o id da mensagem |
| `data-mode` | campo de digitação | `private` na nota interna |
| `data-notification-action` | faixa de permissão de notificação | `enable` · `dismiss` |
| `data-operador` | foto do operador | o nome dele |
| `data-operator-id` | linha do ranking | o id do operador |
| `data-origem` | cartão do template WABA | quem criou (`bm`, `wsw`, `desconhecida`) |
| `data-origin` | balão da mensagem | `contact` · `user` (operador) · `app` (celular pareado) · `api` (bot/API) |
| `data-produtos` | linha de produtos da oportunidade | quantos itens são |
| `data-queue-chatbot` | cartão do ticket | `true` quando a fila é de chatbot |
| `data-queue-color` | cartão do ticket | a cor da fila |
| `data-queue-id` | cartão do ticket | o id da fila |
| `data-quoted` | balão da mensagem | `true` quando é resposta a outra |
| `data-selected` | cartão do ticket | `true` no ticket aberto |
| `data-status` | balão e cartão | no balão: `pending` · `sent` · `received` · `read` · `played`. No cartão: o status do ticket |
| `data-tag-color` | etiqueta | a cor dela |
| `data-tag-id` | etiqueta | o id dela |
| `data-theme` | `<body>` | `dark` · `light` |
| `data-ticket-id` | cartão do ticket | o id |
| `data-ticket-name` | cartão do ticket | o nome do contato |
| `data-ticket-protocol` | cartão do ticket | o protocolo |
| `data-unread` | cartão do ticket | quantas mensagens não lidas |
| `data-user-color` | cartão do ticket | a cor do operador |
| `data-window` | faixa da conversa (Meta) | estado da janela de 24h |

Exemplo — destacar mensagem não entregue e nota interna:

```css
.custom-css-msg-bubble[data-status="pending"] { opacity: .6; }
.custom-css-msg-bubble[data-origin="api"]     { border-left: 2px solid #888; }
[data-mode="private"] textarea                { background: #fffbe6; }
```

## Páginas

89 telas, uma âncora cada, no container:

```
custom-css-ai                         custom-css-amqp-messages              custom-css-announcement-history
custom-css-announcements              custom-css-appbar                     custom-css-atendimento-report
custom-css-atendimentos               custom-css-audit-logs                 custom-css-bot-files
custom-css-calls-report               custom-css-campaign-report            custom-css-campaigns
custom-css-campaigns-config           custom-css-chats                      custom-css-companies
custom-css-company-report             custom-css-connections                custom-css-contact-list-items
custom-css-contact-lists              custom-css-contacts                   custom-css-contacts-duplicates
custom-css-content                    custom-css-dashboard                  custom-css-dashboard-legado
custom-css-email-accounts             custom-css-emails                     custom-css-financeiro
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
custom-css-reports                    custom-css-reports-group-tickets      custom-css-reports-research
custom-css-reports-tickets            custom-css-reports-tickets-duration   custom-css-reports-tickets-duration-detail
custom-css-sales-ranking              custom-css-schedules                  custom-css-services
custom-css-settings                   custom-css-shell                      custom-css-short-links
custom-css-signup                     custom-css-sistema-postgres           custom-css-sistema-redis
custom-css-subscription               custom-css-survey                     custom-css-tags
custom-css-thirdpart                  custom-css-ticket-embed               custom-css-ticket-embed-error
custom-css-todolist                   custom-css-translation-manager        custom-css-typebot
custom-css-users                      custom-css-visitors-live              custom-css-waba-templates
custom-css-webhook-config             custom-css-webhooks
```

## Modais

95 modais. Todos carregam também `custom-css-modal`, então
`.custom-css-modal { border-radius: 12px; }` pega os 95 de uma vez.

```
custom-css-modal-amqp-message                     custom-css-modal-announcement
custom-css-modal-botfile                          custom-css-modal-botfile-url
custom-css-modal-bulk-extra-fields                custom-css-modal-campaign
custom-css-modal-change-password                  custom-css-modal-change-plan
custom-css-modal-confirmation                     custom-css-modal-contact
custom-css-modal-contact-list                     custom-css-modal-contact-list-item
custom-css-modal-contact-summary                  custom-css-modal-cross-domain-meta-oauth
custom-css-modal-email-account                    custom-css-modal-email-compose
custom-css-modal-facebook-aini                    custom-css-modal-flow-add-audio
custom-css-modal-flow-add-img                     custom-css-modal-flow-add-text
custom-css-modal-flow-add-video                   custom-css-modal-flow-asaas
custom-css-modal-flow-away                        custom-css-modal-flow-button
custom-css-modal-flow-carousel                    custom-css-modal-flow-category
custom-css-modal-flow-close                       custom-css-modal-flow-close-quick
custom-css-modal-flow-condition                   custom-css-modal-flow-contact
custom-css-modal-flow-external-chat-link          custom-css-modal-flow-http-request
custom-css-modal-flow-internal                    custom-css-modal-flow-interval
custom-css-modal-flow-ixc                         custom-css-modal-flow-location
custom-css-modal-flow-menu                        custom-css-modal-flow-new-flow
custom-css-modal-flow-new-gpt                     custom-css-modal-flow-new-typebot
custom-css-modal-flow-oportunidade                custom-css-modal-flow-pixel
custom-css-modal-flow-question                    custom-css-modal-flow-queue
custom-css-modal-flow-randomizer                  custom-css-modal-flow-remove-tag
custom-css-modal-flow-rodizio                     custom-css-modal-flow-single-block
custom-css-modal-flow-tag                         custom-css-modal-flow-template
custom-css-modal-flow-user                        custom-css-modal-flow-variable
custom-css-modal-flow-wbh                         custom-css-modal-flowbuilder
custom-css-modal-hybrid-mode                      custom-css-modal-import-progress
custom-css-modal-import-session                   custom-css-modal-information
custom-css-modal-instagram-aini                   custom-css-modal-meta-embedded-signup
custom-css-modal-meta-sip                         custom-css-modal-migrate-tickets
custom-css-modal-newticket                        custom-css-modal-oportunidades
custom-css-modal-paircode                         custom-css-modal-passkey-pair
custom-css-modal-product                          custom-css-modal-prompt
custom-css-modal-proxy-diagnostic                 custom-css-modal-qrcode
custom-css-modal-queue                            custom-css-modal-queue-category
custom-css-modal-quick-message                    custom-css-modal-rating
custom-css-modal-rcs                              custom-css-modal-sales-goals
custom-css-modal-schedule                         custom-css-modal-service
custom-css-modal-short-link                       custom-css-modal-subscription
custom-css-modal-tag                              custom-css-modal-tag-contacts
custom-css-modal-task                             custom-css-modal-telegram-aini
custom-css-modal-ticket                           custom-css-modal-tiktok
custom-css-modal-transfer-carteira                custom-css-modal-user
custom-css-modal-waba-template                    custom-css-modal-waba-template-new
custom-css-modal-webchat                          custom-css-modal-webhook
custom-css-modal-whatsapp                         custom-css-modal-whatsmeow-events
custom-css-modal-whatsmeow-sip
```

## Âncoras específicas, por área

Partes de tela com alvo próprio — o balão da mensagem, o cartão do funil, a
barra de ações. Âncora usada em mais de uma área aparece em todas.

| Área | Âncoras |
|---|---|
| `Annoucements` | `.custom-css-btn-open-form` |
| `AvatarOperador` | `.custom-css-avatar-operador` |
| `BarraDeAcoes` | `.custom-css-ticket-actions-overflow` · `.custom-css-ticket-actions-overflow-menu` |
| `ButtonWithSpinner` | `.custom-css-btn-confirm` |
| `Campaigns` | `.custom-css-btn-open-form` |
| `Chat` | `.custom-css-page-title` |
| `ConfirmationModal` | `.custom-css-btn-cancel` · `.custom-css-btn-confirm` |
| `ContactDrawer` | `.custom-css-contact-drawer` |
| `ContactListItems` | `.custom-css-btn-open-form` |
| `Contacts` | `.custom-css-btn-open-form` · `.custom-css-contacts-table` |
| `ContactsDuplicates` | `.custom-css-contacts-duplicates-search` · `.custom-css-contacts-duplicates-search-clear` |
| `ContactsStats` | `.custom-css-contacts-stats` · `.custom-css-contacts-stats-toggle` |
| `ContactTag` | `.custom-css-contact-tag` |
| `CrmPipelineSelect` | `.custom-css-user-modal-funis` |
| `CrmV2Board` | `.custom-css-crm-board` · `.custom-css-crm-board-card` · `.custom-css-crm-board-nova` · `.custom-css-crm-board-raia` · `.custom-css-crm-board-raias` · `.custom-css-crm-board-refresh` · `.custom-css-crm-motivo-perda` |
| `CrmV2Funis` | `.custom-css-crm-funil` · `.custom-css-crm-funil-modal` · `.custom-css-crm-funis` · `.custom-css-crm-funis-novo` · `.custom-css-crm-importar` · `.custom-css-crm-importar-modal` · `.custom-css-crm-quem-acessa` · `.custom-css-crm-quem-acessa-modal` · `.custom-css-crm-raia` · `.custom-css-crm-raia-modal` |
| `CrmV2Ranking` | `.custom-css-crm-metas-modal` · `.custom-css-crm-ranking` · `.custom-css-crm-ranking-linha` · `.custom-css-crm-ranking-metas` |
| `DashboardNew` | `.custom-css-dash-card` |
| `FlowBuilder` | `.custom-css-btn-open-form` |
| `FlowBuilderConfig` | `.custom-css-flowbuilder-actions` · `.custom-css-flowbuilder-actions-search` |
| `FlowCategories` | `.custom-css-btn-open-form` |
| `GroupManagement` | `.custom-css-btn-open-form` |
| `index` | `.custom-css-icon` |
| `Kanban` | `.custom-css-kanban-board` · `.custom-css-kanban-btn-empty-lanes` · `.custom-css-kanban-btn-filters` · `.custom-css-kanban-btn-refresh` · `.custom-css-kanban-btn-tag-filter` · `.custom-css-kanban-card` · `.custom-css-kanban-col` · `.custom-css-kanban-col-body` · `.custom-css-kanban-col-header` · `.custom-css-kanban-col-title` · `.custom-css-kanban-filters` · `.custom-css-kanban-lanes` · `.custom-css-kanban-search` · `.custom-css-kanban-stat-card` · `.custom-css-kanban-stats` · `.custom-css-page-title` |
| `KanbanFilas` | `.custom-css-kanban-filas-board` · `.custom-css-kanban-filas-btn-empty-lanes` · `.custom-css-kanban-filas-btn-filters` · `.custom-css-kanban-filas-btn-refresh` · `.custom-css-kanban-filas-card` · `.custom-css-kanban-filas-col` · `.custom-css-kanban-filas-col-body` · `.custom-css-kanban-filas-col-header` · `.custom-css-kanban-filas-col-title` · `.custom-css-kanban-filas-filters` · `.custom-css-kanban-filas-lanes` · `.custom-css-kanban-filas-search` · `.custom-css-kanban-filas-stat-card` · `.custom-css-kanban-filas-stats` · `.custom-css-page-title` |
| `KanbanGrupos` | `.custom-css-kanban-grupos-board` · `.custom-css-kanban-grupos-btn-empty-lanes` · `.custom-css-kanban-grupos-btn-filters` · `.custom-css-kanban-grupos-btn-refresh` · `.custom-css-kanban-grupos-card` · `.custom-css-kanban-grupos-col` · `.custom-css-kanban-grupos-col-body` · `.custom-css-kanban-grupos-col-header` · `.custom-css-kanban-grupos-col-title` · `.custom-css-kanban-grupos-filters` · `.custom-css-kanban-grupos-lanes` · `.custom-css-kanban-grupos-search` · `.custom-css-kanban-grupos-stat-card` · `.custom-css-kanban-grupos-stats` · `.custom-css-page-title` |
| `KanbanTeam` | `.custom-css-kanban-team-board` · `.custom-css-kanban-team-btn-empty-lanes` · `.custom-css-kanban-team-btn-filters` · `.custom-css-kanban-team-btn-refresh` · `.custom-css-kanban-team-btn-tag-filter` · `.custom-css-kanban-team-card` · `.custom-css-kanban-team-col` · `.custom-css-kanban-team-col-body` · `.custom-css-kanban-team-col-header` · `.custom-css-kanban-team-col-title` · `.custom-css-kanban-team-filters` · `.custom-css-kanban-team-lanes` · `.custom-css-kanban-team-search` · `.custom-css-kanban-team-stat-card` · `.custom-css-kanban-team-stats` · `.custom-css-page-title` |
| `layout` | `.custom-css-appbar-menu` · `.custom-css-dark` · `.custom-css-greeting` · `.custom-css-greeting-company` · `.custom-css-greeting-duedate` · `.custom-css-greeting-name` · `.custom-css-icon` · `.custom-css-logo` · `.custom-css-menu-group` · `.custom-css-menu-item` · `.custom-css-sidebar` · `.custom-css-topbar-actions` |
| `Login` | `.custom-css-login-card` · `.custom-css-login-logo` |
| `MainHeader` | `.custom-css-page-header` |
| `MessageInputCustom` | `.custom-css-composer` · `.custom-css-composer-field` |
| `MessageInputCustomHub` | `.custom-css-composer` · `.custom-css-composer-field` |
| `MessagesList` | `.custom-css-conversation-bar` · `.custom-css-conversation-bar-active` · `.custom-css-conversation-bar-btn-template` · `.custom-css-conversation-bar-expired` · `.custom-css-conversation-bar-human-agent` · `.custom-css-conversation-bar-text` · `.custom-css-messages` · `.custom-css-msg-bubble` |
| `MessagesListGhost` | `.custom-css-msg-bubble` |
| `MessagesSearchBar` | `.custom-css-msg-search` · `.custom-css-msg-search-btn-close` · `.custom-css-msg-search-btn-nav` · `.custom-css-msg-search-counter` · `.custom-css-msg-search-icon` · `.custom-css-msg-search-input` · `.custom-css-msg-search-nav` |
| `OportunidadesModal` | `.custom-css-oportunidade-btn-proposta` |
| `Pipeline` | `.custom-css-dash-card` · `.custom-css-page-title` · `.custom-css-pipeline-board` · `.custom-css-pipeline-btn-customize` · `.custom-css-pipeline-btn-refresh` · `.custom-css-pipeline-btn-stats` · `.custom-css-pipeline-card` · `.custom-css-pipeline-card-content` · `.custom-css-pipeline-card-header` · `.custom-css-pipeline-customize-modal` · `.custom-css-pipeline-filters` · `.custom-css-pipeline-lane` · `.custom-css-pipeline-lane-body` · `.custom-css-pipeline-lane-empty` · `.custom-css-pipeline-lane-header` · `.custom-css-pipeline-lane-sem-etapa` · `.custom-css-pipeline-lane-title` · `.custom-css-pipeline-lanes` · `.custom-css-pipeline-search` · `.custom-css-pipeline-stats` |
| `PodioDeVendas` | `.custom-css-podio` · `.custom-css-podio-fileira` |
| `Products` | `.custom-css-btn-open-form` |
| `ProdutosDaOportunidade` | `.custom-css-oportunidade-produto-item` · `.custom-css-oportunidade-produtos` · `.custom-css-oportunidade-produtos-itens` · `.custom-css-oportunidade-produtos-restantes` · `.custom-css-oportunidade-produtos-total` |
| `Prompts` | `.custom-css-btn-open-form` |
| `PropostaConfigModal` | `.custom-css-proposta-config-btn-logo` · `.custom-css-proposta-config-modal` |
| `Propostas` | `.custom-css-page-title` · `.custom-css-propostas-btn-config` · `.custom-css-propostas-btn-delete` · `.custom-css-propostas-btn-enviar` · `.custom-css-propostas-btn-pdf` · `.custom-css-propostas-search` · `.custom-css-propostas-table` |
| `PushPermissionBanner` | `.custom-css-notification-banner` |
| `QueueCategories` | `.custom-css-btn-open-form` |
| `Queues` | `.custom-css-btn-open-form` |
| `QuickMessages` | `.custom-css-btn-open-form` |
| `Ratings` | `.custom-css-btn-open-form` |
| `SalesRanking` | `.custom-css-page-title` |
| `Schedules` | `.custom-css-btn-open-form` |
| `Services` | `.custom-css-btn-open-form` |
| `Settings` | `.custom-css-setting-menu-type` · `.custom-css-settings-crm-versao` |
| `ShortLinks` | `.custom-css-btn-open-form` |
| `Signup` | `.custom-css-signup-card` · `.custom-css-signup-logo` |
| `Tags` | `.custom-css-btn-open-form` |
| `TagsContainer` | `.custom-css-contact-tag` · `.custom-css-ticket-tags` |
| `TagsStats` | `.custom-css-tags-stats` · `.custom-css-tags-stats-toggle` |
| `ThirdPart` | `.custom-css-ai-provider` |
| `Ticket` | `.custom-css-ticket` |
| `TicketActionButtonsCustom` | `.custom-css-ticket-actions` |
| `TicketActionButtonsCustomMobile` | `.custom-css-ticket-actions-menu` |
| `TicketHeader` | `.custom-css-ticket-header` |
| `TicketListItemCustom` | `.custom-css-ticket-item` |
| `TicketListItemCustomGroup` | `.custom-css-ticket-item` |
| `TicketsListCustom` | `.custom-css-ticket-list` |
| `TicketsListGroup` | `.custom-css-ticket-list` |
| `TicketsManagerTabs` | `.custom-css-grupos-nao-lidos` · `.custom-css-ticket-search` · `.custom-css-ticket-tabs` · `.custom-css-tickets` · `.custom-css-tickets-toolbar` · `.custom-css-tickets-toolbar-buttons` · `.custom-css-tickets-toolbar-search` |
| `Title` | `.custom-css-page-title` |
| `Users` | `.custom-css-btn-open-form` |
| `WABATemplates` | `.custom-css-waba-template-autoria` |
| `Webhook` | `.custom-css-btn-open-form` |

## Não achou o que queria

Inspecione o elemento no navegador: se ele tiver uma classe `custom-css-*`,
ela está aqui. Se não tiver, o alvo ainda não existe — peça, porque depender
das classes do Material-UI (`.MuiPaper-root`, `.jss123`) quebra na próxima
atualização da biblioteca.

Totais: 89 páginas · 95 modais · 186 específicas · 44 atributos.
