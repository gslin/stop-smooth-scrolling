'use strict';

(function(){
    var p = new Promise(function(resolve) {
        chrome.storage.sync.get({
            whitelist_hosts: [],
        }, function(items) {
            if (-1 !== items.whitelist_hosts.indexOf(document.location.hostname)) {
                return;
            }
            resolve();
        });
    });

    p.then(function() {
        document.addEventListener('DOMContentLoaded', function(){
            /*
             * If known map service is loaded, then ignore mouse wheel blocking.
             */
            var mapEnabled = false;
            if (document.querySelector('script[src^="https://maps.google"], script[src^="//maps.google"]')) {
                mapEnabled = true;
            }

            [document, window].forEach(function(target){
                if (!mapEnabled) {
                    ['mousewheel', 'wheel'].forEach(function(eventName){
                        target.addEventListener(eventName, function(e){
                            e.stopPropagation();
                        }, true);
                    });
                }

                target.addEventListener('keydown', function(event){
                    /*
                     * Don't block keydown event in input & textarea.
                     */
                    if (document.activeElement && -1 !== ['input', 'textarea'].indexOf(document.activeElement.tagName.toLowerCase())) {
                        return;
                    }

                    /*
                     * 32 space, 33 pageup, 34 pagedown, 35 end, 36 home, 38 up, 40 down
                     */
                    if (-1 !== [32, 33, 34, 35, 36, 38, 40].indexOf(event.which)) {
                        event.stopPropagation();
                    }
                }, true);
            });
        });
    });
})();
