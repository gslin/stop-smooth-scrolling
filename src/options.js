'use strict';

(function() {
    new Vue({
        el: '#app',
        data: {},
        methods: {
            addHostname: function() {
                var h = this.new_hostname.trim();
                if (-1 === this.whitelist_hosts.indexOf(h)) {
                    this.whitelist_hosts.push(h);
                }
                this.new_hostname = '';
            },
            deleteHostname: function(idx) {
                this.whitelist_hosts.splice(idx, 1);
            },
        },
    });
})();
