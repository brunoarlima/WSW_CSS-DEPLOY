// ============================================================================
// CABEÇALHO DO TICKET - Alinhamento, Limpeza & Toggle de Contato
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

  // Toggle do Drawer de Contato ao clicar no Avatar/Cabeçalho do Ticket
  const cardHeader = header.querySelector('.MuiCardHeader-root');
  if (cardHeader && !cardHeader.dataset.hasToggleAttached) {
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
}
