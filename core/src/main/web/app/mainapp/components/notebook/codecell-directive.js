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
      bkCellMenuPluginManager,
      bkSessionManager,
      bkCoreManager,
      bkPublicationHelper,
      GLOBALS,
      $rootScope,
      $timeout) {

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

          return type == 'Error';
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


        $scope.isHiddenOutput = function() {
          return $scope.cellmodel.output.selectedType == 'Hidden';
        };

        $scope.hasOutput = function() {
          return $scope.cellmodel.output.result !== undefined;
        };

        $scope.backgroundClick = function(event) {
          if (!$scope.isShowInput() || $(event.toElement).parents().hasClass('code-cell-output')) {
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
          setTimeout(function(){
            if (event.pageY < (top + bottom) / 2) {
              cm.setCursor(0, 0);
            } else {
              cm.setCursor(cm.lineCount() - 1,
                cm.getLine(cm.lastLine()).length);
            }
            cm.focus();
          }, 0);

        };

        $scope.isShowOutput = function() {

          var result = $scope.cellmodel.output.result;

          if (!result || result.hidden) {
            return false;
          }

          if (result.status !== "RUNNING" && $scope.cellmodel.output.hidden === true) {
            return false;
          }

          return true;
        };

        $scope.outputTitle = function() {
          return $scope.isError() ? 'Error' : null;
        };

        $scope.evaluate = function($event) {
          if ($event) {
            $event.stopPropagation();
          }

          $scope.cellmodel.output.state = {};
          bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel).
              catch(function(data) {
                console.log('Evaluation failed');
              });
        };
        var editedListener = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        };
        $scope.$watch('cellmodel.id', editedListener);
        $scope.$watch('cellmodel.evaluator', editedListener);
        $scope.$watch('cellmodel.initialization', editedListener);
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
          return bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
        };
        $scope.updateUI = function(evaluator) {
          $scope.cellmodel.evaluatorReader = Boolean(evaluator);
          if ($scope.cm && evaluator) {
            $scope.cm.setOption('mode', evaluator.cmMode);
            if (evaluator.indentSpaces) {
              $scope.cm.setOption('indentUnit', evaluator.indentSpaces);
            }
          }
        };
        $scope.$watch('getEvaluator()', function(newValue, oldValue) {
          $scope.updateUI(newValue);
        });
        $scope.appendCodeCell = function(evaluatorName) {
          var thisCellId = $scope.cellmodel.id;
          if (!evaluatorName) {
            // if no evaluator specified, use the current evaluator
            evaluatorName = $scope.cellmodel.evaluator;
          }
          var newCell = bkSessionManager.getNotebookNewCellFactory().newCodeCell(evaluatorName);
          notebookCellOp.appendAfter(thisCellId, newCell);
          bkUtils.refreshRootScope();
        };

        $scope.cellmenu.addItem({
          name: 'Show input cell',
          isChecked: function() {
            return !$scope.cellmodel.input.hidden;
          },
          action: function() {
            if ($scope.cellmodel.input.hidden) {
              delete $scope.cellmodel.input.hidden;
            } else {
              $scope.cellmodel.input.hidden = true;
            }
          }
        });
        $scope.cellmenu.addItem({
          name: 'Show output cell (if available)',
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

        $scope.cellmenu.addItem({
          name: 'Initialization Cell',
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
          }
        });

        $scope.cellmenu.addItem({
          name: 'Options',
          action: function() {
            bkCoreManager.showFullModalDialog(function cb(r) { } ,
                'app/mainapp/dialogs/codecelloptions.jst.html', 'CodeCellOptionsController', $scope.cellmodel);
          }
        });

        $scope.power = {
          menu: {
            items: [
              {
                name: 'Disable initialization',
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
      },
      link: function(scope, element) {
        scope.showDebug = false;

        function isFullScreen(cm) {
          return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
        }

        function winHeight() {
          return window.innerHeight || (document.documentElement || document.body).clientHeight;
        }

        function setFullScreen(cm, full) {
          var wrap = cm.getWrapperElement();
          if (full) {
            wrap.className += ' CodeMirror-fullscreen';
            wrap.style.height = winHeight() + 'px';
            document.documentElement.style.overflow = 'hidden';
          } else {
            wrap.className = wrap.className.replace(' CodeMirror-fullscreen', '');
            wrap.style.height = '';
            document.documentElement.style.overflow = '';
          }
          cm.refresh();
        }
        var resizeHandler = function() {
          var showing = document.body.getElementsByClassName('CodeMirror-fullscreen')[0];
          if (!showing) {
            return;
          }
          showing.CodeMirror.getWrapperElement().style.height = winHeight() + 'px';
        };
        scope.scrollTo = function(){
          window.scrollTo(0, element.offset().top - 100);
        };
        CodeMirror.on(window, 'resize', resizeHandler);

        var codeMirrorOptions = bkCoreManager.codeMirrorOptions(scope, notebookCellOp);
        _.extend(codeMirrorOptions.extraKeys, {
          'Esc' : function(cm) {
            cm.execCommand('singleSelection');
            if (cm.state.vim && cm.state.vim.insertMode) {
              return;
            } else {
              if (isFullScreen(cm)) {
                setFullScreen(cm, false);
              }
            }
          },
          'Alt-F11': function(cm) {
            setFullScreen(cm, !isFullScreen(cm));
          },
          'Shift-Ctrl-A': function(cm) {
            scope.appendCodeCell();
          },
          'Shift-Cmd-A': function(cm) {
            scope.appendCodeCell();
          },
          'Shift-Ctrl-E': function(cm) {
            scope.popupMenu();
            element.find('.inputcellmenu').find('li').find('a')[0].focus();
          },
          'Shift-Cmd-E': function(cm) {
            scope.popupMenu();
            element.find('.inputcellmenu').find('li').find('a')[0].focus();
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
          }

        });

        var initCodeMirror = function() {
          var template = '<textarea class="bkcelltextarea" ng-model="cellmodel.input.body">' + scope.cellmodel.input.body + '</textarea>';
          $(element.find('.bkcelltextarea')[0]).replaceWith($(template));

          _.extend(codeMirrorOptions, {
            theme: bkHelper.getTheme()
          });


          scope.cm = CodeMirror.fromTextArea(element.find('textarea')[0], codeMirrorOptions);
          scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);
          scope.cm.on('change', changeHandler);
          scope.cm.on('blur', function () {
            if ($('.CodeMirror-hint').length > 0) {
              //codecomplete is up, skip
              return;
            }
            CodeMirror.signal(scope.cm, "cursorActivity", scope.cm);
          });
          scope.cm.on('focus', function () {
            if ($('.CodeMirror-hint').length > 0) {
              //codecomplete is up, skip
              return;
            }
            CodeMirror.signal(scope.cm, "cursorActivity", scope.cm);
          });

          scope.updateUI(scope.getEvaluator());
          // Since the instantiation of codemirror instances is now lazy,
          // we need to track and handle focusing on an async cell add
          if (scope._shouldFocusCodeMirror) {
            delete scope._shouldFocusCodeMirror;
            return scope.cm.focus();
          }
        };

        scope.displayOutput = false;
        Scrollin.track(element[0], function() {
          $timeout(function() {
            initCodeMirror();
            scope.displayOutput = true;
          }, 1);
        }, {top: -GLOBALS.CELL_INSTANTIATION_DISTANCE});

        scope.focus = function() {
          scope.cm.focus();
        };

        scope.bkNotebook.registerFocusable(scope.cellmodel.id, scope);

        scope.focus = function() {
          scope.cm.focus();
        };

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
        // cellmodel.body <-- CodeMirror
        var changeHandler = function(cm, e) {
          if (scope.cellmodel.input.body !== cm.getValue()) {
            scope.cellmodel.lineCount = cm.lineCount();
            scope.cellmodel.input.body = cm.getValue();
            if (!bkSessionManager.isNotebookModelEdited()) {
              bkSessionManager.setNotebookModelEdited(true);
              bkUtils.refreshRootScope();
            }
          }
        };

        var inputMenuDiv = element.find('.bkcell').first();
        scope.popupMenu = function(event) {
          var menu = inputMenuDiv.find('.dropdown').first();
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
          CodeMirror.off('change', changeHandler);
          if (scope.cm) {
            scope.cm.off();
          }
          scope.bkNotebook.unregisterFocusable(scope.cellmodel.id);
          scope.bkNotebook.unregisterCM(scope.cellmodel.id);
          scope.bkNotebook = null;
        });
      }
    };
  });

})();
