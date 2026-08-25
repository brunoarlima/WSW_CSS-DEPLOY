// ============================================================================
// REDIMENSIONAMENTO FLUIDO DE PAINÉIS (DESKTOP)
// 1. Painel de Tickets (Esquerda/Borda Direita): min 465px | max 680px | Snap-to-Collapse
// 2. Contact Drawer (Direita/Borda Esquerda): min 320px | max 520px (padrão 340px)
// Altera exclusivamente variáveis CSS no :root (--wsw-tickets-width e --wsw-contact-drawer-width)
// Persiste as preferências no localStorage sem interferir no Virtual DOM do React
// ============================================================================

(function () {
  try {
    // 1. Restaura largura do painel de tickets
    var savedTicketsWidth = localStorage.getItem('wsw_tickets_width');
    if (savedTicketsWidth) {
      var numTickets = parseFloat(savedTicketsWidth);
      if (!isNaN(numTickets)) {
        numTickets = Math.max(470, Math.min(numTickets, 680));
        document.documentElement.style.setProperty('--wsw-tickets-width', numTickets + 'px');
      } else {
        document.documentElement.style.setProperty('--wsw-tickets-width', savedTicketsWidth);
      }
    }

    // 2. Restaura largura do Contact Drawer (Painel lateral do contato)
    var savedContactWidth = localStorage.getItem('wsw_contact_drawer_width');
    if (savedContactWidth) {
      var numContact = parseFloat(savedContactWidth);
      if (!isNaN(numContact)) {
        numContact = Math.max(320, Math.min(numContact, 520));
        document.documentElement.style.setProperty('--wsw-contact-drawer-width', numContact + 'px');
      } else {
        document.documentElement.style.setProperty('--wsw-contact-drawer-width', savedContactWidth);
      }
    }
  } catch (e) { }
})();

var _wswResizerState = {
  isResizing: false,
  activeTarget: null,    // 'tickets' | 'contact-drawer'
  startX: 0,
  startWidth: 0,
  targetEl: null,
  listenersAttached: false,
  snapTriggered: false   // Evita múltiplos disparos do snap-to-collapse no mesmo arrasto
};

