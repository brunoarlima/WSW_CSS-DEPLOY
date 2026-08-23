// ============================================================================
// AÇÕES DO ATENDIMENTO / TICKET (Grade Condensada & Gaveta Retrátil)
// Ordem: Resolver (X) -> Devolver à Fila -> Transferir -> Permitir Áudio -> [···] -> Gaveta
// ============================================================================

function getActionNodeToMove(el, actionsContainer) {
  if (!el) return null;
  let node = el;
  while (node && node.parentElement && node.parentElement !== actionsContainer && node.parentElement !== document.body) {
    node = node.parentElement;
  }
  return node && node.parentElement === actionsContainer ? node : el;
}

function initCustomTicketActions() {
  const actionsContainer = document.querySelector('.custom-css-ticket-actions');
  if (!actionsContainer) return;

  let wrapper = document.getElementById('custom-ticket-actions-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'custom-ticket-actions-wrapper';
    actionsContainer.appendChild(wrapper);
  }

  let quickGroup = document.getElementById('custom-ticket-actions-quick');
  if (!quickGroup) {
    quickGroup = document.createElement('div');
    quickGroup.id = 'custom-ticket-actions-quick';
    wrapper.appendChild(quickGroup);
  }

  let toggleBtn = document.getElementById('custom-ticket-actions-toggle-btn');
  let drawer = document.getElementById('custom-ticket-actions-drawer');

  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'custom-ticket-actions-drawer';
  }

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
      drawer.classList.toggle('is-open');
      toggleBtn.classList.toggle('is-active');
    });
  }

  if (quickGroup.parentElement !== wrapper) wrapper.appendChild(quickGroup);
  if (toggleBtn.parentElement !== wrapper) wrapper.appendChild(toggleBtn);
  if (drawer.parentElement !== wrapper) wrapper.appendChild(drawer);

  // 1. Identifica os 4 botões de Acesso Rápido na ordem solicitada:
  // 1º Resolver (X) -> 2º Devolver à Fila -> 3º Transferir -> 4º Permitir Áudio
  const resolveBtn = actionsContainer.querySelector('[data-action="resolve"]');
  const returnBtn = actionsContainer.querySelector('[data-action="return"]');
  const transferBtn = actionsContainer.querySelector('[data-action="transfer"]');
  const acceptAudioBtn = actionsContainer.querySelector('[data-action="accept-audio"]');

  const resolveNode = getActionNodeToMove(resolveBtn, actionsContainer);
  const returnNode = getActionNodeToMove(returnBtn, actionsContainer);
  const transferNode = getActionNodeToMove(transferBtn, actionsContainer);
  const acceptAudioNode = getActionNodeToMove(acceptAudioBtn, actionsContainer);

  if (resolveNode && resolveNode.parentElement !== quickGroup) quickGroup.appendChild(resolveNode);
  if (returnNode && returnNode.parentElement !== quickGroup) quickGroup.appendChild(returnNode);
  if (transferNode && transferNode.parentElement !== quickGroup) quickGroup.appendChild(transferNode);
  if (acceptAudioNode && acceptAudioNode.parentElement !== quickGroup) quickGroup.appendChild(acceptAudioNode);

  // 2. Move os demais botões secundários para a gaveta do ticket
  const allActionElements = actionsContainer.querySelectorAll('[data-action]');
  allActionElements.forEach(function (el) {
    const actionType = el.getAttribute('data-action');
    if (
      actionType === 'resolve' ||
      actionType === 'return' ||
      actionType === 'transfer' ||
      actionType === 'accept-audio'
    ) {
      return;
    }

    const nodeToMove = getActionNodeToMove(el, actionsContainer);
    if (nodeToMove && nodeToMove !== wrapper && nodeToMove.parentElement !== drawer) {
      drawer.appendChild(nodeToMove);
    }
  });
}
