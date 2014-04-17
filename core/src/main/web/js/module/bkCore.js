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
   * bkBaseSessionModel
   * - manages run-time session properties + notebook model
   * e.g. sessionID, notebook URL, ...
   * - should be the gateway to interact with the overall notebook model
   * - cellOps
   * - insert/remove/move cells
   * - currently assumes the default hierarchical layout
   * - there is only one copy of the model, every changes should be reflected immediately
   */
  /**
   * For some historical reason, tagMap is reserved for describing the hierarchical (single-tree)
   * layout
   * All other arbitrary tagging should go under tagMap2
   */
  bkCore.factory('bkBaseSessionModel', function(generalUtils, bkNotebookCellModelManager) {
    var _notebookModel = {};
    var _notebookUrl = "";
    var _sessionID = null;
    var _caption = "";
    var _edited = false;

    var bkBaseSessionModel = {
      setNotebookModel: function(notebookModel) {
        _notebookModel = notebookModel;
        bkNotebookCellModelManager.reset(_notebookModel.cells);
      },
      getNotebookModel: function() {
        return _notebookModel;
      },
      setNotebookUrl: function(notebookUrl) {
        _notebookUrl = notebookUrl;
      },
      setCaption: function(caption) {
        _caption = caption;
      },
      setSessionID: function(sessionID) {
        _sessionID = sessionID;
      },
      getSessionID: function() {
        return _sessionID;
      },
      getSessionData: function() {
        return {
          sessionid: _sessionID,
          notebookurl: _notebookUrl,
          content: angular.toJson(_notebookModel),
          caption: _caption,
          edited: _edited
        };
      },
      clearSession: function() {
        this.setNotebookModel({});
        _notebookUrl = "";
        _sessionID = null;
        _caption = "";
      },
      toggleNotebookLocked: function() {
        if (_notebookModel) {
          if (_notebookModel.locked === undefined) {
            _notebookModel.locked = true;
          } else {
            _notebookModel.locked = undefined;
          }
          _edited = true;
        }
      },
      isNotebookLocked: function() {
        return (_notebookModel && _notebookModel.locked) ? true : false;
      },
      isEdited: function() {
        return _edited;
      },
      setEdited: function(edited) {
        _edited = edited;
      },
      cellOp: bkNotebookCellModelManager,
      newCodeCell: function(evaluator, id) {
        if (!evaluator) {
          evaluator = _notebookModel.evaluators[0].name;
        }
        if (!id) {
          id = "code" + generalUtils.generateID(6);
        }
        return {
          "id": id,
          "type": "code",
          "evaluator": evaluator,
          "input": {
            "body": ""
          },
          "output": {}
        };
      },
      newSectionCell: function(level, title, id) {
        if (!level && level !== 0) {
          level = 1;
        }
        if (level <= 0) {
          throw "creating section cell with level " + level + " is not allowed";
        }
        if (!title) {
          title = "New Section H" + level
        }

        if (!id) {
          id = "section" + generalUtils.generateID(6);
        }
        return {
          "id": id,
          "type": "section",
          "title": title,
          "level": level
        };
      },
      newTextCell: function(id) {
        if (!id) {
          id = "text" + generalUtils.generateID(6);
        }
        return {
          "id": id,
          "type": "text",
          "body": "New <b>text</b> cell"
        };
      },
      newMarkdownCell: function(id) {
        var tail = _notebookModel.cells.length - 1;
        if (!id) {
          id = "markdown" + generalUtils.generateID(6);
        }
        return {
          "id": id,
          "type": "markdown",
          "body": ""
        };
      },
      getInitializationCells: function() {
        if (_notebookModel.initializeAll) {
          return this.cellOp.getAllCodeCells("root");
        } else {
          return this.cellOp.getInitializationCells();
        }
      }
    };

    return bkBaseSessionModel;
  });
  /**
   * bkCoreManager
   * - this acts as the global space for all view managers to use it as the communication channel
   * - bkUtils should be consider 'private' to beaker, external code should depend on bkHelper
   *     instead
   */
  bkCore.factory('bkCoreManager', function(
      $dialog, $location, bkUtils, bkSession, bkRecentMenu, fileChooserOp) {
    var bkCoreManager = {
      _beakerRootOp: null,
      init: function(beakerRootOp) {
        this._beakerRootOp = beakerRootOp;
      },
      gotoControlPanel: function() {
        // TODO. There is a synchronous problem now. Currently the session backup is
        // not guaranteed to be done before the control panel loads.
        // This should be refactored so that when we are going from bkApp to control
        // panel, backup the session explicitly first, 'then' go to control panel.
        return this._beakerRootOp.gotoControlPanel();
      },
      openURI: function(path) {
        return this._beakerRootOp.openURI(path);
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
      showAnonymousTrackingDialog: function() {
        if (this._bkAppImpl.showAnonymousTrackingDialog) {
          return this._bkAppImpl.showAnonymousTrackingDialog();
        } else {
          console.error("Action 'showAnonymousTrackingDialog' is not supported by current app");
        }
      },

      _bkNotebookImpl: null,
      setBkNotebookImpl: function(bkNotebookImpl) {
        this._bkNotebookImpl = bkNotebookImpl;
      },
      getBkNotebook: function() {
        return this._bkNotebookImpl;
      },

      recordRecentDocument: function(doc) {
        return bkRecentMenu.recordRecentDocument(doc);

      },
      getRecentMenuItems: function() {
        return bkRecentMenu.getMenuItems();
      },
      getCurrentOpenMenuItems: function() {
        var deferred = Q.defer();
        bkSession.getSessions().then(function(sessions) {
          var menuItems = [];
          _.keys(sessions).forEach(function(sessionID) {
            var session = sessions[sessionID];
            var url = session.notebookurl;
            if (url && url[url.length - 1] === "/") {
              url = url.substring(0, url.length - 1);
            }
            menuItems.push({
              name: session.caption ? session.caption :
                  (url ? url.replace(/^.*[\\\/]/, '') : "New Notebook"),
              action: function() {
                $location.path("session/" + sessionID);
              }
            });
          });
          deferred.resolve(menuItems);
        });
        return deferred.promise;
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

      // notebook save functions
      _saveFuncs: {},
      registerSaveFunc: function(type, saveFunc) {
        this._saveFuncs[type] = saveFunc;
      },
      getSaveFunc: function(type) {
        return this._saveFuncs[type];
      },

      // general
      log: function(event, obj) {
        return bkUtils.log(event, obj);
      },
      refreshRootScope: function() {
        return bkUtils.refreshRootScope();
      },
      getDefaultNotebook: function(cb) {
        return bkUtils.getDefaultNotebook(cb);
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
