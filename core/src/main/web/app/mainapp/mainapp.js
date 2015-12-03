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
 * Module bk.mainApp
 * This is the main module for the beaker notebook application. The module has a directive that
 * holds the menu bar as well as the notebook view.
 * The module also owns the centralized cell evaluation logic.
 */
(function() {
  'use strict';
  var module = angular.module('bk.mainApp', [
                                             'ngRoute',
                                             'bk.utils',
                                             'bk.commonUi',
                                             'bk.core',
                                             'bk.globals',
                                             'bk.session',
                                             'bk.sessionManager',
                                             'bk.menuPluginManager',
                                             'bk.cellMenuPluginManager',
                                             'bk.notebookVersionManager',
                                             'bk.evaluatorManager',
                                             'bk.evaluateJobManager',
                                             'bk.notebookRouter',
                                             'bk.notebook',
                                             'bk.electron',
                                             'bk.connectionManager',
                                             'bk.fileManipulation'
                                             ]);

  /**
   * bkApp
   * - This is the beaker App
   * - menus + plugins + notebook(notebook model + evaluator)
   */
  module.directive('bkMainApp', function(
      $timeout,
      $sessionStorage,
      $rootScope,
      bkUtils,
      bkCoreManager,
      bkSession,
      bkSessionManager,
      bkMenuPluginManager,
      bkCellMenuPluginManager,
      bkNotebookVersionManager,
      bkEvaluatorManager,
      bkEvaluateJobManager,
      bkElectron,
      $location,
      bkFileManipulation) {

    return {
      restrict: 'E',
      template: JST["template/mainapp/mainapp"](),
      scope: {
        notebook: '=',
        sessionId: '@',
        newSession: '@',
        allowDocumentRenaming: '@',
        isImport: '@import',
        isOpen: '@open'
      },
      controller: function($scope, $timeout, connectionManager, GLOBALS) {
        var showLoadingStatusMessage = function(message, nodigest) {
          if (bkHelper.isElectron) {
            bkElectron.setStatus(message);
          } else {
            $scope.loadingmsg = message;
            if (nodigest !== true && !($scope.$$phase || $rootScope.$$phase))
              $scope.$digest();
          }
        };
        var updateLoadingStatusMessage = function() {
          if (bkHelper.isElectron) {
            return;
          }
          if (!($scope.$$phase || $rootScope.$$phase))
            $scope.$digest();
        };
        var getLoadingStatusMessage = function() {
          if (bkHelper.isElectron) {
            return bkElectron.getStatus();
          }
          return $scope.loadingmsg;
        };
        var clrLoadingStatusMessage = function(message, nodigest) {
          if (bkHelper.isElectron) {
            if (bkElectron.getStatus() === message) {
              bkElectron.setStatus('');
            }
          } else {
            if ($scope.loadingmsg === message) {
              $scope.loadingmsg = "";
              if (nodigest !== true && !($scope.$$phase || $rootScope.$$phase))
                $scope.$digest();
            }
          }
        };
        var showTransientStatusMessage = function(message, nodigest) {
          $scope.loadingmsg = message;
          if (nodigest !== true && !($scope.$$phase || $rootScope.$$phase))
            $scope.$digest();
          if (message !== "") {
            $timeout(function() {
              if ($scope.loadingmsg === message) {
                $scope.loadingmsg = "";
                if (nodigest !== true && !($scope.$$phase || $rootScope.$$phase))
                  $scope.$digest();
              }
            }, 500, 0, false);
          }
        };
        var evaluatorMenuItems = [];

        var addEvaluator = function(settings, alwaysCreateNewEvaluator) {
          // set shell id to null, so it won't try to find an existing shell with the id
          if (alwaysCreateNewEvaluator) {
            settings.shellID = null;
          }

          return bkEvaluatorManager.newEvaluator(settings)
          .then(function(evaluator) {
            if (!_.isEmpty(evaluator.spec)) {
              var actionItems = [];
              _.each(evaluator.spec, function(value, key) {
                if (value.type === "action") {
                  actionItems.push({
                    name: value.name ? value.name : value.action,
                        action: function() {
                          evaluator.perform(key);
                        }
                  });
                }
              });
              if (actionItems.length > 0) {
                evaluatorMenuItems.push({
                  name: evaluator.pluginName, // TODO, this should be evaluator.settings.name
                  items: actionItems
                });
              }
            }
          });
        };

        var loadNotebook = (function() {
          var loadNotebookModelAndResetSession = function(
              notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId,
              isExistingSession) {
            // check if the notebook has to load plugins from an external source
            var r = new RegExp('^(?:[a-z]+:)?//', 'i');
            if (notebookModel && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                if (r.test(notebookModel.evaluators[i].plugin)) {
                  var plugList = "<ul>";
                  for (var j = 0; j < notebookModel.evaluators.length; ++j) {
                    if (r.test(notebookModel.evaluators[j].plugin)) {
                      plugList += "<li>"+notebookModel.evaluators[j].plugin;
                    }
                  }
                  plugList += "</ul>";
                  promptIfInsecure(plugList).then(function() {
                    // user accepted risk... do the loading
                    _loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, isExistingSession);
                  }, function() {
                    // user denied risk... clear plugins with external URL and do the loading
                    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
                    for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                      if (r.test(notebookModel.evaluators[i].plugin)) {
                        notebookModel.evaluators[i].plugin="";
                      }
                    }
                    _loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, isExistingSession);
                  });
                  return;
                }
              }
            }
            // no unsafe operation detected... do the loading
            _loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, isExistingSession);
          };
          var promptIfInsecure = function(urlList) {
            var deferred = bkUtils.newDeferred();
            bkCoreManager.show2ButtonModal(
                "This notebook is asking to load the following plugins from external servers:<br/>" + urlList+
                " <br/>How do you want to handle these external plugins?",
                "Warning: external plugins detected",
                function() {
                  deferred.reject();
                },
                function() {
                  deferred.resolve();
                }, "Disable", "Load", "", "btn-danger");
            return deferred.promise;
          };
          var _loadNotebookModelAndResetSession = function(
              notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId,
              isExistingSession) {

            showLoadingStatusMessage("Loading notebook");
            $scope.loading = true;

            isExistingSession = !!isExistingSession;
            evaluatorMenuItems.splice(0, evaluatorMenuItems.length);

            // HACK to fix older version of evaluator configuration
            if (notebookModel && notebookModel.cells && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.cells.length; ++i) {
                if (notebookModel.cells[i].evaluator !== undefined) {
                  for (var j = 0; j < notebookModel.evaluators.length; ++j) {
                    var name = notebookModel.evaluators[j].name;
                    if (notebookModel.cells[i].evaluator === name) {
                      var plugin = notebookModel.evaluators[j].plugin;
                      if (bkUtils.beginsWith(name,"Html")) {
                        notebookModel.cells[i].evaluator = "HTML";
                      } else if(bkUtils.beginsWith(name,"Latex")) {
                        notebookModel.cells[i].evaluator = "TeX";
                      } else if(bkUtils.beginsWith(name,"TeX")) {
                          notebookModel.cells[i].evaluator = "TeX";
                      } else if(bkUtils.beginsWith(name,"JavaScript")) {
                        notebookModel.cells[i].evaluator = "JavaScript";
                      } else if(bkUtils.beginsWith(name,"Groovy")) {
                        notebookModel.cells[i].evaluator = "Groovy";
                      } else if(name === "Python") {
                        notebookModel.cells[i].evaluator = plugin;
                      }
                      break;
                    }
                  }
                }
              }
              for (var k = 0; k < notebookModel.evaluators.length; ++k) {
                var evaluatorName = notebookModel.evaluators[k].name;
                var evaluatorPlugin = notebookModel.evaluators[k].plugin;
                if (bkUtils.beginsWith(evaluatorName,"Html")) {
                  notebookModel.evaluators[k].name = "HTML";
                  notebookModel.evaluators[k].plugin = "HTML";
                } else if(bkUtils.beginsWith(evaluatorName,"Latex")) {
                  notebookModel.evaluators[k].name = "TeX";
                  notebookModel.evaluators[k].plugin = "TeX";
                } else if(bkUtils.beginsWith(evaluatorName,"TeX")) {
                  notebookModel.evaluators[k].name = "TeX";
                  notebookModel.evaluators[k].plugin = "TeX";
                } else if(bkUtils.beginsWith(evaluatorName,"JavaScript")) {
                  notebookModel.evaluators[k].name = "JavaScript";
                  notebookModel.evaluators[k].plugin = "JavaScript";
                } else if(bkUtils.beginsWith(evaluatorName,"Groovy")) {
                  notebookModel.evaluators[k].name = "Groovy";
                  notebookModel.evaluators[k].plugin = "Groovy";
                } else if(evaluatorName=== "Python") {
                  notebookModel.evaluators[k].name = evaluatorPlugin;
                }
              }
            }
            // HACK END

            bkSessionManager.backup();
            bkSessionManager.clear();
            sessionId = bkSessionManager.setSessionId(sessionId);

            bkSessionManager.setup(
                notebookUri, uriType, readOnly, format,
                notebookModel, edited, sessionId);

            var mustwait;
            if (!isExistingSession && bkHelper.hasCodeCell("initialization")) {
              mustwait = bkCoreManager.show0ButtonModal("This notebook has initialization cells... waiting for their completion.", "Please Wait");
            }

            // this is used to load evaluators before rendering the page
            if (notebookModel && notebookModel.evaluators) {
              var promises = _.map(notebookModel.evaluators, function(ev) {
                return addEvaluator(ev, !isExistingSession);
              });
              bkUtils.all(promises).then(function() {
                if (!isExistingSession) {
                  bkUtils.log("open", {
                    uri: notebookUri,
                    uriType: uriType,
                    format: format,
                    maxCellLevel: _.max(notebookModel.cells, function(cell) {
                      return cell.level;
                    }).level,
                    cellCount: notebookModel.cells.length
                  });

                  bkHelper.evaluateRoot("initialization")
                    .then(function () {
                      if(mustwait !== undefined)
                        mustwait.close();
                      }, function () {
                        if(mustwait !== undefined)
                          mustwait.close();
                        bkCoreManager.show1ButtonModal("Notebook initialization failed","ERROR",null,"OK");
                      });
                }
              });
              clrLoadingStatusMessage("Loading notebook");
              $scope.loading = false;
              return;
            }

            if (!isExistingSession) {
              bkUtils.log("open", {
                uri: notebookUri,
                uriType: uriType,
                format: format,
                maxCellLevel: _.max(notebookModel.cells, function(cell) {
                  return cell.level;
                }).level,
                cellCount: notebookModel.cells.length
              });
              bkHelper.evaluateRoot("initialization").then(function () { if(mustwait !== undefined) mustwait.close(); });
            }
            clrLoadingStatusMessage("Loading notebook");
            $scope.loading = false;
          };
          return {
            openUri: function(target, sessionId, retry, retryCountMax) {
              if (!target.uri) {
                bkCoreManager.show1ButtonModal("Failed to open notebook, notebookUri is empty");
                return;
              }
              $scope.loading = true;
              showLoadingStatusMessage("Opening URI");
              if (retryCountMax === undefined) {
                retryCountMax = 100;
              }
              if (!target.type) {
                target.type = bkCoreManager.guessUriType(target.uri);
              }
              target.readOnly = !!target.readOnly;
              if (!target.format) {
                target.format = bkCoreManager.guessFormat(target.uri);
              }

              if (bkUtils.isElectron && (target.type == 'file')){
                bkElectron.app.addRecentDocument(target.uri);
              }
              bkSessionManager.updateNotebookUri(target.uri, target.type, target.readOnly, target.format);
              var importer = bkCoreManager.getNotebookImporter(target.format);
              if (!importer) {
                if (retry) {
                  // retry, sometimes the importer came from a plugin that is being loaded
                  retryCountMax -= 1;
                  setTimeout(function() {
                    loadNotebook.openUri(target, retry, retryCountMax);
                  }, 100);
                } else {
                  clrLoadingStatusMessage("Opening URI");
                  $scope.loading = false;
                  bkCoreManager.show1ButtonModal("Failed to open " + target.uri +
                      " because format " + target.format +
                      " was not recognized.", "Open Failed", function() {
                    bkCoreManager.gotoControlPanel();
                  });
                }
              } else {
                var fileLoader = bkCoreManager.getFileLoader(target.type);
                fileLoader.load(target.uri).then(function(fileContentAsString) {
                  var notebookModel = importer.import(fileContentAsString);
                  notebookModel = bkNotebookVersionManager.open(notebookModel);
                  loadNotebookModelAndResetSession(
                      target.uri,
                      target.type,
                      target.readOnly,
                      target.format,
                      notebookModel, false, sessionId, false);
                  setDocumentTitle();
                }).catch(function(data, status, headers, config) {
                  bkHelper.show1ButtonModal(data, "Open Failed", function() {
                    bkCoreManager.gotoControlPanel();
                  });
                }).finally(function() {
                  clrLoadingStatusMessage("Opening URI");
                  $scope.loading = false;
                });
              }
            },
            fromSession: function(sessionId) {
              $scope.loading = true;
              showLoadingStatusMessage("Loading notebook");
              bkSession.load(sessionId).then(function(session) {
                var notebookUri = session.notebookUri;
                var uriType = session.uriType;
                var readOnly = session.readOnly;
                var format = session.format;
                var notebookModel = angular.fromJson(session.notebookModelJson);
                var edited = session.edited;
                bkSessionManager.updateNotebookUri(notebookUri, uriType, readOnly, format);
                $timeout(function() {
                  loadNotebookModelAndResetSession(
                    notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, true);
                }, 0);
              });
            },
            fromImport: function(sessionId) {
              var notebook = $sessionStorage.importedNotebook;
              var notebookUri = null;
              var uriType = null;
              var readOnly = true;
              var format = null;
              var importer = bkCoreManager.getNotebookImporter('bkr');
              var notebookModel = importer.import(notebook);
              notebookModel = bkNotebookVersionManager.open(notebook);
              loadNotebookModelAndResetSession(
                  notebookUri, uriType, readOnly, format, notebookModel, false, sessionId, false);
            },
            emptyNotebook: function(sessionId) {
              var notebookModel =
                '{"beaker": "2", "evaluators": [{"name": "Html", "plugin": "Html"},' +
                '{"name": "JavaScript", "plugin": "JavaScript"}], "cells": []}';
              var notebookUri = null;
              var uriType = null;
              var readOnly = true;
              var format = null;
              notebookModel = bkNotebookVersionManager.open(notebookModel);
              loadNotebookModelAndResetSession(
                  notebookUri, uriType, readOnly, format, notebookModel, false, sessionId, false);
            },
            defaultNotebook: function(sessionId) {
              bkUtils.getDefaultNotebook().then(function(notebookModel) {
                var notebookUri = null;
                var uriType = null;
                var readOnly = true;
                var format = null;
                var importer = bkCoreManager.getNotebookImporter('bkr');
                notebookModel = importer.import(notebookModel);
                notebookModel = bkNotebookVersionManager.open(notebookModel);
                loadNotebookModelAndResetSession(
                    notebookUri, uriType, readOnly, format, notebookModel, false, sessionId, false);
              });
            }
          };
        })();

        var bkNotebookWidget;
        $scope.setBkNotebook = function(bkNotebook) {
          bkNotebookWidget = bkNotebook;
        };

        var _impl = (function() {

          var saveStart = function() {
            showLoadingStatusMessage("Saving");
          };
          var updateSessionStore = function(uri, uriType) {
            return bkSession.getSessions().then(function(sessions){
              var sessionID = bkSessionManager.getSessionId();
              var currentSession = sessions[sessionID];
              currentSession.uriType = uriType;
              currentSession.notebookModelJson = JSON.stringify(bkHelper.getNotebookModel());
              currentSession.notebookUri = uri;
              return bkSession.backup(sessionID, currentSession);
            });
          };
          var saveDone = function(ret) {
            bkSessionManager.setNotebookModelEdited(false);
            bkSessionManager.updateNotebookUri(ret.uri, ret.uriType, false, "bkr");
            updateSessionStore(ret.uri, ret.uriType);
            showTransientStatusMessage("Saved");
          };

          var saveFailed = function (msg) {
            if (msg === "cancelled") {
              showTransientStatusMessage("Cancelled");
            } else {
              bkCoreManager.show1ButtonModal(msg, "Save Failed");
              showTransientStatusMessage("Save Failed");
            }
          };

          var renameDone = function(ret) {
            bkSessionManager.updateNotebookUri(ret.uri, ret.uriType, false, "bkr");
            updateSessionStore(ret.uri, ret.uriType);
            showTransientStatusMessage("Renamed");
          };

          var renameFailed = function (msg) {
            if (msg === "cancelled") {
              showTransientStatusMessage("Cancelled");
            } else {
              bkCoreManager.show1ButtonModal(msg, "Rename Failed");
              showTransientStatusMessage("Rename Failed");
            }
          };

          function _closeNotebook() {
            var closeSession = function() {
              bkSessionManager.close().then(function() {
                bkCoreManager.gotoControlPanel();
              });
            };
            if (bkSessionManager.isNotebookModelEdited() === false) {
              closeSession();
            } else {
              var notebookTitle = bkSessionManager.getNotebookTitle();
              bkHelper.show3ButtonModal(
                  "Do you want to save " + notebookTitle + "?",
                  "Confirm close",
                  function() {
                    _impl.saveNotebook().then(closeSession);
                  },
                  function() {
                    closeSession();
                  },
                  null, "Save", "Don't save"
              );
            }
          };

          function closeNotebook() {
            if (bkEvaluateJobManager.isAnyInProgress() ) {
              bkCoreManager.show2ButtonModal(
                  "All running and pending cells will be cancelled.",
                  "Warning!",
                  function() {
                    bkEvaluateJobManager.cancelAll().then(function() {
                      _impl._closeNotebook();
                    }
                  ); });
            } else
              _closeNotebook();
          };

          var evalCodeId = 0;

          if (bkUtils.isElectron) {
            bkElectron.IPC.removeAllListeners('close-window');
            bkElectron.IPC.on('close-window', closeNotebook);
          }

          return {
            name: "bkNotebookApp",
            getSessionId: function() {
              return bkSessionManager.getSessionId();
            },
            getNotebookModel: function() {
              return bkSessionManager.getRawNotebookModel();
            },
            getBeakerObject: function() {
              return bkSessionManager.getBeakerObject();
            },
            showStatus: function(message, nodigest) {
              showLoadingStatusMessage(message, nodigest);
            },
            updateStatus: function() {
              updateLoadingStatusMessage();
            },
            getStatus: function() {
              return getLoadingStatusMessage();
            },
            clearStatus: function(message, nodigest) {
              clrLoadingStatusMessage(message, nodigest);
            },
            showTransientStatus: function(message, nodigest) {
              showTransientStatusMessage(message, nodigest);
            },

            saveNotebook: function() {
              saveStart();
              return bkFileManipulation.saveNotebook(saveFailed).then(saveDone, saveFailed);
            },
            renameNotebookTo: function(notebookUri, uriType) {
              if (_.isEmpty(notebookUri)) {
                console.error("cannot rename notebook, notebookUri is empty");
                return;
              }
              showLoadingStatusMessage("Renaming");
              return bkFileManipulation.renameNotebook(notebookUri, uriType).then(renameDone, renameFailed);
            },
            saveNotebookAs: function(notebookUri, uriType) {
              if (_.isEmpty(notebookUri)) {
                console.error("cannot save notebook, notebookUri is empty");
                return;
              }
              saveStart();
              return bkFileManipulation.saveNotebookAs(notebookUri, uriType).then(saveDone, saveFailed);
            },
            closeNotebook: closeNotebook,
            _closeNotebook: _closeNotebook,
            collapseAllSections: function() {
              _.each(this.getNotebookModel().cells, function(cell) {
                if (cell.type == "section") {
                  cell.collapsed = true;
                }
              });
            },
            openAllSections: function() {
              _.each(this.getNotebookModel().cells, function(cell) {
                if (cell.type == "section") {
                  cell.collapsed = false;
                }
              });
            },
            hasCodeCell: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // toEval can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              // or a cellModel
              // or an array of cellModels
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                  // this is a cellID
                  if (cellOp.isContainer(toEval)) {
                    // this is a section cell or root cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                    // single cell, just get the cell model from cellID
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                  // not a cellID
                  if (toEval === "initialization") {
                    // in this case toEval is going to be an array of cellModels
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                    // this is a user tag for a cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                    // assume it is a evaluator name,
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithEvaluator(toEval);
                  }
                }
              }
              if (toEval === undefined || (_.isArray(toEval) && toEval.length === 0)) {
                return false;
              }
              return true;
            },
            evaluate: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // toEval can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              // or a cellModel
              // or an array of cellModels
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                  // this is a cellID
                  if (cellOp.isContainer(toEval)) {
                    // this is a section cell or root cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                    // single cell, just get the cell model from cellID
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                  // not a cellID
                  if (toEval === "initialization") {
                    // in this case toEval is going to be an array of cellModels
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                    // this is a user tag for a cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                    // assume it is a evaluator name,
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithEvaluator(toEval);
                  }
                }
              }
              if (toEval === undefined || (!_.isArray(toEval) && toEval.length === 0)) {
                showTransientStatusMessage("ERROR: cannot find anything to evaluate");
                return "cannot find anything to evaluate";
              }
              if (!_.isArray(toEval)) {
                return bkEvaluateJobManager.evaluate(toEval);
              } else {
                return bkEvaluateJobManager.evaluateAll(toEval);
              }
            },
            evaluateRoot: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // toEval can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              // or a cellModel
              // or an array of cellModels
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                  // this is a cellID
                  if (cellOp.isContainer(toEval)) {
                    // this is a section cell or root cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                    // single cell, just get the cell model from cellID
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                  // not a cellID
                  if (toEval === "initialization") {
                    // in this case toEval is going to be an array of cellModels
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                    // this is a user tag for a cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                    // assume it is a evaluator name,
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithEvaluator(toEval);
                  }
                }
              }
              if (toEval === undefined || (!_.isArray(toEval) && toEval.length === 0)) {
                showTransientStatusMessage("ERROR: cannot find anything to evaluate");
                return "cannot find anything to evaluate";
              }
              if (!_.isArray(toEval)) {
                return bkEvaluateJobManager.evaluateRoot(toEval);
              } else {
                return bkEvaluateJobManager.evaluateRootAll(toEval);
              }
            },
            evaluateCellCode: function(cell, code) {
              // cell: cellModel
              // code: code to evaluate
              if (cell == null || typeof cell !== 'object' || _.isArray(cell)) {
                showTransientStatusMessage("ERROR: cannot evaluate cell");
                return "cannot evaluate cell";
              }
              return bkEvaluateJobManager.evaluateCellCode(cell, code);
            },
            evaluateCode: function(evaluator, code) {
              var outcontainer = { };
              var deferred = bkHelper.newDeferred();
              evalCodeId++;
              bkEvaluateJobManager.evaluate({
                id: "onTheFlyCell_"+evalCodeId,
                evaluator: evaluator,
                input: { body: code },
                output: outcontainer
              }).then(function() { deferred.resolve(outcontainer.result); }, function(err) { deferred.reject(err); });
              return deferred.promise;
            },
            addEvaluator: function(settings) {
              return addEvaluator(settings, true);
            },
            removeEvaluator: function(plugin) {
              bkEvaluatorManager.removeEvaluator(plugin);
              evaluatorMenuItems = _.reject(evaluatorMenuItems, function(item) {
                return item.name == plugin;
              });
            },
            getEvaluatorMenuItems: function() {
              return evaluatorMenuItems;
            },
            getBkNotebookWidget: function() {
              return bkNotebookWidget;
            },
            toggleNotebookLocked: function() {
              return bkSessionManager.toggleNotebookLocked();
            },
            isNotebookLocked: function() {
              return bkSessionManager.isNotebookLocked();
            },
            // return the names of all enabled evaluators
            getEvaluators: function() {
              var evals = bkEvaluatorManager.getLoadedEvaluators();
              var ret = [];
              for (var key in evals) {
                if (evals.hasOwnProperty(key)) {
                  ret.push(key);
                }
              }
              return ret;
            },
            go2FirstErrorCodeCell: function () {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // get all code cells
              var cells = cellOp.getAllCodeCells();

              var go = function(id) {
                if (bkNotebookWidget && bkNotebookWidget.getFocusable(id)) {
                    bkNotebookWidget.getFocusable(id).scrollTo();
                }
              };

              if (cells === undefined || (!_.isArray(cells) && cells.length === 0)) {
                return null;
              }
              if (_.isArray(cells)) {
                var i;
                for (i = 0; i < cells.length; i++) {
                  var cell = cells[i];
                  if (cell.output.result && cell.output.result.innertype === "Error"){
                    go(cell.id);
                    break;
                  }
                }
              } else {
                if (cell.output.result && cells.output.result.innertype === "Error")
                  go(cells.id);
              }

            },
            // get (a subset of) code cells
            getCodeCells: function(filter) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // filter can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              if (!filter) {
                // get all code cells
                filter = cellOp.getAllCodeCells();
              } else if (typeof filter !== "string")
                return [];
              else if (cellOp.hasCell(filter)) {
                // this is a cellID
                if (cellOp.isContainer(filter)) {
                  // this is a section cell or root cell
                  // in this case toEval is going to be an array of cellModels
                  filter = cellOp.getAllCodeCells(filter);
                } else {
                  // single cell, just get the cell model from cellID
                  filter = cellOp.getCell(filter);
                }
              } else {
                // not a cellID
                if (filter === "initialization") {
                  // in this case toEval is going to be an array of cellModels
                  filter = bkSessionManager.notebookModelGetInitializationCells();
                } else if(cellOp.hasUserTag(filter)) {
                  // this is a user tag for a cell
                  // in this case toEval is going to be an array of cellModels
                  filter = cellOp.getCellsWithUserTag(filter);
                } else {
                  // assume it is a evaluator name,
                  // in this case toEval is going to be an array of cellModels
                  filter = cellOp.getCellsWithEvaluator(filter);
                }
              }
              if (filter === undefined || (!_.isArray(filter) && filter.length === 0)) {
                return [];
              }
              var ret = [];

              if (_.isArray(filter)) {
                var i;
                for ( i = 0 ; i < filter.length ; i++ ) {
                  var cell = filter[i];
                  var o = {};
                  o.cellId = cell.id;
                  o.evaluatorId = cell.evaluator;
                  o.code = cell.input.body;
                  o.tags = cell.tags;
                  if (cell.dataresult !== undefined) {
                    o.output = cell.dataresult;
                  } else if (cell.output !== undefined && cell.output.result !== undefined) {
                    if (cell.output.result.type !== undefined) {
                      if (cell.output.result.type === 'BeakerDisplay') {
                        o.output = cell.output.result.object;
                      } else {
                        o.outputtype = cell.output.result.type;
                        o.output = cell.output.result;
                      }
                    } else {
                      o.output = cell.output.result;
                    }
                  }
                  o.type = "BeakerCodeCell";
                  ret.push(o);
                }
              } else {
                var tmpCell = {};
                tmpCell.cellId = filter.id;
                tmpCell.evaluatorId = filter.evaluator;
                tmpCell.code = filter.input.body;
                if (filter.dataresult !== undefined) {
                  tmpCell.output = filter.dataresult;
                } else if (filter.output !== undefined && filter.output.result !== undefined) {
                  if (filter.output.result.type !== undefined) {
                    if (filter.output.result.type === 'BeakerDisplay') {
                      tmpCell.output = filter.output.result.object;
                    } else {
                      tmpCell.outputtype = filter.output.result.type;
                      tmpCell.output = filter.output.result;
                    }
                  } else {
                    tmpCell.output = filter.output.result;
                  }
                }
                tmpCell.tags = filter.tags;
                tmpCell.type = "BeakerCodeCell";
                ret.push(tmpCell);
              }
              return ret;
            },
            // set a code cell body
            setCodeCellBody: function(name, code) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              if (!cellOp.hasCell(name))
                return "Error: cell "+name+" does not exist";
              if (cellOp.isContainer(name))
                return "Error: cell "+name+" is not code cell";
              var cell  = cellOp.getCell(name);
              if ( cell.input === undefined || cell.input.body === undefined )
                return "Error: cell "+name+" is not code cell";
              cell.input.body = code;
              return "";
            },
            // set a code cell evaluator
            setCodeCellEvaluator: function(name, evaluator) {
              var evals = this.getEvaluators();
              if ( evals.indexOf(evaluator)==-1 )
                return "Error: evaluator "+evaluator+" does not exist";
              var cellOp = bkSessionManager.getNotebookCellOp();
              if (!cellOp.hasCell(name))
                return "Error: cell "+name+" does not exist";
              if (cellOp.isContainer(name))
                return "Error: cell "+name+" is not code cell";
              var cell  = cellOp.getCell(name);
              if ( cell.input === undefined || cell.input.body === undefined )
                return "Error: cell "+name+" is not code cell";
              cell.evaluator = evaluator;
              cellOp.rebuildMaps();
              return "";
            },
            // set a code cell tags
            setCodeCellTags: function(name, tags) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              if (!cellOp.hasCell(name))
                return "Error: cell "+name+" does not exist";
              if (cellOp.isContainer(name))
                return "Error: cell "+name+" is not code cell";
              var cell  = cellOp.getCell(name);
              cell.tags = tags;
              cellOp.rebuildMaps();
              return "";
            }
          };
        })();
        bkCoreManager.setBkAppImpl(_impl);

        var setDocumentTitle = function() {
          if ($scope.allowDocumentRenaming === 'false') { return; }

          var edited = $scope.isEdited(),
              filename = $scope.filename(),
              title;

          title = filename;
          if (edited) {
            title = '*' + title;
          }

          document.title = title;
          if (bkHelper.isElectron) {
            bkElectron.thisWindow.pageTitle = title;
          }
        };

        $scope.isEdited = function() {
          return bkSessionManager.isNotebookModelEdited();
        };
        $scope.$watch('isEdited()', function(edited, oldValue) {
          if (edited === oldValue) return;
          setDocumentTitle();
        });
        $scope.$watch('filename()', function(newVal, oldVal) {
          if (newVal === oldVal) return;
          setDocumentTitle();
        });

        var intervalID = null;
        var stopAutoBackup = function() {
          if (intervalID) {
            clearInterval(intervalID);
          }
          intervalID = null;
        };
        var startAutoBackup = function() {
          stopAutoBackup();
          intervalID = setInterval(bkSessionManager.backup, 60 * 1000);
        };
        $scope.getMenus = function() {
          return bkMenuPluginManager.getMenus();
        };
        if (bkUtils.isElectron) {
          window.addEventListener('focus', function() {
            bkElectron.updateMenus(bkMenuPluginManager.getMenus());
          });
        }
        var keydownHandler = function(e) {
          if (e.ctrlKey && !e.altKey && (e.which === 83)) { // Ctrl + s
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 83)) { // Cmd + s
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          } else if (e.target.nodeName !== "TEXTAREA") {
            if (e.ctrlKey && e.which === 90) { // Ctrl + z
              bkUtils.fcall(function() {
                bkSessionManager.undo();
              });
              return false;
            } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 90)) { // Cmd + z
              bkUtils.fcall(function() {
                bkSessionManager.undo();
              });
              return false;
            } else if (e.ctrlKey && e.which === 89) { // Ctrl + z
              bkUtils.fcall(function() {
                bkSessionManager.redo();
              });
              return false;
            } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 89)) { // Cmd + z
              bkUtils.fcall(function() {
                bkSessionManager.redo();
              });
              return false;
            // TODO implement global redo
            } else if (bkUtils.isElectron) {
              var ctrlXORCmd = (e.ctrlKey || e.metaKey) && !(e.ctrlKey && e.metaKey);
              // Command H
              if (ctrlXORCmd && e.which === 72) {
                bkElectron.minimize();
              }

              // Command W
              if (ctrlXORCmd && e.which === 87) {
                bkElectron.closeWindow();
              }

              if (e.which === 123) { // F12
                bkElectron.toggleDevTools();
              } else if (ctrlXORCmd && ((e.which === 187) || (e.which === 107))) { // Ctrl + '+'
                bkElectron.increaseZoom();
              } else if (ctrlXORCmd && ((e.which === 189) || (e.which === 109))) { // Ctrl + '-'
                bkElectron.decreaseZoom();
              } else if (ctrlXORCmd && ((e.which === 48) || (e.which === 13))) {
                bkElectron.resetZoom();
              }
              return false;
            }
          }
        };
        $(document).bind('keydown', keydownHandler);
        var onDestroy = function() {
          bkSessionManager.backup();
          stopAutoBackup();
          bkCoreManager.setBkAppImpl(null);
          $(document).unbind('keydown', keydownHandler);
          window.onbeforeunload = null;
          bkUtils.removeConnectedStatusListener();
        };

        $scope.$on("$destroy", onDestroy);
        window.onbeforeunload = function(e) {
          bkSessionManager.backup();
          if (bkSessionManager.isNotebookModelEdited()) {
            return "Your notebook has been edited but not saved, if you close the page your changes may be lost";
          }
          if (bkEvaluateJobManager.isAnyInProgress()) {
            return "Some cells are still running. Leaving the page now will cause cancelling and result be lost";
          }
          onDestroy();
        };
        window.onunload = function() {
          bkEvaluateJobManager.cancel();
        };
        startAutoBackup();
        $scope.gotoControlPanel = function(event) {
          if (bkUtils.isMiddleClick(event)) {
            window.open($location.absUrl() + '/beaker');
          } else {
            bkCoreManager.gotoControlPanel();
          }
        };

        $scope.renamingAllowed = function() {
          var uriType = bkSessionManager.getNotebookUriType();
          return !uriType || GLOBALS.FILE_LOCATION.FILESYS === uriType;
        };

        $scope.renameNotebook = function() {
          var saveFn = bkHelper.saveNotebookAs;
          var saveButtonTitle = "Save";
          var initUri = bkSessionManager.getNotebookPath();
          if (bkSessionManager.isSavable()) {
            saveFn = bkHelper.renameNotebookTo;
            saveButtonTitle = "Rename";
          } else {
            initUri = null;
          }
          bkHelper.showDefaultSavingFileChooser(initUri, saveButtonTitle).then(function(ret) {
            if (ret.uri) {
              return saveFn(ret.uri, ret.uriType);
            }
          });
        };

        $scope.getElectronMode = function() {
          return bkUtils.isElectron;
        };

        $scope.filename = function() {
          return bkSessionManager.getNotebookTitle();
        };

        $scope.pathname = function() {
          if ($scope.isEdited()) {
            return '*' + bkSessionManager.getNotebookPath();
          } else {
            return bkSessionManager.getNotebookPath();
          }
        };

        $scope.$on("$locationChangeStart", function(event, next, current) {
          if (bkEvaluateJobManager.isAnyInProgress() && next.indexOf("force=yes") === -1) {
            event.preventDefault();
            bkCoreManager.show2ButtonModal(
                "All running and pending cells will be cancelled.",
                "Warning!",
                function() {
                  bkEvaluateJobManager.cancelAll().then(function() {
                    bkSessionManager.backup().then(function() {
                      bkSessionManager.clear();
                      var routeParams = {force: "yes"};
                      var splits = decodeURIComponent(next.split("#")[1]).split("?");
                      var path = splits[0];
                      var search = splits[1];
                      if (search) {
                        var vars = search.split('&').forEach(function(v) {
                          var pair = v.split('=');
                          routeParams[pair[0]] = pair[1];
                        });
                      }
                      $location.path(path).search(routeParams);
                    });
                  });
                }
            );
          }
        });

        $scope.promptToSave = (function() {
          var prompted = false;
          return function() {
            if (prompted) { // prevent prompting multiple at the same time
              return;
            }
            prompted = true;
            bkCoreManager.show2ButtonModal(
                "Beaker server disconnected. Further edits will not be saved.<br>" +
                "Save current notebook as a file?",
                "Disconnected",
                function() {
                  // "Save", save the notebook as a file on the client side
                  bkSessionManager.dumpDisplayStatus();
                  var timeoutPromise = $timeout(function() {
                    bkUtils.saveAsClientFile(
                        bkSessionManager.getSaveData().notebookModelAsString,
                    "notebook.bkr");
                  }, 1);
                  timeoutPromise.then(function() {
                    prompted = false;
                  })
                },
                function() {
                  // "Not now", hijack all keypress events to prompt again
                  window.addEventListener('keypress', $scope.promptToSave, true);
                  prompted = false;
                },
                "Save", "Not now", "btn-primary", ""
            );
          };
        })();
        $rootScope.$on(GLOBALS.EVENTS.RECONNECT_FAILED, $scope.promptToSave);

        $scope.getOffineMessage = function() {
          return connectionManager.getStatusMessage();
        };
        $scope.isDisconnected = function() {
          return connectionManager.isDisconnected();
        };

        bkUtils.addConnectedStatusListener(function(msg) {
          if (msg.successful === $scope.isDisconnected()) {
            var disconnected = !msg.successful;
            if (disconnected) {
              connectionManager.onDisconnected();
            } else {
              connectionManager.onReconnected();
            }
            $scope.$digest();
          }
        });
        $scope.$watch('isDisconnected()', function(disconnected) {
          if (disconnected) {
            stopAutoBackup();
          } else {
            startAutoBackup();
          }
        });

        setDocumentTitle();

        // ensure an existing session is cleared so that the empty notebook model
        // makes the UI is blank immediately (instead of showing leftover from a previous session)
        bkSessionManager.clear();

        bkMenuPluginManager.clear();
        if (window.beaker === undefined || window.beaker.isEmbedded === undefined) {
          bkUtils.httpGet('../beaker/rest/util/getMenuPlugins')
          .success(function(menuUrls) {
            menuUrls.forEach(function(url) {
              bkMenuPluginManager.loadMenuPlugin(url);
            });
          });
        } else {
          var menues = window.beaker.getMenuItems();
          bkMenuPluginManager.attachMenus(menues);
        }
        bkCellMenuPluginManager.reset();
        bkEvaluateJobManager.reset();

        if ($scope.newSession === "new") {
          loadNotebook.defaultNotebook($scope.sessionId);
        } else if ($scope.newSession === "empty") {
          loadNotebook.emptyNotebook($scope.sessionId);
        } else if ($scope.isImport === 'true') {
          loadNotebook.fromImport($scope.sessionId);
        } else if ($scope.isOpen === 'true') {
          loadNotebook.openUri($scope.notebook, $scope.sessionId, true);
        } else {
          loadNotebook.fromSession($scope.sessionId);
        }
      }
    };
  });
})();
