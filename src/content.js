'use strict';

(() => {
  const p = new Promise(function(resolve) {
    chrome.storage.sync.get({
      whitelist_hosts: [],
    }, items => {
      const host = document.location.hostname;
      const full = host + document.location.pathname;
      for (const h of items.whitelist_hosts) {
        if (h.includes('/')) {
          /**
           * Match the domain name and path prefix e.g. `www.example.com/path`
           */
          if (full.startsWith(h)) {
            return;
          }
        } else if (host === h || (h.startsWith('.') && host.endsWith(h))) {
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
