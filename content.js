'use strict';

(function(){
    document.addEventListener('DOMContentLoaded', function(){
        [document, window].forEach(function(target){
            ['mousewheel', 'wheel'].forEach(function(eventName){
                target.addEventListener(eventName, function(e){
                    e.stopPropagation();
                }, true);
            });

            target.addEventListener('keydown', function(event){
                /*
                 * 33 pageup, 34 pagedown, 35 end, 36 home, 38 up, 40 down
                 */
                if (-1 !== [33, 34, 35, 36, 38, 40].indexOf(event.which)) {
                    console.log(event.which);
                    event.stopPropagation();
                }
            }, true);
        });
    });
})();
