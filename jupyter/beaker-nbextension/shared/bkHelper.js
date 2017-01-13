define([
  'nbextensions/beaker/shared/bkGlobals',
  'nbextensions/beaker/shared/bkCoreManager',
  'nbextensions/beaker/shared/bkUtils',
], function(
  bkGlobals,
  bkCoreManager,
  bkUtils
) {

  var defaultPlotColors = {},
    GLOBALS = bkGlobals;

  defaultPlotColors[GLOBALS.THEMES.DEFAULT] = [
    "#FF1F77B4", // blue
    "#FFFF7F0E", // orange
    "#FF2CA02C", // green
    "#FFD62728", // red
    "#FF9467BD", // purple
    "#FF8C564B", // brown
    "#FFE377C2", // pink
    "#FF7F7F7F", // gray
    "#FFBCBD22", // pear
    "#FF17BECF",  // aqua
    "#FFAEC7E8",
    "#FFFFBB78",
    "#FF98DF8A",
    "#FFFF9896",
    "#FFC5B0D5",
    "#FFC49C94",
    "#FFF7B6D2",
    "#FFC7C7C7",
    "#FFDBDB8D",
    "#FF9EDAE5"
  ];

  defaultPlotColors[GLOBALS.THEMES.AMBIANCE] = [
    "#FF1F77B4", // blue
    "#FFFF7F0E", // orange
    "#FF2CA02C", // green
    "#FFD62728", // red
    "#FF9467BD", // purple
    "#FF8C564B", // brown
    "#FFE377C2", // pink
    "#FF7F7F7F", // gray
    "#FFBCBD22", // pear
    "#FF17BECF",  // aqua
    "#FFAEC7E8",
    "#FFFFBB78",
    "#FF98DF8A",
    "#FFFF9896",
    "#FFC5B0D5",
    "#FFC49C94",
    "#FFF7B6D2",
    "#FFC7C7C7",
    "#FFDBDB8D",
    "#FF9EDAE5"
  ];

  var getCurrentApp = function() {
    return bkCoreManager.getBkApp();
  };

  var bkHelper = {
    isChrome: !!window.chrome && !!window.chrome.webstore,
    defaultPlotColors: defaultPlotColors,
    getTheme: function () {
      return bkCoreManager.getTheme();
    },
    //http://stackoverflow.com/questions/7370943/retrieving-binary-file-content-using-javascript-base64-encode-it-and-reverse-de
    base64Encode: function(str) {
      var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var out = "", i = 0, len = str.length, c1, c2, c3;
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
          out += CHARS.charAt(c1 >> 2);
          out += CHARS.charAt((c1 & 0x3) << 4);
          out += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          out += CHARS.charAt(c1 >> 2);
          out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          out += CHARS.charAt((c2 & 0xF) << 2);
          out += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
      }
      return out;
    },
    getBeakerObject: function() {
      if (getCurrentApp() && getCurrentApp().getBeakerObject) {
        return getCurrentApp().getBeakerObject();
      } else {
        return { };
      }
    },
    timeout: function(func, ms) {
      return bkUtils.timeout(func,ms);
    }
  };

  return bkHelper;
});