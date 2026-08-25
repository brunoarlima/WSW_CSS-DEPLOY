// ============================================================================
// STATUS DE CONEXÃO DO TICKET (Passivo, Read-Only & 100% Blindado para React)
// ============================================================================

function syncTicketConnectionStatus() {
  try {
    const cards = document.querySelectorAll('.custom-css-ticket-item');
    if (!cards || cards.length === 0) return;

    cards.forEach(function (card) {
      if (!card || !card.isConnected) return;

      let isDisconnected = false;

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

      // 3. Checagem via React Fiber (Dados Reais do Backend)
      if (!isDisconnected) {
        const reactKey = Object.keys(card).find(function (k) {
          return k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$') || k.startsWith('__reactProps$');
        });

        if (reactKey) {
          let fiber = card[reactKey];
          for (let i = 0; i < 8 && fiber; i++) {
            const props = fiber.memoizedProps || fiber.pendingProps;
            if (props && (props.ticket || props.data)) {
              const t = props.ticket || props.data;
              if (t) {
                const whatsapp = t.whatsapp;
                if (whatsapp === null || (whatsapp && whatsapp.status && whatsapp.status !== 'CONNECTED')) {
                  isDisconnected = true;
                }
              }
              break;
            }
            fiber = fiber.return;
          }
        }
      }

      // 4. Sincroniza cor dinâmica da fila para a variável CSS --queue-color
      const queueBadge = card.querySelector('.ticket-queue');
      if (queueBadge) {
        const queueColor = queueBadge.getAttribute('data-queue-color') || card.getAttribute('data-queue-color');
        if (queueColor) {
          queueBadge.style.setProperty('--queue-color', queueColor);
        }
      }

      // Injeta apenas o atributo data-* no container raiz (zero manipulação de nós filhos)
      const currentStatus = card.getAttribute('data-connection-status');
      const targetStatus = isDisconnected ? 'disconnected' : 'connected';

      if (currentStatus !== targetStatus) {
        card.setAttribute('data-connection-status', targetStatus);
      }
    });

    // 5. Sincroniza cor dinâmica de TODAS as tags da página (Cards + Cabeçalho do Chat)
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
