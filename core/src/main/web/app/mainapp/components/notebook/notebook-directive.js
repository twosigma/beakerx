/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * bkNotebook
 * - the controller that responsible for directly changing the view
 * - root cell + evaluators + other stuffs specific to one (the loaded) notebook
 * - root cell is just a special case of a section cell
 * - TODO, we are mixing the concept of a notebook and a root section here
 * we want to separate out the layout specific stuffs(idea of a section) from other
 * stuffs like evaluator panel
 */

(function () {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkNotebook', function (
      bkUtils,
      bkEvaluatorManager,
      bkCellMenuPluginManager,
      bkSessionManager,
      bkCoreManager,
      bkOutputLog,
      bkElectron,
      bkMenuPluginManager) {
    var CELL_TYPE = 'notebook';
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/notebook'](),
      scope: {
        setBkNotebook: '&',
        isLoading: '='
      },
      controller: function ($scope, $rootScope, bkEvaluatorManager, bkDragAndDropHelper, GLOBALS) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var _impl = {
          _viewModel: {
            _debugging: false,
            _showOutput: false,
            _editMode: 'default',
            toggleShowOutput: function () {
              this._showOutput = !this._showOutput;
            },
            hideOutput: function () {
              this._showOutput = false;
            },
            isShowingOutput: function () {
              return this._showOutput;
            },
            isLocked: function() {
              return bkSessionManager.isNotebookLocked();
            },
            toggleAdvancedMode: function() {
              this._advancedMode = !this._advancedMode;
              $scope.$broadcast(GLOBALS.EVENTS.ADVANCED_MODE_TOGGLED)
            },
            isAdvancedMode: function() {
              return !!(this._advancedMode);
            },
            getEditMode: function() {
              return this._editMode;
            },
            setEditMode: function(mode) {
              bkHelper.setInputCellKeyMapMode(mode);
              this._editMode = mode;
            },
            // Add edit mode
            isHierarchyEnabled: function() {
              return !!(this._hierarchyEnabled);
            },
            toggleHierarchyEnabled: function() {
              this._hierarchyEnabled = !this._hierarchyEnabled;
            },
            toggleDebugging: function () {
              this._debugging = !this._debugging;
            },
            isDebugging: function () {
              return this._debugging;
            },
            getLodThreshold: function () {
              return this._lodThreshold;
            },
            setLodThreshold: function (lodThreshold) {
               this._lodThreshold = lodThreshold;
            }
          },
          refreshScope: function () {
            if(!($scope.$$phase || $scope.$root.$$phase)){
              $scope.$apply();
            }
          },
          getViewModel: function () {
            return this._viewModel;
          },
          deleteAllOutputCells: function () {
            bkSessionManager.getNotebookCellOp().deleteAllOutputCells();
          },
          _focusables: {}, // map of focusable(e.g. code mirror instances) with cell id being keys
          registerFocusable: function (cellId, focusable) {
            this._focusables[cellId] = focusable;
          },
          unregisterFocusable: function (cellId) {
            delete this._focusables[cellId];
            this._focusables[cellId] = null;
          },
          getNotebookNewCellFactory: function () {
            return bkSessionManager.getNotebookNewCellFactory();
          },
          getFocusable: function (cellId) {
            return this._focusables[cellId];
          },
          _codeMirrors: {},
          registerCM: function (cellId, cm) {
            this._codeMirrors[cellId] = cm;
            cm.setOption('keyMap', this._cmKeyMapMode);
            cm.setOption('vimMode', this._cmKeyMapMode == 'vim');
          },
          getCM: function (cellId) {
            return this._codeMirrors[cellId];
          },
          unregisterCM: function (cellId) {
            this._codeMirrors[cellId] = null;
            delete this._codeMirrors[cellId];
          },
          _cmKeyMapMode: 'default',
          setCMKeyMapMode: function (keyMapMode) {
            this._cmKeyMapMode = keyMapMode;
            _.each(this._codeMirrors, function (cm) {
              cm.setOption('keyMap', keyMapMode);
              cm.setOption('vimMode', keyMapMode == 'vim');
            });
          },
          getCMKeyMapMode: function () {
            return this._cmKeyMapMode;
          },
          setCMTheme: function (theme) {
            _.each(this._codeMirrors, function (cm) {
              cm.setOption("theme", theme);
            });
          }
        };
        $scope.setBkNotebook({bkNotebook: _impl});

        $scope.getFullIndex = function() { return '1' }

        $scope.isLocked = function() {
          return _impl._viewModel.isLocked();
        }

        $scope.isDebugging = function () {
          return _impl._viewModel.isDebugging();
        };
        $scope.isShowingOutput = function () {
          return _impl._viewModel.isShowingOutput();
        };

        $scope.showDebugTree = false;
        $scope.getNotebookModel = function () {
          return bkSessionManager.getRawNotebookModel();
        };
        $scope.clearOutput = function () {
          $.ajax({
            type: 'GET',
            datatype: 'json',
            url: bkUtils.serverUrl('beaker/rest/outputlog/clear'),
            data: {}});
          $scope.outputLog = [];
        };
        $scope.hideOutput = function () {
          _impl._viewModel.hideOutput();
          if (bkUtils.isElectron){
            bkElectron.updateMenus(bkMenuPluginManager.getMenus());
          }
        };

        $scope.isAdvancedMode = function () {
          return _impl._viewModel.isAdvancedMode();
        };

        $scope.isHierarchyEnabled = function () {
          return _impl._viewModel.isHierarchyEnabled();
        };

        $scope.showStdOut = true;
        $scope.showStdErr = true;

        $scope.toggleStdOut = function ($event) {
          if ($event) $event.stopPropagation();

          $scope.showStdOut = !$scope.showStdOut;
        };

        $scope.toggleStdErr = function ($event) {
          if ($event) $event.stopPropagation();

          $scope.showStdErr = !$scope.showStdErr;
        };

        bkOutputLog.getLog(function (res) {
          $scope.outputLog = res;
        });

        bkOutputLog.subscribe(function (reply) {
          if (!_impl._viewModel.isShowingOutput()) {
            _impl._viewModel.toggleShowOutput();
          }
          $scope.outputLog.push(reply.data);
          $scope.$apply();
          // Scroll to bottom so this output is visible.
          $.each($('.outputlogbox'),
                 function (i, v) {
                   $(v).scrollTop(v.scrollHeight);
                 });
        });
        var margin = $('.outputlogstdout').position().top;
        var outputLogHeight = 300;
        var dragHeight;
        var fixOutputLogPosition = function () {
          $('.outputlogcontainer').css('top', window.innerHeight - outputLogHeight);
          $('.outputlogcontainer').css('height', outputLogHeight);
          $('.outputlogbox').css('height', outputLogHeight - margin - 5);
        };
        $scope.unregisters = [];
        $(window).resize(fixOutputLogPosition);
        $scope.unregisters.push(function() {
          $(window).off('resize', fixOutputLogPosition);
        });
        var dragStartHandler = function () {
          dragHeight = outputLogHeight;
        };
        var outputloghandle = $('.outputloghandle');
        outputloghandle.drag('start', dragStartHandler);
        $scope.unregisters.push(function() {
          outputloghandle.off('dragstart', dragStartHandler);
        });
        var dragHandler = function (ev, dd) {
          outputLogHeight = dragHeight - dd.deltaY;
          if (outputLogHeight < 20) {
            outputLogHeight = 20;
          }
          if (outputLogHeight > window.innerHeight - 80) {
            outputLogHeight = window.innerHeight - 80;
          }
          fixOutputLogPosition();
        };
        outputloghandle.drag(dragHandler);
        $scope.unregisters.push(function() {
          outputloghandle.off('drag', dragHandler);
        });

        $scope.getChildren = function () {
          // this is the root
          return notebookCellOp.getChildren('root');
        };

        $scope.isEmpty = function() {
          return $scope.getChildren().length == 0;
        };

        $scope.$watch(function() {
          return document.body.clientHeight;
        }, function(v, prev) {
          if (v !== prev) {
            $scope.$evalAsync(Scrollin.checkForVisibleElements);
          }
        });

        $scope.defaultEvaluatorLoaded = function() {
          if (_.isEmpty(bkEvaluatorManager.getLoadedEvaluators()) || _.chain(bkEvaluatorManager.getLoadingEvaluators()).pluck("name").contains(GLOBALS.DEFAULT_EVALUATOR).value()) {
            return false;
          }
          return true;
        };

        bkUtils.getBeakerPreference('advanced-mode').then(function(isAdvanced) {
          if (_impl._viewModel.isAdvancedMode() != (isAdvanced === 'true')) {
            _impl._viewModel.toggleAdvancedMode();
          }
        });

        bkUtils.getBeakerPreference('edit-mode').then(function(editMode) {
          if (editMode !== '')
            _impl._viewModel.setEditMode(editMode);
        });

        bkUtils.getBeakerPreference('lod-threshold').then(function (lodThreshold) {
          _impl._viewModel.setLodThreshold(lodThreshold);
        });

        $scope.unregisters.push($rootScope.$on(GLOBALS.EVENTS.FILE_DROPPED, function (e, data) {
          if (bkDragAndDropHelper.isImageFile(data.file)) {
            bkDragAndDropHelper.loadImageFileAsString(data.file).then(function (imageTag) {
              var markdownCell = bkSessionManager.getNotebookNewCellFactory().newMarkdownCell();
              markdownCell.body = imageTag;
              var notebookCellOp = bkSessionManager.getNotebookCellOp();
              var cells = notebookCellOp.getCells();
              if (cells.length === 0) {
                notebookCellOp.insertFirst(markdownCell, true);
              } else {
                notebookCellOp.insertAfter(cells[cells.length - 1].id, markdownCell, true);
              }
            });
          }
        }));
      },
      link: function (scope, element, attrs) {
        scope.getNotebookElement = function() {
          return element;
        };
        scope.$on('$destroy', function() {
          scope.setBkNotebook({bkNotebook: undefined});
          bkOutputLog.unsubscribe();
          _.each(scope.unregisters, function(unregister) {
            unregister();
          });
        });
      }
    };
  });
})();
