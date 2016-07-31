'use strict';

(function() {
    new Vue({
        el: '#app',
        data: {
            whitelist_hosts: [
                'www.google.com',       // Google Maps
            ],
        },
        methods: {
            addHostname: function() {
                var h = this.new_hostname.trim();
                if (-1 === this.whitelist_hosts.indexOf(h)) {
                    this.whitelist_hosts.push(h);

                    var that = this;
                    chrome.storage.sync.set({
                        whitelist_hosts: that.whitelist_hosts,
                    });
                }
                this.new_hostname = '';
            },
            deleteHostname: function(idx) {
                this.whitelist_hosts.splice(idx, 1);

                var that = this;
                chrome.storage.sync.set({
                    whitelist_hosts: that.whitelist_hosts,
                });
            },
        },
        ready: function() {
            var that = this;

            chrome.storage.sync.get({
                whitelist_hosts: [],
            }, function(items) {
                that.whitelist_hosts = items.whitelist_hosts;
            });
        }
    });
})();
