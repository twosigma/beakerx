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
 * Module bk.notebookCellModelManager
 * Notebook Cell Model doesn't own the notebook model.
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebookCellModelManager', []);

  // utilities
  var generateCellMap = function(cells) {
    var decoratedCells = {
      'root': {
        id: 'root',
        raw: null,
        level: 0,
        parent: null,
        children: [],
        allDescendants: []
      }
    };
    if (!cells || cells.length === 0) {
      return decoratedCells;
    }

    cells.forEach(function(cell, index) {
      decoratedCells[cell.id] = {
        id: cell.id,
        raw: cell,
        rawIndex: index,
        level: cell.level > 0 ? cell.level : Number.POSITIVE_INFINITY,
        parent: null,
        children: [],
        allDescendants: []
      };
    });

    var stack = [decoratedCells.root];
    stack.peek = function() {
      return this[this.length - 1];
    };

    var decoratedCellsKeys = Object.keys(decoratedCells);
    decoratedCellsKeys.sort(function(a,b){return decoratedCells[a].rawIndex - decoratedCells[b].rawIndex});

    decoratedCellsKeys.forEach(function(key) {
      var cell = decoratedCells[key];
      if (cell.id === 'root') {
        return;
      }
      while (stack.peek().level >= cell.level) {
        stack.pop();
      }
      decoratedCells[stack.peek().id].children.push(cell.id);
      decoratedCells[cell.id].parent = stack.peek().id;
      stack.forEach(function(c) {
        decoratedCells[c.id].allDescendants.push(cell.id);
      });
      stack.push(cell);
    });
    return decoratedCells;
  };

  var generateTagMap = function(cellMap) {
    // initialization cells
    var initializationCells = _.chain(cellMap)
        .filter(function(cell) {
          return cell.raw && cell.raw.initialization;
        })
        .map(function(cell) {
          if (cell.raw.type === 'code') {
            return cell;
          } else {
            return _.chain(cell.allDescendants)
                .map(function(childId) {
                  return cellMap[childId];
                })
                .filter(function(c) {
                  return c.raw.type === 'code';
                })
                .value();
          }
        })
        .flatten()
        .uniq()
        .sortBy(function(cell) {
          return cell.rawIndex;
        })
        .map(function(cell) {
          return cell.raw;
        })
        .value();

    // evaluators
    var evaluatorMap = {};
    evaluatorMap.add = function(key, value) {
      if (!this[key]) {
        this[key] = [];
      }
      this[key].push(value);
    };
    _.chain(cellMap)
      .filter(function(cell) {
        return cell.raw && cell.raw.type === 'code';
      })
      .each(function(codeCell) {
        evaluatorMap.add(codeCell.raw.evaluator, codeCell.raw);
      }).value();

    // user tags
    var userTagsMap = {};
    userTagsMap.add = function(key, value) {
      if (!this[key]) {
        this[key] = [];
      }
      this[key].push(value);
    };
    _.chain(cellMap)
    .filter(function(cell) {
      return cell.raw && cell.raw.type === 'code' && cell.raw.tags !== undefined && cell.raw.tags !== '';
    })
    .each(function(codeCell) {
      var re = /\s+/;
      var tags = codeCell.raw.tags.split(re);
      var i;
      for (i = 0; i < tags.length; i++) {
        userTagsMap.add(tags[i], codeCell.raw);
      }
    }).value();

    return {
      initialization: initializationCells,
      evaluator: evaluatorMap,
      usertags: userTagsMap
    };
  };

  var replaceWholeArray = function(oldArray, newArray) {
    var args = _.flatten([0, oldArray.length, newArray]);
    oldArray.splice.apply(oldArray, args);
  };

  module.factory('bkNotebookCellModelManager', function(bkNotebookCellModelManagerFactory) {
    return bkNotebookCellModelManagerFactory.createInstance();
  });
  
  
  
  
  
  module.factory('bkNotebookCellModelManagerFactory', function($timeout, $rootScope, bkEvaluateJobManager) {
    return {
      createInstance: function () {
        var cells = [];
        var cellMap = {};
        var tagMap = {};
        var undoAction = {};
        var undoAction2 = {};
        var redoAction = {};
        var redoAction2 = {};
        var recreateCellMap = function(doNotClearUndoAction) {
          cellMap = generateCellMap(cells);
          tagMap = generateTagMap(cellMap);
          if (!doNotClearUndoAction) {
            undoAction = undefined;
            undoAction2 = undefined;
            redoAction = undefined;
            redoAction2 = undefined;
          }
          // TODO: Optimize this function so it doesn't destroy the page scroll and require
          // this hack below.
          //
          // Most likely because of the nested nature of the cell map and the cells in the
          // DOM that reflect that cell map, when one changes something at the base of the
          // tree (like adding a new section cell
          // [https://github.com/twosigma/beaker-notebook/issues/672]), it not only takes an
          // eternity, but randomly scrolls to ~65% of the document.
          var currentPosition = $(window).scrollTop();
          $timeout(function() {
            $('html, body').scrollTop(currentPosition);
          });
          $rootScope.$broadcast('cellMapRecreated');
        };
        return {
          _getCellMap: function() {
            return cellMap;
          },
          _getTagMap: function() {
            return tagMap;
          },
          reset: function(_cells_) {
            if (_cells_) {
              cells = _cells_;
            }
            this.clipboard = null;
            recreateCellMap();
          },
          getCells: function() {
            return cells;
          },
          getIndex: function(id) {
            return cellMap[id] ? cellMap[id].rawIndex : -1;
          },
          getCellAtIndex: function(index) {
            return cells[index];
          },
          hasCell: function(id) {
            return !!cellMap[id];
          },
          _getDecoratedCell: function(id) {
            if (this.hasCell(id)) {
              return cellMap[id];
            } else {
              throw 'target cell ' + id + ' was not found';
            }
          },
          getCell: function(id) {
            return this._getDecoratedCell(id).raw;
          },
          getCellType: function(id) {
            return this.getCell(id).type;
          },
          getCellLevel: function() {
            return this.getCell(id).level;
          },
          getParent: function(id) {
            var parentId = this._getDecoratedCell(id).parent;
            if (parentId === 'root') {
              return;
            } else {
              return this.getCell(parentId);
            }
          },
          getChildren: function (id) {
            var self = this;
            var children = _.chain(this._getDecoratedCell(id).children)
              .sortBy(function (childId) {
                return self._getDecoratedCell(childId).rawIndex;
              })
              .map(function (childId) {
                return self.getCell(childId);
              }).value();
            return children;
          },
          getAllDescendants: function(id) {
            var self = this;
            return this._getDecoratedCell(id).allDescendants.map(function(childId) {
              return self.getCell(childId);
            });
          },
          getAllCodeCells: function(id) {
            if (!id) {
              id = 'root';
            }
            return this.getAllDescendants(id).filter(function(cell) {
              return cell.type === 'code';
            });
          },
          // find the first code cell starting with the startCell and scan
          // using the direction, if the startCell is a code cell, it will be returned.
          findCodeCell: function(startCellId, forward) {
            var cell = this.getCell(startCellId);
            while (cell) {
              if (cell.type === 'code') {
                return cell;
              }
              cell = forward ? this.getNext(cell.id) : this.getPrev(cell.id);
            }
            return null;
          },
          insertBefore: function(id, cell, quietly) {
            var index = this.getIndex(id);
            if (index !== -1) {
              cells.splice(index, 0, cell);
            } else {
              throw 'target cell ' + id + ' was not found';
            }
            recreateCellMap();
            if (!quietly) {
              $timeout(function () {
                $rootScope.$broadcast('beaker.cell.added', cell);
              });
            }
          },
          insertFirst: function(cell, quietly) {
            if (!_.isObject(cell)) {
              throw 'unacceptable';
            }
    
            cells.splice(0, 0, cell);
            recreateCellMap();
            if (!quietly) {
              $timeout(function () {
                $rootScope.$broadcast('beaker.cell.added', cell);
              });
            }
          },
          insertLast: function(cell, quietly) {
            if (!_.isObject(cell)) {
              throw 'unacceptable';
            }

            cells.push(cell);
            recreateCellMap();
            if (!quietly) {
              $timeout(function () {
                $rootScope.$broadcast('beaker.cell.added', cell);
              });
            }
          },
          insertAfter: function(id, cell, quietly) {
            if (!_.isObject(cell)) {
              throw 'unacceptable';
            }
    
            var index = this.getIndex(id);
            if (index !== -1) {
              cells.splice(index + 1, 0, cell);
            } else {
              throw 'target cell ' + id + ' was not found';
            }
            recreateCellMap();
            if (!quietly) {
              $timeout(function () {
                $rootScope.$broadcast('beaker.cell.added', cell);
              });
            }
          },
          insertAt: function(index, cell, doNotClearUndoAction, quietly) {
            if (_.isArray(cell)) {
              Array.prototype.splice.apply(cells, [index, 0].concat(cell));
            } else if (_.isObject(cell)) {
              cells.splice(index, 0, cell);
            } else {
              throw 'unacceptable';
            }
            recreateCellMap(doNotClearUndoAction);
            if (!quietly) {
              $timeout(function () {
                $rootScope.$broadcast('beaker.cell.added', cell);
              });
            }
          },
          isPossibleToMoveUp: function(id) {
            // If the cell isn't first (or nonexistent?)
            return [-1, 0].indexOf(this.getIndex(id)) === -1;
          },
          moveUp: function(id) {
            var index = this.getIndex(id);
            if (index !== -1) {
              if (index === 0) {
                return;
              } else {
                var cell = this.getCell(id);
                cells[index] = this.getCellAtIndex(index - 1);
                cells[index - 1] = cell;
              }
            } else {
              throw 'target cell ' + id + ' was not found';
            }
            recreateCellMap();
          },
          isPossibleToMoveDown: function(id) {
            // If the cell isn't last (or nonexistent?)
            return [-1, (cells.length - 1)].indexOf(this.getIndex(id)) === -1;
          },
          moveDown: function(id) {
            var index = this.getIndex(id);
            if (index !== -1) {
              if (index === cells.length - 1) {
                return;
              } else {
                var cell = this.getCell(id);
                cells[index] = this.getCellAtIndex(index + 1);
                cells[index + 1] = cell;
              }
            } else {
              throw 'target cell ' + id + ' was not found';
            }
            recreateCellMap();
          },
          undoableDelete: function() {
            this.deleteUndo = {
                type: 'single',
                index: this.getIndex(id),
                cell: this.getCell(id)
            };
            this.delete(id);
          },
          delete: function(id, undoable) {
            // delete the cell,
            // note that if this is a section, its descendants are not deleted.
            // to delete a seciton with all its descendants use deleteSection instead.
            var index = this.getIndex(id);
            if (index !== -1) {
              var deleted = cells.splice(index, 1);
              if (undoable) {
                var self = this;
                undoAction = function() {
                  self.insertAt(index, deleted, true);
                };
                undoAction2 = undefined;
                redoAction = undefined;
                redoAction2 = function() {
                  cells.splice(index, 1);
                  recreateCellMap(true);
                };
                recreateCellMap(true);
              } else {
                recreateCellMap();
              }
            }
          },
          deleteSection: function(id, undoable) {
            // delete the section cell as well as all its descendants
            var cell = this.getCell(id);
            if (!cell) {
              throw 'target cell ' + id + ' was not found';
            }
            if (cell.type !== 'section') {
              throw 'target cell ' + id + ' is not a section cell';
            }
            var index = this.getIndex(id);
            var descendants = this.getAllDescendants(id);
            var deleted = cells.splice(index, descendants.length + 1);
            if (undoable) {
              var self = this;
              undoAction = function() {
                self.insertAt(index, deleted, true);
              };
              undoAction2 = undefined;
              redoAction = undefined;
              redoAction2 = function() {
                cells.splice(index, descendants.length + 1);
                recreateCellMap(true);
              };
              recreateCellMap(true);
            } else {
              recreateCellMap();
            }
            return deleted;
          },
          undo: function() {
            if (undoAction) {
              undoAction.apply();
              redoAction = redoAction2;
              redoAction2 = undefined;
              undoAction2 = undoAction;
              undoAction = undefined;
            } else {
              console.log('no undo');
            }
          },
          redo: function() {
            if (redoAction) {
              redoAction.apply();
              redoAction2 = redoAction;
              undoAction = undoAction2;
              undoAction2 = undefined;
              redoAction = undefined;
            } else {
              console.log('no redo');
            }
          },
          deleteAllOutputCells: function() {
            if (cells) {
              _.each(cells, function(cell) {
                if (cell.output) {
                  var runningJob = bkEvaluateJobManager.getCurrentJob();
                  if (!runningJob || runningJob.cellId !== cell.id) {
                    cell.output.result = undefined;
                    cell.output.elapsedTime = undefined;
                    bkEvaluateJobManager.remove(cell);
                  }              
                }
              });
            }
          },
          dumpDisplayStatus: function() {
            if (cells) {
              _.each(cells, function(cell) {
                if (cell.output) {
                  cell.output.state = {};
                }
              });
            }
          },
          shiftSegment: function(segBegin, segLength, offset) {
            if (offset === 0) {
              return;
            }
            // this function shifts a continuous sequence of cells
            if (segBegin + offset < 0 || segBegin + segLength - 1 + offset >= cells.length) {
              throw 'Illegal shifting, result would be out of bound';
            }
            var slice1 = cells.slice(0, segBegin);
            var slice2 = cells.slice(segBegin, segBegin + segLength);
            var slice3 = cells.slice(segBegin + segLength);
            var toBeMoved;
            if (offset > 0) {
              // moving from slice 3 to slice 1
              toBeMoved = slice3.splice(0, offset);
              slice1 = slice1.concat(toBeMoved);
            } else {
              // moving from slice 1 to slice 3
              toBeMoved = slice1.splice(slice1.length + offset, -offset);
              slice3 = toBeMoved.concat(slice3);
            }
            replaceWholeArray(cells, _.flatten([slice1, slice2, slice3]));
            recreateCellMap();
          },
          getPrevSection: function(id) {
            var prev = this.getPrev(id);
    
                while (prev !== null && prev.type !== "section") {
                  prev = this.getPrev(prev.id);
                }
    
                return prev;
              },
              getPrevSibling: function(id) {
                var parentId = this._getDecoratedCell(id).parent;
                if (!parentId) {
                  return null;
                }
                var siblingIds = this._getDecoratedCell(parentId).children;
                var myIndexAmongSiblings = siblingIds.indexOf(id);
                if (myIndexAmongSiblings === 0) {
                  return null;
                }
                return this.getCell(siblingIds[myIndexAmongSiblings - 1]);
              },
              getNextSibling: function(id) {
                var parentId = this._getDecoratedCell(id).parent;
                if (!parentId) {
                  return null;
                }
                var siblingIds = this._getDecoratedCell(parentId).children;
                var myIndexAmongSiblings = siblingIds.indexOf(id);
                if (myIndexAmongSiblings === siblingIds.length - 1) {
                  return null;
                }
                return this.getCell(siblingIds[myIndexAmongSiblings + 1]);
              },
              isPossibleToMoveSectionUp: function(id) {
                return !!this.getPrevSibling(id);
              },
              moveSectionUp: function(id) {
                var index = this.getIndex(id);
                var length = this.getSectionLength(id);
                var prevSib = this.getPrevSibling(id);
                if (!prevSib) {
                  throw 'Cannot move section up';
                }
                var prevSibId = prevSib.id;
                var offset = -1 * this.getSectionLength(prevSibId);
                this.shiftSegment(index, length, offset);
              },
              isPossibleToMoveSectionDown: function(id) {
                return !!this.getNextSibling(id);
              },
              moveSectionDown: function(id) {
                var nextSib = this.getNextSibling(id);
                if (!nextSib) {
                  throw 'Cannot move section down';
                }
                this.moveSectionUp(nextSib.id);
              },
              getSectionLength: function(id) {
                // the cell itself plus all descendants
                return 1 + this._getDecoratedCell(id).allDescendants.length;
              },
    
              // The following has not been unit tested
              getNext: function(id) {
                var index = this.getIndex(id);
                if (index === cells.length - 1) {
                  return null;
                }
                return this.getCellAtIndex(index + 1);
              },
              getPrev: function(id) {
                var index = this.getIndex(id);
                if (index === 0) {
                  return null;
                }
                return this.getCellAtIndex(index - 1);
              },
              findNextCodeCell: function(id) {
                var index = this.getIndex(id);
                if (index === cells.length - 1) {
                  return null;
                }
                return this.findCodeCell(this.getCellAtIndex(index + 1).id, true);
              },
              isContainer: function(id) {
                return id === 'root' || !!this.getCell(id).level;
              },
              isEmpty: function(id) {
                return this._getDecoratedCell(id).allDescendants.length === 0;
              },
              isLast: function(id) {
                if (_.isEmpty(cells)) {
                  return false;
                }
                return _.last(cells).id === id;
              },
              appendAfter: function(id, cell) {
                if (this.isContainer(id) && !this.isEmpty(id)) {
                  // add to tail
                  var descendants = this.getAllDescendants(id);
                  this.insertAfter(descendants[descendants.length - 1].id, this.clipboard);
                } else {
                  // append after
                  this.insertAfter(id, cell);
                }
              },
              getCellsSize: function(){
                return cells.length;
              },
              getInitializationCells: function() {
                return tagMap.initialization;
              },
              getCellsWithEvaluator: function(evaluator) {
                return tagMap.evaluator[evaluator];
              },
              hasUserTag: function(t) {
                return tagMap.usertags[t] !== undefined;
              },
              getCellsWithUserTag: function(t) {
                return tagMap.usertags[t];
              },
              clipboard: null,
              cut: function(id) {
                if (this.clipboard) {
                  this.delete(this.clipboard);
                }
                this.clipboard = this.getCell(id);
                this.delete(id);
              },
              paste: function(destinationId) {
                if (this.clipboard) {
                  this.appendAfter(destinationId, this.clipboard);
                  this.clipboard = null;
                }
              },
              canSetUserTags: function(tags) {
                var re = /\s+/;
                if (tags !== undefined) {
                  var tgs = tags.split(re);
                  var i;
                  for (i = 0; i < tgs.length; i++) {
                    if (cellMap[tgs[i]] !== undefined) {
                      return 'ERROR: The name "' + tgs[i] + '" is already used as a cell name.';
                    }
                  }
                }
                return '';
              },
              canRenameCell: function(newid) {
                if (cellMap[newid] !== undefined) {
                  return 'ERROR: Cell "' + newid + '" already exists.';
                }
                if (tagMap.usertags[newid] !== undefined) {
                  return 'ERROR: The name "' + newid + '" is already used as a tag.';
                }
                return '';
              },
              renameCell: function(oldid, newid) {
                if (this.canRenameCell(newid) !== '') {
                  return;
                }
                var idx = this.getIndex(oldid);
                if (idx >= 0) {
                  cells[idx].id = newid;
                  recreateCellMap();
                }
              },
              rebuildMaps: function() {
                recreateCellMap(true);
              }
            };
      }
    }
  });
})();
