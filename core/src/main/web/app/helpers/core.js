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
    'bk.commonUi',
    'bk.utils',
    'bk.recentMenu',
    'bk.notebookCellModelManager',
    'bk.treeView',
    'bk.electron',
    'ngAnimate',
    'uiSelectWrapper'
  ]);

  /**
   * bkCoreManager
   * - this acts as the global space for all view managers to use it as the communication channel
   * - bkUtils should be consider 'private' to beaker, external code should depend on bkHelper
   *     instead
   */
  module.factory('bkCoreManager', function(
      $uibModal,
      $rootScope,
      $document,
      $location,
      $sessionStorage,
      $q,
      $timeout,
      bkUtils,
      bkRecentMenu,
      bkNotebookCellModelManager,
      bkElectron,
      modalDialogOp,
      Upload,
      autocompleteService,
      autocompleteParametersService,
      codeMirrorExtension,
      bkDragAndDropHelper,
      GLOBALS) {

    function isFilePath(path) {
      return path.split('/').pop() !== '';
    }

    var  FileChooserStrategy = function (data) {
      var newStrategy = this;
      newStrategy.type = data.type;
      newStrategy.initUri = data.initUri;
      newStrategy.title = data.title;
      newStrategy.okButtonTitle = data.okButtonTitle;
      newStrategy.treeViewfs = {
        applyExtFilter: true,
        showHiddenFiles: false,
        extension: data.extension
      };
    };

    var  FilePermissionsStrategy = function (data) {
      var newStrategy = this;
      newStrategy.permissions = data.permissions;
      newStrategy.owner = data.owner;
      newStrategy.group = data.group;
      newStrategy.title = data.title;
      newStrategy.path = data.path;
      newStrategy.okButtonTitle = data.okButtonTitle;
    };

    var FileSystemFileChooserStrategy = function (){
      var newStrategy = this;
      newStrategy.manualName = '';
      newStrategy.input = "";
      newStrategy.getResult = function() {
        return newStrategy.input;
      };
      newStrategy.close = function(ev, closeFunc) {
        if (ev.which === 13) {
          closeFunc(this.getResult());
        }
      };
      newStrategy.manualEntry = function() {
        newStrategy.manualName = this.input ? this.input.split('/').pop() : "";
      };
      newStrategy.checkCallback = function (result) {
        var deferred = bkUtils.newDeferred();
        if (!result){
          deferred.resolve({
            result: true
          });
        }else {
          bkHelper.httpGet(bkHelper.serverUrl("beaker/rest/file-io/isDirectory"),
            {path: result}).success(function (value) {
              if (value === true) {
                $rootScope.$broadcast("SELECT_DIR", {
                  find_in_home_dir: true,
                  path: result
                });
                deferred.resolve({
                  result: false
                });
              } else {
                deferred.resolve({
                  result: true
                });
              }
            }
          );
        }
        return deferred.promise;
      };
      newStrategy.treeViewfs = { // file service
        getChildren: function(basePath, openFolders) {
          var self = this;
          var paths = [basePath];

          this.showSpinner = true;

          if (openFolders) {
            paths = [paths].concat(openFolders);
          }

          return bkUtils.httpPost("../beaker/rest/file-io/getDecoratedChildren", {
            openFolders: paths.join(',')
          }).success(function (list) {
            self.showSpinner = false;
          }).error(function () {
            self.showSpinner = false;
            console.log("Error loading children");
          });
        },
        fillInput: function(path) {
          if (isFilePath(path)) {
            newStrategy.manualName = "";
          } else {
            path += newStrategy.manualName;
          }

          newStrategy.input = path;
        },
        open: function(path) {
          this.fillInput(path);
          $rootScope.$broadcast('modal.submit');
        },
        setOrderBy: function(options) {
          bkCoreManager.setFSOrderBy(options.orderBy);
          bkCoreManager.setFSReverse(options.reverse);
        },
        getOrderBy: function() {
          return bkCoreManager.getFSOrderBy();
        },
        getOrderReverse: function() {
          return !!bkCoreManager.getFSReverse();
        },
        getPrettyOrderBy: function() {
          var prettyNames = {
            uri: 'Name',
            modified: 'Date Modified'
          };

          return prettyNames[newStrategy.treeViewfs.getOrderBy()];
        },
        showSpinner: false,
        applyExtFilter: true,
        extFilter: ['bkr'],
        filter: function(child) {
          var fs = newStrategy.treeViewfs;
          if (!fs.applyExtFilter || _.isEmpty(fs.extFilter) || child.type === "directory") {
            return true;
          } else {
            return _.any(fs.extFilter, function(ext) {
              return _.endsWith(child.uri, ext);
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

    var LOCATION_FILESYS = GLOBALS.FILE_LOCATION.FILESYS;
    var LOCATION_HTTP = GLOBALS.FILE_LOCATION.HTTP;
    var LOCATION_AJAX = GLOBALS.FILE_LOCATION.AJAX;

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
    _fileLoaders[LOCATION_AJAX] = {
      load: function(uri) {
        return bkUtils.loadAjax(uri);
      }
    };

    // fileSavers are responsible for saving various formats into bkr
    // fileLoader impl must define an 'load' method which returns a then-able
    var _fileSavers = {};

    _fileSavers[LOCATION_FILESYS] = {
      save: function(uri, contentAsString, overwrite) {
        return bkUtils.saveFile(uri, contentAsString, overwrite);
      },
      rename: function(oldUri, newUri, overwrite) {
        return bkUtils.renameFile(oldUri, newUri, overwrite);
      },
      showFileChooser: function (initUri) {
        return bkCoreManager.showFileSaveDialog({
          initUri: initUri,
          extension: 'bkr'
        });
      }
    };

    _fileSavers[LOCATION_AJAX] = {
      save: function(uri, contentAsString) {
        return bkUtils.saveAjax(uri, contentAsString);
      }
    };

    var importInput = function() {
      var $input,
          endpoint = '../beaker/fileupload';

      if (($input = $('input#import-notebook')).length) return $input;

      $rootScope.getImportNotebookPattern = function () {
        return getImportNotebookFileTypePattern();
      };
      $rootScope.fileDropped = function(file, event) {
        if (file) {
          if (bkDragAndDropHelper.isFileForImport(file)) {
            file.upload = Upload.upload({
              url: endpoint,
              file: file,
              method: 'POST'
            });

            file.upload.then(function (response) {
              bkCoreManager.importNotebook(response.data);
            }, function (response) {
              if (response.status > 0)
                console.log(response.status + ': ' + response.data);
            });
          } else {
            $rootScope.$emit(GLOBALS.EVENTS.FILE_DROPPED, {file: file, event: event});
          }
        }
      };

      $input = $('<input type="file" name="file" id="import-notebook" ' +
          'ngf-select="fileDropped($file)" accept="application/json,application/text"' +
      'ngf-pattern="\'application/json,application/text\'" style="display: none"/>')
                .prependTo('body');

      return $input;
    };

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

      setTheme: function (theme) {
        this._prefs.setTheme(theme);

        bkUtils.httpPost('../beaker/rest/util/setPreference', {
          preferencename: 'theme',
          preferencevalue: theme
        });
        $rootScope.$broadcast('beaker.theme.set', theme);
      },
      getTheme: function () {
        return this._prefs.getTheme();
      },

      setFSOrderBy: function (fs_order_by) {
        this._prefs.setFSOrderBy(fs_order_by);
        bkUtils.httpPost('../beaker/rest/util/setPreference', {
          preferencename: 'fs-order-by',
          preferencevalue: fs_order_by
        });
      },
      getFSOrderBy: function () {
        return this._prefs.getFSOrderBy();
      },
      setFSReverse: function (fs_reverse) {
        this._prefs.setFSReverse(fs_reverse);
        bkUtils.httpPost('../beaker/rest/util/setPreference', {
          preferencename: 'fs-reverse',
          preferencevalue: fs_reverse
        });
      },
      getFSReverse: function () {
        return this._prefs.getFSReverse();
      },

      setNotebookImporter: function(format, importer) {
        _importers[format] = importer;
      },
      getNotebookImporter: function(format) {
        return _importers[format];
      },
      getNotebookImporterNames: function() {
        return Object.keys(_importers);
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
        if (/^https?:\/\//.exec(notebookUri)) {
          return LOCATION_HTTP;
        }
        else if (/^ajax:/.exec(notebookUri)) {
          return LOCATION_AJAX;
        }
        else {
          return LOCATION_FILESYS;
        }
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
      addImportInput: function() {
        importInput();
      },
      importNotebookDialog: function() {
        importInput().click();
      },
      importNotebook: function(notebook) {
        $sessionStorage.importedNotebook = notebook;
        $location.path("/session/import").search({});
      },

      codeMirrorOptions: function(scope, notebookCellOp) {

        var showAutocomplete = function(cm) {
          autocompleteService.showAutocomplete(cm, scope);
        };

        var maybeShowAutocomplete = function(cm) {
          autocompleteService.maybeShowAutocomplete(cm, scope);
        }

        var goCharRightOrMoveFocusDown = function(cm) {
          if ($('.CodeMirror-hint').length > 0) {
            //codecomplete is up, skip
            return;
          }
          if (cm.getCursor().line === scope.cm.doc.lastLine()
            && cm.getCursor().ch === scope.cm.doc.getLine(scope.cm.doc.lastLine()).length
            && !cm.somethingSelected()) {
            var nextCell = moveFocusDown();
            if (nextCell){
              var nextCm = scope.bkNotebook.getCM(nextCell.id);
              if (nextCm){
                nextCm.execCommand("goDocStart");
              }
            }
          } else {
            cm.execCommand("goCharRight");
          }
        };

        var goCharLeftOrMoveFocusDown = function(cm) {
          if ($('.CodeMirror-hint').length > 0) {
            //codecomplete is up, skip
            return;
          }
          if (cm.getCursor().line === 0
            && cm.getCursor().ch === 0) {
            var prevCell = moveFocusUp();
            if (prevCell){
              var prevCm = scope.bkNotebook.getCM(prevCell.id);
              if (prevCm){
                prevCm.execCommand("goDocEnd");
              }
            }
          } else {
            cm.execCommand("goCharLeft");
          }
        };

        var goUpOrMoveFocusUp = function(cm) {
          if ($('.CodeMirror-hint').length > 0) {
            //codecomplete is up, skip
            return;
          }
          if (cm.getCursor().line === 0) {
            var prevCell = moveFocusUp();
            if (prevCell) {
              var prevCm = scope.bkNotebook.getCM(prevCell.id);
              if (prevCm) {
                prevCm.setCursor({
                  line: prevCm.doc.size - 1,
                  ch: cm.getCursor().ch
                })
              }
            }
          } else {
            cm.execCommand("goLineUp");
            var top = cm.cursorCoords(true,'window').top;
            if ( top < 150)
              window.scrollBy(0, top-150);
          }
        };

        var goDownOrMoveFocusDown = function(cm) {
          if ($('.CodeMirror-hint').length > 0) {
            //codecomplete is up, skip
            return;
          }
          if (cm.getCursor().line === cm.doc.size - 1 && !cm.somethingSelected()) {
            var nextCell = moveFocusDown();
            if (nextCell) {
              var nextCm = scope.bkNotebook.getCM(nextCell.id);
              if (nextCm) {
                nextCm.setCursor({
                  line: 0,
                  ch: cm.getCursor().ch
                });
              }
            }
          } else {
            cm.execCommand("goLineDown");
          }
        };

        var goToNextCodeCell = function(){
          var nextCell = notebookCellOp.findNextCodeCell(scope.cellmodel.id);
          while (nextCell) {
            var focusable = scope.bkNotebook.getFocusable(nextCell.id);
            if (focusable && focusable.isShowInput()) {
              focusable.focus();
              break;
            } else {
              nextCell = notebookCellOp.findNextCodeCell(nextCell.id);
            }
          }
          return nextCell;
        };

        var appendCodeCell = function() {
          var thisCellId = scope.cellmodel.id;
          var evaluatorName = scope.cellmodel.evaluator;
          var newCell = scope.bkNotebook.getNotebookNewCellFactory().newCodeCell(evaluatorName);
          notebookCellOp.appendAfter(thisCellId, newCell);
          bkUtils.refreshRootScope();
        };

        var moveFocusDown = function() {
          // move focus to next code cell
          var thisCellId = scope.cellmodel.id;
          var nextCell = notebookCellOp.getNext(thisCellId);
          while (nextCell) {
            var focusable = scope.bkNotebook.getFocusable(nextCell.id);
            if (focusable && focusable.isShowInput()) {
              focusable.focus();
              break;
            } else {
              nextCell = notebookCellOp.getNext(nextCell.id);
            }
          }
          return nextCell;
        };

        var moveFocusUp = function() {
          // move focus to prev code cell
          var thisCellID = scope.cellmodel.id;
          var prevCell = notebookCellOp.getPrev(thisCellID);
          while (prevCell) {
            var focusable = scope.bkNotebook.getFocusable(prevCell.id);
            if (focusable && focusable.isShowInput()) {
              focusable.focus();
              var top = focusable.cm.cursorCoords(true, 'window').top;
              if (top < 150)
                window.scrollBy(0, top - 150);
              break;
            } else {
              prevCell = notebookCellOp.getPrev(prevCell.id);
            }
          }
          return prevCell;
        };

        var evaluate = function() {
          scope.evaluate();
          scope.$apply();
        };

        var evaluateAndGoDown = function () {
          bkUtils.newPromise(scope.evaluate()).then(function () {
            var nextCell = notebookCellOp.findNextCodeCell(scope.cellmodel.id);
            if (!nextCell) {
              appendCodeCell();
            }
            goToNextCodeCell();
          });
        };

        var reformat = function (cm) {
          var start = cm.getCursor(true).line;
          var end = cm.getCursor(false).line;
          do {
            cm.indentLine(start);
            start += 1;
          } while (start <= end)
        };

        var shiftTab = function(cm) {
          if (autocompleteParametersService.isActive()) {
            return autocompleteParametersService.previousParameter();
          }
          var cursor = cm.getCursor();
          var leftLine = cm.getRange({line: cursor.line, ch: 0}, cursor);
          if (leftLine.match(/^\s*$/)) {
            cm.execCommand("indentAuto");
          } else {
            showDocs(cm);
          }
        };

        var showDocs = function(cm) {
          var cur = cm.getCursor();
          var cursorPos = cm.indexFromPos(cur);
          scope.showDocs(cursorPos);
        };

        var moveCellUp = function(cm) {
          notebookCellOp.moveUp(scope.cellmodel.id);
          bkUtils.refreshRootScope();
          cm.focus();
        };

        var moveCellDown = function(cm) {
          notebookCellOp.moveDown(scope.cellmodel.id);
          bkUtils.refreshRootScope();
          cm.focus();
        };

        var deleteCell = function(cm) {
          notebookCellOp.delete(scope.cellmodel.id, true);
          bkUtils.refreshRootScope();
        };

        var tab = function(cm) {
          if (autocompleteParametersService.isActive()) {
            return autocompleteParametersService.nextParameter();
          }
          var cursor = cm.getCursor();
          var leftLine = cm.getRange({line: cursor.line, ch: 0}, cursor);
          if (leftLine.match(/^\s*$/)) {
            cm.execCommand("indentMore");
          } else {
            showAutocomplete(cm);
          }
        };

        var enter = function(cm) {
          if (autocompleteParametersService.isActive()) {
            return autocompleteParametersService.endCompletionAndMoveCursor();
          }
          cm.execCommand("newlineAndIndent");
        };

        var backspace = function(cm) {
          var cursor, anchor,
              toKill = [],
              selections = cm.listSelections();

          _.each(selections, function(range) {
            cursor = range['head'];
            anchor = range['anchor'];

            if (cursor.line !== anchor.line || cursor.ch !== anchor.ch) {
              cm.replaceRange("", cursor, anchor);
            } else {
              var from = cm.findPosH(cursor, -1, "char", false);
              toKill.push({from: from, to: cursor});
            }
          });

          _.each(toKill, function(i) {
            cm.replaceRange("", i.from, i.to);
          });
          autocompleteService.backspace(cursor, cm);
        };

        var cancel = function() {
          scope.cancel();
          scope.$apply();
        };

        var isFullScreen = function (cm) {
          return bkHelper.isFullScreen(cm);
        };

        var setFullScreen = function (cm) {
          bkHelper.setFullScreen(cm, !bkHelper.isFullScreen(cm));
        };

        CodeMirror.commands.save = bkHelper.saveNotebook;
        CodeMirror.Vim.defineEx('wquit', 'wq', bkCoreManager.getBkApp().saveNotebookAndClose);
        CodeMirror.Vim.defineEx('quit', 'q', bkHelper.closeNotebook);
        
        var keys = {
            "Up" : goUpOrMoveFocusUp,
            "Down" : goDownOrMoveFocusDown,
            "Ctrl-S": false, // no need to handle this shortcut on CM level
            "Cmd-S": false,
            "Alt-Down": moveFocusDown,
            "Alt-J": moveFocusDown,
            "Alt-Up": moveFocusUp,
            "Alt-K": moveFocusUp,
            "Enter": enter,
            "Ctrl-Enter": evaluate,
            "Cmd-Enter": evaluate,
            "Shift-Enter": evaluateAndGoDown,
            "Ctrl-Space": maybeShowAutocomplete,
            "Cmd-Space": showAutocomplete,
            "Shift-Tab": shiftTab,
            "Shift-Ctrl-Space": showDocs,
            "Shift-Cmd-Space": showDocs,
            "Ctrl-Alt-Up": moveCellUp,
            "Cmd-Alt-Up": moveCellUp,
            "Ctrl-Alt-Down": moveCellDown,
            "Cmd-Alt-Down": moveCellDown,
            "Ctrl-Alt-D": deleteCell,
            "Cmd-Alt-Backspace": deleteCell,
            "Tab": tab,
            "Backspace": backspace,
            "Ctrl-/": "toggleComment",
            "Cmd-/": "toggleComment",
            'Right': goCharRightOrMoveFocusDown,
            'Left': goCharLeftOrMoveFocusDown,
            "Shift-Ctrl-F": reformat,
            "Shift-Cmd-F": reformat,
            "Alt-F11": setFullScreen
        };

        if(bkHelper.isMacOS){
          keys["Ctrl-C"] = cancel;
        }else{
          keys["Alt-C"] = cancel;
        }

        if (codeMirrorExtension.extraKeys !== undefined) {
          _.extend(keys, codeMirrorExtension.extraKeys);
        }

        return {
          lineNumbers: true,
          matchBrackets: true,
          lineWrapping: true,
          extraKeys: keys,
          goToNextCodeCell: goToNextCodeCell,
          scrollbarStyle: "simple",
          theme: bkCoreManager.getTheme()
        };
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

      getNotebookElement: function(currentScope) {
        // Walk up the scope tree and find the one that has access to the
        // notebook element (notebook directive scope, specifically)
        if (_.isUndefined(currentScope.getNotebookElement)) {
          return bkCoreManager.getNotebookElement(currentScope.$parent);
        } else {
          return currentScope.getNotebookElement();
        }
      },
      getNotebookCellManager: function() {
        return bkNotebookCellModelManager;
      },

      showFilePermissionsDialog: function(path, permissionsSettings) {
        var deferred = bkUtils.newDeferred();

        var data = {
          permissions: permissionsSettings.permissions,
          owner: permissionsSettings.owner,
          group: permissionsSettings.group,
          title:'Permissions',
          path: path
        };

        var dd = $uibModal.open({
          templateUrl: "app/template/filepermissionsdialog.jst.html",
          controller: 'filePermissionsDialogCtrl',
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          size: 'sm',
          resolve: {
            strategy: function () {
              return new FilePermissionsStrategy(data);
            }
          }
        });
        dd.result.then(
          function (result) {
            deferred.resolve(result);
          }, function () {
            deferred.reject();
          }).catch(function () {
          deferred.reject();
        });
        return deferred.promise;
      },

      showFileOpenDialog: function(extension) {
        var deferred = bkUtils.newDeferred();

        var data = {
          type: 'OPEN',
          title:'Select',
          okButtonTitle : 'Open',
          extension: extension
        };

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
      },

      showSparkConfiguration: (function() {
        var sparkConfigurationInstance;

        return function() {
          var options = {
            windowClass: 'beaker-sandbox',
            backdropClass: 'beaker-sandbox',
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: 'sparkConfigurationCtrl',
            template: JST['mainapp/components/spark/sparkconfiguration']()
          };

          sparkConfigurationInstance = $uibModal.open(options);
          return sparkConfigurationInstance.result;
        };
      })(),

      showModalDialog: function(callback, template, strategy, uriType, readOnly, format) {
        var options = {
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'modalDialogCtrl'
        };

        var attachSubmitListener = function() {
          $document.on('keydown.modal', function (e) {
            if (e.which === 13) {
              var modal_submit = $('.modal .modal-submit');
              if (modal_submit.length > 0)
                modal_submit[0].click();
            }
          });
        };

        var removeSubmitListener = function() {
          $document.off('keydown.modal');
        };

        // XXX - template is sometimes a url now.
        if (template.indexOf('app/template/') === 0) {
          options.templateUrl = template;
        } else {
          options.template = template;
        }

        modalDialogOp.setStrategy(strategy);
        var dd = $uibModal.open(options);

        attachSubmitListener();

        var callbackAction = function(result) {
          removeSubmitListener();

          if (callback) {
            callback(result, uriType, readOnly, format);
          }
        };

        dd.result.then(function(result) {
          //Trigger when modal is closed
          callbackAction(result);
        }, function(result) {
          //Trigger when modal is dismissed
          callbackAction();
        }).catch(function() {
          removeSubmitListener();
        });

        return dd;
      },
      showSQLLoginModalDialog: function(
          connectionName,
          connectionString,
          user,
          okCB,
          cancelCB) {

        var options = {
            windowClass: 'beaker-sandbox',
            backdropClass: 'beaker-sandbox',
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: 'SQLLoginController',
            templateUrl: 'app/helpers/sql-login-template.jst.html',
            resolve: {
              connectionName: function () {
                return connectionName;
              },
              connectionString : function () {
                return connectionString;
              },
              user : function () {
                return user;
              }
            }
        };

        var attachSubmitListener = function() {
          $document.on('keydown.modal', function (e) {
            if (e.which === 13) {
              var modal_submit = $('.modal .modal-submit');
              if (modal_submit.length > 0)
                modal_submit[0].click();
            }
          });
        };

        var removeSubmitListener = function() {
          $document.off('keydown.modal');
        };
        attachSubmitListener();

        var dd = $uibModal.open(options);
        dd.result.then(function(result) {
          if (okCB && (result != -1)) {
            okCB(result);
          }else{
            cancelCB();
          }
          //Trigger when modal is closed
          removeSubmitListener();
        }, function(result) {
          //Trigger when modal is dismissed
          removeSubmitListener();
          cancelCB();
        }).catch(function() {
          removeSubmitListener();
        });
        return dd;
      },
      show0ButtonModal: function(msgBody, msgHeader) {
        if (!msgHeader) {
          msgHeader = "Oops...";
        }
        var template = "<div class='modal-header'>" +
            "<h1>" + msgHeader + "</h1>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" ;
        return this.showModalDialog(null, template);
      },
      showErrorModal: function (msgBody, msgHeader, errorDetails, callback) {
        if(!errorDetails) {
          return this.show1ButtonModal(msgBody, msgHeader, callback);
        }
        if(bkUtils.isElectron) {
          return bkElectron.Dialog.showMessageBox({
            type: 'error',
            buttons: ['OK'],
            title: msgHeader,
            message: msgBody,
            detail: errorDetails
          }, callback);
        } else {
          return this.showModalDialog(callback,
            "<div class='modal-header'>" +
            "<h1>" + msgHeader + "</h1>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p><div class='modal-error-details'>" + errorDetails + "</div></div>" +
            '<div class="modal-footer">' +
            "   <button class='btn btn-primary' ng-click='close(\"OK\")'>Close</button>" +
            "</div>");
        }
      },
      show1ButtonModal: function(msgBody, msgHeader, callback, btnText, btnClass) {
        if (!msgHeader || msgBody.toLowerCase().indexOf(msgHeader.toLowerCase()) !== -1) {
          msgHeader = "Oops...";
        }
        if (bkUtils.isElectron) {
          var options = {
            type: 'none',
            buttons: ['OK'],
            title: msgHeader,
            message: msgBody
          };
          return bkElectron.Dialog.showMessageBox(options, callback);
        } else {
          btnText = btnText ? btnText : "Close";
          btnClass = btnClass ? _.isArray(btnClass) ? btnClass.join(' ') : btnClass : 'btn-primary';
          if (btnClass.indexOf("modal-submit") === -1) btnClass+=" modal-submit";
          var template = "<div class='modal-header'>" +
              "<h1>" + msgHeader + "</h1>" +
              "</div>" +
              "<div class='modal-body'><p>" + msgBody + "</p></div>" +
              '<div class="modal-footer">' +
              "   <button class='btn " + btnClass +"' ng-click='close(\"OK\")'>" + btnText + "</button>" +
              "</div>";
          return this.showModalDialog(callback, template);
        }
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
        var callback = function(result) {
          if (okCB && (result == 0)) {
            okCB();
          } else if (cancelCB){
            cancelCB();
          }
        };
        if (bkUtils.isElectron) {
          var options = {
            type: 'none',
            buttons: ['OK', 'Cancel'],
            title: msgHeader,
            message: msgBody
          };
          return bkElectron.Dialog.showMessageBox(options, callback);
        } else {
          okBtnTxt = okBtnTxt ? okBtnTxt : "OK";
          cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
          okBtnClass = okBtnClass ? _.isArray(okBtnClass) ? okBtnClass.join(' ') : okBtnClass : 'btn-default';
          cancelBtnClass = cancelBtnClass ? _.isArray(cancelBtnClass) ? cancelBtnClass.join(' ') : cancelBtnClass : 'btn-default';
          var template = "<div class='modal-header'>" +
              "<h1>" + msgHeader + "</h1>" +
              "</div>" +
              "<div class='modal-body'><p>" + msgBody + "</p></div>" +
              '<div class="modal-footer">' +
              "   <button class='Yes btn " + okBtnClass +"' ng-click='close(0)'>" + okBtnTxt + "</button>" +
              "   <button class='Cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
              "</div>";
          return this.showModalDialog(callback, template);
        }
      },
      show3ButtonModal: function(
          msgBody, msgHeader,
          yesCB, noCB, cancelCB,
          yesBtnTxt, noBtnTxt, cancelBtnTxt,
          yesBtnClass, noBtnClass, cancelBtnClass) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var callback = function(result) {
          if (yesCB && (result == 0)) {
            yesCB();
          } else if (noCB && (result == 1)) {
            noCB();
          } else if (cancelCB) {
            cancelCB();
          }
        };
        if (bkUtils.isElectron) {
          var options = {
            type: 'none',
            buttons: ['Yes', 'No', 'Cancel'],
            title: msgHeader,
            message: msgBody
          };
          return bkElectron.Dialog.showMessageBox(options, callback);
        } else {
          yesBtnTxt = yesBtnTxt ? yesBtnTxt : "Yes";
          noBtnTxt = noBtnTxt ? noBtnTxt : "No";
          cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
          yesBtnClass = yesBtnClass ? _.isArray(yesBtnClass) ? okBtnClass.join(' ') : yesBtnClass : 'btn-default';
          noBtnClass = noBtnClass ? _.isArray(noBtnClass) ? noBtnClass.join(' ') : noBtnClass : 'btn-default';
          cancelBtnClass = cancelBtnClass ? _.isArray(cancelBtnClass) ? cancelBtnClass.join(' ') : cancelBtnClass : 'btn-default';
          var template = this.getDialogTemplateOpening(msgHeader, msgBody) +
              "   <button class='yes btn " + yesBtnClass +"' ng-click='close(0)'>" + yesBtnTxt + "</button>" +
              "   <button class='no btn " + noBtnClass +"' ng-click='close(1)'>" + noBtnTxt + "</button>" +
              "   <button class='cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
              this.getDialogTemplateClosing();
          return this.showModalDialog(callback, template);
        }
      },
      showMultipleButtonsModal: function(params) {
        var buttons = params.buttons;

        var callback = function(result) {
          if (result != undefined) {
            buttons[result].action();
          } else if (params.dismissAction) {
            params.dismissAction();
          }
        };

        if (bkUtils.isElectron) {
          var buttonTexts = [];
          for (var i = 0; i < buttons.length; i++) {
            buttonTexts.push(buttons[i].text);
          }
          var options = {
            type: 'none',
            buttons: buttonTexts,
            title: params.msgHeader,
            message: params.msgBody
          };
          return bkElectron.Dialog.showMessageBox(options, callback);
        } else {
          var template = this.getDialogTemplateOpening(params.msgHeader, params.msgBody);
          for (var i = 0; i < buttons.length; i++) {
            var buttonSettings = buttons[i];
            var newTemplatePart = "   <button class='btn btn-default " + buttonSettings.cssClass + "' ng-click='close(" + i + ")'>" + buttonSettings.text + "</button>"
            template = template + newTemplatePart;
          }
          template = template + this.getDialogTemplateClosing();

          return this.showModalDialog(callback, template);
        }


      },
      getDialogTemplateOpening: function(msgHeader, msgBody) {
        return "<div class='modal-header'>" +
            "<h1>" + msgHeader + "</h1>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" +
            '<div class="modal-footer">';
      },
      getDialogTemplateClosing: function() {
        return "</div>";
      },
      getFileSystemFileChooserStrategy: function() {
        return new FileSystemFileChooserStrategy();
      },

      showFullModalDialog: function(callback, template, controller, dscope) {
        var options = {
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: controller,
          resolve: { dscope: function(){ return dscope; } }
        };

        if (template.indexOf('http:') !== 0) {
          options.templateUrl = template;
        } else {
          options.template = template;
        }
        var dd = $uibModal.open(options);
        return dd.result.then(function(result) {
          if (callback) {
            callback(result);
          }
        });
      },
      showLanguageManager: (function() {
        var languageManagerInstance;

        return function() {
          // result status is 1 if modal is closed, 2 if it is dismissed, and 0 if still open
          if (languageManagerInstance && languageManagerInstance.result.$$state.status === 0) {
            return languageManagerInstance.close()
          }
          var options = {
            windowClass: 'beaker-sandbox',
            backdropClass: 'beaker-sandbox',
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: 'pluginManagerCtrl',
            template: JST['mainapp/components/pluginmanager/pluginmanager']()
          };

          languageManagerInstance = $uibModal.open(options);
          return languageManagerInstance.result;
        };
      })(),
      showPublishForm: function(nModel, callback) {
        var options = {
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'publicationCtrl',
          template: JST['mainapp/components/publication/publish'](),
          resolve: {nModel: function() { return (nModel ? nModel : undefined); } }
        };

        var dd = $uibModal.open(options);
        return dd.result.then(function(result) {
          if (callback) {
            callback(result);
          }
        });
      },
      colorize: function (theme) {
        var colorizedElements = $("html");
        var ca = colorizedElements.attr('class');
        var classes = [];
        if (ca && ca.length && ca.split) {
          ca = jQuery.trim(ca);
          /* strip leading and trailing spaces */
          classes = ca.split(' ');
        }
        var themeStylePrefix = "beaker-theme-";
        var clazz = _.find(classes, function (e) {
          return e.indexOf(themeStylePrefix) !== -1
        });
        if (clazz) colorizedElements.removeClass(clazz);
        if ("default" !== theme) {
          colorizedElements.addClass(themeStylePrefix + theme);
        }
      }
    };

    if (window.beakerRegister === undefined || window.beakerRegister.isPublication === undefined) {
      bkUtils.getBeakerPreference('fs-order-by').then(function (fs_order_by) {
        bkCoreManager._prefs.fs_order_by = !fs_order_by || fs_order_by.length === 0 ? 'uri' : fs_order_by;
      }).catch(function (response) {
        console.log(response);
        bkCoreManager._prefs.fs_order_by = 'uri';
      });

      bkUtils.getBeakerPreference('fs-reverse').then(function (fs_reverse) {
        bkCoreManager._prefs.fs_reverse = !fs_reverse || fs_reverse.length === 0 ? false : fs_reverse;
      }).catch(function (response) {
        console.log(response);
        bkCoreManager._prefs.fs_reverse = false;
      });
      bkUtils.getBeakerPreference('theme').then(function (theme) {
        bkCoreManager._prefs.setTheme(_.includes(_.values(GLOBALS.THEMES), theme) ? theme : GLOBALS.THEMES.DEFAULT);
        $rootScope.$broadcast('beaker.theme.set', theme);
      }).catch(function (response) {
        console.log(response);
        bkCoreManager._prefs.setTheme(GLOBALS.THEMES.DEFAULT);
      });
    } else if (window.beakerRegister === undefined || window.beakerRegister.prefsPreset === undefined) {
      bkCoreManager._prefs.fs_order_by = 'uri';
      bkCoreManager._prefs.fs_reverse = false;
      $timeout(function() {
        // there's a race condition in calling setTheme during bootstrap
        bkCoreManager._prefs.setTheme(GLOBALS.THEMES.DEFAULT);
      }, 0);
    } else {
      bkCoreManager._prefs.fs_order_by = window.beakerRegister.prefsPreset.fs_order_by;
      bkCoreManager._prefs.fs_reverse = window.beakerRegister.prefsPreset.fs_reverse;
      $timeout(function() {
        // there's a race condition in calling setTheme during bootstrap
        bkCoreManager._prefs.setTheme(window.beakerRegister.prefsPreset.theme);
      }, 0);
    }

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

  module.controller('filePermissionsDialogCtrl', function ($scope, $rootScope, $uibModalInstance,
                                                           bkUtils, strategy) {

    $scope.getStrategy = function () {
      return strategy;
    };

    $scope.ownerEdit = false;
    $scope.groupEdit = false;

    $scope.editOwner = function () {
      $scope.ownerEdit = true;
    };

    $scope.editGroup = function () {
      $scope.groupEdit = true;
    };

    $scope.model = {
      OWNER_READ: strategy.permissions.indexOf('OWNER_READ') !== -1,
      OWNER_WRITE: strategy.permissions.indexOf('OWNER_WRITE') !== -1,
      OWNER_EXECUTE: strategy.permissions.indexOf('OWNER_EXECUTE') !== -1,
      GROUP_READ: strategy.permissions.indexOf('GROUP_READ') !== -1,
      GROUP_WRITE: strategy.permissions.indexOf('GROUP_WRITE') !== -1,
      GROUP_EXECUTE: strategy.permissions.indexOf('GROUP_EXECUTE') !== -1,
      OTHERS_READ: strategy.permissions.indexOf('OTHERS_READ') !== -1,
      OTHERS_WRITE: strategy.permissions.indexOf('OTHERS_WRITE') !== -1,
      OTHERS_EXECUTE: strategy.permissions.indexOf('OTHERS_EXECUTE') !== -1,

      owner: strategy.owner,
      group: strategy.group,

      collectResult: function () {
        var permissions = [];
        if (this.OWNER_READ === true) permissions.push('OWNER_READ');
        if (this.OWNER_WRITE === true) permissions.push('OWNER_WRITE');
        if (this.OWNER_EXECUTE === true) permissions.push('OWNER_EXECUTE');
        if (this.GROUP_READ === true) permissions.push('GROUP_READ');
        if (this.GROUP_WRITE === true) permissions.push('GROUP_WRITE');
        if (this.GROUP_EXECUTE === true)  permissions.push('GROUP_EXECUTE');
        if (this.OTHERS_READ === true) permissions.push('OTHERS_READ');
        if (this.OTHERS_WRITE === true) permissions.push('OTHERS_WRITE');
        if (this.OTHERS_EXECUTE === true) permissions.push('OTHERS_EXECUTE');
        return {
          permissions: permissions,
          owner: this.owner,
          group: this.group
        };
      }
    };


    $scope.ok = function () {
      $uibModalInstance.close($scope.model.collectResult());
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });



  module.controller('fileDialogCtrl', function ($scope, $rootScope, $uibModalInstance, $timeout, bkCoreManager, bkUtils, strategy) {

    var elfinder;

    var state = {
      hashes2Open: [],
      tabClicked : false,
      go2Path: function (path) {
        state.hashes2Open = bkHelper.path2hash(elfinder, path);
        elfinder.exec('open', state.hashes2Open.pop());
      }
    };

    var addTrailingSlash = function (str, isWindows) {
      if (isWindows) {
        if (!_.endsWith(str, '\\')) {
          str = str + '\\';
        }
      } else {
        if (!_.endsWith(str, '/')) {
          str = str + '/';
        }
      }
      return str;
    };

    var getFilename = function (path) {
      var filename = path.substring(path.lastIndexOf(bkUtils.serverOS.isWindows() ? '\\' : '/') + 1);
      return filename.trim().length > 0 ? filename.trim() : null;
    };

    var getParent = function (path) {
      var parentEndIndex = path.lastIndexOf(bkUtils.serverOS.isWindows() ? '\\' : '/') + 1;
      if(parentEndIndex > 1) {
        parentEndIndex--; //trim trailing slash for non-root path
      }
      return path.substring(0, parentEndIndex);
    };

    var isRoot = function (path) {
      return path === getParent(path);
    };

    var setFromHash = function (hash, timeout) {
      var action = function () {
        $scope.selected.path = elfinder.file(hash).fullpath.replace('//', '/');
        if (elfinder.file(hash).mime === 'directory')
          $scope.selected.path = addTrailingSlash($scope.selected.path, bkUtils.serverOS.isWindows());
      };
      if (timeout !== undefined && timeout !== null) {
        $timeout(function () {
          action(hash);
        }, timeout);
      } else {
        action(hash);
      }
    };

    $scope.selected = {
      path: null
    };

    $scope.isReady = function () {
      var deferred = bkUtils.newDeferred();
      if ($scope.selected.path) {
        bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/file-io/analysePath"), {path: $scope.selected.path})
          .success(function (result) {
            if (result.exist === true) {
              deferred.resolve(result.isDirectory !== true);
            } else {
              if ($scope.getStrategy().type === "SAVE") {
                deferred.resolve(result.parent ? true : false);
              } else {
                deferred.resolve(false);
              }
            }
          });
      } else {
        deferred.resolve(false);
      }
      return deferred.promise;
    };

    $scope.$watch('selected.path', function(newVal){
      $scope.selected.path = newVal;
      var disabled = false;
      if ($scope.selected.path){
        bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/file-io/analysePath"), {path: $scope.selected.path})
        .success(function(result) {
          if (result.exist === true){
            disabled = (result.isDirectory === true);
          }else{
            disabled = ($scope.getStrategy().type !== "SAVE");
          }
          angular.element(document.getElementById('okButton'))[0].disabled = disabled;
        });
      }
    });

    $scope.getStrategy = function () {
      return strategy;
    };

    $scope.mime = function () {
      if ($scope.getStrategy().treeViewfs.applyExtFilter === true) {
        return bkUtils.mime($scope.getStrategy().treeViewfs.extension);
      }
      return [];
    };


    $scope.init = function () {

      elFinder.prototype.commands.editpermissions = function() {
        this.exec = function (hashes) {
          var path = $scope.selected.path;
          bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/file-io/getPosixFileOwnerAndPermissions"), {path: path})
            .then(function (response) {
              bkCoreManager.showFilePermissionsDialog(path, response.data).then(function(result){
                var postData = {
                  path: $scope.selected.path,
                  permissions: result.permissions
                };
                if(result.owner !== response.data.owner) {
                  postData.owner = result.owner;
                }
                if(result.group !== response.data.group) {
                  postData.group = result.group;
                }
                bkUtils.httpPost('rest/file-io/setPosixFileOwnerAndPermissions', postData).catch(function (response) {
                  bkHelper.show1ButtonModal(response.data, 'Permissions change filed');
                })
              });
            })
        };
        this.getstate = function (hashes) {
          //return 0 to enable, -1 to disable icon access
          return $scope.selected.path && $scope.selected.path.length > 0 && !bkUtils.serverOS.isWindows() ? 0 : -1;
        }
      };

      var $elfinder = $('#elfinder');

      var selectCallback = function (event, elfinderInstance) {
        if (event.data.selected && event.data.selected.length > 0) {
          elfinder.trigger('enable');
          setFromHash(event.data.selected[0], 0);
        }
      };
      var openCallback = function (event, elfinderInstance) {
        if (state.hashes2Open.length > 0) {
          elfinder.exec('open', state.hashes2Open.pop());
        }
        setFromHash(elfinderInstance.cwd().hash, 0);
      };
      var getFileCallback = function (url) {
        $scope.ok();
      };

      var elfinderOptions = bkHelper.elfinderOptions(getFileCallback,
        selectCallback,
        openCallback,
        $scope.mime(),
        $scope.getStrategy().treeViewfs.showHiddenFiles);

      elfinder = bkHelper.elfinder($elfinder, elfinderOptions);

      var orig_mime2class = elfinder.mime2class;
      elfinder.mime2class = function (mime) {
        if (mime === 'Beaker-Notebook') {
          return 'elfinder-cwd-icon-beaker';
        }
        return orig_mime2class(mime);
      };

      $elfinder.css("width", '100%');
      $elfinder.css("height", '100%');

      $(".modal-content").resizable({
        resize: function (event, ui) {
          $elfinder.trigger('resize');
        }
      });

      if ($scope.getStrategy().initUri && $scope.getStrategy().initUri.length > 0) {
        $timeout(function () {
          $scope.selected.path = $scope.getStrategy().initUri;
        }, 1000);
      }
      elfinder.trigger('disable');
    };

    var onEnter = function (keyEvent) {
      state.tabClicked = false;
      if ($scope.selected.path) {
        bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/file-io/analysePath"), {path: $scope.selected.path})
          .success(function (result) {
            if (result.exist === true) {
              if (result.isDirectory === true) {
                state.go2Path($scope.selected.path);
              } else {
                $scope.ok(true);
              }
            } else {
              if ($scope.getStrategy().type === "SAVE") {
                if (result.parent) {
                  $scope.ok(true);
                }
              }
            }
          });
      }
    };

    function sharedStart(array) {
      var A = array.concat().sort(),
        a1 = A[0], a2 = A[A.length - 1], L = a1.length, i = 0;
      while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
      return a1.substring(0, i);
    }

    function getCurrentFolder() {
      var path = elfinder.path(elfinder.cwd().hash);
      return path.startsWith('//') ? path.substring(1) : path;
    }

    var onTab = function (keyEvent) {
      var parentPath = getCurrentFolder();
      if (parentPath === getParent($scope.selected.path)) {
        var filename = getFilename($scope.selected.path);
        var volume = bkHelper.getVolume(elfinder);
        var possible_files = [];
        // Get the keys
        var keys = Object.keys(elfinder.files());
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (key.indexOf(volume.hash) === 0) {
            var file = elfinder.files()[key];
            if (parentPath === getParent(file.fullpath) && !isRoot(file.fullpath)) {
              if (getFilename(file.fullpath).indexOf(filename) === 0) {
                possible_files.push(file);
              }
            }
          }
        }
        if (possible_files.length === 1) {
          state.tabClicked = true;
          $timeout(function () {
            $scope.selected.path = possible_files[0].fullpath;
            if (possible_files[0].mime === 'directory') {
              state.go2Path($scope.selected.path);
            }
          }, 0);
        } else {
          $timeout(function () {
            $scope.selected.path = addTrailingSlash(getParent($scope.selected.path)) +
              sharedStart(_.map(possible_files, function (e) {
                return e.name;
              }));
          }, 0);
        }
      }
      keyEvent.preventDefault();
    };

    var onSlash = function (keyEvent) {
      state.tabClicked = false;
      state.go2Path($scope.selected.path);
    };

    var onBackspace= function (keyEvent) {
      if (state.tabClicked === true){
        $timeout(function () {
          $scope.selected.path = addTrailingSlash(getParent($scope.selected.path));
          elfinder.trigger("filter_cwd", {
            filter: getFilename($scope.selected.path)
          });
        }, 0);
      }else{
        onKey(keyEvent);
      }
      state.tabClicked = false;
    };

    var onKey = function (keyEvent) {
      state.tabClicked = false;
      $timeout(function () {
        var parent = getParent($scope.selected.path);
        if (getCurrentFolder() === parent) {
          $timeout(function () {
            elfinder.trigger("filter_cwd", {
              filter: getFilename($scope.selected.path)
            });
          }, 300);
        }
      }, 0);
    };

    $scope.onkey = function (keyEvent) {
      if (keyEvent.which === 13) {
        onEnter(keyEvent);
      } else if (keyEvent.which === 9) {
        onTab(keyEvent)
      } else if (keyEvent.which === 191) {
        if (!bkUtils.serverOS.isWindows())
          onSlash(keyEvent);
      } else if (keyEvent.which === 220) {
        if (bkUtils.serverOS.isWindows())
          onSlash(keyEvent);
      } else if (keyEvent.which === 8) {
        onBackspace(keyEvent);
      } else {
        onKey(keyEvent);
      }
    };
    
    var ok = function () {
      if ($scope.getStrategy().type === "SAVE") {
        var filename = getFilename($scope.selected.path);
        var extension = $scope.getStrategy().treeViewfs.extension;
        if (extension !== undefined && extension.length > 0) {
          if (filename.indexOf(extension) === -1 || filename.lastIndexOf(extension) != filename.length - extension.length) {
            $scope.selected.path += "." + extension;
          }
        }
      }
      $uibModalInstance.close($scope.selected.path);
    };

    $scope.ok = function (skipReady) {
      if (skipReady === true) {
        ok();
      }
      $scope.isReady().then(function (isReady) {
        if (isReady === true) {
          ok();
        }
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.$watch(function (scope) {
      return scope.getStrategy().treeViewfs.applyExtFilter
    }, function () {
      if (elfinder) {
        elfinder.options.onlyMimes = $scope.mime();
        elfinder.exec('reload');
      }
    });

    $scope.$watch(function (scope) {
      return scope.getStrategy().treeViewfs.showHiddenFiles
    }, function () {
      if (elfinder) {
        elfinder.options.showHiddenFiles = $scope.getStrategy().treeViewfs.showHiddenFiles;
        elfinder.exec('reload');
      }
    });

    var unregister = $scope.$watch(function (scope) {
        return scope.selected.path
      },
      function (newValue, oldValue) {
        if ((!oldValue || oldValue.length === 0) && (newValue && newValue.length > 0)) {
          document.getElementById("file-dlg-selected-path").setSelectionRange(newValue.length - 1, newValue.length - 1);
          unregister();
        }
      }
    );

  });



  module.controller('modalDialogCtrl', function($scope, $rootScope, $uibModalInstance, modalDialogOp,
                                                bkUtils) {
    $scope.getStrategy = function() {
      return modalDialogOp.getStrategy();
    };
    $scope.isWindows = function() {
      return bkUtils.isWindows;
    };
    $rootScope.$on('modal.submit', function() {
      $scope.close($scope.getStrategy().getResult());
    });
    $scope.close = function (result) {
      if (!$scope.getStrategy || !$scope.getStrategy() || !$scope.getStrategy().checkCallback) {
        $uibModalInstance.close(result);
      }else {
        $scope.getStrategy().checkCallback(result).then(function(value) {
          if (value.result === true)
            $uibModalInstance.close(result);
        });
      }
    };
  });

  module.controller('SQLLoginController', function($scope, $rootScope, $uibModalInstance, modalDialogOp, bkUtils, connectionName, connectionString, user) {

    $scope.sqlConnectionData = {
      connectionName: connectionName,
      connectionString: connectionString,
      user: user,
      password: null
    }

    $scope.cancelFunction = function() {
      $uibModalInstance.close(-1);
    };

    $scope.okFunction = function() {
      $uibModalInstance.close($scope.sqlConnectionData);
    };

    $scope.getStrategy = function() {
      return modalDialogOp.getStrategy();
    };
    $scope.isWindows = function() {
      return bkUtils.isWindows;
    };
    $rootScope.$on('modal.submit', function() {
      $scope.close($scope.getStrategy().getResult());
    });

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

  module.factory('bkAnsiColorHelper', function () {
    function getChunks(text) {
      return text.split(/\033\[/);
    }

    function chunkHasColorCodes(item) {
      return !!item.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);
    }

    return {
      hasAnsiColors: function (text) {
        return getChunks(text).some(function (item) {
          return chunkHasColorCodes(item);
        });
      },
      convertToHtml: function (text) {
        return ansi_up.ansi_to_html(text);
      }
    };
  });

  module.factory('bkDragAndDropHelper', function (bkUtils) {
    function wrapImageDataUrl(dataUrl) {
      return '<img src="' + dataUrl + '" />';
    }

    var dragAndDropHelper = {
      getImportNotebookPattern: function () {
        return getImportNotebookFileTypePattern();
      },
      isFileForImportDragging: function (event) {
        if (window.beakerRegister !== undefined && window.beakerRegister.hooks !== undefined && window.beakerRegister.hooks.disableDragAndDropImport !== undefined) {
          if(window.beakerRegister.hooks.disableDragAndDropImport()) {
            return false;
          }
        }
        if(event.originalEvent) {
          event = event.originalEvent;
        }
        if(event && event.dataTransfer && event.dataTransfer.items) {
          var items = event.dataTransfer.items;
          for (var i = 0; i < items.length; i++) {
            if(this.isFileForImport(items[i])) {
              return true;
            }
          }
        }
        return false;
      },
      isFileForImport: function (item) {
        if (window.beakerRegister !== undefined && window.beakerRegister.hooks !== undefined && window.beakerRegister.hooks.disableDragAndDropImport !== undefined) {
          if(window.beakerRegister.hooks.disableDragAndDropImport()) {
            return false;
          }
        }
        return item.type !== undefined && new RegExp(getImportNotebookFileTypePattern(), 'i').test(item.type);
      },
      loadImageFileAsString: function (file) {
        if (file && window.FileReader && window.File) {
          var deferred = bkUtils.newDeferred();
          var reader = new FileReader;
          reader.onload = function (loadingEvent) {
            deferred.resolve(wrapImageDataUrl(loadingEvent.target.result));
          };
          reader.readAsDataURL(file);
          return deferred.promise;
        } else {
          return false;
        }
      },
      wrapImageDataUrl: wrapImageDataUrl,
      configureDropEventHandlingForCodeMirror: function (cm, allowImageDropping) {
        if (window.beakerRegister !== undefined && window.beakerRegister.hooks !== undefined && window.beakerRegister.hooks.codemirrorEventConfig !== undefined) {
          window.beakerRegister.hooks.codemirrorEventConfig(cm, allowImageDropping);
        }
        cm.on('drop', function (cm, e) {
          if(allowImageDropping && !allowImageDropping()) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();

          var pos = posFromMouse(cm, e);
          var files = e.dataTransfer.files;
          if (files && files.length && window.FileReader && window.File) {
            var n = files.length, text = Array(n), read = 0;
            var loadFile = function(file, i) {
              var reader = new FileReader;
              reader.onload = function(fileLoadingEvent) {
                text[i] = wrapImageDataUrl(fileLoadingEvent.target.result);
                if (++read == n) {
                  cm.setSelection(cm.clipPos(pos));
                  cm.replaceSelection(text.join("\n"));
                }
              };
              reader.readAsDataURL(file);
            };
            for (var i = 0; i < n; ++i) loadFile(files[i], i);
          }

          function posFromMouse(cm, e) {
            var display = cm.display;
            var x, y, space = display.lineSpace.getBoundingClientRect();
            try { x = e.clientX - space.left; y = e.clientY - space.top; }
            catch (e) { return null; }
            return cm.coordsChar({left: x, top: y}, "div");
          }
        });
      },
      isImageFile: isImageFile
    };
    return dragAndDropHelper;
  });

  module.factory('bkNotificationService', function (bkUtils) {
    var _notificationSound = null;

    function checkPermissionsForNotification() {
      var deferred = bkUtils.newDeferred();
      if (Notification.permission === "granted") {
        deferred.resolve(true);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          deferred.resolve(permission === "granted");
        });
      }
      return deferred.promise;
    }

    function playNotificationSound() {
      if(!_notificationSound) {
        _notificationSound = new Audio('app/sound/notification.wav');
      }
      _notificationSound.play();
    }

    function sendEmailNotification(title, body) {
      var url = bkUtils.getEvaluationFinishedNotificationUrl();
      if (!!url) {
        bkUtils.httpGet(url, {
          title: title,
          body: body
        });
      }
    }

    function showNotification(title, body, tag) {
      checkPermissionsForNotification().then(function (granted) {
        if (granted) {
          var options = {
            body: body,
            icon: '/static/favicon.png'
          };
          if(tag) {
            options.tag = tag;
          }
          var notification = new Notification(title, options);
          notification.onclick = function () {
            notification.close();
            window.focus();
          };
          //we need to play sound this way because notification's 'options.sound' parameter is not supported yet
          playNotificationSound();
        }
      });
    }

    function initAvailableNotificationMethods() {

      var evaluationCompleteNotificationMethods = [];

      evaluationCompleteNotificationMethods = [{
        title: 'Notify when done',
        checkPermissions: function () {
          checkPermissionsForNotification();
        },
        action: showNotification
      }];
      if (bkUtils.getEvaluationFinishedNotificationUrl() != null) {
        evaluationCompleteNotificationMethods.push({
          title: 'Send email when done',
          action: sendEmailNotification
        });
      }

      return evaluationCompleteNotificationMethods;
    }

    function getAvailableNotificationMethods() {
      return evaluationCompleteNotificationMethods;
    }

    return {
      checkPermissions: checkPermissionsForNotification,
      initAvailableNotificationMethods: initAvailableNotificationMethods,
      sendEmailNotification: sendEmailNotification,
      showNotification: showNotification
    };
  });

  function getImportNotebookFileTypePattern() {
    return "^((?!image\/((png)|(jpg)|(jpeg))).)*?$";
  }

  function isImageFile(file) {
    return file && file.type && new RegExp(getImageFileTypePattern(), 'i').test(file.type);
  }

  function getImageFileTypePattern() {
    return "image/((png)|(jpg)|(jpeg))";
  }


})();