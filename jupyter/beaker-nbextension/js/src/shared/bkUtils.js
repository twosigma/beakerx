define([
  './../plot/commonUtils'
], function(commonUtils) {
  var bkUtils = {
    generateId: function(a) {
      return 'a'+a;
    },
    applyTimezone: function(timestamp, tz) {
      return commonUtils.applyTimezone(timestamp, tz);
    },
    formatTimestamp: function(timestamp, tz, format) {
      return commonUtils.formatTimestamp(timestamp, tz, format);
    },
    rgbaToHex: function (r, g, b, a) {
      if(a == undefined){
        a = 0xFF;
      }
      var num = ((a & 0xFF) << 24) |
                ((r & 0xFF) << 16) |
                ((g & 0xFF) << 8)  |
                ((b & 0xFF));
      if(num < 0) {
        num = 0xFFFFFFFF + num + 1;
      }
      return "#" + num.toString(16);
    },
    timeout: function(fn, ms) {
      return setTimeout(fn, ms);
    },
    newDeferred: function() {
      return jQuery.Deferred();
    }
  };

  return bkUtils;
});