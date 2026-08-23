// ============================================================================
// CABEÇALHO DO TICKET - Alinhamento do Botão de Menu/Ações à Direita
// ============================================================================

function alignTicketHeaderMenuButton() {
  const header = document.querySelector('.custom-css-ticket-header');
  if (!header) return;

  const cardHeader = header.querySelector('.MuiCardHeader-root');
  if (!cardHeader) return;

  let actionContainer = header.querySelector('.MuiCardHeader-action');
  const menuBtn = header.querySelector('button:has(svg path[d*="M3 18"]), button:has(svg[data-testid*="Menu"]), button:has(svg[data-testid*="Dehaze"]), button[title="Ações"], button[aria-label="Ações"]');

  if (menuBtn) {
    menuBtn.classList.add('custom-ticket-header-menu-btn');
    if (actionContainer && menuBtn.parentElement !== actionContainer) {
      actionContainer.appendChild(menuBtn);
    }
  }
}
