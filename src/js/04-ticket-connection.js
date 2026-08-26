// ============================================================================
// STATUS DE CONEXÃO DO TICKET & PREVIEW DE MENSAGEM (Passivo, Read-Only & 100% Blindado para React)
// ============================================================================

function syncTicketConnectionStatus() {
  try {
    const cards = document.querySelectorAll('.custom-css-ticket-item');
    if (!cards || cards.length === 0) return;

    cards.forEach(function (card) {
      if (!card || !card.isConnected) return;

      let isDisconnected = false;
      let ticketData = null;

      // 1. Checagem via Texto do Badge de Conexão (ex: "TOKEN_..._REMOVIDO")
      const connectionBadge = card.querySelector('.ticket-connection');
      if (connectionBadge) {
        const text = (connectionBadge.textContent || '').toUpperCase();
        if (
          text.indexOf('REMOVIDO') !== -1 ||
          text.indexOf('DESCONECTADO') !== -1 ||
          text.indexOf('OFFLINE') !== -1 ||
          text.indexOf('SEM CONEX') !== -1
        ) {
          isDisconnected = true;
        }
      }

      // 2. Checagem via Atributo de Cor Nativo do Badge
      if (!isDisconnected && connectionBadge) {
        const colorAttr = connectionBadge.getAttribute('data-connection-color');
        if (colorAttr === 'red' || colorAttr === '#ef4444' || colorAttr === '#f44336') {
          isDisconnected = true;
        }
      }

      // 3. Extração via React Fiber (Dados Reais do Backend: Conexão & Última Mensagem)
      const reactKey = Object.keys(card).find(function (k) {
        return k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$') || k.startsWith('__reactProps$');
      });

      if (reactKey) {
        let fiber = card[reactKey];
        for (let i = 0; i < 10 && fiber; i++) {
          const props = fiber.memoizedProps || fiber.pendingProps;
          if (props && (props.ticket || props.data)) {
            ticketData = props.ticket || props.data;
            if (ticketData) {
              const whatsapp = ticketData.whatsapp;
              if (whatsapp === null || (whatsapp && whatsapp.status && whatsapp.status !== 'CONNECTED')) {
                isDisconnected = true;
              }
            }
            break;
          }
          fiber = fiber.return;
        }
      }

      // 4. Sincroniza a mensagem limitada em 60 caracteres (Suporta span e p com prefixo de atendente/vendedor)
      const previewNode = card.querySelector(
        '.ticket-preview > span:first-child, .ticket-preview > p:first-child, .ticket-preview > *:first-child:not(.ticket-badges):not(.ticket-tags)'
      );
      if (previewNode) {
        let cleanMsg = '';
        if (ticketData && ticketData.lastMessage) {
          cleanMsg = String(ticketData.lastMessage).replace(/\r?\n|\r/g, ' ').trim();
        } else {
          cleanMsg = (previewNode.textContent || '').replace(/\r?\n|\r/g, ' ').trim();
        }

        // Se houver prefixo (ex: "Vendedor: ") no nó original
        const strongEl = previewNode.querySelector('strong');
        const prefix = strongEl ? strongEl.textContent.trim() + ' ' : '';

        // Se a mensagem do backend não contém o prefixo, adiciona
        if (prefix && !cleanMsg.startsWith(prefix) && !cleanMsg.startsWith(prefix.trim())) {
          cleanMsg = prefix + cleanMsg;
        }

        if (cleanMsg.length > 60) {
          cleanMsg = cleanMsg.slice(0, 60) + '...';
        }

        if (cleanMsg && previewNode.getAttribute('data-full-preview') !== cleanMsg) {
          previewNode.setAttribute('data-full-preview', cleanMsg);
        }
      }

      // 5. Fusão Canal + Conexão: Detecta Canal e Cor definidos pelo próprio ícone do React
      if (connectionBadge) {
        let channel = 'whatsapp';
        let channelColor = '';

        // A. Extrai dados do ícone original renderizado pelo React
        const channelIcon = card.querySelector('.ticket-channel-icon, svg[data-channel], svg.ticket-channel-icon');
        if (channelIcon) {
          const chAttr = channelIcon.getAttribute('data-channel');
          if (chAttr) channel = chAttr.toLowerCase();

          // Captura a cor exata que o próprio ícone define (inline style ou atributo)
          const inlineColor = channelIcon.style.color || channelIcon.getAttribute('color') || channelIcon.getAttribute('data-channel-color');
          if (inlineColor && inlineColor !== 'currentColor' && inlineColor !== 'inherit' && inlineColor !== 'transparent') {
            channelColor = inlineColor;
          } else {
            const computed = window.getComputedStyle(channelIcon).color;
            if (computed && computed !== 'inherit' && computed !== 'transparent') {
              channelColor = computed;
            }
          }

          const title = (channelIcon.getAttribute('title') || channelIcon.getAttribute('aria-label') || '').toLowerCase();
          const testid = (channelIcon.getAttribute('data-testid') || '').toLowerCase();
          if (title.indexOf('insta') !== -1 || testid.indexOf('insta') !== -1) channel = 'instagram';
          else if (title.indexOf('face') !== -1 || title.indexOf('messenger') !== -1 || testid.indexOf('face') !== -1) channel = 'facebook';
          else if (title.indexOf('tele') !== -1 || testid.indexOf('tele') !== -1) channel = 'telegram';
          else if (title.indexOf('whats') !== -1 || testid.indexOf('whats') !== -1) channel = 'whatsapp';
        }

        // B. Extrai canal e cor do React Fiber caso disponível
        if (ticketData) {
          if (ticketData.channel) channel = String(ticketData.channel).toLowerCase();
          else if (ticketData.whatsapp && ticketData.whatsapp.type) channel = String(ticketData.whatsapp.type).toLowerCase();
          else if (ticketData.whatsapp && ticketData.whatsapp.channel) channel = String(ticketData.whatsapp.channel).toLowerCase();

          if (ticketData.whatsapp && ticketData.whatsapp.color && !channelColor) {
            channelColor = ticketData.whatsapp.color;
          }
        }

        // Normalização de canais
        if (channel.indexOf('whats') !== -1 || channel.indexOf('waba') !== -1 || channel.indexOf('baileys') !== -1) channel = 'whatsapp';
        else if (channel.indexOf('insta') !== -1) channel = 'instagram';
        else if (channel.indexOf('face') !== -1 || channel.indexOf('messenger') !== -1) channel = 'facebook';
        else if (channel.indexOf('tele') !== -1) channel = 'telegram';
        else if (channel.indexOf('web') !== -1 || channel.indexOf('chat') !== -1) channel = 'webchat';

        if (connectionBadge.getAttribute('data-channel') !== channel) {
          connectionBadge.setAttribute('data-channel', channel);
        }
        if (channelColor) {
          connectionBadge.style.setProperty('--channel-color', channelColor);
        } else {
          connectionBadge.style.removeProperty('--channel-color');
        }
      }

      // 6. Marcação do Ícone de Espiar Conversa (Garante que nunca perca o seletor no hover do MUI Tooltip)
      const spyIcon = card.querySelector('.MuiListItemText-root > span:first-child svg:not(.ticket-channel-icon):not([data-channel]), svg:has(path[d*="M12 4.5C7"])');
      if (spyIcon && !spyIcon.classList.contains('custom-ticket-spy-btn')) {
        spyIcon.classList.add('custom-ticket-spy-btn');
      }

      // 7. Sincroniza cor dinâmica da fila para a variável CSS --queue-color
      const queueBadge = card.querySelector('.ticket-queue');
      if (queueBadge) {
        const queueColor = queueBadge.getAttribute('data-queue-color') || card.getAttribute('data-queue-color');
        if (queueColor) {
          queueBadge.style.setProperty('--queue-color', queueColor);
        }
      }

      // 8. Botão "+N ⌄" para Mais Tags (Estratégia Estável Baseada em CSS Puro)
      const tagsContainer = card.querySelector('.ticket-tags');
      if (tagsContainer) {
        const tagElements = tagsContainer.querySelectorAll('.custom-css-contact-tag');
        const totalTags = tagElements.length;
        let moreBtn = tagsContainer.querySelector('.custom-ticket-tags-more-btn');

        if (totalTags <= 3) {
          if (moreBtn) moreBtn.remove();
        } else {
          const isExpanded = tagsContainer.classList.contains('is-expanded');
          const hiddenCount = totalTags - 3;

          if (!moreBtn) {
            moreBtn = document.createElement('button');
            moreBtn.className = 'custom-ticket-tags-more-btn';
            moreBtn.type = 'button';
            tagsContainer.appendChild(moreBtn);
          }

          if (isExpanded) {
            if (moreBtn.getAttribute('data-state') !== 'expanded') {
              moreBtn.setAttribute('data-state', 'expanded');
              moreBtn.removeAttribute('data-count');
              moreBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z"/></svg>';
              moreBtn.setAttribute('title', 'Recolher tags');
            }
          } else {
            const countStr = String(hiddenCount);
            if (moreBtn.getAttribute('data-count') !== countStr || moreBtn.getAttribute('data-state') !== 'collapsed') {
              moreBtn.setAttribute('data-state', 'collapsed');
              moreBtn.setAttribute('data-count', countStr);
              moreBtn.innerHTML = '+' + hiddenCount + ' <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>';
              moreBtn.setAttribute('title', 'Ver mais ' + hiddenCount + ' tags');
            }
          }
        }
      }

      // 9. Ancoragem Física do Badge de Mensagens Não Lidas ao Container do Avatar
      const avatarContainer = card.querySelector('.MuiListItemAvatar-root');
      if (avatarContainer) {
        const unreadBadgeRoot = card.querySelector(':scope > .MuiBadge-root, :scope > span.MuiBadge-root, .MuiBadge-root:not(.ticket-connection):not(.ticket-user):not(.ticket-queue)');
        if (unreadBadgeRoot && unreadBadgeRoot.parentElement !== avatarContainer && !avatarContainer.contains(unreadBadgeRoot)) {
          avatarContainer.appendChild(unreadBadgeRoot);
        }
      }

      // Injeta apenas o atributo data-* no container raiz (zero manipulação de nós filhos)
      const currentStatus = card.getAttribute('data-connection-status');
      const targetStatus = isDisconnected ? 'disconnected' : 'connected';

      if (currentStatus !== targetStatus) {
        card.setAttribute('data-connection-status', targetStatus);
      }
    });

    // 7. Sincroniza cor dinâmica de TODAS as tags da página (Cards + Cabeçalho do Chat)
    const allTags = document.querySelectorAll(
      '.custom-css-contact-tag, .custom-css-ticket-tags .MuiChip-root, .MuiAutocomplete-tag, [data-tag-color]'
    );
    allTags.forEach(function (tag) {
      if (!tag || !tag.isConnected) return;
      const tagColor = tag.getAttribute('data-tag-color') || tag.style.backgroundColor;
      if (tagColor && tagColor !== 'transparent') {
        tag.style.setProperty('--tag-color', tagColor);
      }
    });
  } catch (e) {
    // Silencioso
  }
}

// ============================================================================
// INTERCEPTOR DE CLIQUE GLOBAL PARA O BOTÃO DE EXPANDIR/RECOLHER TAGS
// Intercepta na fase de CAPTURA (useCapture: true) impedindo o ripple e clique do card
// ============================================================================
if (typeof window !== 'undefined' && !window.__customTagsMoreBtnInitialized) {
  window.__customTagsMoreBtnInitialized = true;

  document.addEventListener('click', function (e) {
    const moreBtn = e.target && e.target.closest ? e.target.closest('.custom-ticket-tags-more-btn') : null;
    if (!moreBtn) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const tagsContainer = moreBtn.closest('.ticket-tags');
    if (!tagsContainer) return;

    tagsContainer.classList.toggle('is-expanded');
    syncTicketConnectionStatus();
  }, true);

  document.addEventListener('mousedown', function (e) {
    const moreBtn = e.target && e.target.closest ? e.target.closest('.custom-ticket-tags-more-btn') : null;
    if (moreBtn) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }, true);
}
