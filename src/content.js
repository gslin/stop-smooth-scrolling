'use strict';

(() => {
  const p = new Promise(function(resolve) {
    chrome.storage.sync.get({
      whitelist_hosts: [],
    }, items => {
      for (const h of items.whitelist_hosts) {
        if (document.location.hostname === h) {
          return;
        }
        if (h.startsWith('.') && document.location.hostname.endsWith(h)) {
          return;
        }
      }

      resolve();
    });
  });

  p.then(() => {
    document.addEventListener('DOMContentLoaded', () => {
      [document, window].forEach(target => {
        ['mousewheel', 'wheel'].forEach(eventName => {
          target.addEventListener(eventName, e => {
            e.stopPropagation();
          }, true);
        });

        target.addEventListener('keydown', event => {
          /*
           * Don't block keydown event in input & textarea.
           */
          if (document.activeElement && ['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
            return;
          }

          /*
           * 32 space, 33 pageup, 34 pagedown, 35 end, 36 home, 38 up, 40 down.
           */
          if ([32, 33, 34, 35, 36, 38, 40].includes(event.which)) {
            event.stopPropagation();
          }
        }, true);
      });
    });
  });
})();
