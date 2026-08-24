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
