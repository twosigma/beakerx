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
      bkMenuPluginManager,
      $timeout) {
    var CELL_TYPE = 'notebook';
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/notebook'](),
      scope: {
        setBkNotebook: '&',
        isLoading: '='
      },
      controller: function ($scope, $rootScope, $window, bkEvaluatorManager, bkDragAndDropHelper, GLOBALS) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var _impl = {
          _viewModel: {
            _debugging: false,
            _showOutput: false,
            _showSearchReplace: false,
            _editMode: 'default',
            hideSearchReplace: function () {
              this._showSearchReplace = false;
            },
            showSearchReplace: function (cm, cellmodel) {
              this._showSearchReplace = true;
              this.hideOutput();
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
              $scope.prepareNotebookeForSearch(cm, cellmodel);
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
            },
            isShowingSearchReplace: function () {
              return this._showSearchReplace;
            },
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
          _previewable: {}, // map of prewieable 
          registerPreviewable: function (cellId, previewable) {
            this._previewable[cellId] = previewable;
          },
          unregisterPreviewable: function (cellId) {
            delete this._previewable[cellId];
            this._previewable[cellId] = null;
          },
          _sectioncells: {}, // map of section cells 
          registerSectioncell: function (cellId, sectioncell) {
            this._sectioncells[cellId] = sectioncell;
          },
          unregisterSectioncell: function (cellId) {
            delete this._sectioncells[cellId];
            this._sectioncells[cellId] = null;
          },
          getNotebookNewCellFactory: function () {
            return bkSessionManager.getNotebookNewCellFactory();
          },
          getFocusable: function (cellId) {
            return this._focusables[cellId];
          },
          getPreviewable: function (cellId) {
            return this._previewable[cellId];
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
        
        $scope.isShowingSearchReplace = function () {
          return _impl._viewModel.isShowingSearchReplace();
        };
        $scope.hideSearchReplace = function () {
          doPostSearchNotebookActions();
          _impl._viewModel.hideSearchReplace();
        };

        var cursor = null;
        
        var previousFilter = {};
        var currentCm = null;
        var currentCellmodel = null;
        var clearCursorPozition = true;
        var currentMarker = null;

        $scope.availableSearchCellOptions =
          [
           {value: {allNotebook:true, codeCells:true, sectionCells:true, markdownCells:true}, name: 'entire notebook'},
           {value: {allNotebook:false, codeCells:false, sectionCells:false, markdownCells:false}, name: 'current cell only'},
           {value: {allNotebook:true, codeCells:true, sectionCells:false, markdownCells:false}, name: 'all code cells'},
           {value: {allNotebook:true, codeCells:false, sectionCells:true, markdownCells:true}, name: 'all text'}
        ];

        $scope.searchReplaceData = {
          replace: null,
          searchCellFilter: $scope.availableSearchCellOptions[0].value,
          caseSensitive: false,
          wrapSearch: false,
          reverseSearch: false
        }
        
        var isCellMatchSearchCellFilter = function (cellModelToUse, searchCellFilter){
          var ret = false;
          if(searchCellFilter.codeCells === true){
            ret = ret || cellModelToUse.type === "code";
          }
          if(searchCellFilter.sectionCells === true){
            ret = ret || cellModelToUse.type === "section";
          }
          if(searchCellFilter.markdownCells === true){
            ret = ret || cellModelToUse.type === "markdown";
          }
          return ret;
        }

        var clearMarcs = function (theCM){
          if(theCM){
            var marks = theCM.findMarks({line: 0, ch: 0},{line: theCM.lineCount() - 1, ch: theCM.getLine(theCM.lastLine()).length});
            if(marks){
              for (var i = 0; i < marks.length; i++) {
                marks[i].clear();
              }
            }
          }
        }
        
        $scope.cmArray = [];
        $scope.markAllInterval = null;
        
        $scope.findALLFunction = function (result) {
          
          $scope.cmArray = [];
          if($scope.markAllInterval){
            clearInterval($scope.markAllInterval);
          }
          
          $scope.findAllFunctionTemplate(
              result,
              function(theCursor,theCM){
                //markText is too slow to put it directly in here.
                $scope.cmArray.push({theCM : theCM, from: theCursor.from(), to: theCursor.to()});
              }
          );
          
          if($scope.cmArray && $scope.cmArray.length > 0){
            var index = 0;
            $scope.markAllInterval = setInterval(function(){
              if($scope.cmArray && $scope.cmArray[index]){
                $scope.cmArray[index].theCM.markText($scope.cmArray[index].from, $scope.cmArray[index].to, {className: "search-find-all-selected-background"});
                index++;
              }else{
                clearInterval($scope.markAllInterval);
              }
              if(index >= $scope.cmArray.length){
                clearInterval($scope.markAllInterval);
              }
            },10);
          }
        }
        
        $scope.replaceAllFunction = function (result) {
          $scope.findAllFunctionTemplate(
              result,
              function(theCursor,theCM){
                theCursor.replace(result.replace, result.find);
                theCM.addSelection(theCursor.from(), theCursor.to());
              }
          );
        }
        
        $scope.findAllFunctionTemplate = function (result, action) {
          var theCursor = null;
          for (var index = 0; notebookCellOp.getCellsSize() > index; index++) {
            var theCell = notebookCellOp.getCellAtIndex(index);
            if (theCell){
              var theCM = _impl.getCM(theCell.id);
              if (theCM){
                clearMarcs(theCM);     
                if(result.find && result.searchCellFilter.allNotebook){
                  if(isCellMatchSearchCellFilter(theCell, result.searchCellFilter)){
                    for (theCursor = getSearchCursor(result, theCursor, 'MIN', theCM); theCursor.findNext();) {
                      action(theCursor, theCM);
                    }
                  }
                }
              }
            }
          }
          if(!result.searchCellFilter.allNotebook){
            if(result.find){
              for (theCursor = getSearchCursor(result, theCursor, 'MIN', currentCm); theCursor.findNext();) {
                action(theCursor, currentCm);
              }
            }
          }
        }

        var scrollToChar = function (theCM, pozition){
          var headerHeight = 0;
          var searchReplaceHeight = 0;
          var searchReplaceWidth = 0;

          var header = $window.document.getElementById("notebook_header");
          if(header){
            headerHeight = header.getBoundingClientRect().height;
          }

          var searchReplace = $window.document.getElementById("search_replace_window");
          if(searchReplace){
            searchReplaceHeight = searchReplace.getBoundingClientRect().height;
            searchReplaceWidth = searchReplace.getBoundingClientRect().width;
          }

          var de = document.documentElement;
          var box = theCM.getScrollerElement().getBoundingClientRect();
          
          var cmPozitionY = box.top + window.pageYOffset - de.clientTop;
          var charPozitionY = theCM.charCoords({line: pozition.line, ch: pozition.ch}, "local").top;
          var charPozitionX = theCM.charCoords({line: pozition.line, ch: pozition.ch}, "page").left;
          var scrollToY = cmPozitionY + charPozitionY;
          var scrollToX = charPozitionX;
 
          var visible_start = $(window).scrollTop() + headerHeight;
          var visible_end = $(window).scrollTop() + window.innerHeight;
          var visible_end_search = $(window).scrollTop() + window.innerHeight - searchReplaceHeight;
          
          var visibelFrameSearchX = window.innerWidth - searchReplaceWidth;
          var visibelFrameSearchY = window.innerHeight - searchReplaceHeight - headerHeight;
          
          if(scrollToX < visibelFrameSearchX){
            if((scrollToY < visible_start || scrollToY > visible_end)){
              $('html,body').animate({scrollTop: scrollToY - Math.round(visibelFrameSearchY *0.2) - headerHeight}, 700);
              //window.scrollTo(0, cmPozition - window.innerHeight);
            }
          }else{
            if((scrollToY < visible_start || scrollToY > visible_end_search)){
              $('html,body').animate({scrollTop: scrollToY - Math.round(visibelFrameSearchY *0.2) - headerHeight}, 700);
              //window.scrollTo(0, cmPozition - window.innerHeight);
            }
          }
        }

        $scope.findFunction = function (result, reversive) {
          if(result.find){
            var createNewCursor = result.caseSensitive != previousFilter.caseSensitive 
              || result.find != previousFilter.find;
            angular.copy(result, previousFilter);
  
            if(createNewCursor){
              cursor = getSearchCursor(result, cursor, clearCursorPozition ? 'MIN' : 'COPY', currentCm);
              clearCursorPozition = false;
            }
  
            var cellmodelId = currentCellmodel.id;

            if(cursor != null && cursor.find(reversive)){
              if(currentMarker){
                currentMarker.clear();
              }
              currentMarker = currentCm.markText(cursor.from(), cursor.to(), {className: "search-selected-background"});
              scrollToChar(currentCm, cursor.to());
            }else {
              
              var search = true;
              do{
                
                do{
                  cursor = getNextCursor(result, currentCm, reversive);
                }while(cursor != null && !isCellMatchSearchCellFilter(currentCellmodel, result.searchCellFilter));

                var find = null;
                if(cursor != null){
                  find = cursor.find(reversive);
                  search = !find && cellmodelId != currentCellmodel.id; 
                }else{
                  search = false;
                }
                
                if(find){
                  if(currentMarker){
                    currentMarker.clear();
                  }
                  currentMarker = currentCm.markText(cursor.from(), cursor.to(), {className: "search-selected-background"});
                  scrollToChar(currentCm, cursor.to());
                }
              }while(search);
              
            }
          }
        }
        
        $scope.findPreviousFunction = function (result) {
          $scope.findFunction(result, true);
        }
        
        $scope.findNextFunction = function (result) {
          $scope.findFunction(result, result.reverseSearch);
        }
        
        $scope.replaceFunction = function (result) {
          if(cursor && cursor.from() && cursor.to()){
            cursor.replace(result.replace, result.find);
            currentCm.setSelection(cursor.from(), cursor.to());
            $scope.findNextFunction(result);
          }
        }
        
        $scope.prepareNotebookeForSearch = function (cm, cellmodel) {

          if(cm && cellmodel){
            currentCm = cm;
            currentCellmodel = cellmodel;
          }else{
            var theCell = notebookCellOp.getCellAtIndex(0);
            if (theCell){
              var theCM = _impl.getCM(theCell.id);
              if (theCM){
                currentCm = theCM;
                currentCellmodel = theCell;
              }
            }
          }
          
          clearCursorPozition = true;

          var element = $window.document.getElementById("find_field");
          if(element){
            element.focus();  
          }
          
          for ( var property in _impl._focusables) {
            if (_impl._focusables.hasOwnProperty(property)) {
              if(_impl._focusables[property]){
                _impl._focusables[property].prepareForSearch();
              }
            }
          }
        }
        
        var doPostSearchNotebookActions = function () {
          
          if($scope.markAllInterval){
            clearInterval($scope.markAllInterval);
          }
          
          for ( var property in _impl._focusables) {
            if (_impl._focusables.hasOwnProperty(property)) {
              if(_impl._focusables[property]){
                _impl._focusables[property].afterSearchActions();
              }
            }
          }

          for (var index = 0; notebookCellOp.getCellsSize() > index; index++) {
            var theCell = notebookCellOp.getCellAtIndex(index);
            if (theCell){
              var theCM = _impl.getCM(theCell.id);
              if (theCM){
                clearMarcs(theCM);
              }
            }
          }
          
          previousFilter = {};
        }
        
        var doPostSearchCellActions = function (cmToUse) {
          cmToUse.setSelection({line: 0, ch: 0}, {line: 0, ch: 0});
        }
        
        var getSearchCursor = function (filter, oldCursor, positionType, cmToUSe) {
          var from = {line: 0, ch: 0};
          if(positionType == 'COPY'){
            if(oldCursor){
              from = oldCursor.to();
            }
          }else if(positionType == 'MIN'){
            from = {line: 0, ch: 0};
          }else if(positionType == 'MAX'){
            from = {line: cmToUSe.lineCount() - 1, ch: cmToUSe.getLine(cmToUSe.lastLine()).length};
          }
          return cmToUSe.getSearchCursor(filter.find, from, !filter.caseSensitive);
        }

        var getNextCursor = function (filter, cmToUSe, reversive) {
          var ret = null;
          if(filter.searchCellFilter.allNotebook){
            var index = notebookCellOp.getIndex(currentCellmodel.id);
            var nextIndex = index;
            if(reversive){
              nextIndex--;
              if(filter.wrapSearch){
                if(nextIndex < 0){
                  nextIndex = notebookCellOp.getCellsSize() - 1;
                }
              }else{
                if(nextIndex < 0){
                  nextIndex = null;
                }
              }
            }else{
              nextIndex++;
              if(filter.wrapSearch){
                if(nextIndex > notebookCellOp.getCellsSize() - 1){
                  nextIndex = 0;
                }
              }else{
                if(nextIndex > notebookCellOp.getCellsSize() - 1){
                  nextIndex = null;
                }
              }
            }
            
            if(nextIndex != null){
              var nextCell = notebookCellOp.getCellAtIndex(nextIndex);
              if (nextCell){
                var nextCm = _impl.getCM(nextCell.id);
                if (nextCm){
                  doPostSearchCellActions(currentCm);
                  currentCm = nextCm;
                  currentCellmodel = nextCell;
                  ret = getSearchCursor(filter, null, reversive ? 'MAX' : 'MIN', nextCm);
                }
              }
            }

          }else{
            if(filter.wrapSearch){
              ret = getSearchCursor(filter, cursor, reversive ? 'MAX' : 'MIN', cmToUSe);
            }
            //else null
          }
          return ret;
        }

        
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
              
              var notebookCellOp = bkSessionManager.getNotebookCellOp();
              var markdownCell = null;

              for (var index = 0; notebookCellOp.getCellsSize() > index; index++) {
                var theCell = notebookCellOp.getCellAtIndex(index);
                if (theCell){
                  var theCM = _impl.getCM(theCell.id);
                  if (theCM && theCM.hasFocus()){
                    markdownCell = theCell;
                    var markdownCM = theCM; 
                    var pozition = {line: markdownCM.lineCount() - 1, ch: markdownCM.getLine(markdownCM.lastLine()).length};
                    markdownCM.replaceRange(imageTag, pozition);
                    break;
                  }
                }
              }

              if(!markdownCell){
                markdownCell = bkSessionManager.getNotebookNewCellFactory().newMarkdownCell();
                markdownCell.body = imageTag;
                var cells = notebookCellOp.getCells();
                if (cells.length === 0) {
                  notebookCellOp.insertFirst(markdownCell, true);
                } else {
                  notebookCellOp.insertAfter(cells[cells.length - 1].id, markdownCell, true);
                }
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