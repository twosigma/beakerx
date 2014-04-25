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
    'M_bkUtils',
    'M_commonUI',
    'M_bkCore',
    'M_bkSession',
    'M_bkSessionManager',
    'M_bkMenuPluginManager',
    'M_bkCellPluginManager',
    'M_bkNotebookVersionManager',
    'M_bkEvaluatorManager',
    'M_bkNotebook'
  ]);

  /**
   * bkApp
   * - This is the beaker App
   * - menus + plugins + notebook(notebook model + evaluator)
   */
  module.directive('bkApp', function(
      $routeParams,
      bkUtils,
      bkCoreManager,
      bkSession,
      bkSessionManager,
      bkMenuPluginManager,
      bkCellPluginManager,
      bkNotebookVersionManager,
      bkEvaluatorManager,
      bkAppEvaluate) {
    return {
      restrict: 'E',
      templateUrl: "./template/bkApp.html",
      scope: {},
      controller: function($scope) {
        var showStatusMessage = function(message) {
          $scope.message = message;
        };
        var showTransientStatusMessage = function(message) {
          showStatusMessage(message);
          bkUtils.delay(500).then(function() {
            showStatusMessage("");
          });
        };
        var evaluatorMenuItems = [];

        var addEvaluator = function(settings, alwaysCreateNewEvaluator) {
          // set shell id to null, so it won't try to find an existing shell with the id
          if (alwaysCreateNewEvaluator) {
            settings.shellID = null;
          }

          bkEvaluatorManager.newEvaluator(settings)
              .then(function(evaluator) {
                if (!_.isEmpty(evaluator.spec)) {
                  var actionItems = [];
                  _(evaluator.spec).each(function(value, key) {
                    if (value.type === "action") {
                      actionItems.push({
                        name: value.name ? value.name : value.action,
                        action: function() {
                          evaluator.perform(key);
                        }
                      });
                    }
                  });
                  evaluatorMenuItems.push({
                    name: evaluator.pluginName,//TODO, this should be evaluator.settings.name
                    items: actionItems
                  });
                }
              });
        };

        var loadNotebook = (function() {
          var addScrollingHack = function() {
            // TODO, the following is a hack to address the issue that
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
          };
          var loadNotebookModelAndResetSession = function(
              notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId) {
            $scope.loading = true;
            addScrollingHack();
            bkSessionManager.reset(
                notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId);
            var isOpeningExistingSession = !!sessionId;
            evaluatorMenuItems.splice(0, evaluatorMenuItems.length);
            if (notebookModel && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                addEvaluator(notebookModel.evaluators[i], !isOpeningExistingSession);
              }
            }
            document.title = bkSessionManager.getNotebookTitle();
            bkHelper.evaluate("initialization");
            $scope.loading = false;
          };
          return {
            openUri: function(notebookUri, uriType, readOnly, format, retry, retryCountMax) {
              if (!notebookUri) {
                alert("Failed to open notebook, notebookUri is empty");
                return;
              }
              $scope.loading = true;
              if (retryCountMax === undefined) {
                retryCountMax = 100;
              }
              if (!uriType) {
                uriType = bkCoreManager.guessUriType(notebookUri);
              }
              readOnly = !!readOnly;
              if (!format) {
                format = bkCoreManager.guessFormat(notebookUri);
              }

              var importer = bkCoreManager.getNotebookImporter(format);
              if (!importer) {
                if (retry) {
                  // retry, sometimes the importer came from a plugin that is being loaded
                  retryCountMax -= 1;
                  setTimeout(function() {
                    loadNotebook.openUri(notebookUri, uriType, readOnly, format, retry, retryCountMax);
                  }, 100);
                } else {
                  alert("Failed to open " + notebookUri
                      + " because format " + format
                      + " was not recognized.");
                }
              }
              var fileLoader = bkCoreManager.getFileLoader(uriType);
              fileLoader.load(notebookUri).then(function(fileContentAsString) {
                var notebookModel = importer.import(fileContentAsString);
                notebookModel = bkNotebookVersionManager.open(notebookModel);
                loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel);
              }).catch(function(data, status, headers, config) {
                bkHelper.showErrorModal(data);
              }).finally(function() {
                $scope.loading = false;
              });
            },
          fromSession: function(sessionId) {
            bkSession.load(sessionId).then(function(session) {
              var notebookUri = session.notebookUri;
              var uriType = session.uriType;
              var readOnly = session.readOnly;
              var format = session.format;
              var notebookModel = angular.fromJson(session.notebookModelJson);
              var edited = session.edited;
              loadNotebookModelAndResetSession(
                  notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId);
            });
          },
          defaultNotebook: function() {
            bkUtils.getDefaultNotebook().then(function(notebookModel) {
              var notebookUri = null;
              var uriType = null;
              var readOnly = true;
              var format = null;
              loadNotebookModelAndResetSession(
                  notebookUri, uriType, readOnly, format, notebookModel);
            });
          }
        };
        })();

        var bkNotebookWidget;
        $scope.setBkNotebook = function(bkNotebook) {
          bkNotebookWidget = bkNotebook;
        };

        var _impl = (function() {
          var _saveNotebook = function() {
            showStatusMessage("Saving");
            var deferred = bkUtils.newDeferred();
            var saveData = bkSessionManager.getSaveData();
            var fileSaver = bkCoreManager.getFileSaver(saveData.uriType);
            fileSaver.save(saveData.notebookUri, saveData.notebookModelAsString).then(
                function () {
                  bkSessionManager.setNotebookModelEdited(false);
                  showTransientStatusMessage("Saved");
                  deferred.resolve(arguments);
                },
                function (msg) {
                  showTransientStatusMessage("Cancelled");
                  deferred.reject();
                });
            return deferred.promise;
          };
          return {
            name: "bkNotebookApp",
            getSessionId: function() {
              return bkSessionManager.getSessionId();
            },
            saveNotebook: function() {
              var self = this;
              if (bkSessionManager.isSavable()) {
                return _saveNotebook();
              } else {
                // pop up the file chooser and then proceed as save-as
                return bkCoreManager.showDefaultSavingFileChooser().then(function(ret) {
                  return self.saveNotebookAs(ret.uri, ret.uriType);
                });
              }
            },
            saveNotebookAs: function(notebookUri, uriType) {
              bkSessionManager.updateNotebookUri(notebookUri, uriType, false);
              document.title = bkSessionManager.getNotebookTitle();
              return _saveNotebook();
            },

            closeNotebook: function() {
              var self = this;
              var closeSession = function() {
                bkSessionManager.close().then(function() {
                  bkCoreManager.gotoControlPanel();
                });
              };
              if (bkSessionManager.isNotebookModelEdited() === false) {
                closeSession();
              } else {
                var notebookTitle = bkSessionManager.getNotebookTitle();
                bkHelper.showYesNoCancelModal(
                    "Do you want to save " + notebookTitle + "?",
                    "Confirm close",
                    function() {
                      self.saveNotebook().then(closeSession);
                    },
                    function() {
                      console.log("close without saving");
                      closeSession();
                    },
                    null, "Save", "Don't save"
                );
              }
            },
            evaluate: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
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
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
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
            },
            addEvaluator: function(settings) {
              addEvaluator(settings, true);
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
            }
          };
        })();
        bkCoreManager.setBkAppImpl(_impl);

        $scope.isEdited = function() {
          return bkSessionManager.isNotebookModelEdited();
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
        var keydownHandler = function(e) {
          if (e.ctrlKey && (e.which === 83)) {
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          }
        };
        $(document).bind('keydown', keydownHandler);
        var onDestroy = function() {
          bkSessionManager.backup();
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
          if (bkUtils.isMiddleClick(event)) {
            window.open("./");
          } else {
            bkSessionManager.backup().then(function() {
              bkCoreManager.gotoControlPanel();
            });
          }
        };

        bkUtils.addConnectedStatusListener(function(msg) {
          if (msg.successful !== !$scope.disconnected) {
            $scope.disconnected = !msg.successful;
          }
        });
        $scope.$watch('disconnected', function(disconnected) {
          if (disconnected) {
            stopAutoBackup();
          } else {
            startAutoBackup();
          }
        });

        showStatusMessage("");
        $scope.loading = true;

        // ensure an existing session is cleared so that the empty notebook model
        // makes the UI is blank immediately (instead of showing leftover from a previous session)
        bkSessionManager.clear();

        bkMenuPluginManager.clear();
        bkUtils.httpGet('/beaker/rest/util/getMenuPlugins')
            .success(function(menuUrls) {
              menuUrls.forEach(function(url) {
                bkMenuPluginManager.loadMenuPlugin(url);
              });
            });
        bkCellPluginManager.reset();

        var sessionID = $routeParams.sessionID;
        if (sessionID) {
          if (sessionID === "new") {
            loadNotebook.defaultNotebook();
          } else if (sessionID === "none") {
            // do nothing
          } else {
            loadNotebook.fromSession(sessionID);
          }
        } else { // open
          var notebookUri = $routeParams.uri;
          var uriType = $routeParams.type;
          var readOnly = $routeParams.readOnly;
          var format = $routeParams.format;
          var retry = true;
          loadNotebook.openUri(notebookUri, uriType, readOnly, format, retry);
        }
      }
    };
  });

  module.factory('bkAppEvaluate', function(bkUtils, bkEvaluatorManager) {
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
        var evaluator = bkEvaluatorManager.getEvaluator(cell.evaluator);
        if (evaluator) {
          var evalP = lastPromise.then(function() {
            _theEvaluator = evaluator;
            bkUtils.log("evaluate", {
              plugin: evaluator.pluginName,
              length: cell.input.body.length});
            return _theEvaluator.evaluate(cell.input.body, cell.output);
          });
          evalP.catch(function(ret) {
            if (ret === "cancelled by user") {
              _promise = bkUtils.newPromise();
            }
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
