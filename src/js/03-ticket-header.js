// ============================================================================
// CABEÇALHO DO TICKET - Alinhamento & Limpeza de Nós Irmãos Vazios
// ============================================================================

function alignTicketHeaderMenuButton() {
  const header = document.querySelector('.custom-css-ticket-header');
  if (!header) return;

  const menuBtn = header.querySelector(
    'button:has(svg path[d*="M3 18"]), button:has(svg[data-testid*="Menu"]), button:has(svg[data-testid*="Dehaze"]), button[title="Ações"], button[aria-label="Ações"], .custom-ticket-header-menu-btn'
  );

  if (menuBtn) {
    menuBtn.classList.add('custom-ticket-header-menu-btn');
    menuBtn.setAttribute('title', 'Ações do atendimento');

    const parent = menuBtn.parentElement;
    if (parent && parent !== header) {
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
}
