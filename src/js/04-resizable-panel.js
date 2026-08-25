// ============================================================================
// REDIMENSIONAMENTO FLUIDO DO PAINEL DE TICKETS (DESKTOP)
// Altera exclusivamente a variável CSS --wsw-tickets-width no :root
// Persiste a preferência no localStorage sem interferir no Virtual DOM do React
// Limites: mínimo 465px | máximo 680px
// Snap-to-Collapse: arrastar além do mínimo (>30px) fecha a sidebar via .click()
// no botão React [data-appbar="menu"] — zero manipulação de DOM, zero reparenting
// ============================================================================

(function () {
  try {
    var savedWidth = localStorage.getItem('wsw_tickets_width');
    if (savedWidth) {
      var num = parseFloat(savedWidth);
      if (!isNaN(num)) {
        num = Math.max(465, Math.min(num, 680));
        document.documentElement.style.setProperty('--wsw-tickets-width', num + 'px');
      } else {
        document.documentElement.style.setProperty('--wsw-tickets-width', savedWidth);
      }
    }
  } catch (e) { }
})();

var _wswResizerState = {
  isResizing: false,
  startX: 0,
  startWidth: 0,
  listEl: null,
  listenersAttached: false,
  snapTriggered: false   // Evita múltiplos disparos do snap-to-collapse no mesmo arrasto
};

// -----------------------------------------------------------------------
// Dispara o colapso da Sidebar via .click() no botão React de toggle.
// Seguro: não toca no DOM, não move nós — apenas simula um clique que
// passa pelo sistema de eventos do React normalmente.
// O botão [data-appbar="menu"] funciona mesmo quando oculto por CSS
// (display:none não impede o disparo de .click() programático).
// -----------------------------------------------------------------------
function _wswCollapseSidebar() {
  try {
    var sidebar = document.querySelector('.custom-css-sidebar');
    if (!sidebar || !sidebar.isConnected) return;

    // Já está recolhida — nada a fazer
    if (sidebar.getAttribute('data-collapsed') === 'true') return;

    // Botão React de toggle da sidebar (visível quando recolhida, oculto quando expandida,
    // mas .click() funciona em ambos os estados)
    var toggleBtn = document.querySelector('button[data-appbar="menu"]') ||
                    document.querySelector('button[aria-label="open drawer"]');

    if (toggleBtn && toggleBtn.isConnected) {
      toggleBtn.click();
    }
  } catch (e) { }
}

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
          _wswResizerState.snapTriggered = false; // Reseta flag a cada novo arrasto

          document.body.classList.add('wsw-is-resizing');
          e.preventDefault();
        }
      } catch (err) { }
    });

    // Reset ao dar duplo clique na divisória (restaura 465px)
    document.addEventListener('dblclick', function (e) {
      try {
        if (window.innerWidth <= 960) return;

        var listEl = getTicketsListElement();
        if (!listEl || !listEl.isConnected) return;

        var rect = listEl.getBoundingClientRect();
        if (Math.abs(e.clientX - rect.right) <= 10) {
          document.documentElement.style.setProperty('--wsw-tickets-width', '465px');
          localStorage.removeItem('wsw_tickets_width');
          e.preventDefault();
        }
      } catch (err) { }
    });

    // Movimento do arrasto
    document.addEventListener('mousemove', function (e) {
      try {
        if (!_wswResizerState.isResizing) return;

        var minWidth = 465;
        var maxWidth = 680;
        // Quantidade de px além do mínimo que dispara o colapso da sidebar
        var snapThreshold = 30;

        var deltaX = e.clientX - _wswResizerState.startX;
        var rawWidth = _wswResizerState.startWidth + deltaX;

        // ---------------------------------------------------------------
        // SNAP-TO-COLLAPSE: se o usuário continuar arrastando além do
        // limiar de snap (minWidth - snapThreshold), fecha a sidebar.
        // Executa apenas uma vez por sessão de arrasto (snapTriggered).
        // ---------------------------------------------------------------
        if (rawWidth < minWidth - snapThreshold && !_wswResizerState.snapTriggered) {
          _wswResizerState.snapTriggered = true;
          endResize();          // Finaliza o arrasto imediatamente
          _wswCollapseSidebar(); // Colapsa a sidebar via evento React
          return;
        }

        var newWidth = Math.max(minWidth, Math.min(rawWidth, maxWidth));
        document.documentElement.style.setProperty('--wsw-tickets-width', Math.round(newWidth) + 'px');
      } catch (err) { }
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
      } catch (err) { }
    }

    document.addEventListener('mouseup', endResize);
    window.addEventListener('blur', endResize);
  } catch (e) { }
}
