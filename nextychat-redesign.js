/**
 * NextyChat / WSW - Custom Topbar & Ticket Actions JS
 * 1. Organização e agrupamento dos ícones da Topbar (com gaveta retrátil).
 * 2. Substituição do ícone do Menu Lateral pela Logo da Marca (quando a sidebar estiver recolhida).
 * 3. Organização e agrupamento das Ações do Ticket (Resolver, Devolver, Transferir, Permitir Áudio + Gaveta Retrátil).
 */

(function () {
  'use strict';

  // ============================================================================
  // LOGO DA MARCA (SVG Completo em Alta Resolução)
  // ============================================================================
  const BRAND_LOGO_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 384" width="34" height="34" preserveAspectRatio="xMidYMid meet" style="display: block;">
      <defs>
        <clipPath id="69bab5fd83"><path d="M 3.332031 48.085938 L 377.582031 48.085938 L 377.582031 331.585938 L 3.332031 331.585938 Z M 3.332031 48.085938 " clip-rule="nonzero"/></clipPath>
        <clipPath id="3edf859ac0"><path d="M 0.414062 0.0859375 L 374.519531 0.0859375 L 374.519531 283.585938 L 0.414062 283.585938 Z M 0.414062 0.0859375 " clip-rule="nonzero"/></clipPath>
        <clipPath id="4b97f05fc2"><rect x="0" width="375" y="0" height="284"/></clipPath>
        <clipPath id="82ce3a9905"><path d="M 38.175781 69.980469 L 287 69.980469 L 287 239.480469 L 38.175781 239.480469 Z M 38.175781 69.980469 " clip-rule="nonzero"/></clipPath>
        <clipPath id="d408504503"><path d="M 1 1.003906 L 248.800781 1.003906 L 248.800781 170.480469 L 1 170.480469 Z M 1 1.003906 " clip-rule="nonzero"/></clipPath>
        <clipPath id="416efd2322"><rect x="0" width="249" y="0" height="171"/></clipPath>
      </defs>
      <!-- Balão Duplo Externo -->
      <g clip-path="url(#69bab5fd83)">
        <g transform="matrix(1, 0, 0, 1, 3, 48)">
          <g clip-path="url(#4b97f05fc2)">
            <g clip-path="url(#3edf859ac0)">
              <path fill="#0097b2" d="M 7.214844 85.472656 C 3.582031 85.472656 0.640625 82.53125 0.640625 78.902344 L 0.640625 50.554688 C 0.640625 22.714844 23.285156 0.0664062 51.125 0.0664062 L 270.996094 0.0664062 C 298.835938 0.0664062 321.484375 22.714844 321.484375 50.554688 L 321.484375 82.335938 L 332.132812 82.335938 C 355.375 82.335938 374.285156 101.242188 374.285156 124.488281 L 374.285156 258.308594 C 374.285156 267.773438 369.074219 276.375 360.683594 280.757812 C 356.980469 282.691406 352.957031 283.644531 348.949219 283.644531 C 343.875 283.644531 338.828125 282.113281 334.488281 279.089844 L 312.621094 263.867188 C 305.738281 259.074219 297.667969 256.542969 289.28125 256.542969 L 153.988281 256.542969 C 130.746094 256.542969 111.835938 237.632812 111.835938 214.386719 L 111.835938 212 L 104.015625 212 C 93.347656 212 83.082031 215.222656 74.328125 221.316406 L 47.339844 240.109375 C 42.246094 243.65625 36.324219 245.453125 30.367188 245.453125 C 25.667969 245.453125 20.945312 244.332031 16.601562 242.0625 C 6.753906 236.921875 0.640625 226.828125 0.640625 215.722656 L 0.640625 107.519531 C 0.640625 103.890625 3.582031 100.945312 7.214844 100.945312 C 10.84375 100.945312 13.785156 103.890625 13.785156 107.519531 L 13.785156 215.722656 C 13.785156 222.007812 17.113281 227.5 22.6875 230.410156 C 28.261719 233.316406 34.667969 232.910156 39.828125 229.320312 L 66.8125 210.527344 C 77.785156 202.890625 90.644531 198.851562 104.015625 198.851562 L 270.996094 198.851562 C 291.585938 198.851562 308.335938 182.101562 308.335938 161.511719 L 308.335938 50.554688 C 308.335938 29.964844 291.585938 13.214844 270.996094 13.214844 L 51.125 13.214844 C 30.535156 13.214844 13.785156 29.964844 13.785156 50.554688 L 13.785156 78.902344 C 13.785156 82.53125 10.84375 85.472656 7.214844 85.472656 Z M 7.214844 85.472656 " fill-opacity="1" fill-rule="nonzero"/>
            </g>
          </g>
        </g>
      </g>
      <!-- Símbolo / Onda Geométrica Central -->
      <g clip-path="url(#82ce3a9905)">
        <g transform="matrix(1, 0, 0, 1, 38, 69)">
          <g clip-path="url(#416efd2322)">
            <g clip-path="url(#d408504503)">
              <path fill="#0097b2" d="M 245.621094 10.757812 C 242.078125 4.648438 235.746094 1.003906 228.6875 1.003906 L 175.769531 1.003906 C 168.496094 1.003906 161.730469 4.933594 158.117188 11.246094 L 111.671875 92.539062 L 91.089844 56.511719 C 86.972656 49.300781 79.550781 44.992188 71.25 44.992188 C 62.945312 44.992188 55.527344 49.300781 51.40625 56.511719 L 4.140625 139.226562 C 0.40625 145.765625 0.433594 153.5625 4.210938 160.078125 C 7.996094 166.589844 14.746094 170.480469 22.28125 170.480469 L 73.574219 170.480469 C 80.703125 170.480469 87.332031 166.632812 90.871094 160.4375 L 111.671875 124.039062 L 131.269531 158.335938 C 135.546875 165.828125 143.570312 170.480469 152.199219 170.480469 L 152.304688 170.480469 C 160.507812 170.480469 168.128906 166.054688 172.195312 158.9375 L 245.6875 30.300781 C 249.1875 24.171875 249.167969 16.863281 245.621094 10.757812 Z M 231.445312 23.730469 L 157.863281 152.519531 C 156.878906 154.246094 155.027344 155.324219 153.035156 155.324219 L 150.796875 155.324219 C 148.792969 155.324219 146.925781 154.242188 145.929688 152.5 L 120.675781 108.289062 L 173.308594 16.167969 L 227.054688 16.167969 C 228.878906 16.167969 230.515625 17.109375 231.429688 18.6875 C 232.347656 20.257812 232.351562 22.144531 231.445312 23.730469 Z M 102.671875 108.285156 L 75.800781 155.316406 L 23.53125 155.316406 C 21.316406 155.316406 19.332031 154.171875 18.214844 152.257812 C 17.101562 150.34375 17.097656 148.054688 18.195312 146.128906 L 65.488281 63.359375 C 66.683594 61.265625 68.835938 60.015625 71.25 60.015625 C 73.660156 60.015625 75.8125 61.265625 77.011719 63.359375 Z M 102.671875 108.285156 " fill-opacity="1" fill-rule="nonzero"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `;

  // Verifica com precisão se existe um badge de notificação visível e ativo
  function hasActiveBadge(container) {
    if (!container) return false;

    const badges = container.querySelectorAll('.MuiBadge-badge, [class*="MuiBadge-badge"]');
    for (let i = 0; i < badges.length; i++) {
      const badge = badges[i];

      if (
        badge.classList.contains('MuiBadge-invisible') ||
        badge.className.indexOf('invisible') !== -1 ||
        badge.getAttribute('aria-hidden') === 'true'
      ) {
        continue;
      }

      const style = window.getComputedStyle(badge);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        continue;
      }

      const text = badge.textContent.trim();
      if (text !== '' && text !== '0') {
        return true;
      }

      if (badge.classList.contains('MuiBadge-dot') && style.display !== 'none') {
        return true;
      }
    }

    return false;
  }

  // Substitui o ícone do hambúrguer pela Logo da Marca
  function setupBrandMenuLogo(appbar) {
    const menuBtn = appbar.querySelector('button[data-appbar="menu"], button[aria-label="open drawer"]');
    if (!menuBtn) return;

    menuBtn.setAttribute('title', 'Expandir menu lateral');

    if (!menuBtn.classList.contains('custom-brand-logo-btn')) {
      menuBtn.classList.add('custom-brand-logo-btn');
      const iconLabel = menuBtn.querySelector('.MuiIconButton-label') || menuBtn;
      iconLabel.innerHTML = BRAND_LOGO_SVG;
    }
  }

  // ----------------------------------------------------------------------------
  // 1. TOPBAR (APPBAR) - Organização de Ícones & Gaveta
  // ----------------------------------------------------------------------------
  function initCustomTopbar() {
    const appbar = document.getElementById('custom-css-appbar') || document.querySelector('header.MuiAppBar-root');
    if (!appbar) return;

    const toolbar = appbar.querySelector('.MuiToolbar-root') || appbar;

    // Atualiza o botão do menu lateral para a Logo da Marca
    setupBrandMenuLogo(appbar);

    let wrapper = document.getElementById('custom-topbar-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'custom-topbar-wrapper';
      toolbar.appendChild(wrapper);
    }

    const ping = appbar.querySelector('[data-appbar="ping"]');
    const notifications = appbar.querySelector('button[data-appbar="notifications"]') ||
                          appbar.querySelector('button:has(svg[data-testid*="Notification"])') ||
                          appbar.querySelector('button[aria-label*="notifica" i]');
    const user = appbar.querySelector('button[data-appbar="user"]');
    const status = appbar.querySelector('[data-icon="status"], [data-appbar="status"]') ||
                   appbar.querySelector('.custom-css-topbar-actions > :last-child');

    let drawer = document.getElementById('custom-topbar-secondary-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'custom-topbar-secondary-drawer';
    }

    let toggleBtn = document.getElementById('custom-topbar-toggle-btn');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.id = 'custom-topbar-toggle-btn';
      toggleBtn.type = 'button';
      toggleBtn.title = 'Mais opções';
      toggleBtn.setAttribute('aria-label', 'Mais opções');
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

    let quickGroup = document.getElementById('custom-topbar-quick-actions');
    if (!quickGroup) {
      quickGroup = document.createElement('div');
      quickGroup.id = 'custom-topbar-quick-actions';
    }

    // Move itens principais
    if (ping && ping.parentElement !== wrapper) wrapper.appendChild(ping);
    if (drawer.parentElement !== wrapper) wrapper.appendChild(drawer);
    if (toggleBtn.parentElement !== wrapper) wrapper.appendChild(toggleBtn);
    if (quickGroup.parentElement !== wrapper) wrapper.appendChild(quickGroup);

    if (notifications && notifications.parentElement !== quickGroup) quickGroup.appendChild(notifications);
    if (user && user.parentElement !== quickGroup) quickGroup.appendChild(user);
    if (status && status.parentElement !== quickGroup) quickGroup.appendChild(status);

    // Move secundários da topbar para a gaveta
    const allButtons = appbar.querySelectorAll('button.MuiIconButton-root, button[data-appbar]');
    allButtons.forEach(function (btn) {
      if (
        btn === toggleBtn ||
        btn === notifications ||
        btn === user ||
        btn === status ||
        btn.getAttribute('data-appbar') === 'menu' ||
        btn.getAttribute('aria-label') === 'open drawer' ||
        btn.closest('#custom-topbar-quick-actions')
      ) {
        return;
      }

      if (btn.parentElement !== drawer) {
        drawer.appendChild(btn);
      }
    });

    if (hasActiveBadge(drawer)) {
      toggleBtn.classList.add('has-badge');
    } else {
      toggleBtn.classList.remove('has-badge');
    }
  }

  // ----------------------------------------------------------------------------
  // 2. AÇÕES DO ATENDIMENTO / TICKET (Grade Condensada & Gaveta Retrátil)
  // Ordem: Resolver (X) -> Devolver à Fila -> Transferir -> Permitir Áudio -> [···] -> Gaveta
  // ----------------------------------------------------------------------------
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

  // ----------------------------------------------------------------------------
  // EVENTOS GLOBAIS E INICIALIZAÇÃO
  // ----------------------------------------------------------------------------
  function runAllInits() {
    initCustomTopbar();
    initCustomTicketActions();
  }

  // Fecha as gavetas ao clicar fora
  document.addEventListener('click', function (e) {
    // Topbar
    const topWrapper = document.getElementById('custom-topbar-wrapper');
    const topDrawer = document.getElementById('custom-topbar-secondary-drawer');
    const topToggle = document.getElementById('custom-topbar-toggle-btn');
    if (topWrapper && !topWrapper.contains(e.target) && topDrawer) {
      topDrawer.classList.remove('is-open');
      if (topToggle) topToggle.classList.remove('is-active');
    }

    // Ticket Actions
    const ticketWrapper = document.getElementById('custom-ticket-actions-wrapper');
    const ticketDrawer = document.getElementById('custom-ticket-actions-drawer');
    const ticketToggle = document.getElementById('custom-ticket-actions-toggle-btn');
    if (ticketWrapper && !ticketWrapper.contains(e.target) && ticketDrawer) {
      ticketDrawer.classList.remove('is-open');
      if (ticketToggle) ticketToggle.classList.remove('is-active');
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllInits);
  } else {
    runAllInits();
  }

  let debounceTimeout = null;
  const observer = new MutationObserver(function () {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(runAllInits, 50);
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
