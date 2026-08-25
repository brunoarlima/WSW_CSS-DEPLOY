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
