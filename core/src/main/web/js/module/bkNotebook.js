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
 * M_bkNotebook
 * This is the 'notebook view' part of {@link bkApp}. What is the root cell holding the nested
 * {@link bkCell}s.
 */
(function() {
  'use strict';
  var bkNotebook = angular.module('M_bkNotebook', [
    'M_commonUI',
    'M_generalUtils',
    'M_bkShare',
    'M_bkCore',
    'M_bkNotebookEvaluators',
    'M_evaluatorManager',
    'M_bkCell',
    'M_cometd',
    'M_bkOutputLog'
  ]);
  /**
   * bkNotebook
   * - the controller that responsible for directly changing the view
   * - root cell + evaluators + other stuffs specific to one (the loaded) notebook
   * - root cell is just a special case of a section cell
   * - TODO, we are mixing the concept of a notebook and a root section here
   * we want to separate out the layout specific stuffs(idea of a section) from other
   * stuffs like evaluator panel
   */
  bkNotebook.directive('bkNotebook', function(
      generalUtils, cometd, bkShare, evaluatorManager, bkCellPluginManager,
      bkBaseSessionModel, bkCoreManager, bkOutputLog) {
    return {
      restrict: 'E',
      templateUrl: "./template/bkNotebook.html",
      scope: {},
      controller: function($scope) {
        var _impl = {
          _viewModel: {
            _hideEvaluators: true,
            _debugging: false,
            _showOutput: false,
            showEvaluators: function() {
              this._hideEvaluators = false;
            },
            toggleShowOutput: function() {
              this._showOutput = !this._showOutput;
            },
            hideOutput: function() {
              this._showOutput = false;
            },
            isShowingOutput: function() {
              return this._showOutput;
            },
            isHideEvaluators: function() {
              return this._hideEvaluators;
            },
            hideEvaluators: function() {
              this._hideEvaluators = true;
            },
            toggleDebugging: function() {
              this._debugging = !this._debugging;
            },
            isDebugging: function() {
              return this._debugging;
            }
          },
          getViewModel: function() {
            return this._viewModel;
          },
          shareAndOpenPublished: function() {
            // TODO, this is an ugly hack. Need refactoring.
            shareMenu.items[0].action();
          },
          deleteAllOutputCells: function() {

            // TODO - is this the right spot for this code???
            var cells = bkBaseSessionModel.getNotebookModel().cells;
            if (cells) {
              _.each(cells, function(cell) {
                if (cell.output) {
                  cell.output.result = undefined;
                }
              });
            }

          }
        };
        bkCoreManager.setBkNotebookImpl(_impl);

        $scope.isDebugging = function() {
          return _impl._viewModel.isDebugging();
        };
        $scope.isShowingOutput = function() {
          return _impl._viewModel.isShowingOutput();
        };


        $scope.showDebugTree = false;
        $scope.getNotebookModel = function() {
          return bkBaseSessionModel.getNotebookModel();
        };
        $scope.clearOutput = function() {
          $.ajax({type: "GET",
            datatype: "json",
            url: "/beaker/rest/outputlog/clear",
            data: {}});
          $scope.outputLog = [];
        };
        $scope.hideOutput = function() {
          _impl._viewModel.hideOutput();
        };
        var margin = $(".outputlogstdout").position().top;
        var outputLogHeight = 300;
        var dragHeight;
        var fixOutputLogPosition = function() {
          $(".outputlogcontainer").css("top", window.innerHeight - outputLogHeight);
          $(".outputlogcontainer").css("height", outputLogHeight);
          $(".outputlogbox").css("height", outputLogHeight - margin - 5);
          var width;
          if ($scope.showStdOut && $scope.showStdErr) {
            width = window.innerWidth / 2 - 20;
            $(".outputlogerr").css("float", "right");
            $(".outputlogerr").css("padding-left", "");
            $(".outputlogerr").css("padding-right", 10);
            $(".outputlogout").css("padding-left", 10);
            $(".outputlogout").css("padding-right", "");
          } else {
            width = window.innerWidth - 20;
            $(".outputlogerr").css("float", "left");
            $(".outputlogerr").css("padding-left", 10);
            $(".outputlogout").css("padding-left", 10);
          }
          $(".outputlogout").css("width", width);
          $(".outputlogerr").css("width", width);
        };
        $(window).resize(fixOutputLogPosition);
        $(".outputloghandle").drag("start", function() {
          dragHeight = outputLogHeight;
        });
        $(".outputloghandle").drag(function(ev, dd) {
          outputLogHeight = dragHeight - dd.deltaY;
          if (outputLogHeight < 20) outputLogHeight = 20;
          if (outputLogHeight > window.innerHeight - 50) outputLogHeight = window.innerHeight - 50;
          fixOutputLogPosition();
        });
        $scope.showStdOut = true;
        $scope.showStdErr = true;
        fixOutputLogPosition();

        $scope.toggleStdOut = function() {
          $scope.showStdOut = !$scope.showStdOut;
          fixOutputLogPosition();
        };
        $scope.toggleStdErr = function() {
          $scope.showStdErr = !$scope.showStdErr;
          fixOutputLogPosition();
        };
        bkOutputLog.getLog(function(res) {
          $scope.outputLog = res;
          $scope.$apply();
        });
        $.cometd.subscribe("/outputlog", function(reply) {
          if (!_impl._viewModel.isShowingOutput()) {
            _impl._viewModel.toggleShowOutput();
          }
          $scope.outputLog.push(reply.data);
          $scope.$apply();
          // Scroll to bottom so this output is visible.
          $.each($('.outputlogbox'),
              function(i, v) {
                $(v).scrollTop(v.scrollHeight);
              });
        });


        $scope.getChildren = function() {
          // this is the root
          return bkBaseSessionModel.cellOp.getChildren("root");
        };


        $scope.getShareMenuPlugin = function() {
          // the following cellType needs to match
          //plugin.cellType = "bkNotebook"; in dynamically loaded cellmenu/bkNotebook.js
          var cellType = "bkNotebook";
          return bkCellPluginManager.getPlugin(cellType);
        };
        $scope.getShareData = function() {
          return {
            notebookModel: bkBaseSessionModel.getNotebookModel(),
            evViewModel: evaluatorManager.getViewModel()
          };
        };
        var shareMenu = {
          name: "Share",
          items: []
        };
        $scope.$watch("getShareMenuPlugin()", function(getShareMenu) {
          if (getShareMenu) {
            shareMenu.items = getShareMenu($scope);
          }
        });
        $scope.isInitializationCell = function() {
          return bkBaseSessionModel.getNotebookModel().initializeAll;
        };
        $scope.menuItems = [
          {
            name: "Run all",
            action: function() {
              bkCoreManager.getBkApp().evaluate("root").
                  catch(function(data) {
                    console.error(data);
                  });
            }
          },
          {
            name: "Initialization Cell",
            isChecked: function() {
              return $scope.isInitializationCell();
            },
            action: function() {
              if ($scope.isInitializationCell()) {
                bkBaseSessionModel.getNotebookModel().initializeAll = undefined;
              } else {
                bkBaseSessionModel.getNotebookModel().initializeAll = true;
              }
              bkBaseSessionModel.cellOp.reset();
            }
          },
          shareMenu
        ];
      },
      link: function(scope, element, attrs) {
        var div = element.find(".bkcell").first();
        div.click(function(event) {
          //click in the border or padding should trigger menu
          if (generalUtils.eventOffsetX(div, event) >= div.width()) {
            var menu = div.find('.bkcellmenu').last();
            menu.css("top", event.clientY);
            menu.css("left", event.clientX - 150);
            menu.find('.dropdown-toggle').first().dropdown('toggle');
            event.stopPropagation();
          }
        });
        if (scope.isInitializationCell()) {
          div.addClass("initcell");
        } else {
          div.removeClass("initcell");
        }
        scope.$watch('isInitializationCell()', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue) {
              div.addClass("initcell");
            } else {
              div.removeClass("initcell");
            }
          }
        });
      }
    };
  });
})();
