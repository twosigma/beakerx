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
 * M_bkNotebookCellModelManager
 * Notebook Cell Model doesn't own the notebook model.
 */
(function () {
    'use strict';

    // utilities
    var createTagMap = function (cells) {
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

        cells.forEach(function (cell, index) {
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
        stack.peek = function () {
            return this[this.length - 1];
        };
        _(decoratedCells).chain().toArray().slice(1).each(function (cell) {
            while (stack.peek().level >= cell.level) {
                stack.pop();
            }
            decoratedCells[stack.peek().id].children.push(cell.id);
            decoratedCells[cell.id].parent = stack.peek().id;
            stack.forEach(function (c) {
                decoratedCells[c.id].allDescendants.push(cell.id);
            });
            stack.push(cell);
        });
        return decoratedCells;
    };

    var module = angular.module("M_bkNotebookCellModelManager", []);
    module.factory("bkNotebookCellModelManager", function () {
        var cells = [];
        var cellMap = {};
        var recreateTagMap = function () {
            cellMap = createTagMap(cells);
        };
        return {
            _getTagMap: function () {
                return cellMap;
            },
            reset: function (_cells_) {
                cells = _cells_;
                recreateTagMap();
            },
            getCells: function () {
                return cells;
            },
            getIndex: function (id) {
                return cellMap[id] ? cellMap[id].rawIndex : -1;
            },
            getCellAtIndex: function (index) {
                return cells[index];
            },
            _getDecoratedCell: function (id) {
                if (cellMap[id]) {
                    return cellMap[id];
                } else {
                    throw "target cell " + id + " was not found";
                }
            },
            getCell: function (id) {
                return this._getDecoratedCell(id).raw;
            },
            getCellType: function (id) {
                return this.getCell(id).type;
            },
            getCellLevel: function () {
                return this.getCell(id).level;
            },
            getParent: function (id) {
                var parentId = this._getDecoratedCell(id).parent;
                if (parentId === "root") {
                    return;
                } else {
                    return this.getCell(parentId);
                }
            },
            getChildren: function (id) {
                var self = this;
                return this._getDecoratedCell(id).children.map(function (childId) {
                    return self.getCell(childId);
                });
            },
            getAllDescendants: function (id) {
                var self = this;
                return this._getDecoratedCell(id).allDescendants.map(function (childId) {
                    return self.getCell(childId);
                });
            },
            getAllCodeCells: function (id) {
                return this.getAllDescendants(id).filter(function (cell) {
                    return cell.type === "code";
                });
            },
            insertBefore: function (id, cell) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    cells.splice(index, 0, cell);
                } else {
                    throw "target cell " + id + " was not found";
                }
                recreateTagMap();
            },
            insertAfter: function (id, cell) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    cells.splice(index + 1, 0, cell);
                } else {
                    throw "target cell " + id + " was not found";
                }
                recreateTagMap();
            },
            moveUp: function (id) {
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
                recreateTagMap();
            },
            moveDown: function (id) {
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
                recreateTagMap();
            },
            delete: function (id) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    cells.splice(index, 1);
                }
                recreateTagMap();
            },
            deleteSection: function (id) {
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
                recreateTagMap();
                return [cell].concat(descendants);
            }
        };
    });
})();