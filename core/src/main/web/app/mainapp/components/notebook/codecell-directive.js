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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('ngHideEx', function($animate) {
    return {
      scope: {
        'ngHideEx': '=',
        'afterShow': '&',
        'afterHide': '&'
      },
      link: function(scope, element) {
        scope.$watch('ngHideEx', function(hide, oldHide) {
          if (hide) {
            $animate.addClass(element, 'ng-hide', {tempClasses: 'ng-hide-animate'}).then(scope.afterHide);
          }
          if (!hide) {
            $animate.removeClass(element, 'ng-hide', {tempClasses: 'ng-hide-animate'}).then(scope.afterShow);
          }
        });
      }
    }
  });

  module.directive('bkCodeCell', function(
      bkUtils,
      bkEvaluatorManager,
      bkEvaluatePluginManager,
      bkCellMenuPluginManager,
      bkSessionManager,
      bkCoreManager,
      bkDragAndDropHelper,
      bkPublicationHelper,
      GLOBALS,
      $rootScope,
      $timeout,
      autocompleteParametersService) {

    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    var CELL_TYPE = 'code';
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/codecell'](),
      scope: {cellmodel: '=', cellmenu: '='},
      controller: function($scope) {
        
        $scope.changeHandler = function(cm, e) {
          if ($scope.cellmodel.input.body !== cm.getValue()) {
            $scope.cellmodel.lineCount = cm.lineCount();
            $scope.cellmodel.input.body = cm.getValue();
            if (!bkSessionManager.isNotebookModelEdited()) {
              bkSessionManager.setNotebookModelEdited(true);
              bkUtils.refreshRootScope();
            }
          }
        };
        
        $scope.onGutterClick = function(cm, line, gutter, e) {
          if (gutter !== 'CodeMirror-linenumbers') return;

          var prev = (e.ctrlKey || e.shiftKey) || e.metaKey ? cm.listSelections() : [];
          var anchor = line;
          var head = line + 1;

          function update() {
            var curr = {
              anchor: CodeMirror.Pos(anchor, head > anchor ? 0 : null),
              head: CodeMirror.Pos(head, 0)
            };
            if (e.shiftKey) {
              if (prev[0].anchor.line >= head) {
                cm.extendSelection(curr.anchor, prev[0].head, {origin: "*mouse"});
              } else {
                cm.extendSelection(prev[0].anchor, curr.head, {origin: "*mouse"});
              }
            } else {
              cm.setSelections(prev.concat([curr]), prev.length, {origin: "*mouse"});
            }
            $scope.focus();
          }
          function onMouseMove(e) {
            var currLine = cm.lineAtHeight(e.clientY, "client");
            if (head > anchor) {
              currLine++;
            }
            if (currLine != head) {
              head = currLine;
              update();
            }
          }
          function onMouseUp(e) {
            removeEventListener("mouseup", onMouseUp);
            removeEventListener("mousemove", onMouseMove);
          }

          update();
          addEventListener("mousemove", onMouseMove);
          addEventListener("mouseup", onMouseUp);
        };
        
        $scope.cellview = {
          inputMenu: [],
          displays: []
        };

        $scope.isLocked = function() {
          return bkSessionManager.isNotebookLocked();
        };

        $scope.isEmpty = function() {
          return !($scope.cellmodel.output.result);
        };

        $scope.isError = function() {
          //jscs:disable
          if ($scope.cellmodel === undefined || $scope.cellmodel.output === undefined || $scope.cellmodel.output.result === undefined) {
            //jscs:enable
            return false;
          }

          var type = $scope.cellmodel.output.result.innertype;

          if (!type && $scope.cellmodel.output.result.payload !== undefined) {
            type = $scope.cellmodel.output.result.payload.innertype;
          }

          var isError = type === 'Error';
          $scope.cellmodel.isError = isError;

          return isError;
        };

        $scope.isShowInput = function() {
          if ($scope.isLocked()) {
            return false;
          }
          return $scope.cellmodel.input.hidden !== true;
        };

        $scope.bkNotebook = getBkNotebookWidget();

        //ensure cm refreshes when 'unhide'
        $scope.afterShow = function () {
          if ($scope.cm)
            $scope.cm.refresh();
        };
        $scope.$watch('cellmodel.input.hidden', function(newValue, oldValue) {
          if (oldValue === true && newValue !== oldValue) {
            bkUtils.fcall(function() {
              $scope.afterShow();
            });
          }
        });

        $scope.prepareForSearch = function() {
          delete $scope.cellmodel.output.hidden;
        };
        
        $scope.afterSearchActions = function() {
          //nothing to do
        };
        
        $scope.prepareForSearchCellActions = function() {
          $scope.cm.off('change', $scope.changeHandler);
        };
        
        $scope.doPostSearchCellActions = function() {
          $scope.cm.on('change', $scope.changeHandler);
          $scope.changeHandler($scope.cm, null);
        };

        $scope.isHiddenOutput = function() {
          return $scope.cellmodel.output.selectedType == 'Hidden';
        };

        $scope.hasOutput = function() {
          return $scope.cellmodel.output.result !== undefined;
        };

        $scope.backgroundClick = function(event) {
          if (!$scope.isShowInput() ||
              $(event.toElement).parents().hasClass('code-cell-output') ||
              $(event.toElement).hasClass('evaluate-script')) {
            return;
          }
          var top = $(event.delegateTarget).offset().top;
          var outputElement = $(event.delegateTarget).children('.code-cell-output:first');
          var bottom;
          if (outputElement.length > 0) {
            bottom = outputElement.offset().top;
          } else {
            bottom = top + $(event.delegateTarget).height();
          }
          // Even better would be to detect left/right and move to
          // beginning or end of line, but we can live with this for now.
          var cm = $scope.cm;
          setTimeout(function() {
            // click-shiftKey handling - select from current position to the end
            if (event.shiftKey) {
              var cursor = cm.lastPositon || {"line" : 0, "ch" : 0};
              var lastPosition = {
                "line" : cm.lineCount() - 1,
                "ch" : cm.getLine(cm.lastLine()).length
              };
              cm.setSelection(cursor, lastPosition);
            } else {
              if (event.pageY < (top + bottom) / 2) {
                cm.setCursor(0, 0);
              } else {
                cm.setCursor(cm.lineCount() - 1,
                    cm.getLine(cm.lastLine()).length);
              }
              cm.focus();
            }
          }, 0);

        };

        $scope.isShowOutput = function() {

          var result = $scope.cellmodel.output.result;

          if (!$scope.hasOutput() || result.hidden) {
            return false;
          }

          if (result.status !== "RUNNING" && ($scope.cellmodel.output.hidden === true || $scope.isHiddenOutput())) {
            return false;
          }

          return true;
        };

        $scope.outputTitle = function() {
          return $scope.isError() ? 'Error' : null;
        };

        $scope.evaluate = function($event) {
          if($scope.isCellRunning()) {
            return;
          }
          if ($event) {
            $event.stopPropagation();
          }

          var deferred = bkUtils.newDeferred();
          $scope.cellmodel.output.state = {};
          bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel).then(deferred.resolve, function (error) {
            console.log('Evaluation failed');
            deferred.reject(error);
          });
          return deferred.promise;
        };

        $scope.isCellRunning = function () {
          return bkCoreManager.getBkApp().isRunning($scope.cellmodel.id);
        };

        $scope.cancel = function() {
          if($scope.isCellRunning()) {
            bkCoreManager.getBkApp().cancel();
          }
        };

        var editedListener = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        };
        $scope.$watch('cellmodel.id', editedListener);
        $scope.$watch('cellmodel.evaluator', editedListener);
        $scope.$watch('cellmodel.initialization', editedListener);
        $scope.$watch('cellmodel.wordWrapDisabled', editedListener);
        $scope.$watch('cellmodel.input.body', editedListener);
        $scope.$watch('cellmodel.output.result', editedListener);

        $scope.autocomplete = function(cpos, onResults) {
          var evaluator = bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
          if (!evaluator) {
            return;
          }
          if (evaluator.autocomplete) {
            evaluator.autocomplete($scope.cellmodel.input.body, cpos, onResults);
          } else if (evaluator.autocomplete2) {
            // used by JavaScript evaluator
            evaluator.autocomplete2($scope.cm, null, onResults);
          }
        };

        $scope.showDocs = function(cpos) {

          var cb = function(doc) {
            $scope.$broadcast('showTooltip', doc);
          };

          var evaluator = bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
          if (!evaluator) {
            return;
          }
          if (evaluator.showDocs) {
            evaluator.showDocs($scope.cellmodel.input.body, cpos, cb);
          }
        };

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getLoadedEvaluators();
        };

        $scope.getEvaluator = function() {
          if (!($scope.cellmodel.evaluator in bkEvaluatePluginManager.getKnownEvaluatorPlugins())) {
            return "fail";
          }
          return bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
        };

        $scope.updateUI = function(evaluator) {
          if(!$scope.cm) {
            return;
          }
          $scope.cellmodel.evaluatorReader = Boolean(evaluator);
          var visualParams = bkEvaluatorManager.getVisualParams($scope.cellmodel.evaluator);
          
          var cmMode = evaluator ? evaluator.cmMode : visualParams ? visualParams.cmMode : undefined;
          var indentSpaces = evaluator ? evaluator.indentSpaces : undefined;
          
          if(cmMode) {
            $scope.cm.setOption('mode', visualParams.cmMode);
          }
          if(indentSpaces) {
            $scope.cm.setOption('indentUnit', evaluator.indentSpaces);
          }
        };
        $scope.$watch('getEvaluator()', function(newValue, oldValue) {
          $scope.updateUI(newValue);
        });

        $scope.isLockedCell = function() {
          return $scope.cellmodel.locked;
        };

        $scope.cellmenu.addItem({
          name: 'Initialization Cell',
          sortorder: 100,
          isChecked: function() {
            return $scope.isInitializationCell();
          },
          action: function() {
            if ($scope.isInitializationCell()) {
              $scope.cellmodel.initialization = undefined;
            } else {
              $scope.cellmodel.initialization = true;
            }
            notebookCellOp.reset();
          },
          locked: function () {
            return $scope.isLockedCell();
          }
        });

        $scope.cellmenu.addItem({
          name: 'Word wrap',
          sortorder: 130,
          isChecked: function () {
            return $scope.isWordWrap();
          },
          action: function () {
            if ($scope.cellmodel.wordWrapDisabled) {
              delete $scope.cellmodel.wordWrapDisabled;
            } else {
              $scope.cellmodel.wordWrapDisabled = true;
            }
          },
          locked: function () {
            return $scope.isLockedCell();
          }
        });

        $scope.cellmenu.addItem({
          name: 'Options...',
          sortorder: 140,
          action: function() {
            bkCoreManager.showFullModalDialog(function cb(r) { } ,
                'app/mainapp/dialogs/codecelloptions.jst.html', 'CodeCellOptionsController', $scope.cellmodel);
          },
          locked: function () {
            return $scope.isLockedCell();
          }
        });

        $scope.cellmenu.addItem({
          name: 'Run',
          sortorder: 180,
          action: function() {
            $scope.evaluate();
          }
        });

        $scope.cellmenu.addItem({
          name: 'Show input cell',
          sortorder: 190,
          isChecked: function() {
            return !$scope.cellmodel.input.hidden;
          },
          action: function() {
            if ($scope.cellmodel.input.hidden) {
              delete $scope.cellmodel.input.hidden;
            } else {
              $scope.cellmodel.input.hidden = true;
            }
          },
          locked: function () {
            return $scope.isLockedCell();
          }
        });

        $scope.cellmenu.addItem({
          name: 'Show output cell (if available)',
          sortorder: 200,
          isChecked: function() {
            return !$scope.cellmodel.output.hidden;
          },
          action: function() {
            if ($scope.cellmodel.output.hidden) {
              delete $scope.cellmodel.output.hidden;
            } else {
              $scope.cellmodel.output.hidden = true;
            }
          }
        });

        $scope.isInitializationCell = function() {
          return $scope.cellmodel.initialization;
        };

        $scope.isWordWrap = function () {
          return !$scope.cellmodel.wordWrapDisabled;
        };

        $scope.power = {
          menu: {
            items: [
              {
                name: 'Disable initialization',
                sortorder: 100,
                action: function() {
                  if ($scope.isInitializationCell()) {
                    $scope.cellmodel.initialization = undefined;
                  } else {
                    $scope.cellmodel.initialization = true;
                  }
                  notebookCellOp.reset();
                }
              }
            ]
          }
        };

        bkPublicationHelper.helper(CELL_TYPE, $scope);

        $scope.cellmenu.changeSortOrder({
          name: "Publish...",
          sortorder: 170
        });

        var getElapsedTimeString = function() {
          var elapsedTime = $scope.cellmodel.output.elapsedTime;
          if (_.isNumber(elapsedTime) && !$scope.hasOutput()) {
            return "Elapsed time: " + bkUtils.formatTimeString(elapsedTime);
          }
          return '';
        };

        $scope.cellmenu.addItem({
          name: getElapsedTimeString,
          sortorder: 300,
          action: null,
          separator: true
        });

        var getEvaluationSequenceNumber = function() {
          var seqNo = $scope.cellmodel.output.evaluationSequenceNumber;
          if (seqNo && !$scope.hasOutput()) {
            return "Run Sequence: " + seqNo;
          }
          return '';
        };

        $scope.cellmenu.addItem({
          name: getEvaluationSequenceNumber,
          sortorder: 310,
          action: null
        });
        
        $scope.cellmenu.addSeparator("Cut");

        $scope.cellmenu.addSeparator("Run");
        
      },
      link: function(scope, element) {
        scope.showDebug = false;

        var resizeHandler = function() {
          var showing = document.body.getElementsByClassName('CodeMirror-fullscreen')[0];
          if (!showing) {
            return;
          }
          showing.CodeMirror.getWrapperElement().style.height = bkHelper.winHeight() + 'px';
        };
        scope.scrollTo = function(){
          window.scrollTo(0, element.offset().top - 100);
        };
        CodeMirror.on(window, 'resize', resizeHandler);

        var codeMirrorOptions = bkCoreManager.codeMirrorOptions(scope, notebookCellOp);
        _.extend(codeMirrorOptions.extraKeys, {
          'Esc' : function(cm) {
            if (autocompleteParametersService.isActive()) {
              return autocompleteParametersService.endCompletion();
            }
            cm.execCommand('singleSelection');
            if (cm.state.vim && cm.state.vim.insertMode) {
              CodeMirror.Vim.exitInsertMode(cm);
            } else {
              if (bkHelper.isFullScreen(cm)) {
                bkHelper.setFullScreen(cm, false);
              }
            }
          },
          'Shift-Ctrl-E': function(cm) {
            scope.popupMenu();
            var parent = element;
            if (bkHelper.getBkNotebookViewModel().isAdvancedMode()) {
              var inputMenuDivAdvanced = element.parents('.bkcell.code.bkr').find('.toggle-menu').first();
              parent = inputMenuDivAdvanced.find('.dropdown.advanced-only').first();
            }
            parent.find('.inputcellmenu').find('li').find('a')[0].focus();
          },
          'Shift-Cmd-E': function(cm) {
            scope.popupMenu();
            var parent = element;
            if (bkHelper.getBkNotebookViewModel().isAdvancedMode()) {
              var inputMenuDivAdvanced = element.parents('.bkcell.code.bkr').find('.toggle-menu').first();
              parent = inputMenuDivAdvanced.find('.dropdown.advanced-only').first();
            }
            parent.find('.inputcellmenu').find('li').find('a')[0].focus();
          },
          'Ctrl-Alt-H': function(cm) { // cell hide
            scope.cellmodel.input.hidden = true;
            bkUtils.refreshRootScope();
          },
          'Cmd-Alt-H': function(cm) { // cell hide
            scope.cellmodel.input.hidden = true;
            bkUtils.refreshRootScope();
          },
          'Shift-Ctrl-Enter': function(cm) {
            scope.evaluateSelection(cm);
          },
          'Shift-Cmd-Enter':  function(cm) {
            scope.evaluateSelection(cm);
          },
          'PageDown': function (cm) {
            //override default behaviour of codemirror control
            //do nothing
          },
          'PageUp': function (cm) {
            //override default behaviour of codemirror control
            //do nothing
          }
        });

        var initCodeMirror = function() {
          var template = '<textarea class="bkcelltextarea" ng-model="cellmodel.input.body"/>';
          $(element.find('.bkcelltextarea')[0]).replaceWith($(template).text(scope.cellmodel.input.body));

          _.extend(codeMirrorOptions, {
            theme: bkHelper.getTheme(),
            lineWrapping: scope.isWordWrap()
          });

          scope.cm = CodeMirror.fromTextArea(element.find('textarea')[0], codeMirrorOptions);
          scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);
          scope.cm.on('change', scope.changeHandler);
          scope.cm.on('blur', function () {
            if ($('.CodeMirror-hint').length > 0) {
              //codecomplete is up, skip
              return;
            }
            scope.cm.lastPositon = scope.cm.getCursor('anchor');
            if(document.hasFocus()){
              // This is involved in issue #4397, but we do not have a good fix.
              scope.cm.setSelection({line: 0, ch: 0 }, {line: 0, ch: 0 }, {scroll: false});
            }
          });
          scope.cm.on('gutterClick', scope.onGutterClick);
          bkDragAndDropHelper.configureDropEventHandlingForCodeMirror(scope.cm, function () {
            return scope.cm.getOption('mode') === 'htmlmixed';
          });

          scope.updateUI(scope.getEvaluator());
          // Since the instantiation of codemirror instances is now lazy,
          // we need to track and handle focusing on an async cell add
          if (scope._shouldFocusCodeMirror) {
            delete scope._shouldFocusCodeMirror;
            return scope.cm.focus();
          }
        };

        initCodeMirror();
        scope.displayOutput = true;

        scope.focus = function() {
          if (scope.cm) scope.cm.focus();
        };

        scope.bkNotebook.registerFocusable(scope.cellmodel.id, scope);

        // cellmodel.body --> CodeMirror
        scope.$watch('cellmodel.input.body', function(newVal, oldVal) {
          if (scope.cm && newVal !== scope.cm.getValue()) {
            if (newVal === null) {
              newVal = '';
            }
            scope.cm.setValue(newVal);
            scope.cm.clearHistory();
          }
        });

        var inputMenuDiv = element.find('.bkcell').first();
        scope.popupMenu = function(event) {
          var menu = inputMenuDiv.find('.dropdown').first();
          if (bkHelper.getBkNotebookViewModel().isAdvancedMode()) {
            var inputMenuDivAdvanced = element.parents('.bkcell.code.bkr').find('.toggle-menu').first();
            menu = inputMenuDivAdvanced.find('.dropdown.advanced-only').first();
          }
          menu.find('.dropdown-toggle').first().dropdown('toggle');
        };

        if (scope.isInitializationCell()) {
          element.closest('.bkcell').addClass('initcell');
        } else {
          element.closest('.bkcell').removeClass('initcell');
        }
        scope.$watch('isInitializationCell()', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue) {
              element.closest('.bkcell').addClass('initcell');
            } else {
              element.closest('.bkcell').removeClass('initcell');
            }
          }
        });

        scope.$watch('isWordWrap()', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            scope.cm.setOption('lineWrapping', newValue);
          }
        });

        /*
        scope.getShareData = function() {
          var evaluator = _(bkSessionManager.getRawNotebookModel().evaluators)
              .find(function(evaluator) {
                return evaluator.name === scope.cellmodel.evaluator;
              });
          var cells = [scope.cellmodel];
          return bkUtils.generateNotebook([evaluator], cells);
        };
        */

        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) {
            if (scope.cm) {
              return scope.cm.focus();
            }

            scope._shouldFocusCodeMirror = true;
          }
        });

        scope.evaluateSelection = function(cm) {
          var evalCode;
          var currentLine;
          if (cm.somethingSelected()) {
            evalCode = cm.getSelection();
          } else {
            currentLine = cm.getCursor().line;
            evalCode = cm.getLine(currentLine);
          }

          scope.cellmodel.output.state = {};
          bkCoreManager.getBkApp().evaluateCellCode(scope.cellmodel, evalCode)
            .then(function(data) {
              if (currentLine != null) {
                if (currentLine !== cm.lastLine()) {
                  cm.setCursor(currentLine + 1, 0);
                } else {
                  codeMirrorOptions.goToNextCodeCell(cm);
                }
              }
            })
            .catch(function(data) {
              console.log('Evaluation failed');
            });
        };

        scope.$on('beaker.section.toggled', function(e, isCollapsed) {
          if (!isCollapsed) {
            $timeout(function() {
              if (scope.cm === undefined) {
                Scrollin.checkForVisibleElements();
              } else {
                scope.cm.refresh();
              }
            });
          }
        });

        scope.$on('$destroy', function() {
          Scrollin.untrack(element[0]);
          CodeMirror.off(window, 'resize', resizeHandler);
          //CodeMirror.off('change', changeHandler);
          scope.cm.off('change', scope.changeHandler);
          if (scope.cm) {
            scope.cm.off();
          }
          CodeMirror.off('gutterClick', scope.onGutterClick);
          scope.bkNotebook.unregisterFocusable(scope.cellmodel.id);
          scope.bkNotebook.unregisterCM(scope.cellmodel.id);
          scope.bkNotebook = null;
        });
      }
    };
  });

})();
