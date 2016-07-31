'use strict';

(function(){
    var whitelist_hosts = ['www.google.com'];

    if (-1 !== whitelist_hosts.indexOf(document.location.hostname)) {
        return;
    }

    document.addEventListener('DOMContentLoaded', function(){
        [document, window].forEach(function(target){
            ['mousewheel', 'wheel'].forEach(function(eventName){
                target.addEventListener(eventName, function(e){
                    e.stopPropagation();
                }, true);
            });

            target.addEventListener('keydown', function(event){
                /*
                 * 32 space, 33 pageup, 34 pagedown, 35 end, 36 home, 38 up, 40 down
                 */
                if (-1 !== [32, 33, 34, 35, 36, 38, 40].indexOf(event.which)) {
                    console.log(event.which);
                    event.stopPropagation();
                }
            }, true);
        });
    });
})();
