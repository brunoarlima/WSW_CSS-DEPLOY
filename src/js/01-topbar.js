// ============================================================================
// TOPBAR (APPBAR) - Organização de Ícones & Gaveta Retrátil
// ============================================================================

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
