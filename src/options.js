'use strict';

(function() {
  const default_whitelist_hosts = [
    '.figma.com',                       // Figma
    '.slack.com',                       // Slack
    'docs.google.com',                  // Google Docs
    'mail.google.com',                  // Gmail
    'www.bing.com',                     // Bing Maps
    'www.google.com',                   // Google Maps
    'www.netflix.com',                  // Netflix
    'www.openstreetmap.org',            // OpenStreetMaps
    'www.plurk.com',                    // Plurk
  ];

  new Vue({
    el: '#app',
    data: {
      whitelist_hosts: [],
    },
    methods: {
      addHostname: function() {
        var h = this.new_hostname.trim();
        if ('' === h) {
          alert('Empty hostname is not acceptable');
          return;
        }

        if (-1 !== this.whitelist_hosts.indexOf(h)) {
          alert(h + ' already exists');
          return;
        }

        this.whitelist_hosts.push(h);

        var that = this;
        chrome.storage.sync.set({
          whitelist_hosts: that.whitelist_hosts,
        });

        this.new_hostname = '';
      },
      deleteHostname: function(idx) {
        this.whitelist_hosts.splice(idx, 1);

        var that = this;
        chrome.storage.sync.set({
          whitelist_hosts: that.whitelist_hosts,
        });
      },
      resetToDefault: function() {
        var yn = confirm('Reset all whitelist settings?');
        if (!yn) {
          return;
        }

        this.whitelist_hosts = default_whitelist_hosts;

        var that = this;
        chrome.storage.sync.set({
          whitelist_hosts: that.whitelist_hosts,
        }, function() {
          document.location.reload();
        });
      }
    },
    ready: function() {
      var that = this;

      chrome.storage.sync.get({
        whitelist_hosts: default_whitelist_hosts,
      }, function(items) {
        that.whitelist_hosts = items.whitelist_hosts;
      });
    }
  });
})();
