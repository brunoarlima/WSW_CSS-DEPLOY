// ============================================================================
// MOBILE & PWA FIX - Elimina espaços indevidos e calcula altura 100%
// ============================================================================

function fixMobileChatHeight() {
  try {
    if (window.innerWidth > 960) return;

    // 1. Garante que o espaçador do topo fique travado em 48px
    const mainEl = document.getElementById('custom-css-content');
    if (mainEl && mainEl.firstElementChild && mainEl.firstElementChild.isConnected) {
      mainEl.firstElementChild.style.maxHeight = '48px';
      mainEl.firstElementChild.style.minHeight = '48px';
      mainEl.firstElementChild.style.height = '48px';
      mainEl.firstElementChild.style.flex = '0 0 48px';
    }

    // 2. Zera padding/margin de 56px em todos os containers pais e wrappers do chat
    const selectors = [
      '#custom-css-content',
      '#custom-css-content > div',
      '#custom-css-content > .MuiPaper-root',
      '#drawer-container',
      '.custom-css-ticket',
      '#drawer-container > .MuiPaper-root',
      'div[class*="mainPaper"]',
      'div[class*="chatContainer"]',
      'div[class*="mainContainer"]'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach(function (el) {
      if (!el || !el.isConnected) return;
      if (el.style.paddingBottom && el.style.paddingBottom.indexOf('56') !== -1) {
        el.style.paddingBottom = '0px';
      }
      if (el.style.marginBottom && el.style.marginBottom.indexOf('56') !== -1) {
        el.style.marginBottom = '0px';
      }
      if (el.style.height && el.style.height.indexOf('56') !== -1) {
        el.style.height = '100%';
      }
    });

    // 3. Garante que o wrapper de mensagens ocupe o espaço restante
    const messagesWrapper = document.querySelector('#messagesList');
    if (messagesWrapper && messagesWrapper.parentElement && messagesWrapper.parentElement.isConnected) {
      messagesWrapper.parentElement.style.flex = '1 1 auto';
      messagesWrapper.parentElement.style.minHeight = '0';
    }
  } catch (e) {
    // Silencioso
  }
}
