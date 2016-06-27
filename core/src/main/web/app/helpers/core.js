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
      showFileChooser: function(initUri) {
        return bkCoreManager.showDefaultSavingFileChooser(initUri);
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
      showDefaultSavingFileChooser: function(initPath, saveButtonTitle) {
        var self = this;
        var deferred = bkUtils.newDeferred();
        var requests = [bkUtils.getHomeDirectory(), bkUtils.getStartUpDirectory(),
          bkUtils.getLocalDrives()];
        bkUtils.all(requests).then(function(values) {
          var homeDir = values[0];
          var localDrives = values[2];
          var fileChooserStrategy = self.getFileSystemFileChooserStrategy();
          fileChooserStrategy.localDrives = localDrives;
          fileChooserStrategy.input = initPath;
          fileChooserStrategy.convertRelativePath = function (path) {
            if (path == null) {
              return path;
            }
            var result = path;
            if (result === '~') {
              result = homeDir + "/"
            } else if (_.startsWith(result, '~/')) {
              result = result.replace('~', homeDir);
            } else if (!_.startsWith(result, '/') && !result.match(/^\w+:\\/)) {
              result = homeDir + "/" + result;
            }
            return result;
          };
          fileChooserStrategy.getResult = function () {
            if (_.isEmpty(this.input)) {
              return "";
            }
            var result = this.convertRelativePath(this.input);
            if (!_.endsWith(result, '.bkr')
                && !_.endsWith(result, '/')) {
              result = result + ".bkr";
            }
            return result;
          };
          fileChooserStrategy.newFolder = function(path) {
            var self = this;
            this.showSpinner = true;
            path = this.convertRelativePath(path);
            bkUtils.httpPost("../beaker/rest/file-io/createDirectory", {path: path})
              .success(function (list) {

                self.manualName = "";
                self.input = path+'/';

                $rootScope.$broadcast("MAKE_NEW_DIR",{
                  path: path
                });
                self.showSpinner = false;
              }).error(function (response) {
                self.showSpinner = false;
                console.log(response);
              });
          };
          fileChooserStrategy.getSaveBtnDisabled = function() {
            return _.isEmpty(this.input) || _.endsWith(this.input, '/');
          };
          fileChooserStrategy.treeViewfs.applyExtFilter = false;
          saveButtonTitle = saveButtonTitle || "Save";
          var fileChooserTemplate = JST['template/savenotebook']({
            homedir: homeDir,
            saveButtonTitle: saveButtonTitle
          });
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
          scope.evaluate();
          var nextCell = notebookCellOp.findNextCodeCell(scope.cellmodel.id);
          if (!nextCell) {
            appendCodeCell();
          }
          goToNextCodeCell();
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

        var isFullScreen = function (cm) {
          return bkHelper.isFullScreen(cm);
        };

        var setFullScreen = function (cm) {
          bkHelper.setFullScreen(cm, !bkHelper.isFullScreen(cm));
        };

        var keys = {
            "Up" : goUpOrMoveFocusUp,
            "Down" : goDownOrMoveFocusDown,
            "Ctrl-S": "save",
            "Cmd-S": "save",
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
