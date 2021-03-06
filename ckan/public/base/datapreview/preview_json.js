// json preview module
ckan.module('jsonpreview', function (jQuery) {
  return {
    initialize: function () {
      var self = this;
      jQuery.ajax(preload_resource['url'], {
        type: 'GET',
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(data, textStatus, jqXHR) {
          var html = JSON.stringify(data, null, 4);
          var pretty = self._syntaxHighlight(html);
          self.el.html(pretty);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          this.sandbox.notify(message, 'textStatus');
        }
      });
    },

    // from: http://stackoverflow.com/a/7220510/214950
    _syntaxHighlight: function(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }
  };
});