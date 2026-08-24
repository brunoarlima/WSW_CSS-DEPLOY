// ============================================================================
// AÇÕES DO ATENDIMENTO / TICKET (Grade Condensada & Gaveta Retrátil - Zero Reparenting)
// Ordem: Resolver (X) -> Devolver à Fila -> Transferir -> Permitir Áudio -> [···] -> Gaveta
// ============================================================================

function initCustomTicketActions() {
  try {
    const actionsContainer = document.querySelector('.custom-css-ticket-actions');
    if (!actionsContainer || !actionsContainer.isConnected) return;

    let toggleBtn = actionsContainer.querySelector('#custom-ticket-actions-toggle-btn');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.id = 'custom-ticket-actions-toggle-btn';
      toggleBtn.type = 'button';
      toggleBtn.title = 'Mais ações';
      toggleBtn.setAttribute('aria-label', 'Mais ações');
      toggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      `;

      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        actionsContainer.classList.toggle('ticket-drawer-open');
        toggleBtn.classList.toggle('is-active');
      });

      actionsContainer.appendChild(toggleBtn);
    }

    // Classifica os elementos filhos de ações sem alterar o parentNode
    const allActionElements = actionsContainer.querySelectorAll('[data-action], .MuiMenuItem-root, button.MuiIconButton-root, .MuiSwitch-root');
    allActionElements.forEach(function (el) {
      if (!el || !el.isConnected || el === toggleBtn) return;

      // Obtém o elemento filho direto de actionsContainer
      let topEl = el;
      while (topEl && topEl.parentElement && topEl.parentElement !== actionsContainer) {
        topEl = topEl.parentElement;
      }
      if (!topEl || topEl.parentElement !== actionsContainer || topEl === toggleBtn) return;

      const hasResolve = topEl.querySelector('[data-action="resolve"]') || topEl.getAttribute('data-action') === 'resolve';
      const hasReturn = topEl.querySelector('[data-action="return"]') || topEl.getAttribute('data-action') === 'return';
      const hasTransfer = topEl.querySelector('[data-action="transfer"]') || topEl.getAttribute('data-action') === 'transfer';
      const hasAcceptAudio = topEl.querySelector('[data-action="accept-audio"]') || topEl.getAttribute('data-action') === 'accept-audio' || topEl.querySelector('.MuiSwitch-root');

      if (hasResolve) {
        topEl.classList.add('ticket-item-quick', 'ticket-item-resolve');
        topEl.classList.remove('ticket-item-secondary');
      } else if (hasReturn) {
        topEl.classList.add('ticket-item-quick', 'ticket-item-return');
        topEl.classList.remove('ticket-item-secondary');
      } else if (hasTransfer) {
        topEl.classList.add('ticket-item-quick', 'ticket-item-transfer');
        topEl.classList.remove('ticket-item-secondary');
      } else if (hasAcceptAudio) {
        topEl.classList.add('ticket-item-quick', 'ticket-item-accept-audio');
        topEl.classList.remove('ticket-item-secondary');
      } else {
        topEl.classList.add('ticket-item-secondary');
        topEl.classList.remove('ticket-item-quick');
      }
    });
  } catch (e) {
    // Silencioso
  }
}

