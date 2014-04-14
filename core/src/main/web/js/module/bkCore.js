/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
/**
 * M_bkCore
 * Holds the core of beaker utilities. It wraps of lower level utilities that come from other
 * modules.
 * The user facing directives also use the core as a communication/exchange layer.
 */
(function() {
  'use strict';
  var bkCore = angular.module('M_bkCore', [
    'ui.bootstrap',
    'ui.keypress',
    'M_generalUtils',
    'M_angularUtils',
    'M_commonUI',
    'M_bkUtils',
    'M_bkRecentMenu',
    'M_bkNotebookCellModelManager'
  ]);

  /**
   * bkCoreManager
   * - this acts as the global space for all view managers to use it as the communication channel
   * - bkUtils should be consider 'private' to beaker, external code should depend on bkHelper
   *     instead
   */
  bkCore.factory('bkCoreManager', function(
      $dialog, $location, $http, $q, bkUtils, bkSession, bkRecentMenu, fileChooserOp) {

    var FileSystemFileChooserStrategy = function (){
      var newStrategy = this;
      newStrategy.result = "";
      newStrategy.close = function(ev, closeFunc) {
        if (ev.which === 13) {
          closeFunc(this.result);
        }
      };
      newStrategy.treeViewfs = { // file service
        getChildren: function(path, callback) {
          var self = this;
          this.showSpinner = true;
          $http({
            method: 'GET',
            url: "/beaker/rest/file-io/getDecoratedChildren",
            params: {
              path: path
            }
          }).success(function(list) {
            self.showSpinner = false;
            callback(list);
          }).error(function() {
            self.showSpinner = false;
            console.log("Error loading children");
          });
        },
        open: function(path) {
          newStrategy.result = path;
        },
        showSpinner: false
      }
    };

    // importers are responsible for importing various formats into bkr
    // importer impl must define an 'import' method
    var _importers = {};
    var FORMAT_BKR = "bkr";
    _importers[FORMAT_BKR] = {
      import: function(notebookJson) {
        var notebookModel;
        try {
          notebookModel = angular.fromJson(notebookJson);
          // TODO, to be removed. Addressing loading a corrupted notebook.
          if (angular.isString(notebookModel)) {
            notebookModel = angular.fromJson(notebookModel);
            bkCoreManager.log("corrupted-notebook", { notebookUri: enhancedNotebookUri });
          }
        } catch (e) {
          console.error(e);
          console.error("This is not a valid Beaker notebook JSON");
          console.error(notebookJson);
          window.alert("Not a valid Beaker notebook");
          return;
        }
        return notebookModel;
      }
    };

    var LOCATION_DEFAULT = "default";
    var LOCATION_FILESYS = "file";
    var LOCATION_HTTP = "http";

    // fileLoaders are responsible for loading files and output the file content as string
    // fileLoader impl must define an 'load' method which returns a then-able
    var _fileLoaders = {};
    _fileLoaders[LOCATION_FILESYS] = {
      load: function(uri) {
        return bkUtils.loadFile(uri);
      }
    };
    _fileLoaders[LOCATION_HTTP] = {
      load: function(uri) {
        return bkUtils.loadHttp(uri);
      }
    };

    // fileSavers are responsible for saving various formats into bkr
    // fileLoader impl must define an 'load' method which returns a then-able
    var _fileSavers = {};

    _fileSavers[LOCATION_FILESYS] = {
      save: function(uri, contentAsString) {
        return bkUtils.saveFile(uri, contentAsString);
      }
    };

    _fileSavers[LOCATION_DEFAULT] = {
      // the default filesaver is used when destination uri is unknown.
      // the saver pops up an file chooser to solicit path
      save: function (toBeIgnored, contentAsString) {
        // TODO
      }
    };

    var bkCoreManager = {

      setImporter: function(format, importer) {
        _importers[format] = importer;
      },
      getImporter: function(format) {
        return _importers[format];
      },
      setFileLoader: function(uriType, fileLoader) {
        _fileLoaders[uriType] = fileLoader;
      },
      getFileLoader: function(uriType) {
        return _fileLoaders[uriType];
      },
      setFileSaver: function(uriType, fileSaver) {
        _fileSavers[uriType] = fileSaver;
      },
      getFileSaver: function(uriType) {
        return _fileSavers[uriType];
      },
      guessUriType: function(notebookUri) {
        // TODO, make smarter guess
        return /^https?:\/\//.exec(notebookUri) ? LOCATION_HTTP : LOCATION_FILESYS;
      },
      guessFormat: function(notebookUri) {
        // TODO, make smarter guess
        return FORMAT_BKR;
      },
      openNotebook: function(notebookUri, uriType, readOnly, format) {
        this._beakerRootOp.openNotebook(notebookUri, uriType, readOnly, format);
      },
      closeNotebook: function() {
        if (this.getBkApp().closeNotebook) {
          this.getBkApp().closeNotebook();
        } else {
          console.error("Current app doesn't support closeNotebook");
        }
      },

      saveNotebook: function() {
        if (this.getBkApp().saveNotebook) {
          this.getBkApp().saveNotebook();
        } else {
          console.error("Current app doesn't support saveNotebook");
        }
      },
      saveNotebookAs: function(notebookUri, uriType) {
        if (this.getBkApp().saveNotebookAs) {
          this.getBkApp().saveNotebookAs(notebookUri, uriType);
        } else {
          console.error("Current app doesn't support saveNotebookAs");
        }
      },
      showDefaultSavingFileChooser: function() {
        var self = this;
        var deferred = bkUtils.newDeferred();
        bkUtils.getHomeDirectory().then(function (homeDir) {
          var fileChooserStrategy = self.getFileSystemFileChooserStrategy();
          var fileChooserTemplate = '<div class="modal-header">' +
              '  <h1>Save <span ng-show="getStrategy().treeViewfs.showSpinner">' +
              '  <i class="fa fa-refresh fa-spin"></i></span></h1>' +
              '</div>' +
              '<div class="modal-body">' +
              '  <tree-view rooturi="/" fs="getStrategy().treeViewfs"></tree-view>' +
              '  <tree-view rooturi="' + homeDir + '" fs="getStrategy().treeViewfs">' +
              '  </tree-view>' +
              '</div>' +
              '<div class="modal-footer">' +
              '   <p><input id="saveAsFileInput"' +
              '             class="input-xxlarge"' +
              '             ng-model="getStrategy().result"' +
              '             ng-keypress="getStrategy().close($event, close)"' +
              '             focus-start /></p>' +
              '   <button ng-click="close()" class="btn">Cancel</button>' +
              '   <button ng-click="close(getStrategy().result)" class="btn btn-primary" >Save</button>' +
              '</div>';
          var fileChooserResultHandler = function (chosenFilePath) {
            deferred.resolve({
              uri: chosenFilePath,
              uriType: LOCATION_FILESYS
            });
          };

          bkCoreManager.showFileChooser(
              fileChooserResultHandler,
              fileChooserTemplate,
              fileChooserStrategy);
        });
        return deferred.promise;
      },

      _beakerRootOp: null,
      init: function(beakerRootOp) {
        this._beakerRootOp = beakerRootOp;
        bkRecentMenu.init({
          open: beakerRootOp.openNotebook
        });
      },
      gotoControlPanel: function() {
        return this._beakerRootOp.gotoControlPanel();
      },
      newSession: function() {
        return this._beakerRootOp.newSession();
      },

      _bkAppImpl: null,
      setBkAppImpl: function(bkAppOp) {
        this._bkAppImpl = bkAppOp;
      },
      getBkApp: function() {
        return this._bkAppImpl;
      },
      evaluate: function(cellModel) {
        return this._bkAppImpl.evaluate(cellModel);
      },
      evaluateCode: function(evaluator, code) {
        return this._bkAppImpl.evaluateCode(evaluator, code);
      },
      addEvaluator: function(settings, alwaysCreateNewEvaluator) {
        return this._bkAppImpl.addEvaluator(settings, alwaysCreateNewEvaluator);
      },

      _bkNotebookImpl: null,
      setBkNotebookImpl: function(bkNotebookImpl) {
        this._bkNotebookImpl = bkNotebookImpl;
      },
      getBkNotebook: function() {
        return this._bkNotebookImpl;
      },

      getRecentMenuItems: function() {
        return bkRecentMenu.getMenuItems();
      },
      getLoadingPlugin: function(key) {
        return bkUtils.loadingPlugins.get(key);
      },

      _focusables: {}, // map of focusable(e.g. code mirror instances) with cell id being keys
      registerFocusable: function(cellID, focusable) {
        this._focusables[cellID] = focusable;
      },
      unregisterFocusable: function(cellID) {
        delete this._focusables[cellID];
      },
      getFocusable: function(cellID) {
        return this._focusables[cellID];
      },

      _codeMirrors: {},
      _cmKeyMapMode: "default",
      registerCM: function(cellID, cm) {
        this._codeMirrors[cellID] = cm;
        cm.setOption("keyMap", this._cmKeyMapMode);
      },
      unregisterCM: function(cellID) {
        delete this._codeMirrors[cellID];
      },
      setCMKeyMapMode: function(keyMapMode) {
        this._cmKeyMapMode = keyMapMode;
        _.each(this._codeMirrors, function(cm) {
          cm.setOption("keyMap", keyMapMode);
        });
      },
      getCMKeyMapMode: function() {
        return this._cmKeyMapMode;
      },

      // general
      log: function(event, obj) {
        return bkUtils.log(event, obj);
      },
      refreshRootScope: function() {
        return bkUtils.refreshRootScope();
      },
      loadJS: function(url, success) {
        return bkUtils.loadJS(url, success);
      },
      loadCSS: function(url) {
        return bkUtils.loadCSS(url);
      },
      loadList: function(url, success, failure) {
        return bkUtils.loadList(url, success, failure);
      },
      findTable: function(elem) {
        return bkUtils.findTable(elem);
      },
      generateID: function() {
        return bkUtils.generateID(6);
      },
      toPrettyJson: function(jsObj) {
        return bkUtils.toPrettyJson(jsObj);
      },
      httpGet: function(url, data) {
        return bkUtils.httpGet(url, data);
      },
      httpPost: function(url, data) {
        return bkUtils.httpPost(url, data);
      },
      newDeferred: function() {
        return bkUtils.newDeferred();
      },
      loadModule: function(url, name) {
        return bkUtils.loadModule(url, name);
      },
      require: function(nameOrUrl) {
        return bkUtils.require(nameOrUrl);
      },
      isMiddleClick: function(event) {
        return bkUtils.isMiddleClick(event);
      },
      showFileChooser: function(callback, template, strategy) {
        if (!template) {
          // use default template
          template = 'template/openMenuModal.html';
        }

        var options = {
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'fileChooserController'
          //templateUrl: template,
        };

        // XXX - template is sometimes a url now.
        if (template.indexOf('template/') === 0) {
          options.templateUrl = template;
        } else {
          options.template = template;
        }

        fileChooserOp.setStrategy(strategy);
        $dialog.dialog(options)
            .open()
            .then(function(result) {
              if (callback) {
                callback(result);
              }
            });
      },
      loadFile: function(path) {
        return bkUtils.loadFile(path);
      },
      loadHttp: function(url) {
        return bkUtils.loadHttp(url);
      },
      saveFile: function(path, contentAsJson) {
        return bkUtils.saveFile(path, contentAsJson);
      },
      getFileSystemFileChooserStrategy: function() {
        return new FileSystemFileChooserStrategy();
      },
      getHomeDirectory: function() {
        return bkUtils.getHomeDirectory();
      }
    };
    return bkCoreManager;
  });

  bkCore.factory('fileChooserOp', function() {
    var _strategy = {};
    return {
      setStrategy: function(strategy) {
        _strategy = strategy;
      },
      getStrategy: function() {
        return _strategy;
      }
    };
  });

  bkCore.controller('fileChooserController', function($scope, dialog, fileChooserOp) {
    $scope.getStrategy = function() {
      return fileChooserOp.getStrategy();
    };
    $scope.close = function(result) {
      dialog.close(result);
    };
  });

  /**
   * Directive to show a modal dialog that does filename input.
   */
  bkCore.directive('fileActionDialog', function() {
    return {
      scope: { actionName: '@', inputId: '@', close: '=' },
      templateUrl: 'template/fileActionDialog.html',
      link: function(scope, element, attrs) {
        element.find('input').focus();
      }
    };
  });

})();