// -----------------------------------------------------------------------
// Dispara o colapso da Sidebar via .click() no botão React de toggle.
// Seguro: não toca no DOM, não move nós — apenas simula um clique que
// passa pelo sistema de eventos do React normalmente.
// -----------------------------------------------------------------------
function _wswCollapseSidebar() {
  try {
    var sidebar = document.querySelector('.custom-css-sidebar');
    if (!sidebar || !sidebar.isConnected) return;

    // Já está recolhida — nada a fazer
    if (sidebar.getAttribute('data-collapsed') === 'true') return;

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

    function getContactDrawerElement() {
      var drawer = document.querySelector('.custom-css-contact-drawer');
      if (!drawer || !drawer.isConnected) return null;

      // Verifica se o drawer está visível/aberto
      var style = drawer.getAttribute('style') || '';
      var isClosed = style.indexOf('visibility: hidden') !== -1 ||
        style.indexOf('translateX(440px)') !== -1 ||
        style.indexOf('translateX(320px)') !== -1 ||
        style.indexOf('translateX(520px)') !== -1;

      if (isClosed) return null;
      return drawer;
    }

    // Início do arrasto (Mouse)
    document.addEventListener('mousedown', function (e) {
      try {
        if (window.innerWidth <= 960 || e.button !== 0) return;

        // 1. Checa se o clique foi na borda direita do painel de Tickets
        var listEl = getTicketsListElement();
        if (listEl && listEl.isConnected) {
          var rectTickets = listEl.getBoundingClientRect();
          if (Math.abs(e.clientX - rectTickets.right) <= 10) {
            _wswResizerState.isResizing = true;
            _wswResizerState.activeTarget = 'tickets';
            _wswResizerState.startX = e.clientX;
            _wswResizerState.startWidth = rectTickets.width;
            _wswResizerState.targetEl = listEl;
            _wswResizerState.snapTriggered = false;

            document.body.classList.add('wsw-is-resizing');
            e.preventDefault();
            return;
          }
        }

        // 2. Checa se o clique foi na borda esquerda do Contact Drawer (aberto)
        var contactDrawer = getContactDrawerElement();
        if (contactDrawer && contactDrawer.isConnected) {
          var rectContact = contactDrawer.getBoundingClientRect();
          if (Math.abs(e.clientX - rectContact.left) <= 10) {
            _wswResizerState.isResizing = true;
            _wswResizerState.activeTarget = 'contact-drawer';
            _wswResizerState.startX = e.clientX;
            _wswResizerState.startWidth = rectContact.width;
            _wswResizerState.targetEl = contactDrawer;

            document.body.classList.add('wsw-is-resizing');
            e.preventDefault();
            return;
          }
        }
      } catch (err) { }
    });

    // Reset ao dar duplo clique na divisória
    document.addEventListener('dblclick', function (e) {
      try {
        if (window.innerWidth <= 960) return;

        // Reset do painel de tickets (restaura 465px)
        var listEl = getTicketsListElement();
        if (listEl && listEl.isConnected) {
          var rectTickets = listEl.getBoundingClientRect();
          if (Math.abs(e.clientX - rectTickets.right) <= 10) {
            document.documentElement.style.setProperty('--wsw-tickets-width', '465px');
            localStorage.removeItem('wsw_tickets_width');
            e.preventDefault();
            return;
          }
        }

        // Reset do Contact Drawer (restaura 340px)
        var contactDrawer = getContactDrawerElement();
        if (contactDrawer && contactDrawer.isConnected) {
          var rectContact = contactDrawer.getBoundingClientRect();
          if (Math.abs(e.clientX - rectContact.left) <= 10) {
            document.documentElement.style.setProperty('--wsw-contact-drawer-width', '340px');
            localStorage.removeItem('wsw_contact_drawer_width');
            e.preventDefault();
            return;
          }
        }
      } catch (err) { }
    });

    // Movimento do arrasto
    document.addEventListener('mousemove', function (e) {
      try {
        if (!_wswResizerState.isResizing) return;

        var deltaX = e.clientX - _wswResizerState.startX;

        // A) Redimensionamento do Painel de Tickets
        if (_wswResizerState.activeTarget === 'tickets') {
          var minTickets = 465;
          var maxTickets = 680;
          var snapThreshold = 30;

          var rawTicketsWidth = _wswResizerState.startWidth + deltaX;

          // Snap-to-collapse da sidebar ao arrastar além do mínimo
          if (rawTicketsWidth < minTickets - snapThreshold && !_wswResizerState.snapTriggered) {
            _wswResizerState.snapTriggered = true;
            endResize();
            _wswCollapseSidebar();
            return;
          }

          var newTicketsWidth = Math.max(minTickets, Math.min(rawTicketsWidth, maxTickets));
          document.documentElement.style.setProperty('--wsw-tickets-width', Math.round(newTicketsWidth) + 'px');
        }

        // B) Redimensionamento do Contact Drawer (borda esquerda: arrastar para esquerda = aumenta)
        else if (_wswResizerState.activeTarget === 'contact-drawer') {
          var minContact = 320;
          var maxContact = 520;

          // Arrastar para a esquerda (deltaX negativo) aumenta a largura do drawer ancorado à direita
          var rawContactWidth = _wswResizerState.startWidth - deltaX;
          var newContactWidth = Math.max(minContact, Math.min(rawContactWidth, maxContact));

          document.documentElement.style.setProperty('--wsw-contact-drawer-width', Math.round(newContactWidth) + 'px');
        }
      } catch (err) { }
    });

    // Fim do arrasto
    function endResize() {
      try {
        if (_wswResizerState.isResizing) {
          var currentTarget = _wswResizerState.activeTarget;
          _wswResizerState.isResizing = false;
          _wswResizerState.activeTarget = null;
          _wswResizerState.targetEl = null;
          document.body.classList.remove('wsw-is-resizing');

          if (currentTarget === 'tickets') {
            var currentTicketsWidth = getComputedStyle(document.documentElement)
              .getPropertyValue('--wsw-tickets-width')
              .trim();
            if (currentTicketsWidth) {
              localStorage.setItem('wsw_tickets_width', currentTicketsWidth);
            }
          } else if (currentTarget === 'contact-drawer') {
            var currentContactWidth = getComputedStyle(document.documentElement)
              .getPropertyValue('--wsw-contact-drawer-width')
              .trim();
            if (currentContactWidth) {
              localStorage.setItem('wsw_contact_drawer_width', currentContactWidth);
            }
          }
        }
      } catch (err) { }
    }

    document.addEventListener('mouseup', endResize);
    window.addEventListener('blur', endResize);
  } catch (e) { }
}
