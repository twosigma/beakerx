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
 * M_bkApp
 * This is the main module for the beaker notebook application. The module has a directive that
 * holds the menu bar as well as the notebook view.
 * The module also owns the centralized cell evaluation logic.
 */
(function() {
  'use strict';
  var module = angular.module('M_bkApp', [
    'ngRoute',
    'ui.bootstrap',
    'M_angularUtils',
    'M_bkUtils',
    'M_cometd',
    'M_commonUI',
    'M_TreeView',
    'M_bkCore',
    'M_bkSession',
    'M_bkNotebook',
    'M_evaluatorManager',
    'M_menuPlugin',
    'M_bkCellPluginManager',
    'M_bkNotebookVersionManager'
  ]);

  /**
   * bkApp
   * - This is the beaker App
   * - menus + plugins + notebook(notebook model + evaluator)
   */
  module.directive('bkApp', function(
      $routeParams,
      $location,
      $q,
      $http,
      cometd,
      bkUtils,
      bkSession,
      evaluatorManager,
      menuPluginManager,
      bkCellPluginManager,
      bkBaseSessionModel,
      bkCoreManager,
      bkAppEvaluate,
      bkNotebookVersionManager) {
    return {
      restrict: 'E',
      templateUrl: "./template/bkApp.html",
      scope: {},
      controller: function($scope) {
        var _impl = (function() {
          var showTransientMessage = function(message) {
            $scope.message = message;
            bkUtils.delay(500).then(function() {
              $scope.message = "";
            });
          };
          var defaultSaveFunc = function(notebookModel) {
            // by default pop up the file chooser for saving as 'file'
            var deferred = $q.defer();
            var saveAsFile = function(path) {
              if (!path) {
                deferred.reject("file save cancelled");
              } else {
                var saveFunc = bkCoreManager.getSaveFunc("file");
                saveFunc(path, notebookModel).then(function() {
                  bkHelper.setSaveFunction(function(notebookModel) {
                    return saveFunc(path, notebookModel);
                  });
                  document.title = path.replace(/^.*[\\\/]/, '');
                  deferred.resolve();
                });
              }
            };
            bkCoreManager.httpGet("/beaker/rest/file-io/getHomeDirectory").success(function(homeDir) {
              var fileChooserStrategy = { result: "" };
              fileChooserStrategy.close = function(ev, closeFunc) {
                if (ev.which === 13) {
                  closeFunc(this.result);
                }
              };
              fileChooserStrategy.treeViewfs = {
                getChildren: function(path, callback) {
                  var self = this;
                  this.showSpinner = true;
                  $http({
                    method: 'GET',
                    url: "/beaker/rest/file-io/getDecoratedChildren",
                    params: { path: path }
                  }).success(function(list) {
                        self.showSpinner = false;
                        callback(list);
                      }).error(function() {
                        self.showSpinner = false;
                        console.log("Error loading children");
                      });
                },
                open: function(path) {
                  fileChooserStrategy.result = path;
                },
                showSpinner: false
              };
              bkCoreManager.showFileChooser(
                  saveAsFile,
                  '<div class="modal-header">' +
                      '  <h1>Save <span ng-show="getStrategy().treeViewfs.showSpinner">' +
                      '  <i class="fa fa-refresh fa-spin"></i></span></h1>' +
                      '</div>' +
                      '<div class="modal-body">' +
                      '  <tree-view rooturi="/" fs="getStrategy().treeViewfs"></tree-view>' +
                      '  <tree-view rooturi="' + homeDir + '" fs="getStrategy().treeViewfs">' +
                      '  </tree-view>' +
                      '</div>' +
                      '<div class="modal-footer">' +
                      '  <p><input id="saveAsFileInput"' +
                      '            class="input-xxlarge"' +
                      '            ng-model="getStrategy().result"' +
                      '            ng-keypress="getStrategy().close($event, close)"' +
                      '            focus-start /></p>' +
                      '  <button ng-click="close()" class="btn">Cancel</button>' +
                      '  <button ng-click="close(getStrategy().result)" class="btn btn-primary">' +
                      '      Save' +
                      '  </button>' +
                      '</div>',
                  fileChooserStrategy);
            });
            return deferred.promise;
          };
          var _saveFunc = defaultSaveFunc;
          var _pathOpeners = {};

          return {
            loadNotebook: function(
                notebookModel,
                alwaysCreateNewEvaluators,
                notebookUri,
                sessionID) {
              if (angular.isString(notebookModel)) {
                try {
                  notebookModel = angular.fromJson(notebookModel);
                  // TODO, to be removed. Addressing loading a corrupted notebook.
                  if (angular.isString(notebookModel)) {
                    notebookModel = angular.fromJson(notebookModel);
                    bkCoreManager.log("corrupted-notebook", { notebookUri: notebookUri });
                  }
                } catch (e) {
                  console.error(e);
                  console.error("This is not a valid Beaker notebook JSON");
                  console.error(notebookModel);
                  window.alert("Not a valid Beaker notebook");
                  return;
                }
              }

              // Backup current session if it's not empty.
              if (bkBaseSessionModel.getSessionID() &&
                  !_.isEmpty(bkBaseSessionModel.getNotebookModel())) {
                bkSession.backupSession(bkBaseSessionModel.getSessionData());
              }

              evaluatorManager.reset();
              if (!sessionID) {
                sessionID = bkUtils.generateID(6);
              }
              bkBaseSessionModel.setSessionID(sessionID);
              notebookModel = bkNotebookVersionManager.open(notebookModel);
              if (notebookModel && notebookModel.evaluators) {
                for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                  evaluatorManager.newEvaluator(notebookModel.evaluators[i],
                      alwaysCreateNewEvaluators);
                }
              }
              bkBaseSessionModel.setNotebookModel(notebookModel);
              bkBaseSessionModel.setNotebookUrl(notebookUri);
              bkCoreManager.recordRecentDocument(notebookUri);
              $scope.loading = false;

              // TODO, the following is a hacky solution to address the issue that
              // somehow the notebook is scrolled to the middle
              // this hack listens to the 'scroll' event and scrolls it to the top
              // A better solution is to do this when Angular stops firing and DOM updates finish.
              // A even better solution would be to get rid of the unwanted scrolling in the first place.
              // A even even better solution is the session actually remembers where the scrolling was
              // and scroll to there and in the case of starting a new session (i.e. loading a notebook from file)
              // scroll to top.
              var listener = function(ev) {
                window.scrollTo(0, 0);
                window.removeEventListener('scroll', listener, false);
              };
              window.addEventListener('scroll', listener, false);
            },
            closeNotebook: function() {
              var self = this;
              var sessionID = bkBaseSessionModel.getSessionID();
              var closeSession = function() {
                bkSession.closeSession(sessionID).then(function() {
                  evaluatorManager.exitAllEvaluators();
                  bkBaseSessionModel.clearSession();
                  self.setSaveFunction(defaultSaveFunc);
                  $location.path("/control");
                  bkCoreManager.refreshRootScope();
                });
              };
              if (bkBaseSessionModel.isEdited() === false) {
                closeSession();
              } else {
                var notebookUri = bkBaseSessionModel.getSessionData().notebookurl;
                var notebookName =
                    notebookUri ? notebookUri.replace(/^.*[\\\/]/, '') : "[New Notebook]";
                bkHelper.showYesNoCancelModal(
                    "Do you want to save " + notebookName + "?",
                    "Confirm close",
                    function() {
                      self.saveNotebook().then(closeSession);
                    },
                    function() {
                      console.log("close without saving");
                      closeSession();
                    },
                    null,
                    "Save",
                    "Don't save"
                );
              }
            },
            // Save
            setSaveFunction: function(saveFunc) {
              _saveFunc = saveFunc;
            },
            getSaveFunction: function() {
              return _saveFunc ? _saveFunc : defaultSaveFunc;
            },
            saveNotebook: function() {
              var deferred = $q.defer();
              $scope.message = "Saving";
              var saveFunc = this.getSaveFunction();
              var notebookModel = bkBaseSessionModel.getNotebookModel();
              saveFunc(notebookModel).then(
                  function() {
                    bkBaseSessionModel.setEdited(false);
                    showTransientMessage("Saved");
                    deferred.resolve(arguments);
                  },
                  function(msg) {
                    showTransientMessage("Cancelled");
                    deferred.reject();
                  });
              return deferred.promise;
            },
            // Open
            setPathOpener: function(pathType, opener) {
              _pathOpeners[pathType] = opener;
            },
            openPath: function(path, pathType, retry, timeout) {
              if (!path) {
                return;
              }
              $scope.loading = true;
              if (timeout === undefined) {
                timeout = 100;
              }
              var self = this;
              // XXX BEAKER-516 pathtype should be saved
              // explicitly so we don't have to deduce them.
              if (!pathType) {
                pathType = path.substring(0, path.indexOf(':/')) || "file";
              }
              if (/^https?/.exec(pathType)) { // TODO, this is a temp hack
                pathType = "file";
              }
              if (_pathOpeners[pathType]) {
                _pathOpeners[pathType].open(path);
              } else {
                if (retry) {
                  setTimeout(function() {
                    self.openPath(path, pathType, retry, timeout - 1);
                  }, 100);
                } else {
                  alert("Failed to open " + path
                      + " because path type " + pathType
                      + " was not recognized.");
                }
              }
            },
            evaluate: function(toEval) {
              var cellOp = bkBaseSessionModel.cellOp;
              // toEval can be a tagName (string), which is for now either "initialization" or the
              // name of an evaluator, user defined tags is not supported yet.
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
                    toEval = bkBaseSessionModel.getInitializationCells(toEval);
                  } else {
                    console.log(toEval);
                    // assume it is a evaluator name,
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithEvaluator(toEval);
                  }
                  // TODO, we want to support user tagging cell in the future
                }
              }
              if (!_.isArray(toEval)) {
                return bkAppEvaluate.evaluate(toEval);
              } else {
                return bkAppEvaluate.evaluateAll(toEval);
              }
            },
            evaluateCode: function(evaluator, code) {
              // TODO, this isn't able to give back the evaluate result right now.
              return bkAppEvaluate.evaluate({
                evaluator: evaluator,
                input: { body: code },
                output: {}
              });
            }
          };
        })();
        $scope.isEdited = function() {
          return bkBaseSessionModel.isEdited();
        };
        $scope.$watch('isEdited()', function(edited, oldValue) {
          if (edited) {
            if (document.title[0] !== '*') {
              document.title = "*" + document.title;
            }
          } else {
            if (document.title[0] === '*') {
              document.title = document.title.substring(1, document.title.length - 1);
            }
          }
        });

        bkCoreManager.setBkAppImpl(_impl);
        var intervalID = null;
        var stopAutoBackup = function() {
          if (intervalID) {
            clearInterval(intervalID);
          }
          intervalID = null;
        };
        var startAutoBackup = function() {
          stopAutoBackup();
          intervalID = setInterval(function() {
            bkSession.backupSession(bkBaseSessionModel.getSessionData());
          }, 60 * 1000);
        };
        $scope.getMenus = function() {
          return menuPluginManager.getMenus();
        };
        var keydownHandler = function(e) {
          if (e.ctrlKey && (e.which === 83)) {
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          }
        };
        $(document).bind('keydown', keydownHandler);
        var onDestroy = function() {
          bkSession.backupSession(bkBaseSessionModel.getSessionData());
          stopAutoBackup();
          bkCoreManager.setBkAppImpl(null);
          $(document).unbind('keydown', keydownHandler);
        };
        // TODO, when use setLocation and leave from bkApp (e.g. to control panel),
        // we should warn and cancel evals
        /*var onLeave = function() {
         if (bkAppEvaluate.isAnyInProgress()) {
         bkHelper.showOkCancelModal(
         "All in-progress and pending eval will be cancelled.",
         "Warning!",
         function() {
         bkAppEvaluate.cancel();
         }
         );
         }
         };*/
        $scope.$on("$destroy", onDestroy);
        window.onbeforeunload = function(e) {
          // TODO, we should warn users, but I can't find a way to properly perform cancel after
          // warning
          bkAppEvaluate.cancel();

          onDestroy();

//        if (bkAppEvaluate.isAnyInProgress()) {
//          return "Are you sure? All in-progress and pending evaluation will be cancelled";
//        }
        };
        startAutoBackup();
        $scope.gotoControlPanel = function(event) {
          if (bkCoreManager.isMiddleClick(event)) {
            bkSession.backupSession(bkBaseSessionModel.getSessionData());
            window.open("./");
          } else {
            bkCoreManager.gotoControlPanel();
          }
        };


        cometd.addStatusListener(function(msg) {
          if (msg.successful !== !$scope.disconnected) {
            $scope.disconnected = !msg.successful;
            $scope.$apply();
          }
        });
        $scope.message = "";

        menuPluginManager.reset();
        bkCellPluginManager.reset();

        $scope.loading = true;
        // set the notebook model to empty so the UI is blank instead of leftover from the
        // previous model
        bkBaseSessionModel.setNotebookModel({});
        bkBaseSessionModel.setEdited(false);
        var sessionID = $routeParams.sessionID;
        if (sessionID) {
          if (sessionID === "new") {
            bkCoreManager.getDefaultNotebook().then(function(notebookJSON) {
              _impl.loadNotebook(notebookJSON, true);
              document.title = "New Notebook";
            });
          } else if (sessionID === "none") {
            // do nothing
          } else {
            bkSession.loadSession(sessionID).then(function(ret) {
              var notebookJson = ret.content;
              var notebookUri = ret.notebookurl;
              var notebookUriType = notebookUri ? notebookUri.substring(0, notebookUri.indexOf(':/')) || "file" : "file";
              _impl.loadNotebook(notebookJson, false, notebookUri, sessionID);
              _impl.setSaveFunction(function(notebookModel) {
                var saveFunc = bkCoreManager.getSaveFunc(notebookUriType);
                return saveFunc(notebookUri, notebookModel);
              });
              if (!notebookUri) {
                document.title = "New Notebook";
              } else {
                document.title = notebookUri.replace(/^.*[\\\/]/, '');
              }
              bkBaseSessionModel.setEdited(ret.edited);
            });
          }
        } else {
          var pathType = "";
          var path = $routeParams.uri;
          _impl.openPath(path, undefined, true);
        }
      }
    };
  });

  module.factory('bkAppEvaluate', function(bkUtils, evaluatorManager) {

    var setOutputCellText = function(cell, text) {
      if (!cell.output) {
        cell.output = {};
      }
      cell.output.result = text;
    };
    var _promise = bkUtils.newPromise();
    var _theEvaluator = null;
    var _evaluate = function(cell) {
      if (!cell.evaluator) {
        return;
      }
      var lastPromise = _promise;
      setOutputCellText(cell, "pending");
      var evaluateCell = function() {
        var evaluator = evaluatorManager.getEvaluator(cell.evaluator);
        if (evaluator) {
          var evalP = lastPromise.then(function() {
            _theEvaluator = evaluator.evaluator;
            bkUtils.log("evaluate", {
              plugin: evaluator.evaluator.pluginName,
              length: cell.input.body.length});
            return _theEvaluator.evaluate(cell.input.body, cell.output);
          });
          evalP.catch(function(ret) {
            if (cell.output && cell.output.result === "pending") {
              cell.output.result = "";
            }
          });
          evalP.finally(function() {
            _theEvaluator = null;
          });
          return evalP;
        } else {
          setOutputCellText(cell, "waiting for evaluator initialization ...");
          return bkUtils.delay(500).then(function() {
            return evaluateCell();
          });
        }
      };
      _promise = evaluateCell();
      return _promise;
    };

    return {
      evaluate: function(cell) {
        return _evaluate(cell);
      },
      evaluateAll: function(cells) {
        _(cells).each(_evaluate);
        return _promise;
      },
      isCancellable: function() {
        return !!(_theEvaluator && _theEvaluator.cancelExecution);
      },
      cancel: function() {
        if (_theEvaluator) {
          if (_theEvaluator.cancelExecution) {
            _theEvaluator.cancelExecution();
            _promise = bkUtils.newPromise();
          } else {
            throw "cancel is not supported for the current evaluator";
          }
        }
      },
      isAnyInProgress: function() {
        //return _promise.isPending();
        return !!_theEvaluator;
      }
    };
  });
})();
