/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
 * Module bk.core
 * Holds the core of beaker utilities. It wraps of lower level utilities that come from other
 * modules.
 * The user facing directives also use the core as a communication/exchange layer.
 */
(function() {
  'use strict';
  var module = angular.module('bk.core', [
    'ui.bootstrap',
    'ui.keypress',
    'bk.commonUi',
    'bk.utils',
    'bk.recentMenu',
    'bk.notebookCellModelManager',
    'bk.treeView'
  ]);

  /**
   * bkCoreManager
   * - this acts as the global space for all view managers to use it as the communication channel
   * - bkUtils should be consider 'private' to beaker, external code should depend on bkHelper
   *     instead
   */
  module.factory('bkCoreManager', function(
      $dialog, bkUtils, bkRecentMenu, bkNotebookCellModelManager, modalDialogOp) {

    var FileSystemFileChooserStrategy = function (){
      var newStrategy = this;
      newStrategy.input = "";
      newStrategy.getResult = function() {
        return newStrategy.input;
      };
      newStrategy.close = function(ev, closeFunc) {
        if (ev.which === 13) {
          closeFunc(this.getResult());
        }
      };
      newStrategy.treeViewfs = { // file service
        getChildren: function(path, callback) {
          var self = this;
          this.showSpinner = true;
          bkUtils.httpGet("../beaker/rest/file-io/getDecoratedChildren", {path: path})
              .success(function (list) {
                self.showSpinner = false;
                callback(list);
              })
              .error(function () {
                self.showSpinner = false;
                console.log("Error loading children");
              });
        },
        open: function(path) {
          newStrategy.input = path;
        },
        showSpinner: false,
        applyExtFilter: true,
        extFilter: ['bkr'],
        filter: function(child) {
          var fs = newStrategy.treeViewfs;
          if (!fs.applyExtFilter || _.isEmpty(fs.extFilter) || child.type === "directory") {
            return true;
          } else {
            return _(fs.extFilter).any(function(ext) {
              return _.string.endsWith(child.uri, ext);
            });
          }
        }
      };
    };

    // importers are responsible for importing various formats into bkr
    // importer impl must define an 'import' method
    var _importers = {};
    var FORMAT_BKR = "bkr";
    _importers[FORMAT_BKR] = {
      import: function(notebookJson) {
        var notebookModel;
        try {
          notebookModel = bkUtils.fromPrettyJson(notebookJson);
          // TODO, to be removed. Addressing loading a corrupted notebook.
          if (angular.isString(notebookModel)) {
            notebookModel = bkUtils.fromPrettyJson(notebookModel);
            bkUtils.log("corrupted-notebook", { notebookUri: enhancedNotebookUri });
          }
        } catch (e) {
          console.error(e);
          console.error("This is not a valid Beaker notebook JSON");
          console.error(notebookJson);
          throw "Not a valid Beaker notebook";
        }
        return notebookModel;
      }
    };

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
      save: function(uri, contentAsString, overwrite) {
        return bkUtils.saveFile(uri, contentAsString, overwrite);
      },
      showFileChooser: function(initUri) {
        return bkCoreManager.showDefaultSavingFileChooser(initUri);
      }
    };

    var bkCoreManager = {

      setNotebookImporter: function(format, importer) {
        _importers[format] = importer;
      },
      getNotebookImporter: function(format) {
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
      newSession: function(empty) {
        return this._beakerRootOp.newSession(empty);
      },
      openSession: function(sessionId) {
        return this._beakerRootOp.openSession(sessionId);
      },
      openNotebook: function(notebookUri, uriType, readOnly, format) {
        this._beakerRootOp.openNotebook(notebookUri, uriType, readOnly, format);
      },
      showDefaultSavingFileChooser: function(initPath) {
        var self = this;
        var deferred = bkUtils.newDeferred();
        bkUtils.all([bkUtils.getHomeDirectory(), bkUtils.getStartUpDirectory()])
            .then(function(values) {
          var homeDir = values[0];
          var pwd = values[1];
          var fileChooserStrategy = self.getFileSystemFileChooserStrategy();
          fileChooserStrategy.input = initPath;
          fileChooserStrategy.getResult = function () {
            if (_.isEmpty(this.input)) {
              return "";
            }
            var result = this.input;
            if (result === '~') {
              result = homeDir + "/"
            } else if (_.string.startsWith(result, '~/')) {
              result = result.replace('~', homeDir);
            } else if (!_.string.startsWith(result, '/') && !result.match(/^\w+:\\/)) {
              result = pwd + "/" + result;
            }
            if (!_.string.endsWith(result, '.bkr')
                && !_.string.endsWith(result, '/')) {
              result = result + ".bkr";
            }
            return result;
          };
          fileChooserStrategy.getSaveBtnDisabled = function() {
            return _.isEmpty(this.input) || _.string.endsWith(this.input, '/');
          };
          fileChooserStrategy.treeViewfs.applyExtFilter = false;
          var fileChooserTemplate = '<div class="modal-header fixed">' +
              '  <h1>Save <span ng-show="getStrategy().treeViewfs.showSpinner">' +
              '  <i class="fa fa-refresh fa-spin"></i></span></h1>' +
              '</div>' +
              '<div class="modal-body fixed">' +
              '  <tree-view rooturi="/" fs="getStrategy().treeViewfs"></tree-view>' +
              '  <tree-view rooturi="' + homeDir + '" fs="getStrategy().treeViewfs">' +
              '  </tree-view>' +
              (pwd === homeDir ? '' : ('  <tree-view rooturi="' + pwd + '" fs="getStrategy().treeViewfs"></tree-view>')) +
              '</div>' +
              '<div class="modal-footer fixed">' +
              '   <p><input id="saveAsFileInput"' +
              '             class="input-xxlarge"' +
              '             ng-model="getStrategy().input"' +
              '             ng-keypress="getStrategy().close($event, close)"' +
              '             focus-start /></p>' +
              '   <span style="float:left;">{{getStrategy().getResult()}}</span>' +
              '   <button ng-click="close()" class="btn">Cancel</button>' +
              '   <button ng-click="close(getStrategy().getResult())" class="btn btn-primary"' +
              '           ng-disabled="getStrategy().getSaveBtnDisabled()" >Save</button>' +
              '</div>';
          var fileChooserResultHandler = function (chosenFilePath) {
            deferred.resolve({
              uri: chosenFilePath,
              uriType: LOCATION_FILESYS
            });
          };

          self.showModalDialog(
              fileChooserResultHandler,
              fileChooserTemplate,
              fileChooserStrategy);
        });
        return deferred.promise;
      },

      _bkAppImpl: null,
      setBkAppImpl: function(bkAppOp) {
        this._bkAppImpl = bkAppOp;
      },
      getBkApp: function() {
        return this._bkAppImpl;
      },

      getRecentMenuItems: function() {
        return bkRecentMenu.getMenuItems();
      },

      getNotebookCellManager: function() {
        return bkNotebookCellModelManager;
      },
      // general
      showModalDialog: function(callback, template, strategy) {
        if (!template) {
          // use default template
          template = "./app/template/openmenumodal.html";
        }

        var options = {
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'modalDialogCtrl'
        };

        // XXX - template is sometimes a url now.
        if (template.indexOf('app/template/') === 0) {
          options.templateUrl = template;
        } else {
          options.template = template;
        }

        modalDialogOp.setStrategy(strategy);
        var dd = $dialog.dialog(options);
        return dd.open().then(function(result) {
          dd.$scope.$destroy();
          if (callback) {
            callback(result);
          }
        });
      },
      show1ButtonModal: function(msgBody, msgHeader, callback, btnText, btnClass) {
        if (!msgHeader) {
          msgHeader = "Oops...";
        }
        btnText = btnText ? btnText : "Close";
        btnClass = btnClass ? _.isArray(btnClass) ? btnClass.join(' ') : btnClass : 'btn-primary';
        var template = "<div class='modal-header'>" +
            "<button class='close' ng-click='close()'>Close</button>" +
            "<h3>" + msgHeader + "</h3>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" +
            '<div class="modal-footer">' +
            "   <button class='btn " + btnClass +"' ng-click='close(\"OK\")'>" + btnText + "</button>" +
            "</div>";
        return this.showModalDialog(callback, template);
      },
      show2ButtonModal: function(
          msgBody,
          msgHeader,
          okCB, cancelCB,
          okBtnTxt, cancelBtnTxt,
          okBtnClass, cancelBtnClass) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var close = function(result) {
          if (result === "OK") {
            okCB ? okCB() : null;
          } else { // cancel
            cancelCB ? cancelCB() : null;
          }
        };
        okBtnTxt = okBtnTxt ? okBtnTxt : "OK";
        cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
        okBtnClass = okBtnClass ? _.isArray(okBtnClass) ? okBtnClass.join(' ') : okBtnClass : '';
        cancelBtnClass = cancelBtnClass ? _.isArray(cancelBtnClass) ? cancelBtnClass.join(' ') : cancelBtnClass : '';
        var template = "<div class='modal-header'>" +
            "<h3>" + msgHeader + "</h3>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" +
            '<div class="modal-footer">' +
            "   <button class='Yes btn " + okBtnClass +"' ng-click='close(\"OK\")'>" + okBtnTxt + "</button>" +
            "   <button class='Cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
            "</div>";
        return this.showModalDialog(close, template);
      },
      show3ButtonModal: function(
          msgBody, msgHeader,
          yesCB, noCB, cancelCB,
          yesBtnTxt, noBtnTxt, cancelBtnTxt,
          yesBtnClass, noBtnClass, cancelBtnClass) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var close = function(result) {
          if (result === "Yes") {
            yesCB ? yesCB() : null;
          } else if (result === "No") {
            noCB ? noCB() : null;
          } else { // cancel
            cancelCB ? cancelCB() : null;
          }
        };
        yesBtnTxt = yesBtnTxt ? yesBtnTxt : "Yes";
        noBtnTxt = noBtnTxt ? noBtnTxt : "No";
        cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
        yesBtnClass = yesBtnClass ? _.isArray(yesBtnClass) ? okBtnClass.join(' ') : yesBtnClass : '';
        noBtnClass = noBtnClass ? _.isArray(noBtnClass) ? noBtnClass.join(' ') : noBtnClass : '';
        cancelBtnClass = cancelBtnClass ? _.isArray(cancelBtnClass) ? cancelBtnClass.join(' ') : cancelBtnClass : '';
        var template = "<div class='modal-header'>" +
            "<h3>" + msgHeader + "</h3>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" +
            '<div class="modal-footer">' +
            "   <button class='Yes btn " + yesBtnClass +"' ng-click='close(\"Yes\")'>" + yesBtnTxt + "</button>" +
            "   <button class='No btn " + noBtnClass +"' ng-click='close(\"No\")'>" + noBtnTxt + "</button>" +
            "   <button class='Cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
            "</div>";
        return this.showModalDialog(close, template);
      },
      getFileSystemFileChooserStrategy: function() {
        return new FileSystemFileChooserStrategy();
      }
    };
    return bkCoreManager;
  });

  module.factory('modalDialogOp', function() {
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

  module.controller('modalDialogCtrl', function($scope, dialog, modalDialogOp) {
    $scope.getStrategy = function() {
      return modalDialogOp.getStrategy();
    };
    $scope.close = function(result) {
      dialog.close(result);
    };
  });

  /**
   * Directive to show a modal dialog that does filename input.
   */
  module.directive('fileActionDialog', function() {
    return {
      scope: { actionName: '@', inputId: '@', close: '=' },
      template: JST['template/fileactiondialog'](),
      link: function(scope, element, attrs) {
        element.find('input').focus();
      }
    };
  });

})();
