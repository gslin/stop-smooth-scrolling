'use strict';

(function() {
    new Vue({
        el: '#app',
        data: {},
        methods: {
            deleteHostname: function(idx) {
                this.whitelist_hosts.splice(idx, 1);
            },
        }
    });
})();
