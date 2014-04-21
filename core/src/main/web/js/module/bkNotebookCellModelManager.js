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
 * M_bkNotebookCellModelManager
 * Notebook Cell Model doesn't own the notebook model.
 */
(function() {
  'use strict';

  // utilities
  var generateCellMap = function(cells) {
    var decoratedCells = {
      "root": {
        id: "root",
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
      }
    });

    var stack = [decoratedCells.root];
    stack.peek = function() {
      return this[this.length - 1];
    };
    _(decoratedCells).each(function(cell) {
      if (cell.id === "root") {
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
    var initializationCells = _(cellMap).chain()
        .filter(function(cell) {
          return cell.raw && cell.raw.initialization;
        })
        .map(function(cell) {
          if (cell.raw.type === "code") {
            return cell;
          } else {
            return _(cell.allDescendants).chain()
                .map(function(childId) {
                  return cellMap[childId];
                })
                .filter(function(c) {
                  return c.raw.type === "code";
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
    _(cellMap).chain()
        .filter(function(cell) {
          return cell.raw && cell.raw.type === "code";
        })
        .each(function(codeCell) {
          evaluatorMap.add(codeCell.raw.evaluator, codeCell.raw);
        });

    return {
      initialization: initializationCells,
      evaluator: evaluatorMap
    };
  };

  var module = angular.module("M_bkNotebookCellModelManager", []);
  module.factory("bkNotebookCellModelManager", function() {
    var cells = [];
    var cellMap = {};
    var tagMap = {};
    var recreateCellMap = function() {
      cellMap = generateCellMap(cells);
      tagMap = generateTagMap(cellMap);
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
          throw "target cell " + id + " was not found";
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
        if (parentId === "root") {
          return;
        } else {
          return this.getCell(parentId);
        }
      },
      getChildren: function(id) {
        var self = this;
        return this._getDecoratedCell(id).children.map(function(childId) {
          return self.getCell(childId);
        });
      },
      getAllDescendants: function(id) {
        var self = this;
        return this._getDecoratedCell(id).allDescendants.map(function(childId) {
          return self.getCell(childId);
        });
      },
      getAllCodeCells: function(id) {
        return this.getAllDescendants(id).filter(function(cell) {
          return cell.type === "code";
        });
      },
      insertBefore: function(id, cell) {
        var index = this.getIndex(id);
        if (index !== -1) {
          cells.splice(index, 0, cell);
        } else {
          throw "target cell " + id + " was not found";
        }
        recreateCellMap();
      },
      insertAfter: function(id, cell) {
        if (!_.isObject(cell)) {
          throw "unacceptable"
        }

        var index = this.getIndex(id);
        if (index !== -1) {
          cells.splice(index + 1, 0, cell);
        } else {
          throw "target cell " + id + " was not found";
        }
        recreateCellMap();
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
          throw "target cell " + id + " was not found";
        }
        recreateCellMap();
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
          throw "target cell " + id + " was not found";
        }
        recreateCellMap();
      },
      delete: function(id) {
        // delete the cell,
        // note that if this is a section, its descendants are not deleted.
        // to delete a seciton with all its descendants use deleteSection instead.
        var index = this.getIndex(id);
        if (index !== -1) {
          cells.splice(index, 1);
        }
        recreateCellMap();
      },
      deleteSection: function(id) {
        // delete the section cell as well as all its descendants
        var cell = this.getCell(id);
        if (!cell) {
          throw "target cell " + id + " was not found";
        }
        if (cell.type !== "section") {
          throw "target cell " + id + " is not a section cell";
        }
        var index = this.getIndex(id);
        var descendants = this.getAllDescendants(id);
        cells.splice(index, descendants.length + 1);
        recreateCellMap();
        return [cell].concat(descendants);
      },
      shiftSegment: function(segBegin, segLength, offset) {
        if (offset === 0) {
          return;
        }
        // this function shifts a continuous sequence of cells
        if (segBegin + offset < 0 || segBegin + segLength - 1 + offset >= cells.length) {
          throw "Illegal shifting, result would be out of bound";
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
        cells = _.flatten([slice1, slice2, slice3]);
        recreateCellMap();
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
          throw "Cannot move section up";
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
          throw "Cannot move section down";
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
      isContainer: function(id) {
        return id === "root" || !!this.getCell(id).level;
      },
      isEmpty: function(id) {
        return this._getDecoratedCell(id).allDescendants.length === 0;
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
      getInitializationCells: function() {
        return tagMap.initialization;
      },
      getCellsWithEvaluator: function(evaluator) {
        return tagMap.evaluator[evaluator];
      },
      clipboard: null,
      cut: function(id) {
        if (this.clipboard) {
          this.delete(this.clipboard);
        }
        this.clipboard = this.getCell(id);
        this.delete(id);
      },
      paste: function(destinationID) {
        if (this.clipboard) {
          this.appendAfter(destinationID, this.clipboard);
          this.clipboard = null;
        }
      }
    };
  });
})();
