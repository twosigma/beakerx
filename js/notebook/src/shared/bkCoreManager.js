/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

define([
  './bkUtils'
], function(
  bkUtils
) {

  var beakerObj = { //TODO MOCK - replace
    beakerObj: {
      prefs: {
        outputColumnLimit: 500,
        outputLineLimit: 100000,
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
    },
    showFileSaveDialog: function(data) {
      var deferred = bkUtils.newDeferred();

      if ((!data.extension || data.extension.trim().length === 0) && data.initUri) {
        var filename = data.initUri.substring(data.initUri.lastIndexOf(bkUtils.serverOS.isWindows() ? '\\' : '/') + 1);
        data.extension = filename.substring(filename.lastIndexOf('.') + 1);
      }
      data.type="SAVE";
      data.title = "Save As";
      data.okButtonTitle = "Save";

      var dd = $uibModal.open({
        templateUrl: "app/template/filedialog.jst.html",
        controller: 'fileDialogCtrl',
        windowClass: 'beaker-sandbox',
        backdropClass: 'beaker-sandbox',
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        size: 'lg',
        resolve: {
          strategy: function () {
            return new FileChooserStrategy(data);
          }
        }
      });
      dd.result.then(
        function (result) {
          deferred.resolve({
            uri: result,
            uriType: GLOBALS.FILE_LOCATION.FILESYS
          });
        }, function () {
          deferred.reject();
        }).catch(function () {
        deferred.reject();
      });
      return deferred.promise;
    }
  };

  return bkCoreManager;

});