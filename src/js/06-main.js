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
    const appbar = document.getElementById('custom-css-appbar') || document.querySelector('header.MuiAppBar-root');
    const topToggle = document.getElementById('custom-topbar-toggle-btn');
    if (appbar && !appbar.contains(e.target) && appbar.classList.contains('custom-topbar-drawer-open')) {
      appbar.classList.remove('custom-topbar-drawer-open');
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

    // Composer Actions Drawer (Fecha ao clicar fora da gaveta de ações quando visível)
    const composerDrawer = document.querySelector('.custom-css-composer div:has(> [aria-label="emojiPicker"]), .custom-css-composer .jss492');
    if (composerDrawer && composerDrawer.offsetParent !== null && !composerDrawer.contains(e.target)) {
      const composerOpenBtn = document.querySelector('.custom-css-composer > button, .custom-css-composer > span.MuiIconButton-root');
      if (!composerOpenBtn || !composerOpenBtn.contains(e.target)) {
        const composerCloseBtn = composerDrawer.querySelector('button:last-child');
        if (composerCloseBtn && typeof composerCloseBtn.click === 'function') {
          composerCloseBtn.click();
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
