define([
  './../../bower_components/moment-timezone/builds/moment-timezone-with-data.min'
], function(moment) {
  return {
    applyTimezone: function(timestamp, tz) {
      var time = moment(timestamp);
      if (tz) {
        if (tz.startsWith("GMT")) {
          time.utcOffset(tz);
        } else {
          time.tz(tz);
        }
      }
      return time;
    },
    formatTimestamp: function(timestamp, tz, format) {
      return this.applyTimezone(timestamp, tz).format(format);
    }
  };
});