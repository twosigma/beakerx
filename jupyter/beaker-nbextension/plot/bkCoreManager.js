define(function() {

  var bkCoreManager = {
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
  };

  return bkCoreManager;

});