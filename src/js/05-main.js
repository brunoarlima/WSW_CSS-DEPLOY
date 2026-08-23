// ============================================================================
// EVENTOS GLOBAIS E INICIALIZAÇÃO
// ============================================================================

function runAllInits() {
  initCustomTopbar();
  initCustomTicketActions();
  alignTicketHeaderMenuButton();
  fixMobileChatHeight();
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

window.addEventListener('resize', fixMobileChatHeight);

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
