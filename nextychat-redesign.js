/**
 * ============================================================================
 * NEXTYCHAT / WSW - CUSTOM JS (TOPBAR, TICKET ACTIONS & MOBILE FIXES)
 * ARQUIVO GERADO AUTOMATICAMENTE VIA BUILD - NÃO EDITE DIRETAMENTE
 * Edite os módulos individuais em src/js/
 * ============================================================================
 */

(function () {
  'use strict';

  // --- [Módulo: 00-brand-logo.js] ---
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
  
  // Substitui o ícone do hambúrguer pela Logo da Marca sem destruir nós nativos do React
  function setupBrandMenuLogo(appbar) {
    try {
      if (!appbar || !appbar.isConnected) return;
      const menuBtn = appbar.querySelector('button[data-appbar="menu"], button[aria-label="open drawer"]');
      if (!menuBtn || !menuBtn.isConnected) return;
  
      menuBtn.setAttribute('title', 'Expandir menu lateral');
      menuBtn.classList.add('custom-brand-logo-btn');
  
      let logoEl = menuBtn.querySelector('.custom-brand-logo-icon');
      if (!logoEl) {
        logoEl = document.createElement('span');
        logoEl.className = 'custom-brand-logo-icon';
        logoEl.innerHTML = BRAND_LOGO_SVG;
        menuBtn.appendChild(logoEl);
      }
    } catch (e) {
      // Falha silenciosa para nunca interromper a renderização do React
    }
  }

  // --- [Módulo: 01-topbar.js] ---
  // ============================================================================
  // TOPBAR (APPBAR) - Organização de Ícones & Gaveta Retrátil
  // ============================================================================
  
  // Verifica com precisão se existe um badge de notificação visível e ativo
  function hasActiveBadge(container) {
    try {
      if (!container || !container.isConnected) return false;
  
      const badges = container.querySelectorAll('.MuiBadge-badge, [class*="MuiBadge-badge"]');
      for (let i = 0; i < badges.length; i++) {
        const badge = badges[i];
        if (!badge || !badge.isConnected) continue;
  
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
    } catch (e) {
      // Silencioso
    }
  
    return false;
  }
  
  function initCustomTopbar() {
    try {
      const appbar = document.getElementById('custom-css-appbar') || document.querySelector('header.MuiAppBar-root');
      if (!appbar || !appbar.isConnected) return;
  
      const toolbar = appbar.querySelector('.MuiToolbar-root') || appbar;
      if (!toolbar || !toolbar.isConnected) return;
  
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
  
      // Estrutura organizada: [Ping] -> [Gaveta Secundária] -> [Toggle ···] -> [Grupo Rápido: Notificações, User, Status]
      if (ping && ping.isConnected && ping.parentElement !== wrapper) wrapper.appendChild(ping);
      if (drawer.parentElement !== wrapper) wrapper.appendChild(drawer);
      if (toggleBtn.parentElement !== wrapper) wrapper.appendChild(toggleBtn);
      if (quickGroup.parentElement !== wrapper) wrapper.appendChild(quickGroup);
  
      if (notifications && notifications.isConnected && notifications.parentElement !== quickGroup) quickGroup.appendChild(notifications);
      if (user && user.isConnected && user.parentElement !== quickGroup) quickGroup.appendChild(user);
      if (status && status.isConnected && status.parentElement !== quickGroup) quickGroup.appendChild(status);
  
      // Identifica e move TODOS os outros botões secundários (volume, chat interno, idioma, reload, tema, etc.) para o drawer
      const allButtons = appbar.querySelectorAll('button.MuiIconButton-root, button[data-appbar]');
      allButtons.forEach(function (btn) {
        if (
          !btn ||
          !btn.isConnected ||
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
    } catch (e) {
      // Silencioso para evitar quebrar React
    }
  }

  // --- [Módulo: 02-ticket-actions.js] ---
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

  // --- [Módulo: 03-ticket-header.js] ---
  // ============================================================================
  // CABEÇALHO DO TICKET - Alinhamento, Limpeza & Toggle de Contato
  // ============================================================================
  
  function alignTicketHeaderMenuButton() {
    try {
      const header = document.querySelector('.custom-css-ticket-header');
      if (!header || !header.isConnected) return;
  
      const menuBtn = header.querySelector(
        'button:has(svg path[d*="M3 18"]), button:has(svg[data-testid*="Menu"]), button:has(svg[data-testid*="Dehaze"]), button[title="Ações"], button[aria-label="Ações"], .custom-ticket-header-menu-btn'
      );
  
      if (menuBtn && menuBtn.isConnected) {
        menuBtn.classList.add('custom-ticket-header-menu-btn');
        menuBtn.setAttribute('title', 'Ações do atendimento');
  
        const parent = menuBtn.parentElement;
        if (parent && parent !== header && parent.isConnected) {
          parent.style.marginLeft = 'auto';
          parent.style.marginRight = '0';
          parent.style.width = 'auto';
          parent.style.maxWidth = '40px';
  
          // Oculta quaisquer elementos ou divs irmãs vazias residuais geradas pelo Material-UI
          Array.from(parent.children).forEach(function (child) {
            if (child !== menuBtn && (child.children.length === 0 || child.innerHTML.trim() === '')) {
              child.style.display = 'none';
            }
          });
        }
      }
  
      // Toggle do Drawer de Contato ao clicar no Avatar/Cabeçalho do Ticket
      const cardHeader = header.querySelector('.MuiCardHeader-root');
      if (cardHeader && cardHeader.isConnected && !cardHeader.dataset.hasToggleAttached) {
        cardHeader.dataset.hasToggleAttached = 'true';
        cardHeader.addEventListener('click', function () {
          const drawer = document.querySelector('.custom-css-contact-drawer');
          if (!drawer) return;
  
          const style = drawer.getAttribute('style') || '';
          const isCurrentlyOpen = (style.indexOf('transform: none') !== -1 || style.indexOf('translateX(0') !== -1) &&
                                  style.indexOf('visibility: hidden') === -1 &&
                                  style.indexOf('translateX(440px)') === -1 &&
                                  style.indexOf('translateX(320px)') === -1;
  
          // Se já estiver aberto, fecha clicando no botão de fechar do drawer
          if (isCurrentlyOpen) {
            const closeBtn = document.querySelector('.contact-drawer-header button');
            if (closeBtn) {
              setTimeout(function () {
                closeBtn.click();
              }, 10);
            }
          }
        });
      }
    } catch (e) {
      // Silencioso
    }
  }

  // --- [Módulo: 03-tickets-search.js] ---
  // ============================================================================
  // TICKETS TOOLBAR - BUSCA RETRÁTIL (ISOLADA & BLINDADA CONTRA CRASH DO REACT)
  // ============================================================================
  
  function initTicketsSearchToggle() {
    try {
      const toolbar = document.querySelector('.custom-css-tickets-toolbar');
      if (!toolbar || !toolbar.isConnected) return;
  
      const buttonsContainer = toolbar.querySelector('.custom-css-tickets-toolbar-buttons');
      const searchContainer = toolbar.querySelector('.custom-css-tickets-toolbar-search');
      if (!buttonsContainer || !searchContainer || !buttonsContainer.isConnected || !searchContainer.isConnected) return;
  
      // Se o botão já existe e está no DOM, garante que esteja no final da barra
      let toggleBtn = document.getElementById('custom-tickets-search-toggle-btn');
      if (toggleBtn && toggleBtn.isConnected) {
        if (buttonsContainer.lastElementChild !== toggleBtn) {
          buttonsContainer.appendChild(toggleBtn);
        }
        return;
      }
  
      toggleBtn = document.createElement('button');
      toggleBtn.id = 'custom-tickets-search-toggle-btn';
      toggleBtn.className = 'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall custom-css-search-toggle-btn';
      toggleBtn.type = 'button';
      toggleBtn.title = 'Buscar tickets';
      toggleBtn.setAttribute('aria-label', 'Buscar tickets');
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.innerHTML = `
        <span class="MuiIconButton-label" style="pointer-events: none;">
          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="width: 18px; height: 18px; fill: currentColor;">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </span>
        <span class="MuiTouchRipple-root"></span>
      `;
  
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const currentToolbar = document.querySelector('.custom-css-tickets-toolbar');
        if (!currentToolbar) return;
  
        const isOpen = currentToolbar.classList.toggle('is-search-open');
        toggleBtn.setAttribute('aria-pressed', isOpen ? 'true' : 'false');
        toggleBtn.classList.toggle('is-active', isOpen);
  
        if (isOpen) {
          const input = currentToolbar.querySelector('.custom-css-ticket-search input');
          if (input) {
            setTimeout(function () {
              try { input.focus(); } catch (err) {}
            }, 100);
          }
        }
      });
  
      // Insere como o último item à direita da barra de botões
      buttonsContainer.appendChild(toggleBtn);
    } catch (err) {
      // Silencioso para blindar contra qualquer erro
    }
  }

  // --- [Módulo: 04-resizable-panel.js] ---
  // ============================================================================
  // REDIMENSIONAMENTO FLUIDO DO PAINEL DE TICKETS (DESKTOP)
  // Altera exclusivamente a variável CSS --wsw-tickets-width no :root
  // Persiste a preferência no localStorage sem interferir no Virtual DOM do React
  // Limites estritos: 460px a 650px
  // ============================================================================
  
  (function () {
    try {
      var savedWidth = localStorage.getItem('wsw_tickets_width');
      if (savedWidth) {
        var num = parseFloat(savedWidth);
        if (!isNaN(num)) {
          num = Math.max(460, Math.min(num, 650));
          document.documentElement.style.setProperty('--wsw-tickets-width', num + 'px');
        } else {
          document.documentElement.style.setProperty('--wsw-tickets-width', savedWidth);
        }
      }
    } catch (e) {}
  })();
  
  var _wswResizerState = {
    isResizing: false,
    startX: 0,
    startWidth: 0,
    listEl: null,
    listenersAttached: false
  };
  
  function initResizablePanel() {
    try {
      if (_wswResizerState.listenersAttached) return;
      _wswResizerState.listenersAttached = true;
  
      function getTicketsListElement() {
        return document.querySelector(
          '#custom-css-content .custom-css-tickets, .custom-css-page .custom-css-tickets, .custom-css-tickets, #custom-css-content .MuiGrid-grid-xs-4'
        );
      }
  
      // Início do arrasto (Mouse)
      document.addEventListener('mousedown', function (e) {
        try {
          if (window.innerWidth <= 960 || e.button !== 0) return;
  
          var listEl = getTicketsListElement();
          if (!listEl || !listEl.isConnected) return;
  
          var rect = listEl.getBoundingClientRect();
          // Detecta clique na margem de 10px da borda direita da lista
          if (Math.abs(e.clientX - rect.right) <= 10) {
            _wswResizerState.isResizing = true;
            _wswResizerState.startX = e.clientX;
            _wswResizerState.startWidth = rect.width;
            _wswResizerState.listEl = listEl;
  
            document.body.classList.add('wsw-is-resizing');
            e.preventDefault();
          }
        } catch (err) {}
      });
  
      // Reset ao dar duplo clique na divisória (restaura 460px)
      document.addEventListener('dblclick', function (e) {
        try {
          if (window.innerWidth <= 960) return;
  
          var listEl = getTicketsListElement();
          if (!listEl || !listEl.isConnected) return;
  
          var rect = listEl.getBoundingClientRect();
          if (Math.abs(e.clientX - rect.right) <= 10) {
            document.documentElement.style.setProperty('--wsw-tickets-width', '460px');
            localStorage.removeItem('wsw_tickets_width');
            e.preventDefault();
          }
        } catch (err) {}
      });
  
      // Movimento do arrasto
      document.addEventListener('mousemove', function (e) {
        try {
          if (!_wswResizerState.isResizing) return;
  
          var deltaX = e.clientX - _wswResizerState.startX;
          var newWidth = _wswResizerState.startWidth + deltaX;
  
          // Limites estritos: mínimo 460px e máximo 650px
          var minWidth = 460;
          var maxWidth = 650;
  
          newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
  
          document.documentElement.style.setProperty('--wsw-tickets-width', Math.round(newWidth) + 'px');
        } catch (err) {}
      });
  
      // Fim do arrasto
      function endResize() {
        try {
          if (_wswResizerState.isResizing) {
            _wswResizerState.isResizing = false;
            document.body.classList.remove('wsw-is-resizing');
  
            var currentWidth = getComputedStyle(document.documentElement)
              .getPropertyValue('--wsw-tickets-width')
              .trim();
  
            if (currentWidth) {
              localStorage.setItem('wsw_tickets_width', currentWidth);
            }
          }
        } catch (err) {}
      }
  
      document.addEventListener('mouseup', endResize);
      window.addEventListener('blur', endResize);
    } catch (e) {}
  }

  // --- [Módulo: 04-ticket-connection.js] ---
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

  // --- [Módulo: 05-mobile-fixes.js] ---
  // ============================================================================
  // MOBILE & PWA FIX - Elimina espaços indevidos e calcula altura 100%
  // ============================================================================
  
  function fixMobileChatHeight() {
    try {
      if (window.innerWidth > 960) return;
  
      // 1. Garante que o espaçador do topo fique travado em 48px
      const mainEl = document.getElementById('custom-css-content');
      if (mainEl && mainEl.firstElementChild && mainEl.firstElementChild.isConnected) {
        mainEl.firstElementChild.style.maxHeight = '48px';
        mainEl.firstElementChild.style.minHeight = '48px';
        mainEl.firstElementChild.style.height = '48px';
        mainEl.firstElementChild.style.flex = '0 0 48px';
      }
  
      // 2. Zera padding/margin de 56px em todos os containers pais e wrappers do chat
      const selectors = [
        '#custom-css-content',
        '#custom-css-content > div',
        '#custom-css-content > .MuiPaper-root',
        '#drawer-container',
        '.custom-css-ticket',
        '#drawer-container > .MuiPaper-root',
        'div[class*="mainPaper"]',
        'div[class*="chatContainer"]',
        'div[class*="mainContainer"]'
      ];
  
      document.querySelectorAll(selectors.join(', ')).forEach(function (el) {
        if (!el || !el.isConnected) return;
        if (el.style.paddingBottom && el.style.paddingBottom.indexOf('56') !== -1) {
          el.style.paddingBottom = '0px';
        }
        if (el.style.marginBottom && el.style.marginBottom.indexOf('56') !== -1) {
          el.style.marginBottom = '0px';
        }
        if (el.style.height && el.style.height.indexOf('56') !== -1) {
          el.style.height = '100%';
        }
      });
  
      // 3. Garante que o wrapper de mensagens ocupe o espaço restante
      const messagesWrapper = document.querySelector('#messagesList');
      if (messagesWrapper && messagesWrapper.parentElement && messagesWrapper.parentElement.isConnected) {
        messagesWrapper.parentElement.style.flex = '1 1 auto';
        messagesWrapper.parentElement.style.minHeight = '0';
      }
    } catch (e) {
      // Silencioso
    }
  }

  // --- [Módulo: 06-main.js] ---
  // ============================================================================
  // EVENTOS GLOBAIS E INICIALIZAÇÃO BLINDADA
  // ============================================================================
  
  function syncContactDrawerDesktop() {
    try {
      if (window.innerWidth <= 960) return;
      const drawerContainer = document.getElementById('drawer-container');
      const contactDrawer = document.querySelector('.custom-css-contact-drawer');
      if (!drawerContainer || !contactDrawer || !drawerContainer.isConnected || !contactDrawer.isConnected) return;
  
      const style = contactDrawer.getAttribute('style') || '';
      const isClosed = style.indexOf('visibility: hidden') !== -1 ||
                       style.indexOf('translateX(440px)') !== -1 ||
                       style.indexOf('translateX(320px)') !== -1;
  
      if (!isClosed) {
        drawerContainer.classList.add('contact-drawer-open');
      } else {
        drawerContainer.classList.remove('contact-drawer-open');
      }
    } catch (e) {
      // Silencioso
    }
  }
  
  // Execução isolada: falha em um módulo NUNCA interrompe os demais nem quebra o React
  function runAllInits() {
    try { initCustomTopbar(); } catch (e) {}
    try { initCustomTicketActions(); } catch (e) {}
    try { alignTicketHeaderMenuButton(); } catch (e) {}
    try { initTicketsSearchToggle(); } catch (e) {}
    try { syncTicketConnectionStatus(); } catch (e) {}
    try { initResizablePanel(); } catch (e) {}
    try { fixMobileChatHeight(); } catch (e) {}
    try { syncContactDrawerDesktop(); } catch (e) {}
  }
  
  // Fecha as gavetas ao clicar fora
  document.addEventListener('click', function (e) {
    try {
      // Topbar (Fecha a gaveta ao clicar fora)
      const topWrapper = document.getElementById('custom-topbar-wrapper');
      const topDrawer = document.getElementById('custom-topbar-secondary-drawer');
      const topToggle = document.getElementById('custom-topbar-toggle-btn');
      if (topWrapper && !topWrapper.contains(e.target) && topDrawer) {
        topDrawer.classList.remove('is-open');
        if (topToggle) topToggle.classList.remove('is-active');
      }
  
      // Ticket Actions
      const actionsContainer = document.querySelector('.custom-css-ticket-actions');
      const ticketToggle = document.getElementById('custom-ticket-actions-toggle-btn');
      if (actionsContainer && ticketToggle && !ticketToggle.contains(e.target) && !e.target.closest('.ticket-item-secondary')) {
        actionsContainer.classList.remove('ticket-drawer-open');
        ticketToggle.classList.remove('is-active');
      }
  
      // Toolbar Tickets Search Dropdown (Fecha ao clicar fora da toolbar caso o input esteja vazio)
      const toolbar = document.querySelector('.custom-css-tickets-toolbar');
      const searchToggle = document.getElementById('custom-tickets-search-toggle-btn');
      if (toolbar && toolbar.classList.contains('is-search-open') && !toolbar.contains(e.target)) {
        const searchInput = toolbar.querySelector('.custom-css-ticket-search input');
        const hasValue = searchInput && searchInput.value && searchInput.value.trim().length > 0;
        if (!hasValue) {
          toolbar.classList.remove('is-search-open');
          if (searchToggle) {
            searchToggle.setAttribute('aria-pressed', 'false');
            searchToggle.classList.remove('is-active');
          }
        }
      }
    } catch (err) {}
  });
  
  window.addEventListener('resize', function () {
    try { fixMobileChatHeight(); } catch (e) {}
  });
  
  // Inicialização segura após o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(runAllInits, 10);
    });
  } else {
    setTimeout(runAllInits, 10);
  }
  
  // Único MutationObserver coordenado com debounce seguro para não concorrer com a montagem do React
  let debounceTimeout = null;
  const observer = new MutationObserver(function () {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function () {
      runAllInits();
    }, 70);
  });
  
  try {
    observer.observe(document.body, { childList: true, subtree: true });
  } catch (e) {}

})();
