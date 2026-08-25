// ============================================================================
// TOPBAR (APPBAR) - Organização de Ícones & Gaveta Retrátil
// ============================================================================
// PRINCÍPIO ZERO REPARENTING: Este módulo NUNCA executa appendChild, prepend,
// insertBefore ou remove em elementos gerenciados pelo React (Virtual DOM).
// A organização visual é 100% delegada ao CSS via classes identificadoras.
// As classes são aplicadas no filho DIRETO do .MuiToolbar-root para que o
// Flexbox order tenha efeito real no layout.
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

    // -------------------------------------------------------------------------
    // Helper: retorna o filho DIRETO do toolbar que contém o elemento.
    // O Flexbox `order` só funciona em filhos diretos do container flex.
    // Sem este helper, o `order` aplicado a um botão dentro de um wrapper
    // React não teria efeito na posição visual do grupo.
    // -------------------------------------------------------------------------
    function getToolbarChild(el) {
      if (!el || !el.isConnected) return null;
      let node = el;
      while (node && node.parentElement && node.parentElement !== toolbar) {
        node = node.parentElement;
      }
      return (node && node.parentElement === toolbar) ? node : null;
    }

    // -------------------------------------------------------------------------
    // PASSO 1: Identifica os elementos-alvo (sem movê-los)
    // -------------------------------------------------------------------------
    const ping = appbar.querySelector('[data-appbar="ping"]');
    const notifications = appbar.querySelector('button[data-appbar="notifications"]') ||
                          appbar.querySelector('button:has(svg[data-testid*="Notification"])') ||
                          appbar.querySelector('button[aria-label*="notifica" i]');
    const user = appbar.querySelector('button[data-appbar="user"]');
    const status = appbar.querySelector('[data-icon="status"], [data-appbar="status"]') ||
                   appbar.querySelector('.custom-css-topbar-actions > :last-child');

    // -------------------------------------------------------------------------
    // PASSO 2: Resolve o filho direto do toolbar para cada elemento-alvo
    // e injeta a classe identificadora NESSE filho direto.
    // -------------------------------------------------------------------------

    // Ping
    const pingTarget = getToolbarChild(ping) || ping;
    if (pingTarget && pingTarget.isConnected) {
      pingTarget.classList.add('custom-topbar-ping');
    }

    // Notificações — resolve o wrapper direto do toolbar
    const notifTarget = getToolbarChild(notifications);
    if (notifTarget && notifTarget.isConnected) {
      notifTarget.classList.add('custom-topbar-action', 'custom-topbar-action--quick', 'custom-topbar-action--notif');
    } else if (notifications && notifications.isConnected) {
      notifications.classList.add('custom-topbar-action', 'custom-topbar-action--quick', 'custom-topbar-action--notif');
    }

    // Usuário
    const userTarget = getToolbarChild(user);
    if (userTarget && userTarget.isConnected) {
      userTarget.classList.add('custom-topbar-action', 'custom-topbar-action--quick', 'custom-topbar-action--user');
    } else if (user && user.isConnected) {
      user.classList.add('custom-topbar-action', 'custom-topbar-action--quick', 'custom-topbar-action--user');
    }

    // Status
    const statusTarget = getToolbarChild(status);
    if (statusTarget && statusTarget.isConnected) {
      statusTarget.classList.add('custom-topbar-action', 'custom-topbar-action--quick', 'custom-topbar-action--status');
    } else if (status && status.isConnected) {
      status.classList.add('custom-topbar-action', 'custom-topbar-action--quick', 'custom-topbar-action--status');
    }

    // -------------------------------------------------------------------------
    // PASSO 3: Botões secundários — classifica wrappers diretos do toolbar,
    // evitando re-classificar wrappers já marcados como quick-actions.
    // -------------------------------------------------------------------------
    const classifiedTargets = new Set([pingTarget, notifTarget, userTarget, statusTarget].filter(Boolean));
    const allButtons = appbar.querySelectorAll('button.MuiIconButton-root, button[data-appbar]');
    let hasSecondaryBadge = false;

    allButtons.forEach(function (btn) {
      if (
        !btn || !btn.isConnected ||
        btn === notifications || btn === user || btn === status ||
        btn.getAttribute('data-appbar') === 'menu' ||
        btn.getAttribute('aria-label') === 'open drawer' ||
        btn.id === 'custom-topbar-toggle-btn'
      ) {
        return;
      }

      const wrapper = getToolbarChild(btn) || btn;

      // Não reclassifica wrappers que já receberam classes de quick-action
      if (classifiedTargets.has(wrapper)) return;
      classifiedTargets.add(wrapper);

      wrapper.classList.add('custom-topbar-action', 'custom-topbar-action--secondary');

      if (!hasSecondaryBadge && hasActiveBadge(wrapper)) {
        hasSecondaryBadge = true;
      }
    });

    // -------------------------------------------------------------------------
    // PASSO 4: Cria e insere o botão de toggle (elemento 100% vanilla, seguro)
    // O toggleBtn é o ÚNICO elemento que o script cria e insere no DOM.
    // -------------------------------------------------------------------------
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
        // Alterna estado no appbar — o CSS cuida da gaveta visual
        appbar.classList.toggle('custom-topbar-drawer-open');
        toggleBtn.classList.toggle('is-active');
      });

      // Inserção segura: toggleBtn foi criado por este script, não pelo React
      if (toolbar.isConnected) {
        toolbar.appendChild(toggleBtn);
      }
    }

    // -------------------------------------------------------------------------
    // PASSO 5: Atualiza indicador de badge no botão toggle (apenas leitura)
    // -------------------------------------------------------------------------
    if (hasSecondaryBadge) {
      toggleBtn.classList.add('has-badge');
    } else {
      toggleBtn.classList.remove('has-badge');
    }
  } catch (e) {
    // Silencioso para evitar quebrar React
  }
}
