define(function() {

  var beakerObj = { //TODO MOCK - replace
    beakerObj: {
      prefs: {
        outputColumnLimit: 50,
        outputLineLimit: 1000,
        theme: {
          name: 'default',
          plotColors: [
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
          ]
        }
      }
    }
  };

  var bkCoreManager = {
    _bkAppImpl: {
      getBeakerObject: function() {
        return beakerObj;
      }
    },
    _prefs: {
      setTheme: function (theme) {
        bkCoreManager.colorize(theme);
        bkHelper.setInputCellTheme(theme);
        this.theme = theme;
        bkHelper.setThemeToBeakerObject();
      },
      getTheme: function () {
        if (this.theme === undefined) {
          return "default";
        }
        return this.theme;
      },
      setFSOrderBy: function (fs_order_by) {
        this.fs_order_by = fs_order_by;
      },
      getFSOrderBy: function () {
        return this.fs_order_by;
      },
      setFSReverse: function (fs_reverse) {
        this.fs_reverse = fs_reverse;
      },
      getFSReverse: function () {
        return this.fs_reverse;
      }
    },
    getTheme: function () {
      return this._prefs.getTheme();
    },
    getBkApp: function() {
      return this._bkAppImpl;
    }
  };

  return bkCoreManager;

});